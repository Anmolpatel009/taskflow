
'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/types';
import ClientDashboard from '@/components/dashboard/client-dashboard';
import FreelancerDashboard from '@/components/dashboard/freelancer-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardPageProps {
    user: User | null;
    loading: boolean;
}

export default function DashboardPage({ user, loading }: DashboardPageProps) {

  if (loading) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
            <Skeleton className="h-64 w-full" />
        </div>
    );
  }

  return (
    <div className="bg-secondary/30">
        {user?.role === 'client' && <ClientDashboard user={user} />}
        {user?.role === 'freelancer' && <FreelancerDashboard user={user} />}
    </div>
  );
}
