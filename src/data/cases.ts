export const cases = [
  {
    slug: "navegacao-confusa",
    title: "t0567",
    subtitle: "t0568",
    context: "t0638",
    project: "SIFGD · CAIXA",
    load: () => import("../pages/cases/NavegacaoConfusa"),
  },
  {
    slug: "cadastros-complexos",
    title: "t0159",
    subtitle: "t0160",
    context: "t0168",
    project: "SIAFF · CAIXA",
    load: () => import("../pages/cases/CadastrosComplexos"),
  },
  {
    slug: "regra-incerta",
    title: "t0569",
    subtitle: "t0570",
    context: "t0943",
    project: "SPVAT · CAIXA",
    load: () => import("../pages/cases/RegraIncerta"),
  },
  {
    slug: "qualificacao-complexa",
    title: "t0571",
    subtitle: "t0572",
    context: "t0757",
    project: "DPVAT · CAIXA",
    load: () => import("../pages/cases/QualificacaoComplexa"),
  },
  {
    slug: "corrida-em-jogo",
    title: "t0349",
    subtitle: "t0350",
    context: "t0355",
    project: "Porsche Cup Brasil",
    load: () => import("../pages/cases/CorridaEmJogo"),
  },
  {
    slug: "beneficios-dispersos",
    title: "t0010",
    subtitle: "t0011",
    context: "t0019",
    project: "Sou Parceiro · Intelbras",
    load: () => import("../pages/cases/BeneficiosDispersos"),
  },
  {
    slug: "cadastro-travado",
    title: "t0276",
    subtitle: "t0277",
    context: "t0282",
    project: "Konviva LMS",
    load: () => import("../pages/cases/CadastroTravado"),
  },
  {
    slug: "uma-marca-por-cliente",
    title: "t0574",
    subtitle: "t0575",
    context: "t0999",
    project: "Konviva White-Label",
    load: () => import("../pages/cases/UmaMarcaPorCliente"),
  },
] as const

export const caseSlugs = cases.map(({ slug }) => slug)
export type CaseSlug = typeof cases[number]["slug"]

export function findCase(slug: string | undefined) {
  return cases.find((item) => item.slug === slug)
}
