import fs from 'node:fs/promises';
import path from 'node:path';
import {render,allPaths,headMarkup,pageMetadata,indexable,origin} from '../.cache/ssr/entry-server.js';
let shell=await fs.readFile('dist/index.html','utf8');
shell=shell.replace(/<title>[\s\S]*?<\/title>/g,'').replace(/<meta\s[^>]*(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,'');
for(const route of allPaths) {
 const body=await render(route);
 const html=shell.replace('</head>',headMarkup(route)+'</head>').replace(/<html lang="[^"]*"/,`<html lang="${pageMetadata(route).language}"`).replace('<div id="root" data-hj-suppress data-clarity-mask="true"></div>',`<div id="root" data-hj-suppress data-clarity-mask="true">${body}</div>`);
 const filename=route==='/'?'dist/index.html':path.join('dist',route.slice(1)+'.html');
 await fs.mkdir(path.dirname(filename),{recursive:true});await fs.writeFile(filename,html);
}
await fs.writeFile('dist/404.html',shell.replace('</head>','<title>404 | OCris Arts</title><meta name="robots" content="noindex, nofollow"></head>'));
await fs.writeFile('dist/robots.txt',indexable?`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
await fs.writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+allPaths.map(route=>`<url><loc>${origin+route}</loc>${pageMetadata(route).alternates.map(a=>`<xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}"/>`).join('')}</url>`).join('')+'</urlset>\n');
console.log(`Prerendered ${allPaths.length} pages. Indexing: ${indexable}`);
