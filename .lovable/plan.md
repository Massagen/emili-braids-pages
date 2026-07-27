# Landing Page Premium — Emili Braids

Landing page única (single page com âncoras) em TanStack Start, com identidade luxuosa, feminina e sofisticada, otimizada para conversão via WhatsApp.

## Identidade Visual

**Paleta (tokens em `src/styles.css`)**
- Rosa vibrante `#FF2E8B` (primary)
- Roxo `#9B3CFF` (secondary)
- Dourado `#D9B15A` (accent)
- Preto `#111111`, Cinza claro `#F8F8F8`, Branco `#FFFFFF`
- Gradientes: rosa→roxo (CTAs e fundo), dourado suave (detalhes)

**Tipografia (carregada via `<link>` no `__root.tsx`)**
- Títulos: Playfair Display
- Subtítulos/Texto: Poppins
- Botões: Montserrat

**Efeitos**
- Glassmorphism em cards selecionados
- Glow no CTA principal
- Sombras elegantes, bordas arredondadas (radius generoso)
- Muito whitespace, largura máx 1400px

## Estrutura da Página (`src/routes/index.tsx` substituindo o placeholder)

1. **Header fixo** — logo Emili Braids, navegação âncora (Sobre, Serviços, Galeria, Cursos, Contato), botão WhatsApp
2. **Hero fullscreen** — imagem gerada da profissional atendendo, overlay escuro + blur, headline "Transforme seu visual com tranças que valorizam sua beleza", subheadline, 4 selos com ✓, CTA "Agendar pelo WhatsApp" (glow) + "Ver Serviços"
3. **Barra de credibilidade** — 4 cards com ícones dourados (100+ alunos, ★★★★★, Referência ES, +6 mil seguidores) com contadores animados
4. **Sobre** — foto profissional + texto institucional em 2 colunas
5. **Serviços** — grid de 8 cards (Box Braids, Nagô, Twist, Crochet, Cachos, Manutenção, Cursos, Workshop) com imagem, hover zoom + elevação, CTA WhatsApp
6. **Galeria** — grid estilo masonry/Pinterest com lightbox (imagens geradas)
7. **Diferenciais** — 8 itens com ícones dourados Lucide
8. **Depoimentos** — carrossel de cards com foto, nome, 5 estrelas, texto
9. **CTA intermediário** — banner rosa "Sua transformação começa hoje" + botão gigante
10. **Cursos** — seção dedicada com imagem, benefícios (certificado, suporte, workshop), CTA
11. **Localização** — Google Maps embed (iframe simples, sem API key), endereço, telefone, botões Maps + WhatsApp
12. **FAQ** — accordion elegante (shadcn Accordion) com 6 perguntas
13. **CTA final** — fundo degradê rosa→roxo, headline, botão gigante WhatsApp
14. **Rodapé** — logo, redes sociais, contato, endereço, copyright
15. **Botões flutuantes** — WhatsApp (bottom-right), Instagram, voltar ao topo

## Conversão

Todos os CTAs abrem WhatsApp em nova aba:
```
https://wa.me/5527996045253?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Emili%20Braids%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.
```

## SEO (head do `index.tsx`)

- Title: "Emili Braids | Especialista em Tranças e Cachos em Vitória - ES"
- Meta description conforme brief
- Open Graph + Twitter card
- JSON-LD `HairSalon` (schema.org) com endereço, telefone, horário, geo
- H1 único no hero, alts descritivos, semântica correta

## Detalhes Técnicos

- Framework: TanStack Start já configurado (não introduzir Next.js apesar do brief pedir — explicar ao usuário que o stack é TanStack, funcionalmente equivalente)
- Animações: `tw-animate-css` já disponível + utilitários `animate-fade-in`, `hover-scale` + Intersection Observer leve para fade-up on scroll
- Ícones: `lucide-react`
- Accordion, Dialog (lightbox), Carousel: shadcn/ui
- Imagens: gerar 8-10 imagens premium com `imagegen` (hero, sobre, serviços, galeria) salvas em `src/assets/`
- Responsivo mobile-first, acessível (contraste AA, aria-labels, alt texts)
- Layout todo em componentes em `src/components/landing/`

## Nota sobre stack

O brief pede Next.js, mas o projeto é TanStack Start (React + TypeScript + Tailwind + Vite). Todo o resto (Framer Motion-like animations via Tailwind, Lucide, shadcn, SEO, Schema.org, responsivo, performance) será entregue igualmente. Confirmar apenas se quer prosseguir assim.
