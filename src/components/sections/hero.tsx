
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
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
                      src="https://images.pexels.com/photos/1131458/pexels-photo-1131458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      data-ai-hint="glowing earth"
                      alt="Rotating earth with glowing nodes"
                      fill
                      className="object-cover animate-spin-slow"
                  />
              </div>
              {/* Front square image */}
              <div className="absolute top-0 left-10 h-64 w-64 rounded-lg overflow-hidden shadow-2xl z-20">
                  <Image
                      src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      data-ai-hint="diverse professionals"
                      alt="A pool of diverse professionals"
                      fill
                      className="object-cover"
                  />
              </div>
              {/* New Hero Card */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                  <div className="hero-card animate-tilt-shaking">
                      <div className="hero-card__date">
                          <span className="time">14:34</span>
                          <span className="date">Mon.,21 August</span>
                      </div>
                      <div className="popup">
                          <p className="title">Software update</p>
                          <p>Postponed update</p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
