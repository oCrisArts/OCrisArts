import TaxonomyTags from "./TaxonomyTags"
import {
  proposalServices,
  type ConsultancyConfig,
  type ConsultancyId,
  type ConsultancyPricing,
  type DeliverableOption,
} from "../data/prospeccao"

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

export type CustomConsultancy = {
  id: "custom"
  name: string
  description: string
  serviceIds: string[]
  tags: DeliverableOption[]
  deliveryBusinessDays: number
  pricing: ConsultancyPricing
}

export type ConsultancySelection = {
  id: ConsultancyId
  name: string
  serviceIds: string[]
  tags: DeliverableOption[]
  deliveryBusinessDays: number
  pricing: ConsultancyPricing
}

export default function ConsultancyCard({
  plan,
  onSelect,
  onEdit,
}: {
  plan: ConsultancyConfig | CustomConsultancy
  onSelect: (selection: ConsultancySelection) => void
  onEdit?: () => void
}) {
  const selection: ConsultancySelection = {
    id: plan.id,
    name: plan.name,
    serviceIds: plan.serviceIds,
    tags: plan.tags,
    deliveryBusinessDays: plan.deliveryBusinessDays,
    pricing: plan.pricing,
  }

  return (
    <article className="proposal-plan-card" data-plan-id={plan.id}>
      <header><h3>{plan.name}</h3><p>{plan.description}</p></header>
      <div className="proposal-plan-card__content">
        <div className="proposal-plan-card__services">
          <span>Serviços</span>
          <TaxonomyTags items={proposalServices.filter((service) => plan.serviceIds.includes(service.id))} kind="services" />
        </div>
        <div><span>O que você recebe</span><TaxonomyTags items={plan.tags} kind="deliverables" /></div>
      </div>
      <dl className="proposal-price">
        <div><dt>Cartão</dt><dd>{money.format(plan.pricing.cardCents / 100)}</dd></div>
        <div className="proposal-price__pix"><dt>Pix · 10% OFF</dt><dd>{money.format(plan.pricing.pixCents / 100)}</dd></div>
      </dl>
      <p className="proposal-plan-card__deadline"><strong>Prazo:</strong> Até {plan.deliveryBusinessDays} dias úteis · {plan.pricing.hours} horas estimadas</p>
      <div className="proposal-plan-card__actions">
        <button type="button" className="proposal-primary-button" onClick={() => onSelect(selection)}>{plan.id === "custom" ? "Selecionar sua consultoria" : plan.cta} <span aria-hidden="true">arrow_forward</span></button>
        {onEdit && <button type="button" className="proposal-link-button" onClick={onEdit}>Revisar ou editar</button>}
      </div>
    </article>
  )
}
