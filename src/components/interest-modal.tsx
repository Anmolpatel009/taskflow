
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, runTransaction } from 'firebase/firestore';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { User } from '@/types';
import Link from 'next/link';

interface InterestModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  taskId: string;
  onInterestSubmitted: () => void;
}

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

type FormData = z.infer<typeof formSchema>;

export default function InterestModal({ isOpen, onOpenChange, taskId, onInterestSubmitted }: InterestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', values.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast({
          variant: 'destructive',
          title: 'User not found',
          description: "No account exists with this email.",
          action: (
            <Button asChild variant="secondary">
                <Link href="/signup">Sign Up</Link>
            </Button>
          )
        });
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = { id: userDoc.id, ...userDoc.data() } as User;

      if (userData.role !== 'freelancer') {
         toast({
          variant: 'destructive',
          title: 'Not a Freelancer Account',
          description: 'Only users registered as freelancers can show interest in tasks.',
        });
        return;
      }
      
      const interestQuery = query(collection(db, 'interests'), where('taskId', '==', taskId), where('freelancerId', '==', userData.id));
      const existingInterest = await getDocs(interestQuery);

      if (!existingInterest.empty) {
        toast({
          variant: 'destructive',
          title: 'Already Interested',
          description: 'You have already shown interest in this task.',
        });
        return;
      }
      
      const taskRef = doc(db, 'tasks', taskId);

      await runTransaction(db, async (transaction) => {
        const taskDoc = await transaction.get(taskRef);
        if (!taskDoc.exists()) {
          throw "Task does not exist!";
        }

        const newInterestedCount = (taskDoc.data().interestedCount || 0) + 1;
        transaction.update(taskRef, { interestedCount: newInterestedCount });
        
        const interestRef = doc(collection(db, 'interests'));
        transaction.set(interestRef, {
            taskId: taskId,
            freelancerId: userData.id,
            freelancer: userDoc.data(),
            interestedAt: serverTimestamp(),
        });
      });

      toast({ title: 'Success!', description: 'Your interest has been recorded.' });
      onInterestSubmitted();
      form.reset();

    } catch (error) {
      console.error('Interest submission error:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to record interest. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Show Your Interest</DialogTitle>
          <DialogDescription>
            Enter your registered freelancer email to confirm your interest in this task.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm Interest
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
