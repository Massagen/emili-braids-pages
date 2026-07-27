import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  { name: "Larissa M.", initials: "LM", text: "Nunca me senti tão bem cuidada. A Emili tem mãos de fada e o resultado ficou impecável. Já agendei a próxima!" },
  { name: "Camila R.", initials: "CR", text: "Ambiente lindo, atendimento perfeito e uma trança que durou muito mais do que eu esperava. Recomendo demais." },
  { name: "Beatriz S.", initials: "BS", text: "Fiz o curso e mudou minha vida profissional. A didática é excelente, super detalhada. Vale cada centavo!" },
  { name: "Ana P.", initials: "AP", text: "Saí do salão me sentindo outra mulher. É de longe a melhor trancista de Vitória, com toda certeza." },
  { name: "Juliana F.", initials: "JF", text: "Cuidado com o cabelo natural que eu nunca tinha visto. A Emili entende de verdade dos nossos fios." },
  { name: "Rafaela T.", initials: "RT", text: "Cachos definidos, saudáveis e brilhantes. Todo mês volto porque não confio em mais ninguém." },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto w-[min(1400px,92%)]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-button text-xs font-bold uppercase tracking-widest text-primary">
            Depoimentos
          </span>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Histórias que{" "}
            <em className="font-normal italic text-brand-gradient">emocionam</em>.
          </h2>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="mt-12">
          <CarouselContent className="-ml-4">
            {testimonials.map((t) => (
              <CarouselItem key={t.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <figure className="flex h-full flex-col rounded-3xl border border-border bg-background p-7 shadow-sm transition-shadow hover:shadow-luxe">
                  <div className="flex items-center gap-1 text-gold" aria-label="5 estrelas">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 font-display text-lg italic leading-relaxed text-foreground">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient font-button text-sm font-bold text-white">
                      {t.initials}
                    </span>
                    <span className="font-button text-sm font-bold text-foreground">{t.name}</span>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center gap-3">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}