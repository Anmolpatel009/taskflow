import Link from 'next/link';
import { MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 animate-fade-in-down">
          The Best Talent for Your Business
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-primary-foreground/80 animate-fade-in-up">
          Connect with top freelancers for your projects or find exciting work opportunities
        </p>
        <div className="flex justify-center gap-4 flex-wrap custom-btn-container">
          <Link href="/nearby" passHref>
            <button className="custom-btn">
              <MapPin className="h-4 w-4" />
              Find Nearby
            </button>
          </Link>
          <Link href="/showall" passHref>
            <button className="custom-btn">
              <Users className="h-4 w-4" />
              Show All
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
