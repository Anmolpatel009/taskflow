
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const ALL_SKILLS = [
  'React', 'Node.js', 'UI/UX', 'Graphic Design', 'SEO', 'Copywriting', 'Python',
  'Java', 'Go', 'Firebase', 'Next.js', 'Testing', 'AI/ML'
];

// Function to generate a random position and animation style
const generateSkillStyle = () => {
  // Use a wider range (e.g., 0-90%) to fill the container more evenly
  const duration = Math.random() * 8 + 10; // Random duration between 10-18s
  const delay = Math.random() * 5; // Random delay up to 5s
  const top = `${Math.random() * 85}%`; // Random top between 0-85% to avoid overflow
  const left = `${Math.random() * 85}%`; // Random left between 0-85% to avoid overflow
  
  return {
    animation: `float ${duration}s ease-in-out ${delay}s infinite`,
    top,
    left,
  };
};

export default function Hero() {
  const [visibleSkills, setVisibleSkills] = useState<{ skill: string; style: React.CSSProperties; }[]>([]);

  useEffect(() => {
    // Start with the first skill
    setVisibleSkills([{ skill: ALL_SKILLS[0], style: generateSkillStyle() }]);

    const interval = setInterval(() => {
      setVisibleSkills(currentSkills => {
        if (currentSkills.length < ALL_SKILLS.length) {
          const newSkill = ALL_SKILLS[currentSkills.length];
          return [...currentSkills, { skill: newSkill, style: generateSkillStyle() }];
        }
        clearInterval(interval);
        return currentSkills;
      });
    }, 2500); // Add a new skill every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-background text-foreground py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif-display font-bold mb-6 text-foreground leading-tight">
              Hire the best developers. Vetted by us, perfect for you!
            </h1>
            <p className="text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-8 text-muted-foreground">
              TalentFlow is the only freelancer platform that connects you with top-tier talent. We help customers solve any development problem.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Button asChild size="lg">
                    <Link href="/signup">Join Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/nearby">Find Nearby Freelancers</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/showall">Show All Freelancers</Link>
                </Button>
            </div>
             <p className="text-sm text-muted-foreground mt-4 text-center md:text-left">
                Free estimate &nbsp;•&nbsp; No obligation to hire &nbsp;•&nbsp; 100% risk-free
            </p>
          </div>

          <div className="relative w-full h-96 hidden md:flex items-center justify-center">
              {/* Back circular image */}
              <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full overflow-hidden shadow-lg z-10">
                  <Image
                      src="https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      data-ai-hint="earth globe"
                      alt="Image of the Earth"
                      fill
                      className="object-cover"
                  />
              </div>
              {/* Front square image */}
              <div className="absolute top-0 left-10 h-64 w-64 rounded-lg overflow-hidden shadow-2xl z-20">
                  <Image
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      data-ai-hint="man developer"
                      alt="Male developer"
                      fill
                      className="object-cover"
                  />
              </div>
              {/* Skill cloud square */}
              <div className="absolute top-1/2 left-1/2 h-40 w-40 bg-background/80 backdrop-blur-sm transform -translate-x-1/2 -translate-y-1/2 z-30 shadow-2xl rounded-lg overflow-hidden">
                <div className="relative w-full h-full">
                  {visibleSkills.map(({ skill, style }) => (
                    <div
                      key={skill}
                      className="absolute"
                      style={style}
                    >
                       <div className="relative flex items-center justify-center h-16 w-16">
                         <div className="absolute h-full w-full rounded-full animate-rgb-border"></div>
                         <div className="relative flex items-center justify-center h-14 w-14 rounded-full bg-background/90 shadow-md">
                            <span className="text-xs font-semibold text-foreground opacity-100">
                              {skill}
                            </span>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
