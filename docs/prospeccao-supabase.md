# Prospecção — ativação do Supabase

O frontend permanece inativo para gravação até que `VITE_SUPABASE_URL` e
`VITE_SUPABASE_PUBLISHABLE_KEY` sejam configuradas. Nenhuma chave
`service_role` pode usar o prefixo `VITE_`.

## Arquitetura

1. O navegador envia o fluxo consentido para `prospeccao-lead`.
2. A Edge Function valida origem, conteúdo, tempo mínimo, honeypot, telefone,
   consentimento e limite de três cadastros por hora por fingerprint com hash.
3. Turnstile é exigido automaticamente quando `TURNSTILE_SECRET_KEY` existe.
4. Somente a função usa `SUPABASE_SERVICE_ROLE_KEY` e insere com status `novo`.
5. `anon` e `authenticated` não têm grants nem policies de leitura/escrita em
   `prospeccao_leads`; RLS e `FORCE ROW LEVEL SECURITY` ficam ativos.

## Ativação

Use um projeto Supabase dedicado à OCrisArts. Revise a migration, aplique-a no
ambiente alvo, configure os secrets abaixo e então publique a função:

```text
ALLOWED_ORIGINS=https://ocris.art.br
LEAD_FINGERPRINT_SALT=<segredo-aleatório-longo>
TURNSTILE_SECRET_KEY=<opcional-em-homologação-recomendado-em-produção>
```

Depois, configure apenas a URL e a publishable key no build Vite. Rode os
advisors de segurança e desempenho após aplicar a migration e teste: cadastro
válido, origem inválida, ausência de consentimento, telefone inválido, honeypot,
rate limit e tentativa de `SELECT` como `anon` (deve falhar).

O texto de prazo usa `VITE_PROPOSAL_SLA_GUARANTEED=true` somente quando a
operação puder garantir o SLA. Caso contrário, a interface não promete 12 horas.
