# Eternal Rift

Jogo 2D top-down em estilo RPG antigo, feito com HTML, CSS e JavaScript puro usando Canvas 2D.
O visual usa uma arte original inspirada em RPGs pixel art coloridos, com contornos fortes e sprites desenhados no proprio Canvas.

Subtitulo: **A Jornada Entre Dimensoes**.

Criadores:

- Gabryel Garcia
- Victor Ricardo Fonseca Baldin

## Como executar

1. Abra a pasta do projeto no VS Code.
2. Instale a extensao **Live Server**, se ainda nao tiver.
3. Clique com o botao direito em `index.html`.
4. Escolha **Open with Live Server**.

Tambem funciona abrindo `index.html` direto no navegador, mas o Live Server deixa o fluxo de desenvolvimento mais confortavel.

## Testar no celular

1. Abra o projeto no VS Code com Live Server.
2. No PC, descubra seu IP local, por exemplo `192.168.0.10`.
3. No celular, use o mesmo Wi-Fi do PC.
4. Abra no navegador do celular: `http://IP-DO-PC:5500/index.html`.
5. Jogue de preferencia com o celular na horizontal.

Se a tela estiver pequena ou em pe, o jogo mostra o aviso **Vire o celular para jogar melhor**.

## Publicar

### GitHub Pages

1. Envie estes arquivos para um repositorio no GitHub: `index.html`, `styles.css`, `app.js`, `README.md`, `.nojekyll` e `netlify.toml`.
2. No GitHub, abra **Settings > Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/root`.
5. Salve e aguarde o link do GitHub Pages.

Para abrir direto no jogo, sem parar na tela inicial, use `?play=1` no fim do link.
Exemplo: `https://seu-usuario.github.io/seu-repositorio/?play=1`.

### Netlify

1. Acesse Netlify e escolha **Add new site > Import an existing project**.
2. Conecte o repositorio do GitHub.
3. Use estas configuracoes:
   - Build command: vazio
   - Publish directory: `.`
4. Publique o site.

O projeto nao usa banco de dados, servidor, bibliotecas externas nem etapa de build.
Arquivos de deploy incluidos: `.nojekyll` para GitHub Pages e `netlify.toml` para Netlify.

Link pronto para compartilhar no celular:

`https://gabryel19-lang.github.io/vila-pixel-top-down/?play=1`

## Controles

Na tela inicial, digite o nome do personagem no campo **Digite o nome do personagem**.
Se deixar vazio, o jogo usa o nome padrao **Upminaa**. O nome fica salvo junto com o progresso.

- `W A S D` ou setas do teclado: mover personagem
- `E`: interagir com placas e NPCs
- `E` perto do portal: entrar ou sair da Dimensao Cristalina
- Mouse: mirar
- Clique esquerdo: atacar com a arma atual
- Clique direito ou `Q`: usar o poder equipado
- `1`, `2`, `3`, `4`: equipar Bola de Fogo, Raio Azul, Onda de Choque ou Cura Magica
- `Tab`: trocar arma entre espada, arco, cajado e lanca
- `Espaco`: esquiva curta
- `R`: dash magico antigo, caso queira usar
- `I`: abrir ou fechar inventario
- `U`: usar pocao para recuperar vida
- `M`: abrir painel de missoes
- `C`: abrir painel de status
- `Esc`: abrir ou fechar menu
- `F3`: abrir debug com X/Y, FPS, cena, canvas, `isMobile` e ultimo erro
- Menu: salvar jogo, reiniciar posicao, ver missoes, status, inventario e ajuda

Progressao:

- Derrote inimigos para ganhar XP.
- Complete missoes, abra baus raros, ative cristais e explore areas novas para ganhar XP extra.
- O nivel maximo e 1000.
- A curva de XP usa `50 + nivel * nivel * 8`, ficando mais dificil aos poucos.
- Ao subir de nivel, o personagem ganha pontos, brilho visual e pequenas melhorias de vida, mana, defesa e dano.

No celular:

- Joystick analogico no canto inferior esquerdo: mover em 8 direcoes.
- Quanto mais longe do centro, maior a velocidade.
- Botao **Ataque**: ataca com a arma atual e usa auto-mira.
- Botao **Poder**: usa o poder equipado.
- Botao **Dash**: esquiva na direcao do joystick.
- Botao **E/Acao**: interagir com NPC, placa, bau, portal, cristal ou loja.
- Botao **Pocao**: usa uma pocao.
- Botao **Inv**: abre e fecha inventario.
- Botao **Arma**: troca entre espada, arco, cajado e lanca.
- Botoes **1/2/3/4**: escolhem Bola de Fogo, Raio Azul, Onda de Choque ou Cura Magica.
- Botao **Menu**: abre salvar, reiniciar, missoes, status, inventario e como jogar.
- Botao **Tela cheia**: tenta ativar fullscreen.
- Botao **Pausa**: abre menu com Continuar, Salvar, Reiniciar, Como jogar e Sair para menu.

No mobile, ataques e poderes de projetil miram automaticamente no inimigo mais proximo. Se tocar em um inimigo no canvas, a mira tenta travar naquele alvo.

Para abrir o diagnostico mobile, acesse o jogo com `?debug=1` no final da URL. O painel mostra tela, canvas, FPS, cena, `isMobile`, ultimo erro, joystick e botao pressionado.

## HUD novo

O HUD foi reorganizado para ocupar menos tela:

- Canto superior esquerdo: vida, mana e moedas.
- Centro superior: missao atual em uma frase curta.
- Canto superior direito: area atual, arma e poder equipado.
- Oxigenio aparece apenas quando a Lia esta nadando.
- X/Y saiu do HUD principal e aparece apenas no debug (`F3` ou `?debug=1`).
- Barra de boss aparece separada, apenas quando um boss esta perto ou em combate.
- Salvar e reiniciar foram movidos para o **Menu**.

Informacoes grandes ficam em paineis:

- `M` abre o painel completo de missoes.
- `C` abre o painel de status com vida, mana, defesa, critico, arma, poder e buffs.
- `Esc` abre o menu principal.
- `F3` abre ou fecha o debug.

O HUD tambem mostra:

- Nome do personagem e nivel atual.
- Barra de XP.
- XP atual e XP necessario para o proximo nivel.
- No nivel 1000, mostra `Nv. 1000 MAX`.

O painel de status (`C`) mostra nome, nivel, XP, vida maxima, mana maxima, dano base, defesa, bosses derrotados e missoes concluidas.

## Bolsa do Aventureiro

O inventario foi reorganizado como uma bolsa central em estilo pixel art.

- `I` abre e fecha a bolsa no PC.
- No celular, toque no botao **Inv**.
- O jogo pausa enquanto o inventario esta aberto.
- Existem 30 slots visiveis, abas por categoria e painel de detalhes.
- Abas: Tudo, Consumiveis, Armas, Materiais, Missao e Raros.
- Clique ou toque em uma arma para equipar.
- Clique ou toque em um poder para equipar no `Q`.
- Pocoes podem ser usadas pela bolsa quando a vida nao esta cheia.
- Itens de missao e itens raros aparecem com descricao, quantidade e raridade.
- A bolsa mostra moedas, pocoes, cristais, chaves, cartas, flechas, espadas, fragmentos, itens de boss, power-ups coletados, armas liberadas e poder equipado.

Raridades:

- Comum
- Incomum
- Raro
- Epico
- Lendario

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

O combate agora tem mira com mouse, quatro armas, mana, poderes equipaveis, cooldowns, projeteis do jogador e projeteis dos inimigos.

Armas:

- Espada curta: arco curto e rapido.
- Arco: dispara flechas e consome flechas do inventario.
- Cajado: dispara magia azul.
- Lanca: ataque em linha mais longo.

Poderes:

- `1` Bola de Fogo.
- `2` Raio Azul.
- `3` Onda de Choque.
- `4` Cura Magica.
- `Q` ou clique direito usa o poder equipado.

Inimigos novos:

- Slime Verde, Slime Vermelho, Slime Azul.
- Morcego, Aranha, Goblin, Arqueiro Goblin.
- Mago Sombrio, Golem de Pedra, Fantasma.
- Peixe Hostil e Mini Dragao.

Bosses:

- Rei Slime.
- Aranha Rainha.
- Golem Ancestral.
- Bruxo Sombrio.
- Serpente do Lago.

Os inimigos perseguem, patrulham, mantem distancia quando sao arqueiros/magos, fogem com pouca vida em alguns casos, evitam agua quando nao sabem nadar e nao atravessam casas, arvores ou paredes. Bosses mostram barra de vida no HUD e mudam de fase com pouca vida.

Loot:

- Inimigos podem soltar moedas, pocoes, flechas, fragmentos, orbes de mana, chave rara e itens de boss.
- O inventario mostra as quantidades coletadas.

Natacao:

- No Lago Maior, entre na agua para nadar.
- A velocidade diminui na agua.
- O HUD mostra oxigenio.
- Se o oxigenio acabar, a Lia perde vida.
- O power-up Respiracao Aquatica protege por alguns segundos.
- Flechas ficam mais lentas na agua, fogo apaga e magia continua funcionando.

Para testar o combate novo:

1. Perto da praca, procure a placa **TESTE DE COMBATE**.
2. Use o mouse para mirar.
3. Clique esquerdo para atacar.
4. Use `Tab` para trocar arma.
5. Use `1-4` para escolher um poder e `Q` para usar.
6. Use `Espaco` para esquivar.
7. Va ate a arena de treino no sudeste para enfrentar o Mini Guardiao.
8. Va ao Lago Maior no leste para testar natacao, oxigenio e inimigos aquaticos.
9. Salve o jogo, volte para a tela inicial e use **Continuar**.

No celular, a arena de teste mais rapida fica perto da placa **TESTE DE COMBATE**, ao sul/sudeste da praca principal. Ali da para testar joystick, auto-mira, ataque, poder, dash, troca de arma e selecao 1-4 sem andar muito.

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
- Inimigos simples e avancados espalhados por floresta, lago, ruinas, arena e caverna
- Ataque com clique esquerdo, dano em inimigos e recompensa em moedas
- Mana, barra de mana e poderes especiais com cooldown
- Mira com mouse, clique esquerdo para ataque e clique direito para poder equipado
- Armas trocaveis: espada, arco, cajado e lanca
- Poderes equipaveis: Bola de Fogo, Raio Azul, Onda de Choque e Cura Magica
- Power-ups temporarios de velocidade, forca, escudo e regeneracao
- Power-up de Respiracao Aquatica
- Orbe de mana para recarregar poderes
- Combate melhorado com preparacao, recuperacao, knockback, invulnerabilidade, hitstop e textos de dano
- Sistema de critico, defesa e resistencia elemental
- Novos inimigos: 3 slimes, morcego, aranha, goblin, arqueiro goblin, mago sombrio, golem, fantasma, peixe hostil e mini dragao
- Cinco bosses: Rei Slime, Aranha Rainha, Golem Ancestral, Bruxo Sombrio e Serpente do Lago
- Drops de inimigos com moedas, pocoes, flechas, fragmentos, orbes de mana, chave rara, itens de boss e power-ups
- Natacao no lago, oxigenio, ripples e regras de combate na agua
- Bau raro liberado ao derrotar o boss
- Tela inicial com Jogar, Continuar, Como Jogar e Creditos
- Sistema de salvar/continuar com `localStorage`
- Salvamento de arma atual, poder equipado, oxigenio, loot no chao, bosses derrotados, itens raros e inimigos vivos
- Mini mapa com jogador, casas, lago e NPCs importantes
- Suporte para celular com Canvas responsivo e controles touch
- Joystick analogico mobile com velocidade variavel
- Auto-mira mobile com alvo marcado e troca de alvo por toque
- Botoes mobile grandes para ataque, poder, dash, interacao, pocao, inventario e arma
- Barra mobile de poderes 1/2/3/4 com destaque no poder equipado
- Botao de tela cheia no mobile e na tela inicial
- Menu de pausa mobile com salvar, reiniciar, ajuda e voltar ao menu
- Feedback tatil com `navigator.vibrate` quando disponivel
- Painel de debug opcional usando `?debug=1`
- Efeitos sonoros e musica simples com Web Audio API, sem arquivos externos
- Transicao entre mapas: casa do jogador, loja e casa do prefeito tem interiores proprios
- Portal magico funcional que leva para a Dimensao Cristalina
- Nova dimensao com chao roxo, agua magica, cristais, arvores estranhas, pedras flutuantes e particulas
- Missao da dimensao com 3 cristais ativaveis, ponte secreta e bau especial
- Sons de portal, cristal e bau usando Web Audio API
- HUD com nome do personagem, area atual e dados compactos
- HUD com progresso da missao
- HUD compacto com vida, mana, moedas, area, arma, poder e missao curta
- Paineis separados de Missoes, Status, Menu e Debug
- X/Y movido para o debug com `F3` ou `?debug=1`
- Boss bar separada e limpa, aparecendo apenas perto de boss
- Codigo separado em `index.html`, `styles.css` e `app.js`

## Estrutura

- `index.html`: estrutura da pagina e elementos da interface
- `styles.css`: visual da pagina, HUD e caixa de dialogo
- `app.js`: logica do jogo, mapa, desenho no Canvas, movimento e colisoes
