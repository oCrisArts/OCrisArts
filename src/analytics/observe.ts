import { hasConsent, track } from './tracking'

/** Observation never changes GSAP transforms, timing or scroll positions. */
export function observeExperience(root: HTMLElement) {
 const sent=new Set<string>(), timers=new Map<Element,ReturnType<typeof setTimeout>>()
 const once=(key:string,event:string,params:Record<string,string|number|boolean>={})=>{
  if(!hasConsent() || sent.has(key)) return
  sent.add(key);track(event,params)
 }
 const visible=new Set<Element>()
 const enter=(target:Element)=>{
  const card=target.getAttribute('data-case-slug')
  const section=target.getAttribute('data-section-id')
  const key=card?`card:${card}`:`section:${section}`
  if(sent.has(key)||timers.has(target)||!hasConsent()||document.hidden) return
  timers.set(target,setTimeout(()=>{
   timers.delete(target)
   if(!visible.has(target)||document.hidden) return
   const style=getComputedStyle(target)
   if(style.visibility==='hidden'||Number(style.opacity)===0) {enter(target);return}
   if(card) once(key,'case_impression',{case_slug:card})
   else if(section) once(key,'case_section_view',{section_id:section})
  },1000))
 }
 const observer=new IntersectionObserver(entries=>{
  for(const entry of entries) {
   // A section may be taller than the viewport; use visible pixels, not a fixed percentage of its full height.
   const enough=entry.isIntersecting && entry.intersectionRect.height>=Math.min(entry.boundingClientRect.height*0.5,innerHeight*0.35)
   if(enough) {visible.add(entry.target);enter(entry.target)}
   else {visible.delete(entry.target);clearTimeout(timers.get(entry.target));timers.delete(entry.target)}
  }
 },{threshold:[0,0.1,0.25,0.5,0.75,1]})
 root.querySelectorAll('[data-case-slug],[data-section-id]').forEach(el=>observer.observe(el))
 let frame=0
 const depth=()=>{
  frame=0
  const available=document.documentElement.scrollHeight-innerHeight
  if(available<=0 || scrollY<=0) return
  const value=scrollY/available*100
  for(const percent of [25,50,75,90]) if(value>=percent) once(`depth:${percent}`,'scroll_depth',{percent})
 }
 const scroll=()=>{if(!frame)frame=requestAnimationFrame(depth)}
 const visibility=()=>{
  if(document.hidden) {timers.forEach(clearTimeout);timers.clear()}
  else visible.forEach(enter)
 }
 const granted=()=>{visible.forEach(enter)}
 const click=(event:MouseEvent)=>{
  const target=event.target as HTMLElement
  const service=target.closest<HTMLElement>('[data-service-name]')
  if(service) track('service_click',{service_name:service.dataset.serviceName!})
 }
 const input=(event:Event)=>{
  if(!event.isTrusted) return
  if((event.target as HTMLElement).closest('form[data-contact-form]')) once('form:start','form_start',{form_id:'contact'})
 }
 const submit=(event:SubmitEvent)=>{
  if(event.isTrusted && (event.target as HTMLElement).matches('form[data-contact-form]')) track('form_submit',{form_id:'contact'})
 }
 const videoCleanups:Array<()=>void>=[]
 root.querySelectorAll<HTMLVideoElement>('video').forEach((video,index)=>{
  const id=video.querySelector('source')?.getAttribute('src')?.split('/').pop() || `video-${index}`
  let previous=0, watched=0
  const play=()=>once(`video:play:${id}`,'video_play',{video_id:id,playback:video.autoplay||video.muted?'background':'user'})
  const complete=()=>once(`video:complete:${id}`,'video_complete',{video_id:id})
  const time=()=>{
   if(video.paused||document.hidden||!hasConsent()) {previous=video.currentTime;return}
   play()
   const delta=video.currentTime-previous
   if(delta>0 && delta<1.5) watched+=delta
   // Looping media does not fire ended. Require a real first pass through at least 90% of the video.
   if(Number.isFinite(video.duration) && watched>=video.duration*0.9 && (video.currentTime>=video.duration-0.5 || delta<0)) complete()
   previous=video.currentTime
  }
  video.addEventListener('playing',play);video.addEventListener('timeupdate',time);video.addEventListener('ended',complete)
  videoCleanups.push(()=>{video.removeEventListener('playing',play);video.removeEventListener('timeupdate',time);video.removeEventListener('ended',complete)})
 })
 root.addEventListener('click',click);root.addEventListener('input',input);root.addEventListener('submit',submit)
 window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('ocris:consent',granted);document.addEventListener('visibilitychange',visibility)
 return ()=>{observer.disconnect();timers.forEach(clearTimeout);cancelAnimationFrame(frame);videoCleanups.forEach(fn=>fn());root.removeEventListener('click',click);root.removeEventListener('input',input);root.removeEventListener('submit',submit);window.removeEventListener('scroll',scroll);window.removeEventListener('ocris:consent',granted);document.removeEventListener('visibilitychange',visibility)}
}
