
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import TaskList from '@/components/task-list';
import TaskSubmissionModal from '@/components/task-submission-modal';
import AiRecommender from '@/components/sections/ai-recommender';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        
        <section className="py-16 lg:py-24 bg-secondary">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">Latest Tasks</h2>
                        <p className="text-lg text-muted-foreground mt-2">Find your next opportunity from the latest posted tasks.</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-2">
                         <Button onClick={() => setIsModalOpen(true)}>Post a Task</Button>
                         <Button variant="outline" asChild>
                            <Link href="/find-work">View All Tasks</Link>
                         </Button>
                    </div>
                </div>
                <TaskList />
            </div>
        </section>

        <AiRecommender />
      </main>
      <Footer />
      <TaskSubmissionModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
