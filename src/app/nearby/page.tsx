import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import TaskList from '@/components/task-list';

export default function NearbyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold font-headline mb-4">Nearby Tasks</h1>
        <p className="text-lg text-muted-foreground mb-8">
          This is a placeholder page for finding nearby tasks. A map view could be integrated here.
          For now, it shows all tasks.
        </p>
        <TaskList />
      </main>
      <Footer />
    </div>
  );
}
