import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Star, Gift, Camera, MessageCircle, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CelebrationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activities = [
    {
      icon: Heart,
      title: "Share Love Notes",
      description: "Write heartfelt messages to show your appreciation",
      color: "from-red-400 to-pink-400",
      buttonText: "Create Note"
    },
    {
      icon: Camera,
      title: "Photo Memories",
      description: "Capture and cherish special moments together",
      color: "from-blue-400 to-cyan-400",
      buttonText: "Take Photo"
    },
    {
      icon: Gift,
      title: "Special Gifts",
      description: "Surprise dad with something meaningful",
      color: "from-green-400 to-teal-400",
      buttonText: "Find Gifts"
    },
    {
      icon: Star,
      title: "Create Traditions",
      description: "Start new family traditions this Father's Day",
      color: "from-yellow-400 to-orange-400",
      buttonText: "Get Ideas"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardRefs.current.filter(Boolean);
    const buttons = buttonRefs.current.filter(Boolean);
    const floating = floatingRefs.current.filter(Boolean);

    if (!section || !title) return;

    // Title animation with bounce
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

    // Cards grid animation
    cards.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            y: 60,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.15
          }
        );

        // Hover effects
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.08,
            y: -15,
            duration: 0.4,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        // Store cleanup
        (card as any).cleanup = () => {
          card.removeEventListener('mouseenter', handleMouseEnter);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });

    // Button pulse animation
    buttons.forEach((button, index) => {
      if (button) {
        gsap.to(button, {
          scale: 1.05,
          duration: 1.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3
        });
      }
    });

    // Floating decorative elements
    floating.forEach((element, index) => {
      if (element) {
        gsap.to(element, {
          y: -20,
          x: index % 2 === 0 ? -10 : 10,
          duration: 3 + index,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1
        });

        gsap.to(element, {
          rotation: 360,
          duration: 20 + index * 5,
          ease: "none",
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

  const setButtonRef = (index: number) => (el: HTMLButtonElement | null) => {
    buttonRefs.current[index] = el;
  };

  const setFloatingRef = (index: number) => (el: HTMLDivElement | null) => {
    floatingRefs.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Floating decorative elements */}
      <div 
        ref={setFloatingRef(0)}
        className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full blur-xl"
      />
      <div 
        ref={setFloatingRef(1)}
        className="absolute top-40 right-20 w-20 h-20 bg-accent/10 rounded-full blur-xl"
      />
      <div 
        ref={setFloatingRef(2)}
        className="absolute bottom-40 left-20 w-12 h-12 bg-primary-glow/15 rounded-full blur-xl"
      />
      <div 
        ref={setFloatingRef(3)}
        className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/10 rounded-full blur-xl"
      />

      <div className="max-w-7xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-foreground"
        >
          Celebrate
          <span className="bg-gradient-hero bg-clip-text text-transparent ml-4">
            Together
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <Card 
                key={index}
                ref={setCardRef(index)}
                className="p-6 bg-gradient-card border-0 shadow-card text-center relative overflow-hidden group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${activity.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:shadow-warm transition-all duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {activity.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {activity.description}
                </p>
                
                <Button 
                  ref={setButtonRef(index)}
                  className={`w-full bg-gradient-to-r ${activity.color} text-white border-0 hover:scale-105 transition-all duration-300 font-semibold`}
                >
                  {activity.buttonText}
                </Button>

                {/* Cute sparkle effect */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-ping opacity-60" />
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-accent rounded-full animate-pulse" />
              </Card>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-gradient-card rounded-3xl p-8 shadow-warm max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Make This Father's Day Special! 💝
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Download our Father's Day celebration guide and create unforgettable memories 
              with your favorite person in the world.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-hero text-white border-0 hover:scale-105 px-8 py-4 text-lg font-semibold rounded-2xl shadow-glow transition-all duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Get Celebration Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CelebrationSection;