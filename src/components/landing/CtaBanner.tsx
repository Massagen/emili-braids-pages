import { WHATSAPP_URL } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-[min(1400px,92%)]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient p-10 text-center text-white shadow-luxe md:p-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
          <h2 className="relative font-display text-4xl font-medium leading-tight md:text-6xl">
            Sua transformação começa <em className="font-normal italic text-gold">hoje</em>.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-white/90 md:text-lg">
            Reserve seu horário e viva uma experiência de beleza pensada nos mínimos detalhes.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-button text-base font-bold text-primary shadow-xl transition-transform hover:scale-105 md:text-lg">
            <MessageCircle className="h-5 w-5" />
            Agendar Agora
          </a>
        </div>
      </div>
    </section>
  );
}