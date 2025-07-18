
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

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
                data-ai-hint="woman developer"
                alt="Woman developer"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="absolute h-80 w-80 bg-white/30 backdrop-blur-sm rounded-lg shadow-2xl z-20 flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.pexels.com/photos/4623519/pexels-photo-4623519.jpeg"
                    data-ai-hint="business meeting"
                    alt="Business meeting"
                    fill
                    className="object-cover"
                />
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
