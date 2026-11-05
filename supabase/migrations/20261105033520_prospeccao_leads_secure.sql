create table if not exists public.prospeccao_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'novo' check (status in ('novo', 'em_analise', 'proposta_enviada', 'convertido', 'arquivado')),
  name text not null check (char_length(name) between 2 and 120),
  whatsapp text not null check (whatsapp ~ '^\+[1-9][0-9]{9,14}$'),
  idea text not null check (char_length(idea) between 10 and 1500),
  consent_granted boolean not null check (consent_granted is true),
  consented_at timestamptz not null,
  privacy_policy_version text not null check (char_length(privacy_policy_version) between 1 and 32),
  locale text not null default 'pt-BR' check (locale in ('pt-BR', 'en', 'es')),
  source_path text not null check (source_path ~ '^/[A-Za-z0-9/_-]*$'),
  request_fingerprint text not null check (char_length(request_fingerprint) = 64),
  proposal_slug text unique,
  internal_notes text
);

comment on table public.prospeccao_leads is 'Private prospecting leads. Browser access is intentionally denied; inserts happen only through the validated Edge Function.';
comment on column public.prospeccao_leads.request_fingerprint is 'Salted SHA-256 used only for abuse throttling; raw IP addresses are not stored.';
comment on column public.prospeccao_leads.proposal_slug is 'Optional unique share slug. It is not an authorization boundary and must never map to private lead data through a public API.';

create index if not exists prospeccao_leads_created_at_idx on public.prospeccao_leads (created_at desc);
create index if not exists prospeccao_leads_rate_limit_idx on public.prospeccao_leads (request_fingerprint, created_at desc);
create index if not exists prospeccao_leads_status_idx on public.prospeccao_leads (status, created_at desc);

alter table public.prospeccao_leads enable row level security;
alter table public.prospeccao_leads force row level security;

revoke all on table public.prospeccao_leads from public, anon, authenticated;
grant select, insert, update, delete on table public.prospeccao_leads to service_role;

-- No anon/authenticated RLS policies are created. Even if a future grant is
-- added accidentally, RLS remains deny-by-default for personal lead data.
