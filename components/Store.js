"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import SiteHeader from "./SiteHeader";

const CATS = [["Todo", "Todo"], ["Juego", "Videojuegos"], ["Skin", "Skins"], ["Código", "Códigos canjeables"], ["Licencia", "Licencias"]];
const SORTS = [["rel", "Destacados"], ["asc", "Precio: menor a mayor"], ["desc", "Precio: mayor a menor"], ["disc", "Mayor descuento"], ["az", "Nombre (A-Z)"]];
const PERKS = [
  ["⚡", "Entrega inmediata", "Recibe tu código al instante", "/entrega"],
  ["🔒", "Pago seguro", "Tarjeta, PayPal u OXXO", "/entrega#pago"],
  ["↩️", "Reembolso garantizado", "Si tu código no funciona", "/devoluciones"],
  ["💬", "Soporte en español", "Respuesta en menos de 24 h", "/contacto"],
];
const off = (s) => Math.round((1 - s.price / s.old) * 100);

function Rail({ items, value, onPick, cls = "", label }) {
  const ref = useRef(null);
  const go = (d) => ref.current?.scrollBy({ left: d * 260, behavior: "smooth" });
  return (
    <div className={"rail " + cls}>
      <button className="arr l" onClick={() => go(-1)} aria-label="Desplazar a la izquierda">‹</button>
      <div className="tabs" ref={ref} role="group" aria-label={label}>
        {items.map(([k, n, c]) => (
          <button key={k} className={k === value ? "on" : ""} aria-pressed={k === value} onClick={() => onPick(k)}>
            {n}{c != null && <span className="n">{c}</span>}
          </button>
        ))}
      </div>
      <button className="arr r" onClick={() => go(1)} aria-label="Desplazar a la derecha">›</button>
    </div>
  );
}

export default function Store({ skins }) {
  const [cat, setCat] = useState("Todo");
  const [game, setGame] = useState("Todos");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("rel");
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [pedido, setPedido] = useState(null);
  const [bad, setBad] = useState({});
  const [toast, setToast] = useState(null);
  const loaded = useRef(false);
  const closeRef = useRef(null);
  const listRef = useRef(null);
  const pic = (s) => s.image && !bad[s.id];

  // Carrito guardado en el navegador para no perderlo al recargar
  useEffect(() => {
    try { const c = JSON.parse(localStorage.getItem("sz-cart") || "[]"); if (Array.isArray(c)) setCart(c); } catch {}
    loaded.current = true;
  }, []);
  useEffect(() => { if (loaded.current) localStorage.setItem("sz-cart", JSON.stringify(cart)); }, [cart]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const k = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open]);

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2200); return () => clearTimeout(t); }, [toast]);

  const counts = useMemo(() => { const m = { Todo: skins.length }; skins.forEach((s) => (m[s.type] = (m[s.type] || 0) + 1)); return m; }, [skins]);
  const base = useMemo(() => skins.filter((s) => cat === "Todo" || s.type === cat), [skins, cat]);
  const juegos = useMemo(() => ["Todos", ...new Set(base.map((s) => s.game))], [base]);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    const l = base.filter((s) => (game === "Todos" || s.game === game) && (s.name + " " + s.game + " " + s.rarity).toLowerCase().includes(t));
    const by = { asc: (a, b) => a.price - b.price, desc: (a, b) => b.price - a.price, disc: (a, b) => off(b) - off(a), az: (a, b) => a.name.localeCompare(b.name) }[sort];
    return by ? [...l].sort(by) : l;
  }, [base, game, q, sort]);

  const filtered = cat !== "Todo" || game !== "Todos" || q;
  const reset = () => { setCat("Todo"); setGame("Todos"); setQ(""); setSort("rel"); };
  const toList = () => listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const count = cart.reduce((a, s) => a + s.qty, 0);
  const total = cart.reduce((a, s) => a + s.qty * s.price, 0);
  const ahorro = cart.reduce((a, s) => a + s.qty * (s.old - s.price), 0);
  const inCart = (id) => cart.find((x) => x.id === id)?.qty || 0;
  const add = (s) => {
    setPedido(null);
    setCart((c) => (c.find((x) => x.id === s.id) ? c.map((x) => (x.id === s.id ? { ...x, qty: x.qty + 1 } : x)) : [...c, { ...s, qty: 1 }]));
    setToast(s.name);
  };
  const change = (id, d) => setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: x.qty + d } : x)).filter((x) => x.qty > 0));
  const pagar = () => { setCart([]); setPedido("SZ-" + Date.now().toString(36).toUpperCase().slice(-6)); };

  return (
    <>
      <SiteHeader>
        <div className="search-box">
          <span aria-hidden="true">🔍</span>
          <input type="search" className="search" aria-label="Buscar productos" placeholder="Busca skins, códigos, licencias o juegos" value={q}
            onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && toList()} />
          {q && <button className="clear" onClick={() => setQ("")} aria-label="Borrar búsqueda">✕</button>}
        </div>
        <button className="cart" onClick={() => setOpen(true)} aria-label={`Abrir carrito, ${count} productos, total $${total.toFixed(2)}`}>
          <span aria-hidden="true">🛒</span><span className="cart-t">${total.toFixed(2)}</span>
          {count > 0 && <span className="badge">{count}</span>}
        </button>
      </SiteHeader>

      <section className="hero">
        <div>
          <span className="eyebrow">Entrega digital al instante</span>
          <h1>Skins, códigos y licencias <em>al mejor precio</em></h1>
          <p>Videojuegos, skins, códigos y licencias: Steam, Fortnite, Windows y más. Compra en segundos y recibe tu producto por correo.</p>
          <div className="hero-act">
            <button className="cta" onClick={() => { reset(); toList(); }}>Ver ofertas</button>
            <Link className="ghost" href="/entrega">¿Cómo funciona?</Link>
          </div>
        </div>
      </section>

      <ul className="perks">
        {PERKS.map(([i, t, d, h]) => (
          <li key={t}><Link href={h}><span className="pi" aria-hidden="true">{i}</span><span><strong>{t}</strong><small>{d}</small></span></Link></li>
        ))}
      </ul>

      <div className="filters" ref={listRef} id="productos">
        <Rail cls="cats" label="Categorías" items={CATS.map(([k, n]) => [k, n, counts[k] || 0])} value={cat} onPick={(k) => { setCat(k); setGame("Todos"); }} />
        <Rail label="Juegos y plataformas" items={juegos.map((g) => [g, g])} value={game} onPick={setGame} />
      </div>

      <main className="wrap" id="contenido">
        <div className="bar">
          <h2 aria-live="polite">{list.length} {list.length === 1 ? "producto" : "productos"}{q && <> para “{q}”</>}</h2>
          <div className="bar-r">
            {filtered && <button className="link" onClick={reset}>Limpiar filtros</button>}
            <label className="sort">Ordenar
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map(([k, n]) => <option key={k} value={k}>{n}</option>)}
              </select>
            </label>
          </div>
        </div>
        {list.length === 0 && (
          <div className="empty-box">
            <span aria-hidden="true">🕹️</span>
            <p>No encontramos resultados{q && <> para “{q}”</>}.</p>
            <button className="cta" onClick={reset}>Ver todo el catálogo</button>
          </div>
        )}
        <div className="grid">
          {list.map((s) => {
            const n = inCart(s.id);
            return (
              <article key={s.id} className="card">
                <div className="art" style={s.bg ? { background: `linear-gradient(135deg, ${s.bg}, #000 150%)` } : undefined}>
                  <span className="tag">{s.game}</span>
                  <span className="disc">-{off(s)}%</span>
                  {pic(s) ? <img className={s.kind} src={s.image} alt={s.name} loading="lazy" referrerPolicy="no-referrer" onError={() => setBad((b) => ({ ...b, [s.id]: 1 }))} /> : <span className="ico">{s.emoji || "🎮"}</span>}
                </div>
                <div className="info">
                  <h3 title={s.name}>{s.name}</h3>
                  <small>{s.type} · {s.rarity}</small>
                  <div className="row">
                    <div><del>${s.old.toFixed(2)}</del><strong>${s.price.toFixed(2)}</strong></div>
                    <button className={n ? "added" : ""} onClick={() => add(s)} aria-label={`Agregar ${s.name} al carrito`}>{n ? `✓ ${n}` : "Agregar"}</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {toast && (
        <div className="toast" role="status">
          <span>✓ <b>{toast}</b> agregado</span>
          <button onClick={() => { setToast(null); setOpen(true); }}>Ver carrito</button>
        </div>
      )}

      <div className={"scrim" + (open ? " open" : "")} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={"drawer" + (open ? " open" : "")} aria-hidden={!open} aria-label="Carrito de compras" role="dialog" aria-modal="true">
        <div className="dh"><h2>Tu carrito {count > 0 && <small>({count})</small>}</h2><button ref={closeRef} className="x" onClick={() => setOpen(false)} aria-label="Cerrar carrito">✕</button></div>
        <div className="dl">
          {pedido && (
            <div className="ok-box">
              <p className="ok">✅ ¡Pedido {pedido} realizado! (compra simulada)</p>
              <p>Recibirás tus códigos por correo. ¿Algún problema? Visita el <Link href="/ayuda">Centro de ayuda</Link>.</p>
            </div>
          )}
          {cart.length === 0 && !pedido && (
            <div className="empty-box sm"><span aria-hidden="true">🛒</span><p>Tu carrito está vacío.</p><button className="ghost" onClick={() => { setOpen(false); toList(); }}>Explorar productos</button></div>
          )}
          {cart.map((x) => (
            <div key={x.id} className="line">
              <div className="mini">{pic(x) ? <img src={x.image} alt="" onError={() => setBad((b) => ({ ...b, [x.id]: 1 }))} /> : x.emoji || "🎮"}</div>
              <div className="lt"><strong>{x.name}</strong><small>{x.game} · ${x.price.toFixed(2)}</small></div>
              <div className="qty">
                <button onClick={() => change(x.id, -1)} aria-label={`Quitar uno de ${x.name}`}>−</button><span>{x.qty}</span><button onClick={() => change(x.id, 1)} aria-label={`Agregar uno de ${x.name}`}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="df">
          {ahorro > 0 && <div className="save"><span>Ahorras</span><span>${ahorro.toFixed(2)}</span></div>}
          <div className="tot"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <button className="cta" disabled={!cart.length} onClick={pagar}>Finalizar compra</button>
          <button className="ghost" disabled={!cart.length} onClick={() => setCart([])}>Vaciar carrito</button>
          <small className="fine">🔒 Pago seguro · <Link href="/devoluciones">Política de reembolsos</Link></small>
        </div>
      </aside>
    </>
  );
}
