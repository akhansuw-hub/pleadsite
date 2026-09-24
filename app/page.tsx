import AtAGlance from "@/components/AtAGlance";
import CourtDemo from "@/components/CourtDemo";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import JudgementExamples from "@/components/JudgementExamples";
import JurorPanel from "@/components/JurorPanel";
import PrivacySafety from "@/components/PrivacySafety";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <CourtDemo />
      <JurorPanel />
      <AtAGlance />
      <JudgementExamples />
      <PrivacySafety />
      <FAQ />
      <FinalCTA />
      <RevealObserver />
    </>
  );
}
