"use client";
import { useState } from "react";

const MOTIVOS = ["Problema con un pedido", "Reembolso o reemplazo", "Pagos y facturación", "Pregunta sobre un producto", "Otro"];

export default function ContactForm() {
  const [st, setSt] = useState("idle");
  const send = async (e) => {
    e.preventDefault();
    setSt("sending");
    try {
      const r = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(e.target)).toString(),
      });
      if (!r.ok) throw new Error(r.status);
      e.target.reset();
      setSt("ok");
    } catch {
      setSt("error");
    }
  };

  if (st === "ok")
    return (
      <div className="form-card done" role="status">
        <span aria-hidden="true">✅</span>
        <h2>¡Mensaje enviado!</h2>
        <p>Gracias por escribirnos. Te responderemos a tu correo en menos de 24 horas.</p>
        <button className="ghost" onClick={() => setSt("idle")}>Enviar otro mensaje</button>
      </div>
    );

  return (
    <form className="form-card" name="contacto" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={send}>
      <input type="hidden" name="form-name" value="contacto" />
      <p hidden><label>No llenar: <input name="bot-field" /></label></p>
      <div className="f2">
        <label>Nombre<input name="nombre" required autoComplete="name" placeholder="Tu nombre" /></label>
        <label>Correo electrónico<input type="email" name="email" required autoComplete="email" placeholder="tu@correo.com" /></label>
      </div>
      <div className="f2">
        <label>Motivo
          <select name="motivo" required defaultValue="">
            <option value="" disabled>Selecciona una opción</option>
            {MOTIVOS.map((m) => <option key={m}>{m}</option>)}
          </select>
        </label>
        <label>Número de pedido <small>(opcional)</small><input name="pedido" placeholder="SZ-XXXXXX" /></label>
      </div>
      <label>Mensaje<textarea name="mensaje" required rows={6} placeholder="Describe tu duda o problema con el mayor detalle posible" /></label>
      {st === "error" && <p className="err" role="alert">No pudimos enviar tu mensaje. Intenta de nuevo en unos minutos.</p>}
      <button className="cta" type="submit" disabled={st === "sending"}>{st === "sending" ? "Enviando…" : "Enviar mensaje"}</button>
    </form>
  );
}
