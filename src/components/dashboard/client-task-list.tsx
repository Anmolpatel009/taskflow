
'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Task } from '@/types';
import TaskCard from '@/components/task-card';
import { Skeleton } from '@/components/ui/skeleton';

interface ClientTaskListProps {
    clientId: string;
}

export default function ClientTaskList({ clientId }: ClientTaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    
    const q = query(
        collection(db, 'tasks'), 
        where('clientId', '==', clientId),
        orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() } as Task);
      });
      setTasks(tasksData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching client tasks:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-4">
            <Skeleton className="h-[250px] w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg bg-background">
        <h3 className="text-xl font-semibold text-muted-foreground">No tasks posted yet.</h3>
        <p className="text-muted-foreground mt-2">Your posted tasks will appear here once you create them.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
