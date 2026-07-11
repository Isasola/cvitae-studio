import { useState, useEffect } from 'react'
import ControlPanel from '../../components/generators/ControlPanel.jsx'
import PreviewCanvas from '../../components/generators/PreviewCanvas.jsx'
import ExportModal from '../../components/generators/ExportModal.jsx'
import ColorExtractor from '../../components/generators/ColorExtractor.jsx'
import { STATES } from '../../components/generators/emptyStateConfig.js'

const DEFAULT_CONFIG = {
  stateId:     'no-data',
  style:       'neobrutalism',
  animationId: 'float',
  buttonId:    'create',
  primaryColor:'#111111',
  title:       'Nothing here yet',
  desc:        'Add your first record to get started.',
  framework:   'react',
}

export default function EmptyStateGenerator() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [showModal, setShowModal] = useState(false)
  const [titleEdited, setTitleEdited] = useState(false)
  const [descEdited, setDescEdited] = useState(false)

  function onChange(key, value) {
    if (key === 'title') setTitleEdited(true)
    if (key === 'desc') setDescEdited(true)

    setConfig(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'stateId') {
        const preset = STATES.find(s => s.id === value)
        if (preset) {
          if (!titleEdited) next.title = preset.title
          if (!descEdited) next.desc = preset.desc
        }
      }
      return next
    })
  }

  useEffect(() => {
    function onRandomize(e) {
      const { stateId, style, animationId } = e.detail
      const preset = STATES.find(s => s.id === stateId)
      setConfig(prev => ({
        ...prev,
        stateId,
        style,
        animationId,
        title: preset?.title || prev.title,
        desc:  preset?.desc  || prev.desc,
      }))
      setTitleEdited(false)
      setDescEdited(false)
    }
    window.addEventListener('generator:randomize', onRandomize)
    return () => window.removeEventListener('generator:randomize', onRandomize)
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Hero */}
      <section className="mb-12">
        <div className="border-[3px] border-black p-8 shadow-brutal">
          <p className="font-body text-sm font-bold tracking-[0.3em] mb-3 text-gold">FREE TOOL</p>
          <h1 className="font-display text-6xl md:text-8xl leading-none tracking-tight mb-4">
            EMPTY STATE<br />
            <span className="text-gold">GENERATOR</span>
          </h1>
          <p className="font-body text-base max-w-xl leading-relaxed">
            Configurá el estado vacío de tu app en segundos. Elegí el tipo, el estilo, la animación. Descargá el componente listo para pegar.
          </p>
          <div className="mt-4 flex flex-wrap gap-0">
            {['React', 'Vue', 'Next.js', 'HTML'].map(f => (
              <span key={f} className="-ml-[2px] first:ml-0 px-3 py-1 border-[2px] border-black font-body text-xs font-bold tracking-wide">
                {f}
              </span>
            ))}
            <span className="-ml-[2px] px-3 py-1 border-[2px] border-black bg-gold font-body text-xs font-bold tracking-wide">
              16 STATES
            </span>
          </div>
        </div>
      </section>

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-[3px] border-black">
        {/* Panel izquierdo — controles */}
        <div className="p-6 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black overflow-y-auto max-h-[820px]">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display text-2xl tracking-widest">CONFIGURE</h2>
            <div className="flex-1 h-[3px] bg-black" />
          </div>

          {/* Match Your Brand */}
          <div className="mb-6 pb-6 border-b-[3px] border-black">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display text-base tracking-widest">MATCH YOUR BRAND</span>
              <div className="flex-1 h-[2px] bg-black/20" />
            </div>
            <ColorExtractor onColorSelect={(color) => onChange('primaryColor', color)} />
          </div>

          <ControlPanel config={config} onChange={onChange} />
        </div>

        {/* Panel derecho — preview */}
        <div className="p-6 flex flex-col">
          <PreviewCanvas config={config} onExport={() => setShowModal(true)} />
        </div>
      </div>

      {/* Sección educativa */}
      <section className="mt-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="font-display text-3xl tracking-widest">HOW IT WORKS</h2>
          <div className="flex-1 h-[3px] bg-black" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            {
              num: '01',
              title: 'CONFIGURE',
              body: 'Elegí el tipo de estado, el estilo visual que mejor encaje con tu app y la animación. Personalizá el texto y el color primario.',
            },
            {
              num: '02',
              title: 'PREVIEW',
              body: 'Ves el componente en vivo. Podés cambiar cualquier opción y el preview se actualiza al instante. Usá 🎲 para ver variaciones.',
            },
            {
              num: '03',
              title: 'EXPORT',
              body: 'Comprás una vez ($12) y descargás el componente en React, Vue, Next.js o HTML. Todo incluido: animaciones, clases y variantes.',
            },
          ].map((step) => (
            <div key={step.num} className="border-[3px] border-black p-6 -mt-[3px] -ml-[3px] first:mt-0 first:ml-0">
              <span className="font-display text-5xl text-gold leading-none">{step.num}</span>
              <h3 className="font-display text-2xl tracking-widest mt-2 mb-3">{step.title}</h3>
              <p className="font-body text-sm leading-relaxed text-black/70">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Por qué importa */}
      <section className="mt-16">
        <div className="border-[3px] border-black p-8 shadow-brutal">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display text-3xl tracking-widest">WHY THIS EXISTS</h2>
            <div className="flex-1 h-[3px] bg-black" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="font-body text-sm leading-relaxed text-black/70 mb-4">
                Cuando alguien construye una app con Claude Code o Cursor, en una tarde ya tiene login, dashboard y base de datos funcionando. Pero cuando entra a una tabla vacía... aparece esto:
              </p>
              <div className="border-[3px] border-black p-4 bg-black/5 font-mono text-sm text-black/40 italic">
                No data
              </div>
              <p className="font-body text-sm leading-relaxed text-black/70 mt-4">
                Eso hace que la aplicación parezca sin terminar. Un SaaS tiene decenas de estados así.
              </p>
            </div>
            <div>
              <p className="font-body text-sm leading-relaxed text-black/70 mb-4">
                Los estados vacíos son el momento donde el usuario decide si confía en tu producto o no. Una pantalla vacía sin contexto comunica abandono. Un estado vacío bien diseñado comunica que el producto está terminado.
              </p>
              <div className="grid grid-cols-2 gap-0">
                {['No Data','Search Empty','Error','Offline','Unauthorized','First Use','Maintenance','AI Waiting'].map(s => (
                  <div key={s} className="border-[2px] border-black px-3 py-1.5 -mt-[2px] -ml-[2px] font-body text-xs font-semibold">
                    {s}
                  </div>
                ))}
              </div>
              <p className="font-body text-xs text-black/40 mt-2">+ 8 más incluidos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Para quién sí / no */}
      <section className="mt-12">
        <div className="border-[3px] border-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-6 border-b-[3px] md:border-b-0 md:border-r-[3px] border-black">
              <p className="font-display text-xl mb-4 tracking-widest">MADE FOR YOU IF...</p>
              {[
                'Trabajás con React, Next.js o Vue — con o sin IA',
                'Tu app tiene tablas, listas o secciones que pueden estar vacías',
                'Querés que tu producto se vea terminado y profesional',
                'Preferís copiar un componente listo que construirlo desde cero',
              ].map(t => (
                <div key={t} className="flex items-start gap-2 mb-2">
                  <span className="text-gold font-bold text-sm mt-0.5">✓</span>
                  <p className="font-body text-sm text-black/70">{t}</p>
                </div>
              ))}
            </div>
            <div className="p-6">
              <p className="font-display text-xl text-black/30 mb-4 tracking-widest">NOT COMPATIBLE WITH</p>
              {[
                'WordPress, Shopify, Squarespace, Wix',
                'Constructores no-code o low-code',
                'Proyectos sin entorno JavaScript moderno',
              ].map(t => (
                <div key={t} className="flex items-start gap-2 mb-2">
                  <span className="text-black/30 font-bold text-sm mt-0.5">✗</span>
                  <p className="font-body text-sm text-black/30">{t}</p>
                </div>
              ))}
              <p className="font-body text-xs text-black/30 mt-4 leading-relaxed">
                Es un componente React puro — no un plugin ni un widget visual. Si no usás JS moderno, este generador no es para vos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo aplicarlo */}
      <section className="mt-8 mb-16">
        <div className="border-[3px] border-black">
          <div className="px-8 py-5 border-b-[3px] border-black">
            <h2 className="font-display text-3xl tracking-widest leading-none">HOW TO USE IT</h2>
            <p className="font-body text-xs text-black/40 mt-1">Tres pasos. Tu componente en producción en menos de 2 minutos — seas dev experimentado o estés construyendo con IA.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                num: '01',
                title: 'COMPRÁS',
                body: 'Recibís un ZIP con el archivo EmptyState.jsx y todas sus variantes — 16 estados, 8 estilos, animaciones incluidas.',
                code: null,
              },
              {
                num: '02',
                title: 'COPIÁS',
                body: 'Extraés el archivo y lo copiás dentro de la carpeta components de tu proyecto. Nada más.',
                code: 'tu-proyecto/\n  src/\n    components/\n      EmptyState.jsx  ← acá',
              },
              {
                num: '03',
                title: 'USÁS',
                body: 'Lo importás donde lo necesitás. Tu IA (Cursor, Claude) lo adapta a tu estilo en segundos.',
                code: "import EmptyState\n  from './components/EmptyState'\n\n// En tu tabla vacía:\n<EmptyState\n  type=\"no-data\"\n  style=\"minimal\"\n  title=\"Nothing here yet\"\n  button=\"create\"\n/>",
              },
            ].map((step, i) => (
              <div key={step.num} className={`p-6 ${i < 2 ? 'border-b-[2px] md:border-b-0 md:border-r-[2px] border-black/10' : ''}`}>
                <span className="font-display text-4xl text-gold leading-none">{step.num}</span>
                <h3 className="font-display text-xl tracking-widest mt-1 mb-2">{step.title}</h3>
                <p className="font-body text-xs text-black/60 leading-relaxed mb-3">{step.body}</p>
                {step.code && (
                  <pre className="font-mono text-[10px] text-black/50 bg-black/5 border-[2px] border-black/10 p-3 leading-relaxed overflow-x-auto">{step.code}</pre>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {showModal && (
        <ExportModal config={config} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
