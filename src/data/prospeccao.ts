import type { TaxonomyTag } from "../components/TaxonomyTags"

export const HOURLY_RATE = 100
export const HOURS_PER_TAG = 2
export const PIX_DISCOUNT = 0.1

// Tarifas padrão públicas da Stripe Brasil; valide tarifas contratadas antes de cobrar.
export const STRIPE_FEES = {
  pixRate: 0.0119,
  domesticCardRate: 0.0399,
  domesticCardFixed: 0.39,
} as const

export type ConsultancyId = "essencial" | "estrategica" | "completa" | "custom"

export type ServiceOption = TaxonomyTag & { id: string }
export type DeliverableOption = TaxonomyTag & { id: string }

// Mesmo vocabulário dos quatro serviços da home. O briefing não limita a escolha de consultoria.
export const proposalServices: ServiceOption[] = [
  { id: "branding", icon: "palette", label: "Marca e comunicação" },
  { id: "sites", icon: "web", label: "Sites e e-commerce" },
  { id: "apps", icon: "smartphone", label: "Aplicativos e plataformas" },
  { id: "ux", icon: "search", label: "Consultoria em UX" },
]

export const proposalDeliverables: DeliverableOption[] = [
  { id: "product-discovery", icon: "travel_explore", label: "Product Discovery" },
  { id: "journey-map", icon: "route", label: "Mapa da jornada" },
  { id: "flow", icon: "account_tree", label: "Fluxo" },
  { id: "wireframes", icon: "draw", label: "Wireframes" },
  { id: "prototypes", icon: "draw", label: "Protótipos" },
  { id: "figma", icon: "design_services", label: "Figma" },
  { id: "figma-make", icon: "auto_awesome", label: "Protótipo funcional · Figma Make" },
  { id: "validation", icon: "fact_check", label: "Validação" },
  { id: "design-thinking", icon: "psychology", label: "Design Thinking" },
  { id: "design-system", icon: "widgets", label: "Design System modular" },
  { id: "test-plan", icon: "assignment", label: "Plano de teste" },
  { id: "heuristic-analysis", icon: "rule", label: "Análise heurística" },
  { id: "usability-research", icon: "science", label: "Pesquisa de usabilidade" },
]

const deliverables = (...ids: string[]) =>
  ids.map((id) => proposalDeliverables.find((item) => item.id === id)!)

export type ConsultancyConfig = {
  id: Exclude<ConsultancyId, "custom">
  name: string
  description: string
  serviceIds: string[]
  tags: DeliverableOption[]
  deliveryBusinessDays: number
  cta: string
}

export const consultancies: ConsultancyConfig[] = [
  {
    id: "essencial",
    name: "Consultoria Essencial",
    description: "Entenda o que sua ideia precisa e descubra por onde começar.",
    serviceIds: ["sites"],
    tags: deliverables("product-discovery", "journey-map", "flow", "wireframes", "prototypes", "figma", "figma-make"),
    deliveryBusinessDays: 16,
    cta: "Quero começar",
  },
  {
    id: "estrategica",
    name: "Consultoria Estratégica",
    description: "Organize a experiência, explore soluções e evite decisões no escuro.",
    serviceIds: ["sites"],
    tags: deliverables("product-discovery", "journey-map", "flow", "wireframes", "prototypes", "figma", "validation", "design-thinking", "design-system", "test-plan", "figma-make"),
    deliveryBusinessDays: 12,
    cta: "Quero começar",
  },
  {
    id: "completa",
    name: "Consultoria Completa",
    description: "Analise mais a fundo, teste melhorias e planeje os próximos passos.",
    serviceIds: ["sites"],
    tags: proposalDeliverables,
    deliveryBusinessDays: 6,
    cta: "Quero começar",
  },
]

const roundCurrency = (value: number) => Math.round(value * 100) / 100

// Sobe para o primeiro valor terminado em ,99 que cobre a receita desejada.
const roundUpTo99 = (minimum: number) =>
  roundCurrency(Math.ceil(minimum - 0.99 - 1e-9) + 0.99)

export function calculateConsultancy(tagCount: number) {
  const hours = tagCount * HOURS_PER_TAG
  const netInvestment = hours * HOURLY_RATE
  // Garantia sobre taxas Stripe antes de tributos, sem taxas extras contratadas.
  const pixMinimum = netInvestment / ((1 - PIX_DISCOUNT) * (1 - STRIPE_FEES.pixRate))
  const cardMinimum = (netInvestment + STRIPE_FEES.domesticCardFixed) / (1 - STRIPE_FEES.domesticCardRate)
  const listInvestment = roundUpTo99(Math.max(pixMinimum, cardMinimum))
  const pixInvestment = roundCurrency(listInvestment * (1 - PIX_DISCOUNT))
  return {
    hours,
    netInvestment,
    listInvestment,
    pixInvestment,
    estimatedPixNet: roundCurrency(pixInvestment * (1 - STRIPE_FEES.pixRate)),
    estimatedCardNet: roundCurrency(listInvestment * (1 - STRIPE_FEES.domesticCardRate) - STRIPE_FEES.domesticCardFixed),
  }
}

export type PublicProposal = {
  slug: string
  client: { displayName: string }
  conversationSummary: string
  briefing: string
  challenge: string
  solution: string
  demoUrl: string
  serviceIds: string[]
  tagIds: string[]
  resultHypotheses: string[]
  investment: { hourlyRate: number; hoursPerTag: number; pixDiscount: number }
  cta: { label: string; whatsappUrl: string }
}

// Everything in this file ships to the public browser bundle. Add only content that
// the client has explicitly approved for a shareable proposal; never add phone,
// e-mail, full legal name, lead IDs, conversation transcripts, or internal notes.
export const publicProposals: Record<string, PublicProposal> = {
  "cliente-exemplo": {
    slug: "cliente-exemplo",
    client: { displayName: "Cliente Exemplo" },
    conversationSummary: "Sua ideia, produto ou serviço já tem um próximo passo. A gente entendeu seu desafio.",
    briefing: "Transformar a necessidade apresentada em uma experiência clara, validável e pronta para evoluir.",
    challenge: "Reduzir incertezas antes do investimento em desenvolvimento e alinhar escopo, experiência e resultado esperado.",
    solution: "Uma consultoria de produto e experiência com demonstração navegável, entregáveis modulares e próximos passos objetivos.",
    demoUrl: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Fm0giUODNGvJ8sDMJVVPnhk%2F%25F0%259F%2592%25B0-Prosperidade-OCrisArts%3Fnode-id%3D6920-11307",
    serviceIds: ["sites"],
    tagIds: consultancies[1].tags.map((tag) => tag.id),
    resultHypotheses: [
      "Mais clareza para priorizar o que deve ser construído primeiro.",
      "Menos retrabalho por meio de validação antes do desenvolvimento.",
      "Uma base visual e funcional coerente para as próximas etapas.",
    ],
    investment: { hourlyRate: HOURLY_RATE, hoursPerTag: HOURS_PER_TAG, pixDiscount: PIX_DISCOUNT },
    cta: { label: "Falar sobre esta proposta", whatsappUrl: "https://wa.me/5548991526789" },
  },
}

export function normalizeProposalSlug(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}
