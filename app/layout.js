import "./globals.css";

export const metadata = {
  title: "SkinZone | Compra skins de tus juegos favoritos",
  description: "Skins de Fortnite, Free Fire, CS:GO, Valorant y más al mejor precio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
