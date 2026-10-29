import type { CaseMetric } from "../data/cases"
import { useI18n } from "../i18n"

function MetricContent({ metric }: { metric: CaseMetric }) {
  const { t, text } = useI18n()
  const content = (item: CaseMetric["value"]) =>
    item.key ? t(item.key) : text(item.text ?? "")

  return (
    <>
      <div
        className="flex size-[75px] max-h-[75px] min-h-[75px] max-w-[75px] min-w-[75px] shrink-0 flex-col items-center justify-center rounded-[6px] bg-[#020305] px-3 py-[3px]"
        data-name="number"
      >
        <p className="whitespace-nowrap text-[16px] font-normal leading-none text-[#fcfdfe] [word-break:break-word]">
          {content(metric.value)}
        </p>
      </div>
      <div className="flex min-w-0 flex-1 flex-row items-end self-stretch">
        <div
          className="flex h-full min-w-0 flex-1 flex-col items-start justify-center"
          data-name="content"
        >
          <div className="flex w-full shrink-0 flex-col items-start gap-[6px] rounded-r-[6px] bg-[#101113] p-3 font-normal leading-none text-[#fcfdfe] [word-break:break-word]">
            <p className="text-[16px]">{content(metric.title)}</p>
            <p className="text-[9px]">{content(metric.subtitle)}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function MetricCard({
  metric,
  className = "",
}: {
  metric: CaseMetric
  className?: string
}) {
  return (
    <article
      className={`relative flex h-[75px] w-[320px] max-w-[calc(100vw-40px)] flex-none items-end ${className}`}
      data-name={`metric-result.${metric.name}`}
      data-node-id="6371:125"
    >
      <MetricContent metric={metric} />
    </article>
  )
}
