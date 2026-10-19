import { useI18n } from "../i18n"

export type ServiceTag = {
  icon: string
  label: string
  translationKey?: string
}
export type AdditionalTag = {
  icon: string
  translationKey: string
}

export type ServiceCardProps = {
  service: string
  titleKey: string
  subtitleKey: string
  tags: ServiceTag[]
  additionalTags?: AdditionalTag[]
  poster: string
  videoSrc: string
  onClick?: () => void
  variant?: "default" | "compact"
}

export default function ServiceCard({
  service,
  titleKey,
  subtitleKey,
  tags,
  additionalTags = [],
  poster,
  videoSrc,
  onClick,
  variant = "default",
}: ServiceCardProps) {
  const { t } = useI18n()
  const compact = variant === "compact"

  return (
    <article
      className={`${
        compact ? "h-[284.5px] w-[160px] shrink-0" : "aspect-[360/640]"
      } flex flex-col overflow-hidden rounded-[8px] border border-[#bbbcbe] bg-white transition-all duration-300 ease-out ${
        onClick ? "cursor-pointer hover:scale-[1.02] hover:shadow-lg" : ""
      }`}
      data-name="card-case"
      data-service-name={service}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onClick?.()
        }
      }}
    >
      <div
        className={`group relative flex-1 overflow-hidden ${
          compact ? "mb-[-70px]" : "mb-[-140px]"
        }`}
      >
        <div className="relative z-2 h-full w-full">
          <video
            data-service-video
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            autoPlay
            loop
            muted
            playsInline
            poster={poster}
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        className={`${
          compact ? "h-[70px] min-h-[70px] p-2" : "h-[140px] min-h-[140px] p-4"
        } relative z-10 flex flex-col justify-start gap-1 bg-white`}
      >
        <h3
          className={`${
            compact ? "text-[10px]" : "text-[20px]"
          } font-['Sora:Regular'] font-normal leading-[1.6] text-[#0d0e10]`}
        >
          {t(titleKey)}
        </h3>
        <p
          className={`${
            compact ? "text-[8px]" : "text-[16px]"
          } font-['Sora:Light'] font-light leading-[1.6] text-[#0d0e10]`}
        >
          {t(subtitleKey)}
        </p>

        <ul className="flex gap-2 items-center list-none m-0 p-0 text-[#fcfdfe] whitespace-nowrap">
          {(compact ? tags.slice(0, 1) : tags).map((tag, index) => (
            <li
              key={`${tag.label}-${index}`}
              className={`flex items-center rounded-[12px] bg-[#000102] ${
                compact ? "gap-1 px-1.5 py-0.5" : "gap-2 px-2 py-1"
              }`}
            >
              <span
                className={`font-['Material_Symbols_Outlined:Light'] font-light ${
                  compact ? "text-[7px]" : "text-[10px]"
                }`}
                style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}
              >
                {tag.icon}
              </span>
              <span
                className={`font-['Sora:Regular'] font-normal ${
                  compact ? "text-[7px]" : "text-[11px]"
                }`}
              >
                {tag.translationKey ? t(tag.translationKey) : tag.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
