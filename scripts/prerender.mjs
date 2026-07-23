import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import puppeteer from 'puppeteer'
import { posts } from '../src/data/blogData.js'

const port=4179,origin=`http://127.0.0.1:${port}`
const routes=['/','/webs-paraguay','/portfolio/demo-climatizacion','/blog',...posts.filter(p=>!p.link).map(p=>`/blog/${p.slug}`)]
const server=spawn(process.execPath,[resolve('node_modules/vite/bin/vite.js'),'preview','--host','127.0.0.1','--port',String(port)],{stdio:'ignore'})
async function wait(){for(let i=0;i<60;i++){try{if((await fetch(origin)).ok)return}catch{}await new Promise(r=>setTimeout(r,250))}throw new Error('Preview server did not start')}
let browser
try{
 await wait();browser=await puppeteer.launch({headless:true});const rendered=[]
 for(const route of routes){const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(origin+route,{waitUntil:'networkidle0'});await page.evaluate(()=>new Promise(requestAnimationFrame));rendered.push([route,'<!doctype html>\n'+await page.content()]);await page.close();if(errors.length)throw new Error(`${route}: ${errors.join('; ')}`);console.log(`captured ${route}`)}
 for(const [route,html] of rendered){const dir=route==='/'?resolve('dist'):resolve('dist',route.slice(1));await mkdir(dir,{recursive:true});await writeFile(resolve(dir,'index.html'),html);console.log(`prerendered ${route}`)}
}finally{if(browser)await browser.close();server.kill()}
