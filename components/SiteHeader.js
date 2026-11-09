"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export const NAV = [
  ["/", "Tienda"],
  ["/ayuda", "Centro de ayuda"],
  ["/entrega", "Compras y entrega"],
  ["/devoluciones", "Devoluciones"],
  ["/contacto", "Contacto"],
];

export default function SiteHeader({ children }) {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    if (!menu) return;
    const k = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [menu]);

  return (
    <header className="top">
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <div className="top-in">
        <Link className="brand" href="/" aria-label="SkinZone, ir a la tienda"><Logo /><span>Skin<b>Zone</b></span></Link>
        <nav className={"nav" + (menu ? " open" : "")} id="menu-principal" aria-label="Principal">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className={path === href ? "on" : ""} aria-current={path === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <div className="top-tools">{children}</div>
        <button className="burger" aria-expanded={menu} aria-controls="menu-principal" aria-label={menu ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenu((m) => !m)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
