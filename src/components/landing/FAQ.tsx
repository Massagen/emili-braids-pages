import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Quanto tempo dura uma trança?", a: "Em média, de 2 a 3 meses, dependendo do tipo escolhido, dos cuidados diários e da manutenção regular." },
  { q: "Como faço manutenção?", a: "Recomendamos manutenção a cada 30 dias no salão, com hidratação e retoque da raiz." },
  { q: "Posso lavar o cabelo normalmente?", a: "Sim! Orientamos como lavar em casa preservando as tranças, com produtos indicados para prolongar a durabilidade." },
  { q: "Como faço para agendar?", a: "Basta clicar em qualquer botão de WhatsApp da página. Retornamos o contato em minutos." },
  { q: "Vocês aceitam cartão?", a: "Sim, aceitamos cartões de débito, crédito, Pix e dinheiro." },
  { q: "Quanto tempo leva um atendimento?", a: "Depende do serviço: box braids podem levar de 4 a 8h; cachos e manutenções são mais rápidos." },
];

export function FAQ() {
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto w-[min(1000px,92%)]">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 font-button text-xs font-bold uppercase tracking-widest text-primary">FAQ</span>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Perguntas <em className="font-normal italic text-brand-gradient">frequentes</em>.
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="overflow-hidden rounded-2xl border border-border bg-background px-6 shadow-sm">
              <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold text-foreground hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}