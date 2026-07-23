import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { businessDemo as business } from '../data/businessDemo.js'
import './climatizacion-demo.css'

export default function ClimatizacionDemo() {
  const disabled = e => { e.preventDefault(); alert('Contacto desactivado: esta empresa es ficticia y la página es una demo conceptual.') }
  return <div className="clima-demo">
    <Seo title="Demo de página para empresa de climatización | CVitae Studio" description="Ejemplo conceptual de una página web moderna creada para una empresa paraguaya de climatización." path="/portfolio/demo-climatizacion" />
    <div className="demo-notice"><strong>DEMO CONCEPTUAL — EMPRESA FICTICIA</strong><Link to="/webs-paraguay">Esta es una demostración creada por CVitae Studio · Volver a servicios</Link></div>
    <header className="clima-nav"><a href="#inicio" className="clima-logo">CLIMA<span>NOVA</span></a><nav aria-label="Navegación de la demo"><a href="#servicios">Servicios</a><a href="#cobertura">Cobertura</a><a href="#presupuesto">Presupuesto</a></nav></header>
    <main>
      <section id="inicio" className="clima-hero"><div><p className="clima-kicker">CLIMATIZACIÓN PARA HOGARES Y EMPRESAS</p><h1>Un ambiente fresco cambia todo.</h1><p>{business.description}</p><div className="clima-actions"><a href="#presupuesto" className="clima-primary">SOLICITAR PRESUPUESTO</a><button onClick={disabled} className="clima-secondary">LLAMAR · CONTACTO FICTICIO</button></div></div><div className="clima-visual" aria-label="Representación abstracta de aire fresco"><span>18°</span><div className="air air-1"/><div className="air air-2"/><div className="air air-3"/></div></section>
      <section id="servicios" className="clima-section"><p className="clima-kicker">SERVICIOS</p><h2>Soluciones para cada espacio</h2><div className="clima-grid">{business.services.map((s,i)=><article key={s.title}><span>0{i+1}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div></section>
      <section className="clima-audiences"><div><p className="clima-kicker">HOGARES</p><h2>Confort para tu casa</h2><p>Instalación y mantenimiento pensados para dormitorios, salas y espacios familiares.</p></div><div><p className="clima-kicker">COMERCIOS Y OFICINAS</p><h2>Ambientes que trabajan mejor</h2><p>Soluciones adecuadas para atención al público, equipos de trabajo y espacios comerciales.</p></div></section>
      <section id="cobertura" className="clima-section"><p className="clima-kicker">COBERTURA ILUSTRATIVA</p><h2>{business.city}</h2><div className="clima-pills">{business.coverageAreas.map(x=><span key={x}>{x}</span>)}</div></section>
      <section className="clima-process"><div><p className="clima-kicker">CÓMO FUNCIONA</p><h2>Tu presupuesto en tres pasos</h2></div>{['Contanos qué equipo tenés y qué necesitás','Coordinamos una evaluación del espacio','Recibís una propuesta clara antes de comenzar'].map((x,i)=><div key={x}><strong>{i+1}</strong><p>{x}</p></div>)}</section>
      <section id="presupuesto" className="clima-quote"><div><p className="clima-kicker">PRESUPUESTO</p><h2>Contanos qué necesitás</h2><p>Formulario visual desactivado. Ningún dato será enviado porque ClimaNova Paraguay es una empresa ficticia.</p></div><form onSubmit={disabled}><label>Nombre<input required placeholder="Tu nombre"/></label><label>Servicio<select><option>Instalación</option><option>Mantenimiento</option><option>Reparación</option></select></label><label className="wide">Detalle<textarea rows="4" placeholder="Equipo, zona y necesidad"/></label><button className="wide clima-primary">DEMO · NO ENVIAR DATOS</button></form></section>
      <section className="clima-section"><p className="clima-kicker">PREGUNTAS FRECUENTES</p><h2>Antes de coordinar</h2>{business.faqs.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</section>
    </main>
    <footer className="clima-footer"><div><strong>{business.name}</strong><p>DEMO CONCEPTUAL — EMPRESA FICTICIA</p></div><div><button onClick={disabled}>WHATSAPP FICTICIO</button><button onClick={disabled}>LLAMADA FICTICIA</button></div></footer>
  </div>
}
