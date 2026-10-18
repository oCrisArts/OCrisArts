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
    figureBg?: string
    figureOverlay?: string
    innerOverlay?: string
    imageWrapper?: string
    cardBg?: string
  }

  const compact = variant === "compact"
  const captionTone = card.tone === "dark" ? "text-[#f9f9f9]" : "text-[#020305]"
  const cardBg = card.cardBg ?? "bg-[#eeeff1]"

  if (compact) {
    return (
      <Link
        className={`case-card case-card--compact relative shrink-0 overflow-hidden rounded-lg border border-[#bbbcbe] ${cardBg} h-[160px] w-[90px]`}
        to={path(`/cases/${slug}`)}
        onClick={onNavigate}
        data-name="article.case-card"
        data-case-slug={slug}
        data-card-variant="compact"
      >
        <article className="flex size-full flex-col">
          <figure
            className="case-card__figure relative flex flex-[1_0_0] isolate items-center justify-center mb-[-52px] min-h-px overflow-clip w-full aspect-[352/632]"
            data-name="card-figure"
          >
            <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-name="card-img">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  alt=""
                  className="pointer-events-none absolute max-w-none object-contain"
                  src={card.image}
                />
              </div>
            </div>
          </figure>
          <div
            className={`case-card__caption ${captionTone} flex flex-col gap-0.5 h-[52px] items-start justify-center p-1 relative shrink-0 w-full`}
            data-name="card-caption"
          >
            <h3 className="font-['Geist:Regular'] font-normal leading-[1.35] text-[7px]">
              {t(item.title)}
            </h3>
            <p className="font-['Sora:Light'] font-light leading-[1.35] line-clamp-2 text-[6px]">
              {t(item.subtitle)}
            </p>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link
      className={`case-card case-card--${variant} ${cardBg} border border-[#bbbcbe] border-solid content-stretch flex flex-col h-[568px] items-start justify-center overflow-clip relative rounded-[8px] shrink-0 w-[320px]`}
      to={path(`/cases/${slug}`)}
      onClick={onNavigate}
      data-name="article.case-card"
      data-case-slug={slug}
      data-card-variant={variant}
    >
      <article
        className={`content-stretch flex flex-[1_0_0] isolate items-center justify-center mb-[-140px] min-h-px overflow-clip relative w-full ${card.figureBg ?? ""}`}
        data-name="card-figure"
      >
        {card.background && (
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={card.background}
          />
        )}
        {card.figureOverlay && (
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className={`absolute ${card.figureOverlay} inset-0`} />
          </div>
        )}
        <div
          className={`flex-[1_0_0] h-full min-w-px relative z-[2] ${card.imageWrapper ?? "aspect-[352/632]"}`}
          data-name="card-img"
        >
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            {card.innerOverlay && <div className={`absolute ${card.innerOverlay} inset-0`} />}
            <div className="absolute inset-0 overflow-hidden">
              <img
                alt=""
                className={`pointer-events-none absolute max-w-none ${card.imageClass}`}
                src={card.image}
              />
            </div>
          </div>
        </div>
      </article>
      <div
        className={`case-card__caption ${captionTone} content-stretch flex flex-col gap-[4px] h-[140px] items-start justify-center min-h-[140px] p-[16px] relative shrink-0 w-full`}
        data-name="card-caption"
      >
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular'] font-normal leading-[1.6] min-w-px relative text-[20px]">
            {t(item.title)}
          </p>
        </div>
        <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="card-title">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Sora:Light'] font-light leading-[1.6] min-w-px relative text-[24px]">
            {t(item.subtitle)}
          </p>
        </div>
      </div>
    </Link>
  )
}
