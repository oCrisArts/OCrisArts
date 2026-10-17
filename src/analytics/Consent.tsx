import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { readConsent, saveConsent } from './tracking'

export default function ConsentPreferences() {
 const {text}=useI18n()
 const [open,setOpen]=useState(false)
 const [analytics,setAnalytics]=useState(false)
 const [experience,setExperience]=useState(false)
 useEffect(()=>{const saved=readConsent(); setOpen(!saved);setAnalytics(saved?.analytics??false);setExperience(saved?.experience??false)},[])
 const save=(a:boolean,e:boolean)=>{saveConsent({analytics:a,experience:e});setOpen(false)}
 return <aside className="privacy-controls" data-hj-suppress data-clarity-mask="true">
  <button className="privacy-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="privacy-preferences">{text('Privacidade')}</button>
  {open && <section id="privacy-preferences" className="privacy-panel" aria-label={text('Preferências de privacidade')}>
   <strong>{text('Preferências de privacidade')}</strong>
   <p>{text('Usamos Google Analytics para medir navegação e Hotjar e Microsoft Clarity para entender o uso do site. São opcionais. Não enviamos o conteúdo dos campos. Você pode alterar sua escolha a qualquer momento.')}</p>
   <label><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/>{text('Métricas de navegação')}</label>
   <label><input type="checkbox" checked={experience} onChange={e=>setExperience(e.target.checked)}/>{text('Análise de experiência')}</label>
   <div><button onClick={()=>save(true,true)}>{text('Aceitar')}</button><button onClick={()=>save(false,false)}>{text('Recusar')}</button><button onClick={()=>save(analytics,experience)}>{text('Salvar preferências')}</button></div>
  </section>}
 </aside>
}
