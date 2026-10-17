import fs from 'node:fs';
import ts from 'typescript';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const pt=JSON.parse(fs.readFileSync('src/i18n/pt-BR.json','utf8'));
const normalize=s=>s.replace(/\s+/g,' ').trim();
let count=0;
for(const name of fs.readdirSync('src/figma').filter(f=>f.endsWith('.tsx'))) {
 const file='src/figma/'+name;
 const original=execFileSync('git',['-c',`safe.directory=${process.cwd().replaceAll('\\','/')}`,'show',`HEAD:${file}`],{encoding:'utf8',maxBuffer:10*1024*1024});
 const current=fs.readFileSync(file,'utf8');
 const parse=source=>{
  const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),classes=[],media=[],styles=[],copy=[];
  function walk(n) {
   if(ts.isJsxAttribute(n)) {
    const key=n.name.getText(ast),value=n.initializer?.getText(ast);
    if(key==='className') classes.push(value?.replace(' exact-contact-input',''));
    if(['src','poster','loop','autoPlay','playsInline','muted','preload'].includes(key))media.push(`${key}:${value}`);
    if(key==='style')styles.push(value);
   }
   if(ts.isJsxText(n)&&normalize(n.text)) copy.push(normalize(n.text));
   if(ts.isJsxExpression(n)&&n.expression) {
    if(ts.isStringLiteral(n.expression)||ts.isNoSubstitutionTemplateLiteral(n.expression)) {if(normalize(n.expression.text))copy.push(normalize(n.expression.text))}
    if(ts.isCallExpression(n.expression)&&n.expression.expression.getText(ast)==='t')copy.push(pt[n.expression.arguments[0].text]);
   }
   ts.forEachChild(n,walk);
  }
  walk(ast);return {classes,media,styles,copy};
 };
 const before=parse(original),after=parse(current);
 assert.deepEqual(after.classes,before.classes,`${name}: original visual classes`);
 assert.deepEqual(after.media,before.media,`${name}: original media and playback attributes`);
 assert.deepEqual(after.styles,before.styles,`${name}: original inline styles`);
 const approvedContactLabels=['E-mail','falecom@'];
 const originalCopy=before.copy.filter(v=>!approvedContactLabels.includes(v)),currentCopy=after.copy.filter(v=>!approvedContactLabels.includes(v));
 assert.deepEqual(currentCopy,originalCopy,`${name}: Portuguese source content`);
 count++;
}
for(const locale of ['en','es']) {
 const copy=JSON.parse(fs.readFileSync(`src/i18n/${locale}.json`,'utf8'));
 assert.deepEqual(Object.keys(copy),Object.keys(pt));
 assert.ok(Object.values(copy).every(v=>typeof v==='string'&&v.length));
}
console.log(`${count} original components: visual classes, styles, media and Portuguese copy preserved. Locale key coverage: 100%.`);
