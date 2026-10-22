import CaseCard from "../components/CaseCard"
import ServiceCard from "../components/ServiceCard"
import TaxonomyTags from "../components/TaxonomyTags"
import { cases, type CaseSlug } from "../data/cases"
import { useI18n } from "../i18n"

const profileTags = [
  { icon: "psychology", label: "Design Thinking" },
  { icon: "cycle", label: "Lean UX" },
  { icon: "monitoring", label: "Data-Driven Design" },
  { icon: "travel_explore", label: "Product Discovery" },
  { icon: "hub", label: "Service Design" },
  { icon: "diamond", label: "Duplo Diamante" },
  { icon: "view_list", label: "Product Backlog Building" },
]

const services = [
  {
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
  {
    service: "web",
    titleKey: "t0585",
    subtitleKey: "t0586",
    tags: [
      { icon: "language", label: "Sites" },
      { icon: "web", label: "Landing pages" },
      { icon: "storefront", label: "Lojas virtuais" },
    ],
    poster: "/assets/front-page/services/web-poster.jpg",
    videoSrc: "/assets/front-page/services/web.mp4",
  },
  {
    service: "apps",
    titleKey: "t0590",
    subtitleKey: "t0591",
    tags: [
      { icon: "smartphone", label: "Aplicativos" },
      { icon: "devices", label: "Sistemas" },
      { icon: "cloud", label: "SaaS" },
    ],
    poster: "/assets/front-page/services/aplicativos-poster.jpg",
    videoSrc: "/assets/front-page/services/aplicativos.mp4",
  },
  {
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
]

export default function FrontPage({
  featuredSlugs,
}: {
  featuredSlugs: CaseSlug[]
}) {
  const { t } = useI18n()
  const metrics = [
    ["25%", t("t0612"), t("t0613"), "metric-result.outcome"],
    ["100%", t("t0267"), t("t0268"), "metric-result.evidence"],
    [t("t0614"), t("t0615"), t("t0616"), "metric-result.product.outcome"],
    [t("t0617"), t("t0618"), t("t0156"), "metric-result.product-reach"],
    ["15%", t("t0619"), t("t0620"), "metric-result.product.outcome"],
    ["56.423", t("t0345"), t("t0346"), "metric-result.product.outcome"],
    [t("t0154"), t("t0621"), t("t0622"), "metric-result.product.outcome"],
  ] as const

  return (
    <main
      className="flex size-full flex-col bg-[#eeeff1]"
      data-node-id="4:35819"
      data-name="main#home"
    >
      <header
        className="relative isolate flex h-[1080px] w-full shrink-0 flex-col items-center justify-end overflow-clip bg-[#020305] pb-[226px]"
        data-node-id="4:35821"
        data-name="header.intro"
      >
        <div
          className="relative z-[3] flex w-full flex-col items-start gap-4 bg-[rgba(0,1,2,.1)] px-[160px] py-20 text-[#fcfdfe]"
          data-node-id="4:35822"
          data-name="div.flex.flex-col.w-full"
        >
          <h1
            className="font-['Sora:SemiBold'] text-[36px] font-semibold leading-[1.1]"
            data-node-id="4:35823"
          >
            {t("t0565")}
          </h1>
          <p
            className="font-['Sora:Regular'] text-[18px] leading-[1.3]"
            data-node-id="4:35824"
          >
            {t("t0566")}
          </p>
        </div>
        <video
          autoPlay
          className="absolute inset-0 z-[1] size-full object-cover"
          loop
          muted
          playsInline
          poster="/assets/front-page/hero-poster.jpg"
          preload="auto"
          data-node-id="4:35826"
          data-name="video.hero-teaser.loop"
        >
          <source src="/assets/front-page/hero.mp4" type="video/mp4" />
        </video>
      </header>

      <section
        id="cases"
        className="relative z-[2] isolate flex min-h-[1080px] w-full shrink-0 flex-col items-center justify-center overflow-visible !p-0 max-[600px]:min-h-[760px]"
        data-node-id="4:35827"
        data-name="section.cases"
        aria-labelledby="cases-title"
      >
        <div
          className="absolute left-[51.6667%] top-[-248px] z-[4] flex items-center [&>article:first-child]:-mr-[42px] max-[1100px]:left-auto max-[1100px]:right-[6%] max-[1100px]:top-[-200px] max-[600px]:right-[8%] max-[600px]:top-[-230px] max-[600px]:[&>article:first-child]:mr-[min(-24vw,-70px)]"
          data-node-id="4:35828"
          data-name="div.case-track.scroll-linked-x"
        >
          {featuredSlugs.map((slug) => (
            <CaseCard key={slug} slug={slug} variant="hero" />
          ))}
        </div>
        <header
          className="relative z-[3] flex min-h-28 w-full items-center justify-center px-40 py-6"
          data-node-id="4:35834"
        >
          <h2
            id="cases-title"
            className="w-[1180px] text-center font-['Sora:Regular'] text-[44px] leading-[1.15] text-[#000102]"
            data-node-id="4:35835"
          >
            {t("t0573")}
          </h2>
        </header>
        <div
          className="relative z-[2] flex w-full flex-col items-center px-40 py-6"
          data-node-id="4:35846"
        >
          <p
            className="w-[900px] whitespace-pre-wrap text-center font-['Sora:Regular'] text-[24px] leading-[1.5] text-[#0d0e10]"
            data-node-id="4:35847"
          >
            {t("t0576")}
            <br />
            {t("t0577")}
          </p>
        </div>
        <div
          className="case-carousel relative z-[1] w-full overflow-visible px-16 overscroll-x-contain max-[600px]:px-5"
          data-case-carousel
          tabIndex={0}
          role="region"
          aria-label={t("t0573")}
        >
          <div
            className="flex w-max min-w-full cursor-grab touch-pan-y select-none items-center gap-6 [&.is-dragging]:cursor-grabbing max-[600px]:gap-4"
            data-node-id="4:35836"
            data-name="div.case-track.scroll-linked-x"
            data-carousel-loop
          >
            {cases.map(({ slug }) => (
              <CaseCard key={slug} slug={slug} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="flex min-h-[1080px] w-full shrink-0 flex-col justify-center gap-6 bg-[#eeeff1] px-40 py-32"
        data-node-id="4:35850"
        data-name="section.services"
        aria-labelledby="services-title"
      >
        <div className="grid w-full grid-cols-12 gap-8" data-node-id="4:35851">
          <div
            className="col-span-6 font-['Sora:Regular'] text-[#000102]"
            data-node-id="4:35852"
          >
            <h2
              id="services-title"
              className="text-[44px] leading-[1.15]"
              data-node-id="4:35853"
            >
              {t("t0578")}
            </h2>
            <p className="text-[36px] leading-[1.2]" data-node-id="4:35854">
              {t("t0579")}
            </p>
          </div>
          <p
            className="col-span-6 self-end font-['Sora:Regular'] text-[20px] leading-[1.5] text-[#0d0e10]"
            data-node-id="4:35856"
          >
            {t("t0580")}
          </p>
        </div>
        <div className="grid w-full grid-cols-4 gap-6" data-node-id="4:35857">
          {services.map((service) => (
            <ServiceCard key={service.service} {...service} />
          ))}
        </div>
      </section>

      <section
        id="sobre"
        className="flex min-h-[1080px] w-full shrink-0 items-center gap-16 bg-[#eeeff1] px-40 py-32"
        data-node-id="4:35862"
        data-name="section.about-teaser"
        aria-labelledby="about-title"
      >
        <div
          className="flex min-w-0 flex-1 flex-col gap-4"
          data-node-id="4:35863"
        >
          <div className="flex flex-col gap-2">
            <h2
              id="about-title"
              className="font-['Sora:Regular'] text-[36px] leading-[1.15] text-[#000102]"
              data-node-id="4:35865"
            >
              {t("t0599")}
            </h2>
            <p
              className="font-['Sora:Regular'] text-[44px] leading-[1.2] text-[#6b0013]"
              data-node-id="4:35866"
            >
              {t("t0600")}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p
              className="font-['Sora:Regular'] text-[20px] leading-[1.4] text-[#000102]"
              data-node-id="4:35868"
            >
              {t("t0601")}
            </p>
            <p
              className="font-['Sora:Regular'] text-[16px] leading-[1.5] text-[#000102]"
              data-node-id="4:35869"
            >
              {t("t0602")}
            </p>
            <TaxonomyTags items={profileTags} kind="profile" />
          </div>
        </div>
        <figure
          className="relative h-[586px] w-[586px] shrink-0 overflow-hidden"
          data-node-id="4:35924"
          data-name="figure.product-illustration"
        >
          <video
            autoPlay
            className="absolute inset-0 size-full object-contain"
            loop
            muted
            playsInline
            poster="/assets/front-page/about-poster.jpg"
            preload="metadata"
          >
            <source src="/assets/front-page/about.mp4" type="video/mp4" />
          </video>
        </figure>
      </section>

      <section
        className="flex min-h-[1080px] w-full shrink-0 items-center bg-[#000102] px-40 py-32"
        data-node-id="4:35925"
        data-name="section.case-stories"
      >
        <div className="flex w-1/2 flex-col gap-3.5" data-node-id="4:35928">
          <p
            className="font-['Sora:Regular'] text-[44px] leading-[1.15] text-[#fcfdfe]"
            data-node-id="4:35929"
          >
            {t("t0606")}
          </p>
          <p
            className="font-['Sora:Regular'] text-[54px] leading-[1.15] text-[#fcfdfe]"
            data-node-id="4:35930"
          >
            {t("t0607")}{" "}
            <strong className="font-['Sora:Bold'] text-[#9e1030]">
              {t("t1082")}
            </strong>
            .
          </p>
        </div>
        <figure
          className="w-1/2"
          data-node-id="4:35945"
          data-name="poster.hero-fallback"
        >
          <img
            alt=""
            className="size-full object-contain"
            src="/assets/front-page/midia-poster-hero-fallback.svg"
          />
        </figure>
      </section>

      <section
        className="flex min-h-[1080px] w-full shrink-0 items-center bg-[#eeeff1] px-40 py-32"
        data-node-id="4:35946"
        data-name="section.evidence"
        aria-labelledby="evidence-title"
      >
        <div
          className="flex min-w-0 flex-1 flex-col items-start gap-4 rounded-2xl"
          data-node-id="4:35947"
        >
          <div className="w-full font-['Sora:Regular'] text-[#000102]">
            <h2
              id="evidence-title"
              className="text-[44px] leading-[1.15]"
              data-node-id="4:35949"
            >
              {t("t0608")}
            </h2>
            <p
              className="w-[900px] text-[54px] leading-[1.2]"
              data-node-id="4:35950"
            >
              {t("t0609")}
            </p>
          </div>
          <p
            className="w-[1040px] font-['Sora:Regular'] text-[20px] leading-[1.4] text-[#000102]"
            data-node-id="4:35951"
          >
            {t("t0610")}
          </p>
          <p
            className="w-[760px] font-['Sora:Regular'] text-[16px] leading-[1.5] text-[#0d0e10]"
            data-node-id="4:35953"
          >
            {t("t0611")}
          </p>
          <div
            className="flex h-[100px] w-max items-start gap-6"
            data-node-id="4:35956"
            data-name="div.evidence-track"
          >
            {metrics.map(([value, title, detail, name], index) => (
              <article
                className="flex w-[438px] shrink-0 items-end"
                data-name={name}
                key={`${value}-${index}`}
              >
                <strong className="flex min-h-[100px] min-w-[100px] items-center justify-center rounded-lg bg-[#020305] px-4 py-1 font-['Sora:Regular'] text-[20px] font-normal leading-none text-[#fcfdfe]">
                  {value}
                </strong>
                <div className="flex h-full flex-1 flex-col justify-center rounded-r-lg bg-[#101113] p-4 font-['Sora:Regular'] leading-none text-[#fcfdfe]">
                  <span className="text-[20px]">{title}</span>
                  <small className="mt-2 text-[13px]">{detail}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
