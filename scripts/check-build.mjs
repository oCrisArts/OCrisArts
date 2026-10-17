import fs from 'node:fs';
import assert from 'node:assert/strict';
const languages=['pt-BR','en','es'];
const slugs=['navegacao-confusa','cadastros-complexos','regra-incerta','qualificacao-complexa','corrida-em-jogo','beneficios-dispersos','cadastro-travado','uma-marca-por-cliente'];
const allowed=process.argv.includes('--indexable');
const titles=new Set();let count=0;
for(const lang of languages)for(const base of ['/',...slugs.map(s=>'/cases/'+s)]) {
 const route=lang==='pt-BR'?base:'/'+lang+(base==='/'?'':base);
 const file=route==='/'?'dist/index.html':`dist${route}.html`;
 const html=fs.readFileSync(file,'utf8');
 assert.ok(html.includes(`<html lang="${lang}"`));
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 assert.equal((html.match(/<title>/g)||[]).length,1);
 const title=html.match(/<title>(.*?)<\/title>/)[1];
 assert.ok(!titles.has(title),'Unique page titles');titles.add(title);
 assert.ok(html.includes(`rel="canonical" href="https://ocris.art.br${route}"`));
 assert.equal((html.match(/hreflang=/g)||[]).length,4);
 assert.ok(html.includes(`name="robots" content="${allowed?'index, follow':'noindex, nofollow'}"`));
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json" data-seo="true">(.*?)<\/script>/)[1]);
 assert.ok(schema['@graph'].some(s=>s['@type']==='Person'));
 assert.ok(!/<script[^>]+src="https:\/\/(www.googletagmanager.com|static.hotjar.com|www.clarity.ms)/.test(html));
 assert.ok(html.length>50000,'Real initial HTML content');count++;
}
assert.equal((fs.readFileSync('dist/sitemap.xml','utf8').match(/<url>/g)||[]).length,27);
assert.ok(fs.readFileSync('dist/robots.txt','utf8').includes(allowed?'Allow: /':'Disallow: /'));
console.log(`${count} static pages: content, headings, metadata, schema, hreflang, sitemap and ${allowed?'production indexing':'preview noindex'} verified.`);
