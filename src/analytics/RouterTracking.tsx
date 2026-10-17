import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { routeChanged, track } from './tracking'
import { onCLS, onINP, onLCP } from 'web-vitals'
import { isKnownPath } from '../seo/pages'

let vitalsStarted=false
export default function RouterTracking() {
 const {pathname}=useLocation()
 useEffect(()=>{
  if(!isKnownPath(pathname)) return
  routeChanged(pathname)
  if(!vitalsStarted) {
   vitalsStarted=true
   // Web Vitals measure the document lifecycle, not every client-side route.
   const landingPath=pathname
   const report=({name,value,rating}:{name:string;value:number;rating:string})=>track('web_vital',{metric_name:name,metric_value:Math.round(value*1000)/1000,metric_rating:rating},landingPath)
   onCLS(report);onINP(report);onLCP(report)
  }
 },[pathname])
 useEffect(()=>{
  const click=(event:MouseEvent)=>{
   if(!event.isTrusted || event.defaultPrevented) return
   const link=(event.target as Element).closest<HTMLAnchorElement>('a[href]')
   if(!link) return
   const url=new URL(link.href,location.origin)
   if(['mailto:','tel:'].includes(url.protocol)||url.hostname==='wa.me') track('contact_click',{channel:url.hostname==='wa.me'?'whatsapp':url.protocol==='mailto:'?'email':'phone'})
   else if(url.origin!==location.origin && /^https?:$/.test(url.protocol)) track('outbound_click',{destination_host:url.hostname})
   if(link.hasAttribute('download') && /\.(pdf|docx?)$/i.test(url.pathname) && link.dataset.resume==='true') track('resume_download')
  }
  document.addEventListener('click',click)
  return ()=>document.removeEventListener('click',click)
 },[])
 return null
}
