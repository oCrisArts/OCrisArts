import { createContext, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import pt from './pt-BR.json'
import en from './en.json'
import es from './es.json'
import ui from './ui.json'

export type Language = 'pt-BR' | 'en' | 'es'
export const languages: Language[] = ['pt-BR', 'en', 'es']
export const catalogs: Record<Language, Record<string, string>> = { 'pt-BR': pt, en, es }
export const languageFromPath = (path: string): Language => /^\/en(?:\/|$)/.test(path) ? 'en' : /^\/es(?:\/|$)/.test(path) ? 'es' : 'pt-BR'
export const basePath = (path: string) => path.replace(/^\/(en|es)(?=\/|$)/, '') || '/'
export function localizedPath(path: string, language: Language) {
 const [pathname, hash] = path.split('#')
 const clean = basePath(pathname).replace(/\/$/, '') || '/'
 return (language === 'pt-BR' ? '' : `/${language}`) + (clean === '/' && language !== 'pt-BR' ? '' : clean) + (hash ? `#${hash}` : '')
}
const Context = createContext<Language>('pt-BR')
export function LanguageProvider({ children }: { children: React.ReactNode }) {
 const { pathname } = useLocation()
 return <Context.Provider value={languageFromPath(pathname)}>{children}</Context.Provider>
}
const sourceKeys = new Map(Object.entries(pt).map(([key, value]) => [value, key]))
export function translate(text: string, language: Language) {
 const key = sourceKeys.get(text.trim())
 if (key) return catalogs[language][key]
 return (ui as Record<string, Record<Language, string>>)[text]?.[language] ?? text
}
export function useI18n() {
 const language = useContext(Context)
 return { language, t: (key: string) => catalogs[language][key] ?? key,
  text: (value: string) => translate(value, language),
  path: (value: string) => localizedPath(value, language) }
}
