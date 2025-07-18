
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const skills = [
  { name: 'Development', position: 'top-4 left-8', duration: '10s' },
  { name: 'UI/UX Design', position: 'top-16 right-4', duration: '12s' },
  { name: 'Copywriting', position: 'top-28 left-12', duration: '9s' },
  { name: 'SEO', position: 'bottom-24 right-10', duration: '11s' },
  { name: 'Marketing', position: 'bottom-12 left-4', duration: '13s' },
  { name: 'Illustration', position: 'bottom-4 right-16', duration: '10s' },
  { name: 'Video Editing', position: 'top-1/2 left-1/4', duration: '11s' },
  { name: 'React', position: 'top-1/3 right-1/4', duration: '12s' },
  { name: 'Node.js', position: 'bottom-1/3 left-1/3', duration: '10s' },
  { name: 'Python', position: 'bottom-1/4 right-1/2', duration: '13s' },
  { name: 'DevOps', position: 'top-10 right-20', duration: '9s' },
];

export default function Hero() {
  return (
    <section className="bg-background text-foreground py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-foreground leading-tight">
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

          <div className="relative h-96 flex items-center justify-center">
            <div className="absolute inset-0 h-96 w-96 rounded-full overflow-hidden shadow-lg z-10 border-8 border-accent/50 mx-auto my-auto">
                <Image
                    src="https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    data-ai-hint="earth space"
                    alt="The Earth from space"
                    fill
                    className="object-cover"
                />
            </div>
            
            <div className="absolute h-80 w-80 bg-white/30 backdrop-blur-sm rounded-lg shadow-2xl z-20 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`absolute ${skill.position} animate-float`}
                    style={{ animationDuration: skill.duration, animationDelay: `${index * 1.5}s` }}
                  >
                    <div className="px-2 py-1 bg-background/80 rounded-full shadow-md text-xs font-semibold text-foreground whitespace-nowrap">
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-2rem] left-[-2rem] w-80 h-80 border-2 border-border/50 rounded-lg"></div>
                <div className="absolute bottom-[-2rem] right-[-2rem] w-80 h-80 border-2 border-border/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
