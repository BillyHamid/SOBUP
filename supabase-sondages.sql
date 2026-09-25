-- Sondages SOBUP. À exécuter dans le SQL Editor du projet Supabase.
-- Les choix sont privés pour les membres, visibles dans l'administration.
begin;

create table if not exists public.member_surveys (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 3 and 160),
  question text not null check (char_length(trim(question)) between 3 and 300),
  description text,
  published boolean not null default true,
  is_open boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.member_survey_options (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.member_surveys(id) on delete cascade,
  label text not null check (char_length(trim(label)) between 1 and 160),
  position integer not null check (position >= 0),
  unique (survey_id, position),
  unique (survey_id, id)
);

create table if not exists public.member_survey_participations (
  survey_id uuid not null references public.member_surveys(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  primary key (survey_id, user_id)
);

create table if not exists public.member_survey_ballots (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.member_surveys(id) on delete cascade,
  option_id uuid not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  unique (survey_id, user_id),
  foreign key (survey_id, option_id) references public.member_survey_options(survey_id, id)
);

create index if not exists member_survey_options_survey_idx on public.member_survey_options(survey_id, position);
create index if not exists member_survey_ballots_option_idx on public.member_survey_ballots(survey_id, option_id);

alter table public.member_surveys enable row level security;
alter table public.member_survey_options enable row level security;
alter table public.member_survey_participations enable row level security;
alter table public.member_survey_ballots enable row level security;

revoke all on public.member_surveys, public.member_survey_options,
  public.member_survey_participations, public.member_survey_ballots from anon, authenticated;
grant select on public.member_surveys, public.member_survey_options to anon, authenticated;
grant select on public.member_survey_participations to authenticated;
grant all on public.member_surveys, public.member_survey_options,
  public.member_survey_participations, public.member_survey_ballots to service_role;

drop policy if exists member_surveys_public_read on public.member_surveys;
create policy member_surveys_public_read on public.member_surveys for select to anon, authenticated
  using (published = true);
drop policy if exists member_survey_options_public_read on public.member_survey_options;
create policy member_survey_options_public_read on public.member_survey_options for select to anon, authenticated
  using (exists (select 1 from public.member_surveys s where s.id = survey_id and s.published = true));
drop policy if exists member_survey_participations_own_read on public.member_survey_participations;
create policy member_survey_participations_own_read on public.member_survey_participations for select to authenticated
  using (user_id = (select auth.uid()));
-- Aucun accès direct aux bulletins pour les clients anon/authenticated.

create or replace function public.cast_member_survey_vote(p_survey_id uuid, p_option_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare v_user_id uuid := (select auth.uid());
begin
  if v_user_id is null then raise exception 'Connexion membre requise' using errcode = '28000'; end if;
  if not exists (select 1 from public.profiles p where p.user_id = v_user_id) then
    raise exception 'Profil membre requis' using errcode = '28000';
  end if;
  perform 1 from public.member_surveys s
    where s.id = p_survey_id and s.published = true and s.is_open = true for share;
  if not found then raise exception 'Ce sondage est fermé ou introuvable' using errcode = '22023'; end if;
  if not exists (select 1 from public.member_survey_options o where o.id = p_option_id and o.survey_id = p_survey_id) then
    raise exception 'Choix invalide' using errcode = '22023';
  end if;
  -- Les deux insertions forment une seule transaction. La contrainte unique
  -- empêche deux votes simultanés du même membre.
  insert into public.member_survey_participations (survey_id, user_id) values (p_survey_id, v_user_id);
  insert into public.member_survey_ballots (survey_id, option_id, user_id) values (p_survey_id, p_option_id, v_user_id);
end;
$$;
revoke all on function public.cast_member_survey_vote(uuid, uuid) from public, anon;
grant execute on function public.cast_member_survey_vote(uuid, uuid) to authenticated;

commit;
