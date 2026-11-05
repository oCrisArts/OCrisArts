import ConsultancyCard from "../components/ConsultancyCard"
import TaxonomyTags from "../components/TaxonomyTags"
import { track } from "../analytics/tracking"
import { consultancies, proposalServices } from "../data/prospeccao"
import { useI18n } from "../i18n"

const copy = {
  "pt-BR": {
    eyebrow: "OCrisArts · Consultoria em produtos digitais",
    headline: "O seu sonho merece um caminho.",
    intro: "Você conta o que deseja construir. A consultoria ajuda a entender o desafio, explorar possibilidades e mostrar uma primeira versão navegável antes dos próximos passos.",
    action: "Conte o que você imagina",
    learn: "Entenda como funciona",
    how: "Da conversa à primeira versão",
    howIntro: "Você não precisa chegar com um briefing perfeito. Começamos pelo que faz sentido para você.",
    steps: [
      { title: "Conte a sua ideia", description: "Uma conversa para entender o que você quer criar, para quem e por quê." },
      { title: "Explore possibilidades", description: "Traduzimos o desafio em caminhos visuais, decisões e um protótipo navegável no Figma Make." },
      { title: "Decida como avançar", description: "Você conhece o que está incluído, o investimento e os próximos passos, sem surpresas." },
    ],
    expertise: "Onde a consultoria pode ajudar",
    expertiseIntro: "Marcas, sites, plataformas e experiências digitais: o caminho parte da sua necessidade, não de um pacote pronto.",
    plans: "Três maneiras de começar",
    plansIntro: "Os planos organizam a consultoria; não limitam o que você pode sonhar em construir. A proposta é ajustada ao seu contexto.",
    planAction: "Conversar sobre minha ideia",
    other: "Sua ideia não cabe em um plano? Conte do mesmo jeito.",
    note: "Os valores consideram o escopo de cada consultoria. Um projeto completo de desenvolvimento exige orçamento próprio.",
  },
  en: {
    eyebrow: "OCrisArts · Digital product consultancy",
    headline: "Your dream deserves a way forward.",
    intro: "Tell us what you want to build. Consultancy helps clarify the challenge, explore directions, and see an interactive first version before deciding what comes next.",
    action: "Tell us your idea",
    learn: "How it works",
    how: "From conversation to first version",
    howIntro: "You don't need a perfect brief. We start with what matters to you.",
    steps: [
      { title: "Share your idea", description: "A conversation about what you want to create, for whom and why." },
      { title: "Explore possibilities", description: "Turn the challenge into visual directions, decisions and an interactive Figma Make prototype." },
      { title: "Choose your next step", description: "Understand deliverables, investment and next steps before committing." },
    ],
    expertise: "Where consultancy can help",
    expertiseIntro: "Brands, websites, platforms and digital experiences: the approach starts with your needs, not a preset package.",
    plans: "Three ways to get started",
    plansIntro: "Plans define consultancy scope, not what you can dream of building. Each proposal reflects your context.",
    planAction: "Talk about my idea",
    other: "Your idea doesn't fit a plan? Tell us anyway.",
    note: "Prices reflect consultancy scope. Full software development requires a separate quote.",
  },
  es: {
    eyebrow: "OCrisArts · Consultoría de productos digitales",
    headline: "Tu sueño merece un camino.",
    intro: "Cuéntanos qué quieres construir. La consultoría ayuda a comprender el desafío, explorar opciones y ver una primera versión interactiva antes de avanzar.",
    action: "Cuéntanos tu idea",
    learn: "Cómo funciona",
    how: "De la conversación a la primera versión",
    howIntro: "No necesitas un briefing perfecto. Empezamos por lo que te importa.",
    steps: [
      { title: "Comparte tu idea", description: "Una conversación sobre qué quieres crear, para quién y por qué." },
      { title: "Explora posibilidades", description: "Convertimos el desafío en caminos visuales y un prototipo interactivo en Figma Make." },
      { title: "Decide cómo avanzar", description: "Conoce los entregables, la inversión y los siguientes pasos antes de contratar." },
    ],
    expertise: "En qué puede ayudar la consultoría",
    expertiseIntro: "Marcas, sitios, plataformas y experiencias digitales: el enfoque parte de tus necesidades, no de paquetes cerrados.",
    plans: "Tres maneras de empezar",
    plansIntro: "Los planes organizan la consultoría, pero no limitan lo que sueñas construir. La propuesta se adapta a tu contexto.",
    planAction: "Hablar de mi idea",
    other: "¿Tu idea no encaja en un plan? Cuéntanosla de todos modos.",
    note: "Los precios consideran el alcance de la consultoría. El desarrollo completo requiere un presupuesto aparte.",
  },
} as const

export default function Consultancy() {
  const { language } = useI18n()
  const content = copy[language]
  const toContact = () => {
    track("commercial_click", { channel: "consultancy_contact" })
    document.getElementById("contato")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    })
  }

  return (
    <article className="consultancy-page">
      <header id="consultoria" className="consultancy-hero" aria-labelledby="consultoria-title">
        <video className="consultancy-hero__video" autoPlay muted loop playsInline preload="metadata" poster="/assets/front-page/hero-poster.jpg" aria-hidden="true">
          <source src="/assets/front-page/hero.mp4" type="video/mp4" />
        </video>
        <div className="consultancy-hero__shade" aria-hidden="true" />
        <div className="consultancy-hero__content">
          <p className="consultancy-eyebrow">{content.eyebrow}</p>
          <h1 id="consultoria-title">{content.headline}</h1>
          <p className="consultancy-hero__intro">{content.intro}</p>
          <nav className="consultancy-hero__actions" aria-label={content.learn}>
            <a className="consultancy-button" href="#contato">{content.action}<span aria-hidden="true">arrow_forward</span></a>
            <a className="consultancy-outline" href="#como-funciona">{content.learn}</a>
          </nav>
          <TaxonomyTags items={proposalServices} kind="consultoria-areas" />
        </div>
      </header>

      <section id="como-funciona" className="consultancy-section consultancy-section--steps" aria-labelledby="consultancy-steps-title">
        <div className="consultancy-section__heading">
          <p className="consultancy-eyebrow">01 / 03</p>
          <h2 id="consultancy-steps-title">{content.how}</h2>
          <p>{content.howIntro}</p>
        </div>
        <ol className="consultancy-step-list">
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <span className="consultancy-step-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="servicos" className="consultancy-section consultancy-section--services" aria-labelledby="consultancy-services-title">
        <div className="consultancy-section__heading">
          <p className="consultancy-eyebrow">02 / 03</p>
          <h2 id="consultancy-services-title">{content.expertise}</h2>
          <p>{content.expertiseIntro}</p>
        </div>
        <TaxonomyTags items={proposalServices} kind="consultoria-services" dark />
      </section>

      <section id="planos" className="consultancy-section consultancy-section--plans" aria-labelledby="consultancy-plans-title">
        <header className="consultancy-section__heading">
          <p className="consultancy-eyebrow">03 / 03</p>
          <h2 id="consultancy-plans-title">{content.plans}</h2>
          <p>{content.plansIntro}</p>
        </header>
        <div className="proposal-plans">
          {consultancies.map(plan => (
            <ConsultancyCard key={plan.id} plan={plan} onSelect={toContact} actionLabel={content.planAction} />
          ))}
        </div>
        <div className="consultancy-section__end">
          <a href="#contato" className="consultancy-more">{content.other}<span aria-hidden="true">arrow_forward</span></a>
          <p>{content.note}</p>
        </div>
      </section>
    </article>
  )
}
