import fs from 'node:fs';
import ts from 'typescript';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const gitArgs=['-c',`safe.directory=${process.cwd().replaceAll('\\','/')}`];
const originals=execFileSync('git',[...gitArgs,'ls-tree','--name-only','HEAD:src/figma'],{encoding:'utf8'}).trim().split('\n').filter(f=>f.endsWith('.tsx'));
function referencedMedia(source) {
 const constants=new Map([...source.matchAll(/const (\w+) = [`"](?:\$\{assetPathPrefix\}|\/assets)(\/[^`"]+)[`"]/g)].map(m=>[m[1],'/assets'+m[2]]));
 const ast=ts.createSourceFile('source.tsx',source,99,true,4),media=[];
 function walk(n) {
  if(ts.isJsxAttribute(n)&&['src','poster'].includes(n.name.text)) {
   const init=n.initializer;
   if(init&&ts.isStringLiteral(init))media.push(init.text);
   else if(init&&ts.isJsxExpression(init)&&init.expression&&ts.isIdentifier(init.expression)&&constants.has(init.expression.text))media.push(constants.get(init.expression.text));
  }
  ts.forEachChild(n,walk);
 }walk(ast);return media;
}
const currentFiles=fs.readdirSync('src/figma').filter(f=>f.endsWith('.tsx'));
const currentMedia=new Set(currentFiles.flatMap(f=>referencedMedia(fs.readFileSync('src/figma/'+f,'utf8'))));
for(const file of originals) {
 const original=execFileSync('git',[...gitArgs,'show',`HEAD:src/figma/${file}`],{encoding:'utf8',maxBuffer:10*1024*1024});
 for(const asset of referencedMedia(original))assert.ok(currentMedia.has(asset),`Original evidence retained: ${file} ${asset}`);
}
const pt=JSON.parse(fs.readFileSync('src/i18n/pt-BR.json','utf8'));
for(const locale of ['en','es']) {
 const copy=JSON.parse(fs.readFileSync(`src/i18n/${locale}.json`,'utf8'));
 assert.deepEqual(Object.keys(copy),Object.keys(pt));assert.ok(Object.values(copy).every(v=>typeof v==='string'&&v.length));
}
const ui=JSON.parse(fs.readFileSync('src/i18n/ui.json','utf8'));
for(const values of Object.values(ui))for(const locale of ['pt-BR','en','es'])assert.ok(values[locale]?.length,'Translated UI labels');
for(const file of currentFiles) {
 const source=fs.readFileSync('src/figma/'+file,'utf8');
 for(const match of source.matchAll(/"label":"([^"]+)"/g))assert.ok(Object.values(pt).includes(match[1])||ui[match[1]],`Translated taxonomy: ${match[1]}`);
}
const spvat=fs.readFileSync('src/figma/RegraIncerta.tsx','utf8');
const processTags=spvat.match(/kind="process-tags" items=\{(\[[^\n]*?\])\}/)?.[1];
assert.deepEqual(JSON.parse(processTags).map(t=>t.label),['Pensar','Fazer']);
assert.ok(!/zoom\s*:/.test(fs.readFileSync('src/index.css','utf8')+fs.readFileSync('src/figma-layout.css','utf8')),'No global zoom');
console.log(`${originals.length} original pages: referenced evidence preserved; translations covered; SPVAT stages verified; no global zoom.`);
