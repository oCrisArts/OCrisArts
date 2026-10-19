export type ContentRef = { key?: string; text?: string }
export type TaxonomyItem = { icon: string; label: string }
export type ArtifactLayout = "image" | "grid" | "composition" | "carousel" | "video" | "video-background" | "embed-fullscreen"
export type ServiceSlug = "branding" | "web" | "apps" | "ux"

export type CaseArtifact = {
  slug: string
  label: string
  icon: string
  layout: ArtifactLayout
  images?: string[]
  video?: string
  videoWidth?: number
  videoHeight?: number
  embed?: { title: string; url: string }
  embedTags?: TaxonomyItem[]
  dark?: boolean
  background?: string
  fullBleed?: boolean
}

export type CaseMetric = {
  value: ContentRef
  title: ContentRef
  subtitle: ContentRef
  name: string
}

export type CaseStudy = {
  slug: string
  title: string
  subtitle: string
  context: string
  contextCopy: ContentRef[]
  challenge: ContentRef
  process: ContentRef[]
  project: string
  hero: string
  contextMedia?: string
  contextMediaWidth?: number
  challengeMedia?: string
  tags: TaxonomyItem[]
  methodology: TaxonomyItem[]
  services: ServiceSlug[]
  showServicesInProcess?: boolean
  artifacts: CaseArtifact[]
  results: { metrics: CaseMetric[]; copy: ContentRef[] }
  relatedCases: string[]
  card: {
    image: string
    tone: "light" | "dark"
  }
}

const key = (value: string): ContentRef => ({ key: value })
const text = (value: string): ContentRef => ({ text: value })
const tag = (icon: string, label: string): TaxonomyItem => ({ icon, label })
const image = (slug: string, label: string, icon: string, src: string, layout: ArtifactLayout = "image"): CaseArtifact => ({ slug, label, icon, layout, images: [src] })
const metric = (value: ContentRef, title: string, subtitle: string, name: string): CaseMetric => ({ value, title: key(title), subtitle: key(subtitle), name })

export const cases = [
  {
    slug: "navegacao-confusa",
    title: "t0567", subtitle: "t0568", context: "t0638", project: "SIFGD · CAIXA",
    contextCopy: [key("t0638"), key("t0639"), key("t0640")], challenge: key("t0643"),
    process: [
      text("A avaliação heurística revelou problemas de orientação e consistência que se repetiam em diferentes áreas do sistema."),
      text("Corrigir cada tela separadamente não resolveria a origem dessas dificuldades. A Arquitetura da Informação ajudou a entender como os fluxos precisavam ser reorganizados."),
      text("Uma matriz de criticidade orientou as prioridades."),
      text("No fluxo de Estornos, a proposta ganhou forma com os padrões do Design System CAIXA, enquanto o Plano de Pesquisa definiu como avaliar a nova navegação."),
    ],
    hero: "/assets/front-page/cases/navegacao-confusa.png",
    contextMedia: "/assets/cases/navegacao-confusa/contexto-fgts.svg",
    contextMediaWidth: 320,
    tags: [tag("devices", "Sistemas"), tag("psychology", "Design Thinking"), tag("rule", "Análise heurística"), tag("route", "Arquitetura da informação"), tag("draw", "Protótipos"), tag("science", "Pesquisa de usabilidade")],
    methodology: [tag("favorite", "Empatia"), tag("target", "Definição"), tag("lightbulb", "Ideação"), tag("draw", "Prototipagem"), tag("fact_check", "Teste")],
    services: ["ux", "apps"],
    artifacts: [
      image("auditoria-heuristica", "Análise heurística", "rule", "/assets/cases/navegacao-confusa/midia-1-auditoria-heuristica.svg"),
      image("diagnostico-de-usabilidade", "Diagnóstico de usabilidade", "troubleshoot", "/assets/cases/navegacao-confusa/midia-640c5.png"),
      image("matriz-de-criticidade", "Matriz de criticidade", "priority_high", "/assets/cases/navegacao-confusa/midia-1-matriz-de-criticidade.svg"),
      image("fluxo-de-estorno", "Fluxo de estorno", "account_tree", "/assets/cases/navegacao-confusa/midia-59e28.png"),
      image("prototipos", "Protótipos", "draw", "/assets/front-page/cases/navegacao-confusa.png"),
      image("plano-de-pesquisa", "Plano de pesquisa", "assignment", "/assets/cases/navegacao-confusa/midia-1-plano-pesquisa.svg"),
    ],
    results: { metrics: [metric(text("25%"), "t0612", "t0613", "coverage"), metric(text("7"), "t0742", "t0743", "outcome"), metric(text("6"), "t0744", "t0745", "product-reach")], copy: [key("t0746"), key("t0747")] },
    relatedCases: ["qualificacao-complexa", "cadastros-complexos", "regra-incerta"],
    card: { image: "/assets/front-page/cases/navegacao-confusa.png", tone: "light" },
  },
  {
    slug: "cadastros-complexos",
    title: "t0159", subtitle: "t0160", context: "t0168", project: "SIAFF · CAIXA",
    contextCopy: [key("t0168"), key("t0169"), key("t0170")], challenge: key("t0172"),
    process: [key("t0173"), text("Um protótipo funcional criado no Figma Make permitiu observar tarefas reais."), text("Os testes e registros do Clarity ajudaram a identificar comportamentos que não seriam percebidos em telas estáticas."), key("t0175")],
    hero: "/assets/front-page/cases/cadastros-complexos.png", contextMedia: "/assets/cases/cadastros-complexos/contexto-siaff.svg", contextMediaWidth: 364,
    challengeMedia: "/assets/cases/cadastros-complexos/desafio-bg-figure.svg",
    tags: [tag("devices", "Sistemas"), tag("monitoring", "Data-Driven Design"), tag("science", "Atomic Research"), tag("assignment", "Plano de teste"), tag("visibility", "Observação de uso"), tag("draw", "Protótipos")],
    methodology: [tag("target", "Definição de objetivos e métricas"), tag("database", "Coleta de dados"), tag("analytics", "Análise de dados"), tag("draw", "Prototipagem"), tag("fact_check", "Validação"), tag("monitoring", "Monitoramento")],
    services: ["ux", "apps"],
    showServicesInProcess: false,
    artifacts: [
      image("atomic-research", "Atomic Research", "science", "/assets/cases/cadastros-complexos/artefato-atomic-research.svg", "grid"),
      image("plano-de-teste", "Plano de teste", "assignment", "/assets/cases/cadastros-complexos/artefato-plano-de-teste.svg"),
      { slug: "clarity", label: "Observação de uso", icon: "visibility", layout: "video-background", video: "/assets/cases/cadastros-complexos/artefato-clarity.mp4", videoWidth: 1920, videoHeight: 1032, fullBleed: true },
      image("prototipo-funcional", "Protótipo funcional", "draw", "/assets/cases/cadastros-complexos/artefato-prototipo-funcional.svg"),
      image("cadastro-de-boletos", "Cadastro de boletos", "draw", "/assets/cases/cadastros-complexos/artefato-cadastro-de-boletos.svg"),
      { slug: "evolucao-dos-cadastros", label: "Evolução dos cadastros", icon: "design_services", layout: "carousel", images: ["/assets/cases/cadastros-complexos/carrossel-tcca-01.svg", "/assets/cases/cadastros-complexos/carrossel-tcca-02.svg", "/assets/cases/cadastros-complexos/carrossel-tcca-03.svg"] },
      { slug: "prototipo-tcca", label: "Protótipo Interativo", icon: "design_services", layout: "embed-fullscreen", embed: { title: "FCA — Cadastrar TCCA", url: "https://25280498-cadastrar-tcca.figma.site/" }, embedTags: [tag("design_services", "Protótipo Interativo"), tag("design_services", "Figma Make")], background: "#F9F9F9", fullBleed: true },
    ],
    results: { metrics: [metric(text("100%"), "t0267", "t0268", "evidence"), metric(key("t0269"), "t0270", "t0271", "evidence"), metric(text("0"), "t0272", "t0273", "product-outcome")], copy: [key("t0274"), key("t0275")] },
    relatedCases: ["navegacao-confusa", "qualificacao-complexa", "regra-incerta"],
    card: { image: "/assets/front-page/cases/cadastros-complexos.png", tone: "dark" },
  },
  {
    slug: "regra-incerta",
    title: "t0569", subtitle: "t0570", context: "t0943", project: "SPVAT · CAIXA",
    contextCopy: [key("t0943"), key("t0944"), key("t0945")], challenge: key("t0946"),
    process: [text("A revisão do aplicativo DPVAT permitiu distinguir o que ainda fazia sentido daquilo que precisaria mudar com o SPVAT."), text("Jornadas, requisitos e componentes foram avaliados considerando as regras conhecidas e as definições ainda incertas."), text("Em paralelo, o estudo de marca construiu a identidade visual do novo seguro."), text("Os protótipos reuniram essas decisões aos padrões do Design System CAIXA, permitindo avançar com uma proposta adaptável às mudanças regulatórias.")],
    hero: "/assets/cases/regra-incerta/hero.png", contextMedia: "/assets/cases/regra-incerta/contexto-spvat.svg", contextMediaWidth: 350,
    tags: [tag("smartphone", "Aplicativos"), tag("palette", "Identidade visual"), tag("cycle", "Lean UX"), tag("science", "Atomic Research"), tag("route", "Fluxo"), tag("draw", "Protótipos")],
    methodology: [tag("psychology", "Pensar"), tag("build", "Fazer")], services: ["branding", "ux", "apps"],
    artifacts: [
      image("atomic-research", "Atomic Research", "science", "/assets/cases/regra-incerta/artefato-atomic-research.svg"),
      image("moodboard", "Moodboard", "palette", "/assets/cases/regra-incerta/artefato-moodboard.svg"),
      image("identidade-visual", "Identidade visual", "brand_awareness", "/assets/cases/regra-incerta/artefato-identidade-visual.svg"),
      image("fluxo", "Fluxo", "account_tree", "/assets/cases/regra-incerta/artefato-fluxo.svg"),
      image("prototipo-mobile", "Protótipo mobile", "smartphone", "/assets/cases/regra-incerta/artefato-prototipo-mobile.svg"),
      { slug: "telas-do-aplicativo", label: "Telas do aplicativo", icon: "view_carousel", layout: "carousel", images: ["/assets/cases/regra-incerta/carrossel-tela-01.svg", "/assets/cases/regra-incerta/carrossel-tela-02.svg", "/assets/cases/regra-incerta/carrossel-tela-03.svg", "/assets/cases/regra-incerta/carrossel-tela-04.svg", "/assets/cases/regra-incerta/carrossel-tela-05.svg"] },
    ],
    results: { metrics: [metric(key("t1084"), "t0152", "t0153", "evidence"), metric(key("t1085"), "t0989", "t0990", "system"), metric(key("t0614"), "t0991", "t0616", "product-outcome")], copy: [key("t0992"), key("t0993")] },
    relatedCases: ["qualificacao-complexa", "cadastros-complexos", "navegacao-confusa"],
    card: { image: "/assets/front-page/cases/regra-incerta.png", tone: "light" },
  },
  {
    slug: "qualificacao-complexa",
    title: "t0571", subtitle: "t0572", context: "t0757", project: "DPVAT · CAIXA",
    contextCopy: [key("t0757"), key("t0758"), key("t0759")], challenge: key("t0760"),
    process: [text("A revisão começou pelas tarefas de qualificação, onde informações pouco claras poderiam dificultar a análise dos pedidos."), text("As heurísticas de Nielsen identificaram problemas de orientação e prevenção de erros."), text("A WCAG 2.1 trouxe os critérios de acessibilidade necessários à revisão das interfaces."), text("Os achados foram relacionados aos perfis, às etapas e aos pontos críticos da operação."), text("Essa análise orientou a reorganização dos fluxos e a aplicação de padrões do Design System CAIXA, buscando decisões mais claras e rastreáveis.")],
    hero: "/assets/cases/qualificacao-complexa/hero.png", contextMedia: "/assets/cases/qualificacao-complexa/contexto-dpvat.svg", contextMediaWidth: 350,
    tags: [tag("devices", "Sistemas"), tag("diamond", "Duplo Diamante"), tag("rule", "Análise heurística"), tag("account_tree", "Mapeamento de processos"), tag("draw", "Protótipos"), tag("table_chart", "Painel de qualificação")],
    methodology: [tag("search", "Descobrir"), tag("target", "Definir"), tag("build", "Desenvolver"), tag("task_alt", "Entregar")], services: ["ux", "apps"],
    artifacts: [
      image("analise-heuristica", "Análise heurística", "rule", "/assets/cases/qualificacao-complexa/artefato-heuristic-analysis.png"),
      image("fluxos-criticos", "Mapeamento de processos", "account_tree", "/assets/cases/qualificacao-complexa/artefato-critical-flows.png"),
      { ...image("design-system-caixa", "Design System CAIXA", "widgets", "/assets/cases/qualificacao-complexa/artefato-caixa-design-system.png"), dark: true, background: "#005CA9" },
      image("painel-de-qualificacao", "Painel de qualificação", "table_chart", "/assets/cases/qualificacao-complexa/artefato-qualification-panel.png"),
      image("interface-backoffice", "Interface do BackOffice", "dashboard", "/assets/cases/qualificacao-complexa/artefato-backoffice-interface.png"),
      image("padroes-backoffice", "Padrões do BackOffice", "widgets", "/assets/cases/qualificacao-complexa/artefato-backoffice-patterns.png"),
    ],
    results: { metrics: [metric(text("83%"), "t0932", "t0933", "coverage"), metric(text("34%"), "t0934", "t0935", "outcome"), metric(key("t0617"), "t0155", "t0156", "product-reach")], copy: [key("t0936"), key("t0937")] },
    relatedCases: ["navegacao-confusa", "cadastros-complexos", "regra-incerta"],
    card: { image: "/assets/front-page/cases/qualificacao-complexa.png", tone: "dark" },
  },
  {
    slug: "corrida-em-jogo",
    title: "t0349", subtitle: "t0350", context: "t0355", project: "Porsche Cup Brasil",
    contextCopy: [text("Uma corrida depende de decisões rápidas, inclusive fora da pista."), text("Na Porsche Cup Brasil, planilhas ainda apoiavam a gestão de pneus comercializados, treinos, equipes e ativos de cada etapa."), text("Engenheiro, piloto e operação precisavam acompanhar pedidos, aprovações e retiradas. A mesma informação circulava entre papéis diferentes.")], challenge: key("t0357"),
    process: [text("A operação da Porsche Cup dependia da coordenação entre engenheiros, pilotos e equipes de apoio."), text("Planilhas não ofereciam uma visão integrada das solicitações e dos estados de cada atividade."), text("O mapeamento das responsabilidades mostrou como estruturar pedidos, aprovações, notificações e retiradas de pneus."), text("Essas decisões orientaram o aplicativo administrativo. Depois, um manual impresso passou a documentar os procedimentos para as equipes."), text("O streaming também integrava o ecossistema digital, mas como uma aplicação independente.")],
    hero: "/assets/cases/corrida-em-jogo/hero.png",
    contextMedia: "/assets/cases/corrida-em-jogo/contexto-porsche-cup.svg",
    contextMediaWidth: 250,
    challengeMedia: "/assets/cases/corrida-em-jogo/desafio.png",
    tags: [tag("smartphone", "Aplicativos"), tag("devices", "Sistemas"), tag("menu_book", "Guia"), tag("hub", "Service Design"), tag("account_tree", "Fluxo de navegação"), tag("route", "Jornada operacional"), tag("draw", "Protótipos"), tag("menu_book", "Documentação"), tag("design_services", "Figma"), tag("menu_book", "InDesign")],
    methodology: [tag("travel_explore", "Exploração"), tag("draw", "Criação"), tag("psychology", "Reflexão"), tag("build", "Implementação")], services: ["ux", "apps"],
    showServicesInProcess: false,
    artifacts: [
      image("jornada-operacional", "Jornada operacional", "route", "/assets/cases/corrida-em-jogo/artefato-jornada-operacional.svg"),
      image("wireframes-operacionais", "Wireframes operacionais", "draw", "/assets/cases/corrida-em-jogo/artefato-wireframes-operacionais.svg"),
      { ...image("fluxo-de-navegacao", "Fluxo de navegação", "account_tree", "/assets/cases/corrida-em-jogo/artefato-fluxo-de-navegacao.svg"), background: "#3c3f45" },
      { ...image("prototipos-streaming", "Protótipos", "devices", "/assets/cases/corrida-em-jogo/artefato-prototipos-streaming.svg"), background: "#3c3f45" },
      { slug: "variacoes-streaming", label: "Protótipos", icon: "view_carousel", layout: "carousel", background: "#3c3f45", images: ["/assets/cases/corrida-em-jogo/carrossel-prototipo-01.png", "/assets/cases/corrida-em-jogo/carrossel-prototipo-02.png", "/assets/cases/corrida-em-jogo/carrossel-prototipo-03.png", "/assets/cases/corrida-em-jogo/carrossel-prototipo-04.png"] },
      { ...image("documentacao", "Documentação", "menu_book", "/assets/cases/corrida-em-jogo/artefato-documentacao.svg"), background: "#3c3f45" },
    ],
    results: { metrics: [metric(text("—"), "t0152", "t0153", "coverage"), metric(text("—"), "t0550", "t0551", "system"), metric(text("100+"), "t0155", "t0156", "product-outcome")], copy: [key("t0552"), key("t0553")] },
    relatedCases: ["beneficios-dispersos", "cadastro-travado", "uma-marca-por-cliente"],
    card: { image: "/assets/front-page/cases/corrida-em-jogo.png", tone: "dark" },
  },
  {
    slug: "beneficios-dispersos",
    title: "t0010", subtitle: "t0011", context: "t0019", project: "Sou Parceiro · Intelbras",
    contextCopy: [key("t0019"), key("t0020")], challenge: key("t0022"),
    process: [text("A análise da jornada revelou diferentes necessidades entre os revendedores que utilizavam o aplicativo Sou Parceiro."), text("Personas ajudaram a compreender os objetivos por trás de cada acesso."), text("A partir dessas necessidades, a Arquitetura da Informação orientou a organização de benefícios, conteúdos e funcionalidades."), text("As decisões de interface passaram a priorizar as tarefas dos parceiros, em vez de reproduzir a estrutura dos canais internos da empresa.")],
    hero: "/assets/cases/beneficios-dispersos/hero.png", contextMedia: "/assets/cases/beneficios-dispersos/contexto-sou-parceiro.svg", contextMediaWidth: 296,
    tags: [tag("smartphone", "Aplicativos"), tag("monitoring", "Data-Driven Design"), tag("route", "Fluxo de uso"), tag("groups", "Personas"), tag("dashboard", "Painel contextual"), tag("draw", "Protótipos")],
    methodology: [tag("search", "Compreender"), tag("groups", "Especificar"), tag("draw", "Desenhar"), tag("fact_check", "Avaliar")], services: ["ux", "apps"],
    artifacts: [
      image("fluxo-de-uso", "Fluxo de uso", "route", "/assets/cases/beneficios-dispersos/artefato-fluxo-de-uso.svg"),
      { slug: "personas", label: "Personas", icon: "groups", layout: "grid", images: ["/assets/cases/beneficios-dispersos/artefato-persona-01.svg", "/assets/cases/beneficios-dispersos/artefato-persona-02.svg"] },
      { ...image("painel-contextual", "Painel contextual", "dashboard", "/assets/cases/beneficios-dispersos/artefato-painel-contextual.svg"), background: "#00863F" },
      { ...image("decisoes-de-interface", "Decisões de interface", "design_services", "/assets/cases/beneficios-dispersos/artefato-decisoes-de-interface.svg", "composition"), background: "#00A335" },
      { ...image("prototipos", "Interfaces e protótipos", "draw", "/assets/cases/beneficios-dispersos/artefato-prototipos.svg"), background: "#00863F" },
      image("plano-de-metricas", "Plano de métricas", "monitoring", "/assets/cases/beneficios-dispersos/artefato-plano-de-metricas.svg"),
    ],
    results: { metrics: [metric(key("t1084"), "t0150", "t0151", "baseline"), metric(key("t1085"), "t0152", "t0153", "system"), metric(key("t0154"), "t0155", "t0156", "product-outcome")], copy: [key("t0157"), key("t0158")] },
    relatedCases: ["corrida-em-jogo", "cadastro-travado", "uma-marca-por-cliente"],
    card: { image: "/assets/front-page/cases/beneficios-dispersos.png", tone: "dark" },
  },
  {
    slug: "cadastro-travado",
    title: "t0276", subtitle: "t0277", context: "t0282", project: "Konviva LMS",
    contextCopy: [key("t0282"), key("t0283")], challenge: key("t0284"),
    process: [text("Os tickets de suporte revelaram que a dificuldade não estava apenas no formulário."), text("Encontrar cursos, compreender o cadastro e recuperar o acesso também faziam parte do problema."), text("A análise da jornada mostrou que a experiência precisava começar antes do login."), text("A solução foi ampliar o LMS existente com um portal externo de cursos, conectando descoberta, cadastro e acesso à plataforma."), text("Os protótipos e testes ajudaram a revisar essa entrada e os pontos de recuperação após erros.")],
    hero: "/assets/cases/cadastro-travado/hero.png", contextMedia: "/assets/cases/cadastro-travado/contexto-ilog.svg", contextMediaWidth: 440,
    tags: [tag("cloud", "SaaS"), tag("travel_explore", "Product Discovery"), tag("route", "Mapa da jornada"), tag("grid_view", "Matriz de priorização"), tag("draw", "Wireframes"), tag("draw", "Protótipos")],
    methodology: [tag("handshake", "Alinhamento"), tag("search", "Pesquisa"), tag("lightbulb", "Ideação"), tag("draw", "Prototipagem"), tag("fact_check", "Validação")], services: ["web", "ux"],
    artifacts: [
      { ...image("mapa-da-jornada", "Mapa da jornada", "route", "/assets/cases/cadastro-travado/artefato-mapa-da-jornada.svg"), background: "#F2F2F2" },
      { ...image("matriz-de-priorizacao", "Matriz de priorização", "grid_view", "/assets/cases/cadastro-travado/artefato-matriz-de-priorizacao.svg"), background: "#F2F2F2" },
      { ...image("wireframes", "Wireframes", "draw", "/assets/cases/cadastro-travado/artefato-wireframes.svg"), background: "#F2F2F2" },
      { ...image("prototipos-do-portal", "Protótipos do portal", "draw", "/assets/cases/cadastro-travado/artefato-prototipos-do-portal.svg", "grid"), background: "#EEEEEE" },
      { ...image("interfaces-do-portal", "Interfaces do portal", "devices", "/assets/cases/cadastro-travado/artefato-interfaces-do-portal.svg"), background: "#EEEEEE" },
      { slug: "prototipo-portal-konviva", label: "Protótipo Interativo", icon: "design_services", layout: "embed-fullscreen", embed: { title: "Portal Konviva", url: "https://portalkonviva.figma.site/" }, embedTags: [tag("design_services", "Protótipo Interativo"), tag("design_services", "Figma Make")], background: "#F9F9F9", fullBleed: true },
    ],
    results: { metrics: [metric(text("+48%"), "t0343", "t0268", "baseline"), metric(text("-30%"), "t0344", "t0273", "baseline"), metric(text("56.423"), "t0345", "t0346", "product-outcome")], copy: [key("t0347"), key("t0348")] },
    relatedCases: ["uma-marca-por-cliente", "beneficios-dispersos", "corrida-em-jogo"],
    card: { image: "/assets/front-page/cases/cadastro-travado.png", tone: "dark" },
  },
  {
    slug: "uma-marca-por-cliente",
    title: "t0574", subtitle: "t0575", context: "t0999", project: "Konviva White-Label",
    contextCopy: [key("t0999"), key("t1000")], challenge: key("t1001"),
    process: [text("A experiência de aprendizagem era compartilhada entre os clientes."), text("O que precisava mudar era a identidade visual de cada empresa."), key("t1003"), text("Com Design Tokens, diferentes identidades passaram a utilizar a mesma estrutura de interface."), text("Os protótipos ajudaram a verificar como as variações se comportavam sem exigir a reconstrução do aplicativo.")],
    hero: "/assets/cases/uma-marca-por-cliente/hero.png", contextMedia: "/assets/cases/uma-marca-por-cliente/contexto-konviva.svg", contextMediaWidth: 549,
    tags: [tag("smartphone", "Aplicativos"), tag("view_list", "Product Backlog Building"), tag("fact_check", "Backlog do MVP"), tag("widgets", "Design System modular"), tag("palette", "Design Tokens"), tag("draw", "Protótipos")],
    methodology: [tag("description", "Contextualização"), tag("groups", "Personas"), tag("widgets", "Funcionalidades"), tag("route", "Jornada"), tag("view_list", "Itens do backlog")], services: ["branding", "apps"],
    artifacts: [
      image("backlog-do-mvp", "Backlog do MVP", "fact_check", "/assets/cases/uma-marca-por-cliente/artefato-backlog-do-mvp.svg"),
      image("design-system", "Design System modular", "widgets", "/assets/cases/uma-marca-por-cliente/artefato-design-system.svg"),
      { slug: "video-de-fundo", label: "Animação de carregamento", icon: "movie", layout: "video-background", video: "/assets/cases/uma-marca-por-cliente/artefato-loading-promo.mp4", videoWidth: 1920, videoHeight: 1080, dark: true, fullBleed: true },
      { slug: "prototipos-white-label", label: "Protótipos White-Label", icon: "draw", layout: "carousel", images: ["/assets/cases/uma-marca-por-cliente/carrossel-prototipo-01.svg", "/assets/cases/uma-marca-por-cliente/carrossel-prototipo-02.svg", "/assets/cases/uma-marca-por-cliente/carrossel-prototipo-03.svg", "/assets/cases/uma-marca-por-cliente/carrossel-prototipo-04.svg", "/assets/cases/uma-marca-por-cliente/carrossel-prototipo-05.svg", "/assets/cases/uma-marca-por-cliente/carrossel-prototipo-06.svg", "/assets/cases/uma-marca-por-cliente/carrossel-prototipo-07.svg"] },
      { slug: "variacoes-de-marca", label: "Variações de marca", icon: "palette", layout: "carousel", images: ["/assets/cases/uma-marca-por-cliente/carrossel-marca-01.svg", "/assets/cases/uma-marca-por-cliente/carrossel-marca-02.svg", "/assets/cases/uma-marca-por-cliente/carrossel-marca-03.svg", "/assets/cases/uma-marca-por-cliente/carrossel-marca-04.svg", "/assets/cases/uma-marca-por-cliente/carrossel-marca-05.svg", "/assets/cases/uma-marca-por-cliente/carrossel-marca-06.svg", "/assets/cases/uma-marca-por-cliente/carrossel-marca-07.svg"] },
    ],
    results: { metrics: [metric(key("t1084"), "t1074", "t0551", "evidence"), metric(key("t1085"), "t1075", "t0990", "system"), metric(key("t0154"), "t1076", "t0622", "product-outcome")], copy: [key("t1077"), key("t1078")] },
    relatedCases: ["cadastro-travado", "beneficios-dispersos", "corrida-em-jogo"],
    card: { image: "/assets/front-page/cases/uma-marca-por-cliente.png", tone: "dark" },
  },
] as const satisfies readonly CaseStudy[]

export const caseSlugs = cases.map(({ slug }) => slug)
export type CaseSlug = (typeof cases)[number]["slug"]

export function findCase(slug: string | undefined) {
  return cases.find((item) => item.slug === slug)
}
