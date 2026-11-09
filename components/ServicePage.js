import Link from "next/link";
import SiteHeader from "./SiteHeader";

// Estructura común para las páginas de servicio al usuario
export default function ServicePage({ title, intro, crumb, children }) {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="wrap page">
        <nav className="crumbs" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link><span aria-hidden="true">›</span>
          {crumb && <><Link href="/ayuda">Centro de ayuda</Link><span aria-hidden="true">›</span></>}
          <span aria-current="page">{title}</span>
        </nav>
        <header className="page-head">
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </header>
        {children}
        <aside className="help-cta">
          <div><strong>¿No encontraste lo que buscabas?</strong><p>Nuestro equipo responde en menos de 24 horas.</p></div>
          <Link className="cta" href="/contacto">Contactar a soporte</Link>
        </aside>
      </main>
    </>
  );
}
