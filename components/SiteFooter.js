import Link from "next/link";
import Logo from "./Logo";

const COLS = [
  ["Tienda", [["/", "Catálogo"], ["/#productos", "Ofertas"], ["/entrega", "Métodos de pago"]]],
  ["Atención al cliente", [["/ayuda", "Centro de ayuda"], ["/ayuda#faq", "Preguntas frecuentes"], ["/contacto", "Contacto y soporte"], ["/devoluciones", "Devoluciones y reembolsos"]]],
  ["Legal", [["/terminos", "Términos y condiciones"], ["/aviso-confidencialidad", "Aviso de Confidencialidad"]]],
];

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="foot-in">
        <div className="foot-brand">
          <Link className="brand" href="/"><Logo size={34} /><span>Skin<b>Zone</b></span></Link>
          <p>Skins, códigos y licencias digitales con entrega inmediata y soporte en español.</p>
        </div>
        {COLS.map(([t, links]) => (
          <nav key={t} aria-label={t}>
            <h3>{t}</h3>
            <ul>{links.map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="foot-bar">
        <span>© 2026 SkinZone. Marca no afiliada a los juegos mencionados.</span>
        <span>Proyecto final de la materia Ingeniería de software - Mendoza Alcantar Dante Tlacaelel - 225361601</span>
      </div>
    </footer>
  );
}
