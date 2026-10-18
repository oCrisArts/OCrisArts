import { useI18n } from '../i18n'

export default function PrototypeEmbed({ title, url, nodeId }: { title: string; url: string; nodeId: string }) {
  const { text } = useI18n()
  return <section className="prototype-section" data-name="section.step.deliver" data-node-id={nodeId} data-section-id="artifacts">
    <iframe title={title} src={url} loading="lazy" className="prototype-embed" allow="fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
    <a href={url} target="_blank" rel="noopener noreferrer">{text('Abrir protótipo em nova aba')}: {title}</a>
  </section>
}
