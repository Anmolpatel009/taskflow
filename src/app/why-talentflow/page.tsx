
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Award, Users, Rocket, Globe, Briefcase } from 'lucide-react';

const usps = [
  {
    icon: Globe,
    title: 'Hyper-Local Matching',
    description: 'Post a task and instantly notify skilled freelancers in your immediate vicinity. Need to meet for a coffee and brainstorm? No problem. We bridge the gap between digital and physical collaboration.',
  },
  {
    icon: Briefcase,
    title: 'Any Service, On Demand',
    description: 'From house cleaning to high-tech coding, our vast network of local professionals means you can find the right person for literally any job. If it can be done locally, it can be done on TalentFlow.',
  },
   {
    icon: Rocket,
    title: 'Skills First, No Degrees Needed',
    description: 'We believe in the power of practical skills. Our platform is a launchpad for talented individuals to earn money and build a reputation based on their abilities, not their resume.',
  },
  {
    icon: Award,
    title: 'The 1% Club',
    description: 'For mission-critical projects, hire from the best. Our 1% Club consists of elite freelancers who have passed a rigorous 3-round vetting process, ensuring you work with the absolute top talent in India.',
  },
  {
    icon: Users,
    title: 'Build Together Community',
    description: "Have a great idea but need a team? Post your project and find passionate collaborators to build with you from the ground up. Turn your vision into a startup, together.",
  },
  {
    icon: CheckCircle2,
    title: 'Advanced Matching (Coming Soon)',
    description: 'We are developing a cutting-edge algorithm that goes beyond location. It will match you based on availability, specific skills, ratings, and more, for the perfect hire every time.',
  },
];

export default function WhyTalentFlowPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/50">
      <Header />
      <main className="flex-1">
        <section className="container py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Why TalentFlow is Different</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just another freelancer marketplace. We're building a new way for local talent and businesses to connect, collaborate, and grow.
            </p>
        </section>
        
        <section className="container pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {usps.map((usp, index) => (
                    <Card key={index} className="bg-background shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                        <CardHeader className="flex-row items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <usp.icon className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-xl">{usp.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{usp.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
