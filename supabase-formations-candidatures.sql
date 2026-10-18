-- ═══════════════════════════════════════════════════════════════════════
--  SOBUP — Candidatures RESPIRE-BF : nouveaux champs
--
--  Le formulaire demandait un seul champ « Contact (téléphone ou email) ».
--  Il demande désormais séparément le téléphone WhatsApp et l'email, plus
--  la profession, la spécialité et le lieu d'exercice.
--
--  ⚠️  À exécuter AVANT de déployer : sans ces colonnes, l'enregistrement
--      d'une candidature échoue (PostgREST refuse les colonnes inconnues).
--
--  À exécuter dans Supabase → SQL Editor → New query → Run.
--  Idempotent : relançable sans risque.
-- ═══════════════════════════════════════════════════════════════════════

alter table public.formation_applications
  add column if not exists telephone      text,
  add column if not exists email          text,
  add column if not exists profession     text,
  add column if not exists specialite     text,
  add column if not exists lieu_exercice  text;

comment on column public.formation_applications.telephone is
  'Numéro joignable sur WhatsApp, saisi par le candidat.';
comment on column public.formation_applications.email is
  'Email normalisé en minuscules ; sert aussi de clé anti-doublon (contact_normalized).';

-- Index de recherche par email, utilisé par le back-office.
create index if not exists formation_applications_email_idx
  on public.formation_applications (email);

-- ─── Vérification ─────────────────────────────────────────────────────
-- Doit renvoyer 5 lignes.
select column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'formation_applications'
  and column_name in ('telephone', 'email', 'profession', 'specialite', 'lieu_exercice')
order by column_name;
