import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/sections/Hero";
import TrustedBy from "../components/sections/TrustedBy";
import Features from "../components/sections/Features";
import MockInterview from "../components/sections/MockInterview";
import Stats from "../components/sections/Stats";
import HowItWorks from "../components/sections/HowItWorks";
import CTA from "../components/sections/CTA";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <MockInterview />
        <Stats />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
