import { Menu, X } from "lucide-react";
import { useState } from "react";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const NAV = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#cursos", label: "Cursos" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 flex w-[min(1400px,94%)] items-center justify-between rounded-full glass-card px-5 py-3 shadow-luxe">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gradient font-display text-lg font-bold text-white">
            E
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Emili <span className="text-brand-gradient">Braids</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-brand-gradient px-5 py-2.5 font-button text-sm font-bold text-white shadow-md transition-transform hover:scale-105 md:inline-flex"
        >
          Agendar
        </a>
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="mx-auto mt-2 w-[min(1400px,94%)] rounded-3xl glass-card p-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-xl bg-brand-gradient px-4 py-3 text-center font-button text-sm font-bold text-white"
            >
              Agendar pelo WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}