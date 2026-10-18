import TaxonomyTags from "../../components/TaxonomyTags";
import { useI18n } from "../../i18n";

const assetPathPrefix = "/assets";

// Imagens constantes
const images = {
  heroImage: `${assetPathPrefix}/cases/qualificacao-complexa/hero.png`,
  contextMedia: `${assetPathPrefix}/cases/qualificacao-complexa/contexto.svg`,
  logo: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-logo.svg`,
  folders: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-folders.svg`,
  folders1: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-folders1.svg`,
  folders2: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-folders2.svg`,
  folders3: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-folders3.svg`,
  folders4: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-folders4.svg`,
  folders5: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-folders5.svg`,
  group1: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-group1.svg`,
  heuristicAnalysis: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-heuristic-analysis.png`,
  criticalFlows: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-critical-flows.png`,
  caixaDesignSystem: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-caixa-design-system.png`,
  qualificationPanel: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-qualification-panel.png`,
  backofficeInterface: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-backoffice-interface.png`,
  backofficePatterns: `${assetPathPrefix}/cases/qualificacao-complexa/artefato-backoffice-patterns.png`,
  // ... adicionar outras imagens conforme necessário
};

// Componente de alerta de qualificação crítica
type QualificacaoCriticaProps = {
  tipo?: "Judicial" | "Teto" | "Duplicidade";
};

function QualificacaoCritica({ tipo = "Duplicidade" }: QualificacaoCriticaProps) {
  const { text } = useI18n();
  const isJudicial = tipo === "Judicial";
  const isTeto = tipo === "Teto";

  const messages = {
    Judicial: text("Este CPF está cadastrado com questões judiciais."),
    Teto: text("O valor deferido para o pedido está fora do teto de pagamento."),
    Duplicidade: text("Existem pedidos com as mesmas características."),
  };

  const titles = {
    Judicial: text("Judicial"),
    Teto: text("Rompimento do Teto"),
    Duplicidade: text("Duplicidade"),
  };

  const icons = {
    Judicial: images.folders2,
    Teto: images.folders1,
    Duplicidade: images.folders,
  };

  return (
    <section className="flex items-center gap-4 w-full max-w-[300px]">
      <div className="w-16 h-16 shrink-0">
        <img src={icons[tipo]} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[10px] font-semibold text-[#3a4859] mb-1">
          {titles[tipo]}
        </h3>
        <div className="flex items-center gap-2 h-10">
          <p className="flex-1 text-[12px] text-[#3a4859] overflow-hidden text-ellipsis">
            {messages[tipo]}
          </p>
          <button className="w-10 h-10 shrink-0 flex items-center justify-center border border-[#005ca9] rounded-lg bg-white text-[#005ca9] hover:bg-[#f0f7ff] transition-colors">
            <span className="text-[12px]">{isTeto ? "\uF044" : isJudicial ? "\uF06E" : "visibility"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// Componente de card de informações
function InfoCard() {
  const { t } = useI18n();

  const infoItems = [
    {
      icon: "\uF0C1",
      value: "1220034193",
      label: t("t0748"),
      color: "#900000",
    },
    {
      icon: "\uF2C2",
      value: "236.848.520-15",
      label: t("t0749"),
      color: "#3a4859",
    },
    {
      icon: "\uF04C",
      value: t("t0751"),
      label: t("t0750"),
      color: "#008254",
    },
    {
      icon: "\uF2C2",
      value: t("t0753"),
      label: t("t0752"),
      color: "#3a4859",
    },
  ];

  return (
    <section className="bg-[#f6f9f9] p-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h4 className="text-[10px] font-semibold text-[#3a4859]">
              {item.label}
            </h4>
            <div className="flex items-center gap-2 h-10">
              <span className="text-[13px]" style={{ color: item.color }}>
                {item.icon}
              </span>
              <span className="text-[12px] text-[#3a4859]">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Componente de seleção de opções
type OptionIconProps = {
  content?: "rateio" | "todas" | "monitoramento";
  state?: "default" | "focus";
};

function OptionIcon({ content = "todas", state = "focus" }: OptionIconProps) {
  const { text } = useI18n();
  const isDefault = state === "default";
  const isActive = ["rateio", "monitoramento"].includes(content) && isDefault;

  const icons = {
    monitoramento: images.folders5,
    rateio: images.folders4,
    todas: images.folders3,
  };

  const labels = {
    monitoramento: text("Monitoramento"),
    rateio: text("Rateio Impossível"),
    todas: text("Todas"),
  };

  return (
    <button
      className={`flex items-center gap-3 h-10 px-3 rounded-lg min-w-[110px] w-full transition-colors ${
        isActive
          ? "border border-[#d0e0e3] bg-white"
          : "border border-[#005ca9] bg-white"
      }`}
    >
      <img src={icons[content]} alt="" className="w-10 h-10" />
      <span
        className={`flex-1 text-[12px] truncate ${
          isActive ? "text-[#637a97]" : "text-[#005ca9]"
        }`}
      >
        {labels[content]}
      </span>
    </button>
  );
}

// Seção Hero
function HeroSection() {
  const { t } = useI18n();

  return (
    <header className="relative w-full min-h-[640px] h-[min(1080px,100svh)] overflow-hidden flex items-end px-[clamp(20px,8.333vw,160px)] py-[clamp(64px,6vw,128px)]">
      <div className="relative z-10 flex flex-col gap-6 max-w-full">
        <h1 className="text-[clamp(36px,4.22vw,81px)] font-semibold text-white leading-[1.1]">
          {t("t0571")}
        </h1>
        <p className="text-[clamp(20px,1.563vw,30px)] text-white leading-[1.3] max-w-[980px]">
          {t("t0572")}
        </p>
        <TaxonomyTags
          kind="meta"
          items={[
            { icon: "devices", label: "Sistemas" },
            { icon: "diamond", label: "Duplo Diamante" },
            { icon: "rule", label: "Análise heurística" },
            { icon: "account_tree", label: "Mapeamento de processos" },
            { icon: "draw", label: "Protótipos" },
            { icon: "table_chart", label: "Painel de qualificação de pedidos" },
            { icon: "design_services", label: "Figma" },
            { icon: "image", label: "Photoshop" },
          ]}
        />
      </div>

      {/* Overlay e imagem de fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={images.heroImage}
            alt=""
            className="absolute h-[122.95%] left-[-1.49%] top-[-6.54%] w-[103.73%] object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#1d1f20] mix-blend-overlay" />
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            backgroundImage:
              "linear-gradient(108.88778149551817deg, rgb(0, 92, 169) 47.828%, rgb(0, 92, 169) 64.041%, rgba(0, 92, 169, 0) 76.92%)",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.58)] z-1" />
    </header>
  );
}

// Seção de Contexto
function ContextSection() {
  const { t } = useI18n();

  return (
    <section
      className="w-full min-h-[min(1080px,100svh)] px-[clamp(20px,8.333vw,160px)] py-[clamp(64px,6vw,128px)] flex items-center"
      data-section-id="context"
    >
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-24">
        <div className="flex-1">
          <h2 className="text-[16px] font-semibold text-[#0d0e10] tracking-[0.64px] mb-6">
            {t("t0018")}
          </h2>
          <div className="text-[16px] text-[#000102] leading-[1.5] space-y-3">
            <p>{t("t0757")}</p>
            <p>​</p>
            <p>{t("t0758")}</p>
            <p>​</p>
            <p>{t("t0759")}</p>
          </div>
        </div>
        <div className="w-[350px] shrink-0">
          <img src={images.contextMedia} alt="" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}

// Seção de Desafio
function ChallengeSection() {
  const { t } = useI18n();

  return (
    <section
      className="w-full min-h-[min(1080px,100svh)] px-[clamp(20px,8.333vw,160px)] py-[clamp(64px,6vw,128px)] flex items-center justify-center overflow-hidden relative"
      data-section-id="challenge"
    >
      <div className="relative z-10 text-center max-w-[1500px] w-full flex flex-col gap-8">
        <h2 className="text-[16px] font-semibold text-[#0d0e10] tracking-[0.64px]">
          {t("t0021")}
        </h2>
        <p className="text-[clamp(26px,1.875vw,36px)] text-[#000102] leading-[1.2]">
          {t("t0760")}
        </p>
      </div>
      <div className="absolute h-[3672px] left-[-650px] top-0 w-[3674px] z-0">
        <img src={images.group1} alt="" className="w-full h-full" />
      </div>
    </section>
  );
}

// Seção de Processo
function ProcessSection() {
  const { text } = useI18n();

  return (
    <section
      className="w-full min-h-[min(1080px,100svh)] px-[clamp(20px,8.333vw,160px)] py-[clamp(64px,6vw,128px)] flex items-center"
      data-section-id="process"
    >
      <div className="case-process-copy">
        <h2>{text("03 · PROCESSO")}</h2>
        <p>
          {text(
            "A revisão começou pelas tarefas de qualificação, onde informações pouco claras poderiam dificultar a análise dos pedidos."
          )}
        </p>
        <p>
          {text("As heurísticas de Nielsen identificaram problemas de orientação e prevenção de erros.")}
        </p>
        <p>{text("A WCAG 2.1 trouxe os critérios de acessibilidade necessários à revisão das interfaces.")}</p>
        <p>{text("Os achados foram relacionados aos perfis, às etapas e aos pontos críticos da operação.")}</p>
        <p>
          {text(
            "Essa análise orientou a reorganização dos fluxos e a aplicação de padrões do Design System CAIXA, buscando decisões mais claras e rastreáveis."
          )}
        </p>
        <TaxonomyTags
          kind="process-tags"
          items={[
            { icon: "search", label: "Descobrir" },
            { icon: "target", label: "Definir" },
            { icon: "build", label: "Desenvolver" },
            { icon: "task_alt", label: "Entregar" },
          ]}
        />
      </div>
    </section>
  );
}

// Seção de Reconhecimento (Artefatos)
function RecognizeSection() {
  const { text } = useI18n();

  return (
    <section
      className="flex min-h-[min(1080px,100svh)] w-full flex-col items-center justify-center gap-6 px-[clamp(20px,8.333vw,160px)] py-6"
      data-name="section.step.recognize"
      data-node-id="6165:52180"
      data-section-id="recognize"
    >
      <div className="flex w-full justify-start" data-name="div.artifact-tag-row" data-node-id="6663:425">
        <TaxonomyTags kind="artifact" items={[{ icon: "rule", label: "Análise heurística" }]} />
      </div>

      <div
        className="artifact-viewport flex w-full items-center justify-center"
        data-name="Artifact Visual"
        data-node-id="6395:12208"
        tabIndex={0}
        role="region"
        aria-label={text("Artefatos do projeto")}
      >
        <img
          src={images.heuristicAnalysis}
          alt="Análise heurística"
          width={1600}
          height={681}
          className="block h-auto max-h-full max-w-full object-contain"
        />
      </div>
    </section>
  );
}

type ArtifactSectionProps = {
  sectionNodeId: string;
  artifactNodeId: string;
  icon: string;
  label: string;
  src: string;
  width: number;
  height: number;
  background?: "blue";
};

function ArtifactSection({
  sectionNodeId,
  artifactNodeId,
  icon,
  label,
  src,
  width,
  height,
  background,
}: ArtifactSectionProps) {
  const { text } = useI18n();
  const artifact = (
    <img
      src={src}
      alt={label}
      width={width}
      height={height}
      className="block h-auto max-h-full max-w-full object-contain"
    />
  );

  return (
    <section
      className={`flex min-h-[min(1080px,100svh)] w-full flex-col items-center justify-center gap-6 px-[clamp(20px,8.333vw,160px)] py-6 ${background === "blue" ? "bg-[#005ca9]" : ""}`}
      data-name={background === "blue" ? "section.step.scale" : "section.step.learn"}
      data-node-id={sectionNodeId}
      data-section-id="artifacts"
    >
      <div className={`flex w-full ${background === "blue" ? "justify-end" : "justify-start"}`}>
        <TaxonomyTags kind="artifact" items={[{ icon, label }]} />
      </div>
      <div
        className="artifact-viewport flex w-full items-center justify-center"
        data-name="figure.artifact-visual"
        data-node-id={artifactNodeId}
        tabIndex={0}
        role="region"
        aria-label={text("Artefatos do projeto")}
      >
        {artifact}
      </div>
    </section>
  );
}

function MissingArtifactsSections() {
  return (
    <>
      <ArtifactSection
        sectionNodeId="6165:52214"
        artifactNodeId="6728:29835"
        icon="account_tree"
        label="Mapeamento de processos"
        src={images.criticalFlows}
        width={1600}
        height={802}
      />
      <ArtifactSection
        sectionNodeId="6165:52220"
        artifactNodeId="6165:52224"
        icon="widgets"
        label="Design System CAIXA"
        src={images.caixaDesignSystem}
        width={1678}
        height={834}
        background="blue"
      />
      <ArtifactSection
        sectionNodeId="6165:52239"
        artifactNodeId="6165:52240"
        icon="table_chart"
        label="Painel de qualificação de pedidos"
        src={images.qualificationPanel}
        width={1600}
        height={872}
      />
      <ArtifactSection
        sectionNodeId="6518:23581"
        artifactNodeId="6518:23582"
        icon="dashboard"
        label="Interface do BackOffice"
        src={images.backofficeInterface}
        width={1600}
        height={840}
      />
      <ArtifactSection
        sectionNodeId="6617:31045"
        artifactNodeId="6617:31046"
        icon="widgets"
        label="Padrões do BackOffice"
        src={images.backofficePatterns}
        width={1600}
        height={840}
      />
    </>
  );
}

type MetricResultProps = {
  value: string;
  title: string;
  subtitle: string;
  name: string;
  nodeId: string;
};

function MetricResult({ value, title, subtitle, name, nodeId }: MetricResultProps) {
  return (
    <div
      className="relative flex h-[75px] !min-w-[280px] flex-[1_0_0] items-end"
      data-name={name}
      data-node-id={nodeId}
    >
      <div
        className="flex size-[75px] max-h-[75px] min-h-[75px] max-w-[75px] min-w-[75px] shrink-0 flex-col items-center justify-center rounded-[6px] bg-[#020305] px-3 py-[3px]"
        data-name="number"
      >
        <p className="font-['Sora:Regular'] text-[16px] font-normal leading-none whitespace-nowrap text-[#fcfdfe]">
          {value}
        </p>
      </div>
      <div className="flex min-w-0 flex-[1_0_0] self-stretch items-end">
        <div className="flex h-full min-w-0 flex-[1_0_0] flex-col items-start justify-center">
          <div
            className="flex w-full shrink-0 flex-col items-start gap-[6px] rounded-tr-[6px] rounded-br-[6px] bg-[#101113] p-3 font-['Sora:Regular'] font-normal leading-none whitespace-nowrap text-[#fcfdfe]"
            data-name="<title>"
          >
            <p className="text-[16px]">{title}</p>
            <p className="text-[9px]">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Seção de Resultados
function ResultsSection() {
  const { t } = useI18n();

  const metrics = [
    {
      value: "83%",
      title: t("t0932"),
      subtitle: t("t0933"),
      name: "metric-result.coverage",
      nodeId: "6312:1146",
    },
    {
      value: "34%",
      title: t("t0934"),
      subtitle: t("t0935"),
      name: "metric-result.outcome",
      nodeId: "6312:1153",
    },
    {
      value: t("t0617"),
      title: t("t0155"),
      subtitle: t("t0156"),
      name: "metric-result.product-reach",
      nodeId: "6361:233",
    },
  ];

  return (
    <section
      className="w-full min-h-[min(1080px,100svh)] px-[clamp(20px,8.333vw,160px)] py-[clamp(64px,6vw,128px)] flex items-center"
      data-name="section.results"
      data-node-id="6165:52386"
      data-section-id="results"
    >
      <div className="flex w-full flex-col items-start gap-6" data-name="div.flex.flex-col.w-full" data-node-id="6165:52387">
        <h2 className="w-full max-w-[900px] text-[16px] font-semibold leading-[1.3] tracking-[0.64px] text-[#000102]" data-node-id="6165:52388">
          {t("t0149")}
        </h2>

        <div
          className="flex min-h-[100px] w-full flex-wrap content-start items-start gap-x-6 gap-y-8"
          data-name="div.metrics"
          data-node-id="6312:1145"
        >
          {metrics.map((metric) => (
            <MetricResult key={metric.nodeId} {...metric} />
          ))}
        </div>

        <div className="max-w-[1372px] text-[16px] leading-[1.5] text-[#000102]" data-node-id="6165:52396">
          <p>{t("t0936")}</p>
          <p>​</p>
          <p>{t("t0937")}</p>
        </div>
      </div>
    </section>
  );
}

// Componente principal
export default function QualificacaoComplexa() {
  return (
    <article className="bg-[#eeeff1] w-full min-h-screen flex flex-col">
      <HeroSection />
      <ContextSection />
      <ChallengeSection />
      <ProcessSection />
      <RecognizeSection />
      <MissingArtifactsSections />
      <ResultsSection />
    </article>
  );
}
