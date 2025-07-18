import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    title: 'Build Together',
    description: 'Post your idea in seconds and tap into a hive of skilled freelancers ready to collaborate. Connect with like-minded pros who join your project, share expertise, and co-create in real-time.',
    meta: '158+ Ideas',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'collaboration teamwork'
  },
  {
    title: 'The 1% Club',
    description: 'Want elite results? The top 1% of talent is here. No middlemen. No mediocre work. Just masters who execute and get high-value clients who respect your craft.',
    meta: 'Top 1% Talent',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'professional expert'
  },
  {
    title: 'Real Time Updates',
    description: 'Instant notifications – Be the first to bid when high-paying tasks drop. Less competition, smarter matching, and faster hiring. Your project gets seen and claimed by top talent immediately.',
    meta: 'Instant Alerts',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'notification bell'
  },
  {
    title: 'Location Based Matching',
    description: 'Post a project and get matched with elite talent instantly. Hire the top 1% of freelancers in your city, or work with the best, anywhere. Same timezone means real-time collaboration.',
    meta: 'Local & Global',
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'map location'
  },
];

export default function Services() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Popular Services</h2>
          <p className="text-lg text-muted-foreground mt-2">Browse the most in-demand services</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="relative h-48 w-full">
                  {/* TODO: Replace with a relevant image for this service that highlights the human element */}
                  <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" data-ai-hint={service.dataAiHint} />
              </div>
              <CardHeader>
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                {/* TODO: Update the description to be more benefit-oriented and emphasize the human connection */}
                <CardDescription className="flex-grow">{service.description}</CardDescription>
                <div className="text-sm text-muted-foreground mt-4 flex items-center pt-4 border-t">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>{service.meta}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
