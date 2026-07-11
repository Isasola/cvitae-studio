# Generator Scenes + Interactive Demos — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** (1) Reemplazar los íconos genéricos del Empty State Generator por escenas CSS animadas únicas por estado + agregar extractor de colores por screenshot. (2) Convertir los demos de FileStack y Logo Particle en configuradores interactivos donde el usuario sube su logo y lo ve en acción antes de comprar.

**Architecture:** Todo browser-side. Canvas API para extracción de colores y para Logo Particle. CSS keyframes inline para las escenas animadas. Cada demo mantiene su URL actual y agrega una sección "TRY IT — YOUR BRAND" al final. Sin nuevas dependencias.

**Tech Stack:** React 18 + Vite + Tailwind CSS v3. CSS keyframes con nombres únicos (prefijo `esScene_`). Canvas API nativa. FileReader API para uploads.

## Global Constraints

- Paleta: cream `#F5F0E8`, black `#111111`, gold `#C9A84C`
- Tipografía: `font-display` (Bebas Neue) para títulos, `font-body` (Space Grotesk) para cuerpo
- Bordes: `border-[3px] border-black` — sin `rounded-*`
- Sin dependencias nuevas
- Todas las animaciones: CSS keyframes inline con prefijo `esScene_` para no colisionar con keyframes existentes
- Los demos de FileStack y Particle: NO tocar la parte superior (demo estático) — solo agregar sección configurador DEBAJO
- FileStack: el logo del usuario va dentro del cuadro (StackBox), Dr. Filo no cambia
- Logo Particle: el logo del usuario reemplaza `/logo-light.svg` en tiempo real

---

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---------|--------|-----------------|
| `src/components/generators/EmptyStateScene.jsx` | Crear | 16 escenas CSS animadas únicas (una por estado) |
| `src/components/generators/EmptyStatePreset.jsx` | Modificar | Usar EmptyStateScene en lugar del path SVG genérico |
| `src/components/generators/ColorExtractor.jsx` | Crear | Upload screenshot → Canvas API → 5 swatches de color |
| `src/pages/generators/EmptyStateGenerator.jsx` | Modificar | Integrar ColorExtractor en el panel de controles |
| `src/components/FileStackLoader.jsx` | Modificar | Agregar prop `boxLogoSrc` — logo overlay dentro del cuadro |
| `src/pages/demos/FilestackDemo.jsx` | Modificar | Agregar sección configurador interactivo al final |
| `src/pages/demos/ParticleDemo.jsx` | Modificar | Agregar sección configurador interactivo al final |

---

## Task 1: EmptyStateScene — 16 escenas CSS animadas

**Files:**
- Create: `src/components/generators/EmptyStateScene.jsx`

**Interfaces:**
- Consumes: `{ stateId, primaryColor, style }` — color y estilo para adaptar la escena
- Produces: JSX con escena animada, tamaño fijo ~80×80px, sin estado interno

- [ ] **Step 1: Crear EmptyStateScene.jsx completo**

```jsx
// src/components/generators/EmptyStateScene.jsx

const KEYFRAMES = `
  @keyframes esScene_float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes esScene_floatR  { 0%,100%{transform:translateY(0) rotate(-8deg)} 50%{transform:translateY(-7px) rotate(8deg)} }
  @keyframes esScene_shake   { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-4px)} 40%{transform:translateX(4px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }
  @keyframes esScene_pulse   { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.1)} }
  @keyframes esScene_spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes esScene_spinSlow{ from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes esScene_draw    { from{stroke-dashoffset:60} to{stroke-dashoffset:0} }
  @keyframes esScene_fallIn  { 0%{transform:translateY(-20px);opacity:0} 60%{opacity:1} 100%{transform:translateY(0);opacity:1} }
  @keyframes esScene_fadeOut { 0%,70%{opacity:1} 100%{opacity:0} }
  @keyframes esScene_scanLR  { 0%,100%{transform:translateX(-16px)} 50%{transform:translateX(16px)} }
  @keyframes esScene_blink   { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes esScene_wifiOut { 0%{opacity:1} 100%{opacity:0} }
  @keyframes esScene_launch  { 0%{transform:translateY(0)} 100%{transform:translateY(-60px);opacity:0} }
  @keyframes esScene_jiggle  { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} }
  @keyframes esScene_dot1    { 0%,60%,100%{opacity:0;transform:scale(0.6)} 20%{opacity:1;transform:scale(1)} }
  @keyframes esScene_dot2    { 0%,20%,80%,100%{opacity:0;transform:scale(0.6)} 40%{opacity:1;transform:scale(1)} }
  @keyframes esScene_dot3    { 0%,40%,100%{opacity:0;transform:scale(0.6)} 60%{opacity:1;transform:scale(1)} }
  @keyframes esScene_sand    { 0%{height:20px} 100%{height:0px} }
  @keyframes esScene_crown   { 0%,100%{transform:translateY(4px);opacity:0} 40%,80%{transform:translateY(0);opacity:1} }
  @keyframes esScene_cardIn  { 0%{transform:translateX(40px);opacity:0} 40%{transform:translateX(0);opacity:1} 70%{transform:translateX(0);opacity:1} 100%{transform:translateX(-40px);opacity:0} }
  @keyframes esScene_trailFade { 0%{opacity:0.6;transform:scaleX(1)} 100%{opacity:0;transform:scaleX(0.3)} }
  @keyframes esScene_boxClose  { 0%,60%{transform:rotateX(0deg)} 80%,100%{transform:rotateX(-40deg)} }
`

// color: usa el primaryColor del usuario si está disponible, sino un default por estilo
function c(primaryColor, fallback = '#111111') {
  return primaryColor || fallback
}

// Escena 1: No Data — caja vacía que recibe un papel y lo pierde
function SceneNoData({ color }) {
  return (
    <div style={{ position: 'relative', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Caja */}
      <svg width="52" height="44" viewBox="0 0 52 44" fill="none" style={{ position: 'absolute', bottom: 4 }}>
        <rect x="2" y="12" width="48" height="30" rx="3" stroke={color} strokeWidth="2.5" fill="none"/>
        <path d="M2 20 H50" stroke={color} strokeWidth="2" opacity="0.3"/>
        <path d="M2 12 L14 2 H38 L50 12" stroke={color} strokeWidth="2.5" fill="none"/>
      </svg>
      {/* Papel que cae y desaparece */}
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none"
        style={{ position: 'absolute', top: 2, animation: 'esScene_fallIn 2s ease-in-out infinite' }}>
        <rect x="2" y="2" width="14" height="18" rx="2" stroke={color} strokeWidth="2" fill="none"/>
        <line x1="5" y1="7" x2="13" y2="7" stroke={color} strokeWidth="1.5" opacity="0.5"/>
        <line x1="5" y1="11" x2="13" y2="11" stroke={color} strokeWidth="1.5" opacity="0.5"/>
        <line x1="5" y1="15" x2="9" y2="15" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      </svg>
    </div>
  )
}

// Escena 2: Search Empty — lupa que escanea líneas vacías
function SceneSearchEmpty({ color }) {
  return (
    <div style={{ position: 'relative', width: 72, height: 72 }}>
      {/* Líneas de tabla vacías */}
      {[16, 28, 40].map((y, i) => (
        <div key={i} style={{ position: 'absolute', left: 8, right: 8, top: y, height: 7, background: color, opacity: 0.12, borderRadius: 2 }} />
      ))}
      {/* Lupa escaneando */}
      <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', animation: 'esScene_scanLR 2.4s ease-in-out infinite' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
          <circle cx="10" cy="10" r="7"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      </div>
      {/* "0" que aparece debajo */}
      <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', fontFamily: 'monospace', fontSize: 10, color: color, opacity: 0.5, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
        0 results
      </div>
    </div>
  )
}

// Escena 3: Error — triángulo que se sacude, exclamación que pulsa
function SceneError({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'esScene_shake 1.6s ease-in-out infinite', animationDelay: '0.8s' }}>
        <svg width="58" height="54" viewBox="0 0 58 54" fill="none">
          <path d="M29 4 L54 50 H4 Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
          <line x1="29" y1="20" x2="29" y2="36" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="29" cy="43" r="2.5" fill={color} style={{ animation: 'esScene_pulse 1.2s ease-in-out infinite' }}/>
        </svg>
      </div>
    </div>
  )
}

// Escena 4: 404 — fantasma que flota y mira a los lados
function SceneGhost({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'esScene_float 2.5s ease-in-out infinite' }}>
        <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
          {/* Cuerpo */}
          <path d="M4 20 C4 10 10 2 24 2 C38 2 44 10 44 20 V54 L38 48 L32 54 L26 48 L20 54 L14 48 L8 54 V20Z" stroke={color} strokeWidth="2.5" fill="none"/>
          {/* Ojos */}
          <circle cx="17" cy="22" r="3.5" fill={color}/>
          <circle cx="31" cy="22" r="3.5" fill={color}/>
          {/* Pupilas que miran a los lados */}
          <circle cx="18" cy="22" r="1.5" fill="white" style={{ animation: 'esScene_scanLR 3s ease-in-out infinite' }}/>
          <circle cx="32" cy="22" r="1.5" fill="white" style={{ animation: 'esScene_scanLR 3s ease-in-out infinite' }}/>
        </svg>
      </div>
    </div>
  )
}

// Escena 5: Offline — arcos de wifi que se apagan de afuera hacia adentro
function SceneOffline({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8 }}>
      <svg width="60" height="48" viewBox="0 0 60 48" fill="none">
        {/* Arcos de wifi — el más externo se apaga primero */}
        <path d="M4 30 C4 14 14 4 30 4 C46 4 56 14 56 30" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"
          style={{ animation: 'esScene_wifiOut 2s ease-in-out infinite', animationDelay: '0s', opacity: 0 }}/>
        <path d="M12 34 C12 22 20 14 30 14 C40 14 48 22 48 34" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"
          style={{ animation: 'esScene_wifiOut 2s ease-in-out infinite', animationDelay: '0.4s', opacity: 0 }}/>
        <path d="M20 38 C20 31 24 26 30 26 C36 26 40 31 40 38" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"
          style={{ animation: 'esScene_wifiOut 2s ease-in-out infinite', animationDelay: '0.8s', opacity: 0 }}/>
        {/* Punto central */}
        <circle cx="30" cy="44" r="3.5" fill={color}/>
        {/* Línea diagonal de "desconectado" */}
        <line x1="8" y1="8" x2="52" y2="44" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
      </svg>
    </div>
  )
}

// Escena 6: Loading — reloj con manecillas girando
function SceneLoading({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="24" stroke={color} strokeWidth="2.5" fill="none" opacity="0.3"/>
        <circle cx="28" cy="28" r="24" stroke={color} strokeWidth="2.5" fill="none"
          strokeDasharray="30 120" strokeLinecap="round"
          style={{ animation: 'esScene_spin 1.4s linear infinite', transformOrigin: '28px 28px' }}/>
        {/* Manecilla horaria */}
        <line x1="28" y1="28" x2="28" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round"
          style={{ animation: 'esScene_spin 6s linear infinite', transformOrigin: '28px 28px' }}/>
        {/* Manecilla minutera */}
        <line x1="28" y1="28" x2="40" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round"
          style={{ animation: 'esScene_spin 1.4s linear infinite', transformOrigin: '28px 28px' }}/>
        <circle cx="28" cy="28" r="3" fill={color}/>
      </svg>
    </div>
  )
}

// Escena 7: Unauthorized — candado que tiembla intentando abrirse
function SceneUnauthorized({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'esScene_jiggle 1.8s ease-in-out infinite' }}>
        <svg width="44" height="56" viewBox="0 0 44 56" fill="none">
          {/* Arco del candado — intenta abrirse */}
          <path d="M8 22 V16 C8 7 36 7 36 16 V22" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"
            style={{ animation: 'esScene_float 1.8s ease-in-out infinite', transformOrigin: '22px 14px' }}/>
          {/* Cuerpo */}
          <rect x="2" y="22" width="40" height="30" rx="4" stroke={color} strokeWidth="2.5" fill="none"/>
          {/* Cerradura */}
          <circle cx="22" cy="34" r="5" stroke={color} strokeWidth="2" fill="none"/>
          <line x1="22" y1="39" x2="22" y2="45" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}

// Escena 8: Maintenance — llave inglesa girando
function SceneMaintenance({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ animation: 'esScene_spinSlow 3s linear infinite', transformOrigin: 'center' }}>
        <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      </div>
    </div>
  )
}

// Escena 9: Success — checkmark que se dibuja solo con burst de puntos
function SceneSuccess({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Burst de puntos */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 5, height: 5,
          borderRadius: '50%',
          background: color,
          transform: `rotate(${angle}deg) translateY(-28px)`,
          animation: `esScene_pulse 1.8s ease-in-out infinite`,
          animationDelay: `${i * 0.08}s`,
          opacity: 0.5,
        }}/>
      ))}
      {/* Círculo */}
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2.5" fill="none"/>
        {/* Check animado */}
        <path d="M12 24 L20 32 L36 16" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="60" strokeDashoffset="0"
          style={{ animation: 'esScene_draw 0.8s ease-out forwards' }}/>
      </svg>
    </div>
  )
}

// Escena 10: First Use — cohete despegando con trail
function SceneFirstUse({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ animation: 'esScene_float 2.2s ease-in-out infinite' }}>
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
          {/* Cohete */}
          <path d="M20 4 C20 4 32 14 32 32 L20 44 L8 32 C8 14 20 4 20 4Z" stroke={color} strokeWidth="2.5" fill="none"/>
          <circle cx="20" cy="26" r="5" stroke={color} strokeWidth="2" fill="none"/>
          {/* Aletas */}
          <path d="M8 32 L2 44 L12 40" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none"/>
          <path d="M32 32 L38 44 L28 40" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none"/>
          {/* Llama */}
          <path d="M14 44 C14 44 17 52 20 56 C23 52 26 44 26 44" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"
            style={{ animation: 'esScene_pulse 0.5s ease-in-out infinite' }} opacity="0.7"/>
        </svg>
      </div>
    </div>
  )
}

// Escena 11: No Payment — tarjeta que aparece, muestra X, desaparece
function SceneNoPayment({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ animation: 'esScene_cardIn 3s ease-in-out infinite' }}>
        <svg width="58" height="40" viewBox="0 0 58 40" fill="none">
          <rect x="2" y="2" width="54" height="36" rx="4" stroke={color} strokeWidth="2.5" fill="none"/>
          <line x1="2" y1="12" x2="56" y2="12" stroke={color} strokeWidth="2.5"/>
          {/* X de rechazo */}
          <line x1="20" y1="22" x2="28" y2="32" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="28" y1="22" x2="20" y2="32" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
          {/* Chip */}
          <rect x="8" y="18" width="10" height="8" rx="1.5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5"/>
        </svg>
      </div>
    </div>
  )
}

// Escena 12: Archived — caja que se cierra con tape
function SceneArchived({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 4 }}>
      <svg width="60" height="52" viewBox="0 0 60 52" fill="none">
        {/* Caja base */}
        <rect x="4" y="20" width="52" height="28" rx="3" stroke={color} strokeWidth="2.5" fill="none"/>
        {/* Tapa cerrándose */}
        <path d="M4 20 L4 8 L56 8 L56 20" stroke={color} strokeWidth="2.5" fill="none"
          style={{ animation: 'esScene_boxClose 3s ease-in-out infinite', transformOrigin: '30px 20px' }}/>
        {/* Cinta adhesiva */}
        <rect x="20" y="17" width="20" height="6" rx="1" fill={color} opacity="0.4"
          style={{ animation: 'esScene_pulse 3s ease-in-out infinite' }}/>
        <line x1="20" y1="17" x2="40" y2="17" stroke={color} strokeWidth="1" opacity="0.6"/>
        <line x1="20" y1="23" x2="40" y2="23" stroke={color} strokeWidth="1" opacity="0.6"/>
      </svg>
    </div>
  )
}

// Escena 13: Deleted — papel que cae en el tacho de basura
function SceneDeleted({ color }) {
  return (
    <div style={{ width: 72, height: 72, position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {/* Tacho */}
      <svg width="44" height="40" viewBox="0 0 44 40" fill="none" style={{ position: 'absolute', bottom: 2 }}>
        <path d="M6 10 L38 10 L34 38 H10 Z" stroke={color} strokeWidth="2.5" fill="none"/>
        <line x1="2" y1="10" x2="42" y2="10" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="4" x2="28" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="16" y1="18" x2="16" y2="32" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="22" y1="18" x2="22" y2="32" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <line x1="28" y1="18" x2="28" y2="32" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
      {/* Papel cayendo */}
      <div style={{ position: 'absolute', top: 2, animation: 'esScene_floatR 2s ease-in-out infinite' }}>
        <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
          <path d="M3 2 H15 L20 8 V26 C20 27.1 19.1 28 18 28 H3 C1.9 28 1 27.1 1 26 V4 C1 2.9 1.9 2 3 2Z" stroke={color} strokeWidth="2" fill="none"/>
          <path d="M15 2 L20 8 H17 C15.9 8 15 7.1 15 6Z" stroke={color} strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
    </div>
  )
}

// Escena 14: AI Waiting — cursor parpadeante + tres puntos de typing
function SceneAIWaiting({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      {/* Símbolo AI */}
      <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
        <rect x="2" y="2" width="36" height="24" rx="4" stroke={color} strokeWidth="2" fill="none"/>
        <text x="8" y="18" fill={color} fontSize="10" fontFamily="monospace" opacity="0.8">AI</text>
        {/* Cursor parpadeante */}
        <line x1="25" y1="8" x2="25" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"
          style={{ animation: 'esScene_blink 1s step-start infinite' }}/>
      </svg>
      {/* Tres puntos de "thinking" */}
      <div style={{ display: 'flex', gap: 6 }}>
        {[
          { anim: 'esScene_dot1 1.4s ease-in-out infinite' },
          { anim: 'esScene_dot2 1.4s ease-in-out infinite' },
          { anim: 'esScene_dot3 1.4s ease-in-out infinite' },
        ].map((d, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: color, animation: d.anim }} />
        ))}
      </div>
    </div>
  )
}

// Escena 15: Upgrade — estrella que pulsa, corona que aparece
function SceneUpgrade({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Corona que aparece arriba */}
      <svg width="36" height="22" viewBox="0 0 36 22" fill="none"
        style={{ position: 'absolute', top: 2, animation: 'esScene_crown 2.4s ease-in-out infinite' }}>
        <path d="M2 20 L8 6 L18 14 L28 2 L34 14 L36 20 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <line x1="2" y1="20" x2="34" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
      {/* Estrella pulsando */}
      <div style={{ animation: 'esScene_pulse 1.6s ease-in-out infinite', marginTop: 16 }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>
    </div>
  )
}

// Escena 16: Trial Ended — reloj de arena con arena cayendo
function SceneTrialEnded({ color }) {
  return (
    <div style={{ width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="44" height="64" viewBox="0 0 44 64" fill="none">
        {/* Líneas superior e inferior */}
        <line x1="2" y1="4" x2="42" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="2" y1="60" x2="42" y2="60" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        {/* Cuerpo reloj de arena */}
        <path d="M4 4 L38 4 L22 32 L38 60 L4 60 L22 32 Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
        {/* Arena superior cayendo */}
        <path d="M10 10 L22 24 L34 10 Z" fill={color} opacity="0.3"/>
        {/* Arena inferior acumulando */}
        <path d="M10 54 L22 40 L34 54 Z" fill={color} opacity="0.6"/>
        {/* Partícula de arena cayendo */}
        <circle cx="22" cy="32" r="2" fill={color} style={{ animation: 'esScene_pulse 1s ease-in-out infinite' }}/>
      </svg>
    </div>
  )
}

// ── Mapa de escenas ───────────────────────────────────────────────────────
const SCENE_MAP = {
  'no-data':      SceneNoData,
  'search-empty': SceneSearchEmpty,
  'error':        SceneError,
  '404':          SceneGhost,
  'offline':      SceneOffline,
  'loading':      SceneLoading,
  'unauthorized': SceneUnauthorized,
  'maintenance':  SceneMaintenance,
  'success':      SceneSuccess,
  'first-use':    SceneFirstUse,
  'no-payment':   SceneNoPayment,
  'archived':     SceneArchived,
  'deleted':      SceneDeleted,
  'ai-waiting':   SceneAIWaiting,
  'upgrade':      SceneUpgrade,
  'trial-ended':  SceneTrialEnded,
}

export default function EmptyStateScene({ stateId, primaryColor, style }) {
  // Color de la escena: usa primaryColor si no es blanco/negro genérico, sino fallback por estilo
  const darkStyles = ['dark', 'vercel', 'linear']
  const fallback = darkStyles.includes(style) ? '#ffffff' : '#111111'
  const color = primaryColor && primaryColor !== '#111111' ? primaryColor : fallback

  const Scene = SCENE_MAP[stateId] || SceneNoData

  return (
    <>
      <style>{KEYFRAMES}</style>
      <Scene color={color} />
    </>
  )
}
```

- [ ] **Step 2: Verificar que el archivo existe y tiene 16 escenas**

```bash
grep -c "function Scene" /c/Users/isaso/Documents/cvitae-studio/src/components/generators/EmptyStateScene.jsx
```
Esperado: `16`

---

## Task 2: Actualizar EmptyStatePreset para usar las escenas

**Files:**
- Modify: `src/components/generators/EmptyStatePreset.jsx`

**Interfaces:**
- Consumes: mismas props que antes — `{ stateId, style, primaryColor, animationId, buttonId, title, desc }`
- Produces: mismo output pero con `EmptyStateScene` en lugar del SVG genérico

- [ ] **Step 1: Reemplazar el bloque del ícono SVG en EmptyStatePreset.jsx**

Reemplazar la sección que importa `ICONS` y renderiza el SVG path genérico. El archivo completo nuevo:

```jsx
// src/components/generators/EmptyStatePreset.jsx
import EmptyStateScene from './EmptyStateScene.jsx'
import { BUTTONS } from './emptyStateConfig.js'

const STYLE_TOKENS = {
  minimal: {
    wrapper: 'bg-white border border-gray-200',
    title: 'text-gray-900 font-semibold',
    desc: 'text-gray-500',
    btn: 'bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-700',
    btnOverride: false,
  },
  neobrutalism: {
    wrapper: 'bg-[#F5F0E8] border-[3px] border-black shadow-[6px_6px_0px_0px_#111111]',
    title: 'text-black font-display tracking-wider uppercase',
    desc: 'text-black/70 font-body',
    btn: 'bg-black text-[#F5F0E8] border-[3px] border-black px-4 py-2 text-sm font-bold tracking-wide shadow-[4px_4px_0px_0px_#C9A84C] hover:bg-[#C9A84C] hover:text-black',
    btnOverride: true,
  },
  glass: {
    wrapper: 'bg-white/20 backdrop-blur-md border border-white/40 shadow-lg',
    title: 'text-white font-semibold',
    desc: 'text-white/60',
    btn: 'bg-white/20 text-white border border-white/40 rounded-lg px-4 py-2 text-sm font-medium backdrop-blur hover:bg-white/30',
    btnOverride: false,
  },
  corporate: {
    wrapper: 'bg-gray-50 border border-gray-300',
    title: 'text-gray-800 font-bold',
    desc: 'text-gray-500 text-sm',
    btn: 'bg-blue-600 text-white rounded px-4 py-2 text-sm font-semibold hover:bg-blue-700',
    btnOverride: true,
  },
  dark: {
    wrapper: 'bg-[#0f0f0f] border border-white/10',
    title: 'text-white font-semibold',
    desc: 'text-white/40',
    btn: 'bg-white/10 text-white border border-white/20 rounded-md px-4 py-2 text-sm hover:bg-white/20',
    btnOverride: false,
  },
  stripe: {
    wrapper: 'bg-white border border-[#e0e0e0] shadow-sm',
    title: 'text-[#30313d] font-semibold',
    desc: 'text-[#6b7280] text-sm',
    btn: 'bg-[#635bff] text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-[#5144e0]',
    btnOverride: true,
  },
  linear: {
    wrapper: 'bg-[#1a1a2e] border border-white/10',
    title: 'text-white font-medium',
    desc: 'text-white/40 text-sm',
    btn: 'bg-[#5e6ad2] text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-[#4f5bbf]',
    btnOverride: true,
  },
  vercel: {
    wrapper: 'bg-black border border-white/10',
    title: 'text-white font-semibold',
    desc: 'text-white/40 text-sm',
    btn: 'bg-white text-black rounded-md px-4 py-2 text-sm font-semibold hover:bg-white/90',
    btnOverride: false,
  },
}

const BUTTONS_MAP = Object.fromEntries(BUTTONS.map(b => [b.id, b.label]))

export default function EmptyStatePreset({ stateId, style = 'minimal', primaryColor, animationId = 'none', buttonId = 'retry', title, desc }) {
  const tokens = STYLE_TOKENS[style] || STYLE_TOKENS.minimal
  const btnStyle = (primaryColor && tokens.btnOverride)
    ? { backgroundColor: primaryColor, borderColor: primaryColor }
    : {}

  return (
    <div className={`flex flex-col items-center justify-center text-center p-10 gap-4 ${tokens.wrapper}`}>
      <EmptyStateScene stateId={stateId} primaryColor={primaryColor} style={style} />

      <h3 className={`text-xl ${tokens.title}`} style={primaryColor ? { color: primaryColor } : {}}>
        {title}
      </h3>

      <p className={`max-w-xs ${tokens.desc}`}>{desc}</p>

      {buttonId !== 'none' && (
        <button className={tokens.btn} style={btnStyle}>
          {BUTTONS_MAP[buttonId] || 'Try Again'}
        </button>
      )}
    </div>
  )
}
```

---

## Task 3: ColorExtractor — screenshot a swatches

**Files:**
- Create: `src/components/generators/ColorExtractor.jsx`

**Interfaces:**
- Consumes: `{ onColorSelect }` — callback con el hex del color elegido
- Produces: botón de upload + swatches clickeables

- [ ] **Step 1: Crear ColorExtractor.jsx**

```jsx
// src/components/generators/ColorExtractor.jsx
import { useState, useRef } from 'react'

function extractColors(imageFile, callback) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const MAX = 120
      const scale = Math.min(MAX / img.width, MAX / img.height, 1)
      canvas.width  = Math.round(img.width  * scale)
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)

      const buckets = {}
      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3]
        if (a < 128) continue
        const r = data[i], g = data[i+1], b = data[i+2]
        // Ignorar casi-blanco, casi-negro y casi-gris
        const max = Math.max(r, g, b), min = Math.min(r, g, b)
        if (max > 230 && min > 200) continue   // blanco
        if (max < 40) continue                  // negro
        if (max - min < 20 && max < 180) continue // gris neutro
        // Bucketing en pasos de 24
        const br = Math.round(r / 24) * 24
        const bg = Math.round(g / 24) * 24
        const bb = Math.round(b / 24) * 24
        const key = `${br},${bg},${bb}`
        buckets[key] = (buckets[key] || 0) + 1
      }

      const sorted = Object.entries(buckets)
        .sort((a, b) => b[1] - a[1])

      // Deduplicar colores muy similares (distancia euclidiana < 50)
      const picked = []
      for (const [key] of sorted) {
        const [r, g, b] = key.split(',').map(Number)
        const tooClose = picked.some(([pr, pg, pb]) =>
          Math.sqrt((r-pr)**2 + (g-pg)**2 + (b-pb)**2) < 50
        )
        if (!tooClose) {
          picked.push([r, g, b])
          if (picked.length >= 6) break
        }
      }

      const hex = picked.map(([r, g, b]) =>
        '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
      )
      callback(hex.length ? hex : ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'])
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(imageFile)
}

export default function ColorExtractor({ onColorSelect }) {
  const [swatches, setSwatches] = useState([])
  const [loading, setLoading]   = useState(false)
  const [preview, setPreview]   = useState(null)
  const inputRef = useRef(null)

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    setPreview(URL.createObjectURL(file))
    extractColors(file, (colors) => {
      setSwatches(colors)
      setLoading(false)
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Botón de upload */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="w-full px-4 py-3 border-[3px] border-black bg-cream font-body font-bold text-xs tracking-widest hover:bg-black hover:text-cream transition-none flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="opacity-60">EXTRACTING COLORS...</span>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
            SCAN SCREENSHOT
          </>
        )}
      </button>

      {/* Preview de la screenshot */}
      {preview && (
        <div className="border-[3px] border-black overflow-hidden" style={{ height: 64 }}>
          <img src={preview} alt="Screenshot" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Swatches */}
      {swatches.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="font-body text-xs text-black/50 tracking-widest">COLORS FOUND — CLICK TO APPLY</span>
          <div className="flex gap-0">
            {swatches.map((color) => (
              <button
                key={color}
                onClick={() => onColorSelect(color)}
                title={color}
                className="flex-1 h-10 border-[2px] border-black -ml-[2px] first:ml-0 hover:scale-110 hover:z-10 transition-transform relative"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex gap-0">
            {swatches.map((color) => (
              <span key={color} className="flex-1 font-mono text-[9px] text-center text-black/40 truncate -ml-[1px] first:ml-0">
                {color}
              </span>
            ))}
          </div>
        </div>
      )}

      {swatches.length === 0 && !loading && (
        <p className="font-body text-xs text-black/40 leading-relaxed">
          Subí un screenshot de tu app y extraemos los colores automáticamente.
        </p>
      )}
    </div>
  )
}
```

---

## Task 4: Integrar ColorExtractor en EmptyStateGenerator

**Files:**
- Modify: `src/pages/generators/EmptyStateGenerator.jsx`

**Interfaces:**
- Consumes: `ColorExtractor` importado
- Produces: nueva sección "MATCH YOUR BRAND" antes de los controles, con ColorExtractor

- [ ] **Step 1: Agregar import de ColorExtractor**

Agregar al bloque de imports de `EmptyStateGenerator.jsx`:
```jsx
import ColorExtractor from '../../components/generators/ColorExtractor.jsx'
```

- [ ] **Step 2: Agregar sección MATCH YOUR BRAND en el panel de controles**

Dentro del `<div className="p-6 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black overflow-y-auto max-h-[820px]">`, ANTES del `<ControlPanel .../>`, agregar:

```jsx
{/* Match Your Brand */}
<div className="mb-6 pb-6 border-b-[3px] border-black">
  <div className="flex items-center gap-2 mb-3">
    <span className="font-display text-base tracking-widest">MATCH YOUR BRAND</span>
    <div className="flex-1 h-[2px] bg-black/20" />
  </div>
  <ColorExtractor onColorSelect={(color) => onChange('primaryColor', color)} />
</div>
```

---

## Task 5: FileStack — prop boxLogoSrc + overlay

**Files:**
- Modify: `src/components/FileStackLoader.jsx`

**Interfaces:**
- Consumes: nueva prop `boxLogoSrc?: string` — data URL de la imagen subida por el usuario
- Produces: logo overlay centrado dentro del StackBox, detrás de los items stackeados

- [ ] **Step 1: Agregar boxLogoSrc a la firma del componente**

Cambiar:
```jsx
export default function FileStackLoader({
  size = 'md',
  speed = 'normal',
  label = 'Loading...',
}) {
```
Por:
```jsx
export default function FileStackLoader({
  size = 'md',
  speed = 'normal',
  label = 'Loading...',
  boxLogoSrc = null,
}) {
```

- [ ] **Step 2: Agregar el logo overlay dentro del bloque del StackBox**

Dentro de `{/* Stack box */}`, después de `<StackBox width={cfg.boxW} height={cfg.boxH} />` y ANTES del bloque `{stackRows.map(...)}`, agregar:

```jsx
{/* Logo overlay dentro del box */}
{boxLogoSrc && (
  <img
    src={boxLogoSrc}
    alt="Brand logo"
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: cfg.boxW * 0.55,
      maxHeight: cfg.boxH * 0.4,
      objectFit: 'contain',
      opacity: 0.25,
      pointerEvents: 'none',
    }}
  />
)}
```

---

## Task 6: Configurador interactivo en FilestackDemo

**Files:**
- Modify: `src/pages/demos/FilestackDemo.jsx`

**Interfaces:**
- Consumes: `FileStackLoader` con nueva prop `boxLogoSrc`
- Produces: sección "TRY IT — YOUR BRAND" al final de la página con controles en vivo

- [ ] **Step 1: Reemplazar FilestackDemo.jsx completo**

```jsx
// src/pages/demos/FilestackDemo.jsx
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import FileStackLoader from '../../components/FileStackLoader.jsx'

export default function FilestackDemo() {
  const [boxLogoSrc, setBoxLogoSrc] = useState(null)
  const [speed, setSpeed]           = useState('normal')
  const [size, setSize]             = useState('lg')
  const [label, setLabel]           = useState('Organizing files...')
  const fileInputRef = useRef(null)

  function handleLogoUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setBoxLogoSrc(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-black text-cream">
      {/* Nav */}
      <div className="border-b-[3px] border-gold px-6 py-4 flex items-center justify-between">
        <Link to="/wrappers" className="font-body text-xs font-bold tracking-widest text-gold/60 hover:text-gold transition-colors">
          ← WRAPPERS & LOADERS
        </Link>
        <span className="font-body text-xs tracking-widest text-gold/40">LIVE DEMO</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="font-body text-xs font-bold tracking-[0.3em] text-gold mb-3">CVITAE STUDIO — LOADER</p>
          <h1 className="font-display text-6xl md:text-8xl leading-none mb-4">FILESTACK<br/>LOADER</h1>
          <p className="font-body text-base text-cream/60 max-w-lg">
            Dr. Filo — your robot archivist — tosses files into the stack box via arc trajectories.
            Folders land first. Files follow with names.
          </p>
        </div>

        {/* Demo estático original */}
        <div className="border-[3px] border-gold shadow-brutal-gold bg-black mb-10 flex flex-col items-center py-14 gap-8">
          <p className="font-body text-xs tracking-[0.3em] text-gold/40">INTERACTIVE DEMO</p>
          <div className="flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-16 flex-wrap">
            <div className="flex flex-col items-center gap-3">
              <FileStackLoader size="lg" speed="normal" label="Organizing files..." />
              <code className="font-mono text-xs text-gold/40">size="lg" speed="normal"</code>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[3px] border-gold/30 mb-10">
          {[
            { size: 'sm', speed: 'fast',   label: 'Processing...' },
            { size: 'md', speed: 'normal', label: 'Loading...' },
            { size: 'lg', speed: 'slow',   label: 'Archiving...' },
          ].map((v, i) => (
            <div key={v.size} className={`flex flex-col items-center gap-4 p-8 bg-black ${i < 2 ? 'border-b-[2px] md:border-b-0 md:border-r-[2px] border-gold/20' : ''}`}>
              <FileStackLoader size={v.size} speed={v.speed} label={v.label} />
              <div className="text-center">
                <code className="font-mono text-xs text-gold/50 block">size="{v.size}"</code>
                <code className="font-mono text-xs text-gold/50 block">speed="{v.speed}"</code>
              </div>
            </div>
          ))}
        </div>

        {/* Code snippet */}
        <div className="border-[3px] border-gold/20 bg-black mb-10 p-6">
          <p className="font-body text-xs tracking-widest text-gold/50 mb-4">USAGE</p>
          <pre className="font-mono text-xs text-cream/70 overflow-x-auto leading-relaxed">{`import FileStackLoader from './components/FileStackLoader'

<FileStackLoader
  size="lg"           // "sm" | "md" | "lg"
  speed="normal"      // "slow" | "normal" | "fast"
  label="Uploading..."
/>`}</pre>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[3px] border-gold/20 mb-12">
          {[
            ['Zero dependencies', 'Pure React + CSS keyframes. No animation libraries.'],
            ['Arc trajectories', 'Files fly in realistic arcs — not straight lines.'],
            ['Logical sequence', 'Folder first, then docs, images, code. Makes sense.'],
            ['Original character', 'Dr. Filo is 100% original SVG — no licensing issues.'],
          ].map(([title, desc], i) => (
            <div key={title} className={`p-6 ${i % 2 === 0 ? 'border-r-[2px] border-gold/10' : ''} ${i < 2 ? 'border-b-[2px] border-gold/10' : ''}`}>
              <p className="font-display text-xl text-gold mb-1">{title}</p>
              <p className="font-body text-xs text-cream/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── TRY IT — YOUR BRAND ────────────────────────────────────────── */}
        <div className="border-[3px] border-gold mb-12">
          {/* Header de sección */}
          <div className="border-b-[3px] border-gold px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-4xl text-gold leading-none">TRY IT — YOUR BRAND</h2>
              <p className="font-body text-xs text-cream/40 mt-1">Subí tu logo, configurá la velocidad. Comprás cuando ya sabés cómo se ve.</p>
            </div>
            <span className="font-body text-xs text-gold/40 border-[2px] border-gold/40 px-3 py-1">FREE PREVIEW</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Controles */}
            <div className="p-8 border-b-[3px] md:border-b-0 md:border-r-[3px] border-gold/30 flex flex-col gap-6">

              {/* Logo upload */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">01 — YOUR LOGO (inside the box)</p>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border-[3px] border-gold/50 bg-black font-body font-bold text-xs tracking-widest text-gold/70 hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                  {boxLogoSrc ? 'CHANGE LOGO' : 'UPLOAD LOGO'}
                </button>
                {boxLogoSrc && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={boxLogoSrc} alt="Your logo" className="h-8 object-contain" />
                    <button onClick={() => setBoxLogoSrc(null)} className="font-body text-xs text-cream/30 hover:text-cream/60">remove</button>
                  </div>
                )}
              </div>

              {/* Speed */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">02 — SPEED</p>
                <div className="flex gap-0">
                  {['slow','normal','fast'].map(s => (
                    <button key={s} onClick={() => setSpeed(s)}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-body text-xs font-bold tracking-wide transition-none
                        ${speed === s ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">03 — SIZE</p>
                <div className="flex gap-0">
                  {['sm','md','lg'].map(s => (
                    <button key={s} onClick={() => setSize(s)}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-body text-xs font-bold tracking-wide transition-none
                        ${size === s ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Label */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">04 — LOADING TEXT</p>
                <input
                  type="text"
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  className="w-full px-3 py-2 bg-black border-[2px] border-gold/30 font-mono text-xs text-cream/70 focus:outline-none focus:border-gold"
                  placeholder="Uploading..."
                />
              </div>
            </div>

            {/* Preview en vivo */}
            <div className="p-8 flex flex-col items-center justify-center gap-6 bg-black">
              <p className="font-body text-xs tracking-widest text-gold/30">LIVE PREVIEW</p>
              <FileStackLoader size={size} speed={speed} label={label || null} boxLogoSrc={boxLogoSrc} />
              {boxLogoSrc && (
                <p className="font-body text-xs text-gold/30 text-center max-w-xs">
                  Tu logo aparece dentro del cuadro receptor con 25% de opacidad — sutil, profesional.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-[3px] border-gold bg-gold/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-3xl text-gold">$12 USD</p>
            <p className="font-body text-sm text-cream/60 mt-1">One-time. Use in unlimited projects.</p>
          </div>
          <div className="flex gap-0">
            <a
              href="https://wa.me/595992954169"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gold text-black border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-cream transition-colors"
            >
              BUY NOW
            </a>
            <Link
              to="/wrappers"
              className="-ml-[3px] px-6 py-3 bg-black text-gold border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-gold/10 transition-colors"
            >
              BACK TO STORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Task 7: Configurador interactivo en ParticleDemo

**Files:**
- Modify: `src/pages/demos/ParticleDemo.jsx`

**Interfaces:**
- Consumes: `LogoParticleLoader` con `logoSrc` dinámico
- Produces: sección "TRY IT — YOUR LOGO" al final con upload + controles

- [ ] **Step 1: Reemplazar ParticleDemo.jsx completo**

```jsx
// src/pages/demos/ParticleDemo.jsx
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import LogoParticleLoader from '../../components/LogoParticleLoader.jsx'

export default function ParticleDemo() {
  const [userLogoSrc, setUserLogoSrc]   = useState(null)
  const [particleSize, setParticleSize] = useState(2)
  const [canvasW, setCanvasW]           = useState(340)
  const [canvasH, setCanvasH]           = useState(90)
  const [loaderKey, setLoaderKey]       = useState(0) // fuerza re-mount al cambiar logo
  const fileInputRef = useRef(null)

  function handleLogoUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setUserLogoSrc(ev.target.result)
      setLoaderKey(k => k + 1) // re-monta el loader con el nuevo logo
    }
    reader.readAsDataURL(file)
  }

  const activeLogo = userLogoSrc || '/logo-light.svg'

  return (
    <div className="min-h-screen bg-black text-cream">
      {/* Nav */}
      <div className="border-b-[3px] border-gold px-6 py-4 flex items-center justify-between">
        <Link to="/wrappers" className="font-body text-xs font-bold tracking-widest text-gold/60 hover:text-gold transition-colors">
          ← WRAPPERS & LOADERS
        </Link>
        <span className="font-body text-xs tracking-widest text-gold/40">LIVE DEMO</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="font-body text-xs font-bold tracking-[0.3em] text-gold mb-3">CVITAE STUDIO — LOADER</p>
          <h1 className="font-display text-6xl md:text-8xl leading-none mb-4">LOGO<br/>PARTICLE<br/>LOADER</h1>
          <p className="font-body text-base text-cream/60 max-w-lg">
            Your logo — any PNG or SVG — explodes into particles, disappears, and slowly rebuilds itself.
            Canvas 2D. Zero dependencies.
          </p>
        </div>

        {/* Demo original */}
        <div className="border-[3px] border-gold shadow-brutal-gold bg-black mb-10 flex flex-col items-center py-14 px-8 gap-8">
          <p className="font-body text-xs tracking-[0.3em] text-gold/40">LIVE DEMO — CVITAE STUDIO LOGO</p>
          <LogoParticleLoader logoSrc="/logo-light.svg" width={420} height={110} particleSize={2} label="Loading..." autoPlay={true} />
          <p className="font-body text-xs text-cream/30 text-center max-w-xs">
            Watch the logo explode, vanish, then reconstruct particle by particle
          </p>
        </div>

        {/* Size variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[3px] border-gold/30 mb-10">
          {[
            { ps: 1, label: 'particleSize={1} — ultra fine' },
            { ps: 2, label: 'particleSize={2} — default' },
            { ps: 3, label: 'particleSize={3} — bold' },
          ].map((v, i) => (
            <div key={v.ps} className={`flex flex-col items-center gap-4 p-8 bg-black ${i < 2 ? 'border-b-[2px] md:border-b-0 md:border-r-[2px] border-gold/20' : ''}`}>
              <LogoParticleLoader logoSrc="/logo-light.svg" width={200} height={52} particleSize={v.ps} autoPlay={true} />
              <code className="font-mono text-xs text-gold/40 text-center">{v.label}</code>
            </div>
          ))}
        </div>

        {/* Code snippet */}
        <div className="border-[3px] border-gold/20 bg-black mb-10 p-6">
          <p className="font-body text-xs tracking-widest text-gold/50 mb-4">USAGE</p>
          <pre className="font-mono text-xs text-cream/70 overflow-x-auto leading-relaxed">{`import LogoParticleLoader from './components/LogoParticleLoader'

<LogoParticleLoader
  logoSrc="/your-logo.svg"    // PNG or SVG
  width={420}
  height={110}
  particleSize={2}            // 1 = ultra fine, 3 = bold
  label="Loading..."
/>`}</pre>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[3px] border-gold/20 mb-12">
          {[
            ['Any logo', 'PNG or SVG. Your brand, any color, any shape.'],
            ['Canvas 2D', 'Samples every pixel. Renders as crisp circles at any size.'],
            ['Disappears completely', 'Particles fade out before rebuilding — not just blur.'],
            ['Slow reassembly', 'Rebuild is intentionally slower than explosion — feels premium.'],
          ].map(([title, desc], i) => (
            <div key={title} className={`p-6 ${i % 2 === 0 ? 'border-r-[2px] border-gold/10' : ''} ${i < 2 ? 'border-b-[2px] border-gold/10' : ''}`}>
              <p className="font-display text-xl text-gold mb-1">{title}</p>
              <p className="font-body text-xs text-cream/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── TRY IT — YOUR LOGO ────────────────────────────────────────── */}
        <div className="border-[3px] border-gold mb-12">
          <div className="border-b-[3px] border-gold px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-4xl text-gold leading-none">TRY IT — YOUR LOGO</h2>
              <p className="font-body text-xs text-cream/40 mt-1">Subí tu logo PNG o SVG. Lo ves explotando en partículas antes de comprar.</p>
            </div>
            <span className="font-body text-xs text-gold/40 border-[2px] border-gold/40 px-3 py-1">FREE PREVIEW</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Controles */}
            <div className="p-8 border-b-[3px] md:border-b-0 md:border-r-[3px] border-gold/30 flex flex-col gap-6">

              {/* Logo upload */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">01 — YOUR LOGO</p>
                <input ref={fileInputRef} type="file" accept="image/png,image/svg+xml,image/jpeg" className="hidden" onChange={handleLogoUpload} />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border-[3px] border-gold/50 bg-black font-body font-bold text-xs tracking-widest text-gold/70 hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                  {userLogoSrc ? 'CHANGE LOGO' : 'UPLOAD YOUR LOGO'}
                </button>
                {!userLogoSrc && (
                  <p className="font-body text-xs text-cream/30 mt-2">Sin logo — usando el nuestro como demo</p>
                )}
                {userLogoSrc && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={userLogoSrc} alt="Your logo" className="h-8 object-contain" style={{ filter: 'invert(1)' }} />
                    <button onClick={() => { setUserLogoSrc(null); setLoaderKey(k => k+1) }} className="font-body text-xs text-cream/30 hover:text-cream/60">remove</button>
                  </div>
                )}
              </div>

              {/* Particle Size */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">02 — PARTICLE SIZE</p>
                <div className="flex gap-0">
                  {[1,2,3,4].map(ps => (
                    <button key={ps} onClick={() => { setParticleSize(ps); setLoaderKey(k => k+1) }}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-mono text-xs font-bold transition-none
                        ${particleSize === ps ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}
                    >
                      {ps}
                    </button>
                  ))}
                </div>
                <p className="font-body text-xs text-cream/30 mt-1">
                  {particleSize === 1 ? 'Ultra fine — más partículas, más detalle' :
                   particleSize === 2 ? 'Default — el balance perfecto' :
                   particleSize === 3 ? 'Bold — impacto visual fuerte' :
                   'Extra bold — para logos grandes'}
                </p>
              </div>

              {/* Canvas size */}
              <div>
                <p className="font-body text-xs font-bold tracking-widest text-gold/60 mb-3">03 — CANVAS SIZE</p>
                <div className="flex gap-0">
                  {[
                    { label: 'SM', w: 200, h: 60 },
                    { label: 'MD', w: 340, h: 90 },
                    { label: 'LG', w: 420, h: 110 },
                  ].map(s => (
                    <button key={s.label}
                      onClick={() => { setCanvasW(s.w); setCanvasH(s.h); setLoaderKey(k => k+1) }}
                      className={`flex-1 py-2 border-[2px] border-gold/40 -ml-[2px] first:ml-0 font-body text-xs font-bold tracking-wide transition-none
                        ${canvasW === s.w ? 'bg-gold text-black border-gold' : 'bg-black text-gold/60 hover:text-gold'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview en vivo */}
            <div className="p-8 flex flex-col items-center justify-center gap-6 bg-black min-h-[240px]">
              <p className="font-body text-xs tracking-widest text-gold/30">LIVE PREVIEW</p>
              <LogoParticleLoader
                key={loaderKey}
                logoSrc={activeLogo}
                width={canvasW}
                height={canvasH}
                particleSize={particleSize}
                label="Loading..."
                autoPlay={true}
              />
              {userLogoSrc && (
                <p className="font-body text-xs text-gold/30 text-center max-w-xs">
                  Eso es tu logo. Explotando en {canvasW * canvasH / (particleSize * particleSize * 4)}+ partículas.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-[3px] border-gold bg-gold/10 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-3xl text-gold">$12 USD</p>
            <p className="font-body text-sm text-cream/60 mt-1">One-time. Use in unlimited projects.</p>
          </div>
          <div className="flex gap-0">
            <a
              href="https://wa.me/595992954169"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gold text-black border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-cream transition-colors"
            >
              BUY NOW
            </a>
            <Link
              to="/wrappers"
              className="-ml-[3px] px-6 py-3 bg-black text-gold border-[3px] border-gold font-body font-bold text-sm tracking-wide hover:bg-gold/10 transition-colors"
            >
              BACK TO STORE
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Task 8: Build final y verificación

- [ ] **Step 1: Build de producción sin errores**

```bash
cd /c/Users/isaso/Documents/cvitae-studio && npm run build 2>&1 | tail -20
```
Esperado: `✓ built in X.XXs`

- [ ] **Step 2: Verificar las tres páginas en dev**

```bash
cd /c/Users/isaso/Documents/cvitae-studio && npm run dev
```

Probar manualmente:
- `localhost:5173/generators/empty-state` → ver que las escenas son animadas (no íconos estáticos), que "Scan Screenshot" sube imagen y muestra swatches, que los swatches aplican al preview
- `localhost:5173/demo/filestack` → bajar al final, subir logo PNG, ver que aparece dentro del box con opacidad baja
- `localhost:5173/demo/particle` → bajar al final, subir logo PNG/SVG, ver que explota en partículas con el logo del usuario

---

## Self-Review

**Spec coverage:**
- ✅ 16 escenas CSS únicas — cada una diferente, con personalidad (no ícono genérico)
- ✅ Escenas respetan primaryColor del usuario y el estilo elegido
- ✅ Screenshot upload → Canvas API → swatches de colores reales de su app
- ✅ Swatches clickeables que aplican el color al generador en tiempo real
- ✅ Color picker manual sigue disponible (no se reemplaza)
- ✅ FileStack: logo del usuario dentro del cuadro, Dr. Filo intacto
- ✅ Logo Particle: logo del usuario reemplaza el demo, explota en tiempo real
- ✅ Ambos demos: sección "TRY IT — YOUR BRAND/LOGO" al final, sección original intacta arriba
- ✅ Sin dependencias nuevas
- ✅ Build limpio verificado al final

**Placeholder scan:** Ninguno — código completo en cada step.

**Type consistency:** `boxLogoSrc` definido en Task 5 Step 1, usado en Task 5 Step 2 y en Task 6. `loaderKey` usado para forzar re-mount en Task 7. Consistente.
