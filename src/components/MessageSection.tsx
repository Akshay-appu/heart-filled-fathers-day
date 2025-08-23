import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Heart, Gift, Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MessageSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const message = messageRef.current;
    const icons = iconRefs.current.filter(Boolean);
    const button = buttonRef.current;

    if (!section || !title || !message || !button) return;

    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate elements in sequence
    tl.fromTo(title, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(message, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(icons, 
      { opacity: 0, scale: 0, rotation: 45 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.2
      },
      "-=0.4"
    )
    .fromTo(button, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    );

    // Floating animation for icons
    icons.forEach((icon, index) => {
      if (icon) {
        gsap.to(icon, {
          y: -10,
          duration: 2 + index * 0.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const setIconRef = (index: number) => (el: HTMLDivElement | null) => {
    iconRefs.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary-glow/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-8 text-foreground"
        >
          To All The Amazing
          <span className="bg-gradient-hero bg-clip-text text-transparent ml-4">
            Fathers
          </span>
        </h2>

        <div ref={messageRef} className="mb-12">
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
            Thank you for your endless love, unwavering support, and the countless sacrifices 
            you make every day. You are our heroes, our guides, and our greatest inspiration.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Today we celebrate you and the incredible impact you have on our lives. 
            Your love shapes our world and makes us who we are.
          </p>
        </div>

        {/* Animated icons */}
        <div className="flex justify-center items-center space-x-12 mb-12">
          <div 
            ref={setIconRef(0)}
            className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow"
          >
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div 
            ref={setIconRef(1)}
            className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shadow-card"
          >
            <Gift className="w-8 h-8 text-secondary-foreground" />
          </div>
          <div 
            ref={setIconRef(2)}
            className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-card"
          >
            <Camera className="w-8 h-8 text-accent-foreground" />
          </div>
        </div>

        <div ref={buttonRef}>
          <Button 
            size="lg"
            className="bg-gradient-hero text-white border-0 hover:scale-105 px-8 py-6 text-lg font-semibold rounded-2xl shadow-warm transition-all duration-300 animate-glow"
          >
            Share Your Love
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;