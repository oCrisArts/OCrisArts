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
    imageClass: string
    tone: "light" | "dark"
    background?: string
    figureClass?: string
  }
  const compact = variant === "compact"
  const captionTone = card.tone === "dark" ? "text-[#f9f9f9]" : "text-[#020305]"

  return (
    <Link
      className={`case-card case-card--${variant} relative shrink-0 overflow-hidden rounded-lg border border-[#bbbcbe] bg-[#eeeff1] ${
        compact ? "h-[160px] w-[90px]" : "h-[568px] w-[320px]"
      }`}
      to={path(`/cases/${slug}`)}
      onClick={onNavigate}
      data-name="article.case-card"
      data-case-slug={slug}
      data-card-variant={variant}
    >
      <article className="flex size-full flex-col">
        <figure
          className={`case-card__figure relative min-h-0 flex-1 overflow-hidden ${card.figureClass ?? ""}`}
          data-name="card-figure"
        >
          {card.background && (
            <img
              alt=""
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover"
              src={card.background}
            />
          )}
          <div
            className="absolute inset-0 overflow-hidden"
            data-name="card-img"
          >
            <img
              alt=""
              className={`pointer-events-none absolute max-w-none ${card.imageClass}`}
              src={card.image}
            />
          </div>
        </figure>
        <div
          className={`case-card__caption ${captionTone} flex shrink-0 flex-col justify-center ${
            compact ? "h-[52px] gap-0.5 p-1" : "h-[140px] gap-1 p-4"
          }`}
          data-name="card-caption"
        >
          <h3
            className={`font-['Geist:Regular'] font-normal leading-[1.35] ${
              compact ? "text-[7px]" : "text-[20px]"
            }`}
          >
            {t(item.title)}
          </h3>
          <p
            className={`font-['Sora:Light'] font-light leading-[1.35] ${
              compact ? "line-clamp-2 text-[6px]" : "text-[24px]"
            }`}
          >
            {t(item.subtitle)}
          </p>
        </div>
      </article>
    </Link>
  )
}
