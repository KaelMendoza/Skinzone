import Store from "../components/Store";
import { getSkins } from "../lib/skins";

export const dynamic = "force-dynamic";

export default async function Page() {
  const skins = await getSkins();
  return <Store skins={skins} />;
}
