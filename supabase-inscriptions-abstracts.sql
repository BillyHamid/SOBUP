-- ═══════════════════════════════════════════════════════════════════════
--  SOBUP — Complément Inscriptions / Abstracts
--
--  Les tables `event_registrations` et `abstracts` existent déjà.
--  Ce script ajoute seulement ce qui manque :
--    1. la numérotation automatique des références (ABS-2026-001, -002, …)
--    2. la confirmation du bucket de stockage et de sa policy de lecture
--
--  À exécuter dans Supabase → SQL Editor → New query → Run.
--  Idempotent : relançable sans risque.
-- ═══════════════════════════════════════════════════════════════════════

-- ─── 1. Référence automatique des abstracts ───────────────────────────
-- La séquence a déjà été créée ; on la sécurise au cas où.
create sequence if not exists abstracts_ref_seq start 1;

create or replace function public.set_abstract_reference()
returns trigger language plpgsql as $$
begin
  if new.reference is null or new.reference = '' then
    new.reference := 'ABS-' || to_char(now(), 'YYYY') || '-'
                  || lpad(nextval('abstracts_ref_seq')::text, 3, '0');
  end if;
  return new;
end $$;

drop trigger if exists set_abstracts_reference on public.abstracts;
create trigger set_abstracts_reference
  before insert on public.abstracts
  for each row execute function public.set_abstract_reference();

-- ─── 2. Bucket de stockage des fichiers joints ────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'abstracts', 'abstracts', true, 5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
  set public = true,
      file_size_limit = 5242880,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public_read_abstracts_bucket" on storage.objects;
create policy "public_read_abstracts_bucket"
  on storage.objects for select
  using (bucket_id = 'abstracts');

-- ─── 3. Rappel sécurité ───────────────────────────────────────────────
-- RLS est active sur les deux tables et AUCUNE policy n'est définie :
-- la clé anon (navigateur) ne peut donc ni lire ni écrire. Seules les
-- routes API serveur, qui utilisent la clé service_role, y accèdent.
alter table public.event_registrations enable row level security;
alter table public.abstracts           enable row level security;
