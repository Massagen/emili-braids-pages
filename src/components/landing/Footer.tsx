import { Instagram, Facebook, MessageCircle, Phone, MapPin } from "lucide-react";
import { ADDRESS, INSTAGRAM_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-[#0d0d0d] py-16 text-white/80">
      <div className="mx-auto grid w-[min(1400px,92%)] gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient font-display text-lg font-bold text-white">E</span>
            <span className="font-display text-2xl font-semibold text-white">Emili <span className="text-brand-gradient">Braids</span></span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">Especialista em tranças, cachos e transformação feminina. Referência em beleza autoral em Vitória, Espírito Santo.</p>
          <div className="mt-6 flex gap-3">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"><Instagram className="h-5 w-5" /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"><Facebook className="h-5 w-5" /></a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"><MessageCircle className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <div className="font-display text-lg font-semibold text-white">Contato</div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-gold" /><a href={WHATSAPP_URL} className="hover:text-white">{WHATSAPP_DISPLAY}</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" /><span>{ADDRESS.street}<br />{ADDRESS.city}</span></li>
          </ul>
        </div>
        <div>
          <div className="font-display text-lg font-semibold text-white">Horário</div>
          <ul className="mt-4 space-y-2 text-sm text-white/70"><li>Segunda à Sábado</li><li>09h às 18h</li></ul>
        </div>
      </div>
      <div className="mx-auto mt-12 w-[min(1400px,92%)] border-t border-white/10 pt-6 text-center text-xs text-white/40">
        <p>© {new Date().getFullYear()} Emili Braids. Todos os direitos reservados.</p>
        <p className="mt-2 text-white/80">
          Desenvolvido Por{" "}
          <a
            href="https://wa.me/62996560784"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Desenvolvido por Jessé Silva"
            className="font-semibold text-yellow-400 underline hover:text-yellow-300"
          >
            Jessé Silva.
          </a>
        </p>
      </div>
    </footer>
  );
}