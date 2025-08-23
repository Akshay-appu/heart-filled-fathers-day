import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import fatherSonImage from '@/assets/father-son-anime.jpg';
import fatherDaughterImage from '@/assets/father-daughter-anime.jpg';

gsap.registerPlugin(ScrollTrigger);

const CharacterSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;

    if (!section || !title || !card1 || !card2) return;

    // Title animation
    gsap.fromTo(title, 
      { 
        opacity: 0, 
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards staggered animation
    gsap.fromTo([card1, card2], 
      { 
        opacity: 0, 
        y: 80,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hover animations for cards
    const handleCard1Hover = () => {
      gsap.to(card1, {
        scale: 1.05,
        rotation: 2,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleCard1Leave = () => {
      gsap.to(card1, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleCard2Hover = () => {
      gsap.to(card2, {
        scale: 1.05,
        rotation: -2,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleCard2Leave = () => {
      gsap.to(card2, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card1.addEventListener('mouseenter', handleCard1Hover);
    card1.addEventListener('mouseleave', handleCard1Leave);
    card2.addEventListener('mouseenter', handleCard2Hover);
    card2.addEventListener('mouseleave', handleCard2Leave);

    return () => {
      card1.removeEventListener('mouseenter', handleCard1Hover);
      card1.removeEventListener('mouseleave', handleCard1Leave);
      card2.removeEventListener('mouseenter', handleCard2Hover);
      card2.removeEventListener('mouseleave', handleCard2Leave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-warm">
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-foreground"
        >
          Bonds That Last
          <span className="bg-gradient-hero bg-clip-text text-transparent ml-4">
            Forever
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Card 
            ref={card1Ref}
            className="overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-warm transition-all duration-300"
          >
            <div className="relative">
              <img 
                src={fatherSonImage}
                alt="Anime father and son sharing a beautiful moment together"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Father & Son</h3>
                <p className="text-white/90 leading-relaxed">
                  A bond built on shared adventures, life lessons, and unconditional love. 
                  Together, they create memories that will last a lifetime.
                </p>
              </div>
            </div>
          </Card>

          <Card 
            ref={card2Ref}
            className="overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-warm transition-all duration-300"
          >
            <div className="relative">
              <img 
                src={fatherDaughterImage}
                alt="Anime father and daughter enjoying a peaceful moment together"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Father & Daughter</h3>
                <p className="text-white/90 leading-relaxed">
                  A precious relationship filled with gentle moments, shared stories, 
                  and the security of a father's protective love.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CharacterSection;