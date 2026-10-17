import fs from 'node:fs';
const pt=JSON.parse(fs.readFileSync('src/i18n/pt-BR.json','utf8'));
const en={...pt}, es={...pt};
const translated=new Set();
for(const line of fs.readFileSync('src/i18n/translations.tsv','utf8').trim().split('\n')) {
 const [number,english,spanish]=line.split('|');
 const key='t'+number.padStart(4,'0');
 if(!pt[key] || !english || !spanish || translated.has(key)) throw Error('Invalid translation '+key);
 translated.add(key); en[key]=english; es[key]=spanish;
}
for(const [lang,copy] of Object.entries({en,es})) fs.writeFileSync(`src/i18n/${lang}.json`,JSON.stringify(copy,null,2)+'\n');
// Untranslated entries are shared brand names, technical terms, identifiers and evidence values.
fs.writeFileSync('src/i18n/shared-terms.json',JSON.stringify(Object.fromEntries(Object.entries(pt).filter(([k])=>!translated.has(k))),null,2)+'\n');
console.log(`${translated.size} translations per language; ${Object.keys(pt).length-translated.size} shared terms`);
