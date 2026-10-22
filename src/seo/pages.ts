import { basePath, catalogs, languageFromPath, languages, localizedPath, translate, type Language } from '../i18n'
import { cases } from '../data/cases'

export const origin='https://ocris.art.br'
export const socialImage='/assets/ocrisart.jpg'
export { cases }
export const allPaths=languages.flatMap(language=>['/',...cases.map(c=>`/cases/${c.slug}`)].map(path=>localizedPath(path,language)))
export const isKnownPath=(path:string)=>allPaths.includes(path.replace(/\/$/,'')||'/')
const localizedCaseProjects:Record<string,Record<Language,string>>={
 'navegacao-confusa':{'pt-BR':'Plataforma corporativa',en:'Enterprise platform',es:'Plataforma empresarial'},
 'cadastros-complexos':{'pt-BR':'Plataforma de cadastros',en:'Registration platform',es:'Plataforma de registros'},
}
export function pageMetadata(path:string) {
 const language=languageFromPath(path), copy=catalogs[language], base=basePath(path)
 const item=cases.find(c=>base===`/cases/${c.slug}`)
 const project=item?(localizedCaseProjects[item.slug]?.[language]??item.project):''
 const title=item?`${copy[item.title]} ${project} | OCris Arts`:translate('homeTitle',language)
 const description=item?`${copy[item.subtitle]} ${copy[item.context]}`:copy.t0602
 const canonical=origin+localizedPath(base,language)
 const person={'@type':'Person','@id':origin+'/#person',name:'oCris Acosta',url:origin,jobTitle:'Product Designer',knowsAbout:['Product Design','UX/UI','UX Research','Design Systems','Design Engineering','Branding',copy.t0604],sameAs:['https://www.linkedin.com/in/ocrisarts','https://www.behance.net/ocrisart']}
 const schema={'@context':'https://schema.org','@graph':[
  person,{'@type':'WebSite','@id':origin+'/#website',name:'OCris Arts',url:origin,inLanguage:languages},
  item?{'@type':'CreativeWork',name:copy[item.title],description,url:canonical,inLanguage:language,author:{'@id':origin+'/#person'},image:origin+socialImage}:
  {'@type':'ProfilePage',name:title,url:canonical,inLanguage:language,mainEntity:{'@id':origin+'/#person'}},
  ...(!item?[{'@type':'ItemList',itemListElement:cases.map((c,i)=>({'@type':'ListItem',position:i+1,name:copy[c.title],url:origin+localizedPath(`/cases/${c.slug}`,language)}))}]:[])
 ]}
 return {language,title,description,canonical,schema,alternates:[...languages.map(lang=>({lang,url:origin+localizedPath(base,lang)})),{lang:'x-default',url:origin+base}]}
}
export const indexable=import.meta.env.VITE_PUBLIC_INDEXABLE==='true'
export const localeCodes:Record<Language,string>={'pt-BR':'pt_BR',en:'en_US',es:'es_ES'}
export function headMarkup(path:string,allowIndex=indexable) {
 const data=pageMetadata(path)
 const escape=(value:string)=>value.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
 const meta=(name:string,content:string,property=false)=>`<meta ${property?'property':'name'}="${name}" content="${escape(content)}" data-seo="true">`
 return `<title>${escape(data.title)}</title>`+
 meta('description',data.description)+meta('robots',allowIndex?'index, follow':'noindex, nofollow')+
 `<link rel="canonical" href="${data.canonical}" data-seo="true">`+
 data.alternates.map(a=>`<link rel="alternate" hreflang="${a.lang}" href="${a.url}" data-seo="true">`).join('')+
 meta('og:title',data.title,true)+meta('og:description',data.description,true)+meta('og:url',data.canonical,true)+meta('og:type','website',true)+meta('og:site_name','OCris Arts',true)+meta('og:locale',localeCodes[data.language],true)+
 meta('og:image',origin+socialImage,true)+meta('og:image:width','1200',true)+meta('og:image:height','630',true)+meta('og:image:type','image/jpeg',true)+meta('og:image:alt','oCris Acosta · OCris Arts',true)+meta('twitter:card','summary_large_image')+meta('twitter:title',data.title)+meta('twitter:description',data.description)+meta('twitter:image',origin+socialImage)+
 `<script type="application/ld+json" data-seo="true">${JSON.stringify(data.schema).replace(/</g,'\\u003c')}</script>`
}
