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
  status text not null default 'rascunho' check (status in ('rascunho', 'publicada', 'arquivada')),
  stripe_checkout_session_id text,
  status_pagamento text not null default 'nao_iniciado' check (status_pagamento in ('nao_iniciado', 'pendente', 'pago', 'falhou', 'reembolsado')),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists prospeccao_propostas_lead_id_idx
  on public.prospeccao_propostas (lead_id);

create table if not exists public.prospeccao_orcamentos (
  id uuid primary key default gen_random_uuid(),
  proposta_id uuid not null references public.prospeccao_propostas(id) on delete cascade,
  versao integer not null check (versao > 0),
  plano_id text not null check (plano_id in ('essencial', 'estrategica', 'completa', 'custom')),
  servicos text[] not null default '{}',
  entregaveis text[] not null default '{}',
  horas integer not null check (horas > 0),
  prazo_dias_uteis integer not null check (prazo_dias_uteis > 0),
  valor_cartao_centavos integer not null check (valor_cartao_centavos > 0),
  valor_pix_centavos integer not null check (valor_pix_centavos > 0),
  status text not null default 'confirmado' check (status in ('rascunho', 'confirmado', 'checkout_iniciado', 'pago', 'expirado', 'cancelado')),
  valido_ate timestamptz,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (proposta_id, versao)
);

create index if not exists prospeccao_orcamentos_proposta_id_idx
  on public.prospeccao_orcamentos (proposta_id, criado_em desc);

create table if not exists public.prospeccao_pagamentos (
  id uuid primary key default gen_random_uuid(),
  proposta_id uuid not null references public.prospeccao_propostas(id) on delete cascade,
  orcamento_id uuid not null references public.prospeccao_orcamentos(id) on delete restrict,
  stripe_checkout_session_id text not null unique,
  stripe_payment_intent_id text,
  metodo text not null check (metodo in ('card', 'pix')),
  valor_centavos integer not null check (valor_centavos > 0),
  moeda text not null default 'brl' check (moeda = 'brl'),
  status text not null default 'pendente' check (status in ('pendente', 'pago', 'falhou', 'expirado', 'reembolsado')),
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists prospeccao_pagamentos_proposta_id_idx
  on public.prospeccao_pagamentos (proposta_id, criado_em desc);
create index if not exists prospeccao_pagamentos_orcamento_id_idx
  on public.prospeccao_pagamentos (orcamento_id);
create index if not exists prospeccao_pagamentos_payment_intent_idx
  on public.prospeccao_pagamentos (stripe_payment_intent_id)
  where stripe_payment_intent_id is not null;

create table if not exists public.prospeccao_pagamento_eventos (
  stripe_event_id text primary key,
  tipo text not null,
  pagamento_id uuid references public.prospeccao_pagamentos(id) on delete set null,
  processado_em timestamptz not null default now(),
  erro text
);

comment on table public.prospeccao_orcamentos is 'Server-validated, versioned consultancy budgets.';
comment on table public.prospeccao_pagamentos is 'Stripe Checkout reconciliation without lead PII.';
comment on table public.prospeccao_pagamento_eventos is 'Minimal idempotency ledger for Stripe webhook events; raw payloads are not stored.';

alter table public.prospeccao_propostas enable row level security;
alter table public.prospeccao_propostas force row level security;
alter table public.prospeccao_orcamentos enable row level security;
alter table public.prospeccao_orcamentos force row level security;
alter table public.prospeccao_pagamentos enable row level security;
alter table public.prospeccao_pagamentos force row level security;
alter table public.prospeccao_pagamento_eventos enable row level security;
alter table public.prospeccao_pagamento_eventos force row level security;

revoke all on table public.prospeccao_propostas from public, anon, authenticated;
revoke all on table public.prospeccao_orcamentos from public, anon, authenticated;
revoke all on table public.prospeccao_pagamentos from public, anon, authenticated;
revoke all on table public.prospeccao_pagamento_eventos from public, anon, authenticated;

grant select, insert, update, delete on table public.prospeccao_propostas to service_role;
grant select, insert, update, delete on table public.prospeccao_orcamentos to service_role;
grant select, insert, update, delete on table public.prospeccao_pagamentos to service_role;
grant select, insert, update, delete on table public.prospeccao_pagamento_eventos to service_role;
