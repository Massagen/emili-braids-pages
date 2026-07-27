import cursoImg from "@/assets/service-curso.jpg";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { CheckCircle2 } from "lucide-react";

const perks = ["Formação prática presencial","Certificado de conclusão","Suporte pós-curso","Workshops exclusivos","Turmas reduzidas","Material didático incluso"];

export function Courses() {
  return (
    <section id="cursos" className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto grid w-[min(1400px,92%)] items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-brand-gradient opacity-20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-luxe">
            <img src={cursoImg} alt="Turma do curso de tranças da Emili Braids" loading="lazy" width={1000} height={1200} className="h-full w-full object-cover" />
          </div>
        </div>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 font-button text-xs font-bold uppercase tracking-widest text-primary">Cursos & Workshops</span>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Aprenda técnicas <em className="font-normal italic text-brand-gradient">profissionais</em> e viva de tranças.
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Torne-se uma trancista completa com o método Emili Braids: mais de 100 alunas já transformaram carreiras através dos nossos cursos presenciais e workshops.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />{p}
              </li>
            ))}
          </ul>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-4 font-button text-sm font-bold text-white shadow-md transition-transform hover:scale-105">
            Quero saber mais
          </a>
        </div>
      </div>
    </section>
  );
}