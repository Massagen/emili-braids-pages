import aboutImg from "@/assets/about.jpg";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { Sparkles } from "lucide-react";

export function About() {
  return (
    <section id="sobre" className="relative py-24 md:py-32">
      <div className="mx-auto grid w-[min(1400px,92%)] items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className="relative order-2 md:order-1">
          <div className="absolute -inset-6 rounded-[2rem] bg-brand-gradient opacity-20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-luxe">
            <img
              src={aboutImg}
              alt="Retrato profissional de Emili, especialista em tranças"
              loading="lazy"
              width={1000}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 rounded-2xl glass-card px-5 py-4 shadow-luxe md:-right-8">
            <div className="font-display text-3xl font-semibold text-brand-gradient">+100</div>
            <div className="text-xs font-medium text-muted-foreground">alunos formados</div>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-button text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Sobre Emili
          </span>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Beleza que revela a{" "}
            <em className="font-normal italic text-brand-gradient">mulher</em> por dentro de você.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Há mais de uma década transformando cabelos e histórias em Vitória, Emili é
              referência quando o assunto é tranças autorais, cachos definidos e uma experiência
              verdadeiramente personalizada.
            </p>
            <p>
              Cada atendimento nasce da escuta e da entrega — técnica precisa, produtos premium
              e um ambiente pensado para que você se sinta cuidada em cada detalhe. Mais do que
              cabelo, é autoestima que se veste.
            </p>
            <p>
              Especialista formada e formadora: já são mais de 100 alunas espalhadas pelo Brasil
              através dos cursos e workshops Emili Braids.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 font-button text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              Agendar Atendimento
            </a>
            <a
              href="#cursos"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 font-button text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              Conhecer Cursos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}