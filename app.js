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
const characterNameInput = document.getElementById("characterNameInput");
const playerNameEl = document.getElementById("playerName");
const xpHud = document.getElementById("xpHud");
const xpFill = document.getElementById("xpFill");
const playerPositionEl = document.getElementById("playerPosition");
const questProgressEl = document.getElementById("questProgress");
const healthHud = document.getElementById("healthHud");
const manaHud = document.getElementById("manaHud");
const manaFill = document.getElementById("manaFill");
const coinHud = document.getElementById("coinHud");
const weaponHud = document.getElementById("weaponHud");
const oxygenHud = document.getElementById("oxygenHud");
const oxygenFill = document.getElementById("oxygenFill");
const powerHud = document.getElementById("powerHud");
const bossHud = document.getElementById("bossHud");
const bossNameHud = document.getElementById("bossNameHud");
const bossFill = document.getElementById("bossFill");
const resetButton = document.getElementById("resetButton");
const dialogBox = document.getElementById("dialogBox");
const dialogText = document.getElementById("dialogText");
const interactionHint = document.getElementById("interactionHint");
const inventoryPanel = document.getElementById("inventoryPanel");
const inventoryList = document.getElementById("inventoryList");
const closeInventoryButton = document.getElementById("closeInventoryButton");
const inventoryTabs = document.getElementById("inventoryTabs");
const inventoryGrid = document.getElementById("inventoryGrid");
const inventoryEmpty = document.getElementById("inventoryEmpty");
const equipmentSlots = document.getElementById("equipmentSlots");
const itemDetailName = document.getElementById("itemDetailName");
const itemDetailMeta = document.getElementById("itemDetailMeta");
const itemDetailDescription = document.getElementById("itemDetailDescription");
const itemDetailEffect = document.getElementById("itemDetailEffect");
const itemDetailActions = document.getElementById("itemDetailActions");
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
const touchFireballButton = document.getElementById("touchFireballButton");
const touchDashButton = document.getElementById("touchDashButton");
const touchShockwaveButton = document.getElementById("touchShockwaveButton");
const touchHealButton = document.getElementById("touchHealButton");
const touchPowerButton = document.getElementById("touchPowerButton");
const touchWeaponButton = document.getElementById("touchWeaponButton");
const touchPower1Button = document.getElementById("touchPower1Button");
const touchPower2Button = document.getElementById("touchPower2Button");
const touchPower3Button = document.getElementById("touchPower3Button");
const touchPower4Button = document.getElementById("touchPower4Button");
const touchPotionButton = document.getElementById("touchPotionButton");
const touchContextLabel = document.getElementById("touchContextLabel");
const joystickBase = document.getElementById("joystickBase");
const joystickStick = document.getElementById("joystickStick");
const orientationHint = document.getElementById("orientationHint");
const mobileFullscreenButton = document.getElementById("mobileFullscreenButton");
const startFullscreenButton = document.getElementById("startFullscreenButton");
const mobilePauseButton = document.getElementById("mobilePauseButton");
const mobileDebugButton = document.getElementById("mobileDebugButton");
const hudMenuButton = document.getElementById("hudMenuButton");
const pausePanel = document.getElementById("pausePanel");
const pauseContinueButton = document.getElementById("pauseContinueButton");
const pauseSaveButton = document.getElementById("pauseSaveButton");
const pauseResetButton = document.getElementById("pauseResetButton");
const pauseHowToButton = document.getElementById("pauseHowToButton");
const pauseMissionsButton = document.getElementById("pauseMissionsButton");
const pauseStatusButton = document.getElementById("pauseStatusButton");
const pauseInventoryButton = document.getElementById("pauseInventoryButton");
const pauseMenuButton = document.getElementById("pauseMenuButton");
const missionsPanel = document.getElementById("missionsPanel");
const missionsList = document.getElementById("missionsList");
const closeMissionsButton = document.getElementById("closeMissionsButton");
const statusPanel = document.getElementById("statusPanel");
const statusList = document.getElementById("statusList");
const closeStatusButton = document.getElementById("closeStatusButton");
const debugPanel = document.getElementById("debugPanel");
const dialogContinueButton = document.getElementById("dialogContinueButton");

if (bossHud && canvas.parentElement && bossHud.parentElement !== canvas.parentElement) {
  canvas.parentElement.appendChild(bossHud);
}

const urlParams = new URLSearchParams(window.location.search);
const shouldAutoStart = urlParams.get("play") === "1" || urlParams.get("start") === "1";
const SAVE_KEY = "gabryel-garcia-o-brabo-save-v1";
const DEFAULT_NEW_PLAYER_NAME = "Upminaa";
const FALLBACK_PLAYER_NAME = "Lia";
const PLAYER_MAX_LEVEL = 1000;
const TILE = 32;
const MAP_COLS = 82;
const MAP_ROWS = 60;
const WORLD_WIDTH = MAP_COLS * TILE;
const WORLD_HEIGHT = MAP_ROWS * TILE;
const HOME_COLS = 30;
const HOME_ROWS = 20;
const HOME_WIDTH = HOME_COLS * TILE;
const HOME_HEIGHT = HOME_ROWS * TILE;
const CRYSTAL_COLS = 46;
const CRYSTAL_ROWS = 34;
const CRYSTAL_WIDTH = CRYSTAL_COLS * TILE;
const CRYSTAL_HEIGHT = CRYSTAL_ROWS * TILE;

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
let lastErrorMessage = "";
let attackWindupTimer = 0;
let attackRecoveryTimer = 0;
let attackHitDone = false;
let attackDirection = "down";
let hitstopTimer = 0;
let playerInvulnerableTimer = 0;
let playerKnockbackX = 0;
let playerKnockbackY = 0;
let regenTickTimer = 0;
let oxygenDamageTimer = 0;
let waterSoundTimer = 0;
let weaponCooldownTimer = 0;
let dodgeCooldownTimer = 0;
let equippedPower = "fireball";
let currentWeaponIndex = 0;
let currentMeleeAttack = null;
let isMobile = false;
let pauseOpen = false;
let missionsOpen = false;
let statusOpen = false;
let mobileLockedTarget = null;
let currentAutoAimTarget = null;
let pressedMobileButton = "";
let fpsEstimate = 0;
let fpsFrameCount = 0;
let fpsTimer = 0;
let debugEnabled = urlParams.get("debug") === "1";
let hudToastTimer = 0;
let hudToastText = "";
let inventoryTab = "all";
let selectedInventoryItemId = "";

const joystick = {
  active: false,
  pointerId: null,
  centerX: 0,
  centerY: 0,
  x: 0,
  y: 0,
  strength: 0
};

const mouseAim = {
  screenX: 0,
  screenY: 0,
  worldX: 30 * TILE,
  worldY: 24 * TILE,
  angle: 0,
  active: false
};

const activePowerUps = {
  speed: 0,
  force: 0,
  shield: 0,
  regen: 0,
  waterBreathing: 0
};

const projectiles = [];
const playerProjectiles = projectiles;
const enemyProjectiles = [];
const floatingTexts = [];
const shockwaves = [];
const dashTrails = [];
const healBursts = [];
const lootItems = [];
const hazardZones = [];

const spellCosts = {
  fireball: 2,
  blueRay: 2,
  dash: 1,
  shockwave: 3,
  heal: 3
};

const powerSlots = ["fireball", "blueRay", "shockwave", "heal"];

const powerNames = {
  fireball: "Bola de Fogo",
  blueRay: "Raio Azul",
  shockwave: "Onda de Choque",
  heal: "Cura Magica"
};

const weaponOrder = ["sword", "bow", "staff", "spear"];

const weapons = {
  sword: { name: "Espada curta", damage: 2, range: 48, cooldown: 0.32, arc: Math.PI * 0.72, kind: "melee", damageType: "fisico" },
  bow: { name: "Arco", damage: 2, range: 420, cooldown: 0.42, projectile: "arrow", projectileSpeed: 420, kind: "projectile", damageType: "fisico" },
  staff: { name: "Cajado", damage: 3, range: 390, cooldown: 0.52, projectile: "blueMagic", projectileSpeed: 330, kind: "projectile", damageType: "magico" },
  spear: { name: "Lanca", damage: 3, range: 72, cooldown: 0.48, arc: Math.PI * 0.24, kind: "line", damageType: "fisico" }
};

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
  cartas: 0,
  fragmentos: 0,
  flechas: 12,
  chavesRaras: 0,
  manaOrbes: 0,
  itensBoss: []
};

const questBook = {
  keyFound: false,
  forestMonstersDefeated: 0,
  forestMonstersGoal: 3,
  letterPicked: false,
  letterDelivered: false,
  bossDefeated: false,
  bossChestOpened: false,
  defeatedBosses: {},
  openedChests: {},
  discoveredAreas: {}
};

const dimensionQuest = {
  entered: false,
  status: "notStarted",
  activatedCrystals: 0,
  totalCrystals: 3,
  bridgeOpen: false,
  chestOpened: false,
  missionDone: false
};

const dimensionParticles = Array.from({ length: 70 }, (_, index) => ({
  x: ((index * 97) % CRYSTAL_WIDTH),
  y: ((index * 151) % CRYSTAL_HEIGHT),
  size: 2 + (index % 3),
  speed: 0.4 + (index % 5) * 0.12,
  phase: index * 0.73
}));

const player = {
  name: DEFAULT_NEW_PLAYER_NAME,
  x: 30 * TILE,
  y: 24 * TILE,
  startX: 30 * TILE,
  startY: 24 * TILE,
  width: 22,
  height: 26,
  speed: 150,
  baseSpeed: 150,
  maxHealth: 5,
  health: 5,
  defense: 0,
  critChance: 0.12,
  level: 1,
  xp: 0,
  xpToNextLevel: 58,
  maxLevel: PLAYER_MAX_LEVEL,
  totalXp: 0,
  skillPoints: 0,
  damageBonus: 0,
  levelGlowTimer: 0,
  maxMana: 6,
  mana: 6,
  manaRegen: 0.45,
  spellCooldowns: {
    fireball: 0,
    blueRay: 0,
    dash: 0,
    shockwave: 0,
    heal: 0
  },
  unlockedWeapons: ["sword", "bow", "staff", "spear"],
  isSwimming: false,
  maxOxygen: 10,
  oxygen: 10,
  direction: "down",
  moving: false,
  frame: 0,
  animTimer: 0
};

normalizeLevelState();
playerNameEl.textContent = getPlayerHudName();
if (characterNameInput) characterNameInput.value = DEFAULT_NEW_PLAYER_NAME;

// G = grama, F = floresta, D = caminho, P = praca, W = agua
const worldMap = createWorldMap();
const homeMap = createHomeMap();
const crystalDimensionMap = createCrystalDimensionMap();

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

  // Expansao do mapa: novas regioes conectadas por caminhos.
  fillRect(map, 60, 6, 15, 11, "P");   // ruinas antigas
  fillRect(map, 58, 30, 18, 11, "G");  // campo aberto
  fillRect(map, 3, 47, 18, 10, "F");   // cemiterio abandonado
  fillRect(map, 0, 45, 25, 15, "F");   // floresta profunda
  fillRect(map, 61, 43, 13, 10, "P");  // arena de treino
  fillRect(map, 70, 45, 10, 12, "F");  // monstros fortes

  fillRect(map, 56, 24, 4, 23, "D");
  fillRect(map, 31, 40, 30, 3, "D");
  fillRect(map, 18, 49, 45, 3, "D");
  fillRect(map, 67, 16, 4, 29, "D");
  fillRect(map, 63, 38, 9, 3, "D");
  fillRect(map, 65, 48, 10, 3, "D");
  fillRect(map, 6, 51, 16, 3, "D");
  fillRect(map, 51, 52, 14, 2, "D");   // caminho secreto

  paintEllipse(map, 66, 24, 10, 7, "W");
  paintEllipse(map, 73, 24, 6, 5, "W");
  paintEllipse(map, 62, 27, 5, 4, "W");
  paintEllipse(map, 36, 32, 3, 2, "W");

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

function createCrystalDimensionMap() {
  const map = Array.from({ length: CRYSTAL_ROWS }, () => Array(CRYSTAL_COLS).fill("C"));

  fillCrystalRect(map, 0, 0, CRYSTAL_COLS, 1, "M");
  fillCrystalRect(map, 0, CRYSTAL_ROWS - 1, CRYSTAL_COLS, 1, "M");
  fillCrystalRect(map, 0, 0, 1, CRYSTAL_ROWS, "M");
  fillCrystalRect(map, CRYSTAL_COLS - 1, 0, 1, CRYSTAL_ROWS, "M");

  fillCrystalRect(map, 20, 27, 7, 5, "Q");
  fillCrystalRect(map, 21, 13, 5, 16, "Q");
  fillCrystalRect(map, 9, 18, 28, 5, "Q");
  fillCrystalRect(map, 17, 7, 12, 7, "Q");
  fillCrystalRect(map, 21, 4, 5, 5, "Q");

  paintCrystalEllipse(map, 9, 10, 6, 4, "M");
  paintCrystalEllipse(map, 36, 9, 6, 4, "M");
  paintCrystalEllipse(map, 37, 25, 6, 4, "M");
  paintCrystalEllipse(map, 8, 27, 4, 3, "M");

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

function fillCrystalRect(map, startX, startY, width, height, tile) {
  for (let y = startY; y < startY + height; y++) {
    for (let x = startX; x < startX + width; x++) {
      if (x >= 0 && y >= 0 && x < CRYSTAL_COLS && y < CRYSTAL_ROWS) {
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

function paintCrystalEllipse(map, centerX, centerY, radiusX, radiusY, tile) {
  for (let y = centerY - radiusY; y <= centerY + radiusY; y++) {
    for (let x = centerX - radiusX; x <= centerX + radiusX; x++) {
      const dx = (x - centerX) / radiusX;
      const dy = (y - centerY) / radiusY;
      if (dx * dx + dy * dy <= 1 && x >= 0 && y >= 0 && x < CRYSTAL_COLS && y < CRYSTAL_ROWS) {
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
  portal(34, 24),
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
  sign(36, 27, "PORTAL NOVO: pressione E perto do brilho para entrar na Dimensao Cristalina."),
  sign(56, 38, "Portal antigo: o brilho agora leva para a Dimensao Cristalina."),

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
  rock(18, 35), rock(41, 36), rock(7, 38), rock(58, 10),

  sign(33, 28, "MAPA EXPANDIDO: siga o novo caminho ao sul da praca para descobrir outras regioes."),
  sign(35, 30, "TESTE DE COMBATE: use mouse, Tab, Q, 1-4 e Espaco para praticar."),
  sign(34, 33, "Area de treino: armas liberadas, cristais de mana e lago pequeno para nadar."),
  sign(63, 18, "Lago Maior: a agua magica ficou mais profunda nesta parte da vila."),
  sign(63, 23, "Lago dos Ecos: entre na agua para nadar, mas cuide do oxigenio."),
  sign(61, 9, "Ruinas Antigas: dizem que um guardiao desperta quando alguem treina magia aqui."),
  sign(58, 37, "Campo Aberto: bom para testar dash e bola de fogo."),
  sign(7, 50, "Floresta profunda: aranhas, goblins e morcegos cercam os caminhos."),
  sign(63, 43, "Arena do Guardiao: bosses mostram barra de vida no topo."),
  sign(72, 46, "Area Perigosa: monstros fortes causam mais dano."),
  sign(74, 45, "Perigo: inimigos fortes e miniDragao guardam tesouros."),
  sign(53, 53, "Caminho Secreto: siga as pedras claras ate a floresta profunda."),

  house(60, 32, "Casa do Campo"),
  house(72, 34, "Casa do Treinador"),
  house(6, 53, "Cabana Esquecida"),
  fence(61, 42, 12, "horizontal"),
  fence(61, 52, 12, "horizontal"),
  fence(61, 43, 8, "vertical"),
  fence(72, 43, 8, "vertical"),
  fence(3, 46, 16, "horizontal"),

  tree(2, 48), tree(5, 46), tree(9, 45), tree(13, 46), tree(17, 48),
  tree(3, 55), tree(12, 56), tree(19, 54), tree(24, 50), tree(27, 52),
  tree(73, 47), tree(77, 48), tree(80, 52), tree(76, 56), tree(70, 57),
  tree(58, 29), tree(61, 30), tree(75, 31), tree(78, 34),
  rock(60, 8), rock(65, 9), rock(72, 12), rock(68, 15),
  rock(58, 35), rock(70, 38), rock(64, 47), rock(75, 50),
  flower(59, 33, "yellow"), flower(63, 36, "blue"), flower(70, 32, "pink"),
  flower(74, 39, "yellow"), flower(12, 49, "blue"), flower(16, 54, "pink"),

  enemy(62, 35, "slime"), enemy(67, 37, "morcego"),
  enemy(9, 51, "mago"), enemy(15, 53, "slimeVermelho"),
  enemy(73, 49, "slimeVermelho"), enemy(77, 52, "golem"),
  enemy(68, 47, "guardiao"),
  enemy(34, 31, "slimeVerde"), enemy(37, 34, "slimeVerde"), enemy(39, 31, "arqueiroGoblin"),
  enemy(58, 34, "slimeVerde"), enemy(62, 38, "goblin"), enemy(66, 35, "arqueiroGoblin"),
  enemy(8, 49, "aranha"), enemy(12, 50, "goblin"), enemy(17, 52, "morcego"),
  enemy(20, 55, "aranha"), enemy(24, 51, "arqueiroGoblin"),
  enemy(60, 24, "slimeAzul"), enemy(66, 26, "peixeHostil"), enemy(72, 24, "peixeHostil"),
  enemy(63, 12, "fantasma"), enemy(68, 13, "magoSombrio"), enemy(72, 10, "golemPedra"),
  enemy(75, 48, "miniDragao"), enemy(79, 54, "golemPedra"), enemy(74, 55, "magoSombrio"),
  boss(35, 35, "miniGuardiao"),
  boss(60, 30, "reiSlime"),
  boss(14, 56, "aranhaRainha"),
  boss(69, 10, "golemAncestral"),
  boss(73, 14, "bruxoSombrio"),
  boss(69, 24, "serpenteLago"),
  rareChest(67, 49)
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

const crystalDimensionObjects = [
  block(0, 0, CRYSTAL_COLS, 1),
  block(0, CRYSTAL_ROWS - 1, CRYSTAL_COLS, 1),
  block(0, 0, 1, CRYSTAL_ROWS),
  block(CRYSTAL_COLS - 1, 0, 1, CRYSTAL_ROWS),
  dimensionPortal(22, 29, "exit"),
  dimensionBlocker(21, 13, 5, 2),

  npc(20, 25, "Orion", "Orion: Ative tres cristais magicos para abrir o caminho secreto.", "dimensionGuide"),
  npc(28, 17, "Nyx", "Nyx: Esta dimensao guarda ecos da vila. As pedras flutuam quando alguem desperta os cristais.", "dimensionMystic"),

  dimensionCrystal(12, 20, 0, "Cristal da Memoria: ele mostra a vila refletida em luz roxa."),
  dimensionCrystal(34, 20, 1, "Cristal do Caminho: linhas brilhantes apontam para o norte."),
  dimensionCrystal(23, 16, 2, "Cristal do Portal: um som baixo vibra dentro dele."),
  dimensionChest(22, 6),
  dimensionSign(20, 28, "Inscricao: tres luzes acordam a ponte perdida."),
  talkingStone(31, 25, "Pedra flutuante: quem entra deve lembrar o caminho de volta."),
  magicFountain(16, 9, "Fonte magica: a agua brilha, mas ainda bloqueia a passagem."),

  largeCrystal(7, 17), largeCrystal(39, 17), largeCrystal(18, 12), largeCrystal(28, 12),
  largeCrystal(15, 25), largeCrystal(31, 28), largeCrystal(10, 6), largeCrystal(40, 7),
  strangeTree(5, 23), strangeTree(39, 26), strangeTree(6, 14), strangeTree(36, 14),
  floatingRock(14, 18), floatingRock(32, 18), floatingRock(18, 24), floatingRock(27, 24),
  floatingRock(20, 9), floatingRock(27, 9)
];

const powerUps = [
  powerUp(35, 29, "speed"),
  powerUp(60, 35, "speed"),
  powerUp(64, 11, "force"),
  powerUp(73, 50, "force"),
  powerUp(64, 45, "shield"),
  powerUp(8, 52, "shield"),
  powerUp(12, 50, "regen"),
  powerUp(70, 38, "regen"),
  powerUp(58, 52, "mana"),
  powerUp(69, 24, "mana"),
  powerUp(63, 25, "waterBreathing"),
  powerUp(36, 32, "waterBreathing")
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
    role: "crystalEntry",
    x: tileX * TILE,
    y: tileY * TILE - 8,
    width: TILE * 2,
    height: TILE * 3,
    solid: false,
    message: "Pressione E para entrar no portal."
  };
}

function dimensionPortal(tileX, tileY, role) {
  return {
    type: "dimensionPortal",
    role,
    x: tileX * TILE,
    y: tileY * TILE - 8,
    width: TILE * 2,
    height: TILE * 3,
    solid: false,
    message: role === "exit" ? "Portal de volta: pressione E para retornar a vila." : "Portal cristalino."
  };
}

function dimensionBlocker(tileX, tileY, widthTiles, heightTiles) {
  return {
    type: "dimensionBlocker",
    x: tileX * TILE,
    y: tileY * TILE,
    width: widthTiles * TILE,
    height: heightTiles * TILE,
    solid: true
  };
}

function dimensionCrystal(tileX, tileY, crystalIndex, message) {
  return {
    type: "dimensionCrystal",
    crystalIndex,
    x: tileX * TILE + 6,
    y: tileY * TILE,
    width: 22,
    height: 32,
    solid: false,
    message,
    activated: false,
    activatedAt: 0
  };
}

function dimensionChest(tileX, tileY) {
  return {
    type: "dimensionChest",
    x: tileX * TILE,
    y: tileY * TILE + 8,
    width: TILE * 2,
    height: TILE,
    solid: true,
    opened: false,
    message: "Bau especial: a fechadura tem tres marcas de cristal."
  };
}

function dimensionSign(tileX, tileY, message) {
  return {
    type: "dimensionSign",
    x: tileX * TILE + 8,
    y: tileY * TILE + 6,
    width: 18,
    height: 24,
    solid: true,
    message
  };
}

function talkingStone(tileX, tileY, message) {
  return {
    type: "talkingStone",
    x: tileX * TILE + 4,
    y: tileY * TILE + 8,
    width: 24,
    height: 20,
    solid: true,
    message
  };
}

function magicFountain(tileX, tileY, message) {
  return {
    type: "magicFountain",
    x: tileX * TILE,
    y: tileY * TILE,
    width: TILE * 2,
    height: TILE * 2,
    solid: true,
    message
  };
}

function largeCrystal(tileX, tileY) {
  return {
    type: "largeCrystal",
    x: tileX * TILE + 2,
    y: tileY * TILE - 4,
    width: 28,
    height: 42,
    solid: true
  };
}

function strangeTree(tileX, tileY) {
  return {
    type: "strangeTree",
    x: tileX * TILE,
    y: tileY * TILE - 8,
    width: TILE,
    height: TILE * 2,
    solid: true
  };
}

function floatingRock(tileX, tileY) {
  return {
    type: "floatingRock",
    x: tileX * TILE + 5,
    y: tileY * TILE + 8,
    width: 22,
    height: 18,
    solid: true
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

function rareChest(tileX, tileY) {
  return {
    type: "rareChest",
    x: tileX * TILE,
    y: tileY * TILE + 8,
    width: TILE * 2,
    height: TILE,
    solid: true,
    message: "Bau raro do Guardiao: parece esperar a queda do boss."
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

function powerUp(tileX, tileY, kind, dropped = false) {
  return {
    type: "powerUp",
    kind,
    x: tileX * TILE + 7,
    y: tileY * TILE + 7,
    width: 18,
    height: 18,
    solid: false,
    collected: false,
    dropped
  };
}

function enemy(tileX, tileY, kind) {
  const stats = getEnemyStats(kind);
  return {
    type: "enemy",
    kind,
    x: tileX * TILE + 4,
    y: tileY * TILE + 4,
    width: stats.width,
    height: stats.height,
    solid: false,
    hp: stats.hp,
    maxHp: stats.hp,
    damage: stats.damage,
    speed: stats.speed,
    state: "idle",
    spawnX: tileX * TILE + 4,
    spawnY: tileY * TILE + 4,
    aggroRange: stats.aggroRange,
    attackRange: stats.attackRange,
    attackCooldown: 0,
    attackDelay: stats.attackDelay,
    attackTimer: 0,
    invulnerableTimer: 0,
    knockbackX: 0,
    knockbackY: 0,
    canFly: Boolean(stats.canFly),
    canSwim: Boolean(stats.canSwim),
    projectileType: stats.projectileType || null,
    dropTable: stats.dropTable,
    xpReward: stats.xpReward || stats.coinReward,
    coinReward: stats.coinReward,
    coinsReward: stats.coinReward,
    defense: stats.defense || 0,
    resistances: stats.resistances || {},
    boss: stats.boss,
    bossItem: stats.bossItem || null,
    phase: 1,
    direction: Math.random() > 0.5 ? "left" : "right",
    moveTimer: 0,
    alive: true
  };
}

function boss(tileX, tileY, kind) {
  const obj = enemy(tileX, tileY, kind);
  obj.boss = true;
  obj.state = "bossIdle";
  return obj;
}

function getEnemyStats(kind) {
  const baseDrop = { coin: 0.8, potion: 0.12, powerUp: 0.15, loot: 0.2 };
  const stats = {
    slimeVerde: {
      width: 22, height: 20, hp: 3, damage: 1, speed: 45,
      aggroRange: 190, attackRange: 28, attackDelay: 1.1, coinReward: 3,
      projectileType: null, dropTable: baseDrop, xpReward: 2
    },
    slimeVermelho: {
      width: 24, height: 22, hp: 5, damage: 2, speed: 54,
      aggroRange: 230, attackRange: 30, attackDelay: 1.0, coinReward: 6,
      projectileType: null, dropTable: { coin: 0.9, potion: 0.16, powerUp: 0.22, loot: 0.24 }, xpReward: 4
    },
    slimeAzul: {
      width: 23, height: 21, hp: 4, damage: 1, speed: 48,
      aggroRange: 230, attackRange: 150, attackDelay: 1.35, coinReward: 5,
      canSwim: true, projectileType: "bubble", resistances: { agua: 0.5 },
      dropTable: { coin: 0.8, potion: 0.1, powerUp: 0.2, loot: 0.3 }, xpReward: 3
    },
    morcego: {
      width: 24, height: 18, hp: 2, damage: 1, speed: 82,
      aggroRange: 250, attackRange: 26, attackDelay: 0.9, coinReward: 5,
      canFly: true, dropTable: { coin: 0.8, potion: 0.08, powerUp: 0.16, loot: 0.18 }, xpReward: 3
    },
    aranha: {
      width: 24, height: 18, hp: 4, damage: 1, speed: 62,
      aggroRange: 230, attackRange: 32, attackDelay: 1.0, coinReward: 5,
      projectileType: "web", dropTable: { coin: 0.75, potion: 0.1, powerUp: 0.18, loot: 0.25 }, xpReward: 4
    },
    goblin: {
      width: 22, height: 28, hp: 5, damage: 1, speed: 66,
      aggroRange: 250, attackRange: 30, attackDelay: 0.95, coinReward: 7,
      dropTable: { coin: 0.9, potion: 0.12, powerUp: 0.18, loot: 0.28 }, xpReward: 5
    },
    arqueiroGoblin: {
      width: 22, height: 28, hp: 4, damage: 1, speed: 52,
      aggroRange: 280, attackRange: 215, attackDelay: 1.45, coinReward: 8,
      projectileType: "arrow", dropTable: { coin: 0.9, potion: 0.1, powerUp: 0.2, loot: 0.4 }, xpReward: 5
    },
    magoSombrio: {
      width: 24, height: 28, hp: 5, damage: 1, speed: 42,
      aggroRange: 295, attackRange: 230, attackDelay: 1.55, coinReward: 10,
      projectileType: "shadow", resistances: { sombra: 0.5 },
      dropTable: { coin: 1, potion: 0.16, powerUp: 0.28, loot: 0.45 }, xpReward: 7
    },
    golemPedra: {
      width: 30, height: 30, hp: 9, damage: 2, speed: 32,
      aggroRange: 220, attackRange: 36, attackDelay: 1.35, coinReward: 10,
      projectileType: "stone", defense: 1, resistances: { fisico: 0.75, magico: 1.25 },
      dropTable: { coin: 1, potion: 0.2, powerUp: 0.24, loot: 0.36 }, xpReward: 8
    },
    fantasma: {
      width: 24, height: 28, hp: 4, damage: 1, speed: 58,
      aggroRange: 270, attackRange: 30, attackDelay: 1.1, coinReward: 7,
      canFly: true, resistances: { fisico: 0.45, magico: 1.2 },
      dropTable: { coin: 0.8, potion: 0.08, powerUp: 0.22, loot: 0.35 }, xpReward: 6
    },
    peixeHostil: {
      width: 24, height: 16, hp: 3, damage: 1, speed: 72,
      aggroRange: 240, attackRange: 26, attackDelay: 0.85, coinReward: 5,
      canSwim: true, resistances: { agua: 0.5 },
      dropTable: { coin: 0.75, potion: 0.08, powerUp: 0.2, loot: 0.35 }, xpReward: 4
    },
    miniDragao: {
      width: 34, height: 26, hp: 12, damage: 2, speed: 68,
      aggroRange: 330, attackRange: 250, attackDelay: 1.2, coinReward: 18,
      canFly: true, projectileType: "fire", resistances: { fogo: 0.5, agua: 1.35 },
      dropTable: { coin: 1, potion: 0.35, powerUp: 0.5, loot: 0.7 }, xpReward: 14
    },
    miniGuardiao: {
      width: 34, height: 36, hp: 14, damage: 1, speed: 38,
      aggroRange: 260, attackRange: 150, attackDelay: 1.25, coinReward: 20,
      projectileType: "stone", defense: 1, boss: true, bossItem: "Insignia de Treino",
      dropTable: { coin: 1, potion: 0.5, powerUp: 0.8, loot: 0.7 }, xpReward: 12
    },
    reiSlime: {
      width: 42, height: 34, hp: 28, damage: 2, speed: 46,
      aggroRange: 330, attackRange: 44, attackDelay: 1.05, coinReward: 35,
      boss: true, bossItem: "Gelatina Real", projectileType: "slimeBall",
      dropTable: { coin: 1, potion: 0.8, powerUp: 1, loot: 1 }, xpReward: 25
    },
    aranhaRainha: {
      width: 44, height: 34, hp: 34, damage: 2, speed: 54,
      aggroRange: 350, attackRange: 210, attackDelay: 1.25, coinReward: 42,
      boss: true, bossItem: "Presa da Rainha", projectileType: "web",
      dropTable: { coin: 1, potion: 0.8, powerUp: 1, loot: 1 }, xpReward: 30
    },
    golemAncestral: {
      width: 46, height: 48, hp: 42, damage: 3, speed: 30,
      aggroRange: 350, attackRange: 230, attackDelay: 1.35, coinReward: 50,
      boss: true, bossItem: "Nucleo de Pedra", projectileType: "stone", defense: 2,
      resistances: { fisico: 0.65, magico: 1.25 },
      dropTable: { coin: 1, potion: 0.8, powerUp: 1, loot: 1 }, xpReward: 36
    },
    bruxoSombrio: {
      width: 30, height: 38, hp: 36, damage: 2, speed: 48,
      aggroRange: 380, attackRange: 260, attackDelay: 1.05, coinReward: 48,
      boss: true, bossItem: "Olho Sombrio", projectileType: "shadow", resistances: { sombra: 0.45 },
      dropTable: { coin: 1, potion: 0.8, powerUp: 1, loot: 1 }, xpReward: 34
    },
    serpenteLago: {
      width: 54, height: 24, hp: 38, damage: 2, speed: 72,
      aggroRange: 360, attackRange: 240, attackDelay: 1.15, coinReward: 50,
      boss: true, bossItem: "Escama da Serpente", projectileType: "bubble", canSwim: true,
      resistances: { agua: 0.45, fogo: 1.35 },
      dropTable: { coin: 1, potion: 0.8, powerUp: 1, loot: 1 }, xpReward: 35
    },
    guardiao: {
      width: 38, height: 42, hp: 22, damage: 2, speed: 44,
      aggroRange: 330, attackRange: 240, attackDelay: 1.35, coinReward: 35,
      dropTable: { coin: 1, potion: 1, powerUp: 1 },
      boss: true
    }
  };

  stats.slime = stats.slimeVerde;
  stats.golem = stats.golemPedra;
  stats.mago = stats.magoSombrio;

  return stats[kind] || stats.slime;
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
  if (currentScene === "crystalDimension") {
    if (tileX < 0 || tileY < 0 || tileX >= CRYSTAL_COLS || tileY >= CRYSTAL_ROWS) {
      return true;
    }
    return crystalDimensionMap[tileY][tileX] === "M";
  }

  if (currentScene !== "village") return false;

  if (tileX < 0 || tileY < 0 || tileX >= MAP_COLS || tileY >= MAP_ROWS) {
    return true;
  }
  return worldMap[tileY][tileX] === "W";
}

function isColliderActive(obj) {
  if (obj.type === "dimensionBlocker" && dimensionQuest.bridgeOpen) return false;
  if (obj.type === "rareChest" && (!questBook.bossDefeated || questBook.bossChestOpened)) return false;
  return obj.solid;
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

function isPointInVillageWater(x, y) {
  if (currentScene !== "village") return false;
  const tileX = Math.floor(x / TILE);
  const tileY = Math.floor(y / TILE);
  if (tileX < 0 || tileY < 0 || tileX >= MAP_COLS || tileY >= MAP_ROWS) return false;
  return worldMap[tileY][tileX] === "W";
}

function updateSwimming(delta) {
  if (currentScene !== "village") {
    player.isSwimming = false;
    player.oxygen = Math.min(player.maxOxygen, player.oxygen + delta * 3);
    return;
  }

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2 + 6;
  player.isSwimming = isPointInVillageWater(centerX, centerY);

  if (player.isSwimming) {
    if (activePowerUps.waterBreathing <= 0) {
      player.oxygen = Math.max(0, player.oxygen - delta * 0.55);
    } else {
      player.oxygen = Math.min(player.maxOxygen, player.oxygen + delta * 1.5);
    }

    waterSoundTimer -= delta;
    if (waterSoundTimer <= 0) {
      playSound("water");
      waterSoundTimer = 1.6;
    }

    if (player.oxygen <= 0) {
      oxygenDamageTimer -= delta;
      if (oxygenDamageTimer <= 0) {
        takeDamage(1, centerX, centerY);
        oxygenDamageTimer = 1.4;
      }
    } else {
      oxygenDamageTimer = 0.6;
    }
  } else {
    player.oxygen = Math.min(player.maxOxygen, player.oxygen + delta * 2.2);
    oxygenDamageTimer = 0;
  }
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

  if (hitsWater(rect) && currentScene !== "village") return false;

  return !colliders.some((obj) => isColliderActive(obj) && rectsOverlap(rect, obj));
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

  if (currentScene === "crystalDimension" && hitsWater(rect)) return false;
  if (currentScene === "village" && hitsWater(rect) && !entity.canSwim && !entity.canFly) return false;

  return !colliders.some((obj) => (
    obj !== entity &&
    obj.type !== "enemy" &&
    isColliderActive(obj) &&
    !entityIgnoresCollider(entity, obj) &&
    rectsOverlap(rect, obj)
  ));
}

function entityIgnoresCollider(entity, obj) {
  if (entity.canFly && ["tree", "fence", "rock", "well", "bench"].includes(obj.type)) return true;
  if (entity.kind === "fantasma" && !["block", "house", "playerHouse", "shop", "cave"].includes(obj.type)) return true;
  return false;
}

function getSceneWidth() {
  if (currentScene === "village") return WORLD_WIDTH;
  if (currentScene === "crystalDimension") return CRYSTAL_WIDTH;
  return HOME_WIDTH;
}

function getSceneHeight() {
  if (currentScene === "village") return WORLD_HEIGHT;
  if (currentScene === "crystalDimension") return CRYSTAL_HEIGHT;
  return HOME_HEIGHT;
}

function getSceneName() {
  if (currentScene === "home") return "Casa";
  if (currentScene === "shopInterior") return "Loja";
  if (currentScene === "mayorInterior") return "Prefeito";
  if (currentScene === "crystalDimension") return "Dimensao Cristalina";
  return "Vila";
}

function setActiveScene(scene) {
  const validScenes = ["village", "home", "shopInterior", "mayorInterior", "crystalDimension"];
  const safeScene = validScenes.includes(scene) ? scene : "village";
  if (safeScene !== scene) {
    showErrorMessage(`Cena invalida "${scene}". Voltando para a vila.`);
  }

  currentScene = safeScene;
  if (safeScene === "home") objects = homeObjects;
  else if (safeScene === "shopInterior") objects = shopInteriorObjects;
  else if (safeScene === "mayorInterior") objects = mayorInteriorObjects;
  else if (safeScene === "crystalDimension") objects = crystalDimensionObjects;
  else objects = villageObjects;
  normalizeRuntimeState();
  colliders = objects.filter((obj) => obj.solid);
  interactables = objects.filter((obj) => obj.message);
  closeDialog();
  closeShop();
  keys.clear();
  projectiles.length = 0;
  enemyProjectiles.length = 0;
}

function normalizeRuntimeState() {
  normalizeLevelState();
  inventory.cristais = Number(inventory.cristais || 0);
  inventory.chaves = Number(inventory.chaves || 0);
  inventory.pocoes = Number(inventory.pocoes || 0);
  inventory.moedas = Number(inventory.moedas || 0);
  inventory.espadas = Number(inventory.espadas || 0);
  inventory.cartas = Number(inventory.cartas || 0);
  inventory.fragmentos = Number(inventory.fragmentos || 0);
  inventory.flechas = Number(inventory.flechas ?? 12);
  inventory.chavesRaras = Number(inventory.chavesRaras || 0);
  inventory.manaOrbes = Number(inventory.manaOrbes || 0);
  if (!Array.isArray(inventory.itensBoss)) inventory.itensBoss = [];

  if (!questBook.defeatedBosses || typeof questBook.defeatedBosses !== "object") {
    questBook.defeatedBosses = {};
  }
  if (!questBook.openedChests || typeof questBook.openedChests !== "object") {
    questBook.openedChests = {};
  }
  if (!questBook.discoveredAreas || typeof questBook.discoveredAreas !== "object") {
    questBook.discoveredAreas = {};
  }

  if (!Array.isArray(player.unlockedWeapons) || !player.unlockedWeapons.length) player.unlockedWeapons = [...weaponOrder];
  player.unlockedWeapons = player.unlockedWeapons.filter((key) => weapons[key]);
  if (!player.unlockedWeapons.length) player.unlockedWeapons = ["sword"];
  currentWeaponIndex = Number.isFinite(Number(currentWeaponIndex)) ? Math.floor(Number(currentWeaponIndex)) : 0;
  currentWeaponIndex = clamp(currentWeaponIndex, 0, player.unlockedWeapons.length - 1);
  if (!powerSlots.includes(equippedPower)) equippedPower = "fireball";
  if (!Number.isFinite(player.oxygen)) player.oxygen = player.maxOxygen;
  if (!Number.isFinite(player.maxOxygen)) player.maxOxygen = 10;
  player.oxygen = clamp(player.oxygen, 0, player.maxOxygen);

  for (const obj of villageObjects) {
    if (obj.type === "enemy") normalizeEnemy(obj);
  }
}

function normalizeEnemy(obj) {
  const stats = getEnemyStats(obj.kind);
  obj.width = obj.width || stats.width;
  obj.height = obj.height || stats.height;
  obj.maxHp = obj.maxHp || stats.hp;
  obj.hp = Number.isFinite(obj.hp) ? clamp(obj.hp, 0, obj.maxHp) : obj.maxHp;
  obj.damage = obj.damage || stats.damage;
  obj.speed = obj.speed || stats.speed;
  obj.aggroRange = obj.aggroRange || stats.aggroRange;
  obj.attackRange = obj.attackRange || stats.attackRange;
  obj.attackDelay = obj.attackDelay || stats.attackDelay;
  obj.attackCooldown = Number.isFinite(obj.attackCooldown) ? obj.attackCooldown : 0;
  obj.attackTimer = Number.isFinite(obj.attackTimer) ? obj.attackTimer : 0;
  obj.invulnerableTimer = Number.isFinite(obj.invulnerableTimer) ? obj.invulnerableTimer : 0;
  obj.knockbackX = Number.isFinite(obj.knockbackX) ? obj.knockbackX : 0;
  obj.knockbackY = Number.isFinite(obj.knockbackY) ? obj.knockbackY : 0;
  obj.spawnX = Number.isFinite(obj.spawnX) ? obj.spawnX : obj.x;
  obj.spawnY = Number.isFinite(obj.spawnY) ? obj.spawnY : obj.y;
  obj.canFly = Boolean(obj.canFly || stats.canFly);
  obj.canSwim = Boolean(obj.canSwim || stats.canSwim);
  obj.projectileType = obj.projectileType || stats.projectileType || null;
  obj.dropTable = obj.dropTable || stats.dropTable || { coin: 0.7, potion: 0.1, powerUp: 0.1, loot: 0.1 };
  obj.coinReward = Number.isFinite(obj.coinReward) ? obj.coinReward : stats.coinReward;
  obj.coinsReward = obj.coinReward;
  obj.xpReward = obj.xpReward || stats.xpReward || obj.coinReward;
  obj.defense = Number.isFinite(obj.defense) ? obj.defense : stats.defense || 0;
  obj.resistances = obj.resistances || stats.resistances || {};
  obj.boss = Boolean(obj.boss || stats.boss);
  obj.bossItem = obj.bossItem || stats.bossItem || null;
  obj.phase = obj.phase || 1;
  obj.direction = obj.direction || "down";
  obj.moveTimer = Number.isFinite(obj.moveTimer) ? obj.moveTimer : 0;
  obj.alive = obj.alive !== false;
}

function updateDeviceMode() {
  isMobile = window.matchMedia("(max-width: 880px), (pointer: coarse)").matches;
  document.body.classList.toggle("is-mobile", isMobile);

  const tooSmall = isMobile && window.innerWidth < 720 && window.innerHeight > window.innerWidth;
  orientationHint?.classList.toggle("hidden", !tooSmall);
  mobileDebugButton?.classList.toggle("hidden", !debugEnabled);
  debugPanel?.classList.toggle("hidden", !debugEnabled);
}

function ensureCanvasSize() {
  if (canvas.width <= 0) canvas.width = 960;
  if (canvas.height <= 0) canvas.height = 640;
  if (miniMapCanvas.width <= 0) miniMapCanvas.width = 170;
  if (miniMapCanvas.height <= 0) miniMapCanvas.height = 124;
}

function vibrate(pattern = 20) {
  if (!isMobile || !navigator.vibrate) return;
  try {
    navigator.vibrate(pattern);
  } catch (error) {
    // Alguns navegadores bloqueiam vibracao fora de gestos do usuario.
  }
}

function setMobilePressedButton(name) {
  pressedMobileButton = name;
}

function clearMobilePressedButton(name) {
  if (pressedMobileButton === name) pressedMobileButton = "";
}

function requestGameFullscreen() {
  const target = document.documentElement;
  const request = target.requestFullscreen || target.webkitRequestFullscreen || target.msRequestFullscreen;
  if (!request) {
    startMessage.textContent = "Tela cheia nao e suportada neste navegador.";
    return;
  }

  try {
    const result = request.call(target);
    if (result?.catch) {
      result.catch(() => {
        startMessage.textContent = "Toque novamente para ativar tela cheia.";
      });
    }
  } catch (error) {
    startMessage.textContent = "Toque novamente para ativar tela cheia.";
  }
}

function setPause(open) {
  pauseOpen = Boolean(open);
  pausePanel?.classList.toggle("hidden", !pauseOpen);
  if (pauseOpen) {
    closeOverlayPanels();
    if (inventoryOpen) toggleInventory(false);
    closeShop();
    keys.clear();
  }
}

function showHowTo() {
  showInfo(
    "Como Jogar",
    "PC:\nW A S D ou setas: mover\nE: interagir\nI: inventario\nMouse: mirar\nClique esquerdo: atacar\nQ: usar poder equipado\n1, 2, 3, 4: escolher poder\nTab: trocar arma\nEspaco: dash\nU: usar pocao\nM: missoes\nC: status\nEsc: menu\nF3: debug\n\nCelular:\nJoystick: mover\nAtaque: atacar\nPoder: usar poder equipado\nInteragir: conversar, abrir, entrar ou ativar\nInventario: abrir bolsa\nDash: esquivar\nPocao: curar\n\nProgressao:\nDerrote inimigos, complete missoes, ative cristais e abra baus para ganhar XP.\nO nivel maximo e 1000."
  );
}

function returnToStartMenu() {
  setPause(false);
  closeOverlayPanels();
  closeDialog();
  closeShop();
  inventoryOpen = false;
  inventoryPanel.classList.add("hidden");
  gameStarted = false;
  startScreen.classList.remove("hidden");
  keys.clear();
  resetJoystick();
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

function enterCrystalDimension() {
  lastVillagePosition = { x: player.x, y: player.y };
  const firstVisit = !questBook.discoveredAreas?.crystalDimension;
  if (!questBook.discoveredAreas) questBook.discoveredAreas = {};
  questBook.discoveredAreas.crystalDimension = true;
  dimensionQuest.entered = true;
  setActiveScene("crystalDimension");
  player.x = 22 * TILE + 16;
  player.y = 30 * TILE;
  player.direction = "up";
  playSound("portal");
  vibrate([20, 35, 20]);
  showHudToast("Voce entrou na Dimensao Cristalina");
  showDialogMessage("Voce atravessou o portal e chegou na Dimensao Cristalina.");
  if (firstVisit) awardXp(150, "Nova dimensao");
  updateQuestProgress();
}

function exitCrystalDimension() {
  setActiveScene("village");
  player.x = 35 * TILE;
  player.y = 27 * TILE;
  player.direction = "down";
  playSound("portal");
  vibrate([20, 35, 20]);
  showHudToast("Voce voltou para a vila");
  showDialogMessage("O portal devolveu voce para a vila.");
  updateQuestProgress();
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
  ensureCanvasSize();
  if (!["village", "home", "shopInterior", "mayorInterior", "crystalDimension"].includes(currentScene)) {
    setActiveScene("village");
  }

  if (!gameStarted) {
    updateHud();
    updateDebugPanel(delta);
    updateHudToast(delta);
    return;
  }

  if (gameOver) {
    updateHud();
    updateDebugPanel(delta);
    updateHudToast(delta);
    return;
  }

  updateTimedEffects(delta);
  player.levelGlowTimer = Math.max(0, Number(player.levelGlowTimer || 0) - delta);
  if (hitstopTimer > 0) {
    hitstopTimer = Math.max(0, hitstopTimer - delta);
    updateAttack(delta);
    updateFloatingTexts(delta);
    updateVisualEffects(delta);
    updateHud();
    updateHudToast(delta);
    return;
  }

  if (pauseOpen || inventoryOpen || shopOpen) {
    updateHud();
    updateInteractionHint();
    updateDebugPanel(delta);
    updateHudToast(delta);
    return;
  }

  const movement = getMovementInput();
  const inputX = movement.x;
  const inputY = movement.y;

  player.moving = inputX !== 0 || inputY !== 0;

  applyPlayerKnockback(delta);
  updateSwimming(delta);

  if (player.moving && !dialogOpen && !inventoryOpen && !shopOpen && Math.abs(playerKnockbackX) + Math.abs(playerKnockbackY) < 8) {
    const length = Math.hypot(inputX, inputY) || 1;
    const strength = movement.strength;
    const moveX = (inputX / length) * getPlayerSpeed() * strength * delta;
    const moveY = (inputY / length) * getPlayerSpeed() * strength * delta;

    if (Math.abs(inputX) > Math.abs(inputY)) {
      player.direction = inputX > 0 ? "right" : "left";
    } else if (inputY !== 0) {
      player.direction = inputY > 0 ? "down" : "up";
    }

    // Testa cada eixo separado para o jogador deslizar em paredes.
    if (canMoveTo(player.x + moveX, player.y)) player.x += moveX;
    if (canMoveTo(player.x, player.y + moveY)) player.y += moveY;
    updateSwimming(delta);
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
  updateProjectiles(delta);
  updateEnemyProjectiles(delta);
  updateHazards(delta);
  collectWorldItems();
  collectPowerUps();
  updateLoot(delta);
  updateAttack(delta);
  updateFloatingTexts(delta);
  updateVisualEffects(delta);

  camera.x = clamp(player.x + player.width / 2 - canvas.width / 2, 0, getSceneWidth() - canvas.width);
  camera.y = clamp(player.y + player.height / 2 - canvas.height / 2, 0, getSceneHeight() - canvas.height);

  playerPositionEl.textContent = getAreaName();
  checkAreaDiscovery();
  collectCrystals();
  updateQuestProgress();
  updateHud();
  updateInteractionHint();
  updateDebugPanel(delta);
  updateHudToast(delta);
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
  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;

  for (const obj of villageObjects) {
    if (obj.type !== "enemy" || !obj.alive) continue;
    normalizeEnemy(obj);

    obj.invulnerableTimer = Math.max(0, obj.invulnerableTimer - delta);
    obj.attackCooldown = Math.max(0, obj.attackCooldown - delta);
    obj.attackTimer = Math.max(0, obj.attackTimer - delta);

    if (Math.abs(obj.knockbackX) + Math.abs(obj.knockbackY) > 1) {
      const nextX = obj.x + obj.knockbackX * delta;
      const nextY = obj.y + obj.knockbackY * delta;
      if (canEntityMoveTo(obj, nextX, obj.y)) obj.x = nextX;
      if (canEntityMoveTo(obj, obj.x, nextY)) obj.y = nextY;
      obj.knockbackX *= 0.84;
      obj.knockbackY *= 0.84;
      continue;
    }

    obj.knockbackX = 0;
    obj.knockbackY = 0;

    const enemyCenterX = obj.x + obj.width / 2;
    const enemyCenterY = obj.y + obj.height / 2;
    const distanceToPlayer = Math.hypot(playerCenterX - enemyCenterX, playerCenterY - enemyCenterY);
    const distanceToSpawn = Math.hypot(obj.x - obj.spawnX, obj.y - obj.spawnY);
    const isAquaticHunter = obj.kind === "peixeHostil" || obj.kind === "serpenteLago";
    const canNoticePlayer = !isAquaticHunter || player.isSwimming || distanceToPlayer < 90;
    const isRanged = Boolean(obj.projectileType);

    if (obj.boss) {
      obj.phase = obj.hp <= obj.maxHp * 0.5 ? 2 : 1;
    }

    if (canNoticePlayer && isRanged && distanceToPlayer < obj.attackRange && obj.attackCooldown <= 0) {
      fireEnemyProjectile(obj, playerCenterX, playerCenterY);
      if (obj.boss && obj.phase === 2) fireBossPattern(obj, playerCenterX, playerCenterY);
      if (obj.kind === "aranhaRainha" || obj.kind === "aranha") {
        spawnHazardZone("web", playerCenterX, playerCenterY, obj.boss ? 44 : 30, 2.3, 1);
      }
      obj.attackCooldown = obj.attackDelay * (obj.phase === 2 ? 0.72 : 1);
      obj.state = "attack";
    }

    if (distanceToPlayer < obj.aggroRange && canNoticePlayer) {
      obj.state = "chase";
      const lowHealth = obj.hp <= obj.maxHp * 0.3;
      const shouldFlee = lowHealth && ["goblin", "arqueiroGoblin", "magoSombrio", "bruxoSombrio"].includes(obj.kind);
      const shouldKeepDistance = isRanged && distanceToPlayer < obj.attackRange * 0.55;
      const speedMultiplier = obj.boss && obj.phase === 2 ? 1.18 : 1;

      if (shouldFlee || shouldKeepDistance) {
        obj.state = "retreat";
        moveEnemyToward(obj, enemyCenterX - playerCenterX, enemyCenterY - playerCenterY, delta, speedMultiplier * 0.78);
      } else {
        let chaseX = playerCenterX - enemyCenterX;
        let chaseY = playerCenterY - enemyCenterY;
        if (obj.kind === "aranha" || obj.kind === "aranhaRainha") {
          chaseX += Math.sin(performance.now() / 260 + obj.spawnX) * 60;
          chaseY += Math.cos(performance.now() / 280 + obj.spawnY) * 45;
        }
        moveEnemyToward(obj, chaseX, chaseY, delta, speedMultiplier);
      }
    } else if (distanceToSpawn > TILE * 2) {
      obj.state = "return";
      moveEnemyToward(obj, obj.spawnX - obj.x, obj.spawnY - obj.y, delta, 0.75);
    } else {
      obj.state = "idle";
      updateEnemyWander(obj, delta);
    }

    if (obj.kind === "slimeVermelho" && obj.state === "chase" && Math.random() < delta * 0.55) {
      spawnHazardZone("slime", enemyCenterX, enemyCenterY, 24, 1.8, 1);
    }

    if (obj.kind === "serpenteLago" && obj.phase === 2 && Math.random() < delta * 0.35) {
      spawnHazardZone("whirlpool", playerCenterX, playerCenterY, 38, 1.6, 1);
    }

    if (obj.boss && distanceToPlayer < 130 && obj.attackTimer <= 0) {
      enemyProjectiles.push({
        type: "bossWave",
        x: enemyCenterX,
        y: enemyCenterY,
        radius: 10,
        maxRadius: obj.phase === 2 ? 120 : 88,
        timer: 0.7,
        damage: obj.damage
      });
      obj.attackTimer = obj.attackDelay + (obj.phase === 2 ? 0.35 : 0.8);
      playSound("shockwave");
    }

    if (rectsOverlap(playerRect, obj) && damageCooldown <= 0) {
      takeDamage(obj.damage, enemyCenterX, enemyCenterY);
      damageCooldown = obj.attackDelay;
    }
  }
}

function moveEnemyToward(obj, dx, dy, delta, speedMultiplier = 1) {
  const length = Math.hypot(dx, dy) || 1;
  const nextX = obj.x + (dx / length) * obj.speed * speedMultiplier * delta;
  const nextY = obj.y + (dy / length) * obj.speed * speedMultiplier * delta;

  if (Math.abs(dx) > Math.abs(dy)) obj.direction = dx > 0 ? "right" : "left";
  else obj.direction = dy > 0 ? "down" : "up";

  if (canEntityMoveTo(obj, nextX, obj.y) && !enemyWouldCrowd(obj, nextX, obj.y)) obj.x = nextX;
  if (canEntityMoveTo(obj, obj.x, nextY) && !enemyWouldCrowd(obj, obj.x, nextY)) obj.y = nextY;
}

function enemyWouldCrowd(obj, nextX, nextY) {
  const centerX = nextX + obj.width / 2;
  const centerY = nextY + obj.height / 2;

  return villageObjects.some((other) => {
    if (other === obj || other.type !== "enemy" || !other.alive) return false;
    const otherCenterX = other.x + other.width / 2;
    const otherCenterY = other.y + other.height / 2;
    const minDistance = (Math.max(obj.width, obj.height) + Math.max(other.width, other.height)) * 0.38;
    return Math.hypot(centerX - otherCenterX, centerY - otherCenterY) < minDistance;
  });
}

function updateEnemyWander(obj, delta) {
  obj.moveTimer -= delta;
  if (obj.moveTimer <= 0) {
    const directions = ["up", "down", "left", "right", "idle"];
    obj.direction = directions[Math.floor(Math.random() * directions.length)];
    obj.moveTimer = 0.8 + Math.random() * 1.8;
  }

  if (obj.direction === "idle") return;
  const step = directionVector(obj.direction);
  const nextX = obj.x + step.x * obj.speed * 0.55 * delta;
  const nextY = obj.y + step.y * obj.speed * 0.55 * delta;
  const nearSpawn = Math.hypot(nextX - obj.spawnX, nextY - obj.spawnY) < TILE * 4;
  if (nearSpawn && canEntityMoveTo(obj, nextX, nextY) && !enemyWouldCrowd(obj, nextX, nextY)) {
    obj.x = nextX;
    obj.y = nextY;
  } else {
    obj.moveTimer = 0;
  }
}

function fireEnemyProjectile(obj, targetX, targetY, angleOffset = 0) {
  const centerX = obj.x + obj.width / 2;
  const centerY = obj.y + obj.height / 2;
  const dx = targetX - centerX;
  const dy = targetY - centerY;
  const angle = Math.atan2(dy, dx) + angleOffset;
  const type = obj.projectileType || (obj.boss ? "bossBolt" : "shadow");
  const config = getEnemyProjectileConfig(type, obj);

  enemyProjectiles.push({
    type,
    x: centerX - config.width / 2,
    y: centerY - config.height / 2,
    width: config.width,
    height: config.height,
    vx: Math.cos(angle) * config.speed,
    vy: Math.sin(angle) * config.speed,
    damage: obj.damage,
    timer: config.timer
  });
  playSound("enemyMagic");
}

function getEnemyProjectileConfig(type, obj) {
  const bossBoost = obj.boss ? 1.18 : 1;
  const configs = {
    arrow: { width: 14, height: 5, speed: 210 * bossBoost, timer: 2.2 },
    shadow: { width: 11, height: 11, speed: 170 * bossBoost, timer: 2.1 },
    stone: { width: 13, height: 13, speed: 155 * bossBoost, timer: 2.3 },
    bubble: { width: 12, height: 12, speed: 170 * bossBoost, timer: 2.2 },
    fire: { width: 13, height: 13, speed: 220 * bossBoost, timer: 2.0 },
    slimeBall: { width: 14, height: 12, speed: 165 * bossBoost, timer: 2.0 },
    web: { width: 14, height: 14, speed: 155 * bossBoost, timer: 2.0 },
    bossBolt: { width: 14, height: 14, speed: 190, timer: 2.2 }
  };
  return configs[type] || configs.shadow;
}

function fireBossPattern(obj, targetX, targetY) {
  if (obj.kind === "reiSlime") {
    fireEnemyProjectile(obj, targetX, targetY, -0.38);
    fireEnemyProjectile(obj, targetX, targetY, 0.38);
  } else if (obj.kind === "aranhaRainha") {
    spawnHazardZone("web", targetX, targetY, 48, 2.5, 1);
  } else if (obj.kind === "golemAncestral") {
    fireEnemyProjectile(obj, targetX, targetY, -0.24);
    fireEnemyProjectile(obj, targetX, targetY, 0.24);
  } else if (obj.kind === "bruxoSombrio") {
    for (const offset of [-0.42, 0, 0.42]) fireEnemyProjectile(obj, targetX, targetY, offset);
  } else if (obj.kind === "serpenteLago") {
    spawnHazardZone("whirlpool", targetX, targetY, 42, 1.8, 1);
    fireEnemyProjectile(obj, targetX, targetY, -0.3);
    fireEnemyProjectile(obj, targetX, targetY, 0.3);
  } else {
    fireEnemyProjectile(obj, targetX, targetY, 0.32);
  }
}

function directionVector(direction) {
  if (direction === "left") return { x: -1, y: 0 };
  if (direction === "right") return { x: 1, y: 0 };
  if (direction === "up") return { x: 0, y: -1 };
  return { x: 0, y: 1 };
}

function getMovementInput() {
  const keyboardX = (keys.has("arrowright") || keys.has("d") ? 1 : 0) -
    (keys.has("arrowleft") || keys.has("a") ? 1 : 0);
  const keyboardY = (keys.has("arrowdown") || keys.has("s") ? 1 : 0) -
    (keys.has("arrowup") || keys.has("w") ? 1 : 0);
  const keyboardLength = Math.hypot(keyboardX, keyboardY);

  if (joystick.active || joystick.strength > 0.05) {
    return {
      x: joystick.x,
      y: joystick.y,
      strength: clamp(joystick.strength, 0, 1)
    };
  }

  return {
    x: keyboardX,
    y: keyboardY,
    strength: keyboardLength > 0 ? 1 : 0
  };
}

function getAimVector() {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;

  if (isMobile) {
    return getMobileAimDirection();
  }

  if (mouseAim.active) {
    const dx = mouseAim.worldX - centerX;
    const dy = mouseAim.worldY - centerY;
    const length = Math.hypot(dx, dy) || 1;
    return { x: dx / length, y: dy / length, angle: Math.atan2(dy, dx) };
  }

  const vector = directionVector(player.direction);
  return { ...vector, angle: Math.atan2(vector.y, vector.x) };
}

function getNearestEnemyToPlayer(maxDistance = 320) {
  if (currentScene !== "village") return null;

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  let nearest = null;
  let nearestDistance = maxDistance;

  for (const obj of villageObjects) {
    if (obj.type !== "enemy" || !obj.alive) continue;
    const enemyX = obj.x + obj.width / 2;
    const enemyY = obj.y + obj.height / 2;
    const distance = Math.hypot(enemyX - centerX, enemyY - centerY);
    if (distance <= nearestDistance) {
      nearest = obj;
      nearestDistance = distance;
    }
  }

  return nearest;
}

function getMobileAimDirection(maxDistance = 360) {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  let target = mobileLockedTarget;

  if (!target || !target.alive || Math.hypot(target.x - player.x, target.y - player.y) > maxDistance + 90) {
    target = getNearestEnemyToPlayer(maxDistance);
  }

  currentAutoAimTarget = target;

  if (target) {
    const dx = target.x + target.width / 2 - centerX;
    const dy = target.y + target.height / 2 - centerY;
    const length = Math.hypot(dx, dy) || 1;
    return { x: dx / length, y: dy / length, angle: Math.atan2(dy, dx), target };
  }

  if (joystick.strength > 0.08) {
    return { x: joystick.x, y: joystick.y, angle: Math.atan2(joystick.y, joystick.x), target: null };
  }

  const vector = directionVector(player.direction);
  return { ...vector, angle: Math.atan2(vector.y, vector.x), target: null };
}

function updateDirectionFromAim() {
  const aim = getAimVector();
  if (Math.abs(aim.x) > Math.abs(aim.y)) player.direction = aim.x >= 0 ? "right" : "left";
  else player.direction = aim.y >= 0 ? "down" : "up";
}

function getCurrentWeaponKey() {
  const unlocked = player.unlockedWeapons?.length ? player.unlockedWeapons : weaponOrder;
  return unlocked[currentWeaponIndex % unlocked.length] || "sword";
}

function getCurrentWeapon() {
  return weapons[getCurrentWeaponKey()] || weapons.sword;
}

function cycleWeapon() {
  const unlocked = player.unlockedWeapons?.length ? player.unlockedWeapons : weaponOrder;
  currentWeaponIndex = (currentWeaponIndex + 1) % unlocked.length;
  spawnFloatingText(`Arma: ${getCurrentWeapon().name}`, player.x + 10, player.y - 18, "#fff264");
  showHudToast(`Arma equipada: ${getCurrentWeapon().name}`);
  playSound("weaponSwap");
  updateHud();
}

function equipWeapon(weaponKey) {
  const unlocked = player.unlockedWeapons?.length ? player.unlockedWeapons : weaponOrder;
  const index = unlocked.indexOf(weaponKey);
  if (index === -1 || !weapons[weaponKey]) {
    showHudToast("Arma ainda bloqueada.");
    playSound("invalid");
    return false;
  }

  currentWeaponIndex = index;
  spawnFloatingText(`Arma: ${weapons[weaponKey].name}`, player.x + 10, player.y - 18, "#fff264");
  showHudToast(`Arma equipada: ${weapons[weaponKey].name}`);
  playSound("equipItem");
  updateHud();
  return true;
}

function equipPower(slotIndex) {
  equippedPower = powerSlots[slotIndex] || "fireball";
  spawnFloatingText(`Poder equipado: ${powerNames[equippedPower]}`, player.x + 12, player.y - 18, "#55e8ff");
  showHudToast(`Poder equipado: ${powerNames[equippedPower]}`);
  playSound("powerup");
  vibrate(10);
  updateMobilePowerButtons();
  updateHud();
}

function useEquippedPower() {
  if (equippedPower === "fireball") castFireball();
  else if (equippedPower === "blueRay") castBlueRay();
  else if (equippedPower === "shockwave") shockwave();
  else if (equippedPower === "heal") quickHeal();
}

function updateMobilePowerButtons() {
  const buttons = [touchPower1Button, touchPower2Button, touchPower3Button, touchPower4Button];
  buttons.forEach((button, index) => {
    button?.classList.toggle("is-equipped", powerSlots[index] === equippedPower);
  });
}

function getPlayerSpeed() {
  let speed = player.speed + (activePowerUps.speed > 0 ? 70 : 0);
  if (player.isSwimming) speed *= activePowerUps.waterBreathing > 0 ? 0.82 : 0.58;
  return speed;
}

function getAreaName() {
  if (currentScene !== "village") return getSceneName();
  const tileX = Math.floor(player.x / TILE);
  const tileY = Math.floor(player.y / TILE);

  if (tileX >= 60 && tileY <= 18) return "Ruinas Antigas";
  if (tileX >= 61 && tileY >= 43 && tileY <= 54) return "Arena de Treino";
  if (tileX >= 70 && tileY >= 45) return "Monstros Fortes";
  if (tileX <= 25 && tileY >= 45) return "Floresta Profunda";
  if (tileX <= 21 && tileY >= 47) return "Cemiterio Abandonado";
  if (tileX >= 58 && tileY >= 30 && tileY <= 41) return "Campo Aberto";
  if (tileX >= 58 && tileY >= 18 && tileY <= 30) return "Lago Maior";
  if (tileX >= 51 && tileY >= 51) return "Caminho Secreto";
  return "Vila Principal";
}

function checkAreaDiscovery() {
  if (currentScene !== "village" || !gameStarted || gameOver) return;
  if (!questBook.discoveredAreas) questBook.discoveredAreas = {};
  const areaName = getAreaName();
  if (areaName === "Vila Principal" || questBook.discoveredAreas[areaName]) return;

  questBook.discoveredAreas[areaName] = true;
  awardXp(50, "Nova area");
}

function updateTimedEffects(delta) {
  updatePowerUps(delta);
  playerInvulnerableTimer = Math.max(0, playerInvulnerableTimer - delta);
  player.mana = Math.min(player.maxMana, player.mana + player.manaRegen * delta);

  for (const key of Object.keys(player.spellCooldowns)) {
    player.spellCooldowns[key] = Math.max(0, player.spellCooldowns[key] - delta);
  }
}

function updatePowerUps(delta) {
  for (const key of Object.keys(activePowerUps)) {
    activePowerUps[key] = Math.max(0, activePowerUps[key] - delta);
  }

  if (activePowerUps.regen > 0) {
    regenTickTimer += delta;
    if (regenTickTimer >= 1.2) {
      regenTickTimer = 0;
      if (player.health < player.maxHealth) {
        player.health = Math.min(player.maxHealth, player.health + 1);
        spawnFloatingText("+1", player.x + 8, player.y - 8, "#7bdb73");
      }
    }
  } else {
    regenTickTimer = 0;
  }
}

function applyPlayerKnockback(delta) {
  if (Math.abs(playerKnockbackX) + Math.abs(playerKnockbackY) < 1) {
    playerKnockbackX = 0;
    playerKnockbackY = 0;
    return;
  }

  const nextX = player.x + playerKnockbackX * delta;
  const nextY = player.y + playerKnockbackY * delta;
  if (canMoveTo(nextX, player.y)) player.x = nextX;
  if (canMoveTo(player.x, nextY)) player.y = nextY;
  playerKnockbackX *= 0.86;
  playerKnockbackY *= 0.86;
}

function spendMana(cost) {
  if (player.mana < cost) {
    spawnFloatingText("Mana insuficiente!", player.x - 18, player.y - 18, "#55e8ff");
    showHudToast("Mana insuficiente!");
    return false;
  }

  player.mana = Math.max(0, player.mana - cost);
  return true;
}

function canUsePower(name, cost) {
  if (gameOver || dialogOpen || inventoryOpen || shopOpen || pauseOpen) return false;
  if (player.spellCooldowns[name] > 0) return false;
  return spendMana(cost);
}

function castFireball() {
  if (!canUsePower("fireball", spellCosts.fireball)) return;

  updateDirectionFromAim();
  const vector = getAimVector();
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  spawnPlayerProjectile({
    type: "fireball",
    x: centerX - 6,
    y: centerY - 6,
    width: 12,
    height: 12,
    vx: vector.x * 330,
    vy: vector.y * 330,
    damage: activePowerUps.force > 0 ? 4 : 3,
    damageType: "fogo",
    distance: 0,
    maxDistance: 360
  });
  player.spellCooldowns.fireball = 0.55;
  playSound("magic");
  vibrate(22);
}

function castBlueRay() {
  if (!canUsePower("blueRay", spellCosts.blueRay)) return;

  updateDirectionFromAim();
  const vector = getAimVector();
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  spawnPlayerProjectile({
    type: "blueRay",
    x: centerX - 5,
    y: centerY - 5,
    width: 10,
    height: 10,
    vx: vector.x * 520,
    vy: vector.y * 520,
    damage: 3,
    damageType: "magico",
    distance: 0,
    maxDistance: 520,
    pierce: 1,
    hitKeys: new Set()
  });
  player.spellCooldowns.blueRay = 0.72;
  playSound("magic");
  vibrate(18);
}

function spawnPlayerProjectile(config) {
  playerProjectiles.push({
    pierce: 0,
    damageType: "fisico",
    hitKeys: new Set(),
    ...config
  });
}

function dash() {
  if (!canUsePower("dash", spellCosts.dash)) return;

  const vector = directionVector(player.direction);
  let moved = 0;
  for (let i = 0; i < 12; i++) {
    const nextX = player.x + vector.x * 12;
    const nextY = player.y + vector.y * 12;
    if (!canMoveTo(nextX, nextY)) break;
    dashTrails.push({ x: player.x, y: player.y, timer: 0.22, direction: player.direction });
    player.x = nextX;
    player.y = nextY;
    moved += 12;
  }

  if (moved > 0) {
    playerInvulnerableTimer = Math.max(playerInvulnerableTimer, 0.35);
    player.spellCooldowns.dash = 1.0;
    playSound("dash");
  }
}

function dodgeDash() {
  if (gameOver || dialogOpen || inventoryOpen || shopOpen || pauseOpen || dodgeCooldownTimer > 0) return;

  let vector = directionVector(player.direction);
  if (isMobile && joystick.strength > 0.08) {
    vector = { x: joystick.x, y: joystick.y };
    if (Math.abs(vector.x) > Math.abs(vector.y)) player.direction = vector.x >= 0 ? "right" : "left";
    else player.direction = vector.y >= 0 ? "down" : "up";
  } else {
    updateDirectionFromAim();
    vector = directionVector(player.direction);
  }
  let moved = 0;
  for (let i = 0; i < 7; i++) {
    const nextX = player.x + vector.x * 10;
    const nextY = player.y + vector.y * 10;
    if (!canMoveTo(nextX, nextY)) break;
    dashTrails.push({ x: player.x, y: player.y, timer: 0.18, direction: player.direction });
    player.x = nextX;
    player.y = nextY;
    moved += 10;
  }

  if (moved > 0) {
    playerInvulnerableTimer = Math.max(playerInvulnerableTimer, 0.28);
    dodgeCooldownTimer = 0.55;
    playSound("dash");
    vibrate(16);
  }
}

function shockwave() {
  if (!canUsePower("shockwave", spellCosts.shockwave)) return;

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const radius = 78;
  shockwaves.push({ x: centerX, y: centerY, radius, timer: 0.32, maxTimer: 0.32 });

  if (currentScene === "village") {
    for (const obj of villageObjects) {
      if (obj.type !== "enemy" || !obj.alive) continue;
      const enemyCenterX = obj.x + obj.width / 2;
      const enemyCenterY = obj.y + obj.height / 2;
      const distance = Math.hypot(enemyCenterX - centerX, enemyCenterY - centerY);
      if (distance <= radius) {
        damageEnemy(obj, 1, centerX, centerY, 260, "magico");
      }
    }
  }

  player.spellCooldowns.shockwave = 2.6;
  playSound("shockwave");
  vibrate([22, 30, 22]);
}

function quickHeal() {
  if (!canUsePower("heal", spellCosts.heal)) return;

  const healed = Math.min(2, player.maxHealth - player.health);
  if (healed <= 0) {
    spawnFloatingText("Vida cheia", player.x - 8, player.y - 18, "#7bdb73");
    player.mana = Math.min(player.maxMana, player.mana + spellCosts.heal);
    return;
  }

  player.health += healed;
  healBursts.push({ x: player.x + player.width / 2, y: player.y + player.height / 2, timer: 0.55, maxTimer: 0.55 });
  spawnFloatingText(`+${healed}`, player.x + 8, player.y - 12, "#7bdb73");
  player.spellCooldowns.heal = 3.0;
  playSound("heal");
  vibrate(18);
}

function updateProjectiles(delta) {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const obj = projectiles[i];
    const moveX = obj.vx * delta;
    const moveY = obj.vy * delta;
    obj.x += moveX;
    obj.y += moveY;
    obj.distance += Math.hypot(moveX, moveY);

    if (currentScene === "village" && projectileTouchesWater(obj)) {
      if (obj.type === "fireball" || obj.type === "fire") {
        spawnFloatingText("pshh", obj.x, obj.y, "#55e8ff");
        projectiles.splice(i, 1);
        continue;
      }
      if (obj.type === "arrow") {
        obj.vx *= 0.985;
        obj.vy *= 0.985;
      }
    }

    if (obj.distance > obj.maxDistance || projectileHitsObstacle(obj)) {
      projectiles.splice(i, 1);
      continue;
    }

    if (currentScene !== "village") continue;
    const target = villageObjects.find((enemyObj) => (
      enemyObj.type === "enemy" &&
      enemyObj.alive &&
      rectsOverlap(obj, enemyObj)
    ));

    if (target) {
      const targetKey = getSaveObjectKey(target);
      if (!obj.hitKeys?.has(targetKey)) {
        damageEnemy(target, obj.damage, obj.x, obj.y, 210, obj.damageType);
        obj.hitKeys?.add(targetKey);
        if (obj.pierce > 0) {
          obj.pierce -= 1;
        } else {
          projectiles.splice(i, 1);
        }
      }
    }
  }
}

function updateEnemyProjectiles(delta) {
  const playerRect = getPlayerRect();

  for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
    const obj = enemyProjectiles[i];

    if (obj.type === "bossWave") {
      obj.timer -= delta;
      obj.radius += (obj.maxRadius / 0.7) * delta;
      const centerX = player.x + player.width / 2;
      const centerY = player.y + player.height / 2;
      const distance = Math.hypot(centerX - obj.x, centerY - obj.y);
      if (distance <= obj.radius && distance >= obj.radius - 20 && damageCooldown <= 0) {
        takeDamage(obj.damage, obj.x, obj.y);
        damageCooldown = 1.0;
      }
      if (obj.timer <= 0) enemyProjectiles.splice(i, 1);
      continue;
    }

    obj.timer -= delta;
    obj.x += obj.vx * delta;
    obj.y += obj.vy * delta;

    if (currentScene === "village" && projectileTouchesWater(obj)) {
      if (obj.type === "fire") {
        spawnFloatingText("pshh", obj.x, obj.y, "#55e8ff");
        enemyProjectiles.splice(i, 1);
        continue;
      }
      if (obj.type === "arrow") {
        obj.vx *= 0.985;
        obj.vy *= 0.985;
      }
    }

    if (obj.timer <= 0 || projectileHitsObstacle(obj)) {
      enemyProjectiles.splice(i, 1);
      continue;
    }

    if (rectsOverlap(playerRect, obj)) {
      takeDamage(obj.damage, obj.x, obj.y);
      enemyProjectiles.splice(i, 1);
    }
  }
}

function projectileHitsObstacle(obj) {
  if (obj.x < 0 || obj.y < 0 || obj.x + obj.width > getSceneWidth() || obj.y + obj.height > getSceneHeight()) {
    return true;
  }

  if (currentScene !== "village" && hitsWater(obj)) return true;
  return colliders.some((collider) => isColliderActive(collider) && rectsOverlap(obj, collider));
}

function projectileTouchesWater(obj) {
  return isPointInVillageWater(obj.x + obj.width / 2, obj.y + obj.height / 2);
}

function damageEnemy(obj, amount, sourceX, sourceY, knockbackPower = 170, damageType = "fisico") {
  if (!obj.alive || obj.invulnerableTimer > 0) return false;

  const critical = Math.random() < player.critChance;
  const resistance = obj.resistances?.[damageType] ?? 1;
  const rawDamage = (critical ? amount * 2 : amount) * resistance - (obj.defense || 0);
  const damage = Math.max(1, Math.round(rawDamage));
  obj.hp -= damage;
  obj.invulnerableTimer = 0.28;

  const centerX = obj.x + obj.width / 2;
  const centerY = obj.y + obj.height / 2;
  const dx = centerX - sourceX;
  const dy = centerY - sourceY;
  const length = Math.hypot(dx, dy) || 1;
  obj.knockbackX = (dx / length) * knockbackPower;
  obj.knockbackY = (dy / length) * knockbackPower;

  spawnFloatingText(critical ? `CRITICO -${damage}` : `-${damage}`, obj.x + obj.width / 2, obj.y - 8, critical ? "#ff4f62" : "#fff264");
  playSound("hitEnemy");
  hitstopTimer = 0.055;

  if (obj.hp <= 0) defeatEnemy(obj);
  return true;
}

function defeatEnemy(obj) {
  obj.alive = false;
  inventory.moedas += obj.coinReward;
  awardXp(getEnemyXpReward(obj), obj.boss ? "Boss derrotado" : "Inimigo derrotado");
  spawnFloatingText(`+${obj.coinReward} moedas`, obj.x, obj.y - 18, "#fff264");
  playSound(obj.boss ? "bossDown" : "enemyDown");

  if (["slime", "slimeVerde", "slimeVermelho", "aranha", "goblin", "morcego"].includes(obj.kind)) {
    const previousCount = questBook.forestMonstersDefeated;
    questBook.forestMonstersDefeated = Math.min(
      questBook.forestMonstersGoal,
      questBook.forestMonstersDefeated + 1
    );
    if (previousCount < questBook.forestMonstersGoal && questBook.forestMonstersDefeated >= questBook.forestMonstersGoal) {
      awardXp(300, "Missao dos monstros");
    }
  }

  if (obj.boss) {
    questBook.bossDefeated = true;
    questBook.defeatedBosses[obj.kind] = true;
    inventory.moedas += 20;
    spawnFloatingText("Item raro!", obj.x, obj.y - 34, "#55e8ff");
    vibrate([40, 60, 60]);
  }

  spawnEnemyDrops(obj);
  updateHud();
  renderInventory();
}

function spawnEnemyDrops(obj) {
  const dropTable = obj.dropTable || {};
  const centerX = obj.x + obj.width / 2 - 8;
  const centerY = obj.y + obj.height / 2 - 8;
  const scatter = (index) => ({
    x: centerX + ((index % 3) - 1) * 16,
    y: centerY + (Math.floor(index / 3) - 1) * 14
  });

  let slot = 0;
  const coinAmount = Math.max(1, Math.ceil(obj.coinReward / 3));
  if (Math.random() < (dropTable.coin ?? 0.75)) {
    const pos = scatter(slot++);
    lootItems.push(lootItem(pos.x, pos.y, "moeda", coinAmount));
  }

  if (Math.random() < (dropTable.potion ?? 0.1)) {
    const pos = scatter(slot++);
    lootItems.push(lootItem(pos.x, pos.y, "pocao", 1));
  }

  if (Math.random() < (dropTable.loot ?? 0.15)) {
    const kind = chooseLootKind(obj);
    const pos = scatter(slot++);
    lootItems.push(lootItem(pos.x, pos.y, kind, kind === "flechas" ? 4 : 1));
  }

  if (obj.boss && obj.bossItem) {
    const pos = scatter(slot++);
    lootItems.push(lootItem(pos.x, pos.y, "bossItem", 1, obj.bossItem));
  }

  if (Math.random() < (dropTable.powerUp ?? 0.1)) {
    const kinds = ["speed", "force", "shield", "regen", "mana"];
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    powerUps.push(powerUp(Math.floor(obj.x / TILE), Math.floor(obj.y / TILE), kind, true));
  }
}

function chooseLootKind(obj) {
  if (obj.kind === "arqueiroGoblin") return "flechas";
  if (obj.kind === "magoSombrio" || obj.kind === "bruxoSombrio") return "manaOrbe";
  if (obj.kind === "golemPedra" || obj.kind === "golemAncestral") return "fragmento";
  if (obj.kind === "peixeHostil" || obj.kind === "serpenteLago") return "fragmentoAzul";
  if (Math.random() < 0.06) return "chaveRara";
  return Math.random() < 0.5 ? "fragmento" : "flechas";
}

function lootItem(x, y, kind, amount = 1, itemName = "") {
  return {
    type: "loot",
    kind,
    itemName,
    amount,
    x,
    y,
    width: 16,
    height: 16,
    timer: 0,
    collected: false
  };
}

function updateLoot(delta) {
  if (currentScene !== "village") return;

  const playerRect = getPlayerRect();
  for (let i = lootItems.length - 1; i >= 0; i--) {
    const obj = lootItems[i];
    obj.timer += delta;
    if (!rectsOverlap(playerRect, obj)) continue;
    collectLoot(obj);
    lootItems.splice(i, 1);
  }
}

function collectLoot(obj) {
  const amount = obj.amount || 1;

  if (obj.kind === "moeda") {
    inventory.moedas += amount;
    playSound("coin");
    spawnFloatingText(`+${amount} moedas`, obj.x, obj.y - 8, "#fff264");
  } else if (obj.kind === "pocao") {
    inventory.pocoes += amount;
    playSound("powerup");
    spawnFloatingText("+pocao", obj.x, obj.y - 8, "#d24c63");
  } else if (obj.kind === "flechas") {
    inventory.flechas += amount;
    playSound("powerup");
    spawnFloatingText(`+${amount} flechas`, obj.x, obj.y - 8, "#fff3d6");
  } else if (obj.kind === "manaOrbe") {
    inventory.manaOrbes += amount;
    player.mana = Math.min(player.maxMana, player.mana + 2);
    playSound("magic");
    spawnFloatingText("+mana", obj.x, obj.y - 8, "#55e8ff");
  } else if (obj.kind === "chaveRara") {
    inventory.chavesRaras += amount;
    playSound("chest");
    spawnFloatingText("Chave rara!", obj.x, obj.y - 8, "#fff264");
  } else if (obj.kind === "bossItem") {
    if (!inventory.itensBoss.includes(obj.itemName)) inventory.itensBoss.push(obj.itemName);
    playSound("chest");
    spawnFloatingText(obj.itemName, obj.x, obj.y - 8, "#55e8ff");
  } else {
    inventory.fragmentos += amount;
    playSound("powerup");
    spawnFloatingText(`+${amount} fragmento`, obj.x, obj.y - 8, "#c7ccd4");
  }

  vibrate(obj.kind === "bossItem" || obj.kind === "chaveRara" ? [18, 35, 18] : 12);
  updateHud();
  renderInventory();
}

function spawnHazardZone(type, x, y, radius = 28, timer = 2.2, damage = 1) {
  hazardZones.push({
    type,
    x,
    y,
    radius,
    timer,
    maxTimer: timer,
    damage,
    tick: 0
  });
}

function updateHazards(delta) {
  if (currentScene !== "village") {
    hazardZones.length = 0;
    return;
  }

  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;

  for (let i = hazardZones.length - 1; i >= 0; i--) {
    const obj = hazardZones[i];
    obj.timer -= delta;
    obj.tick -= delta;

    if (obj.timer <= 0) {
      hazardZones.splice(i, 1);
      continue;
    }

    const distance = Math.hypot(playerCenterX - obj.x, playerCenterY - obj.y);
    if (distance <= obj.radius) {
      if (obj.type === "web" && player.moving) {
        player.animTimer += delta * 0.5;
      }

      if (obj.tick <= 0 && damageCooldown <= 0) {
        takeDamage(obj.damage, obj.x, obj.y);
        damageCooldown = obj.type === "whirlpool" ? 0.9 : 1.2;
        obj.tick = 1.1;
      }
    }
  }
}

function spawnFloatingText(text, x, y, color) {
  floatingTexts.push({ text, x, y, color, timer: 1.1, vy: -22 });
}

function updateFloatingTexts(delta) {
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const obj = floatingTexts[i];
    obj.timer -= delta;
    obj.y += obj.vy * delta;
    if (obj.timer <= 0) floatingTexts.splice(i, 1);
  }
}

function updateVisualEffects(delta) {
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    shockwaves[i].timer -= delta;
    if (shockwaves[i].timer <= 0) shockwaves.splice(i, 1);
  }

  for (let i = dashTrails.length - 1; i >= 0; i--) {
    dashTrails[i].timer -= delta;
    if (dashTrails[i].timer <= 0) dashTrails.splice(i, 1);
  }

  for (let i = healBursts.length - 1; i >= 0; i--) {
    healBursts[i].timer -= delta;
    if (healBursts[i].timer <= 0) healBursts.splice(i, 1);
  }
}

function drawProjectiles() {
  for (const obj of projectiles) {
    const color = getPlayerProjectileColor(obj.type);
    ctx.fillStyle = color.glow;
    ctx.fillRect(obj.x - 5, obj.y - 5, obj.width + 10, obj.height + 10);

    if (obj.type === "arrow") {
      ctx.save();
      ctx.translate(obj.x + obj.width / 2, obj.y + obj.height / 2);
      ctx.rotate(Math.atan2(obj.vy, obj.vx));
      ctx.fillStyle = "#273052";
      ctx.fillRect(-8, -2, 16, 4);
      ctx.fillStyle = "#f0b276";
      ctx.fillRect(-6, -1, 11, 2);
      ctx.fillStyle = "#fff3d6";
      ctx.fillRect(4, -3, 4, 6);
      ctx.restore();
      continue;
    }

    ctx.fillStyle = color.main;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    ctx.fillStyle = color.core;
    ctx.fillRect(obj.x + 3, obj.y + 3, Math.max(2, obj.width - 6), Math.max(2, obj.height - 6));
  }

  for (const obj of enemyProjectiles) {
    if (obj.type === "bossWave") {
      ctx.strokeStyle = "rgba(255, 79, 98, 0.85)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
      ctx.stroke();
      continue;
    }

    const color = getEnemyProjectileColor(obj.type);
    ctx.fillStyle = color.glow;
    ctx.fillRect(obj.x - 4, obj.y - 4, obj.width + 8, obj.height + 8);
    ctx.fillStyle = color.main;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    ctx.fillStyle = color.core;
    ctx.fillRect(obj.x + 3, obj.y + 3, Math.max(2, obj.width - 6), Math.max(2, obj.height - 6));
  }
}

function getPlayerProjectileColor(type) {
  if (type === "blueRay" || type === "blueMagic") {
    return { glow: "rgba(85, 232, 255, 0.34)", main: "#3f8fe5", core: "#e9ffff" };
  }
  if (type === "arrow") {
    return { glow: "rgba(255, 243, 214, 0.18)", main: "#f0b276", core: "#fff3d6" };
  }
  return { glow: "rgba(255, 90, 58, 0.32)", main: "#ff4f62", core: "#fff264" };
}

function getEnemyProjectileColor(type) {
  if (type === "arrow") return { glow: "rgba(255, 243, 214, 0.18)", main: "#f0b276", core: "#fff3d6" };
  if (type === "stone") return { glow: "rgba(199, 204, 212, 0.25)", main: "#8a8da2", core: "#c7ccd4" };
  if (type === "bubble") return { glow: "rgba(85, 232, 255, 0.32)", main: "#3f8fe5", core: "#e9ffff" };
  if (type === "fire") return { glow: "rgba(255, 79, 98, 0.35)", main: "#ff4f62", core: "#fff264" };
  if (type === "slimeBall") return { glow: "rgba(123, 219, 115, 0.32)", main: "#7bdb73", core: "#d9ff73" };
  if (type === "web") return { glow: "rgba(233, 255, 255, 0.22)", main: "#c8dbff", core: "#e9ffff" };
  if (type === "bossBolt") return { glow: "rgba(255, 79, 98, 0.35)", main: "#ff4f62", core: "#fff264" };
  return { glow: "rgba(180, 109, 255, 0.35)", main: "#b46dff", core: "#55e8ff" };
}

function drawShockwaves() {
  for (const obj of shockwaves) {
    const progress = 1 - obj.timer / obj.maxTimer;
    ctx.strokeStyle = `rgba(85, 232, 255, ${1 - progress})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius * progress, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawDashTrails() {
  for (const obj of dashTrails) {
    ctx.fillStyle = `rgba(85, 232, 255, ${obj.timer / 0.22})`;
    ctx.fillRect(obj.x + 4, obj.y + 5, player.width, player.height);
  }
}

function drawHealBursts() {
  for (const obj of healBursts) {
    const progress = 1 - obj.timer / obj.maxTimer;
    ctx.strokeStyle = `rgba(123, 219, 115, ${1 - progress})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, 18 + progress * 28, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawFloatingTexts() {
  ctx.font = "bold 12px Trebuchet MS, Arial";
  ctx.textAlign = "center";
  for (const obj of floatingTexts) {
    ctx.fillStyle = "rgba(26, 31, 61, 0.85)";
    ctx.fillText(obj.text, obj.x + 1, obj.y + 1);
    ctx.fillStyle = obj.color;
    ctx.fillText(obj.text, obj.x, obj.y);
  }
  ctx.textAlign = "start";
}

function drawAimCursor() {
  if (!mouseAim.active || !gameStarted || currentScene !== "village") return;

  ctx.strokeStyle = "rgba(255, 242, 100, 0.75)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(mouseAim.worldX - 8, mouseAim.worldY);
  ctx.lineTo(mouseAim.worldX + 8, mouseAim.worldY);
  ctx.moveTo(mouseAim.worldX, mouseAim.worldY - 8);
  ctx.lineTo(mouseAim.worldX, mouseAim.worldY + 8);
  ctx.stroke();

  ctx.strokeStyle = "rgba(39, 48, 82, 0.85)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(mouseAim.worldX, mouseAim.worldY, 10, 0, Math.PI * 2);
  ctx.stroke();
}

function drawMobileTargetMark() {
  if (!isMobile || currentScene !== "village") return;
  const target = currentAutoAimTarget || getNearestEnemyToPlayer(300);
  if (!target || !target.alive) return;

  const cx = target.x + target.width / 2;
  const cy = target.y + target.height / 2;
  const pulse = 4 + Math.sin(performance.now() / 120) * 2;
  ctx.strokeStyle = "rgba(255, 242, 100, 0.9)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, Math.max(target.width, target.height) / 2 + pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 242, 100, 0.85)";
  ctx.fillRect(cx - 2, target.y - 12, 4, 7);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sanitizePlayerName(name, fallback = FALLBACK_PLAYER_NAME) {
  const cleaned = String(name || "").trim().replace(/\s+/g, " ").slice(0, 16);
  return cleaned || fallback;
}

function getNameFromInput() {
  return sanitizePlayerName(characterNameInput?.value, DEFAULT_NEW_PLAYER_NAME);
}

function setPlayerName(name, fallback = FALLBACK_PLAYER_NAME) {
  player.name = sanitizePlayerName(name, fallback);
  if (characterNameInput) characterNameInput.value = player.name;
  updateHud();
}

function getPlayerDisplayName() {
  return sanitizePlayerName(player.name, FALLBACK_PLAYER_NAME);
}

function getPlayerHudName() {
  normalizeLevelState();
  if (player.level >= player.maxLevel) return `${getPlayerDisplayName()} | Nv. ${player.level} MAX`;
  return `${getPlayerDisplayName()} | Nv. ${player.level}`;
}

function getXpToNextLevel(level) {
  const safeLevel = clamp(Math.floor(Number(level) || 1), 1, PLAYER_MAX_LEVEL);
  if (safeLevel >= PLAYER_MAX_LEVEL) return 0;
  return Math.floor(50 + safeLevel * safeLevel * 8);
}

function normalizeLevelState() {
  player.name = sanitizePlayerName(player.name, FALLBACK_PLAYER_NAME);
  player.maxLevel = Number.isFinite(Number(player.maxLevel)) ? Math.floor(Number(player.maxLevel)) : PLAYER_MAX_LEVEL;
  player.maxLevel = clamp(player.maxLevel, 1, PLAYER_MAX_LEVEL);
  player.level = Number.isFinite(Number(player.level)) ? Math.floor(Number(player.level)) : 1;
  player.level = clamp(player.level, 1, player.maxLevel);
  player.xp = Math.max(0, Math.floor(Number(player.xp) || 0));
  player.totalXp = Math.max(0, Math.floor(Number(player.totalXp) || 0));
  player.skillPoints = Math.max(0, Math.floor(Number(player.skillPoints) || 0));
  player.damageBonus = Math.max(0, Number(player.damageBonus) || 0);
  player.baseSpeed = Number.isFinite(Number(player.baseSpeed)) ? Number(player.baseSpeed) : 150;
  player.speed = Number.isFinite(Number(player.speed)) ? Number(player.speed) : player.baseSpeed;

  if (player.level >= player.maxLevel) {
    player.level = player.maxLevel;
    player.xp = 0;
    player.xpToNextLevel = 0;
  } else {
    player.xpToNextLevel = getXpToNextLevel(player.level);
  }
}

function awardXp(amount, reason = "XP") {
  normalizeLevelState();
  if (player.level >= player.maxLevel) {
    showHudToast("Nivel maximo");
    updateHud();
    return;
  }

  const gained = Math.max(0, Math.floor(Number(amount) || 0));
  if (!gained) return;

  player.xp += gained;
  player.totalXp += gained;
  spawnFloatingText(`+${gained} XP`, player.x + 8, player.y - 26, "#55e8ff");

  let levelsGained = 0;
  let guard = 0;
  while (player.level < player.maxLevel && player.xp >= player.xpToNextLevel && guard < PLAYER_MAX_LEVEL) {
    player.xp -= player.xpToNextLevel;
    player.level += 1;
    levelsGained += 1;
    applyLevelReward(player.level);
    player.xpToNextLevel = getXpToNextLevel(player.level);
    guard += 1;
  }

  if (player.level >= player.maxLevel) {
    player.level = player.maxLevel;
    player.xp = 0;
    player.xpToNextLevel = 0;
  }

  if (levelsGained > 0) {
    player.levelGlowTimer = 1.6;
    playSound("levelUp");
    vibrate([20, 35, 20]);
    showHudToast(`Subiu para o nivel ${player.level}!`);
    spawnFloatingText(`Nivel ${player.level}!`, player.x - 4, player.y - 42, "#fff264");
  } else {
    showHudToast(`${reason}: +${gained} XP`, 1.7);
  }

  updateHud();
  if (statusOpen) renderStatusPanel();
}

function applyLevelReward(level) {
  player.skillPoints = (player.skillPoints || 0) + 1;
  player.damageBonus = Number(player.damageBonus || 0) + 0.05;

  if (level % 5 === 0) {
    player.maxHealth += 1;
    player.health = Math.min(player.maxHealth, player.health + 1);
  }
  if (level % 3 === 0) {
    player.maxMana += 1;
    player.mana = Math.min(player.maxMana, player.mana + 1);
  }
  if (level % 10 === 0) {
    player.defense += 1;
  }
  if (level % 25 === 0) {
    player.speed = Math.min(190, player.speed + 1);
  }
}

function getEnemyXpReward(obj) {
  if (obj.boss) {
    if (["reiSlime", "aranhaRainha", "golemAncestral", "bruxoSombrio", "serpenteLago"].includes(obj.kind)) return 1000;
    return 200;
  }

  const rewards = {
    slime: 10,
    slimeVerde: 10,
    slimeVermelho: 14,
    slimeAzul: 12,
    morcego: 10,
    aranha: 15,
    goblin: 25,
    arqueiroGoblin: 30,
    magoSombrio: 50,
    golemPedra: 50,
    fantasma: 35,
    peixeHostil: 18,
    miniDragao: 80,
    guardiao: 200
  };

  return rewards[obj.kind] || Math.max(10, Number(obj.xpReward || 10));
}

function countDefeatedBosses() {
  return Object.values(questBook.defeatedBosses || {}).filter(Boolean).length;
}

function countCompletedMissions() {
  return [
    quest.status === "done",
    Boolean(questBook.keyFound),
    questBook.forestMonstersDefeated >= questBook.forestMonstersGoal,
    Boolean(questBook.letterDelivered),
    Boolean(dimensionQuest.missionDone),
    Boolean(questBook.bossChestOpened)
  ].filter(Boolean).length;
}

function readSaveRaw() {
  try {
    return localStorage.getItem(SAVE_KEY);
  } catch (error) {
    startMessage.textContent = "Nao foi possivel acessar o save neste navegador.";
    showHudToast("Save indisponivel neste navegador.");
    return null;
  }
}

function writeSaveRaw(payload) {
  try {
    localStorage.setItem(SAVE_KEY, payload);
    return true;
  } catch (error) {
    startMessage.textContent = "Nao foi possivel salvar, mas o jogo continua.";
    showHudToast("Nao foi possivel salvar.");
    return false;
  }
}

function draw() {
  ensureCanvasSize();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(-Math.round(camera.x), -Math.round(camera.y));

  drawMap();
  if (currentScene === "crystalDimension") drawDimensionAmbient();
  drawHazards();

  const visibleObjects = objects.filter((obj) => {
    if (!isOnCamera(obj, 96)) return false;
    if (obj.type === "crystal" || obj.type === "collectible") return !obj.collected;
    if (obj.type === "enemy") return obj.alive;
    if (obj.type === "dimensionBlocker" && dimensionQuest.bridgeOpen) return false;
    if (obj.type === "rareChest") return questBook.bossDefeated && !questBook.bossChestOpened;
    return obj.type !== "block";
  });
  const visiblePowerUps = currentScene === "village" ? powerUps.filter((obj) => !obj.collected && isOnCamera(obj, 80)) : [];
  const visibleLoot = currentScene === "village" ? lootItems.filter((obj) => !obj.collected && isOnCamera(obj, 80)) : [];
  const drawables = [...visibleObjects, ...visiblePowerUps, ...visibleLoot, { type: "player", y: player.y, height: player.height }];
  drawables.sort((a, b) => (a.y + a.height) - (b.y + b.height));

  for (const item of drawables) {
    if (item.type === "player") drawPlayer();
    else drawObject(item);
  }
  drawMobileTargetMark();
  drawAttack();
  drawProjectiles();
  drawShockwaves();
  drawDashTrails();
  drawHealBursts();
  drawFloatingTexts();
  drawAimCursor();

  ctx.restore();
  drawMiniMap();
}

function isOnCamera(obj, margin = 64) {
  return (
    obj.x + obj.width >= camera.x - margin &&
    obj.x <= camera.x + canvas.width + margin &&
    obj.y + obj.height >= camera.y - margin &&
    obj.y <= camera.y + canvas.height + margin
  );
}

function drawMap() {
  let activeMap = homeMap;
  let cols = HOME_COLS;
  let rows = HOME_ROWS;

  if (currentScene === "village") {
    activeMap = worldMap;
    cols = MAP_COLS;
    rows = MAP_ROWS;
  } else if (currentScene === "crystalDimension") {
    activeMap = crystalDimensionMap;
    cols = CRYSTAL_COLS;
    rows = CRYSTAL_ROWS;
  }

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
      else if (tile === "C") drawCrystalFloor(px, py, x, y);
      else if (tile === "Q") drawCrystalPath(px, py, x, y);
      else if (tile === "M") drawMagicWater(px, py, x, y);
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

function drawCrystalFloor(x, y, tileX, tileY) {
  const pulse = Math.sin(performance.now() / 1200 + tileX * 0.3 + tileY * 0.2) * 10;
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#34205f" : "#2a1a52";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = `rgba(124, ${84 + pulse}, 220, 0.18)`;
  if ((tileX * 3 + tileY * 5) % 6 === 0) ctx.fillRect(x + 8, y + 9, 5, 5);
  if ((tileX * 7 + tileY * 2) % 8 === 0) ctx.fillRect(x + 21, y + 20, 6, 3);
}

function drawCrystalPath(x, y, tileX, tileY) {
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#5a3d86" : "#50357c";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgba(222, 194, 255, 0.2)";
  ctx.fillRect(x + 6, y + 7, 10, 3);
  ctx.fillRect(x + 18, y + 21, 8, 3);
  ctx.strokeStyle = "rgba(25, 17, 45, 0.45)";
  ctx.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
}

function drawMagicWater(x, y, tileX, tileY) {
  const wave = Math.sin(performance.now() / 300 + tileX + tileY) * 2;
  ctx.fillStyle = (tileX + tileY) % 2 === 0 ? "#3d48c9" : "#3341aa";
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = "rgba(112, 242, 255, 0.7)";
  ctx.fillRect(x + 5, y + 10 + wave, 10, 3);
  ctx.fillRect(x + 18, y + 19 - wave, 9, 3);
  ctx.fillStyle = "rgba(188, 111, 255, 0.3)";
  ctx.fillRect(x, y + TILE - 4, TILE, 4);
}

function drawDimensionAmbient() {
  const time = performance.now() / 1000;
  const alpha = 0.06 + Math.sin(time * 0.8) * 0.025;

  if (dimensionQuest.bridgeOpen) drawCrystalBridge();

  ctx.fillStyle = `rgba(141, 75, 224, ${alpha})`;
  ctx.fillRect(camera.x, camera.y, canvas.width, canvas.height);

  const particleStep = isMobile ? 2 : 1;
  for (let i = 0; i < dimensionParticles.length; i += particleStep) {
    const particle = dimensionParticles[i];
    const px = particle.x + Math.sin(time * particle.speed + particle.phase) * 14;
    const py = particle.y + Math.cos(time * particle.speed + particle.phase) * 10;
    if (px < camera.x - 8 || px > camera.x + canvas.width + 8 || py < camera.y - 8 || py > camera.y + canvas.height + 8) continue;
    ctx.fillStyle = particle.size === 2 ? "rgba(129, 239, 255, 0.55)" : "rgba(255, 242, 100, 0.45)";
    ctx.fillRect(px, py, particle.size, particle.size);
  }
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
  if (obj.type === "dimensionPortal") drawPortal(obj);
  if (obj.type === "dimensionBlocker") drawDimensionBlocker(obj);
  if (obj.type === "dimensionCrystal") drawDimensionCrystal(obj);
  if (obj.type === "dimensionChest") drawDimensionChest(obj);
  if (obj.type === "dimensionSign") drawDimensionSign(obj);
  if (obj.type === "talkingStone") drawTalkingStone(obj);
  if (obj.type === "magicFountain") drawMagicFountain(obj);
  if (obj.type === "largeCrystal") drawLargeCrystal(obj);
  if (obj.type === "strangeTree") drawStrangeTree(obj);
  if (obj.type === "floatingRock") drawFloatingRock(obj);
  if (obj.type === "secretStone") drawSecretStone(obj);
  if (obj.type === "cave") drawCave(obj);
  if (obj.type === "bed") drawBed(obj);
  if (obj.type === "table") drawTable(obj);
  if (obj.type === "counter") drawCounter(obj);
  if (obj.type === "mayorDesk") drawMayorDesk(obj);
  if (obj.type === "bookshelf") drawBookshelf(obj);
  if (obj.type === "chest") drawChest(obj);
  if (obj.type === "rareChest") drawRareChest(obj);
  if (obj.type === "plant") drawPlant(obj);
  if (obj.type === "flower") drawFlower(obj);
  if (obj.type === "rock") drawRock(obj);
  if (obj.type === "crystal") drawCrystal(obj);
  if (obj.type === "collectible") drawCollectible(obj);
  if (obj.type === "loot") drawLootItem(obj);
  if (obj.type === "powerUp") drawPowerUp(obj);
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
  const time = performance.now();
  const mainColor = obj.type === "dimensionPortal" ? "#ff72dc" : "#55e8ff";
  const lightColor = obj.type === "dimensionPortal" ? "#ffe4fb" : "#e9ffff";
  const x = obj.x;
  const y = obj.y;

  ctx.fillStyle = obj.type === "dimensionPortal" ? "rgba(255, 114, 220, 0.24)" : "rgba(85, 232, 255, 0.25)";
  ctx.fillRect(x + 5, y + 22, 54, 66);
  pixelRect(x + 4, y + 14, 12, 74, "#8a8da2");
  pixelRect(x + 48, y + 14, 12, 74, "#8a8da2");
  pixelRect(x + 8, y + 8, 48, 12, "#8a8da2");

  ctx.save();
  ctx.translate(x + 32, y + 55);
  ctx.rotate(time / 900);
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(-13, -22, 26, 44);
  ctx.restore();

  ctx.fillStyle = mainColor;
  ctx.fillRect(x + 21, y + 28 + pulse, 22, 44 - pulse);
  ctx.fillStyle = lightColor;
  ctx.fillRect(x + 28, y + 36 + pulse, 8, 24);

  for (let i = 0; i < 8; i++) {
    const angle = time / 520 + i * 0.8;
    const px = x + 32 + Math.cos(angle) * (28 + i % 2 * 7);
    const py = y + 54 + Math.sin(angle) * (34 + i % 3 * 4);
    ctx.fillStyle = i % 2 === 0 ? mainColor : lightColor;
    ctx.fillRect(px, py, 3, 3);
  }
}

function drawCrystalBridge() {
  const x = 21 * TILE;
  const y = 13 * TILE;
  const width = 5 * TILE;
  const height = 2 * TILE;

  ctx.fillStyle = "rgba(255, 242, 100, 0.2)";
  ctx.fillRect(x - 4, y - 4, width + 8, height + 8);
  pixelRect(x, y + 6, width, height - 12, "#8f6ec9", "#24193f");
  ctx.fillStyle = "#bba0ff";
  for (let ix = x + 12; ix < x + width - 8; ix += 24) {
    ctx.fillRect(ix, y + 12, 4, height - 24);
  }
}

function drawDimensionBlocker(obj) {
  if (dimensionQuest.bridgeOpen) return;

  const shimmer = Math.sin(performance.now() / 180) * 3;
  ctx.fillStyle = "rgba(14, 9, 30, 0.55)";
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
  for (let x = obj.x + 8; x < obj.x + obj.width; x += 24) {
    pixelRect(x, obj.y + 8 + shimmer, 14, 40, "#6a39c7", "#1b1336");
    ctx.fillStyle = "#c7fcff";
    ctx.fillRect(x + 5, obj.y + 13 + shimmer, 4, 10);
  }
}

function drawDimensionCrystal(obj) {
  const glow = obj.activated ? 0.45 : 0.22;
  const pulse = Math.sin(performance.now() / 220 + obj.crystalIndex) * 3;
  const flash = performance.now() - obj.activatedAt < 650 ? 8 : 0;

  ctx.fillStyle = `rgba(129, 239, 255, ${glow})`;
  ctx.fillRect(obj.x - 6 - flash, obj.y + 4 - flash, obj.width + 12 + flash * 2, obj.height + 8 + flash * 2);
  ctx.fillStyle = "#1b1336";
  ctx.fillRect(obj.x + 7, obj.y, 8, 4);
  ctx.fillRect(obj.x + 3, obj.y + 4, 16, 6);
  ctx.fillRect(obj.x, obj.y + 10, 22, 15);
  ctx.fillRect(obj.x + 6, obj.y + 25, 10, 7);
  ctx.fillStyle = obj.activated ? "#fff264" : "#55e8ff";
  ctx.fillRect(obj.x + 8, obj.y + 3 + pulse, 6, 5);
  ctx.fillRect(obj.x + 5, obj.y + 9 + pulse, 12, 15);
  ctx.fillRect(obj.x + 9, obj.y + 24 + pulse, 4, 6);
  ctx.fillStyle = "#e9ffff";
  ctx.fillRect(obj.x + 12, obj.y + 10 + pulse, 3, 8);
}

function drawDimensionChest(obj) {
  const opened = obj.opened || dimensionQuest.chestOpened;
  pixelRect(obj.x, obj.y + 12, obj.width, 20, opened ? "#a97146" : "#7f543b", "#1b1336");
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + obj.width / 2 - 4, obj.y + 20, 8, 7);
  if (opened) {
    pixelRect(obj.x + 3, obj.y, obj.width - 6, 16, "#d69b5e", "#1b1336");
    ctx.fillStyle = "rgba(255, 242, 100, 0.6)";
    ctx.fillRect(obj.x + 12, obj.y - 12, obj.width - 24, 12);
  } else {
    pixelRect(obj.x + 3, obj.y + 4, obj.width - 6, 15, "#b87955", "#1b1336");
  }
}

function drawDimensionSign(obj) {
  pixelRect(obj.x + 7, obj.y + 10, 5, 18, "#6d4a8d", "#1b1336");
  pixelRect(obj.x, obj.y, 20, 14, "#bba0ff", "#1b1336");
  ctx.fillStyle = "#fff264";
  ctx.fillRect(obj.x + 5, obj.y + 5, 10, 2);
}

function drawTalkingStone(obj) {
  pixelRect(obj.x, obj.y + 4, obj.width, obj.height, "#8a8da2", "#1b1336");
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 8, obj.y + 1, 8, 5);
  ctx.fillStyle = "#1b1336";
  ctx.fillRect(obj.x + 6, obj.y + 13, 4, 3);
  ctx.fillRect(obj.x + 15, obj.y + 13, 4, 3);
}

function drawMagicFountain(obj) {
  pixelRect(obj.x + 8, obj.y + 24, obj.width - 16, 25, "#6d5c75", "#1b1336");
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 20, obj.y + 8, 24, 24);
  ctx.fillStyle = "rgba(255, 242, 100, 0.45)";
  ctx.fillRect(obj.x + 26, obj.y + 2, 12, 12);
  ctx.fillStyle = "#3d48c9";
  ctx.fillRect(obj.x + 18, obj.y + 30, 28, 10);
}

function drawLargeCrystal(obj) {
  const pulse = Math.sin(performance.now() / 300 + obj.x) * 2;
  ctx.fillStyle = "rgba(129, 239, 255, 0.25)";
  ctx.fillRect(obj.x - 5, obj.y + 8, obj.width + 10, obj.height);
  ctx.fillStyle = "#1b1336";
  ctx.fillRect(obj.x + 10, obj.y, 8, 6);
  ctx.fillRect(obj.x + 4, obj.y + 6, 20, 18);
  ctx.fillRect(obj.x, obj.y + 24, 28, 16);
  ctx.fillStyle = "#8d4be0";
  ctx.fillRect(obj.x + 8, obj.y + 8 + pulse, 12, 18);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + 11, obj.y + 11 + pulse, 5, 16);
  ctx.fillStyle = "#bba0ff";
  ctx.fillRect(obj.x + 7, obj.y + 27 + pulse, 14, 12);
}

function drawStrangeTree(obj) {
  const x = obj.x;
  const y = obj.y;
  pixelRect(x + 11, y + 36, 12, 28, "#4b386f", "#1b1336");
  ctx.fillStyle = "#1b1336";
  ctx.fillRect(x + 3, y + 13, 26, 28);
  ctx.fillRect(x, y + 25, 32, 23);
  ctx.fillStyle = "#7c4fd4";
  ctx.fillRect(x + 6, y + 17, 21, 20);
  ctx.fillRect(x + 4, y + 29, 24, 14);
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(x + 13, y + 21, 5, 5);
}

function drawFloatingRock(obj) {
  const float = Math.sin(performance.now() / 420 + obj.x) * 3;
  ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
  ctx.fillRect(obj.x + 2, obj.y + 17, obj.width - 4, 5);
  pixelRect(obj.x, obj.y + float, obj.width, obj.height, "#76708e", "#1b1336");
  ctx.fillStyle = "#bba0ff";
  ctx.fillRect(obj.x + 6, obj.y + 5 + float, 8, 3);
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

function drawRareChest(obj) {
  const shine = Math.sin(performance.now() / 180) * 3;
  ctx.fillStyle = "rgba(255, 242, 100, 0.35)";
  ctx.fillRect(obj.x - 6, obj.y - 8 + shine, obj.width + 12, obj.height + 16);
  pixelRect(obj.x, obj.y + 8, obj.width, 22, "#8f5a3f", "#1a1f3d");
  pixelRect(obj.x + 4, obj.y, obj.width - 8, 18, "#fff264", "#1a1f3d");
  ctx.fillStyle = "#55e8ff";
  ctx.fillRect(obj.x + obj.width / 2 - 5, obj.y + 14, 10, 8);
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

function drawLootItem(obj) {
  const x = obj.x;
  const y = obj.y + Math.sin(performance.now() / 190 + obj.x) * 2;

  if (obj.kind === "bossItem") {
    ctx.fillStyle = "rgba(85, 232, 255, 0.35)";
    ctx.fillRect(x - 3, y - 3, 22, 22);
    pixelRect(x + 2, y + 2, 12, 12, "#55e8ff");
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 6, y + 5, 4, 4);
    return;
  }

  if (obj.kind === "fragmento" || obj.kind === "fragmentoAzul") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 4, 12, 10);
    ctx.fillStyle = obj.kind === "fragmentoAzul" ? "#55e8ff" : "#c7ccd4";
    ctx.fillRect(x + 4, y + 5, 8, 7);
    ctx.fillStyle = "#e9ffff";
    ctx.fillRect(x + 7, y + 4, 4, 3);
    return;
  }

  if (obj.kind === "flechas") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 7, 14, 4);
    ctx.fillRect(x + 10, y + 4, 4, 10);
    ctx.fillStyle = "#f0b276";
    ctx.fillRect(x + 3, y + 8, 11, 2);
    ctx.fillStyle = "#fff3d6";
    ctx.fillRect(x + 12, y + 5, 3, 3);
    return;
  }

  if (obj.kind === "manaOrbe") {
    ctx.fillStyle = "rgba(180, 109, 255, 0.3)";
    ctx.fillRect(x - 2, y - 2, 20, 20);
    pixelRect(x + 3, y + 3, 10, 10, "#b46dff");
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 7, y + 5, 3, 3);
    return;
  }

  if (obj.kind === "chaveRara") {
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 1, y + 5, 16, 6);
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 3, y + 6, 9, 4);
    ctx.fillRect(x + 11, y + 9, 6, 3);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 5, y + 7, 3, 2);
    return;
  }

  drawCollectible({
    item: obj.kind === "moeda" ? "moeda" : "pocao",
    x,
    y
  });
}

function drawHazards() {
  for (const obj of hazardZones) {
    const alpha = Math.max(0, obj.timer / obj.maxTimer);
    if (obj.type === "web") {
      ctx.strokeStyle = `rgba(233, 255, 255, ${0.35 * alpha})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(obj.x - obj.radius, obj.y);
      ctx.lineTo(obj.x + obj.radius, obj.y);
      ctx.moveTo(obj.x, obj.y - obj.radius);
      ctx.lineTo(obj.x, obj.y + obj.radius);
      ctx.stroke();
    } else if (obj.type === "whirlpool") {
      ctx.strokeStyle = `rgba(85, 232, 255, ${0.55 * alpha})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius * (1 - alpha * 0.25), performance.now() / 300, Math.PI * 1.6 + performance.now() / 300);
      ctx.stroke();
    } else {
      ctx.fillStyle = `rgba(255, 79, 98, ${0.18 * alpha})`;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawPowerUp(obj) {
  const x = obj.x;
  const y = obj.y + Math.sin(performance.now() / 210 + obj.x) * 2;
  const glow = 0.28 + Math.sin(performance.now() / 180) * 0.08;

  const colors = {
    speed: "#55e8ff",
    force: "#ff4f62",
    shield: "#fff264",
    regen: "#7bdb73",
    mana: "#b46dff"
  };
  colors.waterBreathing = "#7bd5ff";

  ctx.fillStyle = `rgba(255, 255, 255, ${glow})`;
  ctx.fillRect(x - 5, y - 5, 28, 28);
  ctx.fillStyle = "#273052";

  if (obj.kind === "speed") {
    ctx.fillRect(x + 3, y + 5, 12, 12);
    ctx.fillStyle = colors.speed;
    ctx.fillRect(x + 5, y + 3, 8, 10);
    ctx.fillRect(x + 2, y + 12, 15, 5);
    ctx.fillStyle = "#e9ffff";
    ctx.fillRect(x + 11, y + 5, 3, 5);
    return;
  }

  if (obj.kind === "force") {
    ctx.fillRect(x + 8, y, 4, 20);
    ctx.fillStyle = colors.force;
    ctx.fillRect(x + 9, y + 1, 2, 14);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 4, y + 14, 12, 3);
    return;
  }

  if (obj.kind === "shield") {
    ctx.fillRect(x + 3, y + 2, 14, 17);
    ctx.fillStyle = colors.shield;
    ctx.fillRect(x + 5, y + 4, 10, 10);
    ctx.fillRect(x + 8, y + 14, 4, 4);
    return;
  }

  if (obj.kind === "regen") {
    ctx.fillStyle = colors.regen;
    ctx.fillRect(x + 6, y + 4, 8, 4);
    ctx.fillRect(x + 4, y + 8, 12, 4);
    ctx.fillRect(x + 6, y + 12, 8, 4);
    ctx.fillRect(x + 8, y + 16, 4, 3);
    return;
  }

  if (obj.kind === "waterBreathing") {
    ctx.fillStyle = colors.waterBreathing;
    ctx.fillRect(x + 4, y + 8, 12, 8);
    ctx.fillRect(x + 7, y + 4, 6, 6);
    ctx.fillStyle = "#e9ffff";
    ctx.fillRect(x + 5, y + 2, 4, 4);
    ctx.fillRect(x + 13, y, 3, 3);
    return;
  }

  ctx.fillStyle = "#273052";
  ctx.fillRect(x + 2, y + 2, 16, 16);
  ctx.fillStyle = colors.mana;
  ctx.fillRect(x + 5, y + 5, 10, 10);
  ctx.fillStyle = "#e9ffff";
  ctx.fillRect(x + 8, y + 4, 4, 4);
}

function drawEnemy(obj) {
  const x = obj.x;
  const y = obj.y;
  const blinking = obj.invulnerableTimer > 0 && Math.floor(performance.now() / 70) % 2 === 0;
  const phaseGlow = obj.boss && obj.phase === 2;

  ctx.save();
  if (blinking) ctx.globalAlpha = 0.45;

  if (phaseGlow) {
    ctx.fillStyle = "rgba(255, 79, 98, 0.22)";
    ctx.fillRect(x - 6, y - 8, obj.width + 12, obj.height + 14);
  }

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
  } else if (obj.kind === "slimeVermelho" || obj.kind === "reiSlime" || obj.kind === "slimeVerde" || obj.kind === "slimeAzul" || obj.kind === "slime") {
    const slimeColor = obj.kind === "slimeVermelho" ? "#ff4f62" :
      obj.kind === "slimeAzul" ? "#55e8ff" :
        obj.kind === "reiSlime" ? "#7bdb73" : "#55e8ff";
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 2, y + obj.height - 4, obj.width - 2, 5);
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 1, y + 5, obj.width - 2, obj.height - 5);
    ctx.fillStyle = slimeColor;
    ctx.fillRect(x + 3, y + 7, obj.width - 6, obj.height - 9);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 6, y + 11, 2, 2);
    ctx.fillRect(x + obj.width - 8, y + 11, 2, 2);
    if (obj.kind === "reiSlime") {
      ctx.fillStyle = "#fff264";
      ctx.fillRect(x + obj.width / 2 - 7, y, 14, 5);
      ctx.fillRect(x + obj.width / 2 - 4, y - 4, 3, 5);
      ctx.fillRect(x + obj.width / 2 + 3, y - 4, 3, 5);
    }
  } else if (obj.kind === "golem" || obj.kind === "golemPedra" || obj.kind === "golemAncestral") {
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 1, y + obj.height - 4, obj.width, 6);
    pixelRect(x + 4, y + Math.max(10, obj.height - 20), obj.width - 8, 18, "#8a8da2");
    pixelRect(x + 7, y + 2, obj.width - 14, 14, "#76708e");
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + 9, y + 8, 3, 3);
    ctx.fillRect(x + obj.width - 13, y + 8, 3, 3);
  } else if (obj.kind === "mago" || obj.kind === "magoSombrio" || obj.kind === "bruxoSombrio") {
    pixelRect(x + 4, y + 9, obj.width - 8, obj.height - 9, obj.kind === "bruxoSombrio" ? "#6d3d8f" : "#4b386f");
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 4, obj.width - 4, 8);
    ctx.fillStyle = "#b46dff";
    ctx.fillRect(x + obj.width / 2 - 4, y + 1, 8, 8);
    ctx.fillStyle = "#55e8ff";
    ctx.fillRect(x + obj.width / 2 - 2, y + 15, 4, 4);
  } else if (obj.kind === "guardiao" || obj.kind === "miniGuardiao") {
    ctx.fillStyle = "rgba(39, 48, 82, 0.3)";
    ctx.fillRect(x + 2, y + obj.height - 5, obj.width - 2, 7);
    pixelRect(x + 4, y + 16, obj.width - 8, obj.height - 17, "#7c6b8f", "#1a1f3d");
    pixelRect(x + 9, y + 1, obj.width - 18, 19, "#8a8da2", "#1a1f3d");
    ctx.fillStyle = "#ff4f62";
    ctx.fillRect(x + 13, y + 9, 4, 4);
    ctx.fillRect(x + obj.width - 17, y + 9, 4, 4);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + obj.width / 2 - 3, y + obj.height - 15, 7, 7);
  } else if (obj.kind === "aranha" || obj.kind === "aranhaRainha") {
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 2, y + obj.height - 4, obj.width - 2, 5);
    ctx.fillStyle = "#273052";
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(x + 2 + i * 6, y + 6, 4, obj.height - 6);
      ctx.fillRect(x + 1 + i * 7, y + obj.height - 8, 6, 3);
    }
    ctx.fillStyle = obj.kind === "aranhaRainha" ? "#d24c63" : "#6d5c75";
    ctx.fillRect(x + 6, y + 7, obj.width - 12, obj.height - 9);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 10, y + 11, 2, 2);
    ctx.fillRect(x + obj.width - 12, y + 11, 2, 2);
  } else if (obj.kind === "goblin" || obj.kind === "arqueiroGoblin") {
    pixelRect(x + 4, y + 11, obj.width - 8, obj.height - 10, obj.kind === "arqueiroGoblin" ? "#7bdb73" : "#a45d3d");
    pixelRect(x + 5, y + 2, obj.width - 10, 13, "#7bdb73");
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 7, 5, 3);
    ctx.fillRect(x + obj.width - 7, y + 7, 5, 3);
    ctx.fillRect(x + 8, y + 8, 2, 2);
    ctx.fillRect(x + obj.width - 11, y + 8, 2, 2);
    if (obj.kind === "arqueiroGoblin") {
      ctx.fillStyle = "#f0b276";
      ctx.fillRect(x + obj.width - 4, y + 9, 3, 17);
    }
  } else if (obj.kind === "fantasma") {
    ctx.globalAlpha = blinking ? 0.35 : 0.78;
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 2, y + 3, obj.width - 4, obj.height - 4);
    ctx.fillStyle = "#e9ffff";
    ctx.fillRect(x + 4, y + 5, obj.width - 8, obj.height - 8);
    ctx.fillStyle = "#b46dff";
    ctx.fillRect(x + 8, y + 12, 3, 3);
    ctx.fillRect(x + obj.width - 11, y + 12, 3, 3);
    ctx.fillRect(x + 5, y + obj.height - 8, 4, 5);
    ctx.fillRect(x + 14, y + obj.height - 8, 4, 5);
  } else if (obj.kind === "peixeHostil" || obj.kind === "serpenteLago") {
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 2, y + obj.height - 2, obj.width - 4, 4);
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 1, y + 4, obj.width - 6, obj.height - 6);
    ctx.fillRect(x + obj.width - 9, y + 8, 8, 8);
    ctx.fillStyle = obj.kind === "serpenteLago" ? "#3f8fe5" : "#55e8ff";
    ctx.fillRect(x + 3, y + 6, obj.width - 10, obj.height - 10);
    ctx.fillRect(x + obj.width - 7, y + 10, 5, 4);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + 8, y + 8, 2, 2);
  } else if (obj.kind === "miniDragao") {
    ctx.fillStyle = "rgba(39, 48, 82, 0.25)";
    ctx.fillRect(x + 3, y + obj.height - 4, obj.width - 5, 5);
    ctx.fillStyle = "#273052";
    ctx.fillRect(x + 3, y + 8, obj.width - 8, obj.height - 8);
    ctx.fillRect(x + obj.width - 8, y + 4, 8, 11);
    ctx.fillRect(x + 2, y + 4, 8, 8);
    ctx.fillStyle = "#ff4f62";
    ctx.fillRect(x + 5, y + 10, obj.width - 13, obj.height - 12);
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x + obj.width - 6, y + 7, 2, 2);
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
  if (obj.boss) {
    ctx.fillStyle = "#fff264";
    ctx.fillRect(x, y - 12, Math.max(0, obj.width * (obj.hp / obj.maxHp)), 3);
  }
  ctx.restore();
}

function drawAttack() {
  if (attackTimer <= 0 || !currentMeleeAttack) return;
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const preparing = attackWindupTimer > 0;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(currentMeleeAttack.angle);
  ctx.strokeStyle = preparing ? "#55e8ff" : "#fff264";
  ctx.fillStyle = preparing ? "rgba(85, 232, 255, 0.12)" : "rgba(255, 242, 100, 0.32)";
  ctx.lineWidth = preparing ? 2 : 4;

  if (currentMeleeAttack.weaponKey === "spear") {
    ctx.fillRect(8, -5, currentMeleeAttack.range, 10);
    ctx.strokeRect(8, -5, currentMeleeAttack.range, 10);
  } else {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, currentMeleeAttack.range, -currentMeleeAttack.arc / 2, currentMeleeAttack.arc / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function drawNpc(obj) {
  const bob = Math.sin(performance.now() / 300 + obj.bob) * 2;
  const x = obj.x;
  const y = obj.y + bob;
  const shirt = obj.role === "dimensionGuide" ? "#8d4be0" :
    obj.role === "dimensionMystic" ? "#55e8ff" :
      obj.name === "Nico" ? "#3f8fe5" : obj.name === "Ari" ? "#d24c63" : "#7bdb73";

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
  const blinking = playerInvulnerableTimer > 0 && Math.floor(performance.now() / 80) % 2 === 0;

  ctx.save();
  if (blinking) ctx.globalAlpha = 0.45;

  if (player.isSwimming) {
    ctx.strokeStyle = "rgba(233, 255, 255, 0.75)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(x + 12, y + 25, 18, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  if (player.levelGlowTimer > 0) {
    const pulse = 0.35 + Math.sin(performance.now() / 80) * 0.18;
    ctx.fillStyle = `rgba(255, 242, 100, ${pulse})`;
    ctx.fillRect(x - 8, y - 8, player.width + 16, player.height + 16);
    ctx.fillStyle = "rgba(85, 232, 255, 0.34)";
    ctx.fillRect(x - 2, y - 14, player.width + 4, 5);
    ctx.fillRect(x + 3, y + player.height + 4, player.width - 6, 4);
  }

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

  ctx.restore();
}

function findInteraction() {
  const playerCenter = {
    x: player.x + player.width / 2,
    y: player.y + player.height / 2,
    width: 1,
    height: 1
  };

  return interactables.find((obj) => {
    if (obj.type === "rareChest" && (!questBook.bossDefeated || questBook.bossChestOpened)) return false;
    const range = {
      x: obj.x - 26,
      y: obj.y - 26,
      width: obj.width + 52,
      height: obj.height + 52
    };
    return rectsOverlap(playerCenter, range);
  });
}

function countActivatedDimensionCrystals() {
  return crystalDimensionObjects.filter((obj) => obj.type === "dimensionCrystal" && obj.activated).length;
}

function syncDimensionQuestState() {
  dimensionQuest.activatedCrystals = countActivatedDimensionCrystals();
  if (dimensionQuest.activatedCrystals >= dimensionQuest.totalCrystals) {
    dimensionQuest.bridgeOpen = true;
    if (dimensionQuest.status === "active") dimensionQuest.status = "ready";
  }

  const chestObj = crystalDimensionObjects.find((obj) => obj.type === "dimensionChest");
  if (chestObj) chestObj.opened = dimensionQuest.chestOpened;
}

function getDimensionNpcMessage(npcObj) {
  if (npcObj.role === "dimensionGuide") {
    if (dimensionQuest.status === "notStarted") {
      dimensionQuest.status = "active";
      return "Orion: A ponte esta selada. Ative os 3 cristais magicos e o caminho para o bau vai aparecer.";
    }

    if (dimensionQuest.status === "active") {
      return `Orion: Ainda faltam cristais. Progresso: ${dimensionQuest.activatedCrystals}/${dimensionQuest.totalCrystals}.`;
    }

    if (dimensionQuest.status === "ready" && !dimensionQuest.chestOpened) {
      return "Orion: A ponte brilhou! Siga para o norte e abra o bau especial.";
    }

    return "Orion: A dimensao reconhece sua coragem. A ponte continuara aberta para voce.";
  }

  if (npcObj.role === "dimensionMystic") {
    if (!dimensionQuest.bridgeOpen) {
      return "Nyx: As pedras flutuantes escutam os cristais. Quando tres luzes acordarem, o norte vai se abrir.";
    }
    return "Nyx: A passagem secreta esta viva. O bau guarda uma recompensa da propria dimensao.";
  }

  return npcObj.message;
}

function activateDimensionCrystal(crystalObj) {
  if (dimensionQuest.status === "notStarted") {
    return `${crystalObj.message} Uma voz distante sussurra: fale com Orion antes de ativar este cristal.`;
  }

  if (crystalObj.activated) {
    return `${crystalObj.message} Este cristal ja esta ativo. Cristais ativados: ${dimensionQuest.activatedCrystals}/${dimensionQuest.totalCrystals}.`;
  }

  crystalObj.activated = true;
  crystalObj.activatedAt = performance.now();
  dimensionQuest.activatedCrystals = countActivatedDimensionCrystals();
  awardXp(150, "Cristal ativado");
  playSound("crystal");

  let message = `${crystalObj.message} Voce ativou uma luz magica. Cristais ativados: ${dimensionQuest.activatedCrystals}/${dimensionQuest.totalCrystals}.`;

  if (dimensionQuest.activatedCrystals >= dimensionQuest.totalCrystals) {
    dimensionQuest.bridgeOpen = true;
    dimensionQuest.status = "ready";
    playSound("mission");
    message += " A ponte secreta apareceu ao norte!";
  }

  return message;
}

function openDimensionChest(chestObj) {
  if (!dimensionQuest.bridgeOpen) {
    return "Bau especial: as tres marcas ainda estao apagadas. Ative os cristais primeiro.";
  }

  if (dimensionQuest.chestOpened || chestObj.opened) {
    return "Bau especial: ele ja foi aberto. A luz roxa ainda gira devagar dentro dele.";
  }

  chestObj.opened = true;
  dimensionQuest.chestOpened = true;
  dimensionQuest.missionDone = true;
  dimensionQuest.status = "done";
  inventory.moedas += 25;
  inventory.pocoes += 1;
  inventory.espadas += 1;
  player.maxHealth += 1;
  player.health = Math.min(player.maxHealth, player.health + 1);
  awardXp(300, "Bau da dimensao");
  playSound("chest");
  updateHud();
  renderInventory();
  return "Bau especial aberto! Voce recebeu 25 moedas, 1 pocao, 1 espada rara e ganhou mais 1 coracao maximo.";
}

function openRareChest() {
  if (!questBook.bossDefeated) {
    return "Bau raro: derrote o Guardiao das Ruinas para quebrar o selo.";
  }

  if (questBook.bossChestOpened) {
    return "Bau raro: ele ja foi aberto. So resta um brilho dourado.";
  }

  questBook.bossChestOpened = true;
  inventory.moedas += 50;
  inventory.pocoes += 2;
  inventory.espadas += 1;
  player.maxMana += 1;
  player.mana = player.maxMana;
  awardXp(300, "Bau raro");
  playSound("chest");
  updateHud();
  renderInventory();
  return "Bau raro aberto! Voce recebeu 50 moedas, 2 pocoes, uma espada rara e +1 mana maxima.";
}

function getQuestMessage(npcObj) {
  if (npcObj.type === "rareChest") {
    return openRareChest();
  }

  if (npcObj.type === "portal") {
    enterCrystalDimension();
    return "";
  }

  if (npcObj.type === "dimensionPortal") {
    exitCrystalDimension();
    return "";
  }

  if (npcObj.type === "dimensionCrystal") {
    return activateDimensionCrystal(npcObj);
  }

  if (npcObj.type === "dimensionChest") {
    return openDimensionChest(npcObj);
  }

  if (npcObj.type === "npc" && (npcObj.role === "dimensionGuide" || npcObj.role === "dimensionMystic")) {
    return getDimensionNpcMessage(npcObj);
  }

  if (npcObj.type === "npc" && npcObj.role === "shopkeeper") {
    openShop();
    return "Vendedor: Escolha com calma. Pocao custa 5 moedas.";
  }

  if (npcObj.type === "npc" && npcObj.role === "letterTarget") {
    if (inventory.cartas > 0 && !questBook.letterDelivered) {
      inventory.cartas -= 1;
      questBook.letterDelivered = true;
      inventory.moedas += 6;
      awardXp(300, "Carta entregue");
      return `Beto: Minha carta! Obrigado, ${getPlayerDisplayName()}. Aceite 6 moedas pela entrega.`;
    }
    if (questBook.letterDelivered) return "Beto: Obrigado pela carta. A vila precisava dessa noticia.";
    return "Beto: Se encontrar uma carta perdida, pode trazer para mim?";
  }

  if (npcObj.type !== "npc" || npcObj.name !== "Nico") return npcObj.message;

  if (quest.status === "notStarted") {
    quest.status = "active";
    return `Nico: ${getPlayerDisplayName()}, preciso de ajuda! Encontre 3 cristais brilhantes pela vila e volte aqui.`;
  }

  if (quest.status === "active") {
    return `Nico: Voce encontrou ${quest.collected}/${quest.total} cristais. Continue procurando!`;
  }

  if (quest.status === "ready") {
    quest.status = "done";
    awardXp(300, "Missao dos cristais");
    return `Nico: Voce conseguiu, ${getPlayerDisplayName()}! Receba sua recompensa: ${quest.reward}.`;
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
    vibrate(12);
  }
}

function collectPowerUps() {
  if (currentScene !== "village") return;

  const playerRect = getPlayerRect();
  for (const obj of powerUps) {
    if (obj.collected || !rectsOverlap(playerRect, obj)) continue;

    obj.collected = true;
    applyPowerUp(obj.kind);
    spawnFloatingText(getPowerUpName(obj.kind), obj.x - 8, obj.y - 14, "#fff264");
    playSound("powerup");
    vibrate(16);
  }
}

function applyPowerUp(kind) {
  if (kind === "speed") activePowerUps.speed = 10;
  if (kind === "force") activePowerUps.force = 10;
  if (kind === "shield") activePowerUps.shield = 10;
  if (kind === "regen") activePowerUps.regen = 8;
  if (kind === "waterBreathing") activePowerUps.waterBreathing = 20;
  if (kind === "mana") player.mana = player.maxMana;
}

function getPowerUpName(kind) {
  if (kind === "speed") return "Velocidade";
  if (kind === "force") return "Forca";
  if (kind === "shield") return "Escudo";
  if (kind === "regen") return "Regeneracao";
  if (kind === "waterBreathing") return "Respiracao Aquatica";
  return "Mana cheia";
}

function updateQuestProgress() {
  syncDimensionQuestState();
  questProgressEl.textContent = getCompactMissionText();
  if (missionsOpen) renderMissionsPanel();
}

function getCompactMissionText() {
  if (currentScene === "crystalDimension" || dimensionQuest.status === "active" || dimensionQuest.status === "ready") {
    if (dimensionQuest.chestOpened) return "Dimensao: bau aberto";
    if (dimensionQuest.bridgeOpen) return "Dimensao: abra o bau";
    return `Cristais ativados: ${dimensionQuest.activatedCrystals}/${dimensionQuest.totalCrystals}`;
  }

  if (quest.status === "notStarted") return "Missao: fale com Nico";
  if (quest.status === "active") return `Cristais: ${quest.collected}/${quest.total}`;
  if (quest.status === "ready") return "Cristais: volte ao Nico";
  if (!questBook.keyFound) return "Chave: perdida";
  if (questBook.forestMonstersDefeated < questBook.forestMonstersGoal) {
    return `Monstros: ${questBook.forestMonstersDefeated}/${questBook.forestMonstersGoal}`;
  }
  if (!questBook.letterDelivered) return questBook.letterPicked ? "Carta: leve ao Beto" : "Carta: perdida";
  return "Missoes: em dia";
}

function updateHud() {
  normalizeLevelState();
  updateMobilePowerButtons();
  playerNameEl.textContent = getPlayerHudName();
  if (xpHud) {
    xpHud.textContent = player.level >= player.maxLevel ? "XP: Nivel maximo" : `XP: ${player.xp}/${player.xpToNextLevel}`;
  }
  if (xpFill) {
    const percent = player.level >= player.maxLevel ? 100 : clamp((player.xp / player.xpToNextLevel) * 100, 0, 100);
    xpFill.style.width = `${percent}%`;
  }
  healthHud.textContent = "♥ ".repeat(player.health).trim() || "0";
  manaHud.textContent = `${Math.floor(player.mana)}/${player.maxMana}`;
  manaFill.style.width = `${clamp((player.mana / player.maxMana) * 100, 0, 100)}%`;
  coinHud.textContent = inventory.moedas;
  playerPositionEl.textContent = getAreaName();
  weaponHud.textContent = `Arma: ${getCurrentWeapon().name}${getCurrentWeaponKey() === "bow" ? ` (${inventory.flechas})` : ""}`;
  if (player.isSwimming) {
    oxygenHud.textContent = activePowerUps.waterBreathing > 0 ? "Respirando" : `${Math.ceil(player.oxygen)}/${player.maxOxygen}`;
  } else {
    oxygenHud.textContent = "Fora da agua";
  }
  oxygenFill.style.width = `${clamp((player.oxygen / player.maxOxygen) * 100, 0, 100)}%`;
  const oxygenBox = oxygenHud.closest(".hud-oxygen-box");
  oxygenBox?.classList.toggle("mobile-hidden", isMobile && !player.isSwimming);
  oxygenBox?.classList.toggle("hidden", !player.isSwimming);
  oxygenBox?.classList.toggle("is-low", player.isSwimming && player.oxygen <= 3);
  powerHud.textContent = getPowerHudText();
  if (statusOpen) renderStatusPanel();

  const activeBoss = getActiveBoss();
  bossHud.classList.toggle("hidden", !activeBoss);
  if (activeBoss) {
    bossNameHud.textContent = `${getEnemyDisplayName(activeBoss.kind)}${activeBoss.phase === 2 ? " - fase 2" : ""}`;
    bossFill.style.width = `${clamp((activeBoss.hp / activeBoss.maxHp) * 100, 0, 100)}%`;
  }
}

function getPowerHudText() {
  const cooldown = player.spellCooldowns[equippedPower] || 0;
  const suffix = cooldown > 0 ? ` ${formatCooldown(cooldown)}` : "";
  return `Q: ${powerNames[equippedPower] || "Poder"}${suffix}`;
}

function formatCooldown(value) {
  return value <= 0 ? "ok" : `${value.toFixed(1)}s`;
}

function renderMissionsPanel() {
  if (!missionsList) return;
  syncDimensionQuestState();
  const rows = [
    ["Cristais", quest.status === "notStarted" ? "fale com Nico" : quest.status === "ready" ? "volte ao Nico" : quest.status === "done" ? "ok" : `${quest.collected}/${quest.total}`],
    ["Chave", questBook.keyFound ? "ok" : "perdida"],
    ["Monstros", `${questBook.forestMonstersDefeated}/${questBook.forestMonstersGoal}`],
    ["Carta", questBook.letterDelivered ? "ok" : questBook.letterPicked ? "levar ao Beto" : "perdida"],
    ["Dimensao", `${dimensionQuest.activatedCrystals}/${dimensionQuest.totalCrystals} cristais`],
    ["Bau da dimensao", dimensionQuest.chestOpened ? "aberto" : dimensionQuest.bridgeOpen ? "liberado" : "selado"]
  ];
  missionsList.innerHTML = rows.map(([name, value]) => `<li><span>${name}</span><strong>${value}</strong></li>`).join("");
}

function renderStatusPanel() {
  if (!statusList) return;
  const buffs = Object.entries(activePowerUps)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => `${getPowerUpName(key)} ${Math.ceil(value)}s`);
  const rows = [
    ["Nome", getPlayerDisplayName()],
    ["Nivel", player.level >= player.maxLevel ? `${player.level} MAX` : player.level],
    ["XP", player.level >= player.maxLevel ? "Nivel maximo" : `${player.xp}/${player.xpToNextLevel}`],
    ["XP total", player.totalXp],
    ["Vida", `${player.health}/${player.maxHealth}`],
    ["Mana", `${Math.floor(player.mana)}/${player.maxMana}`],
    ["Oxigenio", player.isSwimming ? `${Math.ceil(player.oxygen)}/${player.maxOxygen}` : "fora da agua"],
    ["Dano base", `+${Math.floor(player.damageBonus || 0)}`],
    ["Defesa", player.defense || 0],
    ["Critico", `${Math.round((player.critChance || 0) * 100)}%`],
    ["Arma", getCurrentWeapon().name],
    ["Poder", powerNames[equippedPower] || "Poder"],
    ["Pontos", player.skillPoints || 0],
    ["Bosses", countDefeatedBosses()],
    ["Missoes", countCompletedMissions()],
    ["Buffs", buffs.length ? buffs.join(", ") : "nenhum"]
  ];
  statusList.innerHTML = rows.map(([name, value]) => `<li><span>${name}</span><strong>${value}</strong></li>`).join("");
}

function toggleMissionsPanel(force) {
  missionsOpen = typeof force === "boolean" ? force : !missionsOpen;
  missionsPanel?.classList.toggle("hidden", !missionsOpen);
  if (missionsOpen) {
    statusOpen = false;
    statusPanel?.classList.add("hidden");
    setPause(false);
    renderMissionsPanel();
  }
}

function toggleStatusPanel(force) {
  statusOpen = typeof force === "boolean" ? force : !statusOpen;
  statusPanel?.classList.toggle("hidden", !statusOpen);
  if (statusOpen) {
    missionsOpen = false;
    missionsPanel?.classList.add("hidden");
    setPause(false);
    renderStatusPanel();
  }
}

function closeOverlayPanels() {
  missionsOpen = false;
  statusOpen = false;
  missionsPanel?.classList.add("hidden");
  statusPanel?.classList.add("hidden");
}

function showHudToast(text, duration = 2.4) {
  hudToastText = text || "";
  hudToastTimer = duration;
  let toast = document.getElementById("hudToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "hudToast";
    toast.className = "hud-toast hidden";
    canvas.parentElement?.appendChild(toast);
  }
  toast.textContent = hudToastText;
  toast.classList.toggle("hidden", !hudToastText);
}

function updateHudToast(delta) {
  if (hudToastTimer <= 0) return;
  hudToastTimer = Math.max(0, hudToastTimer - delta);
  if (hudToastTimer <= 0) {
    const toast = document.getElementById("hudToast");
    toast?.classList.add("hidden");
  }
}

function getStrongEnemyWarning() {
  if (currentScene !== "village") return "";

  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  const strong = villageObjects.find((obj) => {
    if (obj.type !== "enemy" || !obj.alive) return false;
    if (!obj.boss && !["slimeVermelho", "golem", "golemPedra", "mago", "magoSombrio", "guardiao", "miniDragao"].includes(obj.kind)) return false;
    return Math.hypot(obj.x - playerCenterX, obj.y - playerCenterY) < 190;
  });

  return strong ? "Inimigo forte perto!" : "";
}

function getActiveBoss() {
  if (currentScene !== "village") return null;

  const playerCenterX = player.x + player.width / 2;
  const playerCenterY = player.y + player.height / 2;
  let nearest = null;
  let nearestDistance = Infinity;

  for (const obj of villageObjects) {
    if (obj.type !== "enemy" || !obj.alive || !obj.boss) continue;
    const distance = Math.hypot(obj.x + obj.width / 2 - playerCenterX, obj.y + obj.height / 2 - playerCenterY);
    if ((distance < 520 || obj.hp < obj.maxHp) && distance < nearestDistance) {
      nearest = obj;
      nearestDistance = distance;
    }
  }

  return nearest;
}

function getEnemyDisplayName(kind) {
  const names = {
    slimeVerde: "Slime Verde",
    slimeVermelho: "Slime Vermelho",
    slimeAzul: "Slime Azul",
    morcego: "Morcego",
    aranha: "Aranha",
    goblin: "Goblin",
    arqueiroGoblin: "Arqueiro Goblin",
    magoSombrio: "Mago Sombrio",
    golemPedra: "Golem de Pedra",
    fantasma: "Fantasma",
    peixeHostil: "Peixe Hostil",
    miniDragao: "Mini Dragao",
    miniGuardiao: "Mini Guardiao",
    reiSlime: "Rei Slime",
    aranhaRainha: "Aranha Rainha",
    golemAncestral: "Golem Ancestral",
    bruxoSombrio: "Bruxo Sombrio",
    serpenteLago: "Serpente do Lago",
    guardiao: "Guardiao das Ruinas",
    slime: "Slime",
    golem: "Golem de Pedra",
    mago: "Mago Sombrio"
  };
  return names[kind] || kind;
}

function drawMiniMap() {
  miniCtx.clearRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);
  miniCtx.fillStyle = "rgba(39, 48, 82, 0.95)";
  miniCtx.fillRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);

  if (currentScene === "crystalDimension") {
    const sx = miniMapCanvas.width / CRYSTAL_WIDTH;
    const sy = miniMapCanvas.height / CRYSTAL_HEIGHT;

    miniCtx.fillStyle = "#2a1a52";
    miniCtx.fillRect(0, 0, miniMapCanvas.width, miniMapCanvas.height);

    miniCtx.fillStyle = "#3341aa";
    for (let y = 0; y < CRYSTAL_ROWS; y++) {
      for (let x = 0; x < CRYSTAL_COLS; x++) {
        if (crystalDimensionMap[y][x] === "M") {
          miniCtx.fillRect(x * TILE * sx, y * TILE * sy, Math.ceil(TILE * sx), Math.ceil(TILE * sy));
        }
      }
    }

    miniCtx.fillStyle = "#55e8ff";
    for (const obj of crystalDimensionObjects) {
      if (obj.type === "dimensionPortal" || obj.type === "dimensionCrystal") {
        miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 5, 5);
      }
    }

    miniCtx.fillStyle = "#fff264";
    for (const obj of crystalDimensionObjects) {
      if (obj.type === "npc" || obj.type === "dimensionChest") {
        miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 5, 5);
      }
    }

    miniCtx.fillStyle = "#d24c63";
    miniCtx.fillRect(player.x * sx - 3, player.y * sy - 3, 7, 7);
    return;
  }

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

  miniCtx.fillStyle = "#ff4f62";
  for (const obj of villageObjects) {
    if (obj.type === "enemy" && obj.boss && obj.alive) {
      miniCtx.fillRect(obj.x * sx - 2, obj.y * sy - 2, 6, 6);
    }
  }

  miniCtx.fillStyle = "#d24c63";
  miniCtx.fillRect(player.x * sx - 3, player.y * sy - 3, 7, 7);
}

function saveGame() {
  syncDimensionQuestState();
  normalizeLevelState();
  const save = {
    scene: currentScene,
    player: {
      name: getPlayerDisplayName(),
      x: player.x,
      y: player.y,
      level: player.level,
      xp: player.xp,
      xpToNextLevel: player.xpToNextLevel,
      maxLevel: player.maxLevel,
      totalXp: player.totalXp,
      skillPoints: player.skillPoints,
      damageBonus: player.damageBonus,
      speed: player.speed,
      baseSpeed: player.baseSpeed,
      defense: player.defense,
      health: player.health,
      maxHealth: player.maxHealth,
      mana: player.mana,
      maxMana: player.maxMana,
      oxygen: player.oxygen,
      maxOxygen: player.maxOxygen,
      isSwimming: player.isSwimming,
      spellCooldowns: { ...player.spellCooldowns },
      direction: player.direction,
      currentWeaponIndex,
      equippedPower,
      unlockedWeapons: [...player.unlockedWeapons]
    },
    inventory: { ...inventory },
    quest: { ...quest },
    questBook: { ...questBook },
    unlockedPowers: { fireball: true, dash: true, shockwave: true, heal: true },
    activePowerUps: { ...activePowerUps },
    dimensionQuest: { ...dimensionQuest },
    dimensionCrystals: crystalDimensionObjects
      .filter((obj) => obj.type === "dimensionCrystal" && obj.activated)
      .map((obj) => obj.crystalIndex),
    powerUpsCollected: powerUps
      .filter((obj) => obj.collected)
      .map(getSaveObjectKey),
    collected: villageObjects
      .filter((obj) => (obj.type === "collectible" || obj.type === "crystal") && obj.collected)
      .map(getSaveObjectKey),
    enemies: villageObjects
      .filter((obj) => obj.type === "enemy")
      .map((obj) => ({ key: getSaveObjectKey(obj), alive: obj.alive, hp: obj.hp, phase: obj.phase })),
    lootItems: lootItems
      .filter((obj) => !obj.collected)
      .map((obj) => ({
        kind: obj.kind,
        itemName: obj.itemName,
        amount: obj.amount,
        x: obj.x,
        y: obj.y
      }))
  };

  if (!writeSaveRaw(JSON.stringify(save))) return;
  startMessage.textContent = "Jogo salvo!";
  showHudToast("Jogo salvo!");
  saveNoticeTimer = 2;
}

function loadGame() {
  const raw = readSaveRaw();
  if (!raw) return false;

  try {
    const save = JSON.parse(raw);
    Object.assign(inventory, save.inventory || {});
    Object.assign(quest, save.quest || {});
    Object.assign(questBook, save.questBook || {});
    Object.assign(dimensionQuest, save.dimensionQuest || {});
    Object.assign(activePowerUps, save.activePowerUps || {});
    currentWeaponIndex = save.player?.currentWeaponIndex ?? 0;
    equippedPower = save.player?.equippedPower || "fireball";
    player.unlockedWeapons = save.player?.unlockedWeapons || player.unlockedWeapons;
    player.name = sanitizePlayerName(save.player?.name, FALLBACK_PLAYER_NAME);
    player.level = save.player?.level ?? 1;
    player.xp = save.player?.xp ?? 0;
    player.xpToNextLevel = save.player?.xpToNextLevel ?? getXpToNextLevel(player.level);
    player.maxLevel = save.player?.maxLevel ?? PLAYER_MAX_LEVEL;
    player.totalXp = save.player?.totalXp ?? 0;
    player.skillPoints = save.player?.skillPoints ?? 0;
    player.damageBonus = save.player?.damageBonus ?? 0;
    player.defense = save.player?.defense ?? 0;
    player.baseSpeed = save.player?.baseSpeed ?? 150;
    player.speed = save.player?.speed ?? player.baseSpeed;

    const collected = new Set(save.collected || []);
    const powerUpsCollected = new Set(save.powerUpsCollected || []);
    const enemies = new Map((save.enemies || []).map((entry) => [entry.key, entry]));
    for (const obj of villageObjects) {
      if (obj.type === "collectible" || obj.type === "crystal") {
        obj.collected = collected.has(getSaveObjectKey(obj));
      }
      if (obj.type === "enemy") {
        const savedEnemy = enemies.get(getSaveObjectKey(obj));
        obj.alive = savedEnemy ? savedEnemy.alive : true;
        obj.hp = savedEnemy ? savedEnemy.hp : obj.maxHp;
        obj.phase = savedEnemy?.phase || 1;
      }
    }

    lootItems.length = 0;
    for (const obj of save.lootItems || []) {
      if (!Number.isFinite(obj.x) || !Number.isFinite(obj.y)) continue;
      lootItems.push(lootItem(obj.x, obj.y, obj.kind || "moeda", obj.amount || 1, obj.itemName || ""));
    }

    for (const obj of powerUps) {
      obj.collected = powerUpsCollected.has(getSaveObjectKey(obj));
    }

    const dimensionCrystals = new Set(save.dimensionCrystals || []);
    for (const obj of crystalDimensionObjects) {
      if (obj.type === "dimensionCrystal") {
        obj.activated = dimensionCrystals.has(obj.crystalIndex);
        obj.activatedAt = obj.activated ? performance.now() - 1000 : 0;
      }
      if (obj.type === "dimensionChest") {
        obj.opened = Boolean(dimensionQuest.chestOpened);
      }
    }
    syncDimensionQuestState();

    const savedScene = ["village", "home", "shopInterior", "mayorInterior", "crystalDimension"].includes(save.scene) ?
      save.scene : "village";
    setActiveScene(savedScene);
    if (savedScene === "crystalDimension") dimensionQuest.entered = true;
    player.x = save.player?.x ?? player.startX;
    player.y = save.player?.y ?? player.startY;
    player.maxHealth = save.player?.maxHealth ?? 5;
    player.health = save.player?.health ?? player.maxHealth;
    player.maxMana = save.player?.maxMana ?? 6;
    player.mana = save.player?.mana ?? player.maxMana;
    player.maxOxygen = save.player?.maxOxygen ?? 10;
    player.oxygen = save.player?.oxygen ?? player.maxOxygen;
    player.isSwimming = Boolean(save.player?.isSwimming);
    Object.assign(player.spellCooldowns, save.player?.spellCooldowns || {});
    player.direction = save.player?.direction || "down";
    normalizeRuntimeState();
    if (characterNameInput) characterNameInput.value = getPlayerDisplayName();
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
  if (obj.type === "enemy") {
    return `${obj.type}:${obj.kind}:${Math.round(obj.spawnX ?? obj.x)}:${Math.round(obj.spawnY ?? obj.y)}`;
  }

  return `${obj.type}:${obj.item || obj.kind || "item"}:${Math.round(obj.x)}:${Math.round(obj.y)}`;
}

function resetProgressForNewGame(name) {
  closeOverlayPanels();
  closeDialog();
  closeShop();
  inventoryOpen = false;
  inventoryPanel?.classList.add("hidden");
  gameOver = false;
  gameOverScreen.classList.add("hidden");
  gameStarted = false;

  Object.assign(inventory, {
    cristais: 0,
    chaves: 0,
    pocoes: 1,
    moedas: 8,
    espadas: 0,
    cartas: 0,
    fragmentos: 0,
    flechas: 12,
    chavesRaras: 0,
    manaOrbes: 0,
    itensBoss: []
  });

  Object.assign(quest, {
    status: "notStarted",
    collected: 0,
    total: 3,
    reward: "Amuleto da Vila"
  });

  Object.assign(questBook, {
    keyFound: false,
    forestMonstersDefeated: 0,
    forestMonstersGoal: 3,
    letterPicked: false,
    letterDelivered: false,
    bossDefeated: false,
    bossChestOpened: false,
    defeatedBosses: {},
    openedChests: {},
    discoveredAreas: {}
  });

  Object.assign(dimensionQuest, {
    entered: false,
    status: "notStarted",
    activatedCrystals: 0,
    totalCrystals: 3,
    bridgeOpen: false,
    chestOpened: false,
    missionDone: false
  });

  for (const key of Object.keys(activePowerUps)) activePowerUps[key] = 0;
  lootItems.length = 0;
  projectiles.length = 0;
  enemyProjectiles.length = 0;
  floatingTexts.length = 0;
  shockwaves.length = 0;
  dashTrails.length = 0;
  healBursts.length = 0;
  hazardZones.length = 0;

  for (const obj of villageObjects) {
    if (obj.type === "collectible" || obj.type === "crystal") obj.collected = false;
    if (obj.type === "enemy") {
      obj.alive = true;
      obj.hp = obj.maxHp;
      obj.phase = 1;
      obj.x = obj.spawnX ?? obj.x;
      obj.y = obj.spawnY ?? obj.y;
      normalizeEnemy(obj);
    }
  }

  for (const obj of crystalDimensionObjects) {
    if (obj.type === "dimensionCrystal") {
      obj.activated = false;
      obj.activatedAt = 0;
    }
    if (obj.type === "dimensionChest") obj.opened = false;
  }

  for (const obj of powerUps) obj.collected = false;

  Object.assign(player, {
    name: sanitizePlayerName(name, DEFAULT_NEW_PLAYER_NAME),
    x: player.startX,
    y: player.startY,
    speed: 150,
    baseSpeed: 150,
    maxHealth: 5,
    health: 5,
    defense: 0,
    critChance: 0.12,
    level: 1,
    xp: 0,
    xpToNextLevel: getXpToNextLevel(1),
    maxLevel: PLAYER_MAX_LEVEL,
    totalXp: 0,
    skillPoints: 0,
    damageBonus: 0,
    levelGlowTimer: 0,
    maxMana: 6,
    mana: 6,
    maxOxygen: 10,
    oxygen: 10,
    isSwimming: false,
    direction: "down",
    moving: false,
    frame: 0,
    animTimer: 0
  });
  Object.assign(player.spellCooldowns, { fireball: 0, blueRay: 0, dash: 0, shockwave: 0, heal: 0 });
  player.unlockedWeapons = ["sword", "bow", "staff", "spear"];
  currentWeaponIndex = 0;
  equippedPower = "fireball";
  lastVillagePosition = { x: player.startX, y: player.startY };
  playerInvulnerableTimer = 0;
  playerKnockbackX = 0;
  playerKnockbackY = 0;
  damageCooldown = 0;
  weaponCooldownTimer = 0;
  dodgeCooldownTimer = 0;
  hitstopTimer = 0;

  setActiveScene("village");
  normalizeRuntimeState();
  if (characterNameInput) characterNameInput.value = getPlayerDisplayName();
  updateHud();
  updateQuestProgress();
  renderInventory();
}

function startNewGame() {
  ensureAudio();
  startMusic();
  updateDeviceMode();
  setPause(false);
  const chosenName = getNameFromInput();
  if (readSaveRaw()) {
    const confirmed = window.confirm("Existe um save antigo. Comecar do zero e apagar o progresso salvo?");
    if (!confirmed) {
      startMessage.textContent = "Novo jogo cancelado. Use Continuar para carregar o save.";
      return;
    }
  }

  resetProgressForNewGame(chosenName);
  gameStarted = true;
  startScreen.classList.add("hidden");
  saveGame();
}

function startGame(loadSave = false) {
  ensureAudio();
  startMusic();
  updateDeviceMode();
  setPause(false);

  if (loadSave && !loadGame()) {
    startMessage.textContent = "Nenhum jogo salvo encontrado.";
    return;
  }

  normalizeRuntimeState();
  if (!loadSave) setPlayerName(getNameFromInput(), DEFAULT_NEW_PLAYER_NAME);
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

function showErrorMessage(error) {
  const message = error instanceof Error ? error.message : String(error);
  if (message === lastErrorMessage) return;

  lastErrorMessage = message;
  console.error("Erro no jogo:", error);
  showInfo("Erro no jogo", `Algo deu errado, mas a tela nao vai ficar preta. Detalhe: ${message}`);
}

function updateDebugPanel(delta) {
  if (!debugEnabled || !debugPanel) return;

  fpsFrameCount += 1;
  fpsTimer += delta;
  if (fpsTimer >= 0.5) {
    fpsEstimate = Math.round(fpsFrameCount / fpsTimer);
    fpsFrameCount = 0;
    fpsTimer = 0;
  }

  debugPanel.innerHTML = [
    `Tela: ${window.innerWidth}x${window.innerHeight}`,
    `Canvas: ${canvas.width}x${canvas.height}`,
    `FPS: ${fpsEstimate || "--"}`,
    `isMobile: ${isMobile}`,
    `Cena: ${currentScene}`,
    `X/Y: ${Math.round(player.x)} / ${Math.round(player.y)}`,
    `Erro: ${lastErrorMessage || "nenhum"}`,
    `Joystick: ${joystick.active ? "ativo" : "parado"} ${joystick.strength.toFixed(2)}`,
    `Botao: ${pressedMobileButton || "nenhum"}`
  ].join("<br>");
}

function ensureAudio() {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  } catch (error) {
    audioContext = null;
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
  if (!audioContext) return;
  if (name === "coin") {
    playTone(880, 0.08, "square", 0.09);
    setTimeout(() => playTone(1320, 0.08, "square", 0.07), 70);
  } else if (name === "npc") {
    playTone(360, 0.08, "triangle", 0.07);
    setTimeout(() => playTone(430, 0.08, "triangle", 0.06), 80);
  } else if (name === "dialog") {
    playTone(620, 0.06, "sine", 0.06);
  } else if (name === "inventoryOpen") {
    playTone(260, 0.06, "square", 0.05);
    setTimeout(() => playTone(520, 0.08, "triangle", 0.05), 55);
  } else if (name === "inventoryClose") {
    playTone(420, 0.05, "triangle", 0.04);
    setTimeout(() => playTone(220, 0.07, "square", 0.035), 55);
  } else if (name === "selectItem") {
    playTone(680, 0.04, "square", 0.035);
  } else if (name === "usePotion") {
    playTone(540, 0.08, "triangle", 0.06);
    setTimeout(() => playTone(760, 0.08, "triangle", 0.05), 70);
  } else if (name === "equipItem") {
    playTone(480, 0.05, "square", 0.05);
    setTimeout(() => playTone(720, 0.06, "square", 0.04), 55);
  } else if (name === "levelUp") {
    playTone(520, 0.08, "triangle", 0.07);
    setTimeout(() => playTone(780, 0.09, "triangle", 0.065), 80);
    setTimeout(() => playTone(1040, 0.12, "sine", 0.06), 170);
  } else if (name === "invalid") {
    playTone(110, 0.09, "sawtooth", 0.045);
  } else if (name === "hit") {
    playTone(150, 0.12, "sawtooth", 0.08);
  } else if (name === "portal") {
    playTone(220, 0.12, "sine", 0.08);
    setTimeout(() => playTone(440, 0.12, "triangle", 0.07), 90);
    setTimeout(() => playTone(880, 0.16, "sine", 0.06), 180);
  } else if (name === "crystal") {
    playTone(760, 0.08, "triangle", 0.08);
    setTimeout(() => playTone(1140, 0.1, "sine", 0.06), 75);
  } else if (name === "chest") {
    playTone(520, 0.08, "square", 0.08);
    setTimeout(() => playTone(740, 0.08, "square", 0.07), 80);
    setTimeout(() => playTone(980, 0.13, "triangle", 0.07), 160);
  } else if (name === "mission") {
    playTone(330, 0.08, "triangle", 0.06);
    setTimeout(() => playTone(660, 0.08, "triangle", 0.06), 90);
    setTimeout(() => playTone(990, 0.12, "triangle", 0.06), 180);
  } else if (name === "attack") {
    playTone(260, 0.05, "sawtooth", 0.05);
    setTimeout(() => playTone(180, 0.05, "sawtooth", 0.04), 55);
  } else if (name === "hitEnemy") {
    playTone(170, 0.08, "square", 0.06);
    setTimeout(() => playTone(110, 0.06, "square", 0.05), 55);
  } else if (name === "playerHit") {
    playTone(120, 0.12, "sawtooth", 0.08);
  } else if (name === "powerup") {
    playTone(680, 0.08, "triangle", 0.08);
    setTimeout(() => playTone(1020, 0.11, "triangle", 0.07), 70);
  } else if (name === "magic") {
    playTone(420, 0.08, "sine", 0.07);
    setTimeout(() => playTone(840, 0.08, "triangle", 0.06), 70);
  } else if (name === "dash") {
    playTone(520, 0.06, "sawtooth", 0.06);
    setTimeout(() => playTone(260, 0.05, "sawtooth", 0.05), 45);
  } else if (name === "shockwave") {
    playTone(96, 0.14, "sine", 0.09);
    setTimeout(() => playTone(192, 0.12, "sine", 0.07), 90);
  } else if (name === "heal") {
    playTone(540, 0.08, "triangle", 0.06);
    setTimeout(() => playTone(720, 0.08, "triangle", 0.06), 80);
  } else if (name === "enemyMagic") {
    playTone(300, 0.08, "triangle", 0.05);
    setTimeout(() => playTone(240, 0.08, "triangle", 0.04), 70);
  } else if (name === "enemyDown") {
    playTone(330, 0.08, "square", 0.07);
    setTimeout(() => playTone(520, 0.1, "square", 0.06), 80);
  } else if (name === "bossDown") {
    playTone(180, 0.12, "sawtooth", 0.09);
    setTimeout(() => playTone(360, 0.12, "triangle", 0.08), 110);
    setTimeout(() => playTone(720, 0.18, "triangle", 0.07), 230);
  } else if (name === "weaponSwap") {
    playTone(420, 0.05, "square", 0.05);
    setTimeout(() => playTone(640, 0.06, "square", 0.04), 55);
  } else if (name === "bow") {
    playTone(220, 0.04, "triangle", 0.045);
    setTimeout(() => playTone(160, 0.05, "triangle", 0.035), 45);
  } else if (name === "water") {
    playTone(180, 0.06, "sine", 0.025);
    setTimeout(() => playTone(240, 0.05, "sine", 0.02), 40);
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

function toggleInventory(force) {
  const nextOpen = typeof force === "boolean" ? force : !inventoryOpen;
  if (inventoryOpen === nextOpen) return;

  inventoryOpen = nextOpen;
  inventoryPanel?.classList.toggle("hidden", !inventoryOpen);

  if (inventoryOpen) {
    closeOverlayPanels();
    closeShop();
    setPause(false);
    keys.clear();
    playSound("inventoryOpen");
    renderInventory();
  } else {
    playSound("inventoryClose");
  }
}

function getInventoryItems() {
  const items = [];
  const addItem = (item) => {
    if (!item || item.quantity <= 0) return;
    items.push({
      rarity: "comum",
      typeLabel: "Item",
      effect: "",
      action: "",
      ...item
    });
  };

  addItem({
    id: "moedas",
    name: "Moedas",
    icon: "$",
    quantity: Number(inventory.moedas || 0),
    category: "materiais",
    typeLabel: "Dinheiro",
    rarity: "comum",
    description: "Usadas para comprar pocoes e recompensas na vila.",
    effect: "Loja: 5 moedas compram 1 pocao."
  });
  addItem({
    id: "pocoes",
    name: "Pocoes",
    icon: "P",
    quantity: Number(inventory.pocoes || 0),
    category: "consumiveis",
    typeLabel: "Consumivel",
    rarity: "comum",
    description: "Frasco vermelho para recuperar vida durante a aventura.",
    effect: "Recupera 1 coracao.",
    action: "usePotion"
  });
  addItem({
    id: "cristais",
    name: "Cristais",
    icon: "C",
    quantity: Number(inventory.cristais || 0),
    category: "missao",
    typeLabel: "Missao",
    rarity: "incomum",
    description: "Cristais brilhantes pedidos por Nico.",
    effect: "Leve 3 cristais para concluir a primeira missao.",
    locked: true
  });
  addItem({
    id: "chaves",
    name: "Chaves",
    icon: "K",
    quantity: Number(inventory.chaves || 0),
    category: "missao",
    typeLabel: "Missao",
    rarity: "incomum",
    description: "Chaves perdidas encontradas pela vila.",
    effect: "Podem abrir caminhos e completar missoes.",
    locked: true
  });
  addItem({
    id: "cartas",
    name: "Cartas",
    icon: "L",
    quantity: Number(inventory.cartas || 0),
    category: "missao",
    typeLabel: "Entrega",
    rarity: "comum",
    description: "Carta que precisa chegar ao morador certo.",
    effect: "Entregue para concluir a missao da carta.",
    locked: true
  });
  addItem({
    id: "espadas-extra",
    name: "Espadas extras",
    icon: "S",
    quantity: Number(inventory.espadas || 0),
    category: "armas",
    typeLabel: "Arma rara",
    rarity: "raro",
    description: "Espadas especiais obtidas em recompensa.",
    effect: "Cada espada extra aumenta o dano fisico em +1.",
    locked: true
  });
  addItem({
    id: "flechas",
    name: "Flechas",
    icon: "A",
    quantity: Number(inventory.flechas || 0),
    category: "materiais",
    typeLabel: "Municao",
    rarity: "comum",
    description: "Municao usada pelo arco.",
    effect: "O arco consome 1 flecha por disparo."
  });
  addItem({
    id: "fragmentos",
    name: "Fragmentos",
    icon: "F",
    quantity: Number(inventory.fragmentos || 0),
    category: "materiais",
    typeLabel: "Material",
    rarity: "raro",
    description: "Pedacos brilhantes deixados por monstros fortes.",
    effect: "Material raro para futuras melhorias.",
    locked: true
  });
  addItem({
    id: "mana-orbes",
    name: "Orbes de mana",
    icon: "M",
    quantity: Number(inventory.manaOrbes || 0),
    category: "consumiveis",
    typeLabel: "Energia",
    rarity: "incomum",
    description: "Orbes roxos cheios de magia.",
    effect: "Recarregam mana quando coletados pelo mapa.",
    locked: true
  });
  addItem({
    id: "chaves-raras",
    name: "Chaves raras",
    icon: "R",
    quantity: Number(inventory.chavesRaras || 0),
    category: "raros",
    typeLabel: "Raro",
    rarity: "epico",
    description: "Chaves antigas carregadas de energia.",
    effect: "Guardam segredos de baus especiais.",
    locked: true
  });

  const collectedPowerUps = typeof powerUps !== "undefined" ? powerUps.filter((obj) => obj.collected).length : 0;
  addItem({
    id: "powerups-coletados",
    name: "Power-ups coletados",
    icon: "B",
    quantity: collectedPowerUps,
    category: "raros",
    typeLabel: "Registro",
    rarity: "incomum",
    description: "Total de power-ups temporarios ja encontrados.",
    effect: "Velocidade, forca, escudo, regeneracao e respiracao aquatica.",
    locked: true
  });

  for (const [key, timeLeft] of Object.entries(activePowerUps)) {
    if (timeLeft <= 0) continue;
    addItem({
      id: `buff-${key}`,
      name: getPowerUpName(key),
      icon: "B",
      quantity: Math.ceil(timeLeft),
      category: "raros",
      typeLabel: "Buff ativo",
      rarity: "epico",
      description: "Power-up temporario ativo agora.",
      effect: `Tempo restante: ${Math.ceil(timeLeft)}s.`,
      locked: true
    });
  }

  for (const weaponKey of player.unlockedWeapons || []) {
    const weapon = weapons[weaponKey] || weapons.sword;
    const rarity = weaponKey === "sword" ? "comum" : weaponKey === "bow" ? "incomum" : weaponKey === "staff" ? "raro" : "epico";
    addItem({
      id: `weapon-${weaponKey}`,
      name: weapon.name,
      icon: weaponKey === "bow" ? "A" : weaponKey === "staff" ? "W" : weaponKey === "spear" ? "L" : "S",
      quantity: 1,
      category: "armas",
      typeLabel: "Arma",
      rarity,
      description: getWeaponDescription(weaponKey),
      effect: `Dano ${weapon.damage} | Alcance ${weapon.range}`,
      action: "equipWeapon",
      weaponKey
    });
  }

  for (const powerKey of powerSlots) {
    addItem({
      id: `power-${powerKey}`,
      name: powerNames[powerKey] || "Poder",
      icon: "Q",
      quantity: 1,
      category: "raros",
      typeLabel: "Poder",
      rarity: powerKey === "heal" ? "incomum" : powerKey === "shockwave" ? "epico" : "raro",
      description: getPowerDescription(powerKey),
      effect: `Custo de mana: ${spellCosts[powerKey] || 0}`,
      action: "equipPower",
      powerKey
    });
  }

  if (quest.status === "done") {
    addItem({
      id: "amuleto-vila",
      name: quest.reward || "Amuleto da Vila",
      icon: "O",
      quantity: 1,
      category: "raros",
      typeLabel: "Amuleto",
      rarity: "lendario",
      description: "Recompensa por ajudar Nico com os cristais.",
      effect: "Simbolo de amizade com a vila.",
      locked: true
    });
  }

  (inventory.itensBoss || []).forEach((itemName, index) => {
    addItem({
      id: `boss-${index}-${String(itemName).replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
      name: itemName || "Item misterioso",
      icon: "X",
      quantity: 1,
      category: "raros",
      typeLabel: "Boss",
      rarity: "lendario",
      description: "Trofeu raro deixado por um chefe derrotado.",
      effect: "Item especial guardado na bolsa.",
      locked: true
    });
  });

  return items;
}

function getWeaponDescription(weaponKey) {
  if (weaponKey === "bow") return "Arma de longo alcance que consome flechas.";
  if (weaponKey === "staff") return "Cajado magico que dispara energia azul.";
  if (weaponKey === "spear") return "Lanca com ataque frontal mais comprido.";
  return "Espada confiavel para combate de perto.";
}

function getPowerDescription(powerKey) {
  if (powerKey === "blueRay") return "Disparo magico rapido para acertar inimigos a distancia.";
  if (powerKey === "shockwave") return "Onda de choque que empurra e fere inimigos ao redor.";
  if (powerKey === "heal") return "Magia de cura para recuperar vida usando mana.";
  return "Bola de fogo para causar dano magico.";
}

function getFilteredInventoryItems(items) {
  if (inventoryTab === "all") return items;
  if (inventoryTab === "raros") return items.filter((item) => item.category === "raros" || ["raro", "epico", "lendario"].includes(item.rarity));
  return items.filter((item) => item.category === inventoryTab);
}

function getInventoryItemById(itemId) {
  return getInventoryItems().find((item) => item.id === itemId) || null;
}

function formatRarity(rarity) {
  if (rarity === "incomum") return "Incomum";
  if (rarity === "raro") return "Raro";
  if (rarity === "epico") return "Epico";
  if (rarity === "lendario") return "Lendario";
  return "Comum";
}

function renderInventory() {
  const items = getInventoryItems();
  const filteredItems = getFilteredInventoryItems(items);
  const selectedExists = filteredItems.some((item) => item.id === selectedInventoryItemId);
  if (!selectedExists) selectedInventoryItemId = filteredItems[0]?.id || "";

  renderInventoryTabs();
  renderInventoryGrid(filteredItems, items.length);
  renderEquipmentSlots();
  renderItemDetails(getInventoryItemById(selectedInventoryItemId));

  if (inventoryList) {
    inventoryList.innerHTML = items.map((item) => `<li>${item.name}: <strong>${item.quantity}</strong></li>`).join("");
  }
}

function renderInventoryTabs() {
  if (!inventoryTabs) return;
  for (const button of inventoryTabs.querySelectorAll("[data-inventory-tab]")) {
    button.classList.toggle("is-active", button.dataset.inventoryTab === inventoryTab);
  }
}

function renderInventoryGrid(filteredItems, totalItems) {
  if (!inventoryGrid) return;

  const slotCount = Math.max(30, filteredItems.length);
  const slots = [];
  for (let index = 0; index < slotCount; index += 1) {
    const item = filteredItems[index];
    if (!item) {
      slots.push(`<button class="inventory-slot is-empty" type="button" disabled aria-label="Slot vazio"></button>`);
      continue;
    }

    const equipped = (item.weaponKey && item.weaponKey === getCurrentWeaponKey()) ||
      (item.powerKey && item.powerKey === equippedPower);
    slots.push(`
      <button class="inventory-slot rarity-${item.rarity}${selectedInventoryItemId === item.id ? " is-selected" : ""}${equipped ? " is-equipped" : ""}" type="button" data-item-id="${item.id}">
        <span class="item-icon">${item.icon || "?"}</span>
        <span class="item-qty">${item.quantity > 1 ? item.quantity : ""}</span>
      </button>
    `);
  }

  inventoryGrid.innerHTML = slots.join("");
  if (inventoryEmpty) {
    inventoryEmpty.textContent = totalItems ? "Nada nesta aba." : "Sua bolsa esta vazia.";
    inventoryEmpty.classList.toggle("hidden", filteredItems.length > 0);
  }
}

function renderEquipmentSlots() {
  if (!equipmentSlots) return;

  const bossItem = inventory.itensBoss?.[0] || "Vazio";
  const slots = [
    ["Arma", getCurrentWeapon().name],
    ["Poder Q", powerNames[equippedPower] || "Nenhum"],
    ["Amuleto", quest.status === "done" ? (quest.reward || "Amuleto da Vila") : "Vazio"],
    ["Especial", bossItem],
    ["Defesa", `${player.defense || 0}`]
  ];

  equipmentSlots.innerHTML = slots.map(([label, value]) => `
    <div class="equipment-slot">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function renderItemDetails(item) {
  if (!itemDetailName || !itemDetailMeta || !itemDetailDescription || !itemDetailEffect || !itemDetailActions) return;

  if (!item) {
    itemDetailName.textContent = "Bolsa vazia";
    itemDetailMeta.textContent = "Nenhum item selecionado.";
    itemDetailDescription.textContent = "Colete moedas, pocoes, cristais, chaves e armas pelo mapa.";
    itemDetailEffect.textContent = "";
    itemDetailActions.innerHTML = "";
    return;
  }

  itemDetailName.textContent = item.name;
  itemDetailMeta.textContent = `${item.typeLabel} | ${formatRarity(item.rarity)} | Qtd. ${item.quantity}`;
  itemDetailDescription.textContent = item.description || "Item desconhecido guardado com cuidado.";
  itemDetailEffect.textContent = item.effect || "";
  itemDetailActions.innerHTML = getInventoryActionHtml(item);
}

function getInventoryActionHtml(item) {
  if (item.action === "usePotion") {
    const disabled = player.health >= player.maxHealth ? " disabled" : "";
    const text = player.health >= player.maxHealth ? "Vida cheia" : "Usar pocao";
    return `<button type="button" data-inventory-action="usePotion"${disabled}>${text}</button>`;
  }

  if (item.action === "equipWeapon") {
    const isEquipped = item.weaponKey === getCurrentWeaponKey();
    return `<button type="button" data-inventory-action="equipWeapon" data-weapon-key="${item.weaponKey}">${isEquipped ? "Equipado" : "Equipar arma"}</button>`;
  }

  if (item.action === "equipPower") {
    const isEquipped = item.powerKey === equippedPower;
    return `<button type="button" data-inventory-action="equipPower" data-power-key="${item.powerKey}">${isEquipped ? "Equipado no Q" : "Equipar no Q"}</button>`;
  }

  if (item.locked || item.category === "missao") {
    return `<button type="button" disabled>Item de missao</button>`;
  }

  return `<button type="button" disabled>Sem acao</button>`;
}

function handleInventoryAction(actionButton) {
  const action = actionButton.dataset.inventoryAction;
  if (action === "usePotion") {
    usePotion();
  } else if (action === "equipWeapon") {
    equipWeapon(actionButton.dataset.weaponKey);
  } else if (action === "equipPower") {
    const slotIndex = powerSlots.indexOf(actionButton.dataset.powerKey);
    if (slotIndex === -1) {
      playSound("invalid");
      showHudToast("Poder desconhecido.");
    } else {
      equipPower(slotIndex);
      playSound("equipItem");
    }
  } else {
    playSound("invalid");
  }

  renderInventory();
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
  if (gameOver) return false;
  if (inventory.pocoes <= 0) {
    showHudToast("Voce nao tem pocoes.");
    playSound("invalid");
    return false;
  }
  if (player.health >= player.maxHealth) {
    showHudToast("Vida ja esta cheia.");
    playSound("invalid");
    return false;
  }

  inventory.pocoes -= 1;
  player.health = Math.min(player.maxHealth, player.health + 1);
  showHudToast("Pocao usada.");
  playSound("usePotion");
  renderInventory();
  updateHud();
  return true;
}

function takeDamage(amount, sourceX = player.x, sourceY = player.y) {
  if (gameOver || playerInvulnerableTimer > 0) return;

  const shieldBlock = activePowerUps.shield > 0 ? 1 : 0;
  const finalDamage = Math.max(0, amount - shieldBlock - (player.defense || 0));
  playerInvulnerableTimer = 0.9;
  playSound("playerHit");
  vibrate(finalDamage > 0 ? 45 : 16);

  if (finalDamage > 0) {
    player.health = Math.max(0, player.health - finalDamage);
    spawnFloatingText(`-${finalDamage}`, player.x + 12, player.y - 12, "#ff4f62");
  } else {
    spawnFloatingText("Bloqueou!", player.x + 12, player.y - 12, "#fff264");
  }

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const dx = centerX - sourceX;
  const dy = centerY - sourceY;
  const length = Math.hypot(dx, dy) || 1;
  playerKnockbackX = (dx / length) * 160;
  playerKnockbackY = (dy / length) * 160;
  updateHud();
  if (player.health <= 0) {
    gameOver = true;
    gameOverScreen.classList.remove("hidden");
  }
}

function triggerAttack() {
  triggerPrimaryAttack();
}

function triggerPrimaryAttack() {
  if (gameOver || dialogOpen || inventoryOpen || shopOpen || pauseOpen || currentScene !== "village") return;
  if (weaponCooldownTimer > 0 || attackWindupTimer > 0 || attackRecoveryTimer > 0 || attackTimer > 0) return;

  updateDirectionFromAim();
  const weapon = getCurrentWeapon();
  const aim = getAimVector();
  const swimPenalty = player.isSwimming && weapon.kind !== "projectile" ? 1.35 : 1;
  weaponCooldownTimer = weapon.cooldown * swimPenalty;

  if (weapon.kind === "projectile") {
    fireWeaponProjectile(weapon, aim);
    return;
  }

  attackDirection = player.direction;
  attackWindupTimer = weapon.kind === "line" ? 0.12 * swimPenalty : 0.09 * swimPenalty;
  attackRecoveryTimer = weapon.cooldown * swimPenalty;
  attackTimer = weapon.cooldown * swimPenalty;
  attackHitDone = false;
  currentMeleeAttack = {
    weaponKey: getCurrentWeaponKey(),
    angle: aim.angle,
    range: isMobile ? weapon.range + 16 : weapon.range,
    arc: isMobile ? Math.min(Math.PI * 0.95, weapon.arc * 1.22) : weapon.arc,
    timer: attackTimer,
    maxTimer: attackTimer
  };
  playSound("attack");
  vibrate(18);
}

function fireWeaponProjectile(weapon, aim) {
  if (weapon.projectile === "arrow") {
    if (inventory.flechas <= 0) {
      weaponCooldownTimer = 0.12;
      spawnFloatingText("Sem flechas", player.x + 4, player.y - 16, "#fff264");
      return;
    }
    inventory.flechas -= 1;
    renderInventory();
    updateHud();
  }

  if (weapon.projectile === "arrow" && player.isSwimming) {
    spawnFloatingText("Flecha lenta na agua", player.x + 8, player.y - 16, "#55e8ff");
  }

  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const waterSlow = player.isSwimming && weapon.projectile === "arrow" ? 0.48 : 1;
  spawnPlayerProjectile({
    type: weapon.projectile,
    x: centerX - 5,
    y: centerY - 5,
    width: weapon.projectile === "arrow" ? 14 : 11,
    height: weapon.projectile === "arrow" ? 5 : 11,
    vx: aim.x * weapon.projectileSpeed * waterSlow,
    vy: aim.y * weapon.projectileSpeed * waterSlow,
    damage: weapon.damage,
    damageType: weapon.damageType,
    distance: 0,
    maxDistance: weapon.range
  });
  playSound(weapon.projectile === "arrow" ? "bow" : "magic");
}

function updateAttack(delta) {
  weaponCooldownTimer = Math.max(0, weaponCooldownTimer - delta);
  dodgeCooldownTimer = Math.max(0, dodgeCooldownTimer - delta);

  if (attackWindupTimer > 0) {
    attackWindupTimer = Math.max(0, attackWindupTimer - delta);
    if (attackWindupTimer <= 0 && !attackHitDone) {
      resolveBasicAttack();
      attackHitDone = true;
    }
  }

  if (attackWindupTimer <= 0 && attackRecoveryTimer > 0) {
    attackRecoveryTimer = Math.max(0, attackRecoveryTimer - delta);
  }

  attackTimer = Math.max(0, attackTimer - delta);
  if (currentMeleeAttack) {
    currentMeleeAttack.timer = Math.max(0, currentMeleeAttack.timer - delta);
    if (currentMeleeAttack.timer <= 0) currentMeleeAttack = null;
  }
}

function resolveBasicAttack() {
  if (!currentMeleeAttack) return;
  let hit = false;

  for (const obj of villageObjects) {
    if (obj.type !== "enemy" || !obj.alive || !enemyInMeleeArc(obj, currentMeleeAttack)) continue;
    const damage = getBasicAttackDamage(currentMeleeAttack.weaponKey);
    const weapon = weapons[currentMeleeAttack.weaponKey] || weapons.sword;
    if (damageEnemy(obj, damage, player.x + player.width / 2, player.y + player.height / 2, 190, weapon.damageType)) {
      hit = true;
    }
  }

  if (hit) playSound("hitEnemy");
}

function enemyInMeleeArc(enemyObj, attack) {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const enemyX = enemyObj.x + enemyObj.width / 2;
  const enemyY = enemyObj.y + enemyObj.height / 2;
  const dx = enemyX - centerX;
  const dy = enemyY - centerY;
  const distance = Math.hypot(dx, dy);
  if (distance > attack.range + Math.max(enemyObj.width, enemyObj.height) / 2) return false;

  const angle = Math.atan2(dy, dx);
  const diff = Math.abs(angleDifference(angle, attack.angle));
  return diff <= attack.arc / 2;
}

function angleDifference(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function getBasicAttackDamage(weaponKey = getCurrentWeaponKey()) {
  const weapon = weapons[weaponKey] || weapons.sword;
  return weapon.damage + Math.floor(player.damageBonus || 0) + (inventory.espadas > 0 ? 1 : 0) + (activePowerUps.force > 0 ? 1 : 0);
}

function getAttackRect(direction = player.direction) {
  const centerX = player.x + player.width / 2;
  const centerY = player.y + player.height / 2;
  const forward = direction === "up" || direction === "down" ? 42 : 46;
  const side = direction === "up" || direction === "down" ? 32 : 30;

  if (direction === "left") return { x: centerX - forward, y: centerY - side / 2, width: forward, height: side };
  if (direction === "right") return { x: centerX, y: centerY - side / 2, width: forward, height: side };
  if (direction === "up") return { x: centerX - side / 2, y: centerY - forward, width: side, height: forward };
  return { x: centerX - side / 2, y: centerY, width: side, height: forward };
}

function updateInteractionHint() {
  const target = findInteraction();
  const hidden = !target || dialogOpen || shopOpen;
  interactionHint.classList.toggle("hidden", hidden);
  touchActionButton?.classList.toggle("is-context-ready", Boolean(target) && !dialogOpen && !shopOpen);
  if (hidden) {
    if (touchContextLabel) touchContextLabel.textContent = "...";
    return;
  }

  let label = "Interagir";
  if (target.type === "portal") {
    interactionHint.textContent = "Pressione E para entrar no portal";
    label = "Entrar";
  } else if (target.type === "dimensionPortal") {
    interactionHint.textContent = "Pressione E para voltar";
    label = "Entrar";
  } else if (target.type === "dimensionCrystal") {
    interactionHint.textContent = "Pressione E para ativar cristal";
    label = "Ativar";
  } else if (target.type === "dimensionChest" || target.type === "rareChest") {
    interactionHint.textContent = target.type === "rareChest" ? "Pressione E para abrir o bau raro" : "Pressione E para abrir o bau";
    label = "Abrir";
  } else if (target.type === "npc") {
    interactionHint.textContent = "Pressione E para conversar";
    label = target.role === "shopkeeper" ? "Comprar" : "Falar";
  } else {
    interactionHint.textContent = "Pressione E para interagir";
  }
  if (touchContextLabel) touchContextLabel.textContent = label;
}

function showDialogMessage(message) {
  if (!message) return;
  dialogText.textContent = message;
  dialogBox.classList.remove("hidden");
  dialogOpen = true;
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
    const specialSound = ["portal", "dimensionPortal", "dimensionCrystal", "dimensionChest"].includes(target.type);
    if (!specialSound) playSound(target.type === "npc" ? "npc" : "dialog");
    const message = getQuestMessage(target);
    updateQuestProgress();
    showDialogMessage(message);
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
  player.mana = player.maxMana;
  player.oxygen = player.maxOxygen;
  player.isSwimming = false;
  playerInvulnerableTimer = 0;
  playerKnockbackX = 0;
  playerKnockbackY = 0;
  projectiles.length = 0;
  enemyProjectiles.length = 0;
  hazardZones.length = 0;
  floatingTexts.length = 0;
  player.x = player.startX;
  player.y = player.startY;
  player.direction = "down";
  closeDialog();
}

function gameLoop(time) {
  const delta = Math.min((time - lastTime) / 1000, 0.05);
  lastTime = time;

  try {
    update(delta);
    draw();
  } catch (error) {
    showErrorMessage(error);
  }
  requestAnimationFrame(gameLoop);
}

window.addEventListener("error", (event) => {
  showErrorMessage(event.error || event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  showErrorMessage(event.reason || "Promessa rejeitada sem detalhe.");
});

function updateMouseAim(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  mouseAim.screenX = (event.clientX - rect.left) * scaleX;
  mouseAim.screenY = (event.clientY - rect.top) * scaleY;
  mouseAim.worldX = mouseAim.screenX + camera.x;
  mouseAim.worldY = mouseAim.screenY + camera.y;
  mouseAim.angle = Math.atan2(
    mouseAim.worldY - (player.y + player.height / 2),
    mouseAim.worldX - (player.x + player.width / 2)
  );
  mouseAim.active = true;
}

canvas.addEventListener("mousemove", updateMouseAim);

canvas.addEventListener("mousedown", (event) => {
  updateMouseAim(event);
  event.preventDefault();

  if (event.button === 0) {
    triggerPrimaryAttack();
  } else if (event.button === 2) {
    useEquippedPower();
  }
});

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse") return;
  event.preventDefault();
  selectMobileTargetFromPoint(event);
});

function selectMobileTargetFromPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const worldX = (event.clientX - rect.left) * scaleX + camera.x;
  const worldY = (event.clientY - rect.top) * scaleY + camera.y;
  const tapRect = { x: worldX - 18, y: worldY - 18, width: 36, height: 36 };

  const target = villageObjects.find((obj) => (
    obj.type === "enemy" &&
    obj.alive &&
    rectsOverlap(tapRect, obj)
  ));

  if (target) {
    mobileLockedTarget = target;
    currentAutoAimTarget = target;
    spawnFloatingText("Alvo", target.x + target.width / 2, target.y - 12, "#fff264");
    vibrate(10);
  }
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", "e", "i", "u", "q", "r", "f", "c", "m", "escape", "f3", " ", "tab", "1", "2", "3", "4"].includes(key)) {
    event.preventDefault();
  }

  if (key === "f3") {
    debugEnabled = !debugEnabled;
    debugPanel?.classList.toggle("hidden", !debugEnabled);
    mobileDebugButton?.classList.toggle("hidden", !debugEnabled);
    return;
  }

  if (key === "m") {
    toggleMissionsPanel();
    return;
  }

  if (key === "c") {
    toggleStatusPanel();
    return;
  }

  if (key === "escape") {
    if (inventoryOpen) {
      toggleInventory(false);
    } else if (missionsOpen || statusOpen) {
      closeOverlayPanels();
    } else {
      setPause(!pauseOpen);
    }
    return;
  }

  if (pauseOpen) {
    return;
  }

  if (["1", "2", "3", "4"].includes(key)) {
    equipPower(Number(key) - 1);
    return;
  }

  if (key === "tab") {
    cycleWeapon();
    return;
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
    dodgeDash();
    return;
  }

  if (key === "q") {
    useEquippedPower();
    return;
  }

  if (key === "r") {
    dash();
    return;
  }

  if (key === "f") {
    shockwave();
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
  setupJoystick();
  if (touchActionButton) touchActionButton.textContent = "E";

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

  const bindTouchAction = (button, action, name = "") => {
    if (!button) return;
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      try {
        button.setPointerCapture(event.pointerId);
      } catch (error) {
        // Alguns navegadores nao permitem captura em certos eventos sinteticos.
      }
      button.classList.add("is-pressed");
      setMobilePressedButton(name || button.id);
      action();
    });
    button.addEventListener("pointerup", (event) => {
      event.preventDefault();
      button.classList.remove("is-pressed");
      clearMobilePressedButton(name || button.id);
    });
    button.addEventListener("pointercancel", () => {
      button.classList.remove("is-pressed");
      clearMobilePressedButton(name || button.id);
    });
    button.addEventListener("lostpointercapture", () => {
      button.classList.remove("is-pressed");
      clearMobilePressedButton(name || button.id);
    });
  };

  bindTouchAction(touchActionButton, toggleInteraction, "interagir");
  bindTouchAction(touchAttackButton, triggerPrimaryAttack, "ataque");
  bindTouchAction(touchInventoryButton, toggleInventory, "inventario");
  bindTouchAction(touchPotionButton, usePotion, "pocao");
  bindTouchAction(touchFireballButton, () => {
    equipPower(0);
    useEquippedPower();
  }, "fogo");
  bindTouchAction(touchDashButton, dodgeDash, "dash");
  bindTouchAction(touchShockwaveButton, () => {
    equipPower(2);
    useEquippedPower();
  }, "onda");
  bindTouchAction(touchHealButton, () => {
    equipPower(3);
    useEquippedPower();
  }, "cura");
  bindTouchAction(touchPowerButton, useEquippedPower, "poder");
  bindTouchAction(touchWeaponButton, cycleWeapon, "arma");
  bindTouchAction(touchPower1Button, () => equipPower(0), "poder1");
  bindTouchAction(touchPower2Button, () => equipPower(1), "poder2");
  bindTouchAction(touchPower3Button, () => equipPower(2), "poder3");
  bindTouchAction(touchPower4Button, () => equipPower(3), "poder4");
  bindTouchAction(mobileFullscreenButton, requestGameFullscreen, "fullscreen");
  bindTouchAction(startFullscreenButton, requestGameFullscreen, "fullscreen");
  bindTouchAction(mobilePauseButton, () => setPause(true), "pausa");
  bindTouchAction(hudMenuButton, () => setPause(true), "menu");
  bindTouchAction(mobileDebugButton, () => {
    debugEnabled = !debugEnabled;
    debugPanel?.classList.toggle("hidden", !debugEnabled);
  }, "debug");
  bindTouchAction(dialogContinueButton, closeDialog, "dialogo");

  document.addEventListener("touchmove", (event) => {
    if (event.target.closest(".touch-controls")) {
      event.preventDefault();
    }
  }, { passive: false });
}

function setupJoystick() {
  if (!joystickBase || !joystickStick) return;

  joystickBase.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    joystick.active = true;
    joystick.pointerId = event.pointerId;
    const rect = joystickBase.getBoundingClientRect();
    joystick.centerX = rect.left + rect.width / 2;
    joystick.centerY = rect.top + rect.height / 2;
    try {
      joystickBase.setPointerCapture(event.pointerId);
    } catch (error) {
      // Captura nao e obrigatoria.
    }
    updateJoystick(event);
  });

  joystickBase.addEventListener("pointermove", (event) => {
    if (!joystick.active || event.pointerId !== joystick.pointerId) return;
    event.preventDefault();
    updateJoystick(event);
  });

  const release = (event) => {
    if (event.pointerId !== joystick.pointerId) return;
    event.preventDefault();
    resetJoystick();
  };

  joystickBase.addEventListener("pointerup", release);
  joystickBase.addEventListener("pointercancel", release);
  joystickBase.addEventListener("lostpointercapture", resetJoystick);
}

function updateJoystick(event) {
  const radius = joystickBase.getBoundingClientRect().width * 0.38;
  const dx = event.clientX - joystick.centerX;
  const dy = event.clientY - joystick.centerY;
  const distance = Math.hypot(dx, dy);
  const clamped = Math.min(distance, radius);
  const angle = Math.atan2(dy, dx);
  const stickX = Math.cos(angle) * clamped;
  const stickY = Math.sin(angle) * clamped;

  joystick.x = distance > 4 ? dx / Math.max(distance, 1) : 0;
  joystick.y = distance > 4 ? dy / Math.max(distance, 1) : 0;
  joystick.strength = clamp(distance / radius, 0, 1);
  joystickStick.style.transform = `translate(calc(-50% + ${stickX}px), calc(-50% + ${stickY}px))`;
}

function resetJoystick() {
  joystick.active = false;
  joystick.pointerId = null;
  joystick.x = 0;
  joystick.y = 0;
  joystick.strength = 0;
  if (joystickStick) joystickStick.style.transform = "translate(-50%, -50%)";
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
playButton.addEventListener("click", startNewGame);
continueButton.addEventListener("click", () => startGame(true));
howToButton.addEventListener("click", () => {
  showHowTo();
});
creditsButton.addEventListener("click", () => {
  showInfo(
    "Creditos",
    "Eternal Rift\n\nCriadores:\nGabryel Garcia\nVictor Ricardo Fonseca Baldin\n\nFeito em HTML, CSS e JavaScript com Canvas 2D."
  );
});
closeInfoButton.addEventListener("click", () => infoPanel.classList.add("hidden"));
hudMenuButton?.addEventListener("click", () => setPause(true));
pauseContinueButton?.addEventListener("click", () => setPause(false));
pauseSaveButton?.addEventListener("click", () => {
  saveGame();
  setPause(false);
});
pauseResetButton?.addEventListener("click", () => {
  resetPlayer();
  setPause(false);
});
pauseHowToButton?.addEventListener("click", () => {
  setPause(false);
  showHowTo();
});
pauseMissionsButton?.addEventListener("click", () => toggleMissionsPanel(true));
pauseStatusButton?.addEventListener("click", () => toggleStatusPanel(true));
pauseInventoryButton?.addEventListener("click", () => {
  setPause(false);
  if (!inventoryOpen) toggleInventory();
});
pauseMenuButton?.addEventListener("click", returnToStartMenu);
closeMissionsButton?.addEventListener("click", () => toggleMissionsPanel(false));
closeStatusButton?.addEventListener("click", () => toggleStatusPanel(false));
characterNameInput?.addEventListener("input", () => {
  if (characterNameInput.value.length > 16) {
    characterNameInput.value = characterNameInput.value.slice(0, 16);
  }
});
closeInventoryButton?.addEventListener("click", () => toggleInventory(false));
inventoryTabs?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-inventory-tab]");
  if (!button) return;
  inventoryTab = button.dataset.inventoryTab || "all";
  selectedInventoryItemId = "";
  playSound("selectItem");
  renderInventory();
});
inventoryGrid?.addEventListener("click", (event) => {
  const slot = event.target.closest("[data-item-id]");
  if (!slot) return;
  selectedInventoryItemId = slot.dataset.itemId || "";
  playSound("selectItem");
  renderInventory();
});
itemDetailActions?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-inventory-action]");
  if (!button || button.disabled) return;
  handleInventoryAction(button);
});
inventoryPanel?.addEventListener("pointerdown", (event) => {
  event.stopPropagation();
});
inventoryPanel?.addEventListener("touchmove", (event) => {
  event.stopPropagation();
}, { passive: true });

window.addEventListener("resize", updateDeviceMode);
window.addEventListener("orientationchange", () => setTimeout(updateDeviceMode, 250));
window.addEventListener("blur", () => {
  if (gameStarted && !gameOver && isMobile) setPause(true);
});

updateDeviceMode();
setupTouchControls();
requestAnimationFrame(gameLoop);

if (shouldAutoStart) {
  setTimeout(() => startGame(false), 120);
}
