import { Award, Star, MapPin, Instagram } from "lucide-react";

const items = [
  { icon: Award, value: "100+", label: "Alunos Formados" },
  { icon: Star, value: "★★★★★", label: "Clientes Satisfeitas" },
  { icon: MapPin, value: "Vitória - ES", label: "Referência em Tranças" },
  { icon: Instagram, value: "+6 mil", label: "Seguidores no Instagram" },
];

export function CredibilityBar() {
  return (
    <section className="relative -mt-16 md:-mt-24">
      <div className="mx-auto grid w-[min(1400px,92%)] grid-cols-2 gap-3 rounded-3xl glass-card p-4 shadow-luxe md:grid-cols-4 md:gap-6 md:p-8">
        {items.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl bg-white/60 p-4 backdrop-blur md:flex-col md:items-start md:gap-2"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-xl font-semibold text-foreground md:text-2xl">
                {value}
              </div>
              <div className="text-xs font-medium text-muted-foreground md:text-sm">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}