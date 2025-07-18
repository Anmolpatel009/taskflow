
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';

export default function BuildTogetherPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 text-center">
        <h1 className="text-4xl font-bold font-headline mb-4">Build Together</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Have a revolutionary idea? Find co-creators, innovators, and skilled freelancers to turn your vision into reality.
          This is where collaborations begin and startups are born.
        </p>
         <Button size="lg">Post Your Idea</Button>
         <div className="mt-16 border-t pt-12">
            <h2 className="text-2xl font-bold font-headline mb-6">Featured Projects</h2>
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-muted-foreground">Coming Soon!</h3>
                <p className="text-muted-foreground mt-2">The project showcase is currently under development.</p>
            </div>
         </div>
      </main>
      <Footer />
    </div>
  );
}
