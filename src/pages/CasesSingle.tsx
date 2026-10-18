import { lazy } from "react"
import { Navigate, useParams } from "react-router-dom"
import { cases, findCase } from "../data/cases"
import { useI18n } from "../i18n"

const caseComponents = new Map(
  cases.map((item) => [item.slug, lazy(item.load)]),
)

export default function CasesSingle() {
  const { slug } = useParams()
  const { path } = useI18n()
  const item = findCase(slug)

  if (!item) return <Navigate to={path("/")} replace />

  const CaseComponent = caseComponents.get(item.slug)!
  return <CaseComponent />
}
