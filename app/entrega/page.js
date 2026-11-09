import Link from "next/link";
import ServicePage from "../../components/ServicePage";

export const metadata = { title: "Compras y entrega | SkinZone", description: "Cómo comprar en SkinZone, métodos de pago y cómo canjear tus códigos." };

const PASOS = [
  ["Elige tu producto", "Explora el catálogo por categoría o juego y agrégalo al carrito."],
  ["Paga de forma segura", "Usa tarjeta, PayPal u OXXO. Tus datos de pago nunca se guardan en SkinZone."],
  ["Recibe tu código", "Te lo mostramos al confirmar el pago y te lo enviamos por correo."],
  ["Canjéalo y juega", "Actívalo en la plataforma correspondiente y disfruta."],
];

const CANJE = [
  ["Steam", "Abre Steam › Juegos › Activar un producto en Steam e ingresa la clave."],
  ["PlayStation", "Ve a PlayStation Store › menú (…) › Canjear códigos."],
  ["Xbox", "Abre Microsoft Store › tu perfil › Canjear código o visita redeem.microsoft.com."],
  ["Fortnite / Roblox", "Canjea la tarjeta de regalo en el sitio oficial del juego con tu cuenta iniciada."],
  ["Windows / Office", "Configuración › Sistema › Activación › Cambiar clave de producto."],
];

export default function Entrega() {
  return (
    <ServicePage crumb title="Compras y entrega" intro="Todo lo que necesitas saber para comprar y recibir tus productos digitales.">
      <section>
        <h2>Cómo comprar en 4 pasos</h2>
        <ol className="steps">{PASOS.map(([t, d]) => <li key={t}><strong>{t}</strong><p>{d}</p></li>)}</ol>
      </section>
      <section id="pago" className="block">
        <h2>Métodos de pago</h2>
        <ul className="chips"><li>💳 Visa</li><li>💳 Mastercard</li><li>💳 American Express</li><li>🅿️ PayPal</li><li>🏪 OXXO</li></ul>
        <p>Los pagos con tarjeta y PayPal se confirman al instante. Los pagos en OXXO pueden tardar hasta 2 horas en reflejarse; tu código se libera en cuanto se confirma.</p>
      </section>
      <section className="block">
        <h2>Tiempos de entrega</h2>
        <div className="table">
          <div><span>Tarjeta o PayPal</span><strong>Inmediata</strong></div>
          <div><span>OXXO</span><strong>Hasta 2 horas</strong></div>
          <div><span>Verificación manual de seguridad</span><strong>Hasta 12 horas</strong></div>
        </div>
      </section>
      <section id="canjear" className="block">
        <h2>Cómo canjear tu código</h2>
        <dl className="defs">{CANJE.map(([p, d]) => <div key={p}><dt>{p}</dt><dd>{d}</dd></div>)}</dl>
        <p className="note">¿Problemas al canjear? Revisa la <Link href="/ayuda#faq">sección de preguntas frecuentes</Link> o solicita un <Link href="/devoluciones">reemplazo</Link>.</p>
      </section>
    </ServicePage>
  );
}
