import { useEffect, useMemo, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { track } from "../analytics/tracking"
import { cases } from "../data/cases"
import { basePath, languages, localizedPath, useI18n } from "../i18n"
import CaseCard from "./CaseCard"

export type NavigationMode = "home" | "cases" | "case" | "about" | "services" | "service"

type NavigationItem = readonly [id: string, icon: string, label: string]

const contextualItems: Record<NavigationMode, readonly NavigationItem[]> = {
  home: [
    ["inicio", "home", "Início"],
    ["cases", "cases", "Cases"],
    ["atuacao", "design_services", "Atuação"],
    ["sobre", "badge", "Sobre"],
    ["evidencias", "analytics", "Evidências"],
    ["contato", "send", "Contato"],
  ],
  case: [
    ["home", "arrow_back", "Início"],
    ["case", "cases", "Cases"],
    ["contexto", "travel_explore", "Contexto"],
    ["processo", "account_tree", "Processo"],
    ["resultados", "monitoring", "Resultados"],
    ["contato", "send", "Contato"],
  ],
  cases: [],
  about: [],
  services: [],
  service: [],
}

function modeFromPath(pathname: string): NavigationMode {
  const route = basePath(pathname)
  if (route === "/") return "home"
  if (/^\/cases\/[^/]+$/.test(route)) return "case"
  if (route === "/cases") return "cases"
  if (route === "/about") return "about"
  if (/^\/services\/[^/]+$/.test(route)) return "service"
  return "services"
}

function TopNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { language, path, text } = useI18n()
  const [languageOpen, setLanguageOpen] = useState(false)
  const languageArea = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!languageOpen) return
    const close = (event: PointerEvent) => {
      if (!languageArea.current?.contains(event.target as Node))
        setLanguageOpen(false)
    }
    document.addEventListener("pointerdown", close)
    return () => document.removeEventListener("pointerdown", close)
  }, [languageOpen])

  return (
    <header className="top-navigation">
      <button
        className="top-navigation__brand"
        onClick={() => navigate(path("/"))}
        aria-label={text("Ir para a página inicial")}
      >
        <img src="/assets/shared/branding/site-brand-mark-compact.svg" alt="" />
      </button>
      <nav
        className="top-navigation__social"
        aria-label={text("Redes e contatos")}
      >
        <a
          href="https://www.behance.net/ocrisart"
          target="_blank"
          rel="noreferrer"
          aria-label="Behance ocrisart"
        >
          <span aria-hidden="true"></span>
          <small>ocrisart</small>
        </a>
        <a
          href="mailto:cristiano-acosta@hotmail.com"
          aria-label={text("Abrir aplicativo de e-mail")}
        >
          <span className="top-navigation__material-icon" aria-hidden="true">
            mail
          </span>
          <small>falecom@</small>
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
          <small>{text("@ocrisart")}</small>
        </a>
      </nav>
      <div className="top-navigation__language-area" ref={languageArea}>
        <button
          className="top-navigation__language"
          aria-label={text("Idioma")}
          aria-expanded={languageOpen}
          aria-controls="language-menu"
          onClick={() => setLanguageOpen((open) => !open)}
          onKeyDown={(event) =>
            event.key === "Escape" && setLanguageOpen(false)
          }
        >
          <span className="bottom-navigation__icon" aria-hidden="true">
            translate
          </span>
          <small>{language === "pt-BR" ? "PT" : language.toUpperCase()}</small>
          <span className="bottom-navigation__icon" aria-hidden="true">
            arrow_drop_down
          </span>
        </button>
        {languageOpen && (
          <div className="language-menu" id="language-menu">
            {languages.map((next) => (
              <button
                key={next}
                lang={next}
                aria-current={next === language ? "true" : undefined}
                onClick={() => {
                  if (next !== language) {
                    track("language_change", {
                      from_language: language,
                      to_language: next,
                    })
                    navigate(
                      localizedPath(basePath(location.pathname), next) +
                        location.hash,
                    )
                  }
                  setLanguageOpen(false)
                }}
              >
                {next === "pt-BR" ? "PT" : next.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

function ContextualNavigation({ mode }: { mode: NavigationMode }) {
  const navigate = useNavigate()
  const { path, text } = useI18n()
  const items = contextualItems[mode]
  const [active, setActive] = useState(mode === "home" ? "inicio" : "case")
  const [visible, setVisible] = useState(false)
  const [casesOpen, setCasesOpen] = useState(false)
  const popover = useRef<HTMLDivElement>(null)
  const casesButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const update = () =>
      setVisible(window.scrollY > Math.min(180, window.innerHeight * 0.18))
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  useEffect(() => {
    const sectionIds =
      mode === "home"
        ? ["inicio", "cases", "atuacao", "sobre", "evidencias", "contato"]
        : ["case", "contexto", "processo", "resultados", "contato"]
    const observer = new IntersectionObserver(
      (entries) => {
        const nearest = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - innerHeight * 0.45) -
              Math.abs(b.boundingClientRect.top - innerHeight * 0.45),
          )[0]
        if (nearest?.target.id) setActive(nearest.target.id)
      },
      { rootMargin: "-34% 0px -54% 0px", threshold: 0 },
    )
    const frame = requestAnimationFrame(() =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section))
        .forEach((section) => observer.observe(section)),
    )
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [mode])

  useEffect(() => {
    if (!casesOpen) return
    popover.current?.querySelector<HTMLAnchorElement>("a")?.focus()
    const close = (event: PointerEvent) => {
      if (
        !popover.current?.contains(event.target as Node) &&
        !casesButton.current?.contains(event.target as Node)
      )
        setCasesOpen(false)
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCasesOpen(false)
        casesButton.current?.focus()
      }
    }
    document.addEventListener("pointerdown", close)
    document.addEventListener("keydown", escape)
    return () => {
      document.removeEventListener("pointerdown", close)
      document.removeEventListener("keydown", escape)
    }
  }, [casesOpen])

  const activate = (id: string) => {
    if (mode === "case" && id === "home") return navigate(path("/"))
    if (mode === "case" && id === "case") return setCasesOpen((open) => !open)
    const target = document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: "smooth" })
    else if (id === "contato") navigate(path("/#contato"))
  }

  if (!items.length) return null

  return (
    <div
      className={`contextual-navigation${casesOpen ? " has-open-popover" : ""}`}
    >
      {mode === "case" && casesOpen && (
        <div
          className="case-popover"
          id="case-popover"
          ref={popover}
          role="dialog"
          aria-label={text("Cases")}
        >
          {cases.map(({ slug }) => (
            <CaseCard
              key={slug}
              slug={slug}
              variant="compact"
              onNavigate={() => setCasesOpen(false)}
            />
          ))}
        </div>
      )}
      <nav
        className={`bottom-navigation bottom-navigation--${mode}${
          visible || casesOpen ? " is-visible" : ""
        }`}
        aria-label={text(
          mode === "home" ? "Navegação da página inicial" : "Navegação do case",
        )}
      >
        <button
          className="bottom-navigation__brand"
          onClick={() => activate(mode === "home" ? "inicio" : "home")}
          aria-label={text("Ir para o início")}
        >
          <img
            src="/assets/shared/branding/site-brand-mark-compact.svg"
            alt=""
          />
        </button>
        {items.map(([id, icon, label]) => (
          <button
            key={id}
            ref={mode === "case" && id === "case" ? casesButton : undefined}
            className={active === id ? "is-active" : ""}
            aria-current={active === id ? "location" : undefined}
            aria-expanded={
              mode === "case" && id === "case" ? casesOpen : undefined
            }
            aria-controls={
              mode === "case" && id === "case" ? "case-popover" : undefined
            }
            onClick={() => activate(id)}
          >
            <span className="bottom-navigation__icon" aria-hidden="true">
              {icon}
            </span>
            <span>{text(label)}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default function Navigation() {
  const { pathname } = useLocation()
  const mode = useMemo(() => modeFromPath(pathname), [pathname])
  return (
    <>
      <TopNavigation />
      <ContextualNavigation mode={mode} />
    </>
  )
}
