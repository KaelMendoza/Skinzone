import "./globals.css";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "SkinZone | Compra skins de tus juegos favoritos",
  description: "Skins de Fortnite, Free Fire, CS:GO, Valorant y más al mejor precio.",
};

export const viewport = { themeColor: "#0b0b0b" };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
