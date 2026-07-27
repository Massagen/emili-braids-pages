import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient py-24 text-white md:py-32">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
      <div className="relative mx-auto w-[min(1000px,92%)] text-center">
        <h2 className="font-display text-5xl font-medium leading-[1.05] md:text-7xl">
          Pronta para viver uma <em className="font-normal italic text-gold">nova versão</em> de você?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">Agende seu horário agora mesmo e viva a experiência Emili Braids.</p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 font-button text-lg font-bold text-primary shadow-2xl transition-transform hover:scale-105 md:text-xl">
          <MessageCircle className="h-6 w-6" /> Agendar pelo WhatsApp
        </a>
      </div>
    </section>
  );
}