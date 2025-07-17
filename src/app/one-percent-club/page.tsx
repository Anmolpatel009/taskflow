import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function OnePercentClubPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold font-headline mb-4">The 1% Club</h1>
        <p className="text-lg text-muted-foreground">This is a placeholder page for our exclusive top-tier talent program.</p>
      </main>
      <Footer />
    </div>
  );
}
