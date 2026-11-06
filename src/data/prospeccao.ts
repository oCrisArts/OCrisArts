import type { TaxonomyTag } from "../components/TaxonomyTags"

export const HOURLY_RATE = 100
export const HOURS_PER_TAG = 2
export const PIX_DISCOUNT = 0.1
export const PIX_FEE = 0.0119
export const CARD_FEE_ESTIMATE = 0.0599

export type ConsultancyId = "essencial" | "estrategica" | "completa" | "custom"
export type PaymentMethod = "card" | "pix"
export type ServiceOption = TaxonomyTag & { id: string }
export type DeliverableOption = TaxonomyTag & { id: string }

export const proposalServices: ServiceOption[] = [
  { id: "branding", icon: "palette", label: "Marca e comunicação" },
  { id: "web", icon: "web", label: "Sites e e-commerce" },
  { id: "apps", icon: "smartphone", label: "Aplicativos e plataformas" },
  { id: "ux", icon: "travel_explore", label: "Consultoria em UX" },
]

export const proposalDeliverables: DeliverableOption[] = [
  { id: "product-discovery", icon: "travel_explore", label: "Product Discovery" },
  { id: "journey-map", icon: "route", label: "Mapa da jornada" },
  { id: "flow", icon: "account_tree", label: "Fluxo" },
  { id: "wireframes", icon: "draw", label: "Wireframes" },
  { id: "prototypes", icon: "draw", label: "Protótipos" },
  { id: "figma", icon: "design_services", label: "Figma" },
  { id: "figma-make-prototype", icon: "play_circle", label: "Protótipo funcional · Figma Make" },
  { id: "validation", icon: "fact_check", label: "Validação" },
  { id: "design-thinking", icon: "psychology", label: "Design Thinking" },
  { id: "design-system", icon: "widgets", label: "Design System modular" },
  { id: "test-plan", icon: "assignment", label: "Plano de teste" },
  { id: "heuristic-analysis", icon: "rule", label: "Análise heurística" },
  { id: "usability-research", icon: "science", label: "Pesquisa de usabilidade" },
]

const deliverables = (...ids: string[]) => ids.map((id) => proposalDeliverables.find((item) => item.id === id)!).filter(Boolean)

export type ConsultancyPricing = { hours: number; cardCents: number; pixCents: number }
export type ConsultancyConfig = {
  id: Exclude<ConsultancyId, "custom">
  name: string
  description: string
  serviceIds: string[]
  tags: DeliverableOption[]
  deliveryBusinessDays: number
  pricing: ConsultancyPricing
  cta: string
}

export const consultancies: ConsultancyConfig[] = [
  {
    id: "essencial", name: "Consultoria Essencial",
    description: "Entenda o que sua ideia precisa e descubra por onde começar.",
    serviceIds: ["web"],
    tags: deliverables("product-discovery", "journey-map", "flow", "wireframes", "prototypes", "figma", "figma-make-prototype"),
    deliveryBusinessDays: 16, pricing: { hours: 14, cardCents: 157499, pixCents: 141749 }, cta: "Quero começar",
  },
  {
    id: "estrategica", name: "Consultoria Estratégica",
    description: "Organize a experiência, explore soluções e evite decisões no escuro.",
    serviceIds: ["web"],
    tags: deliverables("product-discovery", "journey-map", "flow", "wireframes", "prototypes", "figma", "figma-make-prototype", "validation", "design-thinking", "design-system", "test-plan"),
    deliveryBusinessDays: 12, pricing: { hours: 22, cardCents: 247399, pixCents: 222659 }, cta: "Quero começar",
  },
  {
    id: "completa", name: "Consultoria Completa",
    description: "Analise mais a fundo, teste melhorias e planeje os próximos passos.",
    serviceIds: ["web"], tags: proposalDeliverables,
    deliveryBusinessDays: 6, pricing: { hours: 26, cardCents: 292399, pixCents: 263159 }, cta: "Quero começar",
  },
]

function roundUpTo99(value: number) { return Math.ceil(value - 0.99) + 0.99 }

export function calculateCustomConsultancy(tagCount: number): ConsultancyPricing {
  const hours = tagCount * HOURS_PER_TAG
  const pix = roundUpTo99((hours * HOURLY_RATE) / (1 - PIX_FEE))
  const card = roundUpTo99(Math.max(pix / (1 - PIX_DISCOUNT), (hours * HOURLY_RATE) / (1 - CARD_FEE_ESTIMATE)))
  return { hours, cardCents: Math.round(card * 100), pixCents: Math.round(pix * 100) }
}

export function getConsultancy(id: string) { return consultancies.find((plan) => plan.id === id) }

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

// Public bundle only: never add phone numbers, lead IDs, transcripts or internal notes.
export const publicProposals: PublicProposal[] = [
  {
    slug: "cliente-exemplo",
    client: { displayName: "Cliente Exemplo" },
    conversationSummary: "Sua ideia, produto ou serviço já tem um próximo passo. A gente entendeu seu desafio.",
    briefing: "Transformar a necessidade apresentada em uma experiência clara, validável e pronta para evoluir.",
    challenge: "Reduzir incertezas antes do investimento em desenvolvimento e alinhar escopo, experiência e resultado esperado.",
    solution: "Uma consultoria de produto e experiência com demonstração navegável, entregáveis modulares e próximos passos objetivos.",
    demoUrl: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Fm0giUODNGvJ8sDMJVVPnhk%2F%25F0%259F%2592%25B0-Prosperidade-OCrisArts%3Fnode-id%3D6920-11307",
    serviceIds: ["web"],
    tagIds: consultancies[1].tags.map((tag) => tag.id),
    resultHypotheses: [
      "Mais clareza para priorizar o que deve ser construído primeiro.",
      "Menos retrabalho por meio de validação antes do desenvolvimento.",
      "Uma base visual e funcional coerente para as próximas etapas.",
    ],
    investment: { hourlyRate: HOURLY_RATE, hoursPerTag: HOURS_PER_TAG, pixDiscount: PIX_DISCOUNT },
    cta: { label: "Falar sobre esta proposta", whatsappUrl: "https://wa.me/5548991526789" },
  },
]

export function findProposal(slug?: string) { return publicProposals.find((proposal) => proposal.slug === slug) }
export function normalizeProposalSlug(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}
