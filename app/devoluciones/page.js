import Link from "next/link";
import ServicePage from "../../components/ServicePage";

export const metadata = { title: "Devoluciones y reembolsos | SkinZone", description: "Política de devoluciones, reemplazos y reembolsos de SkinZone." };

export default function Devoluciones() {
  return (
    <ServicePage crumb title="Devoluciones y reembolsos" intro="Si algo sale mal con tu compra, lo resolvemos. Así funciona nuestra garantía.">
      <div className="cols">
        <section className="box good"><h2>✅ Aplica reembolso o reemplazo</h2><ul>
          <li>El código es inválido, ya fue usado o no corresponde al producto.</li>
          <li>El código no es compatible con la región indicada en la tienda.</li>
          <li>No recibiste tu código después de 12 horas con el pago confirmado.</li>
          <li>Se realizó un cobro duplicado.</li>
        </ul></section>
        <section className="box bad"><h2>⛔ No aplica</h2><ul>
          <li>El código ya fue revelado o canjeado correctamente.</li>
          <li>Compraste para una plataforma o región distinta a la tuya.</li>
          <li>Cambiaste de opinión después de 14 días.</li>
        </ul></section>
      </div>
      <section className="block">
        <h2>Cómo solicitarlo</h2>
        <ol className="steps">
          <li><strong>Reúne tus datos</strong><p>Número de pedido (empieza con SZ-) y, si aplica, una captura del error.</p></li>
          <li><strong>Envía tu solicitud</strong><p>Usa el <Link href="/contacto">formulario de contacto</Link> y elige “Reembolso o reemplazo”.</p></li>
          <li><strong>Revisión</strong><p>Verificamos el código con el proveedor en un máximo de 48 horas.</p></li>
          <li><strong>Resolución</strong><p>Te enviamos un código nuevo o el reembolso a tu método de pago original (3 a 10 días hábiles).</p></li>
        </ol>
      </section>
    </ServicePage>
  );
}
