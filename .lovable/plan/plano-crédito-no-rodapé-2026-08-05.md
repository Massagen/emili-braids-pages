# Plano: Crédito no Rodapé

## Objetivo
Adicionar, no rodapé da landing page, a linha de crédito **"Desenvolvido Por Jessé Silva."** em cor amarela, com link clicável para o WhatsApp `62996560784`.

## Alteração proposta
- Arquivo: `src/components/landing/Footer.tsx`
- Abaixo da linha de copyright atual, inserir um parágrafo centralizado contendo o texto "Desenvolvido Por ", seguido de um link "Jessé Silva.".
- O link apontará para `https://wa.me/62996560784` e abrirá em nova aba.
- A cor do texto/link será amarela (`text-yellow-400`), mantendo o hover amarelo mais claro para feedback visual.
- Será adicionado `rel="noopener noreferrer"` e um `aria-label` acessível.

## Critério de aceite
- O crédito aparece no final do rodapé, centralizado, em amarelo.
- Clicar em "Jessé Silva." abre o WhatsApp do número informado em nova aba.
- Não quebra o layout responsivo existente.
