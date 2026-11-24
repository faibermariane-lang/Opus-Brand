import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legalPages } from "@/content/site";

const page = legalPages.terms;

export const metadata: Metadata = { title: page.title, description: page.intro, alternates: { canonical: "/termos-de-uso" } };

export default function Page() {
  return <LegalPage title={page.title} intro={page.intro} sections={page.sections} />;
}
