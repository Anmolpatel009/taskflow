
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LocateFixed } from 'lucide-react';
import type { User } from '@/types';

interface TaskSubmissionModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user?: User | null;
}

const formSchema = z.object({
  taskTitle: z.string().min(5, 'Title must be at least 5 characters.'),
  taskDescription: z.string().min(20, 'Description must be at least 20 characters.'),
  taskLocation: z.string().min(3, 'Location is required.'),
  posterName: z.string().min(2, 'Name is required.'),
  posterEmail: z.string().email('Invalid email address.'),
  posterPhone: z.string().regex(/^[0-9]{10,15}$/, 'Invalid phone number.'),
  posterWillPay: z.string().min(1, 'Payment amount is required.'),
  timeframe: z.string().nonempty('Please select a timeframe.'),
});

type FormData = z.infer<typeof formSchema>;

export default function TaskSubmissionModal({ isOpen, onOpenChange, user }: TaskSubmissionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskTitle: '',
      taskDescription: '',
      taskLocation: '',
      posterName: '',
      posterEmail: '',
      posterPhone: '',
      posterWillPay: '',
      timeframe: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue('posterName', user.name || '');
      form.setValue('posterEmail', user.email || '');
      form.setValue('posterPhone', user.phone || '');
    }
  }, [user, form]);


  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      setIsDetectingLocation(true);
      toast({ title: "Detecting Address...", description: "Please wait while we fetch your address." });
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            if (data && data.display_name) {
              form.setValue('taskLocation', data.display_name);
              toast({ title: "Success", description: "Address automatically filled!" });
            } else {
               toast({ variant: 'destructive', title: "Error", description: "Could not fetch address details. Please enter manually." });
            }
          } catch (error) {
             toast({ variant: 'destructive', title: "Error", description: "Failed to fetch address. Please enter manually." });
          } finally {
            setIsDetectingLocation(false);
          }
        },
        () => {
          toast({ variant: 'destructive', title: "Error", description: "Could not detect location. Please grant permission or enter manually." });
          setIsDetectingLocation(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast({ variant: 'destructive', title: "Error", description: "Geolocation is not supported by your browser." });
    }
  };

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'tasks'), {
        title: values.taskTitle,
        description: values.taskDescription,
        location: values.taskLocation,
        posterName: values.posterName,
        posterEmail: values.posterEmail,
        posterPhone: values.posterPhone,
        posterWillPay: values.posterWillPay,
        timeframe: values.timeframe,
        createdAt: serverTimestamp(),
        status: 'open',
        clientId: user?.id || null, // Add clientId
        interestedCount: 0,
      });
      toast({ title: 'Success!', description: 'Your task has been posted.' });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to post task. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Post a New Task</DialogTitle>
          <DialogDescription>Fill in the details to find the perfect freelancer.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pr-2">
            <FormField control={form.control} name="taskTitle" render={({ field }) => (
              <FormItem><FormLabel>Task Title *</FormLabel><FormControl><Input placeholder="e.g., I need a new website design" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="taskDescription" render={({ field }) => (
              <FormItem><FormLabel>Task Description *</FormLabel><FormControl><Textarea placeholder="Provide details about the task..." rows={4} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="taskLocation" render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                    <FormLabel>Task Location *</FormLabel>
                    <Button type="button" variant="link" size="sm" className="h-auto p-0" onClick={handleDetectLocation} disabled={isDetectingLocation}>
                        {isDetectingLocation ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <LocateFixed className="h-4 w-4 mr-1" />}
                        Detect Address
                    </Button>
                </div>
                <FormControl><Input placeholder="Enter your city or address" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="posterName" render={({ field }) => (
                <FormItem><FormLabel>Your Name *</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="posterEmail" render={({ field }) => (
                <FormItem><FormLabel>Your Email *</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField control={form.control} name="posterPhone" render={({ field }) => (
                <FormItem><FormLabel>Your Phone *</FormLabel><FormControl><Input type="tel" placeholder="Your phone number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="posterWillPay" render={({ field }) => (
                <FormItem><FormLabel>Amount You'll Pay (₹) *</FormLabel><FormControl><Input type="number" placeholder="Enter budget" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
             <FormField control={form.control} name="timeframe" render={({ field }) => (
              <FormItem><FormLabel>When do you need this done? *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select timeframe" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="asap">As soon as possible</SelectItem>
                    <SelectItem value="within_week">Within a week</SelectItem>
                    <SelectItem value="within_month">Within a month</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select><FormMessage />
              </FormItem>
            )} />
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Post Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
