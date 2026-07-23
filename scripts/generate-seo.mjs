import { mkdir, writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
const site=(process.env.VITE_SITE_URL||'').trim().replace(/\/$/,'')
const out=resolve('dist','sitemap.xml')
if(!site){await rm(out,{force:true});console.log('SITE_URL not set: sitemap and canonical URLs intentionally omitted.');process.exit(0)}
try{new URL(site)}catch{throw new Error('VITE_SITE_URL must be an absolute http(s) URL')}
const routes=['/','/webs-paraguay','/portfolio/demo-climatizacion','/blog','/components','/wrappers','/license']
const xml=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(path=>`  <url><loc>${new URL(path,site).href}</loc></url>`).join('\n')}\n</urlset>\n`
await mkdir(resolve('dist'),{recursive:true});await writeFile(out,xml)
