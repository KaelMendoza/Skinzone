import Store from "../components/Store";
import { getSkins } from "../lib/skins";

export const dynamic = "force-dynamic";

export default async function Page() {
  const skins = await getSkins();
  return (
    <>
      <Store skins={skins} />
      <p style={{ textAlign: "center", padding: "12px", color: "#b9b0a6" }}>
        Proyecto final de la materia Ingeniería de software - Mendoza Alcantar Dante Tlacaelel - 225361601
      </p>
    </>
  );
}