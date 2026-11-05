import { FormEvent, useMemo, useState } from "react"

import { confirmContactSuccess, track } from "../analytics/tracking"
import { useI18n } from "../i18n"

const pageLinks = [
  ["home", "t0554", "/#inicio"], ["cases", "t0555", "/#cases"], ["design_services", "t0556", "/#atuacao"],
  ["badge", "t0557", "/#sobre"], ["analytics", "t0558", "/#evidencias"], ["send", "t0559", "/#contato"],
] as const
const socialLinks = [
  ["\uF1B4", "ocrisart", "https://www.behance.net/ocrisart"], ["\uF08C", "@ocrisart", "https://www.linkedin.com/in/ocrisarts"],
  ["\uF232", "+55 48 99152-6789", "https://wa.me/5548991526789"], ["\uF2C6", "+55 48 99152-6789", "https://t.me/+5548991526789"],
] as const

type ConversationStep = "idea" | "name" | "whatsapp" | "consent" | "submitting" | "done" | "error"
const copy = {
  "pt-BR": { title: "E agora?", intro: "Sua ideia, produto ou serviço já tem um próximo passo.", support: "Vamos descobrir juntos qual decisão pode fazer isso avançar.", ideaPrompt: "Conte um pouco sobre sua ideia, necessidade ou desafio.", ideaPlaceholder: "Pode começar com uma ideia, dúvida ou desafio.", namePrompt: "Para iniciar, como podemos te chamar?", namePlaceholder: "Digite o seu nome", whatsappPrompt: "Agora precisamos da melhor forma de falar com você.", whatsappPlaceholder: "WhatsApp com DDI e DDD: +55 48 99999-9999", consentPrompt: "Você autoriza o armazenamento destes dados e o envio da proposta pelo WhatsApp?", consent: "Sim, autorizo o armazenamento dos dados informados e o contato pelo WhatsApp para receber minha proposta.", policy: "Política de privacidade", start: "Iniciar", send: "Enviar", confirm: "Confirmar e enviar", done: "Recebemos seu projeto e vamos analisar as informações.", doneSla: "Você receberá uma proposta personalizada pelo WhatsApp em até {hours} horas.", doneNoSla: "Entraremos em contato pelo WhatsApp assim que a análise estiver concluída.", error: "Não foi possível registrar agora. Tente novamente em alguns instantes." },
  en: { title: "What now?", intro: "Your idea, product, or service already has a next step.", support: "Let's find the decision that can move it forward.", ideaPrompt: "Tell us about your idea, need, or challenge.", ideaPlaceholder: "Start with an idea, question, or challenge.", namePrompt: "First, what should we call you?", namePlaceholder: "Enter your name", whatsappPrompt: "Now we need the best way to reach you.", whatsappPlaceholder: "WhatsApp with country and area code", consentPrompt: "Do you authorize storing this data and receiving the proposal by WhatsApp?", consent: "Yes, I authorize storing the data provided and WhatsApp contact to receive my proposal.", policy: "Privacy policy", start: "Start", send: "Send", confirm: "Confirm and send", done: "We received your project and will review the information.", doneSla: "You will receive a personalized proposal by WhatsApp within {hours} hours.", doneNoSla: "We will contact you by WhatsApp as soon as the review is complete.", error: "We couldn't register it now. Please try again shortly." },
  es: { title: "¿Y ahora?", intro: "Tu idea, producto o servicio ya tiene un próximo paso.", support: "Descubramos juntos qué decisión puede hacerlo avanzar.", ideaPrompt: "Cuéntanos sobre tu idea, necesidad o desafío.", ideaPlaceholder: "Empieza con una idea, duda o desafío.", namePrompt: "Para empezar, ¿cómo podemos llamarte?", namePlaceholder: "Escribe tu nombre", whatsappPrompt: "Ahora necesitamos la mejor forma de hablar contigo.", whatsappPlaceholder: "WhatsApp con código de país y área", consentPrompt: "¿Autorizas almacenar estos datos y enviar la propuesta por WhatsApp?", consent: "Sí, autorizo el almacenamiento de los datos informados y el contacto por WhatsApp para recibir mi propuesta.", policy: "Política de privacidad", start: "Iniciar", send: "Enviar", confirm: "Confirmar y enviar", done: "Recibimos tu proyecto y analizaremos la información.", doneSla: "Recibirás una propuesta personalizada por WhatsApp en hasta {hours} horas.", doneNoSla: "Te contactaremos por WhatsApp cuando termine el análisis.", error: "No pudimos registrarlo ahora. Inténtalo de nuevo en unos instantes." },
} as const

function normalizeWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "")
  return digits.length >= 10 && digits.length <= 15 ? `+${digits}` : ""
}

function ContactConversation() {
  const { language, path } = useI18n()
  const c = copy[language]
  const [step, setStep] = useState<ConversationStep>("idea")
  const [input, setInput] = useState("")
  const [idea, setIdea] = useState("")
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [consent, setConsent] = useState(false)
  const [validation, setValidation] = useState("")
  const [startedAt] = useState(() => Date.now())
  const [website, setWebsite] = useState("")
  const slaGuaranteed = import.meta.env.VITE_PROPOSAL_SLA_GUARANTEED === "true"
  const slaHours = Number(import.meta.env.VITE_PROPOSAL_SLA_HOURS || 12)
  const prompt = step === "idea" ? c.ideaPrompt : step === "name" ? c.namePrompt : step === "whatsapp" ? c.whatsappPrompt : c.consentPrompt
  const placeholder = step === "idea" ? c.ideaPlaceholder : step === "name" ? c.namePlaceholder : c.whatsappPlaceholder
  const messages = useMemo(() => [
    ...(idea ? [{ side: "client", text: idea }] : []), ...(name ? [{ side: "client", text: name }] : []), ...(whatsapp ? [{ side: "client", text: whatsapp }] : []),
  ], [idea, name, whatsapp])

  const next = async (event: FormEvent) => {
    event.preventDefault(); setValidation("")
    if (step === "idea") { if (input.trim().length < 10) return setValidation("Conte um pouco mais para entendermos o desafio."); setIdea(input.trim()); setInput(""); setStep("name"); track("contact_conversation_start", { form_id: "contact" }); return }
    if (step === "name") { if (input.trim().length < 2) return setValidation("Informe como podemos chamar você."); setName(input.trim()); setInput(""); setStep("whatsapp"); return }
    if (step === "whatsapp") { const normalized = normalizeWhatsapp(input); if (!normalized) return setValidation("Inclua DDI e DDD. Exemplo: +55 48 99999-9999."); setWhatsapp(normalized); setInput(""); setStep("consent"); return }
    if (step !== "consent" || !consent) return setValidation("Precisamos do seu consentimento para registrar e enviar a proposta.")
    const projectUrl = import.meta.env.VITE_SUPABASE_URL, publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
    if (!projectUrl || !publishableKey) { setStep("error"); setValidation("O cadastro seguro ainda não está configurado neste ambiente."); return }
    setStep("submitting")
    try {
      const response = await fetch(`${projectUrl}/functions/v1/prospeccao-lead`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${publishableKey}`, apikey: publishableKey }, body: JSON.stringify({ idea, name, whatsapp, consent: true, privacyPolicyVersion: "2026-11-05", locale: language, sourcePath: location.pathname, website, startedAt }) })
      if (!response.ok) throw new Error("lead_rejected")
      setStep("done"); confirmContactSuccess(); track("lead_registration", { lead_status: "novo", form_id: "contact" }); track("contact_conversation_complete", { form_id: "contact" })
    } catch { setStep("error"); setValidation(c.error) }
  }

  return <form className="contact-conversation" data-contact-form data-hj-suppress data-clarity-mask="true" onSubmit={next}>
    <div className="contact-conversation__history" aria-live="polite">
      <article className="conversation-message is-ocris"><img src="/assets/shared/branding/site-brand-mark-compact.svg" alt="" /><p>{c.ideaPrompt}</p></article>
      {messages.map((message, index) => <article className={`conversation-message is-${message.side}`} key={`${message.side}-${index}`}><span className="conversation-avatar" aria-hidden="true">person</span><p>{message.text}</p></article>)}
      {step !== "idea" && !["done", "error"].includes(step) && <article className="conversation-message is-ocris"><img src="/assets/shared/branding/site-brand-mark-compact.svg" alt="" /><p>{prompt}</p></article>}
      {step === "done" && <article className="conversation-message is-ocris is-result"><img src="/assets/shared/branding/site-brand-mark-compact.svg" alt="" /><div><strong>{c.done}</strong><p>{slaGuaranteed ? c.doneSla.replace("{hours}", String(slaHours)) : c.doneNoSla}</p></div></article>}
    </div>
    {!["done", "submitting"].includes(step) && <div className="contact-conversation__composer">
      {step === "consent" ? <label className="contact-consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>{c.consent} <a href={path("/politica-de-privacidade")} target="_blank" rel="noopener noreferrer">{c.policy}</a>.</span></label> : <textarea rows={step === "idea" ? 3 : 1} value={input} onChange={(event) => setInput(event.target.value)} placeholder={placeholder} autoComplete={step === "name" ? "name" : step === "whatsapp" ? "tel" : "off"} maxLength={step === "idea" ? 1500 : 120} aria-label={placeholder} />}
      <label className="contact-honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
      {validation && <p className="contact-conversation__error" role="alert">{validation}</p>}
      <button type="submit" className="conversation-submit" disabled={step === "consent" && !consent}>{step === "idea" ? c.start : step === "consent" ? c.confirm : c.send}<span aria-hidden="true">arrow_upward</span></button>
    </div>}
    {step === "submitting" && <p className="contact-conversation__loading" role="status">Registrando com segurança…</p>}
  </form>
}

export function SiteContact() {
  const { language } = useI18n(); const c = copy[language]
  return <section id="contato" aria-labelledby="contact-title" className="shared-contact" data-name="section.contact-cta" data-node-id="6924:13932"><div className="shared-contact__layout"><div className="shared-contact__copy"><h2 id="contact-title">{c.title}</h2><p>{c.intro}<br />{c.support}</p></div><ContactConversation /></div></section>
}

export function SiteFooter() {
  const { t, text, path } = useI18n()
  return <footer className="flex min-h-[1080px] w-full items-start justify-center bg-[#eeeff1] px-4 py-3 md:items-center md:px-12 md:py-40" data-name="footer.site" data-node-id="6325:219"><div className="flex min-h-[1056px] w-full flex-col items-center justify-start gap-6 md:min-h-[540px] md:justify-center md:gap-9">
    <div className="flex w-full flex-col items-center text-center font-['Sora:Regular']"><img src="/assets/shared/branding/site-brand-mark.svg" alt="" width="117" height="117" className="size-[117px]" /><p className="whitespace-nowrap text-[38px] font-medium leading-[1.2] text-[#6b0013] md:text-[44px]">{t("t0600")}</p><div className="flex w-full flex-col items-center gap-4 px-2 py-3"><p className="whitespace-nowrap text-[28px] leading-[1.2] text-[#000102] md:text-[30px]">{t("t0629")}</p><p className="max-w-[620px] text-[16px] leading-6 text-[#0d0e10]">{t("t0630")}</p></div></div>
    <div className="flex w-full flex-col items-center gap-1 text-[#020305] md:gap-6"><nav aria-label={text("Navegação do rodapé")} className="flex w-full flex-col items-start justify-center md:w-auto md:flex-row md:items-center">{pageLinks.map(([icon, label, href]) => <a key={label} href={path(href)} className="flex h-[60px] min-h-[60px] w-full items-center gap-1 py-2 font-['Geist:Regular'] text-[12px] md:min-w-[160px] md:w-auto md:px-[18px]"><span className="font-['Material_Symbols_Outlined:Light'] text-[9px] leading-none" aria-hidden="true">{icon}</span><span className="leading-none">{t(label)}</span></a>)}</nav><nav aria-label={text("Redes e contatos")} className="flex w-full flex-col items-center justify-center md:w-auto md:flex-row">{socialLinks.map(([icon, label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className="flex h-[50px] w-full items-center justify-center gap-1 p-2 font-['Geist:Regular'] text-[12px] md:h-[60px] md:min-w-[160px] md:w-auto"><span className="font-['Font_Awesome_5_Brands:Regular'] text-[9px] leading-none" aria-hidden="true">{icon}</span><span className="leading-none">{label}</span></a>)}</nav></div>
    <p className="py-4 font-['Sora:Regular'] text-[11px] leading-[1.6] text-[#0d0e10]">{t("t0633")}</p>
  </div></footer>
}

export default function SiteContactFooter() { return <><SiteContact /><SiteFooter /></> }
