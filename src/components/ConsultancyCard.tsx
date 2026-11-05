import TaxonomyTags from "./TaxonomyTags"
import { useI18n } from "../i18n"
import {
  calculateConsultancy,
  proposalServices,
  type ConsultancyConfig,
  type DeliverableOption,
} from "../data/prospeccao"

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
const planText = {
  "pt-BR": {
    essencial: ["Consultoria Essencial", "Entenda o que sua ideia precisa e descubra por onde começar."],
    estrategica: ["Consultoria Estratégica", "Organize a experiência, explore soluções e evite decisões no escuro."],
    completa: ["Consultoria Completa", "Analise mais a fundo, teste melhorias e planeje os próximos passos."],
  },
  en: {
    essencial: ["Essential Consultancy", "Understand what your idea needs and find a clear starting point."],
    estrategica: ["Strategic Consultancy", "Structure the experience, explore solutions and make informed decisions."],
    completa: ["Complete Consultancy", "Look deeper, test improvements and plan the next steps."],
  },
  es: {
    essencial: ["Consultoría Esencial", "Comprende lo que necesita tu idea y descubre por dónde empezar."],
    estrategica: ["Consultoría Estratégica", "Organiza la experiencia, explora soluciones y toma mejores decisiones."],
    completa: ["Consultoría Completa", "Analiza, prueba mejoras y planifica los siguientes pasos."],
  },
} as const


export type CustomPlan = {
  serviceIds: string[]
  tags: DeliverableOption[]
  deliveryBusinessDays: number
}

const copy = {
  "pt-BR": {services:"Serviços",included:"O que você recebe",investment:"Investimento",card:"Cartão à vista",pix:"Pix · 10% OFF",deadline:"Prazo estimado",days:"dias úteis",hours:"horas estimadas",action:"Quero começar",custom:"Sua consultoria",customDescription:"Uma proposta configurada de acordo com o que você precisa.",edit:"Revisar ou editar"},
  en: {services:"Services",included:"What you receive",investment:"Investment",card:"Card · one-time",pix:"Pix · 10% off",deadline:"Estimated delivery",days:"business days",hours:"estimated hours",action:"Get started",custom:"Your consultancy",customDescription:"A proposal tailored to what you need.",edit:"Review or edit"},
  es: {services:"Servicios",included:"Qué recibirás",investment:"Inversión",card:"Tarjeta · pago único",pix:"Pix · 10% de descuento",deadline:"Entrega estimada",days:"días hábiles",hours:"horas estimadas",action:"Empezar",custom:"Tu consultoría",customDescription:"Una propuesta configurada según lo que necesitas.",edit:"Revisar o editar"},
} as const

export default function ConsultancyCard({
  plan,
  custom,
  onSelect,
  onEdit,
  serviceIdsOverride,
  actionLabel,
}: {
  plan?: ConsultancyConfig
  custom?: CustomPlan
  onSelect: () => void
  onEdit?: () => void
  serviceIdsOverride?: string[]
  actionLabel?: string
}) {
  const { language } = useI18n()
  const t = copy[language]
  const tags = plan?.tags ?? custom?.tags ?? []
  const serviceIds = serviceIdsOverride ?? plan?.serviceIds ?? custom?.serviceIds ?? []
  const pricing = calculateConsultancy(tags.length)
  const name = plan ? planText[language][plan.id][0] : t.custom
  const description = plan ? planText[language][plan.id][1] : t.customDescription
  const days = plan?.deliveryBusinessDays ?? custom?.deliveryBusinessDays ?? 1

  return (
    <article className="proposal-plan-card" data-plan-id={plan?.id ?? "custom"} aria-label={name}>
      <header>
        <h3>{name}</h3>
        <p>{description}</p>
      </header>
      <div className="proposal-plan-card__content">
        <div className="proposal-plan-card__services">
          <span>{t.services}</span>
          <TaxonomyTags items={proposalServices.filter(service => serviceIds.includes(service.id))} kind="services" />
        </div>
        <div>
          <span>{t.included}</span>
          <TaxonomyTags items={tags} kind="deliverables" />
        </div>
      </div>
      <dl className="proposal-price">
        <div><dt>{t.card}</dt><dd>{money.format(pricing.listInvestment)}</dd></div>
        <div className="proposal-price__pix"><dt>{t.pix}</dt><dd>{money.format(pricing.pixInvestment)}</dd></div>
      </dl>
      <p className="proposal-plan-card__deadline"><strong>{t.deadline}:</strong> {days} {t.days} · {pricing.hours} {t.hours}</p>
      <div className="proposal-plan-card__actions">
        <button type="button" className="proposal-primary-button" onClick={onSelect}>
          {actionLabel ?? t.action}
          <span aria-hidden="true">arrow_forward</span>
        </button>
        {onEdit && <button type="button" className="proposal-link-button" onClick={onEdit}>{t.edit}</button>}
      </div>
    </article>
  )
}
