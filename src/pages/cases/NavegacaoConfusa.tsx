import TaxonomyTags from "../../components/TaxonomyTags"
import { useI18n } from "../../i18n"

const assets = {
  mockup: "/assets/cases/navegacao-confusa/midia-640c5.png",
  refundFlow: "/assets/cases/navegacao-confusa/midia-59e28.png",
  tablet: "/assets/front-page/cases/navegacao-confusa.png",
  fgtsF: "/assets/cases/navegacao-confusa/midia-112b1.svg",
  fgtsG: "/assets/cases/navegacao-confusa/midia-fffb6.svg",
  fgtsT: "/assets/cases/navegacao-confusa/midia-bfde0.svg",
  fgtsS: "/assets/cases/navegacao-confusa/midia-ac604.svg",
  fgtsSymbol: "/assets/cases/navegacao-confusa/midia-9d0ce.svg",
  caixa: "/assets/shared/branding/caixa-logo-full-2-caixa-logo-full2.svg",
  challengeFigure: "/assets/cases/navegacao-confusa/midia-ee027.svg",
  heuristicAudit: "/assets/cases/navegacao-confusa/midia-1-auditoria-heuristica.svg",
  criticalityMatrix: "/assets/cases/navegacao-confusa/midia-1-matriz-de-criticidade.svg",
  researchPlan: "/assets/cases/navegacao-confusa/midia-1-plano-pesquisa.svg",
}

const sectionClass =
  "flex min-h-[min(1080px,100svh)] w-full items-center px-[clamp(20px,8.333vw,160px)] py-[clamp(64px,6vw,128px)]"

const metaTags = [
  { icon: "devices", label: "Sistemas" },
  { icon: "psychology", label: "Design Thinking" },
  { icon: "rule", label: "Análise heurística" },
  { icon: "priority_high", label: "Matriz de criticidade" },
  { icon: "route", label: "Fluxo" },
  { icon: "draw", label: "Protótipos" },
  { icon: "science", label: "Pesquisa de usabilidade" },
  { icon: "design_services", label: "Figma" },
  { icon: "science", label: "Maze" },
]

const processTags = [
  { icon: "favorite", label: "Empatia" },
  { icon: "target", label: "Definição" },
  { icon: "lightbulb", label: "Ideação" },
  { icon: "draw", label: "Prototipagem" },
  { icon: "fact_check", label: "Teste" },
]

function HeroSection() {
  const { t } = useI18n()

  return (
    <header
      className="relative isolate flex h-[min(1080px,100svh)] min-h-[640px] w-full flex-col items-start justify-end gap-8 overflow-clip bg-[#94999c] px-[clamp(20px,8.333vw,160px)] py-[clamp(64px,5.833vw,112px)]"
      data-name="header.intro"
      data-node-id="6165:48957"
    >
      <div className="relative z-10 flex w-full flex-col items-start gap-6 [word-break:break-word]">
        <h1 className="max-w-[1180px] font-['Sora:SemiBold'] text-[clamp(36px,4.22vw,81px)] font-semibold leading-[1.1] text-[#fcfdfe]">
          {t("t0567")}
        </h1>
        <p className="max-w-[980px] text-[clamp(20px,1.563vw,30px)] leading-[1.3] text-[#fcfdfe]">
          {t("t0568")}
        </p>
        <TaxonomyTags kind="meta" items={metaTags} />
      </div>
      <div
        className="absolute inset-0 z-[3] bg-black/40"
        data-name="div.hero-overlay"
      />
      <div className="absolute inset-0 z-[2]" data-name="img.hero-image" />
    </header>
  )
}

function ContextLogo() {
  const { t } = useI18n()

  return (
    <figure
      className="flex w-full max-w-[320px] shrink-0 flex-col gap-9"
      aria-label="FGTS e CAIXA"
    >
      <span
        className="relative flex w-full items-center justify-center gap-[7px] overflow-hidden"
        aria-hidden="true"
      >
        {[assets.fgtsF, assets.fgtsG, assets.fgtsT, assets.fgtsS].map((src) => (
          <img key={src} src={src} alt="" className="size-[74px]" />
        ))}
        <img
          src={assets.fgtsSymbol}
          alt=""
          className="absolute left-[15px] top-[15px] size-[53px]"
        />
      </span>
      <span className="flex items-center gap-5">
        <img src={assets.caixa} alt="CAIXA" width="172" height="40" />
        <span className="h-[52px] w-[2px] bg-[#f39200]" aria-hidden="true" />
        <span className="font-['CAIXA_Std:Book'] text-[23px] leading-[1.12] text-[#404b52]">
          {t("t0641")}
          <br />
          {t("t0642")}
        </span>
      </span>
    </figure>
  )
}

function ContextSection() {
  const { t } = useI18n()

  return (
    <section
      className={sectionClass}
      data-name="section.context"
      data-node-id="6165:48971"
      data-section-id="context"
    >
      <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-24">
        <div className="flex flex-1 flex-col gap-6">
          <h2 className="text-[16px] font-semibold leading-[1.3] tracking-[0.64px] text-[#0d0e10]">
            {t("t0018")}
          </h2>
          <div className="flex max-w-[1040px] flex-col gap-6 text-[16px] leading-[1.5] text-[#000102]">
            <p>{t("t0638")}</p>
            <p>{t("t0639")}</p>
            <p>{t("t0640")}</p>
          </div>
        </div>
        <ContextLogo />
      </div>
    </section>
  )
}

function ChallengeSection() {
  const { t } = useI18n()

  return (
    <section
      className={`${sectionClass} relative isolate justify-center overflow-clip`}
      data-name="section.challenge"
      data-node-id="6165:49000"
      data-section-id="challenge"
    >
      <div className="relative z-10 flex w-full max-w-[1500px] flex-col items-center gap-8 text-center font-['Sora:SemiBold'] font-semibold">
        <h2 className="text-[16px] leading-[1.3] tracking-[0.64px] text-[#0d0e10]">
          {t("t0021")}
        </h2>
        <p className="max-w-[1200px] text-[clamp(26px,1.875vw,36px)] leading-[1.2] text-[#000102]">
          {t("t0643")}
        </p>
      </div>
      <img
        src={assets.challengeFigure}
        alt=""
        className="pointer-events-none absolute -right-[45%] -top-[55%] z-0 h-[210%] max-w-none rotate-[-123deg]"
      />
    </section>
  )
}

function ProcessSection() {
  const { text } = useI18n()

  return (
    <section
      className={sectionClass}
      data-name="section.process"
      data-node-id="6165:49013"
      data-section-id="process"
    >
      <div className="case-process-copy">
        <h2>{text("03 · PROCESSO")}</h2>
        <p>
          {text(
            "A avaliação heurística revelou problemas de orientação e consistência que se repetiam em diferentes áreas do sistema.",
          )}
        </p>
        <p>
          {text(
            "Corrigir cada tela separadamente não resolveria a origem dessas dificuldades. A Arquitetura da Informação ajudou a entender como os fluxos precisavam ser reorganizados.",
          )}
        </p>
        <p>{text("Uma matriz de criticidade orientou as prioridades.")}</p>
        <p>
          {text(
            "No fluxo de Estornos, a proposta ganhou forma com os padrões do Design System CAIXA, enquanto o Plano de Pesquisa definiu como avaliar a nova navegação.",
          )}
        </p>
        <TaxonomyTags kind="process-tags" items={processTags} />
      </div>
    </section>
  )
}

type ArtifactSectionProps = {
  sectionNodeId: string
  artifactNodeId: string
  name: string
  icon: string
  label: string
  src: string
  width: number
  height: number
}

function ArtifactSection({
  sectionNodeId,
  artifactNodeId,
  name,
  icon,
  label,
  src,
  width,
  height,
}: ArtifactSectionProps) {
  const { text } = useI18n()

  return (
    <section
      className="flex min-h-[min(1080px,100svh)] w-full flex-col items-center justify-center gap-6 px-[clamp(20px,8.333vw,160px)] py-6"
      data-name={name}
      data-node-id={sectionNodeId}
      data-section-id="artifacts"
    >
      <div className="flex w-full justify-start">
        <TaxonomyTags kind="artifact" items={[{ icon, label }]} />
      </div>
      <figure
        className="artifact-viewport flex w-full items-center justify-center"
        data-name="figure.artifact-visual"
        data-node-id={artifactNodeId}
        tabIndex={0}
        role="region"
        aria-label={text("Artefatos do projeto")}
      >
        <img
          src={src}
          alt={label}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="block h-auto max-h-full max-w-full object-contain"
        />
      </figure>
    </section>
  )
}

function DiagnosisSection() {
  const { t, text } = useI18n()
  const findings = [
    "t0662",
    "t0663",
    "t0664",
    "t0665",
    "t0666",
    "t0667",
    "t0668",
    "t0669",
    "t0670",
    "t0671",
  ]

  return (
    <section
      className="flex min-h-[min(1080px,100svh)] w-full flex-col justify-center gap-6 px-[clamp(20px,8.333vw,160px)] py-[clamp(48px,5vw,112px)]"
      data-name="section.step.understand"
      data-node-id="6165:49141"
      data-section-id="artifacts"
    >
      <TaxonomyTags
        kind="artifact"
        items={[{ icon: "troubleshoot", label: "Diagnóstico de usabilidade" }]}
      />
      <figure
        className="artifact-viewport !max-h-none !overflow-visible grid w-full items-center gap-8 lg:grid-cols-[minmax(280px,575px)_minmax(0,1fr)]"
        tabIndex={0}
        role="region"
        aria-label={text("Artefatos do projeto")}
      >
        <ol className="list-decimal rounded-2xl bg-[#fcfdfe] py-6 pl-12 pr-6 text-[clamp(13px,0.833vw,16px)] leading-[1.6] text-[#101113]">
          {findings.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ol>
        <img
          src={assets.mockup}
          alt={text("Evidência visual do projeto")}
          width="2540"
          height="1882"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full object-contain"
        />
      </figure>
    </section>
  )
}

type ImageArtifactProps = {
  sectionNodeId: string
  artifactNodeId: string
  src: string
  width: number
  height: number
  alt: string
}

function ImageArtifactSection({
  sectionNodeId,
  artifactNodeId,
  src,
  width,
  height,
  alt,
}: ImageArtifactProps) {
  const { text } = useI18n()

  return (
    <section
      className="flex min-h-[min(1080px,100svh)] w-full flex-col items-center justify-center gap-6 px-[clamp(20px,8.333vw,160px)] py-6"
      data-name="section.step.design"
      data-node-id={sectionNodeId}
      data-section-id="artifacts"
    >
      <div className="flex w-full justify-start">
        <TaxonomyTags
          kind="artifact"
          items={[{ icon: "draw", label: "Protótipos" }]}
        />
      </div>
      <figure
        className="artifact-viewport flex w-full items-center justify-center"
        data-name="figure.artifact-visual"
        data-node-id={artifactNodeId}
        tabIndex={0}
        role="region"
        aria-label={text("Artefatos do projeto")}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="block h-auto max-h-full max-w-full object-contain"
        />
      </figure>
    </section>
  )
}

type MetricResultProps = {
  value: string
  title: string
  subtitle: string
  name: string
  nodeId: string
}

function MetricResult({
  value,
  title,
  subtitle,
  name,
  nodeId,
}: MetricResultProps) {
  return (
    <div
      className="relative flex h-[75px] !min-w-[280px] flex-[1_0_0] items-end"
      data-name={name}
      data-node-id={nodeId}
    >
      <div className="flex size-[75px] max-h-[75px] min-h-[75px] max-w-[75px] min-w-[75px] shrink-0 flex-col items-center justify-center rounded-[6px] bg-[#020305] px-3 py-[3px]">
        <p className="text-[16px] leading-none whitespace-nowrap text-[#fcfdfe]">
          {value}
        </p>
      </div>
      <div className="flex min-w-0 flex-1 self-stretch items-end">
        <div className="flex h-full min-w-0 flex-1 flex-col items-start justify-center">
          <div
            className="flex w-full flex-col items-start gap-[6px] rounded-r-[6px] bg-[#101113] p-3 leading-none whitespace-nowrap text-[#fcfdfe]"
            data-name="<title>"
          >
            <p className="text-[16px]">{title}</p>
            <p className="text-[9px]">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultsSection() {
  const { t } = useI18n()
  const metrics = [
    {
      value: "25%",
      title: t("t0612"),
      subtitle: t("t0613"),
      name: "metric-result.coverage",
      nodeId: "6165:49741",
    },
    {
      value: "7",
      title: t("t0742"),
      subtitle: t("t0743"),
      name: "metric-result.outcome",
      nodeId: "6165:49748",
    },
    {
      value: "6",
      title: t("t0744"),
      subtitle: t("t0745"),
      name: "metric-result.product-reach",
      nodeId: "6165:49755",
    },
  ]

  return (
    <section
      className={sectionClass}
      data-name="section.results"
      data-node-id="6165:49737"
      data-section-id="results"
    >
      <div className="flex w-full flex-col items-start gap-6">
        <h2 className="w-full max-w-[900px] text-[16px] font-semibold leading-[1.3] tracking-[0.64px] text-[#000102]">
          {t("t0149")}
        </h2>
        <div
          className="flex min-h-[100px] w-full flex-wrap content-start items-start gap-x-6 gap-y-8"
          data-name="div.metrics"
        >
          {metrics.map((metric) => (
            <MetricResult key={metric.nodeId} {...metric} />
          ))}
        </div>
        <div className="flex max-w-[1372px] flex-col gap-6 text-[16px] leading-[1.5] text-[#000102]">
          <p>{t("t0746")}</p>
          <p>{t("t0747")}</p>
        </div>
      </div>
    </section>
  )
}

export default function NavegacaoConfusa() {
  return (
    <article
      className="flex w-full flex-col items-center bg-[#eeeff1]"
      data-name="article#navegacao-confusa"
      data-node-id="6165:48956"
    >
      <HeroSection />
      <ContextSection />
      <ChallengeSection />
      <ProcessSection />
      <ArtifactSection
        sectionNodeId="6165:49058"
        artifactNodeId="6165:49064"
        name="section.step.understand"
        icon="rule"
        label="Análise heurística"
        src={assets.heuristicAudit}
        width={1629}
        height={806}
      />
      <DiagnosisSection />
      <ArtifactSection
        sectionNodeId="6165:49152"
        artifactNodeId="6165:49158"
        name="section.step.specify"
        icon="priority_high"
        label="Matriz de criticidade"
        src={assets.criticalityMatrix}
        width={1600}
        height={760}
      />
      <ImageArtifactSection
        sectionNodeId="6165:49289"
        artifactNodeId="6165:49295"
        src={assets.refundFlow}
        width={4096}
        height={2332}
        alt="Fluxo de estorno"
      />
      <ImageArtifactSection
        sectionNodeId="6430:10430"
        artifactNodeId="6430:10436"
        src={assets.tablet}
        width={4000}
        height={3000}
        alt="Protótipo do fluxo de estorno em tablet"
      />
      <ArtifactSection
        sectionNodeId="6165:49453"
        artifactNodeId="6165:49459"
        name="section.step.evaluate"
        icon="assignment"
        label="Plano de pesquisa"
        src={assets.researchPlan}
        width={1600}
        height={920}
      />
      <ResultsSection />
    </article>
  )
}
