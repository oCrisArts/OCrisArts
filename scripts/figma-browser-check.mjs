import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server=process.env.TEST_URL?null:await createServer({server:{host:'127.0.0.1',port:8558,strictPort:true}});
await server?.listen();
const base=process.env.TEST_URL || 'http://127.0.0.1:8558';
const slugs=['navegacao-confusa','cadastros-complexos','regra-incerta','qualificacao-complexa','corrida-em-jogo','beneficios-dispersos','cadastro-travado','uma-marca-por-cliente'];
const browser=await chromium.launch({channel:'msedge',headless:true});
await fs.mkdir('.cache/figma-validation',{recursive:true});
const report=[];const errors=[];
try {
 for(const width of [390,768,1920]) {
  const context=await browser.newContext({viewport:{width,height:width===1920?1080:900}});
  await context.route(/googletagmanager\.com|static\.hotjar\.com|clarity\.ms/,r=>r.fulfill({body:''}));
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  for(const slug of ['',...slugs]) {
   await page.goto(base+(slug?'/cases/'+slug:'/'));await page.locator('h1').waitFor();await page.waitForTimeout(500);
   const decline=page.getByRole('button',{name:'Recusar',exact:true});if(await decline.count())await decline.click();
   const name=slug||'home';
   const metrics=await page.evaluate(async()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,zoom:getComputedStyle(document.querySelector('.exact-canvas')).zoom,broken:(await Promise.all([...document.images].map(async i=>{try{await i.decode();return null}catch{return i.src}}))).filter(Boolean)}));
   await page.screenshot({path:`.cache/figma-validation/${name}-${width}.png`});
   if(slug){await page.locator('[data-name="section.context"]').scrollIntoViewIfNeeded();await page.waitForTimeout(1100);await page.screenshot({path:`.cache/figma-validation/${name}-${width}-context.png`});}
   else {assert.equal(await page.locator('[data-node-id="4:35828"] a').count(),2);assert.equal(await page.locator('[data-node-id="4:35836"] a').count(),8);}
   const rails=await page.locator('[data-artifact-carousel]').count();
   if(rails){const rail=page.locator('[data-artifact-carousel]').first();await rail.scrollIntoViewIfNeeded();await page.waitForTimeout(1200);await page.screenshot({path:`.cache/figma-validation/${name}-${width}-rail.png`});}
   report.push({name,width,...metrics,rails});console.log(JSON.stringify(report.at(-1)));
  }
  await context.close();
 }
 await fs.writeFile('.cache/figma-validation/report.json',JSON.stringify({report,errors},null,2));
 assert.equal(errors.length,0,JSON.stringify(errors));
 assert.ok(report.every(r=>r.scrollWidth===r.width),'No page-wide overflow');
 assert.ok(report.every(r=>r.zoom==='1'),'No global zoom');
 assert.ok(report.every(r=>r.broken.length===0),'No broken media');
} finally {await browser.close();await server?.close()}
