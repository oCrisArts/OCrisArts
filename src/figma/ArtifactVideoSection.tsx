import TaxonomyTags from "./TaxonomyTags"
import { useI18n } from "../i18n"

type ArtifactVideoSectionProps = {
  src: string
  label: string
  nodeId: string
  icon?: string
  dark?: boolean
  width?: number
  height?: number
}

export default function ArtifactVideoSection({
  src,
  label,
  nodeId,
  icon,
  dark = false,
  width = 1600,
  height = 900,
}: ArtifactVideoSectionProps) {
  const { text } = useI18n()

  return (
    <section
      className={`flex min-h-[min(1080px,100svh)] w-full flex-col items-center justify-center gap-6 px-[clamp(20px,8.333vw,160px)] py-6 ${
        dark ? "bg-[#020305]" : "bg-[#eeeff1]"
      }`}
      data-name="section.step.verify"
      data-node-id={nodeId}
      data-section-id="artifacts"
    >
      {icon && (
        <div className="flex w-full justify-start">
          <TaxonomyTags
            kind="artifact"
            items={[{ icon, label: "Protótipos" }]}
          />
        </div>
      )}
      <figure
        className="artifact-viewport flex w-full items-center justify-center"
        tabIndex={0}
        role="region"
        aria-label={text("Artefatos do projeto")}
      >
        <video
          aria-label={text(label)}
          autoPlay
          className="block h-auto max-h-[calc(100svh-96px)] max-w-full object-contain"
          height={height}
          loop
          muted
          playsInline
          preload="metadata"
          src={src}
          width={width}
        />
      </figure>
    </section>
  )
}
