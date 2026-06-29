const WA_URL = 'https://wa.me/595992954169'

export default function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold border-[3px] border-black flex items-center justify-center hover:bg-black hover:text-cream transition-colors duration-100"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <rect x="3" y="3" width="18" height="18"/>
        <line x1="8" y1="12" x2="8.01" y2="12" strokeLinecap="round" strokeWidth="3"/>
        <line x1="12" y1="12" x2="12.01" y2="12" strokeLinecap="round" strokeWidth="3"/>
        <line x1="16" y1="12" x2="16.01" y2="12" strokeLinecap="round" strokeWidth="3"/>
        <path d="M6 20l2-4"/>
      </svg>
    </a>
  )
}
