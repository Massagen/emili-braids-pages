import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import boxBraids from "@/assets/service-box-braids.jpg";
import twist from "@/assets/service-twist.jpg";

const images = [
  { src: g1, alt: "Knotless box braids longas feitas na Emili Braids", h: "row-span-2" },
  { src: g2, alt: "Tranças nagô com desenho geométrico", h: "" },
  { src: g3, alt: "Twist senegalês em tom mel", h: "row-span-2" },
  { src: g4, alt: "Cachos naturais definidos e hidratados", h: "" },
  { src: boxBraids, alt: "Box braids clássica", h: "" },
  { src: g5, alt: "Ambiente acolhedor do atelier Emili Braids", h: "" },
  { src: twist, alt: "Twist elegante", h: "row-span-2" },
  { src: g6, alt: "Detalhe da textura das tranças com argolas douradas", h: "" },
];

export function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="galeria" className="py-24 md:py-32">
      <div className="mx-auto w-[min(1400px,92%)]">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-button text-xs font-bold uppercase tracking-widest text-primary">
              Galeria
            </span>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
              Momentos que{" "}
              <em className="font-normal italic text-brand-gradient">transformam</em>.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Uma seleção autoral de trabalhos realizados no atelier Emili Braids.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {images.map((img, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setActive(img.src)}
              className={`group relative overflow-hidden rounded-2xl md:rounded-3xl ${img.h}`}
              aria-label={`Ampliar ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl overflow-hidden border-0 bg-transparent p-0 shadow-none">
          {active ? (
            <img src={active} alt="" className="h-auto w-full rounded-2xl object-contain" />
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}