
'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Task } from '@/types';
import TaskCard from '@/components/task-card';
import { Skeleton } from '@/components/ui/skeleton';

interface ActiveTasksListProps {
    freelancerId: string;
}

export default function ActiveTasksList({ freelancerId }: ActiveTasksListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!freelancerId) return;
    
    // Simplified query to avoid composite index
    const q = query(
        collection(db, 'tasks'), 
        where('assignedTo', '==', freelancerId),
        where('status', '==', 'assigned')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() } as Task);
      });
      // Sort manually in the client
      tasksData.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
      setTasks(tasksData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching active tasks:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [freelancerId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
           <div key={i} className="bg-card rounded-lg p-4 h-[300px]">
             <Skeleton className="h-full w-full" />
           </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg bg-background">
        <h3 className="text-xl font-semibold text-muted-foreground">No active tasks.</h3>
        <p className="text-muted-foreground mt-2">Tasks you're assigned to will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

