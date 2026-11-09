import ServicePage from "../../components/ServicePage";
import ContactForm from "../../components/ContactForm";

export const metadata = { title: "Contacto y soporte | SkinZone", description: "Escríbenos para resolver dudas sobre pedidos, pagos o reembolsos." };

export default function Contacto() {
  return (
    <ServicePage crumb title="Contacto y soporte" intro="Cuéntanos qué pasó y te respondemos por correo en menos de 24 horas.">
      <div className="contact">
        <ContactForm />
        <aside className="contact-side">
          <div className="box"><h2>⏱️ Horario</h2><p>Lunes a domingo, 9:00 a 22:00 (hora del centro de México).</p></div>
          <div className="box"><h2>📧 Correo</h2><p>soporte@skinzone.example</p></div>
          <div className="box"><h2>💡 Consejo</h2><p>Incluye tu número de pedido (SZ-…) para atenderte más rápido.</p></div>
        </aside>
      </div>
    </ServicePage>
  );
}
