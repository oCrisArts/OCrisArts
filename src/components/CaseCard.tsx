import { Link } from "react-router-dom"

import { findCase, type CaseSlug } from "../data/cases"
import { useI18n } from "../i18n"

export type CaseCardVariant = "hero" | "default" | "compact"

type CaseCardProps = {
  slug: CaseSlug
  variant?: CaseCardVariant
  onNavigate?: () => void
}

export { caseSlugs } from "../data/cases"

export default function CaseCard({
  slug,
  variant = "default",
  onNavigate,
}: CaseCardProps) {
  const item = findCase(slug)
  const { t, path } = useI18n()

  if (!item) return null

  const card = item.card as {
    image: string
    tone: "light" | "dark"
  }

  const variantClasses = {
    default: {
      article:
        "case-card--caption-bottom w-[300px] aspect-[300/533] max-[600px]:w-[min(76vw,300px)] [&_.case-card__caption]:bottom-0",
      caption: "h-[140px] gap-2 px-4 py-3",
      title: "text-[16px]",
      subtitle: "text-[13px]",
    },
    hero: {
      article:
        "case-card--caption-top w-80 aspect-[320/568] max-[1100px]:w-[260px] max-[600px]:w-[min(60vw,260px)] [&_.case-card__caption]:top-0",
      caption: "h-[140px] gap-2 px-4 py-3",
      title: "text-[16px] max-[600px]:text-base",
      subtitle: "text-[13px] max-[600px]:text-lg",
    },
    compact: {
      article:
        "case-card--caption-bottom w-[90px] aspect-[9/16] [&_.case-card__caption]:bottom-0",
      caption: "h-[52px] gap-0.5 p-1",
      title: "text-[7px] leading-[1.35]",
      subtitle:
        "line-clamp-2 overflow-hidden text-[6px] leading-[1.35]",
    },
  }[variant]
  const toneClass =
    card.tone === "light"
      ? "case-card--tone-light [&_.case-card__caption]:text-[#020305]"
      : "case-card--tone-dark [&_.case-card__caption]:text-[#f9f9f9]"

  return (
    <article
      className={`case-card case-card--${variant} ${variantClasses.article} ${toneClass} bg-[#eeeff1] relative shrink-0 overflow-hidden rounded-lg border border-[#bbbcbe] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#fcfdfe]`}
      data-name="article.case-card"
      data-case-slug={slug}
      data-card-variant={variant}
    >
      <Link
        className="case-card__link relative block size-full overflow-hidden"
        to={path(`/cases/${slug}`)}
        onClick={onNavigate}
        aria-label={`${t(item.title)} — ${t(item.subtitle)}`}
      >
        <figure
          className="case-card__figure absolute inset-0 isolate overflow-hidden"
          data-name="card-figure"
        >
          <img
            alt=""
            className="h-full w-full object-contain transition-all duration-300 ease-out hover:scale-105"
            src={card.image}
          />
        </figure>

        <div
          className={`case-card__caption absolute inset-x-0 z-[3] flex flex-col items-start justify-center bg-transparent ${variantClasses.caption}`}
          data-name="card-caption"
        >
          <h3 className={`case-card__title w-full [word-break:break-word] font-['Geist:Regular'] font-normal leading-[1.6] ${variantClasses.title}`}>
            {t(item.title)}
          </h3>
          <p className={`case-card__subtitle w-full [word-break:break-word] font-['Sora:Light'] font-light leading-[1.6] ${variantClasses.subtitle}`}>
            {t(item.subtitle)}
          </p>
        </div>
      </Link>
    </article>
  )
}
