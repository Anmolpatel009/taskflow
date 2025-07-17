'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TaskSubmissionModal from '@/components/task-submission-modal';
import TaskList from '@/components/task-list';

export default function TaskManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="tasks" className="py-16 lg:py-24">
      <div className="container">
        <div className="bg-card p-6 md:p-8 rounded-lg shadow-md border">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">Open Tasks</h2>
          <div className="mb-6">
            <Button size="lg" className="w-full md:w-auto" onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-5 w-5" />
              Post a New Task
            </Button>
          </div>
          <TaskList />
        </div>
        <TaskSubmissionModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>
    </section>
  );
}
