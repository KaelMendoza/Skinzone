"use client";
import { useState, useMemo } from "react";
import Logo from "./Logo";
import { games } from "../data/skins";
import Link from "next/link";

export default function Store({ skins }) {
  const [game, setGame] = useState("Todos");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState([]);

  const list = useMemo(
    () => skins.filter((s) => (game === "Todos" || s.game === game) && s.name.toLowerCase().includes(q.toLowerCase())),
    [skins, game, q]
  );
  const total = cart.reduce((a, s) => a + s.price, 0);

  return (
    <>
      <header className="top">
        <a className="brand" href="#">
          <Logo />
          <span>SkinZone</span>
        </a>
        <input className="search" placeholder="Busca skins, juegos o packs" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="cart" onClick={() => setCart([])} title="Vaciar carrito">
          Carrito ({cart.length}) · ${total.toFixed(2)}
        </button>
      </header>

      <nav className="tabs">
        {games.map((g) => (
          <button key={g} className={g === game ? "on" : ""} onClick={() => setGame(g)}>{g}</button>
        ))}
      </nav>

      <section className="hero">
        <h1>Skins para jugar con estilo, entrega al instante</h1>
        <p>Fortnite, Free Fire, CS:GO y más. Pago seguro y hasta 25% menos que en la tienda oficial.</p>
        <button className="cta" onClick={() => setGame("Todos")}>Ver ofertas</button>
      </section>

      <main className="wrap">
        <h2>{game === "Todos" ? "Más vendidas" : `Skins de ${game}`}</h2>
        {list.length === 0 && <p className="empty">No hay skins con esa búsqueda. Prueba con otro nombre.</p>}
        <div className="grid">
          {list.map((s) => (
            <article key={s.id} className="card">
              <div className="art" style={{ background: `linear-gradient(135deg, ${s.c[0]}, ${s.c[1]})` }}>
                <span className="tag">{s.game}</span>
                <span className="disc">-{Math.round((1 - s.price / s.old) * 100)}%</span>
                {s.image ? <img src={s.image} alt={s.name} loading="lazy" referrerPolicy="no-referrer" /> : <span className="ico">🎮</span>}
              </div>
              <div className="info">
                <h3>{s.name}</h3>
                <small>{s.rarity}</small>
                <div className="row">
                  <div>
                    <del>${s.old.toFixed(2)}</del>
                    <strong>${s.price.toFixed(2)}</strong>
                  </div>
                  <button onClick={() => setCart([...cart, s])}>Agregar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="foot">
        <Logo size={28} />
        <span>© 2026 SkinZone. Marca no afiliada a los juegos mencionados.</span>
      </footer>
      <Link href="/aviso-confidencialidad">Aviso de Confidencialidad</Link>
    </>
  );
}
