import Link from "next/link";
import Logo from "../../components/Logo";

export const metadata = {
  title: "Aviso de Confidencialidad | SkinZone",
  description: "Cómo SkinZone protege y trata tus datos personales.",
};

export default function Aviso() {
  return (
    <>
      <header className="top">
        <Link className="brand" href="/">
          <Logo />
          <span>SkinZone</span>
        </Link>
      </header>
      <main className="wrap legal">
        <h1>Aviso de Confidencialidad</h1>
        <p><small>Última actualización: 25 de octubre de 2026</small></p>

        <h2>1. Responsable</h2>
        <p>SkinZone es responsable del tratamiento de tus datos personales y de su protección.</p>

        <h2>2. Datos que recopilamos</h2>
        <p>Nombre, correo electrónico, usuario de juego y datos de tus compras. No almacenamos datos completos de tarjetas: el pago lo procesa un proveedor externo.</p>

        <h2>3. Para qué los usamos</h2>
        <p>Entregar tus skins, dar soporte, enviarte confirmaciones de compra y mejorar la tienda.</p>

        <h2>4. Con quién los compartimos</h2>
        <p>Solo con proveedores de pago y entrega necesarios para completar tu compra. No vendemos tus datos.</p>

        <h2>5. Tus derechos</h2>
        <p>Puedes acceder, rectificar, cancelar u oponerte al uso de tus datos (derechos ARCO) escribiendo a privacidad@skinzone.example.</p>

        <h2>6. Cambios al aviso</h2>
        <p>Cualquier cambio se publicará en esta página.</p>

        <p><Link href="/">← Volver a la tienda</Link></p>
      </main>
    </>
  );
}