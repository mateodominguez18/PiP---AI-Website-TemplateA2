import { getSiteSettings } from "@/lib/queries";
import { LegalContent } from "@/components/LegalContent";

export default async function CookiePage() {
  const settings = await getSiteSettings();
  return (
    <LegalContent
      type="cookie"
      studioName={settings?.studioName}
      email={settings?.email}
      address={settings?.address}
      piva={settings?.piva}
    />
  );
}
