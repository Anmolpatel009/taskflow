import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FreelancerList from '@/components/freelancer-list';

export default function ShowAllPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Freelancer Directory</h1>
            <p className="text-lg text-muted-foreground mt-2">Browse all available freelancers on the platform.</p>
        </div>
        <FreelancerList />
      </main>
      <Footer />
    </div>
  );
}
