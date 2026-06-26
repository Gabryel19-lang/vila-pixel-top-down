// Jogo 2D top-down em Canvas puro.
// Tudo e desenhado com formas simples para ficar facil de estudar.

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const miniMapCanvas = document.getElementById("miniMapCanvas");
const miniCtx = miniMapCanvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
const playButton = document.getElementById("playButton");
const continueButton = document.getElementById("continueButton");
const howToButton = document.getElementById("howToButton");
const creditsButton = document.getElementById("creditsButton");
const startMessage = document.getElementById("startMessage");
const playerNameEl = document.getElementById("playerName");
const playerPositionEl = document.getElementById("playerPosition");
const questProgressEl = document.getElementById("questProgress");
const healthHud = document.getElementById("healthHud");
const coinHud = document.getElementById("coinHud");
const resetButton = document.getElementById("resetButton");
const dialogBox = document.getElementById("dialogBox");
const dialogText = document.getElementById("dialogText");
const interactionHint = document.getElementById("interactionHint");
const inventoryPanel = document.getElementById("inventoryPanel");
const inventoryList = document.getElementById("inventoryList");
const shopPanel = document.getElementById("shopPanel");
const shopMessage = document.getElementById("shopMessage");
const buyPotionButton = document.getElementById("buyPotionButton");
const gameOverScreen = document.getElementById("gameOverScreen");
const gameOverResetButton = document.getElementById("gameOverResetButton");
const saveButton = document.getElementById("saveButton");
const infoPanel = document.getElementById("infoPanel");
const infoTitle = document.getElementById("infoTitle");
const infoText = document.getElementById("infoText");
const closeInfoButton = document.getElementById("closeInfoButton");
const touchDirectionButtons = document.querySelectorAll("[data-touch-key]");
const touchActionButton = document.getElementById("touchActionButton");
const touchAttackButton = document.getElementById("touchAttackButton");
const touchInventoryButton = document.getElementById("touchInventoryButton");

const SAVE_KEY = "gabryel-garcia-o-brabo-save-v1";
const TILE = 32;
const MAP_COLS = 64;
const MAP_ROWS = 46;
const WORLD_WIDTH = MAP_COLS * TILE;
const WORLD_HEIGHT = MAP_ROWS * TILE;
const HOME_COLS = 30;
const HOME_ROWS = 20;
const HOME_WIDTH = HOME_COLS * TILE;
const HOME_HEIGHT = HOME_ROWS * TILE;

const keys = new Set();
const camera = { x: 0, y: 0 };
let lastTime = 0;
let dialogOpen = false;
let currentScene = "village";
let lastVillagePosition = { x: 30 * TILE, y: 24 * TILE };
let inventoryOpen = false;
let shopOpen = false;
let gameOver = false;
let gameStarted = false;
let attackTimer = 0;
let damageCooldown = 0;
let saveNoticeTimer = 0;
let audioContext = null;
let musicGain = null;
let musicTimer = null;

const quest = {
  status: "notStarted",
  collected: 0,
  total: 3,
  reward: "Amuleto da Vila"
};

const inventory = {
  cristais: 0,
  chaves: 0,
  pocoes: 1,
  moedas: 8,
  espadas: 0,
  cartas: 0
};

const questBook = {
  keyFound: false,
  forestMonstersDefeated: 0,
  forestMonstersGoal: 3,
  letterPicked: false,
  letterDelivered: false
};

const player = {
  name: "Lia",
  x: 30 * TILE,
  y: 24 * TILE,
  startX: 30 * TILE,
  startY: 24 * TILE,
  width: 22,
  height: 26,
  speed: 150,
  maxHealth: 5,
  health: 5,
  direction: "down",
  moving: false,
  frame: 0,
  animTimer: 0
};

playerNameEl.textContent = player.name;

// G = grama, F = floresta, D = caminho, P = praca, W = agua
const worldMap = createWorldMap();
const homeMap = createHomeMap();

function createWorldMap() {
  const map = Array.from({ length: MAP_ROWS }, () => Array(MAP_COLS).fill("G"));

  fillRect(map, 0, 0, 15, MAP_ROWS, "F");
  fillRect(map, 49, 0, 15, MAP_ROWS, "F");
  fillRect(map, 0, 0, MAP_COLS, 5, "F");
  fillRect(map, 0, 39, MAP_COLS, 7, "F");

  fillRect(map, 30, 5, 4, 35, "D");
  fillRect(map, 8, 22, 48, 4, "D");
  fillRect(map, 17, 10, 4, 27, "D");
  fillRect(map, 43, 11, 4, 24, "D");
  fillRect(map, 25, 18, 15, 10, "P");
  fillRect(map, 28, 21, 9, 4, "P");
  fillRect(map, 6, 31, 12, 7, "P");
  fillRect(map, 53, 31, 8, 7, "P");
  fillRect(map, 4, 8, 10, 7, "G");
  fillRect(map, 24, 33, 7, 5, "G");
  fillRect(map, 41, 6, 8, 5, "G");
  fillRect(map, 9, 24, 3, 9, "D");
  fillRect(map, 14, 33, 17, 3, "D");
  fillRect(map, 46, 24, 10, 3, "D");
  fillRect(map, 55, 26, 3, 7, "D");
  fillRect(map, 11, 14, 3, 9, "D");

  paintEllipse(map, 50, 13, 8, 6, "W");
  paintEllipse(map, 54, 17, 6, 4, "W");

  return map;
}

function createHomeMap() {
  const map = Array.from({ length: HOME_ROWS }, () => Array(HOME_COLS).fill("I"));
  fillHomeRect(map, 0, 0, HOME_COLS, 1, "B");
  fillHomeRect(map, 0, HOME_ROWS - 1, HOME_COLS, 1, "B");
  fillHomeRect(map, 0, 0, 1, HOME_ROWS, "B");
  fillHomeRect(map, HOME_COLS - 1, 0, 1, HOME_ROWS, "B");
  fillHomeRect(map, 7, 7, 6, 4, "R");
  fillHomeRect(map, 14, HOME_ROWS - 1, 2, 1, "I");
  return map;
}

function fillHomeRect(map, startX, startY, width, height, tile) {
  for (let y = startY; y < startY + height; y++) {
    for (let x = startX; x < startX + width; x++) {
      if (x >= 0 && y >= 0 && x < HOME_COLS && y < HOME_ROWS) {
        map[y][x] = tile;
      }
    }
  }
}

function fillRect(map, startX, startY, width, height, tile) {
  for (let y = startY; y < startY + height; y++) {
    for (let x = startX; x < startX + width; x++) {
      if (x >= 0 && y >= 0 && x < MAP_COLS && y < MAP_ROWS) {
        map[y][x] = tile;
      }
    }
  }
}

function paintEllipse(map, centerX, centerY, radiusX, radiusY, tile) {
  for (let y = centerY - radiusY; y <= centerY + radiusY; y++) {
    for (let x = centerX - radiusX; x <= centerX + radiusX; x++) {
      const dx = (x - centerX) / radiusX;
      const dy = (y - centerY) / radiusY;
      if (dx * dx + dy * dy <= 1 && x >= 0 && y >= 0 && x < MAP_COLS && y < MAP_ROWS) {
        map[y][x] = tile;
      }
    }
  }
}

const villageObjects = [
  playerHouse(24, 33),
  shop(42, 6),
  house(22, 8, "Casa da Dona Mina"),
  house(36, 8, "Casa do Prefeito"),
  house(21, 29, "Pousada da Vila"),
  house(38, 29, "Armazem"),
  house(12, 15, "Cabana da Floresta"),
  house(48, 28, "Casa do Pescador"),
  house(27, 12, "Padaria"),
  house(35, 14, "Atelie"),
  well(31, 21),
  portal(55, 32),
  bench(8, 34, "horizontal"),
  bench(13, 34, "horizontal"),
  bench(8, 36, "horizontal"),
  caveEntrance(10, 10),
  secretStone(7, 10),

  tree(3, 4), tree(6, 3), tree(10, 6), tree(13, 8), tree(4, 11),
  tree(8, 14), tree(12, 20), tree(5, 25), tree(10, 30), tree(6, 35),
  tree(2, 40), tree(13, 39), tree(50, 4), tree(55, 5), tree(60, 7),
  tree(51, 26), tree(58, 28), tree(53, 34), tree(60, 38), tree(48, 40),
  tree(19, 40), tree(25, 41), tree(33, 40), tree(43, 39),
  tree(3, 7), tree(6, 7), tree(9, 7), tree(12, 7), tree(14, 9),
  tree(14, 12), tree(3, 14), tree(6, 15), tree(9, 15),

  fence(20, 7, 7, "horizontal"),
  fence(35, 7, 7, "horizontal"),
  fence(20, 32, 7, "horizontal"),
  fence(38, 32, 7, "horizontal"),
  fence(23, 17, 5, "vertical"),
  fence(40, 17, 5, "vertical"),

  sign(30, 27, "Placa da praca: Bem-vindo a Vila Pixel! A vila fica ao redor da praca."),
  sign(14, 22, "Placa da floresta: As arvores sao solidas, mas as flores nao bloqueiam o caminho."),
  sign(48, 21, "Placa do lago: A agua tem colisao. Melhor admirar da margem."),
  sign(31, 5, "Placa norte: Siga o caminho para voltar ate a praca."),
  sign(25, 36, "Casa da Lia: seu ponto de descanso depois das aventuras."),
  sign(44, 10, "Loja Estrela Azul: pocoes, mapas e biscoitos de viagem."),
  sign(8, 33, "Parque da Vila: respire fundo e siga explorando."),
  sign(56, 38, "Portal antigo: a energia ainda esta adormecida."),

  npc(29, 20, "Nico", "Nico: Preciso de ajuda! Encontre 3 cristais brilhantes pela vila e volte aqui."),
  npc(44, 24, "Ari", "Ari: O lago cresceu depois das ultimas chuvas. Nao tente atravessar."),
  npc(18, 24, "Mina", "Mina: Na floresta ha flores por toda parte, mas cuidado com as arvores."),
  npc(45, 9, "Vendedor", "Vendedor: Bem-vinda a Loja Estrela Azul!", "shopkeeper"),
  npc(12, 34, "Beto", "Beto: Estou esperando uma carta da Mina.", "letterTarget"),

  crystal(12, 28), crystal(47, 20), crystal(35, 36),
  collectible(7, 11, "chave"),
  collectible(19, 23, "carta"),
  collectible(27, 34, "pocao"),
  collectible(13, 36, "espada"),
  collectible(54, 29, "espada"),
  collectible(9, 32, "moeda"), collectible(10, 35, "moeda"), collectible(45, 25, "moeda"),
  collectible(52, 24, "moeda"), collectible(56, 36, "moeda"), collectible(6, 12, "moeda"),
  enemy(9, 18, "slime"), enemy(12, 25, "slime"), enemy(52, 34, "slime"),
  enemy(7, 9, "morcego"),

  flower(26, 19, "pink"), flower(37, 19, "yellow"), flower(26, 26, "blue"),
  flower(38, 26, "pink"), flower(16, 18, "yellow"), flower(11, 27, "blue"),
  flower(9, 33, "pink"), flower(45, 31, "yellow"), flower(52, 24, "blue"),
  flower(56, 22, "pink"), flower(24, 35, "yellow"), flower(34, 34, "blue"),
  rock(15, 12), rock(11, 19), rock(47, 19), rock(56, 27),
  rock(18, 35), rock(41, 36), rock(7, 38), rock(58, 10)
];

const homeObjects = [
  block(0, 0, HOME_COLS, 1),
  block(0, 0, 1, HOME_ROWS),
  block(HOME_COLS - 1, 0, 1, HOME_ROWS),
  block(0, HOME_ROWS - 1, 14, 1),
  block(16, HOME_ROWS - 1, 14, 1),
  interiorBed(2, 2),
  interiorTable(12, 7),
  interiorBookshelf(25, 2),
  interiorChest(3, 10),
  interiorPlant(25, 12),
  sign(14, 17, "Porta de saida: caminhe para baixo para voltar a vila.")
];

const shopInteriorObjects = [
  block(0, 0, HOME_COLS, 1),
  block(0, 0, 1, HOME_ROWS),
  block(HOME_COLS - 1, 0, 1, HOME_ROWS),
  block(0, HOME_ROWS - 1, 14, 1),
  block(16, HOME_ROWS - 1, 14, 1),
  shopCounter(7, 5),
  interiorBookshelf(3, 2),
  interiorBookshelf(24, 2),
  interiorChest(22, 11),
  npc(14, 7, "Vendedor", "Vendedor: Pocao fresquinha por 5 moedas!", "shopkeeper"),
  sign(14, 17, "Saida da loja: caminhe para baixo para voltar a vila.")
];

const mayorInteriorObjects = [
  block(0, 0, HOME_COLS, 1),
  block(0, 0, 1, HOME_ROWS),
  block(HOME_COLS - 1, 0, 1, HOME_ROWS),
  block(0, HOME_ROWS - 1, 14, 1),
  block(16, HOME_ROWS - 1, 14, 1),
  mayorDesk(11, 5),
  interiorBookshelf(3, 2),
  interiorBookshelf(25, 2),
  interiorPlant(4, 12),
  npc(14, 9, "Prefeito", "Prefeito: Gabryel Garcia o Brabo protege esta vila!", "mayor"),
  sign(14, 17, "Saida da casa do prefeito: caminhe para baixo para voltar a vila.")
];

let objects = villageObjects;
let colliders = objects.filter((obj) => obj.solid);
let interactables = objects.filter((obj) => obj.message);

function block(tileX, tileY, widthTiles, heightTiles) {
  return {
    type: "block",
    x: tileX * TILE,
    y: tileY * TILE,
    width: widthTiles * TILE,
    height: heightTiles * TILE,
    solid: true
  };
}

function house(tileX, tileY, title) {
  return {
    type: "house",
    title,
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 4,
    height: TILE * 3,
    solid: true
  };
}

function playerHouse(tileX, tileY) {
  return {
    type: "playerHouse",
    title: "Casa da Lia",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 4,
    height: TILE * 3,
    solid: true
  };
}

function shop(tileX, tileY) {
  return {
    type: "shop",
    title: "Loja Estrela Azul",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 4,
    height: TILE * 3,
    solid: true
  };
}

function tree(tileX, tileY) {
  return {
    type: "tree",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE,
    height: TILE * 2,
    solid: true
  };
}

function fence(tileX, tileY, length, direction) {
  return {
    type: "fence",
    x: tileX * TILE,
    y: tileY * TILE,
    width: direction === "horizontal" ? TILE * length : TILE,
    height: direction === "horizontal" ? TILE : TILE * length,
    direction,
    solid: true
  };
}

function sign(tileX, tileY, message) {
  return {
    type: "sign",
    x: tileX * TILE + 8,
    y: tileY * TILE + 6,
    width: 18,
    height: 24,
    solid: true,
    message
  };
}

function well(tileX, tileY) {
  return {
    type: "well",
    x: tileX * TILE + 2,
    y: tileY * TILE + 2,
    width: 28,
    height: 28,
    solid: true
  };
}

function bench(tileX, tileY, direction) {
  return {
    type: "bench",
    x: tileX * TILE + 2,
    y: tileY * TILE + 10,
    width: direction === "horizontal" ? 28 : 12,
    height: direction === "horizontal" ? 12 : 28,
    direction,
    solid: true
  };
}

function portal(tileX, tileY) {
  return {
    type: "portal",
    x: tileX * TILE,
    y: tileY * TILE - 8,
    width: TILE * 2,
    height: TILE * 3,
    solid: false,
    message: "Portal antigo: ele vibra baixinho, como se esperasse uma chave magica."
  };
}

function secretStone(tileX, tileY) {
  return {
    type: "secretStone",
    x: tileX * TILE + 4,
    y: tileY * TILE + 8,
    width: 24,
    height: 20,
    solid: false,
    message: "Voce encontrou a clareira secreta escondida atras das arvores!"
  };
}

function caveEntrance(tileX, tileY) {
  return {
    type: "cave",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 3,
    height: TILE * 2,
    solid: true,
    message: "Caverna escondida: morcegos costumam rondar essa entrada."
  };
}

function interiorBed(tileX, tileY) {
  return {
    type: "bed",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 3,
    height: TILE * 2,
    solid: true
  };
}

function interiorTable(tileX, tileY) {
  return {
    type: "table",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 3,
    height: TILE * 2,
    solid: true
  };
}

function shopCounter(tileX, tileY) {
  return {
    type: "counter",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 16,
    height: TILE * 2,
    solid: true
  };
}

function mayorDesk(tileX, tileY) {
  return {
    type: "mayorDesk",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 7,
    height: TILE * 3,
    solid: true
  };
}

function interiorBookshelf(tileX, tileY) {
  return {
    type: "bookshelf",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 2,
    height: TILE * 3,
    solid: true
  };
}

function interiorChest(tileX, tileY) {
  return {
    type: "chest",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 2,
    height: TILE,
    solid: true,
    message: "Bau da Lia: tem mapas, fitas coloridas e uma lanterna pequena."
  };
}

function interiorPlant(tileX, tileY) {
  return {
    type: "plant",
    x: tileX * TILE + 4,
    y: tileY * TILE,
    width: 24,
    height: 32,
    solid: true
  };
}

function flower(tileX, tileY, color) {
  return {
    type: "flower",
    color,
    x: tileX * TILE + 10,
    y: tileY * TILE + 12,
    width: 12,
    height: 12,
    solid: false
  };
}

function rock(tileX, tileY) {
  return {
    type: "rock",
    x: tileX * TILE + 7,
    y: tileY * TILE + 11,
    width: 18,
    height: 15,
    solid: false
  };
}

function crystal(tileX, tileY) {
  return {
    type: "crystal",
    x: tileX * TILE + 8,
    y: tileY * TILE + 4,
    width: 16,
    height: 24,
    solid: false,
    collected: false
  };
}

function collectible(tileX, tileY, item) {
  return {
    type: "collectible",
    item,
    x: tileX * TILE + 8,
    y: tileY * TILE + 8,
    width: 16,
    height: 16,
    solid: false,
    collected: false
  };
}

function enemy(tileX, tileY, kind) {
  return {
    type: "enemy",
    kind,
    x: tileX * TILE + 4,
    y: tileY * TILE + 4,
    width: kind === "morcego" ? 24 : 22,
    height: kind === "morcego" ? 18 : 20,
    solid: false,
    hp: kind === "morcego" ? 2 : 3,
    maxHp: kind === "morcego" ? 2 : 3,
    speed: kind === "morcego" ? 75 : 45,
    direction: Math.random() > 0.5 ? "left" : "right",
    moveTimer: 0,
    alive: true
  };
}

function npc(tileX, tileY, name, message, role = "villager") {
  return {
    type: "npc",
    name,
    role,
    x: tileX * TILE + 5,
    y: tileY * TILE + 4,
    width: 22,
    height: 28,
    solid: true,
    message,
    bob: Math.random() * Math.PI * 2,
    speed: 28,
    direction: Math.random() > 0.5 ? "left" : "right",
    moveTimer: 1 + Math.random() * 2,
    spawnX: tileX * TILE + 5,
    spawnY: tileY * TILE + 4
  };
}

function getPlayerRect(nextX = player.x, nextY = player.y) {
  return {
    x: nextX + 5,
    y: nextY + 8,
    width: player.width - 10,
    height: player.height - 8
  };
}

function rectsOverlap(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function isWaterAt(tileX, tileY) {
  if (currentScene !== "village") return false;

  if (tileX < 0 || tileY < 0 || tileX >= MAP_COLS || tileY >= MAP_ROWS) {
    return true;
  }
  return worldMap[tileY][tileX] === "W";
}

function hitsWater(rect) {
  const left = Math.floor(rect.x / TILE);
  const right = Math.floor((rect.x + rect.width - 1) / TILE);
  const top = Math.floor(rect.y / TILE);
  const bottom = Math.floor((rect.y + rect.height - 1) / TILE);

  for (let y = top; y <= bottom; y++) {
    for (let x = left; x <= right; x++) {
      if (isWaterAt(x, y)) return true;
    }
  }

  return false;
}

function canMoveTo(nextX, nextY) {
  const rect = getPlayerRect(nextX, nextY);
  if (gameOver) return false;
  const sceneWidth = getSceneWidth();
  const sceneHeight = getSceneHeight();

  if (
    rect.x < 0 ||
    rect.y < 0 ||
    rect.x + rect.width > sceneWidth ||
    rect.y + rect.height > sceneHeight
  ) {
    return false;
  }

  if (hitsWater(rect)) return false;

  return !colliders.some((obj) => rectsOverlap(rect, obj));
}

function canEntityMoveTo(entity, nextX, nextY) {
  const rect = {
    x: nextX,
    y: nextY,
    width: entity.width,
    height: entity.height
  };
  const sceneWidth = getSceneWidth();
  const sceneHeight = getSceneHeight();

  if (rect.x < 0 || rect.y < 0 || rect.x + rect.width > sceneWidth || rect.y + rect.height > sceneHeight) {
    return false;
  }

  if (currentScene === "village" && hitsWater(rect)) return false;

  return !colliders.some((obj) => obj !== entity && obj.type !== "enemy" && rectsOverlap(rect, obj));
}

function getSceneWidth() {
  return currentScene === "village" ? WORLD_WIDTH : HOME_WIDTH;
}

function getSceneHeight() {
  return currentScene === "village" ? WORLD_HEIGHT : HOME_HEIGHT;
}

function getSceneName() {
  if (currentScene === "home") return "Casa";
  if (currentScene === "shopInterior") return "Loja";
  if (currentScene === "mayorInterior") return "Prefeito";
  return "Vila";
}

function setActiveScene(scene) {
  currentScene = scene;
  if (scene === "home") objects = homeObjects;
  else if (scene === "shopInterior") objects = shopInteriorObjects;
  else if (scene === "mayorInterior") objects = mayorInteriorObjects;
  else objects = villageObjects;
  colliders = objects.filter((obj) => obj.solid);
  interactables = objects.filter((obj) => obj.message);
  closeDialog();
  closeShop();
  keys.clear();
}

function enterHome() {
  lastVillagePosition = { x: player.x, y: player.y };
  setActiveScene("home");
  player.x = 14 * TILE + 8;
  player.y = 16 * TILE;
  player.direction = "up";
}

function exitHome() {
  setActiveScene("village");
  player.x = 25 * TILE;
  player.y = 37 * TILE;
  player.direction = "down";
}

function enterShopInterior() {
  lastVillagePosition = { x: player.x, y: player.y };
  setActiveScene("shopInterior");
  player.x = 14 * TILE + 8;
  player.y = 16 * TILE;
  player.direction = "up";
}

function exitShopInterior() {
  setActiveScene("village");
  player.x = 43 * TILE + 12;
  player.y = 10 * TILE + 18;
  player.direction = "down";
}

function enterMayorInterior() {
  lastVillagePosition = { x: player.x, y: player.y };
  setActiveScene("mayorInterior");
  player.x = 14 * TILE + 8;
  player.y = 16 * TILE;
  player.direction = "up";
}

function exitMayorInterior() {
  setActiveScene("village");
  player.x = 37 * TILE + 12;
  player.y = 11 * TILE + 18;
  player.direction = "down";
}

function handleMapTransitions() {
  const playerCenter = {
    x: player.x + player.width / 2,
    y: player.y + player.height / 2,
    width: 1,
    height: 1
  };

  if (currentScene === "village") {
    const homeDoor = {
      x: 24 * TILE + 18,
      y: 33 * TILE + 82,
      width: 40,
      height: 30
    };
    if (rectsOverlap(playerCenter, homeDoor)) enterHome();
    const shopDoor = {
      x: 42 * TILE + 18,
      y: 6 * TILE + 82,
      width: 40,
      height: 30
    };
    if (rectsOverlap(playerCenter, shopDoor)) enterShopInterior();
    const mayorDoor = {
      x: 36 * TILE + 18,
      y: 8 * TILE + 82,
      width: 40,
      height: 30
    };
    if (rectsOverlap(playerCenter, mayorDoor)) enterMayorInterior();
    return;
  }

  const exitDoor = {
    x: 14 * TILE,
    y: 18 * TILE,
    width: TILE * 2,
    height: TILE * 2
  };
  if (!rectsOverlap(playerCenter, exitDoor)) return;
  if (currentScene === "home") exitHome();
  else if (currentScene === "shopInterior") exitShopInterior();
  else if (currentScene === "mayorInterior") exitMayorInterior();
}

function update(delta) {
  if (!gameStarted) {
    updateHud();
    return;
  }

  if (gameOver) {
    updateHud();
    return;
  }

  const inputX = (keys.has("arrowright") || keys.has("d") ? 1 : 0) -
    (keys.has("arrowleft") || keys.has("a") ? 1 : 0);
  const inputY = (keys.has("arrowdown") || keys.has("s") ? 1 : 0) -
    (keys.has("arrowup") || keys.has("w") ? 1 : 0);

  player.moving = inputX !== 0 || inputY !== 0;

  if (player.moving && !dialogOpen && !inventoryOpen && !shopOpen) {
    const length = Math.hypot(inputX, inputY) || 1;
    const moveX = (inputX / length) * player.speed * delta;
    const moveY = (inputY / length) * player.speed * delta;

    if (Math.abs(inputX) > Math.abs(inputY)) {
      player.direction = inputX > 0 ? "right" : "left";
    } else if (inputY !== 0) {
      player.direction = inputY > 0 ? "down" : "up";
    }

    // Testa cada eixo separado para o jogador deslizar em paredes.
    if (canMoveTo(player.x + moveX, player.y)) player.x += moveX;
    if (canMoveTo(player.x, player.y + moveY)) player.y += moveY;
    handleMapTransitions();

    player.animTimer += delta;
    if (player.animTimer > 0.14) {
      player.frame = (player.frame + 1) % 4;
      player.animTimer = 0;
    }
  } else {
    player.frame = 0;
    player.animTimer = 0;
  }

  updateNpcs(delta);
  updateEnemies(delta);
  collectWorldItems();
  updateAttack(delta);

  camera.x = clamp(player.x + player.width / 2 - canvas.width / 2, 0, getSceneWidth() - canvas.width);
  camera.y = clamp(player.y + player.height / 2 - canvas.height / 2, 0, getSceneHeight() - canvas.height);

  playerPositionEl.textContent = `${getSceneName()} - X: ${Math.round(player.x)} / Y: ${Math.round(player.y)}`;
  collectCrystals();
  updateQuestProgress();
  updateHud();
  updateInteractionHint();
  if (saveNoticeTimer > 0) saveNoticeTimer = Math.max(0, saveNoticeTimer - delta);
}

function updateNpcs(delta) {
  if (currentScene !== "village" || dialogOpen || shopOpen) return;

  for (const obj of villageObjects) {
    if (obj.type !== "npc" || obj.role === "shopkeeper") continue;

    obj.moveTimer -= delta;
    if (obj.moveTimer <= 0) {
      const directions = ["up", "down", "left", "right", "idle"];
      obj.direction = directions[Math.floor(Math.random() * directions.length)];
      obj.moveTimer = 1 + Math.random() * 2.5;
    }

    if (obj.direction === "idle") continue;

    const step = directionVector(obj.direction);
    const nextX = obj.x + step.x * obj.speed * delta;
    const nextY = obj.y + step.y * obj.speed * delta;
    const nearSpawn = Math.hypot(nextX - obj.spawnX, nextY - obj.spawnY) < TILE * 4;
    if (nearSpawn && canEntityMoveTo(obj, nextX, nextY)) {
      obj.x = nextX;
      obj.y = nextY;
    } else {
      obj.moveTimer = 0;
    }
  }
}

function updateEnemies(delta) {
  if (currentScene !== "village") return;

  damageCooldown = Math.max(0, damageCooldown - delta);
  const playerRect = getPlayerRect();

  for (const obj of villageObjects) {
    if (obj.type !== "enemy" || !obj.alive) continue;

    obj.moveTimer -= delta;
    if (obj.moveTimer <= 0) {
      const directions = ["up", "down", "left", "right"];
      obj.direction = directions[Math.floor(Math.random() * directions.length)];
      obj.moveTimer = 0.8 + Math.random() * 1.8;
    }

    const step = directionVector(obj.direction);
    const nextX = obj.x + step.x * obj.speed * delta;
    const nextY = obj.y + step.y * obj.speed * delta;
    if (canEntityMoveTo(obj, nextX, nextY)) {
      obj.x = nextX;
      obj.y = nextY;
    } else {
      obj.moveTimer = 0;
    }

    if (rectsOverlap(playerRect, obj) && damageCooldown <= 0) {
      takeDamage(1);
      damageCooldown = 1.1;
    }
  }
}

function directionVector(direction) {
  if (direction === "left") return { x: -1, y: 0 };
  if (direction === "right") return { x: 1, y: 0 };
  if (direction === "up") return { x: 0, y: -1 };
  return { x: 0, y: 1 };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(-Math.round(camera.x), -Math.round(camera.y));

  drawMap();

  const visibleObjects = objects.filter((obj) => {
    if (obj.type === "crystal" || obj.type === "collectible") return !obj.collected;
    if (obj.type === "enemy") return obj.alive;
    return obj.type !== "block";
  });
  const drawables = [...visibleObjects, { type: "player", y: player.y, height: player.height }];
  drawables.sort((a, b) => (a.y + a.height) - (b.y + b.height));

  for (const item of drawables) {
    if (item.type === "player") drawPlayer();
    else drawObject(item);
  }
  drawAttack();

  ctx.restore();
  drawMiniMap();
}

function drawMap() {
  const activeMap = currentScene === "village" ? worldMap : homeMap;
  const cols = currentScene === "village" ? MAP_COLS : HOME_COLS;
  const rows = currentScene === "village" ? MAP_ROWS : HOME_ROWS;
  const startCol = Math.floor(camera.x / TILE) - 1;
  const endCol = Math.ceil((camera.x + canvas.width) / TILE) + 1;
  const startRow = Math.floor(camera.y / TILE) - 1;
  const endRow = Math.ceil((camera.y + canvas.height) / TILE) + 1;

  for (let y = startRow; y <= endRow; y++) {
    for (let x = startCol; x <= endCol; x++) {
      if (x < 0 || y < 0 || x >= cols || y >= rows) continue;

      const tile = activeMap[y][x];
      const px = x * TILE;
      const py = y * TILE;

      if (tile === "D") drawDirt(px, py, x, y);
      else if (tile === "W") drawWater(px, py, x, y);
      else if (tile === "F") drawForestGrass(px, py, x, y);
      else if (tile === "P") drawPlaza(px, py, x, y);
      else if (tile === "I") drawInteriorFloor(px, py, x, y);
      else if (tile === "B") drawInteriorWall(px, py, x, y);
      else if (tile === "R") drawRug(px, py, x, y);
      else drawGrass(px, py, x, y);
    }
  }
}

function pixelRect(x, y, width, height, fill, outline = "#273052") {
  ctx.fillStyle = outline;
  ctx.fillRect(Math.round(x), Math.round(y), width, height);
  ctx.fillStyle = fill;
  ctx.fillRect(Math.round(x) + 2, Math.round(y) + 2, width - 4, height - 4);
}

function drawGrass(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#8de68f" : "#82dc83";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#2f8b60";
  if ((tileX * 7 + tileY * 3) % 5 === 0) {
    ctx.fillRect(x + 7, y + 19, 3, 8);
    ctx.fillRect(x + 10, y + 23, 3, 3);
  }
  if ((tileX * 2 + tileY * 9) % 7 === 0) {
    ctx.fillRect(x + 23, y + 8, 3, 8);
    ctx.fillRect(x + 20, y + 13, 3, 3);
  }
}

function drawForestGrass(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#70c96f" : "#67be66";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#26794d";
  ctx.fillRect(x + 5, y + 6, 4, 12);
  if ((tileX * 5 + tileY * 11) % 4 === 0) {
    ctx.fillRect(x + 20, y + 16, 5, 10);
    ctx.fillRect(x + 16, y + 21, 4, 4);
  }
}

function drawDirt(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#a85f4a" : "#9c5744";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#5d3843";
  ctx.fillRect(x + 4, y + 7, 8, 3);
  ctx.fillRect(x + 22, y + 20, 7, 3);
  ctx.fillRect(x + 15, y + 14, 4, 3);
}

function drawPlaza(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#ffd38b" : "#f2c27d";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.strokeStyle = "#916b55";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
  ctx.fillStyle = "rgba(255, 255, 240, 0.3)";
  if ((tileX + tileY) % 3 === 0) ctx.fillRect(x + 8, y + 8, 8, 3);
}

function drawWater(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#48a7e6" : "#3b9cdc";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#7bd5ff";
  ctx.fillRect(x + 4, y + 10, 9, 3);
  ctx.fillRect(x + 16, y + 18, 11, 3);
  ctx.fillStyle = "rgba(37, 79, 150, 0.3)";
  ctx.fillRect(x, y + TILE - 3, TILE, 3);
}

function drawInteriorFloor(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#f0c686" : "#e7b978";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.strokeStyle = "rgba(112, 75, 55, 0.28)";
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
}

function drawInteriorWall(x, y, tileX, tileY) {
  ctx.fillStyle = y < TILE ? "#9cc7f2" : "#6d5c75";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "#273052";
  if (tileY === 0) ctx.fillRect(x, y + TILE - 4, TILE, 4);
}

function drawRug(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#d24c63" : "#bd4058";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgba(255, 242, 100, 0.22)";
  ctx.fillRect(x + 8, y + 8, 16, 16);
}

function drawObject(obj) {
  if (obj.type === "house") drawHouse(obj);
  if (obj.type === "playerHouse") drawPlayerHouse(obj);
  if (obj.type === "shop") drawShop(obj);
  if (obj.type === "tree") drawTree(obj);
  if (obj.type === "fence") drawFence(obj);
  if (obj.type === "sign") drawSign(obj);
  if (obj.type === "well") drawWell(obj);
  if (obj.type === "bench") drawBench(obj);
  if (obj.type === "portal") drawPortal(obj);
  if (obj.type === "secretStone") drawSecretStone(obj);
  if (obj.type === "cave") drawCave(obj);
  if (obj.type === "bed") drawBed(obj);
  if (obj.type === "table") drawTable(obj);
  if (obj.type === "counter") drawCounter(obj);
  if (obj.type === "mayorDesk") drawMayorDesk(obj);
  if (obj.type === "bookshelf") drawBookshelf(obj);
  if (obj.type === "chest") drawChest(obj);
  if (obj.type === "plant") drawPlant(obj);
  if (obj.type === "flower") drawFlower(obj);
  if (obj.type === "rock") drawRock(obj);
  if (obj.type === "crystal") drawCrystal(obj);
  if (obj.type === "collectible") drawCollectible(obj);
  if (obj.type === "enemy") drawEnemy(obj);
  if (obj.type === "npc") drawNpc(obj);
}

function drawHouse(obj) {
  const x = obj.x;
  const y = obj.y;
  const roofColor = obj.title.length % 2 === 0 ? "#d24c63" : "#3f8fe5";

  ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
  ctx.fillRect(x + 6, y + obj.height - 5, obj.width - 12, 8);

  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 5, y + 35, obj.width - 10, obj.height - 35);
  ctx.fillStyle = "#d9d3d7";
  ctx.fillRect(x + 9, y + 39, obj.width - 18, obj.height - 43);
  ctx.fillStyle = "#b7b2bd";
  ctx.fillRect(x + 9, y + obj.height - 14, obj.width - 18, 10);

  ctx.fillStyle = "#273052";
  ctx.fillRect(x - 3, y + 17, obj.width + 6, 24);
  ctx.fillStyle = roofColor;
  ctx.fillRect(x + 1, y + 21, obj.width - 2, 16);
  ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
  ctx.fillRect(x + 8, y + 24, obj.width - 16, 4);

  pixelRect(x + 24, y + 61, 22, 31, "#985b44");
  ctx.fillStyle = "#ffd18b";
  ctx.fillRect(x + 38, y + 75, 3, 3);

  pixelRect(x + 73, y + 57, 25, 22, "#56b7f4");
  ctx.fillStyle = "#e6fbff";
  ctx.fillRect(x + 88, y + 61, 5, 5);
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 84, y + 57, 3, 22);
  ctx.fillRect(x + 73, y + 67, 25, 3);
}

function drawPlayerHouse(obj) {
  drawHouse({ ...obj, title: "Minha Casa" });
  const x = obj.x;
  const y = obj.y;

  ctx.fillStyle = "#fff264";
  ctx.fillRect(x + 56, y + 23, 10, 10);
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 59, y + 25, 4, 6);
}

function drawShop(obj) {
  drawHouse({ ...obj, title: "Loja" });
  const x = obj.x;
  const y = obj.y;

  pixelRect(x + 34, y + 42, 58, 14, "#fff264");
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 42, y + 47, 6, 4);
  ctx.fillRect(x + 53, y + 47, 6, 4);
  ctx.fillRect(x + 64, y + 47, 6, 4);
  ctx.fillRect(x + 75, y + 47, 6, 4);
}

function drawTree(obj) {
  const x = obj.x;
  const y = obj.y;

  ctx.fillStyle = "rgba(39, 48, 82, 0.22)";
  ctx.fillRect(x + 2, y + 55, 29, 6);
  pixelRect(x + 11, y + 35, 12, 25, "#8b5a3f");

  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 4, y + 13, 24, 30);
  ctx.fillRect(x, y + 23, 32, 23);
  ctx.fillRect(x + 8, y + 4, 19, 18);
  ctx.fillStyle = "#bdf25a";
  ctx.fillRect(x + 7, y + 16, 19, 24);
  ctx.fillRect(x + 3, y + 25, 26, 15);
  ctx.fillRect(x + 10, y + 7, 15, 15);
  ctx.fillStyle = "#d9ff73";
  ctx.fillRect(x + 10, y + 10, 8, 5);
  ctx.fillRect(x + 17, y + 20, 7, 4);
}

function drawFence(obj) {
  const dark = "#273052";
  const wood = "#f0b276";

  if (obj.direction === "horizontal") {
    for (let x = obj.x; x < obj.x + obj.width; x += TILE) {
      pixelRect(x + 4, obj.y + 7, 8, 23, wood, dark);
      pixelRect(x + 20, obj.y + 7, 8, 23, wood, dark);
    }
    pixelRect(obj.x, obj.y + 13, obj.width, 7, wood, dark);
  } else {
    for (let y = obj.y; y < obj.y + obj.height; y += TILE) {
      pixelRect(obj.x + 7, y + 4, 23, 8, wood, dark);
      pixelRect(obj.x + 7, y + 20, 23, 8, wood, dark);
    }
    pixelRect(obj.x + 13, obj.y, 7, obj.height, wood, dark);
  }
}

function drawSign(obj) {
  pixelRect(obj.x + 7, obj.y + 10, 5, 18, "#8f5a3f");
  pixelRect(obj.x, obj.y, 19, 14, "#efbd75");
  ctx.fillStyle = "#8a5b4b";
  ctx.fillRect(obj.x + 4, obj.y + 5, 11, 2);
}

function drawWell(obj) {
  pixelRect(obj.x + 3, obj.y + 10, 22, 16, "#8a8da2");
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 6, obj.y + 13, 16, 8);
  pixelRect(obj.x + 1, obj.y + 3, 26, 8, "#d24c63");
  pixelRect(obj.x + 4, obj.y, 5, 15, "#8b5a3f");
  pixelRect(obj.x + 20, obj.y, 5, 15, "#8b5a3f");
}

function drawBench(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#f0b276");
  ctx.fillStyle = "#8f5a3f";
  if (obj.direction === "horizontal") {
    ctx.fillRect(obj.x + 4, obj.y + 3, obj.width - 8, 2);
    ctx.fillRect(obj.x + 4, obj.y + 8, obj.width - 8, 2);
  } else {
    ctx.fillRect(obj.x + 3, obj.y + 4, 2, obj.height - 8);
    ctx.fillRect(obj.x + 8, obj.y + 4, 2, obj.height - 8);
  }
}

function drawPortal(obj) {
  const pulse = Math.sin(performance.now() / 260) * 4;
  const x = obj.x;
  const y = obj.y;

  ctx.fillStyle = "rgba(85, 232, 255, 0.25)";
  ctx.fillRect(x + 5, y + 22, 54, 66);
  pixelRect(x + 4, y + 14, 12, 74, "#8a8da2");
  pixelRect(x + 48, y + 14, 12, 74, "#8a8da2");
  pixelRect(x + 8, y + 8, 48, 12, "#8a8da2");
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(x + 21, y + 28 + pulse, 22, 44 - pulse);
  ctx.fillStyle = "#e9ffff";
  ctx.fillRect(x + 28, y + 36 + pulse, 8, 24);
}

function drawSecretStone(obj) {
  pixelRect(obj.x, obj.y + 4, obj.width, obj.height, "#9ba1ad");
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 9, obj.y, 6, 6);
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 6, obj.y + 12, 12, 3);
}

function drawCave(obj) {
  const x = obj.x;
  const y = obj.y;
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 4, y + 18, obj.width - 8, obj.height - 18);
  ctx.fillStyle = "#6d5c75";
  ctx.fillRect(x + 10, y + 10, obj.width - 20, 20);
  ctx.fillStyle = "#1a1f3d";
  ctx.fillRect(x + 28, y + 30, 38, 34);
  ctx.fillStyle = "#9ba1ad";
  ctx.fillRect(x + 14, y + 18, 10, 9);
  ctx.fillRect(x + 70, y + 24, 8, 8);
}

function drawBed(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#9cc7f2");
  ctx.fillStyle = "#fff3d6";
  ctx.fillRect(obj.x + 8, obj.y + 8, 28, 18);
  ctx.fillStyle = "#d24c63";
  ctx.fillRect(obj.x + 8, obj.y + 32, obj.width - 16, 20);
}

function drawTable(obj) {
  pixelRect(obj.x + 8, obj.y + 8, obj.width - 16, obj.height - 16, "#b87955");
  ctx.fillStyle = "#8f5a3f";
  ctx.fillRect(obj.x + 18, obj.y + 48, 8, 16);
  ctx.fillRect(obj.x + obj.width - 26, obj.y + 48, 8, 16);
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + 42, obj.y + 22, 10, 10);
}

function drawCounter(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#b87955");
  ctx.fillStyle = "#8f5a3f";
  for (let x = obj.x + 12; x < obj.x + obj.width - 12; x += 42) {
    ctx.fillRect(x, obj.y + 8, 24, 8);
  }
  ctx.fillStyle = "#d24c63";
  ctx.fillRect(obj.x + 70, obj.y + 18, 16, 16);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 132, obj.y + 16, 16, 18);
}

function drawMayorDesk(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#8f5a3f");
  ctx.fillStyle = "#b87955";
  ctx.fillRect(obj.x + 8, obj.y + 8, obj.width - 16, obj.height - 16);
  ctx.fillStyle = "#fff3d6";
  ctx.fillRect(obj.x + 24, obj.y + 18, 34, 22);
  ctx.fillRect(obj.x + 96, obj.y + 22, 42, 18);
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + obj.width / 2 - 8, obj.y + 48, 16, 12);
}

function drawBookshelf(obj) {
  pixelRect(obj.x, obj.y, obj.width, obj.height, "#8f5a3f");
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 7, obj.y + 22, obj.width - 14, 4);
  ctx.fillRect(obj.x + 7, obj.y + 50, obj.width - 14, 4);
  ctx.fillStyle = "#55c4ff";
  ctx.fillRect(obj.x + 10, obj.y + 8, 7, 14);
  ctx.fillStyle = "#d24c63";
  ctx.fillRect(obj.x + 21, obj.y + 8, 7, 14);
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + 34, obj.y + 36, 7, 14);
}

function drawChest(obj) {
  pixelRect(obj.x, obj.y + 4, obj.width, obj.height - 4, "#b87955");
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + obj.width / 2 - 4, obj.y + 14, 8, 8);
}

function drawPlant(obj) {
  pixelRect(obj.x + 5, obj.y + 18, 14, 14, "#d24c63");
  ctx.fillStyle = "#26794d";
  ctx.fillRect(obj.x + 10, obj.y + 8, 4, 14);
  ctx.fillStyle = "#7bdb73";
  ctx.fillRect(obj.x + 4, obj.y + 3, 10, 8);
  ctx.fillRect(obj.x + 12, obj.y, 10, 9);
}

function drawFlower(obj) {
  const colors = {
    pink: "#ff6fa8",
    yellow: "#fff264",
    blue: "#55c4ff"
  };

  ctx.fillStyle = "#26794d";
  ctx.fillRect(obj.x + 5, obj.y + 5, 2, 8);
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 2, obj.y, 9, 9);
  ctx.fillStyle = colors[obj.color] || colors.pink;
  ctx.fillRect(obj.x + 3, obj.y + 1, 3, 3);
  ctx.fillRect(obj.x + 7, obj.y + 1, 3, 3);
  ctx.fillRect(obj.x + 5, obj.y + 4, 3, 3);
}

function drawRock(obj) {
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 1, obj.y + 5, 16, 10);
  ctx.fillStyle = "#9ba1ad";
  ctx.fillRect(obj.x + 3, obj.y + 6, 12, 7);
  ctx.fillStyle = "#c7ccd4";
  ctx.fillRect(obj.x + 6, obj.y + 4, 7, 4);
}

function drawCrystal(obj) {
  const pulse = Math.sin(performance.now() / 180) * 2;
  const y = obj.y + pulse;

  ctx.fillStyle = "rgba(85, 196, 255, 0.35)";
  ctx.fillRect(obj.x - 3, obj.y + 18, 22, 6);
  ctx.fillStyle = "#273052";
  ctx.fillRect(obj.x + 5, y, 7, 6);
  ctx.fillRect(obj.x + 2, y + 5, 13, 14);
  ctx.fillRect(obj.x + 5, y + 18, 7, 6);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 6, y + 2, 5, 5);
  ctx.fillRect(obj.x + 4, y + 7, 9, 10);
  ctx.fillRect(obj.x + 7, y + 17, 4, 4);
  ctx.fillStyle = "#e9ffff";
  ctx.fillRect(obj.x + 6, y + 8, 3, 5);
}

function drawCollectible(obj) {
  const x = obj.x;
  const y = obj.y + Math.sin(performance.now() / 240) * 1.5;

  if (obj.item === "moeda") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 3, y + 2, 12, 12);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 5, y + 4, 8, 8);
    ctx.fillStyle = "#f0b276";
    ctx.fillRect(x + 8, y + 5, 2, 6);
    return;
  }

  if (obj.item === "pocao") {
    pixelRect(x + 4, y + 2, 10, 15, "#d24c63");
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 6, y, 6, 4);
    return;
  }

  if (obj.item === "chave") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 5, 14, 6);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 3, y + 6, 8, 4);
    ctx.fillRect(x + 10, y + 9, 6, 3);
    ctx.fillRect(x + 13, y + 12, 3, 3);
    return;
  }

  if (obj.item === "espada") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 7, y, 4, 18);
    ctx.fillStyle = "#e9ffff";
    ctx.fillRect(x + 8, y + 1, 2, 13);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 4, y + 13, 10, 3);
    return;
  }

  if (obj.item === "carta") {
    pixelRect(x + 1, y + 3, 16, 12, "#fff3d6");
    ctx.fillStyle = "#d24c63";
    ctx.fillRect(x + 6, y + 7, 5, 4);
  }
}

function drawEnemy(obj) {
  const x = obj.x;
  const y = obj.y;

  if (obj.kind === "morcego") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x, y + 8, 24, 8);
    ctx.fillRect(x + 8, y + 3, 8, 14);
    ctx.fillStyle = "#6d5c75";
    ctx.fillRect(x + 2, y + 9, 7, 4);
    ctx.fillRect(x + 15, y + 9, 7, 4);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 10, y + 7, 2, 2);
    ctx.fillRect(x + 14, y + 7, 2, 2);
  } else {
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 2, y + 17, 20, 5);
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 1, y + 5, 20, 15);
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 3, y + 7, 16, 11);
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 6, y + 11, 2, 2);
    ctx.fillRect(x + 14, y + 11, 2, 2);
  }

  ctx.fillStyle = "#273052";
  ctx.fillRect(x, y - 6, obj.width, 4);
  ctx.fillStyle = "#d24c63";
  ctx.fillRect(x, y - 6, Math.max(0, obj.width * (obj.hp / obj.maxHp)), 4);
}

function drawAttack() {
  if (attackTimer <= 0) return;
  const area = getAttackRect();
  ctx.fillStyle = "rgba(255, 242, 100, 0.45)";
  ctx.fillRect(area.x, area.y, area.width, area.height);
  ctx.strokeStyle = "#fff264";
  ctx.lineWidth = 2;
  ctx.strokeRect(area.x, area.y, area.width, area.height);
}

function drawNpc(obj) {
  const bob = Math.sin(performance.now() / 300 + obj.bob) * 2;
  const x = obj.x;
  const y = obj.y + bob;
  const shirt = obj.name === "Nico" ? "#3f8fe5" : obj.name === "Ari" ? "#d24c63" : "#7bdb73";

  ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
  ctx.fillRect(x + 4, y + 27, 20, 5);
  pixelRect(x + 5, y + 11, 14, 16, shirt);
  pixelRect(x + 4, y + 2, 16, 13, "#f4bd8f");
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 3, y, 18, 5);
  ctx.fillRect(x + 7, y + 27, 4, 6);
  ctx.fillRect(x + 15, y + 27, 4, 6);
  ctx.fillRect(x + 8, y + 8, 2, 2);
  ctx.fillRect(x + 15, y + 8, 2, 2);
}

function drawPlayer() {
  const x = player.x;
  const y = player.y;
  const legOffset = player.moving ? [0, 2, 0, -2][player.frame] : 0;

  ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
  ctx.fillRect(x + 3, y + 25, 22, 5);

  pixelRect(x + 5, y + 12, 17, 14, "#313a78");
  ctx.fillStyle = "#f4bd8f";
  ctx.fillRect(x + 7, y + 4, 14, 10);
  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 5, y + 2, 18, 5);
  ctx.fillRect(x + 4, y + 6, 5, 8);
  ctx.fillStyle = "#5ad6e7";
  ctx.fillRect(x + 7, y, 12, 5);
  ctx.fillRect(x + 4, y + 5, 5, 7);

  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 7, y + 25 + legOffset, 5, 6);
  ctx.fillRect(x + 16, y + 25 - legOffset, 5, 6);

  if (player.direction === "up") {
    ctx.fillRect(x + 9, y + 6, 10, 2);
  } else if (player.direction === "down") {
    ctx.fillRect(x + 11, y + 9, 2, 2);
    ctx.fillRect(x + 17, y + 9, 2, 2);
  } else if (player.direction === "left") {
    ctx.fillRect(x + 9, y + 9, 2, 2);
  } else {
    ctx.fillRect(x + 19, y + 9, 2, 2);
  }
}

function findInteraction() {
  const playerCenter = {
    x: player.x + player.width / 2,
    y: player.y + player.height / 2,
    width: 1,
    height: 1
  };

  return interactables.find((obj) => {
    const range = {
      x: obj.x - 26,
      y: obj.y - 26,
      width: obj.width + 52,
      height: obj.height + 52
    };
    return rectsOverlap(playerCenter, range);
  });
}

function getQuestMessage(npcObj) {
  if (npcObj.type === "npc" && npcObj.role === "shopkeeper") {
    openShop();
    return "Vendedor: Escolha com calma. Pocao custa 5 moedas.";
  }

  if (npcObj.type === "npc" && npcObj.role === "letterTarget") {
    if (inventory.cartas > 0 && !questBook.letterDelivered) {
      inventory.cartas -= 1;
      questBook.letterDelivered = true;
      inventory.moedas += 6;
      return "Beto: Minha carta! Obrigado. Aceite 6 moedas pela entrega.";
    }
    if (questBook.letterDelivered) return "Beto: Obrigado pela carta. A vila precisava dessa noticia.";
    return "Beto: Se encontrar uma carta perdida, pode trazer para mim?";
  }

  if (npcObj.type !== "npc" || npcObj.name !== "Nico") return npcObj.message;

  if (quest.status === "notStarted") {
    quest.status = "active";
    return "Nico: Preciso de ajuda! Encontre 3 cristais brilhantes pela vila e volte aqui.";
  }

  if (quest.status === "active") {
    return `Nico: Voce encontrou ${quest.collected}/${quest.total} cristais. Continue procurando!`;
  }

  if (quest.status === "ready") {
    quest.status = "done";
    return `Nico: Voce conseguiu! Receba sua recompensa: ${quest.reward}.`;
  }

  return `Nico: Obrigado de novo pela ajuda. O ${quest.reward} combina com voce!`;
}

function collectCrystals() {
  if (currentScene !== "village") return;
  if (quest.status !== "active") return;

  const playerRect = getPlayerRect();
  for (const obj of villageObjects) {
    if (obj.type === "crystal" && !obj.collected && rectsOverlap(playerRect, obj)) {
      obj.collected = true;
      quest.collected += 1;
      inventory.cristais += 1;
      if (quest.collected >= quest.total) {
        quest.status = "ready";
      }
    }
  }
}

function collectWorldItems() {
  if (currentScene !== "village") return;

  const playerRect = getPlayerRect();
  for (const obj of villageObjects) {
    if (obj.type !== "collectible" || obj.collected || !rectsOverlap(playerRect, obj)) continue;

    obj.collected = true;
    if (obj.item === "moeda") {
      inventory.moedas += 1;
      playSound("coin");
    }
    if (obj.item === "pocao") inventory.pocoes += 1;
    if (obj.item === "chave") {
      inventory.chaves += 1;
      questBook.keyFound = true;
    }
    if (obj.item === "espada") inventory.espadas += 1;
    if (obj.item === "carta") {
      inventory.cartas += 1;
      questBook.letterPicked = true;
    }
  }
}

function updateQuestProgress() {
  const crystalText = quest.status === "notStarted" ? "Cristais: fale com Nico" :
    quest.status === "ready" ? "Cristais: volte ao Nico" :
      quest.status === "done" ? "Cristais: ok" : `Cristais: ${quest.collected}/${quest.total}`;
  const keyText = questBook.keyFound ? "Chave: ok" : "Chave: perdida";
  const monsterText = `Monstros: ${questBook.forestMonstersDefeated}/${questBook.forestMonstersGoal}`;
  const letterText = questBook.letterDelivered ? "Carta: ok" : questBook.letterPicked ? "Carta: entregue ao Beto" : "Carta: perdida";
  questProgressEl.textContent = `${crystalText} | ${keyText} | ${monsterText} | ${letterText}`;
}

function updateHud() {
  healthHud.textContent = "♥ ".repeat(player.health).trim() || "0";
  coinHud.textContent = inventory.moedas;
}

function drawMiniMap() {
  miniCtx.clearRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);
  miniCtx.fillStyle = "rgba(39, 48, 82, 0.95)";
  miniCtx.fillRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);

  if (currentScene !== "village") {
    miniCtx.fillStyle = "#f0c686";
    miniCtx.fillRect(12, 12, miniMapCanvas.width - 24, miniMapCanvas.height - 24);
    miniCtx.fillStyle = "#273052";
    miniCtx.fillRect(12, 12, miniMapCanvas.width - 24, 8);
    miniCtx.fillStyle = "#fff264";
    miniCtx.fillRect(miniMapCanvas.width / 2 - 3, miniMapCanvas.height - 16, 6, 6);
    miniCtx.fillStyle = "#d24c63";
    miniCtx.fillRect(
      (player.x / HOME_WIDTH) * (miniMapCanvas.width - 24) + 12 - 3,
      (player.y / HOME_HEIGHT) * (miniMapCanvas.height - 24) + 12 - 3,
      6,
      6
    );
    return;
  }

  const sx = miniMapCanvas.width / WORLD_WIDTH;
  const sy = miniMapCanvas.height / WORLD_HEIGHT;

  miniCtx.fillStyle = "#82dc83";
  miniCtx.fillRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);

  miniCtx.fillStyle = "#48a7e6";
  for (let y = 0; y < MAP_ROWS; y++) {
    for (let x = 0; x < MAP_COLS; x++) {
      if (worldMap[y][x] === "W") {
        miniCtx.fillRect(x * TILE * sx, y * TILE * sy, Math.ceil(TILE * sx), Math.ceil(TILE * sy));
      }
    }
  }

  miniCtx.fillStyle = "#fff264";
  for (const obj of villageObjects) {
    if (obj.type === "house" || obj.type === "playerHouse" || obj.type === "shop") {
      miniCtx.fillRect(obj.x * sx, obj.y * sy, obj.width * sx, obj.height * sy);
    }
  }

  miniCtx.fillStyle = "#3f8fe5";
  for (const obj of villageObjects) {
    if (obj.type === "npc" && ["Nico", "Vendedor", "Beto"].includes(obj.name)) {
      miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 5, 5);
    }
  }

  miniCtx.fillStyle = "#d24c63";
  miniCtx.fillRect(player.x * sx - 3, player.y * sy - 3, 7, 7);
}

function saveGame() {
  const save = {
    scene: currentScene,
    player: {
      x: player.x,
      y: player.y,
      health: player.health,
      direction: player.direction
    },
    inventory: { ...inventory },
    quest: { ...quest },
    questBook: { ...questBook },
    collected: villageObjects
      .filter((obj) => (obj.type === "collectible" || obj.type === "crystal") && obj.collected)
      .map(getSaveObjectKey),
    enemies: villageObjects
      .filter((obj) => obj.type === "enemy")
      .map((obj) => ({ key: getSaveObjectKey(obj), alive: obj.alive, hp: obj.hp }))
  };

  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  startMessage.textContent = "Jogo salvo!";
  saveNoticeTimer = 2;
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return false;

  try {
    const save = JSON.parse(raw);
    Object.assign(inventory, save.inventory || {});
    Object.assign(quest, save.quest || {});
    Object.assign(questBook, save.questBook || {});

    const collected = new Set(save.collected || []);
    const enemies = new Map((save.enemies || []).map((entry) => [entry.key, entry]));
    for (const obj of villageObjects) {
      if (obj.type === "collectible" || obj.type === "crystal") {
        obj.collected = collected.has(getSaveObjectKey(obj));
      }
      if (obj.type === "enemy") {
        const savedEnemy = enemies.get(getSaveObjectKey(obj));
        obj.alive = savedEnemy ? savedEnemy.alive : true;
        obj.hp = savedEnemy ? savedEnemy.hp : obj.maxHp;
      }
    }

    setActiveScene(save.scene || "village");
    player.x = save.player?.x ?? player.startX;
    player.y = save.player?.y ?? player.startY;
    player.health = save.player?.health ?? player.maxHealth;
    player.direction = save.player?.direction || "down";
    gameOver = player.health <= 0;
    gameOverScreen.classList.toggle("hidden", !gameOver);
    updateQuestProgress();
    updateHud();
    renderInventory();
    return true;
  } catch (error) {
    console.error("Erro ao carregar save", error);
    return false;
  }
}

function getSaveObjectKey(obj) {
  return `${obj.type}:${obj.item || obj.kind || "item"}:${Math.round(obj.x)}:${Math.round(obj.y)}`;
}

function startGame(loadSave = false) {
  ensureAudio();
  startMusic();

  if (loadSave && !loadGame()) {
    startMessage.textContent = "Nenhum jogo salvo encontrado.";
    return;
  }

  gameStarted = true;
  startScreen.classList.add("hidden");
  updateHud();
  updateQuestProgress();
}

function showInfo(title, text) {
  infoTitle.textContent = title;
  infoText.textContent = text;
  infoPanel.classList.remove("hidden");
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playTone(frequency, duration, type = "square", volume = 0.08) {
  if (!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function playSound(name) {
  ensureAudio();
  if (name === "coin") {
    playTone(880, 0.08, "square", 0.09);
    setTimeout(() => playTone(1320, 0.08, "square", 0.07), 70);
  } else if (name === "npc") {
    playTone(360, 0.08, "triangle", 0.07);
    setTimeout(() => playTone(430, 0.08, "triangle", 0.06), 80);
  } else if (name === "dialog") {
    playTone(620, 0.06, "sine", 0.06);
  } else if (name === "hit") {
    playTone(150, 0.12, "sawtooth", 0.08);
  }
}

function startMusic() {
  if (musicTimer || !audioContext) return;

  const notes = [262, 330, 392, 523, 392, 330, 294, 392];
  let index = 0;
  musicGain = audioContext.createGain();
  musicGain.gain.value = 0.035;
  musicGain.connect(audioContext.destination);

  musicTimer = setInterval(() => {
    if (!audioContext || audioContext.state !== "running") return;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.value = notes[index % notes.length];
    gain.gain.setValueAtTime(0.0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.8, audioContext.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.32);
    oscillator.connect(gain);
    gain.connect(musicGain);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.34);
    index += 1;
  }, 360);
}

function toggleInventory() {
  inventoryOpen = !inventoryOpen;
  inventoryPanel.classList.toggle("hidden", !inventoryOpen);
  renderInventory();
}

function renderInventory() {
  const rows = [
    ["Cristais", inventory.cristais],
    ["Chaves", inventory.chaves],
    ["Pocoes", inventory.pocoes],
    ["Moedas", inventory.moedas],
    ["Espadas", inventory.espadas],
    ["Cartas", inventory.cartas]
  ];
  inventoryList.innerHTML = rows.map(([name, amount]) => `<li>${name}: <strong>${amount}</strong></li>`).join("");
}

function openShop() {
  playSound("npc");
  shopOpen = true;
  shopPanel.classList.remove("hidden");
  shopMessage.textContent = `Voce tem ${inventory.moedas} moedas.`;
}

function closeShop() {
  shopOpen = false;
  shopPanel.classList.add("hidden");
}

function buyPotion() {
  if (inventory.moedas < 5) {
    shopMessage.textContent = "Moedas insuficientes.";
    return;
  }
  inventory.moedas -= 5;
  inventory.pocoes += 1;
  shopMessage.textContent = "Pocao comprada!";
  renderInventory();
  updateHud();
}

function usePotion() {
  if (inventory.pocoes <= 0 || player.health >= player.maxHealth || gameOver) return;
  inventory.pocoes -= 1;
  player.health = Math.min(player.maxHealth, player.health + 1);
  renderInventory();
  updateHud();
}

function takeDamage(amount) {
  if (gameOver) return;
  playSound("hit");
  player.health = Math.max(0, player.health - amount);
  updateHud();
  if (player.health <= 0) {
    gameOver = true;
    gameOverScreen.classList.remove("hidden");
  }
}

function triggerAttack() {
  if (gameOver || dialogOpen || inventoryOpen || shopOpen || currentScene !== "village") return;
  attackTimer = 0.18;
  const area = getAttackRect();

  for (const obj of villageObjects) {
    if (obj.type !== "enemy" || !obj.alive || !rectsOverlap(area, obj)) continue;
    const damage = inventory.espadas > 0 ? 2 : 1;
    obj.hp -= damage;
    if (obj.hp <= 0) {
      obj.alive = false;
      inventory.moedas += obj.kind === "morcego" ? 5 : 3;
      if (obj.kind === "slime") {
        questBook.forestMonstersDefeated = Math.min(
          questBook.forestMonstersGoal,
          questBook.forestMonstersDefeated + 1
        );
      }
    }
  }
}

function updateAttack(delta) {
  attackTimer = Math.max(0, attackTimer - delta);
}

function getAttackRect() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const size = 34;

  if (player.direction === "left") return { x: centerX - size, y: centerY - 14, width: size, height: 28 };
  if (player.direction === "right") return { x: centerX, y: centerY - 14, width: size, height: 28 };
  if (player.direction === "up") return { x: centerX - 14, y: centerY - size, width: 28, height: size };
  return { x: centerX - 14, y: centerY, width: 28, height: size };
}

function findNearbyNpc() {
  return interactables.find((obj) => {
    if (obj.type !== "npc") return false;

    const playerCenter = {
      x: player.x + player.width / 2,
      y: player.y + player.height / 2,
      width: 1,
      height: 1
    };
    const range = {
      x: obj.x - 34,
      y: obj.y - 34,
      width: obj.width + 68,
      height: obj.height + 68
    };

    return rectsOverlap(playerCenter, range);
  });
}

function updateInteractionHint() {
  const npcNearby = findNearbyNpc();
  interactionHint.classList.toggle("hidden", !npcNearby || dialogOpen);
}

function toggleInteraction() {
  if (shopOpen) {
    closeShop();
    closeDialog();
    return;
  }

  if (dialogOpen) {
    closeDialog();
    return;
  }

  const target = findInteraction();
  if (target) {
    playSound(target.type === "npc" ? "npc" : "dialog");
    dialogText.textContent = getQuestMessage(target);
    updateQuestProgress();
    dialogBox.classList.remove("hidden");
    dialogOpen = true;
  }
}

function closeDialog() {
  dialogBox.classList.add("hidden");
  dialogOpen = false;
}

function resetPlayer() {
  if (currentScene !== "village") {
    setActiveScene("village");
  }
  gameOver = false;
  gameOverScreen.classList.add("hidden");
  player.health = player.maxHealth;
  player.x = player.startX;
  player.y = player.startY;
  player.direction = "down";
  closeDialog();
}

function gameLoop(time) {
  const delta = Math.min((time - lastTime) / 1000, 0.05);
  lastTime = time;

  update(delta);
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", "e", "i", "u", " "].includes(key)) {
    event.preventDefault();
  }

  if (key === "i") {
    toggleInventory();
    return;
  }

  if (key === "u") {
    usePotion();
    return;
  }

  if (key === " ") {
    triggerAttack();
    return;
  }

  if (key === "e") {
    toggleInteraction();
    return;
  }

  keys.add(key);
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

function setupTouchControls() {
  for (const button of touchDirectionButtons) {
    const key = button.dataset.touchKey;

    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      button.setPointerCapture(event.pointerId);
      button.classList.add("is-pressed");
      keys.add(key);
    });

    const release = (event) => {
      event.preventDefault();
      button.classList.remove("is-pressed");
      keys.delete(key);
    };

    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("lostpointercapture", () => {
      button.classList.remove("is-pressed");
      keys.delete(key);
    });
  }

  const bindTouchAction = (button, action) => {
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      button.classList.add("is-pressed");
      action();
    });
    button.addEventListener("pointerup", (event) => {
      event.preventDefault();
      button.classList.remove("is-pressed");
    });
    button.addEventListener("pointercancel", () => {
      button.classList.remove("is-pressed");
    });
  };

  bindTouchAction(touchActionButton, toggleInteraction);
  bindTouchAction(touchAttackButton, triggerAttack);
  bindTouchAction(touchInventoryButton, toggleInventory);

  document.addEventListener("touchmove", (event) => {
    if (event.target.closest(".touch-controls")) {
      event.preventDefault();
    }
  }, { passive: false });
}

resetButton.addEventListener("click", resetPlayer);
gameOverResetButton.addEventListener("click", resetPlayer);
buyPotionButton.addEventListener("click", buyPotion);
saveButton.addEventListener("click", () => {
  saveGame();
  saveButton.textContent = "Salvo!";
  setTimeout(() => {
    saveButton.textContent = "Salvar Jogo";
  }, 1200);
});
playButton.addEventListener("click", () => startGame(false));
continueButton.addEventListener("click", () => startGame(true));
howToButton.addEventListener("click", () => {
  showInfo(
    "Como Jogar",
    "W A S D ou setas: mover\nE: conversar/interagir\nEspaco: atacar\nI: inventario\nU: usar pocao\nEntre nas portas para visitar interiores.\nUse Salvar Jogo para guardar seu progresso."
  );
});
creditsButton.addEventListener("click", () => {
  showInfo(
    "Creditos",
    "Gabryel Garcia o Brabo\nJogo feito em HTML, CSS e JavaScript puro.\nArte original em Canvas 2D, sons e musica com Web Audio API."
  );
});
closeInfoButton.addEventListener("click", () => infoPanel.classList.add("hidden"));

setupTouchControls();
requestAnimationFrame(gameLoop);
