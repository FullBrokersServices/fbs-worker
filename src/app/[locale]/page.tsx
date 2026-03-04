import { useTranslations } from 'next-intl';
import CurrencyTicker from '@/components/ui/CurrencyTicker';
import QuoteCalculator from '@/components/hero/QuoteCalculator';
import StatsBar from '@/components/sections/StatsBar';
import HowItWorks from '@/components/sections/HowItWorks';
import Archetypes from '@/components/sections/Archetypes';
import TrustSignals from '@/components/sections/TrustSignals';
import FaqSection from '@/components/sections/FaqSection';
import FinalCta from '@/components/sections/FinalCta';
import AnimatedSection from '@/components/ui/AnimatedSection';
import HeroAnimatedHook from '@/components/hero/HeroAnimatedHook';
import SlideInWrapper from '@/components/ui/SlideInWrapper';

export default function Home() {
  const t = useTranslations('Hero');

  return (
    <main className="min-h-screen pt-20">
      <CurrencyTicker />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 relative z-10 overflow-hidden">
        {/* Background Blobs (Parallax could be added here later) */}
        <div className="absolute top-0 left-[-10%] w-[40%] h-[600px] rounded-full bg-gold-radial opacity-10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[500px] rounded-full bg-gold-radial opacity-10 blur-[100px] pointer-events-none" />

        <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">

          <HeroAnimatedHook />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 text-left">
            <SlideInWrapper direction="left" delay={0.2} className="lg:col-span-7">
              <QuoteCalculator />
            </SlideInWrapper>

            <SlideInWrapper direction="right" delay={0.3} className="lg:col-span-5 space-y-6">
              <p className="text-xl text-slate-400">
                {t('body')}
              </p>

              <div className="flex flex-col gap-4">
                {[
                  "KYC Verified & AML Checked",
                  "Safe & Legal Transfers",
                  "Tasas y Datos Institucionales (Dasbanq)"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gold-light/80">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gold-deep/20 text-[10px] flex-shrink-0">✓</span>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </SlideInWrapper>
          </div>
        </div>
      </section>

      {/* Home Page Flow - Wrapped in AnimatedSections */}
      <AnimatedSection>
        <StatsBar />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection>
        <Archetypes />
      </AnimatedSection>

      <AnimatedSection>
        <TrustSignals />
      </AnimatedSection>

      <AnimatedSection>
        <FaqSection />
      </AnimatedSection>

      <AnimatedSection>
        <FinalCta />
      </AnimatedSection>
    </main>
  );
}

