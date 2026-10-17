import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const HomeExact = lazy(() => import("./figma/HomeExact"))
const NavegacaoConfusa = lazy(() => import("./figma/NavegacaoConfusa"))
const CadastrosComplexos = lazy(() => import("./figma/CadastrosComplexos"))
const RegraIncerta = lazy(() => import("./figma/RegraIncerta"))
const QualificacaoComplexa = lazy(() => import("./figma/QualificacaoComplexa"))
const CorridaEmJogo = lazy(() => import("./figma/CorridaEmJogo"))
const BeneficiosDispersos = lazy(() => import("./figma/BeneficiosDispersos"))
const CadastroTravado = lazy(() => import("./figma/CadastroTravado"))
const UmaMarcaPorCliente = lazy(() => import("./figma/UmaMarcaPorCliente"))

const caseRoutes = [
  ["Navegação confusa?", "navegacao-confusa"],
  ["Cadastros complexos?", "cadastros-complexos"],
  ["Regra incerta?", "regra-incerta"],
  ["Qualificação complexa?", "qualificacao-complexa"],
  ["Corrida em jogo?", "corrida-em-jogo"],
  ["Benefícios dispersos?", "beneficios-dispersos"],
  ["Cadastro travado?", "cadastro-travado"],
  ["Uma marca por cliente?", "uma-marca-por-cliente"],
] as const

const homeNavigation = [
  ["inicio", "home", "Início"],
  ["cases", "cases", "Cases"],
  ["atuacao", "design_services", "Atuação"],
  ["sobre", "badge", "Sobre"],
  ["evidencias", "analytics", "Evidências"],
  ["contato", "send", "Contato"],
] as const

const caseNavigation = [
  ["home", "arrow_back", "Início"],
  ["case", "cases", "Cases"],
  ["contexto", "travel_explore", "Contexto"],
  ["processo", "account_tree", "Processo"],
  ["resultados", "monitoring", "Resultados"],
  ["contato", "send", "Contato"],
] as const

function routeForText(text: string) {
  return caseRoutes.find(([title]) => text.includes(title))?.[1]
}

function createAutoCarousel(
  track: HTMLElement,
  viewport: HTMLElement,
  speed: number,
) {
  let position = 0
  let direction = -1
  let active = false
  let dragging = false
  let dragged = false
  let startX = 0
  let startPosition = 0
  let resumeAt = 0
  let previousTime = performance.now()
  let animationFrame = 0

  const bounds = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
  const clamp = (value: number) => Math.min(0, Math.max(-bounds(), value))
  const render = () => gsap.set(track, { x: position })

  const frame = (time: number) => {
    const elapsed = Math.min(40, time - previousTime) / 1000
    previousTime = time
    const max = bounds()
    if (active && !dragging && time >= resumeAt && max > 0) {
      position += direction * speed * elapsed
      if (position <= -max) {
        position = -max
        direction = 1
      } else if (position >= 0) {
        position = 0
        direction = -1
      }
      render()
    }
    animationFrame = requestAnimationFrame(frame)
  }

  const pointerDown = (event: PointerEvent) => {
    dragging = true
    dragged = false
    startX = event.clientX
    startPosition = position
    track.setPointerCapture(event.pointerId)
    track.classList.add("is-dragging")
  }
  const pointerMove = (event: PointerEvent) => {
    if (!dragging) return
    const scale =
      track.offsetWidth > 0
        ? track.getBoundingClientRect().width / track.offsetWidth
        : 1
    const delta = (event.clientX - startX) / Math.max(scale, 0.01)
    if (Math.abs(event.clientX - startX) > 6) dragged = true
    position = clamp(startPosition + delta)
    direction = delta > 0 ? 1 : -1
    render()
  }
  const pointerUp = (event: PointerEvent) => {
    if (!dragging) return
    dragging = false
    resumeAt = performance.now() + 1400
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }
    track.classList.remove("is-dragging")
  }
  const preventDraggedClick = (event: MouseEvent) => {
    if (!dragged) return
    event.preventDefault()
    event.stopPropagation()
    dragged = false
  }

  track.addEventListener("pointerdown", pointerDown)
  track.addEventListener("pointermove", pointerMove)
  track.addEventListener("pointerup", pointerUp)
  track.addEventListener("pointercancel", pointerUp)
  track.addEventListener("click", preventDraggedClick, true)

  const observer = new IntersectionObserver(
    ([entry]) => {
      active = entry.isIntersecting
      previousTime = performance.now()
    },
    { threshold: 0.35 },
  )
  observer.observe(viewport)
  animationFrame = requestAnimationFrame(frame)

  return () => {
    cancelAnimationFrame(animationFrame)
    observer.disconnect()
    track.removeEventListener("pointerdown", pointerDown)
    track.removeEventListener("pointermove", pointerMove)
    track.removeEventListener("pointerup", pointerUp)
    track.removeEventListener("pointercancel", pointerUp)
    track.removeEventListener("click", preventDraggedClick, true)
    gsap.set(track, { clearProps: "x" })
  }
}

function useExactNavigation(root: React.RefObject<HTMLDivElement | null>) {
  const navigate = useNavigate()

  useEffect(() => {
    const element = root.current
    if (!element) return

    const click = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const card = target.closest<HTMLElement>(
        '[data-name="article.case-card"]',
      )
      if (card) {
        const slug = routeForText(card.textContent || "")
        if (slug) {
          event.preventDefault()
          navigate(`/cases/${slug}`)
          return
        }
      }

      const button = target.closest<HTMLElement>('[data-name="btn"]')
      if (!button) return
      const label = button.textContent || ""
      if (label.includes("Início")) navigate("/")
      else if (label.includes("Cases") || label.includes("Case"))
        navigate("/#cases")
      else if (label.includes("Atuação")) navigate("/#atuacao")
      else if (label.includes("Sobre")) navigate("/#sobre")
      else if (label.includes("Evidências")) navigate("/#evidencias")
      else if (label.includes("Contato")) navigate("/#contato")
    }

    element.addEventListener("click", click)
    return () => element.removeEventListener("click", click)
  }, [navigate, root])
}

function BottomNavigation({ mode }: { mode: "home" | "case" }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(mode === "home" ? "inicio" : "case")
  const [visible, setVisible] = useState(false)
  const items = mode === "home" ? homeNavigation : caseNavigation

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(window.scrollY > Math.min(180, window.innerHeight * 0.18))
    }
    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })
    return () => window.removeEventListener("scroll", updateVisibility)
  }, [])

  useEffect(() => {
    const sectionIds =
      mode === "home"
        ? ["inicio", "cases", "atuacao", "sobre", "evidencias", "contato"]
        : ["case", "contexto", "processo", "resultados", "contato"]
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight * 0.45) -
              Math.abs(b.boundingClientRect.top - window.innerHeight * 0.45),
          )
        if (visible[0]?.target.id) setActive(visible[0].target.id)
      },
      { rootMargin: "-34% 0px -54% 0px", threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [mode])

  const activate = (id: string) => {
    if (mode === "case" && id === "home") {
      navigate("/")
      return
    }
    const target = document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: "smooth" })
    else if (mode === "case" && id === "contato") navigate("/#contato")
  }

  return (
    <nav
      className={`bottom-navigation bottom-navigation--${mode}${
        visible ? " is-visible" : ""
      }`}
      aria-label={
        mode === "home" ? "Navegação da página inicial" : "Navegação do case"
      }
    >
      <button
        className="bottom-navigation__brand"
        onClick={() => activate(mode === "home" ? "inicio" : "home")}
        aria-label="Ir para o início"
      >
        <img
          src={mode === "home" ? "/assets/60314.svg" : "/assets/8afaf.svg"}
          alt=""
        />
      </button>
      {items.map(([id, icon, label]) => (
        <button
          key={id}
          className={active === id ? "is-active" : ""}
          aria-current={active === id ? "location" : undefined}
          onClick={() => activate(id)}
        >
          <span className="bottom-navigation__icon" aria-hidden="true">
            {icon}
          </span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

function TopNavigation() {
  const navigate = useNavigate()
  return (
    <header className="top-navigation">
      <button
        className="top-navigation__brand"
        onClick={() => navigate("/")}
        aria-label="Ir para a página inicial"
      >
        <img src="/assets/8afaf.svg" alt="" />
      </button>
      <nav className="top-navigation__social" aria-label="Redes e contatos">
        <a
          href="https://www.behance.net/ocrisart"
          target="_blank"
          rel="noreferrer"
          aria-label="Behance ocrisart"
        >
          <span aria-hidden="true"></span>
          <small>ocrisart</small>
        </a>
        <a href="mailto:" aria-label="Abrir aplicativo de e-mail">
          <span className="top-navigation__material-icon" aria-hidden="true">
            mail
          </span>
          <small>E-mail</small>
        </a>
        <a
          href="https://wa.me/5548991526789"
          aria-label="WhatsApp +55 48 99152-6789"
        >
          <span aria-hidden="true"></span>
          <small>+55 48 99152-6789</small>
        </a>
        <a
          href="https://www.linkedin.com/in/ocrisarts"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn @ocrisart"
        >
          <span aria-hidden="true"></span>
          <small>@ocrisart</small>
        </a>
      </nav>
      <button
        className="top-navigation__language"
        aria-label="Idioma: português"
      >
        <span className="bottom-navigation__icon" aria-hidden="true">
          translate
        </span>
        <small>pt</small>
        <span className="bottom-navigation__icon" aria-hidden="true">
          arrow_drop_down
        </span>
      </button>
    </header>
  )
}

function SharedContactFooter() {
  return (
    <>
      <section
        id="contato"
        className="shared-contact bg-[#eeeff1] content-stretch flex h-[1080px] items-center px-[160px] py-[128px] relative shrink-0 w-[1920px]"
        data-name="section.contact-cta"
      >
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-center min-w-px relative">
          <div className="content-stretch flex flex-col font-['Sora:Regular'] font-normal items-start relative shrink-0 w-full">
            <p className="leading-[1.15] relative shrink-0 text-[#000102] text-[44px] w-[900px]">
              E agora?
            </p>
            <p className="leading-[1.2] relative shrink-0 text-[#000102] text-[36px] w-[900px]">
              &nbsp;
            </p>
            <div className="leading-[0] relative shrink-0 text-[#0d0e10] text-[16px] w-[760px] whitespace-pre-wrap">
              <p className="leading-[1.5] mb-0">
                Sua ideia, produto ou serviço já tem um próximo passo.{" "}
              </p>
              <p className="leading-[1.5]">
                Vamos descobrir juntos qual decisão pode fazer isso avançar.
              </p>
            </div>
          </div>
          <form
            className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="bg-[#eeeff1] border border-[#999faa] border-solid content-stretch flex font-normal gap-[8px] h-[64px] items-center leading-[1.6] px-[24px] relative rounded-[8px] shrink-0 text-[16px] w-full">
              <span className="font-['Material_Symbols_Outlined:Regular'] text-[#1e22aa]">
                person_pin_circle
              </span>
              <input
                className="bg-transparent border-0 outline-none w-full"
                name="name"
                placeholder="Sou [nome]"
                aria-label="Nome"
              />
            </label>
            <label className="bg-[#eeeff1] border border-[#999faa] border-solid content-stretch flex font-normal gap-[8px] h-[64px] items-center leading-[1.6] px-[24px] relative rounded-[8px] shrink-0 text-[16px] w-full">
              <span className="font-['Material_Symbols_Outlined:Regular'] text-[#1e22aa]">
                alternate_email
              </span>
              <input
                className="bg-transparent border-0 outline-none w-full"
                name="contact"
                placeholder="Meu contato é [telefone/e-mail]"
                aria-label="Telefone ou e-mail"
              />
            </label>
            <a
              className="bg-[#0d0e10] content-stretch flex gap-[16px] items-center justify-center min-h-[60px] px-[16px] py-[8px] relative rounded-[12px] shrink-0 text-[#f2dee3]"
              href="https://wa.me/5548991526789"
              target="_blank"
              rel="noreferrer"
            >
              <span className="font-['Material_Symbols_Outlined:Regular'] text-[24px]">
                mark_chat_unread
              </span>
              <span className="font-['Geist:Regular'] text-[12px]">
                Avaliar meu produto
              </span>
            </a>
          </form>
        </div>
      </section>
      <footer className="shared-footer content-stretch flex flex-col h-[1080px] items-start justify-center overflow-clip relative shrink-0 w-[1920px]">
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[36px] items-center justify-center min-h-[540px] px-[48px] py-[160px] relative w-full">
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
            <img alt="" className="size-[117px]" src="/assets/ee968.svg" />
            <p className="font-['Sora:Regular'] font-medium leading-[1.2] text-[#6b0013] text-[44px]">
              oCris Acosta.
            </p>
            <div className="content-stretch flex flex-col font-['Sora:Regular'] items-center px-[8px] py-[12px] text-center w-full">
              <p className="leading-[1.2] text-[#000102] text-[30px]">
                Design que decide.
              </p>
              <p className="leading-[1.5] text-[#0d0e10] text-[16px] w-[620px]">
                Da complexidade à direção: estrutura, evidência e decisão para
                evoluir produtos, serviços e experiências.
              </p>
            </div>
          </div>
          <div className="shared-footer__social content-stretch flex h-[60px] items-center relative shrink-0 w-[586px]">
            <a
              href="https://www.behance.net/ocrisart"
              target="_blank"
              rel="noreferrer"
            >
              <span></span>ocrisart
            </a>
            <a href="mailto:">
              <span className="material-icon">mail</span>E-mail
            </a>
            <a
              href="https://wa.me/5548991526789"
              target="_blank"
              rel="noreferrer"
            >
              <span></span>+55 48 99152-6789
            </a>
            <a
              href="https://www.linkedin.com/in/ocrisarts"
              target="_blank"
              rel="noreferrer"
            >
              <span></span>@ocrisart
            </a>
          </div>
          <p className="font-['Sora:Regular'] text-[#0d0e10] text-[11px]">
            Copyright 2026
          </p>
        </div>
      </footer>
    </>
  )
}

function HomePage() {
  const root = useRef<HTMLDivElement>(null)
  useExactNavigation(root)

  useLayoutEffect(() => {
    const element = root.current
    if (!element) return

    let serviceObserver: IntersectionObserver | undefined
    const carouselCleanups: Array<() => void> = []
    const context = gsap.context(() => {
      const hero = element.querySelector<HTMLElement>(
        '[data-node-id="4:35821"]',
      )
      const casesSection = element.querySelector<HTMLElement>(
        '[data-node-id="4:35827"]',
      )
      const floatingTrack = element.querySelector<HTMLElement>(
        '[data-node-id="4:35828"]',
      )
      const caseTrack = element.querySelector<HTMLElement>(
        '[data-node-id="4:35836"]',
      )

      if (hero && casesSection && floatingTrack && caseTrack) {
        hero.id = "inicio"
        casesSection.id = "cases"
        const sourceCards = Array.from(
          floatingTrack.querySelectorAll<HTMLElement>(
            '[data-name="article.case-card"]',
          ),
        )
        const destinationCards = Array.from(
          caseTrack.querySelectorAll<HTMLElement>(
            '[data-name="article.case-card"]',
          ),
        )
        const selected = [...destinationCards]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4)

        sourceCards.forEach((source, index) => {
          const destination = selected[index]
          if (!destination) return
          source.innerHTML = destination.innerHTML
          source.style.cssText = destination.style.cssText
          gsap.set(destination, { autoAlpha: 0 })
          gsap.fromTo(
            source,
            {
              y: 0,
              rotation: 0,
              scale: 1,
            },
            {
              x: () => {
                const start = source.getBoundingClientRect()
                const finish = destination.getBoundingClientRect()
                return finish.left - start.left
              },
              y: () => window.innerHeight * 0.6,
              rotation: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                endTrigger: casesSection,
                end: "top 58%",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            },
          )
          gsap.to(source, {
            autoAlpha: 0,
            scrollTrigger: {
              trigger: casesSection,
              start: "top 64%",
              end: "top 50%",
              scrub: true,
            },
          })
          gsap.to(destination, {
            autoAlpha: 1,
            scrollTrigger: {
              trigger: casesSection,
              start: "top 58%",
              end: "top 48%",
              scrub: true,
            },
          })
        })

        carouselCleanups.push(createAutoCarousel(caseTrack, casesSection, 34))
      }

      const sectionIds: Record<string, string> = {
        "4:35850": "atuacao",
        "4:35862": "sobre",
        "4:35946": "evidencias",
        "4:35965": "contato",
      }
      Object.entries(sectionIds).forEach(([node, id]) => {
        element.querySelector<HTMLElement>(`[data-node-id="${node}"]`)!.id = id
      })

      element
        .querySelectorAll<HTMLElement>(
          '[data-name^="section."]:not([data-node-id="4:35827"])',
        )
        .forEach((section) => {
          gsap.from(section.children, {
            y: 42,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          })
        })

      const serviceCards = element.querySelectorAll<HTMLElement>(
        '[data-node-id="4:35850"] [data-name="card-case"]',
      )
      serviceCards.forEach((card, index) => {
        gsap.from(card.querySelectorAll("img, svg, [data-name*=figure]"), {
          scale: 0.72,
          rotation: index % 2 ? 8 : -8,
          y: 36,
          stagger: 0.04,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      })

      const services = element.querySelector<HTMLElement>(
        '[data-node-id="4:35850"]',
      )
      const serviceVideos = Array.from(
        element.querySelectorAll<HTMLVideoElement>("[data-service-video]"),
      )
      if (services && serviceVideos.length) {
        serviceObserver = new IntersectionObserver(
          ([entry]) => {
            serviceVideos.forEach((video) => {
              if (entry.isIntersecting) {
                video.play().catch(() => undefined)
              } else {
                video.pause()
                video.currentTime = 0
              }
            })
          },
          { threshold: 0.42 },
        )
        serviceObserver.observe(services)
      }

      const evidenceSection = element.querySelector<HTMLElement>(
        '[data-node-id="4:35946"]',
      )
      const evidenceTrack = element.querySelector<HTMLElement>(
        '[data-node-id="4:35956"]',
      )
      if (evidenceSection && evidenceTrack) {
        carouselCleanups.push(
          createAutoCarousel(evidenceTrack, evidenceSection, 42),
        )
      }
    }, element)

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      serviceObserver?.disconnect()
      element
        .querySelectorAll<HTMLVideoElement>("[data-service-video]")
        .forEach((video) => video.pause())
      carouselCleanups.forEach((cleanup) => cleanup())
      context.revert()
    }
  }, [])

  return (
    <>
      <ExactStage ref={root} mode="home">
        <HomeExact />
      </ExactStage>
      <BottomNavigation mode="home" />
    </>
  )
}

function ExactCasePage({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useExactNavigation(root)

  useLayoutEffect(() => {
    const element = root.current
    if (!element) return
    window.scrollTo(0, 0)
    const hero = element.querySelector<HTMLElement>(
      '[data-name="header.intro"]',
    )
    const contextSection = element.querySelector<HTMLElement>(
      '[data-name="section.context"]',
    )
    const processSection = element.querySelector<HTMLElement>(
      '[data-name="section.process"]',
    )
    const resultSection = element.querySelector<HTMLElement>(
      '[data-name="section.results"]',
    )
    if (hero) hero.id = "case"
    if (contextSection) contextSection.id = "contexto"
    if (processSection) processSection.id = "processo"
    if (resultSection) resultSection.id = "resultados"

    const context = gsap.context(() => {
      element
        .querySelectorAll<HTMLElement>('[data-name^="section."]')
        .forEach((section) => {
          gsap.from(section.children, {
            y: 38,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          })
        })
      element.querySelectorAll<HTMLElement>("img").forEach((image) => {
        gsap.from(image, {
          autoAlpha: 0,
          duration: 0.65,
          scrollTrigger: {
            trigger: image,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, element)
    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => context.revert()
  }, [])

  return (
    <>
      <ExactStage ref={root} mode="case">
        {children}
        <SharedContactFooter />
      </ExactStage>
      <BottomNavigation mode="case" />
    </>
  )
}

const ExactStage = ({
  children,
  ref,
  mode,
}: {
  children: React.ReactNode
  ref: React.RefObject<HTMLDivElement | null>
  mode: "home" | "case"
}) => (
  <div ref={ref} className={`exact-viewport exact-viewport--${mode}`}>
    <div className="exact-canvas">{children}</div>
  </div>
)

function ScrollRestoration() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(location.hash.slice(1))
          ?.scrollIntoView({ behavior: "smooth" }),
      )
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollRestoration />
      <TopNavigation />
      <Suspense fallback={<div className="exact-loading" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/cases/navegacao-confusa"
            element={
              <ExactCasePage>
                <NavegacaoConfusa />
              </ExactCasePage>
            }
          />
          <Route
            path="/cases/cadastros-complexos"
            element={
              <ExactCasePage>
                <CadastrosComplexos />
              </ExactCasePage>
            }
          />
          <Route
            path="/cases/regra-incerta"
            element={
              <ExactCasePage>
                <RegraIncerta />
              </ExactCasePage>
            }
          />
          <Route
            path="/cases/qualificacao-complexa"
            element={
              <ExactCasePage>
                <QualificacaoComplexa />
              </ExactCasePage>
            }
          />
          <Route
            path="/cases/corrida-em-jogo"
            element={
              <ExactCasePage>
                <CorridaEmJogo />
              </ExactCasePage>
            }
          />
          <Route
            path="/cases/beneficios-dispersos"
            element={
              <ExactCasePage>
                <BeneficiosDispersos />
              </ExactCasePage>
            }
          />
          <Route
            path="/cases/cadastro-travado"
            element={
              <ExactCasePage>
                <CadastroTravado />
              </ExactCasePage>
            }
          />
          <Route
            path="/cases/uma-marca-por-cliente"
            element={
              <ExactCasePage>
                <UmaMarcaPorCliente />
              </ExactCasePage>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
