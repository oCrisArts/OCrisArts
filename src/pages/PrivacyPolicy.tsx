import { useI18n } from "../i18n"

export default function PrivacyPolicy() {
  const { path } = useI18n()
  return <main className="privacy-page">
    <a href={path("/")} className="privacy-page__back">← Início</a>
    <article>
      <p className="proposal-eyebrow">Privacidade</p>
      <h1>Política de privacidade da prospecção</h1>
      <p>Última atualização: 5 de novembro de 2026.</p>
      <h2>Dados tratados</h2>
      <p>Quando você autoriza o envio, registramos seu nome, WhatsApp com DDI e DDD, a descrição da ideia, necessidade ou desafio, idioma, página de origem, versão do consentimento e data do cadastro.</p>
      <h2>Finalidade e base legal</h2>
      <p>Usamos esses dados somente para analisar a solicitação, preparar uma proposta personalizada e entrar em contato pelo WhatsApp, com base no consentimento explícito fornecido no formulário.</p>
      <h2>Segurança e acesso</h2>
      <p>Os dados não ficam disponíveis em rotas públicas. O cadastro passa por uma função segura, a tabela possui RLS e não permite leitura pública. Chaves administrativas não são enviadas ao navegador.</p>
      <h2>Retenção e seus direitos</h2>
      <p>Os dados são mantidos apenas pelo período necessário para a prospecção e obrigações aplicáveis. Você pode solicitar confirmação, correção ou exclusão pelo WhatsApp <a href="https://wa.me/5548991526789">+55 48 99152-6789</a>.</p>
      <h2>Propostas compartilháveis</h2>
      <p>Uma proposta pública contém somente informações previamente aprovadas para compartilhamento. Telefones, e-mails, transcrições, identificadores de lead e notas internas nunca devem ser incluídos na rota pública.</p>
    </article>
  </main>
}
