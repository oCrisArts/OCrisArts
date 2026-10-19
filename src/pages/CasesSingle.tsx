import { Navigate, useParams } from "react-router-dom"
import type { CSSProperties } from "react"
import ServiceCard, { type ServiceCardProps } from "../components/ServiceCard"
import TaxonomyTags from "../components/TaxonomyTags"
import {
  findCase,
  type CaseArtifact,
  type CaseMetric,
  type ContentRef,
  type ServiceSlug,
  type TaxonomyItem,
} from "../data/cases"
import { useI18n } from "../i18n"

const gutter = "px-[clamp(20px,8.333vw,160px)]"
const section = `flex min-h-[min(1080px,100svh)] w-full items-center ${gutter} py-[clamp(64px,6vw,128px)]`
const serviceCards: Record<ServiceSlug, ServiceCardProps> = {
  branding: {
    service: "branding",
    titleKey: "t0581",
    subtitleKey: "t0582",
    tags: [
      { icon: "palette", label: "Branding" },
      { icon: "palette", label: "Identidade visual" },
    ],
    poster: "/assets/front-page/services/branding-poster.jpg",
    videoSrc: "/assets/front-page/services/branding.mp4",
  },
  web: {
    service: "web",
    titleKey: "t0585",
    subtitleKey: "t0586",
    tags: [
      { icon: "language", label: "Sites" },
      { icon: "web", label: "Landing pages" },
    ],
    poster: "/assets/front-page/services/web-poster.jpg",
    videoSrc: "/assets/front-page/services/web.mp4",
  },
  apps: {
    service: "apps",
    titleKey: "t0590",
    subtitleKey: "t0591",
    tags: [
      { icon: "smartphone", label: "Aplicativos" },
      { icon: "devices", label: "Sistemas" },
    ],
    poster: "/assets/front-page/services/aplicativos-poster.jpg",
    videoSrc: "/assets/front-page/services/aplicativos.mp4",
  },
  ux: {
    service: "ux",
    titleKey: "t0595",
    subtitleKey: "t0596",
    tags: [
      { icon: "search", label: "UX Research" },
      { icon: "widgets", label: "Design Systems" },
    ],
    poster: "/assets/front-page/services/ux-ui-poster.jpg",
    videoSrc: "/assets/front-page/services/ux-ui.mp4",
  },
}

function content(item: ContentRef, t: (key: string) => string) {
  return item.key ? t(item.key) : (item.text ?? "")
}

function Hero({
  title,
  subtitle,
  tags,
  image,
}: {
  title: string
  subtitle: string
  tags: TaxonomyItem[]
  image: string
}) {
  const { t } = useI18n()
  return (
    <header
      id="hero"
      className={`relative isolate flex h-[min(1080px,100svh)] min-h-[640px] w-full flex-col justify-end gap-8 overflow-clip bg-[#94999a] ${gutter} py-[clamp(64px,5.833vw,112px)]`}
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
      <div
        className="absolute inset-0 z-[3] bg-black/40"
        data-name="div.hero-overlay"
      />
      <div
        className="absolute inset-0 z-[2] bg-cover bg-center"
        data-name="img.hero-image"
        style={{ backgroundImage: `url(${image})` }}
      />
    </header>
  )
}

function Context({
  copy,
  media,
  mediaWidth,
  project,
}: {
  copy: ContentRef[]
  media?: string
  mediaWidth?: number
  project: string
}) {
  const { t } = useI18n()
  return (
    <section
      id="contexto"
      className={`${section} bg-[#eeeff1]`}
      data-name="section.context"
      data-section-id="context"
    >
      <div className="flex w-full flex-col items-start gap-12 xl:flex-row xl:items-center xl:gap-24">
        <div className="flex flex-1 flex-col gap-6">
          <h2 className="text-[16px] font-semibold tracking-[0.64px]">
            {t("t0018")}
          </h2>
          <div className="flex max-w-[1040px] flex-col gap-6 text-[16px] leading-[1.5]">
            {copy.map((item, index) => (
              <p key={index}>{content(item, t)}</p>
            ))}
          </div>
        </div>
        {media && (
          <figure
            className="w-full shrink-0"
            style={{ maxWidth: `${mediaWidth ?? 320}px` }}
            aria-label={project}
          >
            <img src={media} alt="" className="block h-auto w-full object-contain" />
          </figure>
        )}
      </div>
    </section>
  )
}

function Challenge({
  copy,
  media,
}: {
  copy: ContentRef
  media?: string
}) {
  const { t } = useI18n()
  return (
    <section
      id="desafio"
      className={`${section} justify-center overflow-clip bg-[#eeeff1]`}
      data-name="section.challenge"
      data-section-id="challenge"
    >
      <div className="relative z-[1] flex w-full max-w-[1500px] flex-col items-center gap-8 text-center font-['Sora:SemiBold'] font-semibold">
        <h2 className="text-[16px] tracking-[0.64px]">{t("t0021")}</h2>
        <p className="max-w-[1200px] text-[clamp(26px,1.875vw,36px)] leading-[1.2]">
          {content(copy, t)}
        </p>
      </div>
      {media && (
        <img
          src={media}
          alt=""
          className="pointer-events-none absolute left-[20.94%] top-[19.01%] size-[83.83%] max-w-none opacity-10"
          aria-hidden="true"
        />
      )}
    </section>
  )
}

function Process({
  copy,
  methodology,
  services,
}: {
  copy: ContentRef[]
  methodology: TaxonomyItem[]
  services: ServiceSlug[]
}) {
  const { t } = useI18n()
  return (
    <section
      id="processo"
      className={`${section} bg-[#eeeff1]`}
      data-name="section.process"
      data-section-id="process"
    >
      <div className="grid w-full gap-12 xl:grid-cols-[minmax(0,1fr)_624px] xl:gap-20">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="case-process-copy">
            <h2>{t("t0023")}</h2>
            {copy.map((item, index) => (
              <p key={index}>{content(item, t)}</p>
            ))}
          </div>
          <TaxonomyTags kind="process-tags" items={methodology} />
        </div>
        {services.length > 0 && (
          <div className="w-full max-w-[624px] overflow-x-auto overscroll-x-contain">
            <div className="flex w-max flex-nowrap gap-6">
              {services.map((service) => (
                <ServiceCard
                  key={service}
                  {...serviceCards[service]}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ArtifactLabel({ artifact }: { artifact: CaseArtifact }) {
  return (
    <div className={`relative z-10 w-full ${gutter}`}>
      <TaxonomyTags
        kind="artifact"
        items={[{ icon: artifact.icon, label: artifact.label }]}
      />
    </div>
  )
}

function Artifact({ artifact }: { artifact: CaseArtifact }) {
  const background =
    typeof artifact.background === "string"
      ? { color: artifact.background }
      : artifact.background ?? { color: artifact.dark ? "#020305" : "#eeeff1" }
  const backgroundStyle = {
    backgroundColor: background.color,
    "--artifact-background-image": background.image
      ? `url("${background.image}")`
      : "none",
    "--artifact-background-size": background.size ?? "cover",
    "--artifact-background-position": background.position ?? "center",
    "--artifact-background-repeat": background.repeat ?? "no-repeat",
    "--artifact-background-overlay": background.overlay ?? "transparent",
    "--artifact-background-blend-mode": background.blendMode ?? "normal",
  } as CSSProperties
  const base = `artifact-surface relative flex min-h-[min(1080px,100svh)] w-full flex-col items-center justify-center gap-6 overflow-hidden ${artifact.slug}`
  const props = {
    id: `artefato-${artifact.slug}`,
    "data-name": "section.artifact",
    "data-section-id": "artifacts",
    "data-artifact": artifact.slug,
    "data-layout": artifact.layout,
    style: backgroundStyle,
  }
  if (artifact.layout === "video-background" && artifact.video)
    return (
      <section
        {...props}
        className={`artifact-surface artifact-video-background relative isolate w-full overflow-hidden ${artifact.slug}`}
      >
        <div className="absolute inset-x-0 top-[clamp(20px,5.833vw,112px)] z-10">
          <ArtifactLabel artifact={artifact} />
        </div>
        <video
          className="block h-auto w-full"
          width={artifact.videoWidth ?? 1920}
          height={artifact.videoHeight ?? 1080}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={artifact.label}
        >
          <source src={artifact.video} type="video/mp4" />
        </video>
      </section>
    )
  if (
    artifact.layout === "video" && artifact.video
  )
    return (
      <section {...props} className={`${base} justify-start`}>
        <div className="absolute inset-x-0 top-[clamp(72px,5.833vw,112px)] z-10">
          <ArtifactLabel artifact={artifact} />
        </div>
        <video
          className="absolute inset-0 z-0 size-full object-contain"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={artifact.label}
        >
          <source src={artifact.video} type="video/mp4" />
        </video>
      </section>
    )
  if (artifact.layout === "embed-fullscreen" && artifact.embed)
    return (
      <section
        {...props}
        className={`artifact-surface artifact-embed-fullscreen relative isolate w-full overflow-hidden ${artifact.slug}`}
      >
        <header
          className={`artifact-embed-tags absolute inset-x-0 top-0 z-10 flex h-[70px] w-full items-center justify-center overflow-hidden ${gutter} py-5`}
          data-name="div.artifact-tag-row"
        >
          <TaxonomyTags
            kind="artifact"
            items={
              artifact.embedTags ??
              [{ icon: artifact.icon, label: artifact.label }]
            }
          />
        </header>
        <iframe
          src={artifact.embed.url}
          title={artifact.embed.title}
          className="absolute inset-0 z-0 size-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </section>
    )
  if (artifact.layout === "carousel" && artifact.images) {
    const isTccaCarousel = artifact.slug === "evolucao-dos-cadastros"
    const showsAllSlides = artifact.slug === "variacoes-streaming"
    return (
      <section
        {...props}
        className={`${base} ${isTccaCarousel ? "tcca-carousel-section" : "py-6"}`}
      >
        <ArtifactLabel artifact={artifact} />
        <div
          className="artifact-carousel relative z-[2] w-full"
          data-artifact-carousel
          tabIndex={0}
          role="region"
          aria-label={artifact.label}
        >
          <div
            className={`flex items-center gap-6 max-[600px]:gap-4 ${
              isTccaCarousel ? "tcca-carousel-track" : gutter
            }`}
            data-artifact-track
            data-carousel-loop
          >
            {artifact.images.map((image, index) => (
              <figure
                key={image}
                className={
                  isTccaCarousel
                    ? "tcca-carousel-slide flex shrink-0 items-center justify-center"
                    : "flex w-fit max-w-[calc(100vw-40px)] shrink-0 items-center justify-center"
                }
              >
                <img
                  src={image}
                  alt={`${artifact.label} ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className={
                    showsAllSlides
                      ? "block h-auto w-[clamp(220px,22.917vw,440px)] max-w-[calc(100vw-40px)] select-none object-contain"
                      : "block h-auto max-h-[min(820px,72svh)] max-w-[calc(100vw-40px)] select-none object-contain"
                  }
                  draggable={false}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    )
  }
  if (artifact.layout === "grid" && artifact.images)
    return (
      <section {...props} className={`${base} ${gutter} py-6`}>
        <TaxonomyTags
          kind="artifact"
          items={[{ icon: artifact.icon, label: artifact.label }]}
        />
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
          {artifact.images.map((image, index) => (
            <figure
              key={image}
              className="flex min-w-0 items-center justify-center"
            >
              <img
                src={image}
                alt={`${artifact.label} ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-auto max-h-[78svh] w-full object-contain"
              />
            </figure>
          ))}
        </div>
      </section>
    )
  return (
    <section {...props} className={`${base} ${gutter} py-6`}>
      <TaxonomyTags
        kind="artifact"
        items={[{ icon: artifact.icon, label: artifact.label }]}
      />
      {artifact.images?.[0] && (
        <figure
          className="artifact-viewport flex w-full flex-1 items-center justify-center"
          tabIndex={0}
          role="region"
          aria-label={artifact.label}
        >
          <img
            src={artifact.images[0]}
            alt={artifact.label}
            loading="lazy"
            decoding="async"
            className="block h-auto max-h-[82svh] max-w-full object-contain"
          />
        </figure>
      )}
    </section>
  )
}

function Metric({ metric }: { metric: CaseMetric }) {
  const { t } = useI18n()
  return (
    <div
      className="relative flex h-[75px] min-w-[min(280px,100%)] flex-[1_1_280px] items-end"
      data-name={`metric-result.${metric.name}`}
      data-node-id="6371:125"
    >
      <div
        className="flex size-[75px] max-h-[75px] min-h-[75px] max-w-[75px] min-w-[75px] shrink-0 flex-col items-center justify-center rounded-[6px] bg-[#020305] px-3 py-[3px]"
        data-name="number"
      >
        <p className="whitespace-nowrap text-[16px] font-normal leading-none text-[#fcfdfe] [word-break:break-word]">
          {content(metric.value, t)}
        </p>
      </div>
      <div className="flex min-w-0 flex-1 flex-row items-end self-stretch">
        <div className="flex h-full min-w-0 flex-1 flex-col items-start justify-center" data-name="content">
          <div className="flex w-full shrink-0 flex-col items-start gap-[6px] rounded-r-[6px] bg-[#101113] p-3 font-normal leading-none text-[#fcfdfe] [word-break:break-word]">
            <p className="text-[16px]">{content(metric.title, t)}</p>
            <p className="text-[9px]">{content(metric.subtitle, t)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Results({
  metrics,
  copy,
}: {
  metrics: CaseMetric[]
  copy: ContentRef[]
}) {
  const { t } = useI18n()
  return (
    <section
      id="resultados"
      className={section}
      data-name="section.results"
      data-section-id="results"
    >
      <div className="flex w-full flex-col items-start gap-6">
        <h2 className="w-full max-w-[900px] text-[16px] font-semibold tracking-[0.64px]">
          {t("t0149")}
        </h2>
        <div
          className="flex min-h-[100px] w-full flex-wrap gap-x-6 gap-y-8"
          data-name="div.metrics"
        >
          {metrics.map((metric, index) => (
            <Metric key={index} metric={metric} />
          ))}
        </div>
        <div className="flex max-w-[1372px] flex-col gap-6 text-[16px] leading-[1.5]">
          {copy.map((item, index) => (
            <p key={index}>{content(item, t)}</p>
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
      id="case"
      className={`case-single ${item.slug} flex w-full flex-col items-center bg-[#eeeff1]`}
      data-name={`article#${item.slug}`}
    >
      <Hero
        title={item.title}
        subtitle={item.subtitle}
        tags={[...item.tags]}
        image={item.hero}
      />
      <Context
        copy={[...item.contextCopy]}
        media={item.contextMedia}
        mediaWidth={item.contextMediaWidth}
        project={item.project}
      />
      <Challenge
        copy={item.challenge}
        media={"challengeMedia" in item ? item.challengeMedia : undefined}
      />
      <Process
        copy={[...item.process]}
        methodology={[...item.methodology]}
        services={
          "showServicesInProcess" in item &&
          item.showServicesInProcess === false
            ? []
            : [...item.services]
        }
      />
      {item.artifacts.map((artifact) => (
        <Artifact key={artifact.slug} artifact={artifact} />
      ))}
      <Results
        metrics={[...item.results.metrics]}
        copy={[...item.results.copy]}
      />
    </article>
  )
}
