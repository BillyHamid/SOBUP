-- RESPIRE-BF : exécuter dans le SQL Editor du projet Supabase avant ouverture.
-- Aucun accès navigateur direct aux candidatures ou aux pièces jointes.
begin;
create table if not exists public.formation_applications (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique,
  fingerprint text not null,
  formation_slug text not null default 'respire-bf' check (formation_slug = 'respire-bf'),
  nom text not null check (char_length(trim(nom)) between 1 and 100),
  prenom text not null check (char_length(trim(prenom)) between 1 and 100),
  contact text not null check (char_length(contact) between 1 and 180),
  contact_normalized text not null,
  modules integer[] not null check (cardinality(modules) between 1 and 3 and modules <@ array[1,2,3] and array_position(modules, null) is null),
  cv_path text not null,
  motivation_path text,
  created_at timestamptz not null default now()
);
alter table public.formation_applications enable row level security;
revoke all on public.formation_applications from anon, authenticated;
grant select, insert, update, delete on public.formation_applications to service_role;
create index if not exists formation_applications_created_idx on public.formation_applications(created_at desc);
create index if not exists formation_applications_contact_idx on public.formation_applications(contact_normalized, created_at desc);
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('formation-applications', 'formation-applications', false, 2097152,
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
-- Pas de policy de lecture publique : téléchargement via une route admin authentifiée.
commit;
