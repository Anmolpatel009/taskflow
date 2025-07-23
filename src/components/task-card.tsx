
'use client';

import { useState, useEffect } from 'react';
import type { Task, User } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Mail, Phone, ThumbsUp, ThumbsDown, Users, Zap, Trash2, UserCheck } from 'lucide-react';
import InterestModal from '@/components/interest-modal';
import ViewInterestedModal from './view-interested-modal';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, runTransaction, DocumentReference } from 'firebase/firestore';
import { app, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


interface TaskCardProps {
  task: Task;
  viewContext?: 'public' | 'client';
}

export default function TaskCard({ task, viewContext = 'public' }: TaskCardProps) {
  const [taskState, setTaskState] = useState(task);
  const [interestedCount, setInterestedCount] = useState(taskState.interestedCount || 0);
  const [feedback, setFeedback] = useState<'interested' | 'not-interested' | null>(null);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [isViewInterestedModalOpen, setIsViewInterestedModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setCurrentUser({ id: userDoc.id, ...userDoc.data() } as User);
        } else {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleViewInterestedClick = () => {
    if (authLoading) return;
    if (currentUser) {
      setIsViewInterestedModalOpen(true);
    } else {
      toast({
        title: "Login Required",
        description: "Please log in or sign up to view interested freelancers.",
      });
      router.push('/login');
    }
  };

  const handleInterestedClick = () => {
    if (authLoading) return;

    if (!currentUser) {
       toast({
        title: "Login Required",
        description: "Please log in to show interest.",
      });
      router.push('/login');
      return;
    }
    
    if (currentUser.role !== 'freelancer') {
        toast({
          variant: 'destructive',
          title: 'Action Not Allowed',
          description: 'Only users registered as freelancers can show interest in tasks.',
        });
        return;
    }

    setIsInterestModalOpen(true);
  };
  
  const onInterestSubmitted = () => {
    setInterestedCount(prev => prev + 1);
    setFeedback('interested');
    setIsInterestModalOpen(false);
  }

  const handleNotInterested = () => {
      setFeedback('not-interested');
  };

  const handleAcceptTask = async () => {
    setIsAccepting(true);
    if (authLoading) {
      setIsAccepting(false);
      return;
    };

    if (!currentUser) {
      toast({ title: "Login Required", description: "You must be logged in to accept a task." });
      router.push('/login');
      setIsAccepting(false);
      return;
    }

    if (currentUser.role !== 'freelancer') {
      toast({ variant: 'destructive', title: 'Action Not Allowed', description: 'Only freelancers can accept tasks.' });
      setIsAccepting(false);
      return;
    }

    const taskRef = doc(db, 'tasks', taskState.id);
    const userRef = doc(db, 'users', currentUser.id);

    try {
      await runTransaction(db, async (transaction) => {
        const taskDoc = await transaction.get(taskRef);
        if (!taskDoc.exists() || taskDoc.data().status !== 'open') {
          throw new Error("This task is no longer available.");
        }
        
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw new Error("User not found.");
        }

        const newActiveProjects = (userDoc.data().activeProjects || 0) + 1;

        transaction.update(taskRef, { 
          status: 'assigned',
          assignedTo: currentUser.id,
          assignedToName: currentUser.name || 'Anonymous',
        });
        transaction.update(userRef, { activeProjects: newActiveProjects });
      });

      toast({ title: 'Task Accepted!', description: "The task has been added to your active projects." });
      setTaskState(prev => ({ 
        ...prev, 
        status: 'assigned', 
        assignedTo: currentUser.id,
        assignedToName: currentUser.name,
      }));
    } catch (error: any) {
      console.error("Error accepting task:", error);
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Could not accept the task. Please try again.' });
    } finally {
      setIsAccepting(false);
    }
  }
  
  const handleDeleteTask = () => {
      // TODO: Implement logic to delete the task from firestore
      // This will involve adding a confirmation dialog before deleting.
      alert("Delete Task functionality to be implemented.");
  }

  const renderPublicButtons = () => {
    if (taskState.status !== 'open') return null;

    if (taskState.taskType === 'instant') {
      return (
        <Button size="sm" onClick={handleAcceptTask} disabled={isAccepting || authLoading}>
          {isAccepting ? <><Zap className="mr-2 h-4 w-4 animate-spin" /> Accepting...</> : <><Zap className="mr-2 h-4 w-4" /> Accept Task</>}
        </Button>
      );
    }
    if (taskState.taskType === 'discuss') {
      return (
        <div className="flex flex-col items-start gap-2">
            <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant={feedback === 'interested' ? 'default' : 'outline'} onClick={handleInterestedClick} disabled={!!feedback || authLoading}>
                    <ThumbsUp className="mr-2 h-4 w-4" /> Interested
                </Button>
                <Button size="sm" variant={feedback === 'not-interested' ? 'destructive' : 'outline'} onClick={handleNotInterested} disabled={!!feedback}>
                    <ThumbsDown className="mr-2 h-4 w-4" /> Not Interested
                </Button>
            </div>
             {interestedCount > 0 && (
                 <Button size="sm" variant="link" className="h-auto py-1 px-2 text-muted-foreground" onClick={handleViewInterestedClick}>
                    <Users className="mr-2 h-4 w-4" /> {interestedCount} interested. View
                </Button>
             )}
        </div>
      );
    }
    return null;
  };

  const renderClientButtons = () => {
      return (
        <div className="flex flex-col items-start gap-2">
            <Button size="sm" variant="destructive" onClick={handleDeleteTask}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete Task
            </Button>
            {taskState.interestedCount > 0 && (
                 <Button size="sm" variant="outline" className="h-auto py-1 px-2" onClick={handleViewInterestedClick}>
                    <Users className="mr-2 h-4 w-4" /> {taskState.interestedCount} interested. View
                </Button>
            )}
        </div>
      )
  }

  return (
    <>
        <Card className="flex flex-col h-full bg-card hover:shadow-xl transition-shadow duration-300 w-full">
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="font-headline text-lg md:text-xl line-clamp-2">{taskState.title}</CardTitle>
                <Badge variant={taskState.status === 'open' ? 'secondary' : 'default'} className="capitalize shrink-0">
                  {taskState.status}
                </Badge>
              </div>
              <CardDescription className="text-lg font-semibold text-primary pt-1">Budget: ₹{Number(taskState.posterWillPay).toLocaleString('en-IN') || 'Not specified'}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {taskState.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {taskState.timeframe}</span>
                     {taskState.status === 'assigned' && taskState.assignedToName && (
                        <span className="flex items-center gap-1.5 text-green-500 font-medium"><UserCheck className="w-4 h-4" /> Assigned to {taskState.assignedToName.split(' ')[0]}</span>
                    )}
                </div>
                <p className="text-sm text-foreground/80 line-clamp-3 mb-4">{taskState.description}</p>
                
                {viewContext === 'public' && renderPublicButtons()}
                {viewContext === 'client' && renderClientButtons()}

            </CardContent>
            <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>{taskState.posterName?.charAt(0).toUpperCase() || 'P'}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm">{taskState.posterName}</p>
                        <p className="text-xs text-muted-foreground">Task Poster</p>
                    </div>
                </div>
                { taskState.status === 'open' && (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <a href={`mailto:${taskState.posterEmail}`}><Mail className="h-4 w-4" /></a>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                            <a href={`tel:${taskState.posterPhone}`}><Phone className="h-4 w-4" /></a>
                        </Button>
                    </div>
                )}
            </CardFooter>
      </Card>

      {currentUser && <InterestModal 
        isOpen={isInterestModalOpen} 
        onOpenChange={setIsInterestModalOpen}
        taskId={taskState.id}
        user={currentUser}
        onInterestSubmitted={onInterestSubmitted}
      />}
      <ViewInterestedModal
        isOpen={isViewInterestedModalOpen}
        onOpenChange={setIsViewInterestedModalOpen}
        taskId={taskState.id}
      />
    </>
  );
}
