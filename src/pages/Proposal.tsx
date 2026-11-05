import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { track } from "../analytics/tracking"
import ConsultancyCard, { type CustomPlan } from "../components/ConsultancyCard"
import { SiteFooter } from "../components/SiteContactFooter"
import {
  calculateConsultancy,
  consultancies,
  proposalDeliverables,
  proposalServices,
  publicProposals,
  type DeliverableOption,
} from "../data/prospeccao"
import { useI18n } from "../i18n"

gsap.registerPlugin(ScrollTrigger)

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

function CustomizationModal({
  initial,
  onClose,
  onConfirm,
}: {
  initial?: CustomPlan
  onClose: () => void
  onConfirm: (value: CustomPlan) => void
}) {
  const dialog = useRef<HTMLDivElement>(null)
  const [serviceIds, setServiceIds] = useState(initial?.serviceIds ?? ["sites"])
  const [tagIds, setTagIds] = useState(initial?.tags.map((tag) => tag.id) ?? consultancies[0].tags.map((tag) => tag.id))
  const tags = proposalDeliverables.filter((tag) => tagIds.includes(tag.id))
  const pricing = calculateConsultancy(tags.length)
  const days = Math.max(3, Math.ceil(pricing.hours / 4))

  useLayoutEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!reduced) gsap.fromTo(dialog.current, { autoAlpha: 0, y: 28, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" })
    dialog.current?.querySelector<HTMLElement>("button")?.focus()
  }, [])

  useEffect(() => {
    const escape = (event: KeyboardEvent) => event.key === "Escape" && onClose()
    document.addEventListener("keydown", escape)
    return () => document.removeEventListener("keydown", escape)
  }, [onClose])

  const toggle = (values: string[], value: string, setter: (next: string[]) => void) =>
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value])

  return (
    <div className="proposal-modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialog} className="proposal-modal" role="dialog" aria-modal="true" aria-labelledby="customization-title">
        <header>
          <div><span>Personalize do seu jeito</span><h2 id="customization-title">Monte sua consultoria</h2></div>
          <button type="button" className="proposal-modal__close" onClick={onClose} aria-label="Fechar">close</button>
        </header>
        <fieldset>
          <legend>Serviços</legend>
          <div className="proposal-options-grid">
            {proposalServices.map((service) => <label className="proposal-option" key={service.id}><input type="checkbox" checked={serviceIds.includes(service.id)} onChange={() => toggle(serviceIds, service.id, setServiceIds)} /><span className="taxonomy-tag"><span className="taxonomy-tag__icon" aria-hidden="true">{service.icon}</span>{service.label}</span></label>)}
          </div>
        </fieldset>
        <fieldset>
          <legend>Entregáveis</legend>
          <div className="proposal-options-grid">
            {proposalDeliverables.map((tag) => <label className="proposal-option" key={tag.id}><input type="checkbox" checked={tagIds.includes(tag.id)} onChange={() => toggle(tagIds, tag.id, setTagIds)} /><span className="taxonomy-tag"><span className="taxonomy-tag__icon" aria-hidden="true">{tag.icon}</span>{tag.label}</span></label>)}
          </div>
        </fieldset>
        <aside className="proposal-custom-summary" aria-live="polite">
          <div><span>Entregáveis</span><strong>{tags.length}</strong></div>
          <div><span>Horas estimadas</span><strong>{pricing.hours}h</strong></div>
          <div><span>Investimento estimado</span><strong>{money.format(pricing.listInvestment)}</strong></div>
          <div><span>Prazo estimado</span><strong>Até {days} dias úteis</strong></div>
        </aside>
        <button type="button" className="proposal-primary-button" disabled={!serviceIds.length || !tags.length} onClick={() => onConfirm({ serviceIds, tags, deliveryBusinessDays: days })}>Confirmar minha consultoria <span aria-hidden="true">check</span></button>
      </div>
    </div>
  )
}

export default function ProposalPage() {
  const { slug = "" } = useParams()
  const { path } = useI18n()
  const root = useRef<HTMLElement>(null)
  const demo = useRef<HTMLDivElement>(null)
  const proposal = publicProposals[slug]
  const [iframeStatus, setIframeStatus] = useState<"loading" | "ready" | "error">("loading")
  const [customOpen, setCustomOpen] = useState(false)
  const [customPlan, setCustomPlan] = useState<CustomPlan>()
  const commercialUrl = useMemo(() => proposal?.cta.whatsappUrl ?? "https://wa.me/5548991526789", [proposal])

  useEffect(() => {
    if (!proposal) return
    track("proposal_view")
    const timeout = window.setTimeout(() => setIframeStatus((state) => state === "loading" ? "error" : state), 15000)
    return () => clearTimeout(timeout)
  }, [proposal])

  useLayoutEffect(() => {
    if (!proposal || !root.current) return
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-proposal-reveal]").forEach((section) => gsap.from(section.children, { y: 36, autoAlpha: 0, duration: 0.85, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none reverse" } }))
      }, root)
      return () => context.revert()
    })
    return () => mm.revert()
  }, [proposal])

  if (!proposal) return <article className="proposal-not-found"><h1>Proposta não encontrada</h1><p>Confira o endereço recebido ou fale com a gente.</p><a href={path("/consultoria")}>Ver consultorias</a></article>

  const selectPlan = (name: string, tags: DeliverableOption[], serviceIds: string[]) => {
    track("consultancy_selection", { consultancy_plan: name === "Sua consultoria" ? "custom" : name.toLowerCase().replace("consultoria ", "") })
    track("commercial_click", { channel: "whatsapp" })
    const pricing = calculateConsultancy(tags.length)
    const message = encodeURIComponent(`Olá! Quero conversar sobre a proposta ${proposal.slug}.\nPlano: ${name}\nServiços: ${proposalServices.filter((service) => serviceIds.includes(service.id)).map((service) => service.label).join(", ")}\nEntregáveis: ${tags.map((tag) => tag.label).join(", ")}\nEstimativa: ${pricing.hours}h · Investimento ${money.format(pricing.listInvestment)}`)
    window.open(`${commercialUrl}?text=${message}`, "_blank", "noopener,noreferrer")
  }

  return (
    <article ref={root} className="proposal-page">
      <header id="seu-projeto" className="proposal-intro" data-proposal-reveal>
        <div className="proposal-intro__copy"><p className="proposal-eyebrow">Proposta personalizada</p><h1>Olá, {proposal.client.displayName}</h1><p>{proposal.conversationSummary}</p></div>
        <div id="conversa" className="proposal-conversation" aria-label="Resumo da conversa">
          <article className="is-client">{proposal.briefing}</article>
          <article className="is-client">{proposal.challenge}</article>
          <article className="is-ocris"><img src="/assets/shared/branding/site-brand-mark-compact.svg" alt="" /><div><strong>A solução proposta</strong><p>{proposal.solution}</p><button type="button" onClick={() => document.getElementById("proposta")?.scrollIntoView({ behavior: "smooth" })}>Veja abaixo <span aria-hidden="true">arrow_downward</span></button></div></article>
        </div>
      </header>

      <section id="proposta" className="proposal-demo" ref={demo} aria-labelledby="proposal-demo-title">
        <h2 id="proposal-demo-title" className="sr-only">Demonstração da proposta</h2>
        {iframeStatus !== "ready" && <div className="proposal-demo__status" role="status">{iframeStatus === "loading" ? "Carregando a demonstração…" : "Não foi possível carregar a demonstração aqui."}</div>}
        <iframe title={`Demonstração para ${proposal.client.displayName}`} src={proposal.demoUrl} loading="lazy" allow="fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onLoad={() => setIframeStatus("ready")} onError={() => setIframeStatus("error")} />
        <div className="proposal-demo__actions">
          <button type="button" onClick={() => { track("proposal_demo_interaction", { embed_action: "fullscreen" }); demo.current?.requestFullscreen?.() }}>Tela cheia <span aria-hidden="true">fullscreen</span></button>
          <a href={proposal.demoUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("proposal_demo_interaction", { embed_action: "new_tab" })}>Abrir demonstração <span aria-hidden="true">open_in_new</span></a>
        </div>
      </section>

      <section id="investimento" className="proposal-investment" data-proposal-reveal>
        <header><h2>Investimento</h2><p>Escolha a consultoria que faz sentido para seu projeto. Veja os serviços e o que está incluído em cada opção.</p></header>
        <div className="proposal-plans">
          {consultancies.map((plan) => <ConsultancyCard key={plan.id} plan={plan} serviceIdsOverride={proposal.serviceIds} onSelect={() => selectPlan(plan.name, plan.tags, proposal.serviceIds)} />)}
          {customPlan && <ConsultancyCard custom={customPlan} onSelect={() => selectPlan("Sua consultoria", customPlan.tags, customPlan.serviceIds)} onEdit={() => { track("consultancy_customization", { interaction_type: "edit" }); setCustomOpen(true) }} />}
        </div>
        <button type="button" className="proposal-customize-trigger" onClick={() => { track("consultancy_customization", { interaction_type: "start" }); setCustomOpen(true) }}>Não encontrou o que precisa? <strong>Personalize do seu jeito</strong> <span aria-hidden="true">settings</span></button>
      </section>

      <SiteFooter />
      {customOpen && <CustomizationModal initial={customPlan} onClose={() => setCustomOpen(false)} onConfirm={(value) => { setCustomPlan(value); setCustomOpen(false); track("consultancy_customization", { interaction_type: "confirm", custom_tag_count: value.tags.length, custom_service_count: value.serviceIds.length }); requestAnimationFrame(() => document.querySelector<HTMLElement>("[data-plan-id='custom']")?.scrollIntoView({ behavior: "smooth", block: "center" })) }} />}
    </article>
  )
}
