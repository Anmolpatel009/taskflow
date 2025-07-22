import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import TaskList from '@/components/task-list';

export default function FindWorkPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Find Work</h1>
            <p className="text-lg text-muted-foreground mt-2">Browse and apply for the latest job opportunities.</p>
        </div>
        <TaskList />
      </main>
      <Footer />
    </div>
  );
}
