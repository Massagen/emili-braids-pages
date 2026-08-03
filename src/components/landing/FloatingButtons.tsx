import { useEffect, useState } from "react";
import { Instagram, ArrowUp } from "lucide-react";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/whatsapp";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .18 5.32.18 11.87c0 2.09.55 4.13 1.6 5.93L0 24l6.34-1.66a11.86 11.86 0 0 0 5.72 1.46c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.15-3.42-8.45ZM17.6 14.3c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15s-.78.98-.96 1.18c-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.5-.5-.68-.51l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.12 3.24 5.15 4.55.72.31 1.28.5 1.72.63.72.23 1.38.2 1.9.12.58-.08 1.79-.73 2.04-1.44.25-.7.25-1.31.18-1.44-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed bottom-[5.5rem] right-4 z-40 flex flex-col gap-3 md:bottom-5 md:right-5">
      {showTop ? (
        <button type="button" aria-label="Voltar ao topo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="grid h-11 w-11 place-items-center rounded-full bg-background text-foreground shadow-luxe transition-transform hover:scale-110"><ArrowUp className="h-5 w-5" /></button>
      ) : null}
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram Emili Braids" className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-luxe transition-transform hover:scale-110"><Instagram className="h-5 w-5" /></a>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Agendar pelo WhatsApp" className="hidden md:grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-luxe transition-transform hover:scale-110 animate-pulse-glow"><WhatsAppIcon className="h-7 w-7" /></a>
    </div>
  );
}