# OCris Arts — implementação e publicação

O trabalho foi realizado no checkout cujo remote `origin` é `https://github.com/oCrisArts/OCrisArts.git`. Não houve push, publicação, alteração de DNS ou configuração nas contas dos provedores.

## Resultado da validação local

- TypeScript e build Vite 8.0.5: aprovados, usando as versões de React, GSAP e Tailwind do lockfile original. O Vite emite um aviso não bloqueante de chunk principal acima de 500 kB.
- 27 documentos: conteúdo inicial, título exclusivo, canonical, quatro hreflangs, JSON-LD e sitemap conferidos; modos de indexação de produção e bloqueio de preview verificados.
- 987 arquivos públicos: sem ponteiros LFS pendentes, MP4 inválidos ou referências de mídia ausentes.
- Nove componentes originais: classes, estilos inline, reprodução de mídia e conteúdo PT comparados com o HEAD; 1.083 entradas por catálogo, sendo 926 traduções por idioma e 157 nomes/termos/valores compartilhados.
- Edge headless, desktop 1440×900 e mobile 390×844: 27 acessos diretos, hidratação sem erros, troca de idioma mantendo o case, oito cards e quatro cards na Hero.
- Consentimento: nenhum script antes de aceitar, recusa persistente, três scripts carregados uma única vez, navegação sem reinicialização e revogação sem recarregá-los.
- Eventos: pageviews deduplicados, impressões sem duplicação pelos clones, scroll 25/50/75/90, arraste real distinto da animação automática, quatro serviços, cinco seções do case, reprodução/conclusão de vídeo sem repetição por loop e início de formulário sem valores dos campos.
- Scripts externos simulados nos testes. Validação de entrega em GA4/Hotjar/Clarity, roteamento na infraestrutura Vercel e DNS permanece externa.

## Desenvolvimento e build

```sh
pnpm install --frozen-lockfile
npm run check:types
npm run check:media
npm run build
node scripts/check-preservation.mjs
node scripts/browser-check.mjs
```

O teste de navegador usa Microsoft Edge headless instalado, inicia seus próprios servidores nas portas 8553/8554 e encerra ambos ao terminar. Intercepta os scripts de analytics: testa a aplicação sem enviar sessões artificiais aos provedores. Relatórios e screenshots ficam em `.cache/qa/`. O build usa Vite para cliente e servidor e gera 27 documentos HTML, sitemap, robots e página 404. O HTML contém os textos completos; a hidratação mantém React Router e GSAP. Não foi criada outra versão visual ou arquitetura de páginas.

O teste de preservação compara as classes, estilos inline, referências de imagens/vídeos, atributos de reprodução e textos PT com o HEAD de referência. A exceção de conteúdo é a troca aprovada de `E-mail` para `falecom@`; os campos desenhados da Home passaram a inputs com os mesmos placeholders. Execute esse teste antes de incorporar as alterações ao HEAD. As fontes, vídeos, posters, imagens e evidências em `public/` não foram modificados.

## Arquivos e responsabilidades

| Arquivos | Responsabilidade |
| --- | --- |
| `src/App.tsx` | Rotas nos três idiomas, dropdown existente, links de contato, integrações com navegação e observação, GSAP original |
| `src/figma/*.tsx` | Referências aos catálogos, h1/h2 sem troca de classes, links semânticos e atributos de tracking |
| `src/i18n/{pt-BR,en,es}.json`, `ui.json` | Conteúdo e interface traduzidos |
| `src/i18n/translations.tsv`, `shared-terms.json` | Traduções editáveis e termos/números/nomes compartilhados; regenerar EN/ES com `node scripts/build-locales.mjs` |
| `src/analytics/*` | Consentimento, carregamento único dos scripts, React Router, observadores e eventos |
| `src/seo/*`, `src/entry-server.tsx`, `scripts/prerender.mjs` | Metadados, Schema.org e pré-renderização |
| `src/main.tsx`, `src/index.css`, `index.html` | Hidratação, estilo discreto dos controles e mascaramento dos dados nas gravações |
| `vite.config.ts`, `.figma/make/site.json` | Um único responsável pelo analytics e indexação controlada por ambiente |
| `vercel.json`, `.env.example`, `package.json`, arquivos de lock | Preparação do build e da hospedagem |
| `scripts/check-media.mjs`, `check-preservation.mjs`, `browser-check.mjs` | Verificações reproduzíveis |

## Consentimento e privacidade

O Consent Mode v2 começa com `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization` negados. É usado o modo básico: nenhum dos três scripts é carregado antes da opção correspondente. Métricas (GA4) e análise de experiência (Hotjar/Clarity) podem ser escolhidas separadamente. Publicidade permanece negada.

A escolha vale por 180 dias e pode ser alterada pelo botão Privacidade. Recusar após aceitar revoga o consentimento, remove cookies conhecidos de primeira parte e recarrega a página para encerrar listeners dos gravadores; simplesmente remover uma tag não encerraria o SDK. Alterações em outra aba provocam recarga para aplicar a mesma escolha.

Campos e conteúdo do site estão marcados para mascaramento em Hotjar/Clarity. Os eventos usam uma lista permitida de parâmetros e não leem valores dos campos. URLs enviadas ao GA4 excluem query strings, fragmentos e referrer. Gravadores não são iniciados quando há query string ou hash na entrada, para evitar exposição de dados eventualmente incluídos na URL. Não há User-ID, Identify API ou envio de nomes, e-mails, telefones e textos de mensagem.

O consentimento técnico não substitui a revisão da política de privacidade do responsável pelo site, retenção e contratos com os provedores.

## Eventos e leitura dos indicadores

| Evento | Disparo e interpretação |
| --- | --- |
| `page_view` | Entrada ou mudança efetiva de pathname/idioma; consentimento tardio conta só a página atual; hashes e consultas não geram novas visualizações |
| `scroll_depth` | 25/50/75/90% do documento, uma vez por limiar em cada visita à rota |
| `case_impression` | Card visível por pelo menos 1 segundo; uma vez por slug em cada visita; clones da Hero não multiplicam impressões |
| `case_open` | Ação real de abrir um case; slug independente do texto traduzido |
| `case_section_view` | Contexto, desafio, processo, artefatos e resultados; uma vez por seção em cada visita |
| `case_carousel_interaction` | Arraste real acima de 6px no trilho de cases; não acompanha frames da animação automática |
| `video_play`, `video_complete` | Início e conclusão por arquivo/visita; loops não repetem; parâmetro `playback` diferencia fundo/usuário |
| `service_click` | Clique/ativação de um dos quatro serviços; não é conversão |
| `language_change` | Idioma de origem/destino, antes da navegação à página equivalente |
| `contact_click` | Abertura de WhatsApp, telefone ou e-mail; não comprova envio |
| `form_start` | Primeira edição real dos campos de contato em cada visita |
| `form_submit` | Evento real de submissão do formulário; não é sucesso nem comprova entrega |
| `form_success` | API reservada a confirmação real de backend; não é emitida no fluxo atual |
| `outbound_click` | Link externo; somente hostname, sem parâmetros nem dados pessoais |
| `resume_download` | Apenas link marcado de currículo com download real; não existe currículo no projeto atual, portanto não dispara |
| `web_vital` | LCP, INP e CLS via biblioteca `web-vitals`; métricas do ciclo do documento, não de cada rota da SPA |

Dimensões sugeridas no GA4: `case_slug`, `section_id`, `language`, `service_name`, `channel`, `page_path`, `interaction_type`, `playback`, `metric_name`, `metric_rating`. Métrica personalizada: `metric_value`. Evitar dimensões de alta cardinalidade ou dados de pessoas.

Explorações sugeridas: sessões engajadas por idioma; usuários por profundidade; impressão → abertura → seções dos cases; interação por serviço; início de contato e clique no canal. O funil início → envio → sucesso somente terá etapa final quando existir confirmação de entrega integrada. **Não marcar WhatsApp, mailto, `form_start` ou `form_submit` como contato concluído.** A taxa de contato iniciado pode usar cliques/sessões, com esse nome explícito; a taxa de conversão confirmada permanece indisponível no fluxo de links externos.

O e-mail aprovado é `mailto:cristiano-acosta@hotmail.com`, exibido como `falecom@`. Não há servidor de envio. O CTA existente de WhatsApp foi preservado.

## Configurações externas de analytics

1. GA4 `G-BF47FWR761`: em Admin → Fluxos de dados → Web → Medição otimizada → Visualizações de página → configurações avançadas, **desativar as mudanças de página baseadas em eventos do histórico**. O site envia pageviews manuais com `send_page_view:false`; esse parâmetro sozinho não impede a medição otimizada de histórico. Evitar GTM, plugin da hospedagem ou outra tag que inicialize o mesmo ID. [Documentação do Google](https://developers.google.com/analytics/devguides/collection/ga4/views).
2. Desativar medição otimizada de formulário, scroll, cliques externos e vídeos se usar os eventos manuais como fonte única. Não criar eventos derivados que dupliquem os mesmos nomes. Cadastrar dimensões/métrica e montar as explorações acima.
3. Para homologação, habilitar `VITE_ANALYTICS_DEBUG=true` em um build de teste. Após consentimento, verificar Tag Assistant/DebugView, uma ocorrência por mudança de rota e nenhuma em mudanças apenas de âncora. Não deixar debug ativo na publicação normal.
4. Hotjar `6498699`, versão 6: confirmar o domínio, captura de sessões e mascaramento; configurar detecção automática de mudanças de URL da SPA sem fragmentos. Não instalar outra tag. Validar gravações e eventos na conta. [Configurações do site](https://support.contentsquare.com/hc/en-us/articles/37271802599441-How-to-change-site-information-session-capture-and-data-suppression-settings).
5. Clarity `h1vap5dpoc`: confirmar domínio, consentimento exigido e mascaramento estrito. O site usa `consentv2` com armazenamento de analytics concedido somente após a escolha e publicidade negada. Validar sessões e eventos na conta. [API oficial](https://learn.microsoft.com/en-gb/clarity/setup-and-installation/clarity-consent-api-v2).

Os testes locais verificam carregamento, consentimento e comandos enviados às filas. Eles **não confirmam recepção real nos dashboards**, propriedade dos IDs, quotas ou configurações das contas. Esses pontos precisam de acesso aos serviços e de validação após a publicação.

## Vercel

1. Importar `oCrisArts/OCrisArts`, escolher a branch de produção e framework Vite; usar Node.js 22. Nas variáveis do projeto, definir `ENABLE_EXPERIMENTAL_COREPACK=1` em todos os ambientes para respeitar `packageManager: pnpm@10.34.3`. Instalação `pnpm install --frozen-lockfile`, build `npm run build`, saída `dist`. [Corepack na Vercel](https://vercel.com/docs/builds/configure-a-build).
2. Settings → Git → **Git LFS: Enabled**, depois redeploy. O build falha se encontrar ponteiros sem conteúdo. Em um checkout incompleto, executar `git lfs pull` antes do build. [Vercel Git LFS](https://vercel.com/docs/project-configuration/git-settings).
3. Adicionar `ocris.art.br` como domínio principal e `www.ocris.art.br` como alias. `vercel.json` redireciona www ao principal permanentemente (308), preservando o caminho.
4. Confirmado o domínio, configurar **somente em Production** `VITE_SITE_URL=https://ocris.art.br` e `VITE_ENABLE_INDEXING=true`. A condição também exige `VERCEL_ENV=production`, fornecida pela Vercel. Preview/staging têm meta noindex e robots bloqueado. Hosts diferentes do principal recebem `X-Robots-Tag:noindex,nofollow`, inclusive URLs de deployments de produção.
5. `cleanUrls:true` resolve os 27 arquivos HTML pré-renderizados. Não existe rewrite universal para index.html: ele descartaria o HTML específico das rotas e poderia devolver HTML no lugar de um asset inexistente. Arquivos estáticos são entregues normalmente e URLs desconhecidas recebem a página 404.
6. Após deploy, testar acesso e recarga das 27 rotas, tipo MIME/Range dos MP4, canonical, quatro hreflangs, robots, sitemap, favicon, card social e certificados HTTPS. Submeter `https://ocris.art.br/sitemap.xml` no Search Console. A imagem social é o poster real existente de oCris Acosta (`/videos/about-poster.jpg`).

## Registro.br — sem alteração automática

Manter os servidores DNS atuais. Depois que a Vercel mostrar os valores em Settings → Domains, configurar a zona DNS do Registro.br:

| Tipo | Nome | Valor |
| --- | --- | --- |
| A | domínio raiz (`@`, ou campo vazio conforme o editor) | endereço IPv4 **exato exibido pela Vercel** para `ocris.art.br` |
| CNAME | `www` | destino **exato exibido pela Vercel** para `www.ocris.art.br` |
| TXT, se solicitado | nome de verificação **exato exibido pela Vercel** | token de verificação **exato exibido pela Vercel** |

Não usar IP/CNAME genérico presumido: os valores podem depender do projeto. Remover somente registros conflitantes do mesmo hostname após conferir a configuração existente; preservar MX, SPF, DKIM, DMARC e outros serviços. Não criar AAAA sem a Vercel solicitar. Aguardar validação dos dois domínios e emissão dos certificados. [Guia oficial de domínio](https://vercel.com/docs/domains/set-up-custom-domain).
