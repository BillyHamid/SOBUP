-- À exécuter dans le SQL Editor Supabase avant l'ouverture des candidatures EchoT.
-- Les candidatures RESPIRE-BF existantes restent associées à respire-bf.
begin;

alter table public.formation_applications
  add column if not exists formation_slug text not null default 'respire-bf';

alter table public.formation_applications
  drop constraint if exists formation_applications_formation_slug_check,
  drop constraint if exists formation_applications_modules_check;

alter table public.formation_applications
  add constraint formation_applications_formation_slug_check
    check (formation_slug in ('respire-bf', 'echographie-thoracique', 'thoracoscopie-medicale')),
  add constraint formation_applications_modules_check
    check (
      (formation_slug = 'respire-bf' and cardinality(modules) between 1 and 3
        and modules <@ array[1, 2, 3] and array_position(modules, null) is null)
      or (formation_slug in ('echographie-thoracique', 'thoracoscopie-medicale') and cardinality(modules) = 0)
    );

create index if not exists formation_applications_formation_created_idx
  on public.formation_applications (formation_slug, created_at desc);

commit;
