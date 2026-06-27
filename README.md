# Vila Pixel Top-Down

Jogo 2D top-down em estilo RPG antigo, feito com HTML, CSS e JavaScript puro usando Canvas 2D.
O visual usa uma arte original inspirada em RPGs pixel art coloridos, com contornos fortes e sprites desenhados no proprio Canvas.

## Como executar

1. Abra a pasta do projeto no VS Code.
2. Instale a extensao **Live Server**, se ainda nao tiver.
3. Clique com o botao direito em `index.html`.
4. Escolha **Open with Live Server**.

Tambem funciona abrindo `index.html` direto no navegador, mas o Live Server deixa o fluxo de desenvolvimento mais confortavel.

## Publicar

### GitHub Pages

1. Envie estes arquivos para um repositorio no GitHub: `index.html`, `styles.css`, `app.js`, `README.md`, `.nojekyll` e `netlify.toml`.
2. No GitHub, abra **Settings > Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/root`.
5. Salve e aguarde o link do GitHub Pages.

### Netlify

1. Acesse Netlify e escolha **Add new site > Import an existing project**.
2. Conecte o repositorio do GitHub.
3. Use estas configuracoes:
   - Build command: vazio
   - Publish directory: `.`
4. Publique o site.

O projeto nao usa banco de dados, servidor, bibliotecas externas nem etapa de build.
Arquivos de deploy incluidos: `.nojekyll` para GitHub Pages e `netlify.toml` para Netlify.

## Controles

- `W A S D` ou setas do teclado: mover personagem
- `E`: interagir com placas e NPCs
- `E` perto do portal: entrar ou sair da Dimensao Cristalina
- `Espaco`: atacar na direcao em que o personagem esta olhando
- `Q`: lancar Bola de Fogo
- `R`: usar Dash
- `F`: usar Onda de Choque
- `C`: usar Cura Rapida
- `I`: abrir ou fechar inventario
- `U`: usar pocao para recuperar vida
- Botao **Salvar Jogo**: salva progresso no navegador usando `localStorage`
- Botao **Reiniciar posicao**: volta o personagem para o ponto inicial

No celular:

- Direcional virtual no canto inferior esquerdo: mover
- Botao **Acao**: interagir, igual a tecla `E`
- Botao **Ataque**: atacar, igual a tecla `Espaco`
- Botao **Inv**: abrir inventario, igual a tecla `I`
- Botoes **Q/R/F/C**: usar Bola de Fogo, Dash, Onda de Choque e Cura Rapida

## Portal e Dimensao Cristalina

Na vila principal, procure o portal brilhante perto da praca e da placa **PORTAL NOVO**.
Chegue perto dele e aperte `E`. No celular, toque no botao **Acao**.

Dentro da **Dimensao Cristalina**:

- Fale com o NPC **Orion** para iniciar a missao.
- Ative os 3 cristais magicos apertando `E` perto deles.
- O HUD mostra `Cristais ativados: 0/3`.
- Depois dos 3 cristais, uma ponte secreta aparece ao norte.
- No final da passagem existe um bau especial com moedas, pocao, espada rara e aumento de vida.
- Use o portal da dimensao para voltar para a vila.

O progresso da dimensao tambem e salvo no navegador com `localStorage`: entrada na dimensao, cristais ativados, ponte aberta, bau aberto e missao concluida.

## Mapa Expandido e Combate

O mapa principal foi aumentado e ganhou novas regioes conectadas por caminhos:

- Floresta profunda e cemiterio abandonado: ficam no sudoeste do mapa.
- Ruinas antigas: ficam no nordeste.
- Lago maior: fica a leste da vila.
- Campo aberto: fica no leste/sudeste.
- Arena de treino e area de monstros fortes: ficam no sudeste.
- Caminho secreto: fica ao sul, seguindo as pedras e placas.

Perto da praca principal existe a placa **MAPA EXPANDIDO** e um caminho novo saindo para o sul.

Power-ups espalhados pelo mapa:

- Bota azul: velocidade por 10 segundos, perto da praca e no campo aberto.
- Espada vermelha: forca por 10 segundos, nas ruinas e na area perigosa.
- Escudo dourado: escudo por 10 segundos, na arena e no cemiterio.
- Coracao verde: regeneracao por 8 segundos, no cemiterio e perto do campo.
- Orbe roxo: recupera mana, no caminho secreto e perto do lago maior.

O combate agora tem mana, cooldowns e inimigos mais inteligentes. Slimes vermelhos, golems, magos sombrios e o Guardiao das Ruinas perseguem o jogador, tomam knockback, piscam ao receber dano e podem dropar pocao ou power-up.

Para testar o combate novo:

1. Saia da praca pelo caminho novo ao sul.
2. Colete um power-up.
3. Use `Espaco` para ataque basico.
4. Use `Q`, `R`, `F` e `C` para testar os poderes.
5. Va ate as ruinas ou area perigosa para enfrentar inimigos fortes.
6. Derrote o Guardiao das Ruinas na arena e abra o bau raro.
7. Salve o jogo, volte para a tela inicial e use **Continuar**.

## O que foi implementado

- Personagem no centro da tela com camera seguindo
- Movimento em oito direcoes com teclado
- Mapa de vila com grama, caminhos, casas, arvores, cercas, placas e agua
- Mapa grande com areas diferentes: vila principal, loja, casa do jogador, parque, portal, floresta, praca, lago e area secreta
- Mapa principal expandido com floresta profunda, ruinas, campo aberto, cemiterio, lago maior, arena, area perigosa e caminho secreto
- Flores e pedras decorativas espalhadas pelo cenario
- Colisao com casas, arvores, cercas, placas, NPCs e agua
- Animacao simples de caminhada
- Sistema de dialogo ao apertar `E`
- Sistema de missao: Nico pede 3 cristais, o jogador coleta e recebe recompensa
- Missoes extras: chave perdida, monstros na floresta e entrega de carta
- Inventario com tecla `I`, itens coletaveis e quantidades
- Loja com vendedor, compra de pocao usando moedas e moedas no HUD
- Sistema de vida com 5 coracoes, pocoes e tela de Game Over
- Inimigos simples: slimes na floresta e morcego perto da caverna
- Ataque com `Espaco`, dano em inimigos e recompensa em moedas
- Mana, barra de mana e poderes especiais com cooldown
- Power-ups temporarios de velocidade, forca, escudo e regeneracao
- Orbe de mana para recarregar poderes
- Combate melhorado com preparacao, recuperacao, knockback, invulnerabilidade, hitstop e textos de dano
- Novos inimigos: slime vermelho, golem de pedra, mago sombrio e boss Guardiao das Ruinas
- Drops de inimigos com moedas, pocoes e power-ups
- Bau raro liberado ao derrotar o boss
- Tela inicial com Jogar, Continuar, Como Jogar e Creditos
- Sistema de salvar/continuar com `localStorage`
- Mini mapa com jogador, casas, lago e NPCs importantes
- Suporte para celular com Canvas responsivo e controles touch
- Efeitos sonoros e musica simples com Web Audio API, sem arquivos externos
- Transicao entre mapas: casa do jogador, loja e casa do prefeito tem interiores proprios
- Portal magico funcional que leva para a Dimensao Cristalina
- Nova dimensao com chao roxo, agua magica, cristais, arvores estranhas, pedras flutuantes e particulas
- Missao da dimensao com 3 cristais ativaveis, ponte secreta e bau especial
- Sons de portal, cristal e bau usando Web Audio API
- HUD com nome do personagem e posicao X/Y
- HUD com progresso da missao
- Codigo separado em `index.html`, `styles.css` e `app.js`

## Estrutura

- `index.html`: estrutura da pagina e elementos da interface
- `styles.css`: visual da pagina, HUD e caixa de dialogo
- `app.js`: logica do jogo, mapa, desenho no Canvas, movimento e colisoes
