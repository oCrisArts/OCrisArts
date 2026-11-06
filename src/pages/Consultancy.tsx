import ConsultancyCard from "../components/ConsultancyCard"
import SiteContactFooter from "../components/SiteContactFooter"
import TaxonomyTags from "../components/TaxonomyTags"
import { track } from "../analytics/tracking"
import { consultancies, proposalServices } from "../data/prospeccao"

const faq = [
  ["Preciso ter uma ideia pronta para entrar em contato?", "Não. Você pode começar contando o que imagina, mesmo sem conhecer as ferramentas ou ter um briefing definido."],
  ["Vocês criam sites, lojas virtuais e aplicativos?", "Sim. A consultoria define o caminho e os entregáveis; o desenvolvimento completo pode ser contratado em um escopo separado."],
  ["Qual é a diferença entre as três consultorias?", "Elas variam na profundidade, quantidade de entregáveis, horas estimadas e prazo."],
  ["Posso pedir algo que não esteja nos planos?", "Sim. Use “Personalize do seu jeito” na proposta ou conte seu projeto no atendimento."],
  ["O que recebo no Figma Make?", "Uma demonstração navegável para visualizar e validar a proposta. Ela não substitui automaticamente uma aplicação em produção."],
  ["Minha proposta será igual à de outros clientes?", "Não. O template é reutilizado, mas desafio, direção, protótipo e escopo são preparados para cada contexto."],
  ["Posso contratar somente a consultoria?", "Sim. O desenvolvimento completo é um escopo separado."],
  ["Como funciona a personalização?", "Você seleciona entregáveis e recebe uma estimativa de horas, prazo e valor validada no servidor."],
  ["Posso pagar por Pix ou cartão?", "Sim. Os meios disponíveis aparecem no Checkout Stripe. O Pix possui o desconto indicado no orçamento."],
  ["Quando recebo minha proposta?", "O prazo é informado após o briefing, conforme complexidade e disponibilidade."],
  ["Minhas informações ficam protegidas?", "Dados pessoais e briefings privados não são publicados automaticamente na proposta."],
  ["Posso contratar novas etapas depois?", "Sim. Novas etapas podem ser definidas em escopos e orçamentos separados."],
] as const

export default function ConsultancyPage() {
  const contact = () => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
  return <main className="consultancy-page">
    <header id="inicio" className="consultancy-hero">
      <p className="proposal-eyebrow">OCrisArts · O Arquiteto dos Sonhos</p>
      <h1>Transforme sua ideia em um caminho possível.</h1>
      <p>Estratégia, design e uma demonstração navegável para reduzir incertezas antes de construir.</p>
      <button type="button" className="proposal-primary-button" onClick={contact}>Conte sua ideia <span aria-hidden="true">arrow_downward</span></button>
    </header>

    <section id="como-funciona" className="consultancy-section" aria-labelledby="how-title">
      <header><p className="proposal-eyebrow">Como funciona</p><h2 id="how-title">Do sonho à decisão</h2></header>
      <ol className="consultancy-steps"><li><strong>1. Conversar</strong><span>Você compartilha a ideia sem precisar escolher um plano.</span></li><li><strong>2. Explorar</strong><span>Organizamos o desafio e mostramos caminhos possíveis.</span></li><li><strong>3. Decidir</strong><span>Você avalia a proposta, o escopo e como deseja avançar.</span></li></ol>
    </section>

    <section id="servicos" className="consultancy-section" aria-labelledby="services-title">
      <header><p className="proposal-eyebrow">Serviços</p><h2 id="services-title">Uma ideia pode tomar formas diferentes</h2></header>
      <TaxonomyTags items={proposalServices} kind="services" />
    </section>

    <section id="planos" className="proposal-investment consultancy-section" aria-labelledby="plans-title">
      <header><p className="proposal-eyebrow">Consultorias</p><h2 id="plans-title">Escolha a profundidade do trabalho</h2><p>Os planos organizam a contratação, sem limitar o que você pode construir.</p></header>
      <div className="proposal-plans">{consultancies.map((plan) => <ConsultancyCard key={plan.id} plan={plan} onSelect={() => { track("consultancy_selection", { consultancy_plan: plan.id, source: "landing" }); contact() }} />)}</div>
    </section>

    <section id="faq" className="consultancy-section consultancy-faq" aria-labelledby="faq-title">
      <header><p className="proposal-eyebrow">Perguntas frequentes</p><h2 id="faq-title">Antes de começar</h2></header>
      <div>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      <button type="button" className="proposal-primary-button" onClick={contact}>Ainda tem dúvidas? Conte sua ideia.</button>
    </section>

    <SiteContactFooter />
  </main>
}
