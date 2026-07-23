import { spawn } from 'node:child_process'
import { resolve } from 'node:path'
import puppeteer from 'puppeteer'
const port=4181,origin=`http://127.0.0.1:${port}`,server=spawn(process.execPath,[resolve('node_modules/vite/bin/vite.js'),'preview','--host','127.0.0.1','--port',String(port)],{stdio:'ignore'})
async function wait(){for(let i=0;i<60;i++){try{if((await fetch(origin)).ok)return}catch{}await new Promise(r=>setTimeout(r,250))}throw Error('preview failed')}
let browser
try{await wait();browser=await puppeteer.launch({headless:true});const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(origin+'/portfolio/demo-climatizacion',{waitUntil:'networkidle0'});const cta=await page.$eval('a.clima-primary',e=>({text:e.textContent.trim(),color:getComputedStyle(e).color,background:getComputedStyle(e).backgroundColor}));if(cta.text!=='SOLICITAR PRESUPUESTO'||cta.color!=='rgb(255, 255, 255)')throw Error(`demo CTA invisible: ${JSON.stringify(cta)}`);await page.goto(origin+'/demo/ops-console',{waitUntil:'networkidle0'});const h1=await page.$eval('h1',e=>e.textContent.trim());if(!h1||errors.length)throw Error(`OPS Console demo failed: ${JSON.stringify({h1,errors})}`);console.log(`ok visible demo CTA: ${cta.text}`);console.log(`ok OPS Console demo: ${h1}`)}finally{if(browser)await browser.close();server.kill()}
