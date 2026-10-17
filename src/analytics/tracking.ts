import { basePath, languageFromPath } from '../i18n'

type Command = (...args: unknown[]) => void
declare global {
 interface Window {
  dataLayer: unknown[]; gtag: Command; hj: Command & {q?: unknown[]}; clarity: Command & {q?: unknown[]};
  _hjSettings: {hjid: number; hjsv: number};
  __trackingDebug?: Array<{event: string; parameters: Record<string, string | number | boolean>}>;
 }
}
export const CONSENT_KEY = 'ocris-consent-v1'
export type Consent = {analytics: boolean; experience: boolean; updatedAt: number; version: 1}
let consent: Consent | null = null
let initialized = false
let currentPath = ''
let viewedPath = ''
let experiencePath = ''
let analyticsStarted = false
let experienceStarted = false
const denied = {analytics_storage:'denied', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'}

export function readConsent(): Consent | null {
 try {
  const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null')
  if (value?.version === 1 && typeof value.analytics === 'boolean' && typeof value.experience === 'boolean' && Date.now()-value.updatedAt < 180*86400000) return value
 } catch { /* Storage may be unavailable. Default to no consent. */ }
 return null
}
function script(id: string, src: string) {
 if(document.getElementById(id)) return
 const el=document.createElement('script'); el.id=id; el.async=true; el.src=src; document.head.append(el)
}
function startServices() {
 if(!currentPath) return
 if(consent?.analytics && !analyticsStarted) {
  analyticsStarted=true
  window.gtag('js', new Date())
  window.gtag('config','G-BF47FWR761',{send_page_view:false, allow_google_signals:false, allow_ad_personalization_signals:false, page_location:location.origin+currentPath, page_referrer:''})
  script('ocris-ga4','https://www.googletagmanager.com/gtag/js?id=G-BF47FWR761')
 }
 // Do not expose arbitrary query strings or hashes to session recording services.
 if(consent?.experience && !experienceStarted && !location.search && !location.hash) {
  experienceStarted=true
  window.hj=window.hj || Object.assign(function(...args: unknown[]){window.hj.q!.push(args)}, {q:[]})
  window._hjSettings={hjid:6498699,hjsv:6}
  window.clarity=window.clarity || Object.assign(function(...args: unknown[]){window.clarity.q!.push(args)}, {q:[]})
  window.clarity('consentv2',{analytics_Storage:'granted',ad_Storage:'denied'})
  script('ocris-hotjar','https://static.hotjar.com/c/hotjar-6498699.js?sv=6')
  script('ocris-clarity','https://www.clarity.ms/tag/h1vap5dpoc')
 }
}
export function initializeTracking() {
 if(initialized) return
 initialized=true
 window.dataLayer=window.dataLayer || []
 window.gtag=window.gtag || function(){window.dataLayer.push(arguments)}
 window.gtag('consent','default',denied)
 consent=readConsent()
 if(consent) window.gtag('consent','update',{...denied,analytics_storage:consent.analytics?'granted':'denied'})
 window.addEventListener('storage',event=>{if(event.key===CONSENT_KEY) location.reload()})
}
export function saveConsent(next: Pick<Consent,'analytics'|'experience'>) {
 initializeTracking()
 const revoke = (consent?.analytics && !next.analytics) || (consent?.experience && !next.experience)
 consent={...next,updatedAt:Date.now(),version:1}
 try {localStorage.setItem(CONSENT_KEY,JSON.stringify(consent))} catch { /* In-memory choice remains valid. */ }
 window.gtag('consent','update',{...denied,analytics_storage:next.analytics?'granted':'denied'})
 if(revoke) {
  window.clarity?.('consentv2',{analytics_Storage:'denied',ad_Storage:'denied'})
  // Reload removes recorder listeners and pending SDK work; removing script elements alone cannot do that.
  for(const cookie of document.cookie.split(';')) {
   const name=cookie.split('=')[0].trim()
   if(!/^(_ga|_gid|_hj|_clck|_clsk)/.test(name)) continue
   const domains=['', location.hostname, '.'+location.hostname, '.ocris.art.br']
   for(const domain of domains) document.cookie=`${name}=; Max-Age=0; path=/;${domain?` domain=${domain};`:''} SameSite=Lax`
  }
  location.reload(); return
 }
 startServices(); reportPage()
 window.dispatchEvent(new Event('ocris:consent'))
}
const allowed = new Set(['case_slug','section_id','service_name','percent','channel','destination_host','from_language','to_language','video_id','playback','metric_name','metric_value','metric_rating','form_id','interaction_type'])
export function track(event: string, details: Record<string,string|number|boolean> = {}, pagePath=currentPath) {
 if(!consent?.analytics && !consent?.experience) return
 const slug=basePath(pagePath).split('/cases/')[1]
 const parameters: Record<string,string|number|boolean>={page_path:pagePath,language:languageFromPath(pagePath)}
 if(slug) parameters.case_slug=slug
 for(const [key,value] of Object.entries(details)) if(allowed.has(key)) parameters[key]=value
 if(import.meta.env.DEV || import.meta.env.VITE_ANALYTICS_DEBUG==='true') {
  (window.__trackingDebug ||= []).push({event,parameters})
  if(window.__trackingDebug.length>200) window.__trackingDebug.shift()
 }
 if(consent?.analytics) window.gtag('event',event,{...parameters,page_location:location.origin+pagePath,page_referrer:'',...(import.meta.env.VITE_ANALYTICS_DEBUG==='true'?{debug_mode:true}:{})})
 if(consent?.experience && experienceStarted && event!=='page_view') {
  window.hj?.('event',event); window.clarity?.('event',event)
 }
}
function reportPage() {
 if(!currentPath) return
 if(consent?.analytics && viewedPath!==currentPath) {
  viewedPath=currentPath; track('page_view')
 }
 if(consent?.experience && experienceStarted && experiencePath!==currentPath) {
  experiencePath=currentPath
  // Hotjar/Clarity detect URL changes themselves. Do not also send artificial pageviews.
  window.clarity?.('set','language',languageFromPath(currentPath))
 }
}
export function routeChanged(path: string) {
 initializeTracking()
 currentPath=path.replace(/\/$/,'') || '/'
 startServices(); reportPage()
}
export const hasConsent = () => Boolean(consent?.analytics || consent?.experience)
// Call only from a real, successful backend acknowledgement, never on a WhatsApp click.
export function confirmContactSuccess() {track('form_success',{form_id:'contact'})}
