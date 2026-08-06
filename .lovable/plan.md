# Voltar a paleta rosa / roxo / dourado

Trocar a identidade atual (marrom café + caramelo) de volta para a paleta original da Emili Braids: Rosa #FF2E8B, Roxo #9B3CFF, Dourado #D9B15A — aplicada de forma consistente em todas as seções.

## O que muda

- Tokens de cor globais: primária vira rosa, acentos em roxo, dourado nos detalhes. Fundos claros com leve tom rosado no lugar do nude/bege.
- Gradiente da marca (botões, badges, barra fixa, banners, títulos em destaque) volta a ser rosa → roxo.
- Sombras e brilhos (`shadow-luxe`, `glow-primary`, `pulse-glow`) recalibrados para rosa/roxo em vez de marrom.
- Modo escuro ajustado com as mesmas cores.
- Seções escuras (Diferenciais e Rodapé) mantêm fundo quase-preto, com acentos dourados/roxos.
- Hero: véu de gradiente volta a puxar para o roxo.
- Páginas de agendamento e painel herdam os tokens automaticamente; confiro que nenhum resquício marrom sobra.

## Detalhes técnicos

- `src/styles.css`: reescrever os valores oklch em `:root` e `.dark` (primary, secondary, accent, muted, border, ring, gold, plum) e as utilities `bg-brand-gradient`, `text-brand-gradient`, `glow-primary`, `shadow-luxe` e o keyframe `pulse-glow` usando #FF2E8B → #9B3CFF.
- Ajustes pontuais onde há cor fixa: `Hero.tsx` (`to-[#9B3CFF]/40`), `Differentials.tsx` e `Footer.tsx` (fundos escuros), preferindo tokens semânticos.
- Cores de marca de terceiros (WhatsApp #25D366, gradiente do Instagram) e o amarelo do crédito no rodapé permanecem.
- As imagens geradas não mudam.

## Verificação

Screenshots (desktop e mobile) da home, do agendamento e do painel para conferir contraste e ausência de tons marrons.