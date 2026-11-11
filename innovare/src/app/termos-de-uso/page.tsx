import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/content/site";

export const metadata: Metadata = { title: legalPages.terms.title, alternates: { canonical: "/termos-de-uso" } };

export default function Page() {
  return <LegalPage title={legalPages.terms.title} fillKey="termsOfUse" />;
}
