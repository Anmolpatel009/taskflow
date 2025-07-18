import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground py-20 md:py-32">
       <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left text-white">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 animate-fade-in-down drop-shadow-md">
              Find the talent you need, or the work you love.
            </h1>
            <p className="text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-10 text-primary-foreground/90 animate-fade-in-up drop-shadow-sm">
              Our platform connects skilled individuals with businesses and individuals who need their services. From house cleaning to professional consulting, find opportunities and talent that match your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start custom-btn-container">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/showall">Find Talent</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/nearby">Find Work</Link>
              </Button>
            </div>
          </div>

          <div className="relative h-64 md:h-96">
            <Image
              src="https://placehold.co/600x400.png"
              data-ai-hint="diverse professionals working"
              alt="Diverse people using the platform"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
