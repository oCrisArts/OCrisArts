import type { CaseMetric } from "../data/cases"
import { useI18n } from "../i18n"

export default function MetricCard({
  metric,
}: {
  metric: CaseMetric
}) {
  const { t, text } = useI18n()
  const content = (item: CaseMetric["value"]) =>
    item.key ? t(item.key) : text(item.text ?? "")

  return (
    <article
      className="metric-card"
      data-name={`metric-result.${metric.name}`}
      data-node-id="6371:125"
    >
      <strong className="metric-card__number" data-name="number">
        {content(metric.value)}
      </strong>
      <div className="metric-card__content" data-name="content">
        <h3 className="metric-card__title">{content(metric.title)}</h3>
        <p className="metric-card__subtitle">{content(metric.subtitle)}</p>
      </div>
    </article>
  )
}
