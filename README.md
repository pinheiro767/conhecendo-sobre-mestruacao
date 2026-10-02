# A Jornada da Cris — V4 Nítida

Esta versão corrige a nitidez da personagem: a tela inicial usa PNGs dedicados em 1x/2x (srcset), recortados do original e otimizados no tamanho real de exibição; os sprites de gameplay foram reprocessados para 2x da resolução CSS, com redimensionamento Lanczos e leve nitidez, e o cache do PWA foi atualizado para V4.

# A Jornada da Cris — versão imersiva

PWA educativo em 5 fases sobre dignidade menstrual.

## Melhorias desta versão
- fases mais longas, com câmera lateral e progressão contínua;
- plataformas em diferentes alturas;
- Cris anda, corre e pula usando os sprites fornecidos;
- obstáculos estáticos e germes móveis;
- 18 perguntas distribuídas em 5 fases;
- missão obrigatória em cada fase (estrelas + itens + perguntas);
- portal final bloqueado até a missão ser cumprida;
- recompensa própria ao concluir cada fase;
- NPCs: professora, amiga e atendente da farmácia;
- trilhas chiptune diferentes por fase e efeitos sonoros gerados no navegador;
- controles por teclado, toque e tablet;
- acessibilidade: alto contraste, redução de movimento, texto ampliável, legendas dos sons e modo assistido;
- progresso salvo localmente;
- funcionamento como PWA/offline após os arquivos serem carregados.

## Estrutura das fases
1. Quarto da Cris
2. Escola
3. Higiene e autocuidado (cenário de banheiro construído em CSS)
4. Caminho até a farmácia
5. Farmácia

## Publicar no GitHub Pages
1. Extraia o ZIP.
2. Envie **todo o conteúdo da pasta** para a raiz do repositório.
3. Em Settings > Pages, escolha a branch `main` e a pasta `/ (root)`.
4. Aguarde a publicação.

Não renomeie as pastas `assets`, `assets/items`, `assets/enemies` ou `assets/sprites`, pois o jogo usa esses caminhos.


## Versão 3 — PNGs em alta definição
Os sprites e itens desta versão foram refeitos diretamente a partir dos PNGs originais, sem ampliação artificial. Os recortes preservam a resolução nativa; a câmera é alinhada a pixels inteiros e os cenários mantêm a proporção original para evitar desfoque. O cache do PWA também foi versionado para forçar a atualização dos arquivos.
