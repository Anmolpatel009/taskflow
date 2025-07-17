import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import TaskManager from '@/components/sections/task-manager';
import AiRecommender from '@/components/sections/ai-recommender';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <TaskManager />
        <AiRecommender />
      </main>
      <Footer />
    </div>
  );
}
