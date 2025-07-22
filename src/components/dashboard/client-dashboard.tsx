
'use client';

import { useState } from 'react';
import type { User } from '@/types';
import { Button } from '@/components/ui/button';
import StatCard from './stat-card';
import { Briefcase, IndianRupee, PlusCircle, CheckCircle } from 'lucide-react';
import TaskSubmissionModal from '../task-submission-modal';
import ClientTaskList from './client-task-list';

interface ClientDashboardProps {
  user: User;
}

export default function ClientDashboard({ user }: ClientDashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground mt-1">Here's your client dashboard overview.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} size="lg">
            <PlusCircle className="mr-2" />
            Post a New Task
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Projects"
            value={user.activeProjects || 0}
            icon={Briefcase}
            description="Tasks currently in progress."
          />
          <StatCard
            title="Completed Projects"
            value={user.completedProjects || 0}
            icon={CheckCircle}
            description="Tasks you have completed."
          />
          <StatCard
            title="Total Spent"
            value={`₹${(user.totalEarnings || 0).toLocaleString()}`}
            icon={IndianRupee}
            description="Total amount spent on tasks."
          />
          <StatCard
            title="Unread Messages"
            value={user.unreadMessages || 0}
            icon={IndianRupee}
            description="Messages from freelancers."
          />
        </div>

        <div className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">Your Posted Tasks</h2>
            <ClientTaskList clientId={user.id} />
        </div>
      </div>
      <TaskSubmissionModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        user={user}
      />
    </>
  );
}
