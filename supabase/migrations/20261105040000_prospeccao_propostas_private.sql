-- Propostas públicas são renderizadas pelo backend; este registro não é público.
create table if not exists public.prospeccao_propostas (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.prospeccao_leads(id) on delete set null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  titulo text not null,
  resumo_desafio text,
  proposta_solucao text,
  figma_make_url text,
  demonstracao_url text,
  conteudo_publicavel jsonb not null default '{}'::jsonb,
  status text not null default 'rascunho'
    check (status in ('rascunho','publicada','arquivada')),
  stripe_checkout_session_id text,
  status_pagamento text not null default 'nao_iniciado'
    check (status_pagamento in ('nao_iniciado','pendente','pago','falhou','reembolsado')),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

alter table public.prospeccao_propostas enable row level security;
alter table public.prospeccao_propostas force row level security;
revoke all on public.prospeccao_propostas from public, anon, authenticated;
grant select, insert, update, delete on public.prospeccao_propostas to service_role;
create index if not exists idx_prospeccao_propostas_status
  on public.prospeccao_propostas (status, criado_em desc);
comment on table public.prospeccao_propostas is
  'Internal proposals: do not expose lead information via browser or public slug.';
