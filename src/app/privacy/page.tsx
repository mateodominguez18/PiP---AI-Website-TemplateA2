import { getSiteSettings } from "@/lib/queries";
import { LegalContent } from "@/components/LegalContent";

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  return (
    <LegalContent
      type="privacy"
      studioName={settings?.studioName}
      email={settings?.email}
      address={settings?.address}
      piva={settings?.piva}
    />
  );
}
