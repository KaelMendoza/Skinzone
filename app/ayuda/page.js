import Link from "next/link";
import ServicePage from "../../components/ServicePage";

export const metadata = { title: "Centro de ayuda | SkinZone", description: "Resuelve tus dudas sobre compras, entregas, pagos y reembolsos en SkinZone." };

const TEMAS = [
  ["🛒", "Compras y entrega", "Cómo comprar, tiempos de entrega y cómo canjear tus códigos.", "/entrega"],
  ["💳", "Pagos", "Métodos aceptados, facturación y pagos rechazados.", "/entrega#pago"],
  ["↩️", "Devoluciones y reembolsos", "Qué hacer si un código no funciona o te equivocaste de producto.", "/devoluciones"],
  ["💬", "Contacto y soporte", "Escríbenos y te respondemos en menos de 24 horas.", "/contacto"],
  ["🔐", "Privacidad", "Cómo protegemos y tratamos tus datos personales.", "/aviso-confidencialidad"],
  ["📄", "Términos y condiciones", "Reglas de uso de la tienda y de los productos digitales.", "/terminos"],
];

const FAQ = [
  ["¿Cuánto tarda en llegar mi compra?", "La mayoría de los productos se entregan al instante en tu correo y en tu carrito de confirmación. En casos excepcionales la verificación del pago puede tardar hasta 2 horas."],
  ["¿Cómo canjeo un código de Steam, PlayStation o Xbox?", <>Abre la tienda de la plataforma, busca la opción “Canjear código” o “Activar un producto” e ingresa el código. Tienes la guía paso a paso en <Link href="/entrega#canjear">Compras y entrega</Link>.</>],
  ["¿Las skins se envían a mi cuenta del juego?", "Para skins y monedas virtuales recibes un código canjeable o una tarjeta de regalo oficial. Nunca te pediremos la contraseña de tu cuenta."],
  ["Mi código dice que es inválido o ya fue usado", <>Revisa que lo hayas copiado sin espacios y que corresponda a tu región. Si sigue fallando, <Link href="/contacto">contáctanos</Link> con tu número de pedido y te damos un reemplazo o reembolso.</>],
  ["¿Qué métodos de pago aceptan?", "Tarjetas de crédito y débito (Visa, Mastercard, American Express), PayPal y pago en efectivo en OXXO."],
  ["¿Puedo cancelar mi pedido?", <>Sí, siempre que el código no haya sido revelado o canjeado. Consulta la <Link href="/devoluciones">política de devoluciones</Link>.</>],
  ["¿SkinZone es una tienda oficial?", "SkinZone es un revendedor independiente de productos digitales y no está afiliado a los juegos ni marcas mencionadas."],
];

export default function Ayuda() {
  return (
    <ServicePage title="Centro de ayuda" intro="Encuentra respuestas rápidas sobre tus compras, pagos, entregas y reembolsos.">
      <ul className="topics">
        {TEMAS.map(([i, t, d, h]) => (
          <li key={t}><Link href={h}><span className="pi" aria-hidden="true">{i}</span><strong>{t}</strong><small>{d}</small><span className="go">Ver más →</span></Link></li>
        ))}
      </ul>
      <section id="faq" className="faq">
        <h2>Preguntas frecuentes</h2>
        {FAQ.map(([p, r], i) => (
          <details key={p} open={i === 0}><summary>{p}</summary><p>{r}</p></details>
        ))}
      </section>
    </ServicePage>
  );
}
