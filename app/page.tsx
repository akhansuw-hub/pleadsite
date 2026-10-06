import AtAGlance from "@/components/AtAGlance";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Hero from "@/components/Hero";
import JudgementExamples from "@/components/JudgementExamples";
import PrivacySafety from "@/components/PrivacySafety";
import RevealObserver from "@/components/RevealObserver";
import Steps from "@/components/Steps";
import TheCourt from "@/components/TheCourt";

export default function Home() {
  return (
    <>
      <Hero />
      <Steps />
      <TheCourt />
      <JudgementExamples />
      <AtAGlance />
      <PrivacySafety />
      <FAQ />
      <FinalCTA />
      <RevealObserver />
    </>
  );
}
