
import type { User } from '@/types';
import { Button } from '@/components/ui/button';
import StatCard from './stat-card';
import { Briefcase, IndianRupee, Search, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface FreelancerDashboardProps {
  user: User;
}

export default function FreelancerDashboard({ user }: FreelancerDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground mt-1">Here's your freelancer dashboard overview.</p>
        </div>
        <Button asChild size="lg">
            <Link href="/find-work">
                <Search className="mr-2" />
                Find New Work
            </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value={user.activeProjects || 0}
          icon={Briefcase}
          description="Tasks you are currently working on."
        />
        <StatCard
          title="Completed Projects"
          value={user.completedProjects || 0}
          icon={CheckCircle}
          description="Tasks you have successfully delivered."
        />
        <StatCard
          title="Total Earnings"
          value={`₹${(user.totalEarnings || 0).toLocaleString()}`}
          icon={IndianRupee}
          description="Your total earnings on the platform."
        />
        <StatCard
          title="Tasks Applied"
          value={user.tasksApplied || 0}
          icon={Search}
          description="Number of tasks you've shown interest in."
        />
      </div>
      
      <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline">Your Active Tasks</h2>
          <div className="text-center py-20 border-2 border-dashed rounded-lg bg-background">
              <h3 className="text-xl font-semibold text-muted-foreground">No active tasks.</h3>
              <p className="text-muted-foreground mt-2">Tasks you're working on will appear here.</p>
          </div>
      </div>
    </div>
  );
}
