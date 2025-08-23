import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-background.jpg';

gsap.registerPlugin(ScrollTrigger);

const AnimatedHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const button = buttonRef.current;
    const overlay = overlayRef.current;

    if (!hero || !title || !subtitle || !button || !overlay) return;

    // Initial animation timeline
    const tl = gsap.timeline();

    // Set initial states
    gsap.set([title, subtitle, button], { 
      opacity: 0, 
      y: 50 
    });
    gsap.set(overlay, { 
      opacity: 0 
    });

    // Animate elements in sequence
    tl.to(overlay, { 
      opacity: 1, 
      duration: 1,
      ease: "power2.out" 
    })
    .to(title, { 
      opacity: 1, 
      y: 0, 
      duration: 1.2,
      ease: "power3.out" 
    }, "-=0.5")
    .to(subtitle, { 
      opacity: 1, 
      y: 0, 
      duration: 1,
      ease: "power3.out" 
    }, "-=0.8")
    .to(button, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
      ease: "power3.out" 
    }, "-=0.6");

    // Parallax effect
    gsap.to(hero, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
      />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl"
        >
          Happy
          <span className="bg-gradient-hero bg-clip-text text-transparent ml-4">
            Father's Day
          </span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
        >
          Celebrating the unbreakable bonds between fathers and their children. 
          A day to honor love, guidance, and precious memories.
        </p>
        
        <div ref={buttonRef}>
          <Button 
            size="lg"
            className="bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 backdrop-blur-md px-8 py-6 text-lg font-semibold rounded-2xl shadow-glow transition-all duration-300 hover:scale-105"
          >
            Explore the Journey
          </Button>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-primary/30 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-4 h-4 bg-primary-glow/50 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-10 w-10 h-10 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default AnimatedHero;