
'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, documentId, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Task, Interest } from '@/types';
import TaskCard from '@/components/task-card';
import { Skeleton } from '@/components/ui/skeleton';

interface MyInterestedTasksProps {
  freelancerId: string;
}

export default function MyInterestedTasks({ freelancerId }: MyInterestedTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!freelancerId) return;

    // This query requires a composite index.
    const interestsQuery = query(
      collection(db, 'intrested'),
      where('freelancerId', '==', freelancerId),
      orderBy('interestedAt', 'desc')
    );

    const unsubscribeInterests = onSnapshot(interestsQuery, async (snapshot) => {
      if (snapshot.empty) {
        setTasks([]);
        setLoading(false);
        return;
      }
      
      const interests = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Interest));
      const taskIds = interests.map(interest => interest.taskId);
      
      if (taskIds.length === 0) {
          setTasks([]);
          setLoading(false);
          return;
      }
      
      const tasksQuery = query(collection(db, 'tasks'), where(documentId(), 'in', taskIds));
      
      const unsubscribeTasks = onSnapshot(tasksQuery, (taskSnapshot) => {
        const tasksData: Task[] = [];
        taskSnapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...doc.data() } as Task);
        });

        const sortedTasks = tasksData.sort((a, b) => {
            const indexA = taskIds.indexOf(a.id);
            const indexB = taskIds.indexOf(b.id);
            return indexA - indexB;
        });

        setTasks(sortedTasks);
        setLoading(false);
      }, (error) => {
          console.error("Error fetching tasks:", error);
          setLoading(false);
      });

      return () => unsubscribeTasks();
    }, (error) => {
      console.error("Error fetching interests:", error);
      setLoading(false);
    });

    return () => unsubscribeInterests();
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
        <h3 className="text-xl font-semibold text-muted-foreground">You haven't shown interest in any tasks yet.</h3>
        <p className="text-muted-foreground mt-2">Browse tasks and show interest to see them here.</p>
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
