
'use client';

import type { User } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, Briefcase, MapPin, Star } from 'lucide-react';

interface FreelancerCardProps {
  freelancer: User;
}

function getInitials(name?: string) {
    if (!name) return 'A';
    const parts = name.split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}


export default function FreelancerCard({ freelancer }: FreelancerCardProps) {
    // The profile data might be nested under `freelancerProfile` or be at the top level.
    const profile = freelancer.freelancerProfile || freelancer;

    const skillsArray = Array.isArray(profile.skills) 
      ? profile.skills 
      : typeof profile.skills === 'string' ? profile.skills.split(',').map(s => s.trim()) : [];

    const servicesArray = typeof profile.services === 'string' 
      ? profile.services.split(',').map(s => s.trim()) 
      : [];
      
    const allSkills = [...servicesArray, ...skillsArray].filter((value, index, self) => self.indexOf(value) === index && value);

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 text-xl">
                <AvatarFallback>{getInitials(freelancer.name)}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="font-headline text-xl">{freelancer.name || 'Anonymous Freelancer'}</CardTitle>
                <CardDescription className="flex items-center gap-1.5 pt-1 text-primary">
                    <Star className="w-4 h-4" /> Top Rated
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <div className="space-y-4">
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><Briefcase className="w-4 h-4" /> Experience</span>
                <span className="font-semibold">{profile?.experience || 0} years</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</span>
                <span className="font-semibold text-right">{freelancer.address || 'Not specified'}</span>
            </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Hourly Rate</span>
                <span className="font-bold text-lg text-primary">₹{Number(profile?.hourlyRate || 0).toLocaleString('en-IN')}</span>
            </div>
        </div>

        <div className="mt-6">
            <h4 className="font-semibold mb-3">Skills & Services</h4>
            <div className="flex flex-wrap gap-2">
                {allSkills.slice(0, 5).map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
                {allSkills.length > 5 && <Badge variant="outline">+{allSkills.length - 5} more</Badge>}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 bg-muted/50 py-3 px-4">
        <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${freelancer.email}`}>
                <Mail className="mr-2 h-4 w-4" /> Message
            </a>
        </Button>
         <Button size="sm" asChild>
             <a href={`https://wa.me/${freelancer.phone}`}>
                <Phone className="mr-2 h-4 w-4" /> Hire Now
            </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
