import {
  Heart,
  Sparkles,
  GraduationCap,
  Sofa,
  CalendarCheck,
  MapPin,
  Award,
  UserCheck,
} from "lucide-react";

const items = [
  { icon: Heart, title: "Atendimento Humanizado" },
  { icon: Sparkles, title: "Produtos Premium" },
  { icon: GraduationCap, title: "Técnicas Atualizadas" },
  { icon: Sofa, title: "Ambiente Confortável" },
  { icon: CalendarCheck, title: "Agendamento Fácil" },
  { icon: MapPin, title: "Excelente Localização" },
  { icon: Award, title: "+100 Alunos Formados" },
  { icon: UserCheck, title: "Atendimento Personalizado" },
];

export function Differentials() {
  return (
    <section className="bg-[#111111] py-24 text-white md:py-32">
      <div className="mx-auto w-[min(1400px,92%)]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-2 font-button text-xs font-bold uppercase tracking-widest text-gold">
            Diferenciais
          </span>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight md:text-5xl">
            O que faz Emili Braids ser{" "}
            <em className="font-normal italic text-gold">única</em>.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {items.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:-translate-y-1 hover:border-gold/40 hover:bg-white/10"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/15 text-gold ring-1 ring-gold/30">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}