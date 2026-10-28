// extra: { image, kind: "cover" | "logo", bg }
const mk = (id, type, game, name, price, old, rarity, emoji, extra = {}) =>
  ({ id, type, game, name, price, old, rarity, emoji, c: ["#ff7a00", "#1a1a1a"], ...extra });

// Carátula oficial de Steam (por número de app)
const st = (id) => ({ image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/header.jpg`, kind: "cover" });
// Logo de marca (simple-icons) sobre un fondo del color de la marca
const lg = (slug, bg, color = "ffffff") => ({ image: `https://cdn.simpleicons.org/${slug}/${color}`, kind: "logo", bg });
// Símbolo de Robux (dibujado)
const robux = {
  image: "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,6 90,28 90,72 50,94 10,72 10,28" fill="#ffc83d" stroke="#fff" stroke-width="5"/><text x="50" y="63" font-size="38" font-weight="900" text-anchor="middle" fill="#1a1a1a" font-family="Arial">R$</text></svg>'
  ),
  kind: "logo", bg: "#1a1a1a",
};

export const skins = [
  // ---------- Videojuegos (llaves digitales) ----------
  mk(100, "Juego", "RPG", "Cyberpunk 2077", 29.99, 59.99, "Steam", "🌆", st(1091500)),
  mk(101, "Juego", "RPG", "Elden Ring", 39.9, 59.99, "Steam", "🗡️", st(1245620)),
  mk(102, "Juego", "RPG", "The Witcher 3: Wild Hunt", 7.9, 39.99, "Steam", "🐺", st(292030)),
  mk(103, "Juego", "RPG", "Baldur's Gate 3", 44.9, 59.99, "Steam", "🎲", st(1086940)),
  mk(104, "Juego", "Aventura", "Hogwarts Legacy", 29, 59.99, "Steam", "🪄", st(990080)),
  mk(105, "Juego", "Acción", "Grand Theft Auto V", 14.9, 29.99, "Steam", "🚗", st(271590)),
  mk(106, "Juego", "Acción", "Red Dead Redemption 2", 24.9, 59.99, "Steam", "🤠", st(1174180)),
  mk(107, "Juego", "Terror", "Resident Evil 4", 29.9, 39.99, "Steam", "🧟", st(2050650)),
  mk(108, "Juego", "Indie", "Hades", 12.5, 24.99, "Steam", "🔥", st(1145360)),
  mk(109, "Juego", "Indie", "Hollow Knight", 6.9, 14.99, "Steam", "🦋", st(367520)),
  mk(110, "Juego", "Indie", "Stardew Valley", 8.9, 14.99, "Steam", "🌾", st(413150)),
  mk(111, "Juego", "Indie", "Terraria", 5.9, 9.99, "Steam", "⛏️", st(105600)),
  mk(112, "Juego", "Aventura", "Palworld", 21.9, 29.99, "Steam", "🐾", st(1623730)),
  mk(113, "Juego", "Acción", "Helldivers 2", 31.9, 39.99, "Steam", "🪖", st(553850)),
  mk(114, "Juego", "Acción", "Sekiro: Shadows Die Twice", 35.9, 59.99, "Steam", "🥷", st(814380)),
  mk(115, "Juego", "Carreras", "Forza Horizon 5", 24.9, 59.99, "Steam", "🏎️", st(1551360)),
  // ---------- Skins (respaldo si falla la API + juegos sin API) ----------
  mk(1, "Skin", "Fortnite", "Skin Galaxia Épica", 14.99, 19.99, "Épica", "🚀", lg("fortnite", "#4b2a8a")),
  mk(2, "Skin", "Fortnite", "Pico Cristal Helado", 7.5, 9.99, "Rara", "⛏️", lg("fortnite", "#4b2a8a")),
  mk(5, "Skin", "CS:GO", "AK-47 | Glaciar", 32, 40, "Clasificado", "🔫", lg("counterstrike", "#f4a100")),
  mk(6, "Skin", "CS:GO", "AWP | Océano", 58.4, 70, "Encubierto", "🎯", lg("counterstrike", "#f4a100")),
  mk(7, "Skin", "Valorant", "Vandal Aurora", 17, 21, "Premium", "🔫", lg("valorant", "#ff4655")),
  mk(8, "Skin", "Valorant", "Cuchillo Brisa", 24.9, 29.9, "Exclusiva", "🗡️", lg("valorant", "#ff4655")),
  mk(3, "Skin", "Free Fire", "Bundle Dragón de Fuego", 11.2, 15, "Legendaria", "🐉", lg("garena", "#ff7a00", "000000")),
  mk(4, "Skin", "Free Fire", "Skin Ninja Sombra", 5.9, 7.5, "Rara", "🥷", lg("garena", "#ff7a00", "000000")),
  mk(12, "Skin", "Free Fire", "Emote Baile Naranja", 2.9, 4, "Poco común", "💃", lg("garena", "#ff7a00", "000000")),
  mk(9, "Skin", "Roblox", "Pack Avatar Llama", 4.2, 6, "Común", "🔥", lg("roblox", "#e2231a")),
  mk(13, "Skin", "Minecraft", "Skin Creeper Dorado", 3.5, 5, "Rara", "🟩", lg("minecraft", "#3c8527")),
  mk(14, "Skin", "Minecraft", "Pack Texturas Lava", 6.9, 9, "Épica", "🌋", lg("minecraft", "#3c8527")),
  mk(15, "Skin", "Genshin Impact", "Atuendo Festival Ámbar", 19.9, 25, "Legendaria", "🏮", lg("genshinimpact", "#2b3a67")),
  mk(16, "Skin", "League of Legends", "Yasuo Infernal", 12.5, 16, "Épica", "⚔️", lg("leagueoflegends", "#0a323c", "c8aa6e")),
  mk(17, "Skin", "Apex Legends", "Wraith Brasa", 9.9, 13, "Legendaria", "🌀", lg("apexlegends", "#da292a")),
  // ---------- Códigos canjeables ----------
  mk(20, "Código", "Steam", "Tarjeta Steam $20", 19.5, 22, "Digital", "🎟️", lg("steam", "#1b2838")),
  mk(21, "Código", "PlayStation", "PSN Card $25", 24.2, 27, "Digital", "🎮", lg("playstation", "#003791")),
  mk(22, "Código", "Xbox", "Game Pass Ultimate 3 meses", 39, 47, "Digital", "🟢", lg("xbox", "#107c10")),
  mk(23, "Código", "Nintendo", "eShop Card $20", 19.8, 22, "Digital", "🕹️", lg("nintendoswitch", "#e60012")),
  mk(24, "Código", "Fortnite", "1,000 V-Bucks", 7.9, 9.5, "Digital", "💎", lg("fortnite", "#4b2a8a")),
  mk(25, "Código", "Roblox", "Tarjeta 800 Robux", 9.5, 11, "Digital", "🧱", robux),
  mk(26, "Código", "Free Fire", "310 Diamantes", 3.9, 4.8, "Digital", "💠", lg("garena", "#ff7a00", "000000")),
  mk(27, "Código", "Genshin Impact", "Cristales Génesis 3,280", 49, 59, "Digital", "✨", lg("genshinimpact", "#2b3a67")),
  // ---------- Licencias de aplicaciones ----------
  mk(40, "Licencia", "Microsoft", "Windows 11 Pro", 24.9, 39, "Licencia", "🪟", lg("windows11", "#0078d4")),
  mk(41, "Licencia", "Microsoft", "Office 2021 Professional", 29.9, 49, "Licencia", "📄", lg("microsoftoffice", "#d83b01")),
  mk(42, "Licencia", "Adobe", "Photoshop 1 año", 89, 120, "Suscripción", "🎨", lg("adobephotoshop", "#001e36", "31a8ff")),
  mk(43, "Licencia", "Antivirus", "Norton 360 Deluxe 1 año", 19, 35, "Suscripción", "🛡️", lg("norton", "#ffe01b", "000000")),
  mk(44, "Licencia", "VPN", "NordVPN 1 año", 39, 59, "Suscripción", "🔒", lg("nordvpn", "#4687ff")),
  mk(46, "Licencia", "VPN", "ExpressVPN 1 año", 59, 99, "Suscripción", "🌐", lg("expressvpn", "#da3940")),
  mk(47, "Licencia", "Antivirus", "Kaspersky Premium 1 año", 24, 45, "Suscripción", "🛡️", lg("kaspersky", "#006d5c")),
  mk(48, "Licencia", "Diseño", "Canva Pro 1 año", 39, 120, "Suscripción", "🖌️", lg("canva", "#7d2ae8")),
  mk(45, "Licencia", "Desarrollo", "JetBrains All Products 1 año", 99, 149, "Suscripción", "💻", lg("jetbrains", "#000000")),
];
