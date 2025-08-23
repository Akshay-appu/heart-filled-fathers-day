import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FatherDaughterLoader from '@/components/FatherDaughterLoader';
import AnimatedHero from '@/components/AnimatedHero';
import CharacterSection from '@/components/CharacterSection';
import MemoriesSection from '@/components/MemoriesSection';
import FatherQuotesSection from '@/components/FatherQuotesSection';
import MessageSection from '@/components/MessageSection';
import CelebrationSection from '@/components/CelebrationSection';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for cute effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Enable smooth scrolling
    gsap.to(window, {duration: 0.3, scrollTo: 0});
    
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  if (isLoading) {
    return <FatherDaughterLoader />;
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <AnimatedHero />
      <CharacterSection />
      <MemoriesSection />
      <FatherQuotesSection />
      <MessageSection />
      <CelebrationSection />
    </main>
  );
};

export default Index;
