export const cases = [
  {
    slug: "navegacao-confusa",
    title: "t0567",
    subtitle: "t0568",
    context: "t0638",
    project: "SIFGD · CAIXA",
    card: {
      image: "/assets/front-page/cases/navegacao-confusa.png",
      imageClass: "object-contain",
      tone: "light",
    },
    load: () => import("../pages/cases/NavegacaoConfusa"),
  },
  {
    slug: "cadastros-complexos",
    title: "t0159",
    subtitle: "t0160",
    context: "t0168",
    project: "SIAFF · CAIXA",
    card: {
      image: "/assets/front-page/cases/cadastros-complexos.png",
      imageClass: "h-full left-[-196.76%] top-0 w-[321.69%]",
      tone: "dark",
    },
    load: () => import("../pages/cases/CadastrosComplexos"),
  },
  {
    slug: "regra-incerta",
    title: "t0569",
    subtitle: "t0570",
    context: "t0943",
    project: "SPVAT · CAIXA",
    card: {
      image: "/assets/front-page/cases/regra-incerta.png",
      background: "/assets/front-page/cases/card-background.png",
      figureClass: "bg-[#f9f9f9]",
      imageClass: "left-[10%] top-0 size-[80%]",
      tone: "light",
    },
    load: () => import("../pages/cases/RegraIncerta"),
  },
  {
    slug: "qualificacao-complexa",
    title: "t0571",
    subtitle: "t0572",
    context: "t0757",
    project: "DPVAT · CAIXA",
    card: {
      image: "/assets/front-page/cases/qualificacao-complexa.png",
      background: "/assets/front-page/cases/card-background.png",
      imageClass: "inset-0 size-full",
      tone: "dark",
    },
    load: () => import("../pages/cases/QualificacaoComplexa"),
  },
  {
    slug: "corrida-em-jogo",
    title: "t0349",
    subtitle: "t0350",
    context: "t0355",
    project: "Porsche Cup Brasil",
    card: {
      image: "/assets/front-page/cases/corrida-em-jogo.png",
      background: "/assets/front-page/cases/card-background.png",
      figureClass: "bg-black",
      imageClass: "h-full left-[-216.97%] top-0 w-[321.69%]",
      tone: "dark",
    },
    load: () => import("../pages/cases/CorridaEmJogo"),
  },
  {
    slug: "beneficios-dispersos",
    title: "t0010",
    subtitle: "t0011",
    context: "t0019",
    project: "Sou Parceiro · Intelbras",
    card: {
      image: "/assets/front-page/cases/beneficios-dispersos.png",
      background: "/assets/front-page/cases/card-background.png",
      figureClass: "bg-[#060709]",
      imageClass: "left-[15.31%] top-[6.23%] size-[69.38%]",
      tone: "dark",
    },
    load: () => import("../pages/cases/BeneficiosDispersos"),
  },
  {
    slug: "cadastro-travado",
    title: "t0276",
    subtitle: "t0277",
    context: "t0282",
    project: "Konviva LMS",
    card: {
      image: "/assets/front-page/cases/cadastro-travado.png",
      figureClass: "bg-[#020305]",
      imageClass: "h-[123.39%] left-[-102.41%] top-[-13.71%] w-[248.12%]",
      tone: "dark",
    },
    load: () => import("../pages/cases/CadastroTravado"),
  },
  {
    slug: "uma-marca-por-cliente",
    title: "t0574",
    subtitle: "t0575",
    context: "t0999",
    project: "Konviva White-Label",
    card: {
      image: "/assets/front-page/cases/uma-marca-por-cliente.png",
      figureClass: "bg-[#060709]",
      imageClass: "h-[77.82%] left-0 top-0 w-full",
      tone: "dark",
    },
    load: () => import("../pages/cases/UmaMarcaPorCliente"),
  },
] as const

export const caseSlugs = cases.map(({ slug }) => slug)
export type CaseSlug = typeof cases[number]["slug"]

export function findCase(slug: string | undefined) {
  return cases.find((item) => item.slug === slug)
}
