import Link from "next/link";
import ServicePage from "../../components/ServicePage";

export const metadata = { title: "Términos y condiciones | SkinZone", description: "Términos y condiciones de uso de SkinZone." };

export default function Terminos() {
  return (
    <ServicePage title="Términos y condiciones" intro="Última actualización: 9 de noviembre de 2026">
      <div className="legal">
        <h2>1. Aceptación</h2>
        <p>Al usar SkinZone aceptas estos términos. Si no estás de acuerdo, por favor no utilices la tienda.</p>
        <h2>2. Productos digitales</h2>
        <p>Vendemos códigos, llaves y tarjetas de regalo de terceros. Cada producto indica su plataforma y región; es tu responsabilidad verificar la compatibilidad antes de comprar.</p>
        <h2>3. Precios y pagos</h2>
        <p>Los precios se muestran en dólares estadounidenses e incluyen impuestos aplicables. Nos reservamos el derecho de cancelar pedidos con errores evidentes de precio, reembolsando el importe completo.</p>
        <h2>4. Entrega</h2>
        <p>La entrega es digital. Consulta los tiempos en <Link href="/entrega">Compras y entrega</Link>.</p>
        <h2>5. Devoluciones</h2>
        <p>Se rigen por nuestra <Link href="/devoluciones">política de devoluciones y reembolsos</Link>.</p>
        <h2>6. Uso indebido</h2>
        <p>Está prohibido revender códigos obtenidos de forma fraudulenta o usar medios de pago ajenos. Podemos suspender pedidos sospechosos.</p>
        <h2>7. Marcas</h2>
        <p>Los nombres y logotipos de juegos pertenecen a sus respectivos dueños. SkinZone no está afiliado a ellos.</p>
        <h2>8. Datos personales</h2>
        <p>Tratamos tus datos conforme al <Link href="/aviso-confidencialidad">Aviso de Confidencialidad</Link>.</p>
      </div>
    </ServicePage>
  );
}
