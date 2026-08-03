import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
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
      <div className="mx-auto mt-3 grid w-[min(1400px,94%)] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-full glass-card px-4 py-2.5 shadow-luxe md:mt-4 md:grid-cols-[auto_1fr_auto] md:px-5 md:py-3">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gradient font-display text-lg font-bold text-white">
            E
          </span>
          <span className="truncate font-display text-base font-semibold tracking-tight text-foreground sm:text-lg">
            Emili <span className="text-brand-gradient">Braids</span>
          </span>
        </a>
        <nav className="hidden items-center justify-center gap-6 md:flex lg:gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="whitespace-nowrap text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/agendar"
            className="hidden whitespace-nowrap rounded-full bg-brand-gradient px-5 py-2.5 font-button text-sm font-bold text-white shadow-md transition-transform hover:scale-105 md:inline-flex"
          >
            Agendar
          </Link>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
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
            <Link
              to="/agendar"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-brand-gradient px-4 py-3 text-center font-button text-sm font-bold text-white"
            >
              Agendar online
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-border px-4 py-3 text-center font-button text-sm font-bold text-foreground"
            >
              Falar no WhatsApp
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
