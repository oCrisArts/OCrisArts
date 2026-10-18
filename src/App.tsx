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
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"

import {
  LanguageProvider,
  useI18n,
  languages,
  localizedPath,
  basePath,
} from "./i18n"

import { caseSlugs, type CaseSlug } from "./data/cases"

import SiteContactFooter from "./components/SiteContactFooter"
import Navigation from "./components/Navigation"

import RouterTracking from "./analytics/RouterTracking"

import ConsentPreferences from "./analytics/Consent"

import RouteSeo from "./seo/RouteSeo"

import { track } from "./analytics/tracking"

import { observeExperience } from "./analytics/observe"

import gsap from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"

import { observeScaledArtifacts } from "./components/ScaledArtifact"

gsap.registerPlugin(ScrollTrigger)

const FrontPage = lazy(() => import("./pages/FrontPage"))
const CasesSingle = lazy(() => import("./pages/CasesSingle"))

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

function routeForText(text: string) {
  return caseRoutes.find(([title]) => text.includes(title))?.[1]
}

function reportCarouselInteraction() {
  track("case_carousel_interaction", { interaction_type: "drag" })
}

function createAutoCarousel(
  track: HTMLElement,

  viewport: HTMLElement,

  speed: number,
) {
  let position = 0

  let direction = -1

  let active = false

  let hovered = false

  let focused = false

  let pointerId: number | null = null

  let dragging = false

  let suppressClickUntil = 0

  let startX = 0

  let startY = 0

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

    if (
      active &&
      !hovered &&
      !focused &&
      pointerId === null &&
      time >= resumeAt &&
      max > 0
    ) {
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
    if (!event.isPrimary || event.button !== 0 || pointerId !== null) return

    pointerId = event.pointerId

    dragging = false

    suppressClickUntil = 0

    startX = event.clientX

    startY = event.clientY

    startPosition = position
  }

  const pointerMove = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return

    const distanceX = event.clientX - startX

    const distanceY = event.clientY - startY

    if (!dragging) {
      if (Math.max(Math.abs(distanceX), Math.abs(distanceY)) <= 6) return

      // Leave vertical touch gestures to the page's native pan-y scrolling.

      if (Math.abs(distanceY) >= Math.abs(distanceX)) {
        pointerUp(event)

        return
      }

      dragging = true

      track.setPointerCapture(event.pointerId)

      track.classList.add("is-dragging")

      if (track.querySelector("[data-case-slug]")) reportCarouselInteraction()
    }

    const scale =
      track.offsetWidth > 0
        ? track.getBoundingClientRect().width / track.offsetWidth
        : 1

    const delta = (event.clientX - startX) / Math.max(scale, 0.01)

    position = clamp(startPosition + delta)

    direction = delta > 0 ? 1 : -1

    render()
  }

  const pointerUp = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return

    // Touch starts with implicit capture on the child link/image. Transferring

    // that capture to the rail must not cancel the newly started drag.

    if (event.type === "lostpointercapture" && event.target !== track) return

    suppressClickUntil =
      dragging && event.type === "pointerup" ? performance.now() + 500 : 0

    pointerId = null

    dragging = false

    resumeAt = performance.now() + 1400

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }

    track.classList.remove("is-dragging")
  }

  const preventDraggedClick = (event: MouseEvent) => {
    // Keyboard activation (detail=0) and subsequent ordinary clicks stay native.

    if (event.detail === 0 || performance.now() > suppressClickUntil) return

    event.preventDefault()

    event.stopPropagation()

    suppressClickUntil = 0
  }

  const pauseOnHover = (event: PointerEvent) => {
    if (event.pointerType !== "touch") hovered = true
  }

  const resume = () => {
    resumeAt = performance.now() + 1400
  }

  const leaveHover = () => {
    hovered = false
    resume()
  }

  const focusIn = () => {
    focused = true
  }

  const focusOut = (event: FocusEvent) => {
    focused =
      event.relatedTarget instanceof Node &&
      viewport.contains(event.relatedTarget)

    resume()
  }

  // Native image/link dragging otherwise steals the pointer before our threshold.

  const preventNativeDrag = (event: DragEvent) => {
    event.preventDefault()
  }

  const keyboard = (event: KeyboardEvent) => {
    if (
      !viewport.hasAttribute("data-artifact-carousel") ||
      !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
    )
      return

    event.preventDefault()

    position =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? -bounds()
          : clamp(
              position +
                (event.key === "ArrowLeft" ? 1 : -1) *
                  viewport.clientWidth *
                  0.7,
            )

    direction = event.key === "ArrowLeft" || event.key === "Home" ? 1 : -1

    render()

    resume()
  }

  const cancelInteraction = () => {
    if (pointerId !== null)
      pointerUp(new PointerEvent("pointercancel", { pointerId }))

    hovered = false

    resume()
  }

  track.addEventListener("pointerdown", pointerDown)

  window.addEventListener("pointermove", pointerMove)

  window.addEventListener("pointerup", pointerUp)

  window.addEventListener("pointercancel", pointerUp)

  track.addEventListener("lostpointercapture", pointerUp)

  track.addEventListener("pointerenter", pauseOnHover)

  track.addEventListener("pointerleave", leaveHover)

  viewport.addEventListener("focusin", focusIn)

  viewport.addEventListener("focusout", focusOut)

  viewport.addEventListener("keydown", keyboard)

  track.addEventListener("dragstart", preventNativeDrag)

  track.addEventListener("wheel", resume, { passive: true })

  window.addEventListener("blur", cancelInteraction)

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

    cancelInteraction()

    window.removeEventListener("pointermove", pointerMove)

    window.removeEventListener("pointerup", pointerUp)

    window.removeEventListener("pointercancel", pointerUp)

    track.removeEventListener("lostpointercapture", pointerUp)

    track.removeEventListener("pointerenter", pauseOnHover)

    track.removeEventListener("pointerleave", leaveHover)

    viewport.removeEventListener("focusin", focusIn)

    viewport.removeEventListener("focusout", focusOut)

    viewport.removeEventListener("keydown", keyboard)

    track.removeEventListener("dragstart", preventNativeDrag)

    track.removeEventListener("wheel", resume)

    window.removeEventListener("blur", cancelInteraction)

    track.removeEventListener("click", preventDraggedClick, true)

    gsap.set(track, { clearProps: "x" })
  }
}

function useExactNavigation(root: React.RefObject<HTMLDivElement | null>) {
  const navigateRaw = useNavigate()

  const { path, text } = useI18n()

  const navigate = (to: string) => navigateRaw(path(to))

  useEffect(() => {
    const element = root.current

    if (!element) return

    const click = (event: MouseEvent) => {
      if (event.defaultPrevented) return

      const target = event.target as HTMLElement

      const card = target.closest<HTMLElement>(
        '[data-name="article.case-card"]',
      )

      if (card) {
        const slug =
          card.dataset.caseSlug || routeForText(card.textContent || "")

        if (slug && event.button === 0) {
          track("case_open", { case_slug: slug })

          if (
            !event.ctrlKey &&
            !event.metaKey &&
            !event.shiftKey &&
            !event.altKey
          ) {
            event.preventDefault()

            navigate(`/cases/${slug}`)
          }

          return
        }
      }

      const button = target.closest<HTMLElement>('[data-name="btn"]')

      if (!button) return

      const label = button.textContent || ""

      if (label.includes(text("Início"))) navigate(path("/"))
      else if (label.includes(text("Cases")) || label.includes(text("Case")))
        navigate("/#cases")
      else if (label.includes(text("Atuação"))) navigate("/#atuacao")
      else if (label.includes(text("Sobre"))) navigate("/#sobre")
      else if (label.includes(text("Evidências"))) navigate("/#evidencias")
      else if (label.includes(text("Contato"))) navigate(path("/#contato"))
    }

    element.addEventListener("click", click)

    return () => element.removeEventListener("click", click)
  }, [navigateRaw, root, path])
}

function SharedContactFooter() {
  return <SiteContactFooter />
}

function HomePage() {
  const root = useRef<HTMLDivElement>(null)

  const [featuredSlugs, setFeaturedSlugs] = useState<CaseSlug[]>([
    ...caseSlugs.slice(0, 2),
  ])

  useEffect(() => {
    const shuffled: CaseSlug[] = [...caseSlugs]

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    setFeaturedSlugs(shuffled.slice(0, 2))
  }, [])

  useExactNavigation(root)

  useEffect(
    () => (root.current ? observeExperience(root.current) : undefined),
    [],
  )

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

        sourceCards.forEach((source, index) => {
          const destination = destinationCards.find(
            (card) => card.dataset.caseSlug === source.dataset.caseSlug,
          )

          if (!destination) return

          const trajectory = () => {
            const origin = source.getBoundingClientRect()

            const target = destination.getBoundingClientRect()

            return {
              x:
                target.left -
                origin.left +
                Number(gsap.getProperty(source, "x")),

              y:
                target.top - origin.top + Number(gsap.getProperty(source, "y")),
            }
          }

          gsap.set(destination, { autoAlpha: 0 })

          gsap.fromTo(
            source,

            {
              y: 0,

              rotation: index ? 2 : -2,

              scale: 1,
            },

            {
              x: () => trajectory().x,

              y: () => trajectory().y,

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

          const caption = source.querySelector<HTMLElement>(
            "[data-name='card-caption']",
          )

          if (caption) {
            gsap.to(caption, {
              y: () => source.offsetHeight - caption.offsetHeight,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                endTrigger: casesSection,
                end: "top 58%",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            })
          }

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
        gsap.from(
          card.querySelectorAll("img, svg, [data-name*=figure]"),
          {
            scale: 0.72,

            rotation: index % 2 ? 8 : -8,

            y: 36,

            stagger: 0.04,

            scrollTrigger: {
              trigger: card,

              start: "top 80%",

              toggleActions: "play none none reverse",
            },
          },
        )
      })

      const services = element.querySelector<HTMLElement>(
        '[data-node-id="4:35850"]',
      )

      const serviceVideos = Array.from(
        element.querySelectorAll<HTMLVideoElement>("[data-service-video]"),
      )

      if (services && serviceVideos.length) {
        serviceObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const video =
                entry.target.querySelector<HTMLVideoElement>("video")

              if (!video) return

              if (entry.isIntersecting) {
                video.play().catch(() => undefined)
              } else {
                video.pause()

                video.currentTime = 0
              }
            })
          },

          { threshold: 0.15 },
        )

        serviceCards.forEach((card) => serviceObserver!.observe(card))
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
  }, [featuredSlugs])

  return (
    <>
      <ExactStage ref={root} mode="home">
        <FrontPage featuredSlugs={featuredSlugs} />
        <SharedContactFooter />
      </ExactStage>
    </>
  )
}

function ExactCasePage({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useExactNavigation(root)

  useEffect(
    () => (root.current ? observeExperience(root.current) : undefined),
    [],
  )

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

    const carouselCleanups: Array<() => void> = []
    const scaledArtifactsCleanup = observeScaledArtifacts(element)

    const context = gsap.context(() => {
      element
        .querySelectorAll<HTMLElement>("[data-artifact-carousel]")
        .forEach((viewport) => {
          const rail = viewport.querySelector<HTMLElement>(
            "[data-artifact-track]",
          )

          if (rail)
            carouselCleanups.push(createAutoCarousel(rail, viewport, 34))
        })

      element

        .querySelectorAll<HTMLElement>('[data-name^="section."]')

        .forEach((section) => {
          if (!section.children.length) return

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

      element.querySelectorAll<HTMLElement>("img, video").forEach((media) => {
        gsap.from(media, {
          autoAlpha: 0,

          duration: 0.65,

          scrollTrigger: {
            trigger: media,

            start: "top 92%",

            toggleActions: "play none none reverse",
          },
        })
      })
    }, element)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      scaledArtifactsCleanup()

      carouselCleanups.forEach((cleanup) => cleanup())

      context.revert()
    }
  }, [])

  return (
    <>
      <ExactStage ref={root} mode="case">
        {children}
        <SharedContactFooter />
      </ExactStage>
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
  <div
    ref={ref}
    role="main"
    className={`exact-viewport exact-viewport--${mode}`}
  >
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

function NotFound() {
  const { text, path } = useI18n()
  return (
    <main className="not-found">
      <h1>{text("Página não encontrada")}</h1>
      <a href={path("/")}>{text("Início")}</a>
    </main>
  )
}

export function AppContent() {
  const { pathname } = useLocation()

  return (
    <LanguageProvider>
      <ScrollRestoration />
      <RouteSeo />
      <RouterTracking />
      <Navigation />
      <Suspense fallback={<div className="exact-loading" />}>
        <Routes key={pathname}>
          {languages.map((language) => (
            <Route
              key={language}
              path={localizedPath("/", language)}
              element={<HomePage />}
            />
          ))}
          {languages.map((language) => (
            <Route
              key={`${language}-case`}
              path={localizedPath("/cases/:slug", language)}
              element={
                <ExactCasePage>
                  <CasesSingle />
                </ExactCasePage>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ConsentPreferences />
    </LanguageProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
