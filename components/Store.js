"use client";
import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";

const CATS = [["Todo", "Todo"], ["Juego", "Videojuegos"], ["Skin", "Skins"], ["Código", "Códigos canjeables"], ["Licencia", "Licencias"]];

function Rail({ items, value, onPick, cls = "" }) {
  const ref = useRef(null);
  const go = (d) => ref.current?.scrollBy({ left: d * 260, behavior: "smooth" });
  return (
    <div className={"rail " + cls}>
      <button className="arr l" onClick={() => go(-1)} aria-label="Anterior">‹</button>
      <div className="tabs" ref={ref}>
        {items.map(([k, n]) => (<button key={k} className={k === value ? "on" : ""} onClick={() => onPick(k)}>{n}</button>))}
      </div>
      <button className="arr r" onClick={() => go(1)} aria-label="Siguiente">›</button>
    </div>
  );
}

export default function Store({ skins }) {
  const [cat, setCat] = useState("Todo");
  const [game, setGame] = useState("Todos");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [pedido, setPedido] = useState(false);
  const [bad, setBad] = useState({});
  const pic = (s) => s.image && !bad[s.id];

  const base = useMemo(() => skins.filter((s) => cat === "Todo" || s.type === cat), [skins, cat]);
  const juegos = ["Todos", ...new Set(base.map((s) => s.game))];
  const list = base.filter((s) => (game === "Todos" || s.game === game) && (s.name + s.game).toLowerCase().includes(q.toLowerCase()));

  const count = cart.reduce((a, s) => a + s.qty, 0);
  const total = cart.reduce((a, s) => a + s.qty * s.price, 0);
  const add = (s) => { setPedido(false); setCart((c) => (c.find((x) => x.id === s.id) ? c.map((x) => (x.id === s.id ? { ...x, qty: x.qty + 1 } : x)) : [...c, { ...s, qty: 1 }])); };
  const change = (id, d) => setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: x.qty + d } : x)).filter((x) => x.qty > 0));
  const pagar = () => { setCart([]); setPedido(true); };

  return (
    <>
      <header className="top">
        <a className="brand" href="#"><Logo /><span>Skin<b>Zone</b></span></a>
        <input className="search" placeholder="Busca skins, códigos, licencias o juegos" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="cart" onClick={() => setOpen(true)}>🛒 Carrito ({count}) · ${total.toFixed(2)}</button>
      </header>

      <Rail cls="cats" items={CATS} value={cat} onPick={(k) => { setCat(k); setGame("Todos"); }} />
      <Rail items={juegos.map((g) => [g, g])} value={game} onPick={setGame} />

      <section className="hero">
        <h1>Skins, códigos y licencias al mejor precio</h1>
        <p>Videojuegos, skins, códigos y licencias: Steam, Fortnite, Windows y más. Entrega digital al instante.</p>
        <button className="cta" onClick={() => { setCat("Todo"); setGame("Todos"); }}>Ver ofertas</button>
      </section>

      <main className="wrap">
        <h2>{list.length} productos</h2>
        {list.length === 0 && <p className="empty">No hay resultados. Prueba con otra búsqueda.</p>}
        <div className="grid">
          {list.map((s) => (
            <article key={s.id} className="card">
              <div className="art" style={s.bg ? { background: `linear-gradient(135deg, ${s.bg}, #000 150%)` } : undefined}>
                <span className="tag">{s.game}</span>
                <span className="disc">-{Math.round((1 - s.price / s.old) * 100)}%</span>
                {pic(s) ? <img className={s.kind} src={s.image} alt={s.name} loading="lazy" referrerPolicy="no-referrer" onError={() => setBad((b) => ({ ...b, [s.id]: 1 }))} /> : <span className="ico">{s.emoji || "🎮"}</span>}
              </div>
              <div className="info">
                <h3 title={s.name}>{s.name}</h3>
                <small>{s.type} · {s.rarity}</small>
                <div className="row">
                  <div><del>${s.old.toFixed(2)}</del><strong>${s.price.toFixed(2)}</strong></div>
                  <button onClick={() => add(s)}>Agregar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="foot">
        <Logo size={28} />
        <span>© 2026 SkinZone. Marca no afiliada a los juegos mencionados.</span>
        <Link href="/aviso-confidencialidad">Aviso de Confidencialidad</Link>
      </footer>

      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={"drawer" + (open ? " open" : "")} aria-hidden={!open}>
        <div className="dh"><h2>Tu carrito</h2><button className="x" onClick={() => setOpen(false)} aria-label="Cerrar">✕</button></div>
        <div className="dl">
          {pedido && <p className="ok">✅ ¡Pedido realizado! (compra simulada)</p>}
          {cart.length === 0 && !pedido && <p className="empty">Tu carrito está vacío.</p>}
          {cart.map((x) => (
            <div key={x.id} className="line">
              <div className="mini">{pic(x) ? <img src={x.image} alt="" onError={() => setBad((b) => ({ ...b, [x.id]: 1 }))} /> : x.emoji || "🎮"}</div>
              <div className="lt"><strong>{x.name}</strong><small>{x.game} · ${x.price.toFixed(2)}</small></div>
              <div className="qty">
                <button onClick={() => change(x.id, -1)}>−</button><span>{x.qty}</span><button onClick={() => change(x.id, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="df">
          <div className="tot"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <button className="cta" disabled={!cart.length} onClick={pagar}>Finalizar compra</button>
          <button className="ghost" disabled={!cart.length} onClick={() => setCart([])}>Vaciar carrito</button>
        </div>
      </aside>
    </>
  );
}
