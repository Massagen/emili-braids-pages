import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const badges = [
  "Atendimento Personalizado",
  "Mais de 100 Alunos Formados",
  "Ambiente Confortável",
  "Resultado Impecável",
];

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Emili realizando atendimento de tranças em cliente"
        width={1600}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-[#9B3CFF]/40" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <div className="relative mx-auto flex min-h-[100svh] w-[min(1400px,92%)] flex-col justify-end pb-16 pt-32 md:justify-center md:pb-28">
        <div className="max-w-3xl animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full glass-card px-4 py-2 font-button text-xs font-bold uppercase tracking-widest text-white">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            Emili Braids — Vitória / ES
          </span>
          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Transforme seu visual com{" "}
            <em className="font-normal italic text-gold">tranças</em> que valorizam sua beleza.
          </h1>
          <p className="mt-6 max-w-xl text-base font-light text-white/85 sm:text-lg md:text-xl">
            Especialista em Tranças, Cachos, Cursos e Workshops em Vitória - ES.
            Uma experiência sensorial pensada para revelar a mulher que vive em você.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {badges.map((b) => (
              <li
                key={b}
                className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md sm:text-sm"
              >
                ✓ {b}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-4 font-button text-sm font-bold text-white animate-pulse-glow sm:text-base"
            >
              <MessageCircle className="h-5 w-5" />
              Agendar pelo WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-4 font-button text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/15 sm:text-base"
            >
              Ver Serviços
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}