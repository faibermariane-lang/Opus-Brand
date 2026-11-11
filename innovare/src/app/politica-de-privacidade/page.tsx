import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/content/site";

export const metadata: Metadata = { title: legalPages.privacy.title, alternates: { canonical: "/politica-de-privacidade" } };

export default function Page() {
  return <LegalPage title={legalPages.privacy.title} fillKey="privacyPolicy" />;
}
