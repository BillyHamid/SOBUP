-- ═══════════════════════════════════════════════════════════════════════
--  SOBUP — Correctif du processus d'adhésion
--
--  Problème corrigé : la colonne `adhesion_requests.generated_password`
--  n'existait pas. La validation d'une adhésion créait le compte, puis
--  échouait en écrivant cette colonne — et s'arrêtait AVANT d'envoyer
--  l'email d'identifiants. Le membre n'a donc jamais reçu son mot de passe,
--  et toute nouvelle tentative répondait « Un compte existe déjà ».
--
--  Le code tolère désormais l'absence de cette colonne (l'email part quand
--  même), mais sans elle la récupération du mot de passe par l'admin dans
--  le back-office reste indisponible. Ce script la crée.
--
--  À exécuter dans Supabase → SQL Editor → New query → Run.
--  Idempotent : relançable sans risque.
-- ═══════════════════════════════════════════════════════════════════════

-- ─── 1. Mémorisation du mot de passe généré ───────────────────────────
alter table public.adhesion_requests
  add column if not exists generated_password text;

comment on column public.adhesion_requests.generated_password is
  'Mot de passe temporaire généré à la validation, pour que le Bureau puisse le recommuniquer au membre. Jamais exposé côté public (RLS active, accès service_role uniquement).';

-- `profiles.generated_password` existe déjà ; on la sécurise au cas où.
alter table public.profiles
  add column if not exists generated_password text;

-- ─── 2. Vérification ──────────────────────────────────────────────────
-- Doit renvoyer 2 lignes après exécution.
select table_name, column_name
from information_schema.columns
where table_schema = 'public'
  and column_name = 'generated_password'
  and table_name in ('adhesion_requests', 'profiles')
order by table_name;
