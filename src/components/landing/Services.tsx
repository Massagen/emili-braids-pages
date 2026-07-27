import { ArrowUpRight } from "lucide-react";
import boxBraids from "@/assets/service-box-braids.jpg";
import nago from "@/assets/service-nago.jpg";
import twist from "@/assets/service-twist.jpg";
import crochet from "@/assets/service-crochet.jpg";
import cachos from "@/assets/service-cachos.jpg";
import manutencao from "@/assets/service-manutencao.jpg";
import curso from "@/assets/service-curso.jpg";
import workshop from "@/assets/service-workshop.jpg";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const services = [
  { img: boxBraids, title: "Box Braids", desc: "Tranças clássicas com acabamento impecável e proteção dos fios." },
  { img: nago, title: "Nagô", desc: "Trançados rentes com desenhos autorais e caimento perfeito." },
  { img: twist, title: "Twist", desc: "Torções sofisticadas com toque leve e visual moderno." },
  { img: crochet, title: "Crochet Braids", desc: "Volume, movimento e versatilidade em cada fio." },
  { img: cachos, title: "Cachos", desc: "Definição, hidratação e brilho para cachos saudáveis." },
  { img: manutencao, title: "Manutenção", desc: "Cuidado contínuo para prolongar sua trança com elegância." },
  { img: curso, title: "Cursos", desc: "Formação profissional presencial para novas trancistas." },
  { img: workshop, title: "Workshops", desc: "Imersões práticas com técnicas exclusivas Emili Braids." },
];

export function Services() {
  return (
    <section id="servicos" className="relative bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto w-[min(1400px,92%)]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 font-button text-xs font-bold uppercase tracking-widest text-primary">
            Serviços
          </span>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Um portfólio pensado para{" "}
            <em className="font-normal italic text-brand-gradient">cada tipo</em> de beleza.
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Do clássico ao autoral — encontre o serviço perfeito para sua próxima transformação.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <a
              key={s.title}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-background shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-luxe"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-foreground transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-2xl font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <span className="mt-4 inline-flex font-button text-xs font-bold uppercase tracking-widest text-primary">
                  Agendar →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}