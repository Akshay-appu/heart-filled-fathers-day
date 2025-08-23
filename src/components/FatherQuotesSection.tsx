import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, Gift, Camera, Music, Book } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FatherQuotesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quotesRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const quotes = [
    {
      text: "A father is someone you look up to no matter how tall you grow.",
      author: "Unknown",
      icon: Star,
      color: "from-yellow-400 to-orange-400"
    },
    {
      text: "The quality of a father can be seen in the goals, dreams and aspirations he sets not only for himself, but for his family.",
      author: "Reed Markham",
      icon: Heart,
      color: "from-red-400 to-pink-400"
    },
    {
      text: "A father's love is forever imprinted on his child's heart.",
      author: "Jennifer Williamson",
      icon: Music,
      color: "from-purple-400 to-blue-400"
    },
    {
      text: "Being a great father is like shaving. No matter how good you shaved today, you have to do it again tomorrow.",
      author: "Reed Markham",
      icon: Book,
      color: "from-green-400 to-teal-400"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const quoteElements = quotesRef.current.filter(Boolean);
    const iconElements = iconRefs.current.filter(Boolean);

    if (!section || !title) return;

    // Title animation
    gsap.fromTo(title, 
      { opacity: 0, y: 50 },
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

    // Quotes animation
    quoteElements.forEach((quote, index) => {
      if (quote) {
        gsap.fromTo(quote, 
          { 
            opacity: 0, 
            x: index % 2 === 0 ? -100 : 100,
            rotation: index % 2 === 0 ? -5 : 5
          },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quote,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          }
        );
      }
    });

    // Icons floating animation
    iconElements.forEach((icon, index) => {
      if (icon) {
        gsap.to(icon, {
          y: -10,
          duration: 2 + index * 0.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3
        });

        gsap.to(icon, {
          rotation: 360,
          duration: 15 + index * 3,
          ease: "none",
          repeat: -1
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const setQuoteRef = (index: number) => (el: HTMLDivElement | null) => {
    quotesRef.current[index] = el;
  };

  const setIconRef = (index: number) => (el: HTMLDivElement | null) => {
    iconRefs.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-warm relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-foreground"
        >
          Words of
          <span className="bg-gradient-hero bg-clip-text text-transparent ml-4">
            Wisdom
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {quotes.map((quote, index) => {
            const IconComponent = quote.icon;
            return (
              <Card 
                key={index}
                ref={setQuoteRef(index)}
                className="p-8 bg-gradient-card border-0 shadow-card hover:shadow-warm transition-all duration-300 relative overflow-hidden group"
              >
                {/* Background icon */}
                <div 
                  ref={setIconRef(index)}
                  className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${quote.color} rounded-full flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                <div className="relative z-10">
                  <p className="text-lg text-foreground leading-relaxed mb-6 italic">
                    "{quote.text}"
                  </p>
                  <p className="text-muted-foreground font-semibold">
                    — {quote.author}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-primary/30 rounded-full animate-pulse" />
                <div className="absolute top-8 left-4 w-2 h-2 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FatherQuotesSection;