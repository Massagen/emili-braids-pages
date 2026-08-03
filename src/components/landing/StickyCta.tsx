import { CalendarCheck, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { WHATSAPP_URL } from "@/lib/whatsapp";

/** Barra fixa de conversão no rodapé — visível apenas no mobile. */
export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur md:hidden">
      <div className="flex items-center gap-2">
        <Link
          to="/agendar"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-gradient px-4 py-3 font-button text-sm font-bold text-white shadow-md"
        >
          <CalendarCheck className="h-4 w-4" /> Agendar online
        </Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
