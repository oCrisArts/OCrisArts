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

export default function ServiceCard({
  service,
  titleKey,
  subtitleKey,
  tags,
  additionalTags = [],
  poster,
  videoSrc,
  onClick,
}: {
  service: string
  titleKey: string
  subtitleKey: string
  tags: ServiceTag[]
  additionalTags?: AdditionalTag[]
  poster: string
  videoSrc: string
  onClick?: () => void
}) {
  const { t } = useI18n()

  return (
    <article
      className="aspect-[360/640] bg-white border border-[#bbbcbe] rounded-[8px] overflow-hidden flex flex-col cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out"
      data-name="card-case"
      data-service-name={service}
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onClick?.()
        }
      }}
    >
      <div className="flex-1 relative mb-[-140px] overflow-hidden group">
        <div className="aspect-[352/632] relative z-2">
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

      <div className="h-[140px] min-h-[140px] p-4 flex flex-col gap-1 justify-start relative z-10">
        <h3 className="text-[#0d0e10] text-[20px] font-['Sora:Regular'] font-normal leading-[1.6]">
          {t(titleKey)}
        </h3>
        <p className="text-[#0d0e10] text-[16px] font-['Sora:Light'] font-light leading-[1.6]">
          {t(subtitleKey)}
        </p>

        <ul className="flex gap-2 items-center list-none m-0 p-0 text-[#fcfdfe] whitespace-nowrap">
          {tags.map((tag, index) => (
            <li
              key={`${tag.label}-${index}`}
              className="flex gap-2 items-center bg-[#000102] px-2 py-1 rounded-[12px]"
            >
              <span
                className="font-['Material_Symbols_Outlined:Light'] font-light text-[10px]"
                style={{ fontVariationSettings: '"FILL" 0, "GRAD" 0' }}
              >
                {tag.icon}
              </span>
              <span className="font-['Sora:Regular'] font-normal text-[11px]">
                {tag.translationKey ? t(tag.translationKey) : tag.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
