import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { ADDRESS, MAPS_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/whatsapp";

export function Location() {
  return (
    <section id="contato" className="py-24 md:py-32">
      <div className="mx-auto w-[min(1400px,92%)]">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-button text-xs font-bold uppercase tracking-widest text-primary">Localização</span>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-foreground md:text-5xl">
            Venha nos <em className="font-normal italic text-brand-gradient">visitar</em>.
          </h2>
        </div>
        <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-border bg-background shadow-sm md:grid-cols-2">
          <div className="p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white"><MapPin className="h-5 w-5" /></div>
                <div>
                  <div className="font-display text-lg font-semibold text-foreground">Endereço</div>
                  <div className="mt-1 text-muted-foreground">{ADDRESS.street}<br />{ADDRESS.district} — {ADDRESS.city}<br />CEP {ADDRESS.zip}</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white"><Phone className="h-5 w-5" /></div>
                <div>
                  <div className="font-display text-lg font-semibold text-foreground">Telefone</div>
                  <a href="tel:+5527996045253" className="mt-1 block text-muted-foreground hover:text-primary">{WHATSAPP_DISPLAY}</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white"><Clock className="h-5 w-5" /></div>
                <div>
                  <div className="font-display text-lg font-semibold text-foreground">Horário</div>
                  <div className="mt-1 text-muted-foreground">Segunda à Sábado<br />09h às 18h</div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-button text-sm font-bold text-foreground hover:bg-secondary"><ExternalLink className="h-4 w-4" /> Google Maps</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-3 font-button text-sm font-bold text-white">WhatsApp</a>
            </div>
          </div>
          <div className="min-h-[320px] md:min-h-full">
            <iframe title="Mapa Emili Braids" src="https://www.google.com/maps?q=Rodovia+Serafim+Derenzi+3876+Vitoria+ES&output=embed" className="h-full min-h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}