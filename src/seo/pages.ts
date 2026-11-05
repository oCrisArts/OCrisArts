import { basePath, catalogs, languageFromPath, languages, localizedPath, translate, type Language } from "../i18n"
import { cases } from "../data/cases"

export const origin = "https://ocris.art.br"
export const socialImage = "/assets/ocrisart.jpg"
export { cases }

export const allPaths = languages.flatMap(language =>
  ["/", "/consultoria", ...cases.map(item => `/cases/${item.slug}`)].map(path => localizedPath(path, language)),
)

// Propostas por cliente nunca devem aparecer nos resultados de busca.
export const isPrivatePath = (path: string) =>
  /^\/(?:en\/|es\/)?(?:consultoria\/[^/]+|start-you-project\/[^/]+|politica-de-privacidade)$/.test(path.replace(/\/$/, ""))

export const isKnownPath = (path: string) =>
  allPaths.includes(path.replace(/\/$/, "") || "/") || isPrivatePath(path)

const localizedCaseProjects: Record<string, Record<Language, string>> = {
  "navegacao-confusa": { "pt-BR": "Plataforma corporativa", en: "Enterprise platform", es: "Plataforma empresarial" },
  "cadastros-complexos": { "pt-BR": "Plataforma de cadastros", en: "Registration platform", es: "Plataforma de registros" },
}

const consultingMeta: Record<Language, { title: string; description: string; proposalTitle: string; proposalDescription: string }> = {
  "pt-BR": {
    title: "Consultoria de UX e Produtos Digitais | OCrisArts",
    description: "Consultoria em experiência digital, sites, marcas e produtos. Conte sua ideia, explore um protótipo funcional e descubra como avançar.",
    proposalTitle: "Proposta personalizada de consultoria | OCrisArts",
    proposalDescription: "Proposta individual de consultoria e demonstração navegável.",
  },
  en: {
    title: "UX and Digital Product Consultancy | OCrisArts",
    description: "Consultancy for digital experiences, websites, brands and products. Share your idea and explore what comes next.",
    proposalTitle: "Personalized consultancy proposal | OCrisArts",
    proposalDescription: "Individual consultancy proposal and interactive demonstration.",
  },
  es: {
    title: "Consultoría UX y Productos Digitales | OCrisArts",
    description: "Consultoría de experiencias digitales, sitios, marcas y productos. Comparte tu idea y explora los próximos pasos.",
    proposalTitle: "Propuesta personalizada de consultoría | OCrisArts",
    proposalDescription: "Propuesta individual de consultoría y demostración interactiva.",
  },
}

export function pageMetadata(path: string) {
  const language = languageFromPath(path)
  const copy = catalogs[language]
  const base = basePath(path).replace(/\/$/, "") || "/"
  const consultancy = base === "/consultoria"
  const proposal = /^\/consultoria\/[^/]+$/.test(base) || /^\/start-you-project\/[^/]+$/.test(base)
  const privacy = base === "/politica-de-privacidade"
  const item = cases.find(c => base === `/cases/${c.slug}`)
  const project = item ? (localizedCaseProjects[item.slug]?.[language] ?? item.project) : ""
  const meta = consultingMeta[language]
  const title = consultancy ? meta.title
    : proposal ? meta.proposalTitle
    : privacy ? "Política de privacidade | OCrisArts"
    : item ? `${copy[item.title]} ${project} | OCrisArts`
    : translate("homeTitle", language)
  const description = consultancy ? meta.description
    : proposal ? meta.proposalDescription
    : privacy ? "Como a OCrisArts trata dados enviados no atendimento."
    : item ? `${copy[item.subtitle]} ${copy[item.context]}`
    : copy.t0602
  const canonicalBase = base.replace(/^\/start-you-project\//, "/consultoria/")
  const canonical = origin + localizedPath(canonicalBase, language)

  const person = {
    "@type": "Person",
    "@id": origin + "/#person",
    name: "oCris Acosta",
    url: origin,
    jobTitle: "Product Designer",
    knowsAbout: ["Product Design", "UX/UI", "UX Research", "Design Systems", "Design Engineering", "Branding", copy.t0604],
    sameAs: ["https://www.linkedin.com/in/ocrisarts", "https://www.behance.net/ocrisart"],
  }
  const mainEntity = item
    ? { "@type": "CreativeWork", name: copy[item.title], description, url: canonical, inLanguage: language, author: { "@id": origin + "/#person" }, image: origin + socialImage }
    : consultancy
      ? { "@type": "Service", name: meta.title, description, url: canonical, provider: { "@id": origin + "/#person" }, areaServed: "BR", serviceType: "Consultoria de UX e produtos digitais" }
      : { "@type": "WebPage", name: title, url: canonical, inLanguage: language, about: { "@id": origin + "/#person" } }
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      { "@type": "WebSite", "@id": origin + "/#website", name: "OCrisArts", url: origin, inLanguage: languages },
      mainEntity,
      ...(base === "/" ? [{
        "@type": "ItemList",
        itemListElement: cases.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: copy[c.title], url: origin + localizedPath(`/cases/${c.slug}`, language) })),
      }] : []),
    ],
  }
  return {
    language, title, description, canonical, schema,
    alternates: [
      ...languages.map(lang => ({ lang, url: origin + localizedPath(canonicalBase, lang) })),
      { lang: "x-default", url: origin + canonicalBase },
    ],
  }
}

export const indexable = import.meta.env.VITE_PUBLIC_INDEXABLE === "true"
export const localeCodes: Record<Language, string> = { "pt-BR": "pt_BR", en: "en_US", es: "es_ES" }

export function headMarkup(path: string, allowIndex = indexable) {
  const data = pageMetadata(path)
  allowIndex = allowIndex && !isPrivatePath(path)
  const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  const meta = (name: string, value: string, property = false) =>
    `<meta ${property ? "property" : "name"}="${name}" content="${escape(value)}" data-seo="true">`

  return `<title>${escape(data.title)}</title>` +
    meta("description", data.description) +
    meta("robots", allowIndex ? "index, follow" : "noindex, nofollow") +
    `<link rel="canonical" href="${data.canonical}" data-seo="true">` +
    data.alternates.map(a => `<link rel="alternate" hreflang="${a.lang}" href="${a.url}" data-seo="true">`).join("") +
    meta("og:title", data.title, true) +
    meta("og:description", data.description, true) +
    meta("og:url", data.canonical, true) +
    meta("og:type", "website", true) +
    meta("og:site_name", "OCrisArts", true) +
    meta("og:locale", localeCodes[data.language], true) +
    meta("og:image", origin + socialImage, true) +
    meta("og:image:width", "1200", true) +
    meta("og:image:height", "630", true) +
    meta("og:image:type", "image/jpeg", true) +
    meta("og:image:alt", "OCrisArts", true) +
    meta("twitter:card", "summary_large_image") +
    meta("twitter:title", data.title) +
    meta("twitter:description", data.description) +
    meta("twitter:image", origin + socialImage) +
    `<script type="application/ld+json" data-seo="true">${JSON.stringify(data.schema).replace(/</g, "\\u003c")}</script>`
}
