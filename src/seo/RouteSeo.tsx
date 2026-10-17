import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { headMarkup, indexable, isKnownPath, pageMetadata } from './pages'
export default function RouteSeo() {
 const {pathname}=useLocation()
 useEffect(()=>{
  if(!isKnownPath(pathname)) {
   document.head.querySelectorAll('[data-seo]').forEach(el=>el.remove())
   document.title='404 | OCris Arts'
   const robots=document.querySelector('meta[name="robots"]')||document.head.appendChild(document.createElement('meta'))
   robots.setAttribute('name','robots');robots.setAttribute('content','noindex, nofollow')
   return
  }
  document.documentElement.lang=pageMetadata(pathname).language
  document.head.querySelectorAll('[data-seo],title,meta[name="description"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"]').forEach(el=>el.remove())
  const template=document.createElement('template')
  template.innerHTML=headMarkup(pathname,indexable && location.hostname==='ocris.art.br')
  document.head.append(template.content)
 },[pathname])
 return null
}
