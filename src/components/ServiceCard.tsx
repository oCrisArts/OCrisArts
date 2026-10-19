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
        compact ? "aspect-[360/640] w-[300px] shrink-0" : "aspect-[360/640]"
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
      <figure
        className={`group relative flex-1 overflow-hidden ${
          compact ? "mb-[-70px]" : "mb-[-140px]"
        }`}
        data-name="card-figure"
      >
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
      </figure>

      <div
        className={`${
          compact ? "h-[70px] min-h-[70px] p-2" : "h-[140px] min-h-[140px] p-4"
        } relative z-10 flex flex-col justify-start gap-1 `}
        data-name="card-caption"
      >
        <h3
          className={`${
            compact ? "text-[16px]" : "text-[20px]"
          } font-['Sora:Regular'] font-normal leading-[1.6] text-[#0d0e10]`}
        >
          {t(titleKey)}
        </h3>
        {!compact && (
          <>
            <p className="font-['Sora:Light'] text-[16px] font-light leading-[1.6] text-[#0d0e10]">
              {t(subtitleKey)}
            </p>
            <ul className="m-0 flex list-none items-center gap-2 whitespace-nowrap p-0 text-[#fcfdfe]">
              {tags.map((tag, index) => (
                <li
                  key={`${tag.label}-${index}`}
                  className="flex items-center gap-2 rounded-[12px] bg-[#000102] px-2 py-1"
                >
                  <span
                    className="font-['Material_Symbols_Outlined:Light'] text-[10px] font-light"
                    style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}
                  >
                    {tag.icon}
                  </span>
                  <span className="font-['Sora:Regular'] text-[11px] font-normal">
                    {tag.translationKey ? t(tag.translationKey) : tag.label}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  )
}
