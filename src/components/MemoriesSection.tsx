import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import memoryBaking from '@/assets/memory-baking.jpg';
import memoryBicycle from '@/assets/memory-bicycle.jpg';
import memoryStargazing from '@/assets/memory-stargazing.jpg';
import memoryTreehouse from '@/assets/memory-treehouse.jpg';

gsap.registerPlugin(ScrollTrigger);

const MemoriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const decorationRefs = useRef<(HTMLDivElement | null)[]>([]);

  const memories = [
    {
      image: memoryBaking,
      title: "Baking Together",
      description: "Sweet moments in the kitchen, making cookies and memories that last forever. Flour fights and giggles included!",
      color: "from-orange-400 to-pink-400"
    },
    {
      image: memoryBicycle,
      title: "First Bike Ride",
      description: "The pride in dad's eyes as he teaches balance, courage, and the joy of pedaling into new adventures.",
      color: "from-blue-400 to-cyan-400"
    },
    {
      image: memoryStargazing,
      title: "Stargazing Nights",
      description: "Under the cosmic blanket, sharing dreams and pointing out constellations while creating magical moments.",
      color: "from-purple-400 to-indigo-400"
    },
    {
      image: memoryTreehouse,
      title: "Building Dreams",
      description: "Hammer in hand, building more than just a treehouse - constructing a foundation of teamwork and imagination.",
      color: "from-green-400 to-teal-400"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardRefs.current.filter(Boolean);
    const decorations = decorationRefs.current.filter(Boolean);

    if (!section || !title) return;

    // Title animation
    gsap.fromTo(title, 
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards animation with stagger
    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            y: 100,
            scale: 0.8,
            rotation: index % 2 === 0 ? -5 : 5
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          }
        );

        // Hover animation
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            rotation: index % 2 === 0 ? 2 : -2,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Store cleanup functions
        (card as any).cleanup = () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });

    // Decorative elements animation
    decorations.forEach((decoration, index) => {
      if (decoration) {
        gsap.to(decoration, {
          rotation: 360,
          duration: 20 + index * 5,
          ease: "none",
          repeat: -1
        });

        gsap.to(decoration, {
          y: -15,
          duration: 3 + index,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1
        });
      }
    });

    return () => {
      cards.forEach(card => {
        if (card && (card as any).cleanup) {
          (card as any).cleanup();
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  const setDecorationRef = (index: number) => (el: HTMLDivElement | null) => {
    decorationRefs.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Decorative floating elements */}
      <div 
        ref={setDecorationRef(0)}
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
      />
      <div 
        ref={setDecorationRef(1)}
        className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full blur-xl"
      />
      <div 
        ref={setDecorationRef(2)}
        className="absolute bottom-40 left-20 w-24 h-24 bg-primary-glow/10 rounded-full blur-xl"
      />
      <div 
        ref={setDecorationRef(3)}
        className="absolute bottom-20 right-10 w-18 h-18 bg-secondary/10 rounded-full blur-xl"
      />

      <div className="max-w-7xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-foreground"
        >
          Precious
          <span className="bg-gradient-hero bg-clip-text text-transparent ml-4">
            Memories
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {memories.map((memory, index) => (
            <Card 
              key={index}
              ref={setCardRef(index)}
              className="overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-warm transition-all duration-500 group"
            >
              <div className="relative">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={memory.image}
                    alt={`Beautiful anime illustration of ${memory.title.toLowerCase()}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${memory.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-glow transition-colors duration-300">
                    {memory.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed text-sm">
                    {memory.description}
                  </p>
                </div>

                {/* Cute decorative heart */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional cute message */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every moment shared, every laugh echoed, every hug given - these are the treasures 
            that make fathers truly special. Here's to all the beautiful memories yet to be made! ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default MemoriesSection;