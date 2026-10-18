import { Navigate, useParams } from "react-router-dom"
import { cases, findCase, type CaseArtifact, type ContentRef, type CaseMetric } from "../data/cases"
import { useI18n } from "../i18n"
import TaxonomyTags from "../components/TaxonomyTags"
import CaseCard from "../components/CaseCard"
import ServiceCard from "../components/ServiceCard"

const sectionClass =
  "flex min-h-[min(1080px,100svh)] w-full items-center px-[clamp(20px,8.333vw,160px)] py-[clamp(64px,6vw,128px)]"

function HeroSection({ title, subtitle, tags, hero }: { title: string; subtitle: string; tags: any[]; hero: string }) {
  const { t } = useI18n()

  return (
    <header
      className="relative isolate flex h-[min(1080px,100svh)] min-h-[640px] w-full flex-col items-start justify-end gap-8 overflow-clip bg-[#94999a] px-[clamp(20px,8.333vw,160px)] py-[clamp(64px,5.833vw,112px)]"
      data-name="header.intro"
    >
      <div className="relative z-10 flex w-full flex-col items-start gap-6 [word-break:break-word]">
        <h1 className="max-w-[1180px] font-['Sora:SemiBold'] text-[clamp(36px,4.22vw,81px)] font-semibold leading-[1.1] text-[#fcfdfe]">
          {t(title)}
        </h1>
        <p className="max-w-[980px] text-[clamp(20px,1.563vw,30px)] leading-[1.3] text-[#fcfdfe]">
          {t(subtitle)}
        </p>
        <TaxonomyTags kind="meta" items={tags} />
      </div>
      <div className="absolute inset-0 z-[3] bg-black/40" data-name="div.hero-overlay" />
      <div className="absolute inset-0 z-[2]" data-name="img.hero-image" style={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
    </header>
  )
}

function ContextSection({ contextCopy, contextMedia, project }: { contextCopy: ContentRef[]; contextMedia?: string; project: string }) {
  const { t, text } = useI18n()

  return (
    <section className={sectionClass} data-name="section.context" data-section-id="context">
      <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-24">
        <div className="flex flex-1 flex-col gap-6">
          <h2 className="text-[16px] font-semibold leading-[1.3] tracking-[0.64px] text-[#0d0e10]">
            {t("t0018")}
          </h2>
          <div className="flex max-w-[1040px] flex-col gap-6 text-[16px] leading-[1.5] text-[#000102]">
            {contextCopy.map((item, index) => (
              <p key={index}>{item.key ? t(item.key) : item.text}</p>
            ))}
          </div>
        </div>
        {contextMedia && (
          <figure className="flex w-full max-w-[320px] shrink-0 flex-col gap-9" aria-label={project}>
            <img src={contextMedia} alt="" className="w-full" />
          </figure>
        )}
      </div>
    </section>
  )
}

function ChallengeSection({ challenge }: { challenge: ContentRef }) {
  const { t } = useI18n()

  return (
    <section className={`${sectionClass} relative isolate justify-center overflow-clip`} data-name="section.challenge" data-section-id="challenge">
      <div className="relative z-10 flex w-full max-w-[1500px] flex-col items-center gap-8 text-center font-['Sora:SemiBold'] font-semibold">
        <h2 className="text-[16px] leading-[1.3] tracking-[0.64px] text-[#0d0e10]">
          {t("t0021")}
        </h2>
        <p className="max-w-[1200px] text-[clamp(26px,1.875vw,36px)] leading-[1.2] text-[#000102]">
          {challenge.key ? t(challenge.key) : challenge.text}
        </p>
      </div>
    </section>
  )
}

function ProcessSection({ process, methodology, services }: { process: ContentRef[]; methodology: any[]; services: string[] }) {
  const { text } = useI18n()

  return (
    <section className={sectionClass} data-name="section.process" data-section-id="process">
      <div className="flex w-full flex-col gap-12">
        <div className="flex flex-1 flex-col gap-6">
          <h2 className="text-[16px] font-semibold leading-[1.3] tracking-[0.64px] text-[#0d0e10]">
            {text("03 · PROCESSO")}
          </h2>
          <div className="flex max-w-[1040px] flex-col gap-6 text-[16px] leading-[1.5] text-[#000102]">
            {process.map((item, index) => (
              <p key={index}>{item.key ? text(item.key) : item.text}</p>
            ))}
          </div>
        </div>
        <TaxonomyTags kind="process-tags" items={methodology} />
        {services.length > 0 && (
          <div className="flex w-full flex-wrap gap-4">
            {services.map((service) => (
              <div key={service} className="px-4 py-2 bg-[#000102] text-[#fcfdfe] rounded-full text-sm">
                {service}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ArtifactSection({ artifact }: { artifact: CaseArtifact }) {
  const { text } = useI18n()

  if (artifact.layout === "video") {
    return (
      <section className="flex min-h-[min(1080px,100svh)] w-full flex-col items-center justify-center gap-6 px-[clamp(20px,8.333vw,160px)] py-6" data-name="section.artifact" data-section-id="artifacts">
        <div className="flex w-full justify-start">
          <TaxonomyTags kind="artifact" items={[{ icon: artifact.icon, label: artifact.label }]} />
        </div>
        {artifact.video && (
          <video
            className="w-full max-w-4xl rounded-lg"
            controls
            preload="metadata"
          >
            <source src={artifact.video} type="video/mp4" />
          </video>
        )}
      </section>
    )
  }

  if (artifact.layout === "embed-fullscreen" && artifact.embed) {
    return (
      <section className="flex min-h-[min(1080px,100svh)] w-full flex-col items-center justify-center gap-6 px-[clamp(20px,8.333vw,160px)] py-6" data-name="section.artifact" data-section-id="artifacts">
        <div className="flex w-full justify-start">
          <TaxonomyTags kind="artifact" items={[{ icon: artifact.icon, label: artifact.label }]} />
        </div>
        <iframe
          src={artifact.embed.url}
          title={artifact.embed.title}
          className="w-full h-[80vh] rounded-lg border-0"
          allowFullScreen
        />
      </section>
    )
  }

  if (artifact.layout === "carousel" && artifact.images) {
    return (
      <section className="flex min-h-[min(1080px,100svh)] w-full flex-col items-center justify-center gap-6 px-[clamp(20px,8.333vw,160px)] py-6" data-name="section.artifact" data-section-id="artifacts">
        <div className="flex w-full justify-start">
          <TaxonomyTags kind="artifact" items={[{ icon: artifact.icon, label: artifact.label }]} />
        </div>
        <div className="flex w-full overflow-x-auto gap-4 snap-x snap-mandatory">
          {artifact.images.map((img, index) => (
            <figure key={index} className="flex-shrink-0 snap-center">
              <img src={img} alt={artifact.label} className="h-[60vh] w-auto object-contain" />
            </figure>
          ))}
        </div>
      </section>
    )
  }

  if (artifact.layout === "grid" && artifact.images) {
    return (
      <section className="flex min-h-[min(1080px,100svh)] w-full flex-col items-center justify-center gap-6 px-[clamp(20px,8.333vw,160px)] py-6" data-name="section.artifact" data-section-id="artifacts">
        <div className="flex w-full justify-start">
          <TaxonomyTags kind="artifact" items={[{ icon: artifact.icon, label: artifact.label }]} />
        </div>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-8">
          {artifact.images.map((img, index) => (
            <figure key={index} className="flex items-center justify-center">
              <img src={img} alt={artifact.label} className="h-auto max-h-[60vh] w-full object-contain" />
            </figure>
          ))}
        </div>
      </section>
    )
  }

  // Default image layout
  return (
    <section className="flex min-h-[min(1080px,100svh)] w-full flex-col items-center justify-center gap-6 px-[clamp(20px,8.333vw,160px)] py-6" data-name="section.artifact" data-section-id="artifacts">
      <div className="flex w-full justify-start">
        <TaxonomyTags kind="artifact" items={[{ icon: artifact.icon, label: artifact.label }]} />
      </div>
      {artifact.images && artifact.images[0] && (
        <figure className="artifact-viewport flex w-full items-center justify-center" tabIndex={0} role="region" aria-label={text("Artefatos do projeto")}>
          <img
            src={artifact.images[0]}
            alt={artifact.label}
            loading="lazy"
            decoding="async"
            className="block h-auto max-h-full max-w-full object-contain"
          />
        </figure>
      )}
    </section>
  )
}

function MetricResult({ metric }: { metric: CaseMetric }) {
  const { t } = useI18n()

  return (
    <div className="relative flex h-[75px] !min-w-[280px] flex-[1_0_0] items-end" data-name={`metric-result.${metric.name}`}>
      <div className="flex size-[75px] max-h-[75px] min-h-[75px] max-w-[75px] min-w-[75px] shrink-0 flex-col items-center justify-center rounded-[6px] bg-[#020305] px-3 py-[3px]">
        <p className="text-[16px] leading-none whitespace-nowrap text-[#fcfdfe]">
          {metric.value.key ? t(metric.value.key) : metric.value.text}
        </p>
      </div>
      <div className="flex min-w-0 flex-1 self-stretch items-end">
        <div className="flex h-full min-w-0 flex-1 flex-col items-start justify-center">
          <div className="flex w-full flex-col items-start gap-[6px] rounded-r-[6px] bg-[#101113] p-3 leading-none whitespace-nowrap text-[#fcfdfe]">
            <p className="text-[16px]">{metric.title.key ? t(metric.title.key) : metric.title.text}</p>
            <p className="text-[9px]">{metric.subtitle.key ? t(metric.subtitle.key) : metric.subtitle.text}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultsSection({ results }: { results: { metrics: CaseMetric[]; copy: ContentRef[] } }) {
  const { t } = useI18n()

  return (
    <section className={sectionClass} data-name="section.results" data-section-id="results">
      <div className="flex w-full flex-col items-start gap-6">
        <h2 className="w-full max-w-[900px] text-[16px] font-semibold leading-[1.3] tracking-[0.64px] text-[#000102]">
          {t("t0149")}
        </h2>
        <div className="flex min-h-[100px] w-full flex-wrap content-start items-start gap-x-6 gap-y-8" data-name="div.metrics">
          {results.metrics.map((metric, index) => (
            <MetricResult key={index} metric={metric} />
          ))}
        </div>
        <div className="flex max-w-[1372px] flex-col gap-6 text-[16px] leading-[1.5] text-[#000102]">
          {results.copy.map((item, index) => (
            <p key={index}>{item.key ? t(item.key) : item.text}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

function RelatedCasesSection({ relatedCases }: { relatedCases: string[] }) {
  if (relatedCases.length === 0) return null

  return (
    <section className={sectionClass} data-name="section.related-cases" data-section-id="related-cases">
      <div className="flex w-full flex-col gap-8">
        <h2 className="text-[16px] font-semibold leading-[1.3] tracking-[0.64px] text-[#0d0e10]">
          Projetos relacionados
        </h2>
        <div className="flex w-full flex-wrap gap-6">
          {relatedCases.map((slug) => (
            <CaseCard key={slug} slug={slug as any} variant="default" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function CasesSingle() {
  const { slug } = useParams()
  const { path } = useI18n()
  const item = findCase(slug)

  if (!item) return <Navigate to={path("/")} replace />

  return (
    <article
      className="flex w-full flex-col items-center bg-[#eeeff1]"
      data-name={`article#${item.slug}`}
    >
      <HeroSection title={item.title} subtitle={item.subtitle} tags={item.tags} hero={item.hero} />
      <ContextSection contextCopy={item.contextCopy} contextMedia={item.contextMedia} project={item.project} />
      <ChallengeSection challenge={item.challenge} />
      <ProcessSection process={item.process} methodology={item.methodology} services={item.services} />
      {item.artifacts.map((artifact, index) => (
        <ArtifactSection key={`${artifact.slug}-${index}`} artifact={artifact} />
      ))}
      <ResultsSection results={item.results} />
      
    </article>
  )
}
