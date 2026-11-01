import { Header } from './components/sections/Header';
import { HeroSection } from './components/sections/HeroSection';
import { StorySection } from './components/sections/StorySection';
import { LuluUniverseSection } from './components/sections/LuluUniverseSection';
import { BookSection } from './components/sections/BookSection';
import { KitSection } from './components/sections/KitSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { AudienceSection } from './components/sections/AudienceSection';
import { TestimonialSection } from './components/sections/TestimonialSection';
import { OfferSection } from './components/sections/OfferSection';
import { FAQSection } from './components/sections/FAQSection';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/sections/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <HeroSection />
        <StorySection />
        <LuluUniverseSection />
        <BookSection />
        <KitSection />
        <ExperienceSection />
        <AudienceSection />
        <TestimonialSection />
        <OfferSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
