import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedHero from '@/components/AnimatedHero';
import CharacterSection from '@/components/CharacterSection';
import MessageSection from '@/components/MessageSection';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Enable smooth scrolling
    gsap.to(window, {duration: 0.3, scrollTo: 0});
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <AnimatedHero />
      <CharacterSection />
      <MessageSection />
    </main>
  );
};

export default Index;
