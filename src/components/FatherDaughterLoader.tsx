import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart } from 'lucide-react';

const FatherDaughterLoader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const fatherRef = useRef<HTMLDivElement>(null);
  const daughterRef = useRef<HTMLDivElement>(null);
  const heartRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const father = fatherRef.current;
    const daughter = daughterRef.current;
    const hearts = heartRefs.current.filter(Boolean);
    const text = textRef.current;

    if (!loader || !father || !daughter || !text) return;

    // Create timeline
    const tl = gsap.timeline({ repeat: -1 });

    // Initial setup
    gsap.set([father, daughter], { scale: 0, opacity: 0 });
    gsap.set(hearts, { scale: 0, opacity: 0 });
    gsap.set(text, { opacity: 0, y: 20 });

    // Animation sequence
    tl.to([father, daughter], {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: 0.2
    })
    .to(hearts, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)",
      stagger: 0.1
    }, "-=0.4")
    .to(text, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2")
    .to(hearts, {
      y: -20,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.1,
      yoyo: true,
      repeat: 1
    }, "+=0.5")
    .to([father, daughter], {
      rotation: 10,
      duration: 0.3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    }, "-=1")
    .to({}, { duration: 1 }); // Pause before repeat

    // Floating animation for loader
    gsap.to(loader, {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    return () => {
      tl.kill();
    };
  }, []);

  const setHeartRef = (index: number) => (el: HTMLDivElement | null) => {
    heartRefs.current[index] = el;
  };

  return (
    <div className="fixed inset-0 bg-gradient-warm flex items-center justify-center z-50">
      <div ref={loaderRef} className="text-center">
        {/* Main characters */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          {/* Father */}
          <div 
            ref={fatherRef}
            className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow relative"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white/40 rounded-full" />
            </div>
            {/* Father's hair */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-secondary rounded-t-full" />
          </div>

          {/* Hearts between them */}
          <div className="flex flex-col space-y-2">
            <div ref={setHeartRef(0)} className="flex justify-center">
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </div>
            <div ref={setHeartRef(1)} className="flex justify-center">
              <Heart className="w-6 h-6 text-accent fill-accent" />
            </div>
            <div ref={setHeartRef(2)} className="flex justify-center">
              <Heart className="w-4 h-4 text-primary-glow fill-primary-glow" />
            </div>
          </div>

          {/* Daughter */}
          <div 
            ref={daughterRef}
            className="w-16 h-16 bg-gradient-to-br from-accent to-primary-glow rounded-full flex items-center justify-center shadow-card relative"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white/40 rounded-full" />
            </div>
            {/* Daughter's pigtails */}
            <div className="absolute -top-1 -left-2 w-6 h-6 bg-primary rounded-full" />
            <div className="absolute -top-1 -right-2 w-6 h-6 bg-primary rounded-full" />
          </div>
        </div>

        {/* Loading text */}
        <div ref={textRef} className="space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Loading Love...
          </h3>
          <p className="text-muted-foreground">
            Preparing something special for Father's Day
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-primary-glow rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};

export default FatherDaughterLoader;