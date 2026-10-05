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


## Atualização v6
- Sprites de corrida substituídos por 12 novos quadros individuais enviados pela usuária.
- Caminhada atualizada para 5 quadros.
- Pulo atualizado para 6 quadros: preparação, impulso/subida, ápice, descida e aterrissagem.
- Fundo preto das imagens-fonte convertido em transparência para integração nos cenários.
- Cache do PWA atualizado para forçar o carregamento dos novos sprites.


## Vídeo de encerramento
Ao concluir a 5ª fase e abrir o resultado final, o jogo reproduz o vídeo de encerramento em `assets/video/video_final.mp4`, com controles e suporte a reprodução em celular. O arquivo também é incluído no cache offline do PWA.

## v8 — correção do vídeo final
- O vídeo de encerramento aparece **imediatamente** após concluir a 5ª fase, sem precisar clicar em “Ver resultado”.
- O vídeo fica no topo da tela final, com pôster e botão “Reproduzir vídeo final”.
- Cache do PWA atualizado para evitar que uma versão antiga esconda o vídeo.
