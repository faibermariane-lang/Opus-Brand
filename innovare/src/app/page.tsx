import { Preloader, preloaderScript } from "@/components/interactive/Preloader";
import { About } from "@/components/sections/About";
import { Audience } from "@/components/sections/Audience";
import { Brazil } from "@/components/sections/Brazil";
import { Contact } from "@/components/sections/Contact";
import { DiagnosticSection } from "@/components/sections/DiagnosticSection";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Numbers } from "@/components/sections/Numbers";
import { Pillars } from "@/components/sections/Pillars";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Tenders } from "@/components/sections/Tenders";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
      <Preloader />
      <JsonLd />
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Pillars />
        <About />
        <Services />
        <HowItWorks />
        <Brazil />
        <Tenders />
        <Audience />
        <Numbers />
        <Team />
        <Faq />
        <DiagnosticSection />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
