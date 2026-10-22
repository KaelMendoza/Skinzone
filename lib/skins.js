import { skins as local } from "../data/skins";

const HORA = 60 * 60 * 1000;
let memo = { t: 0, data: null };

// Precio propio de tu tienda: las APIs no dan precios, así que se calcula
// a partir del nombre. Cámbialo por tu base de datos cuando la tengas.
function precio(nombre) {
  let h = 0;
  for (const c of nombre) h = (h * 31 + c.charCodeAt(0)) % 100000;
  const price = +(2.9 + (h % 5000) / 100).toFixed(2);
  return { price, old: +(price * 1.25).toFixed(2) };
}

const COLORES = ["#bfe0ff", "#8ab4f8"];
const armar = (id, game, name, rarity, image) => ({ id, game, name, rarity, image, c: COLORES, ...precio(name) });
const get = async (url) => {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(url + " " + r.status);
  return r.json();
};

async function fortnite() {
  const nombres = ["Renegade Raider", "Skull Trooper", "Peely", "Midas", "Raven", "Black Knight", "Drift", "Fishstick"];
  const res = await Promise.all(
    nombres.map((n) => get(`https://fortnite-api.com/v2/cosmetics/br/search?name=${encodeURIComponent(n)}&language=es`).catch((e) => { console.error("Fortnite:", n, e.message); return null; }))
  );
  return res
    .filter((r) => r?.data?.images?.icon)
    .map((r) => armar("fn-" + r.data.id, "Fortnite", r.data.name, r.data.rarity?.displayValue || "Skin", r.data.images.icon));
}

async function csgo() {
  const data = await get("https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json");
  return data
    .filter((s) => s.image && !/StatTrak|Souvenir/.test(s.name) && ["Covert", "Classified"].includes(s.rarity?.name))
    .filter((_, i) => i % 6 === 0)
    .slice(0, 12)
    .map((s) => armar("cs-" + s.id, "CS:GO", s.name, s.rarity.name, s.image));
}

async function valorant() {
  const { data } = await get("https://valorant-api.com/v1/weapons/skins");
  return data
    .filter((s) => s.displayIcon && !/Standard|Random/.test(s.displayName))
    .filter((_, i) => i % 20 === 0)
    .slice(0, 12)
    .map((s) => armar("va-" + s.uuid, "Valorant", s.displayName, "Skin", s.displayIcon));
}

export async function getSkins() {
  if (memo.data && Date.now() - memo.t < HORA) return memo.data;
  const fuentes = { Fortnite: fortnite, "CS:GO": csgo, Valorant: valorant };
  const out = [];
  let fallo = false;
  for (const [juego, fn] of Object.entries(fuentes)) {
    let lista = [];
    try { lista = await fn(); } catch (e) { console.error(juego, e.message); }
    // si la API falla, usa los datos locales de respaldo
    if (!lista.length) fallo = true;
    out.push(...(lista.length ? lista : local.filter((s) => s.game === juego)));
  }
  out.push(...local.filter((s) => !fuentes[s.game])); // Free Fire, Roblox: manuales
  if (!fallo) memo = { t: Date.now(), data: out }; // no guardar si algo falló
  return out;
}
