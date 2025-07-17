
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, GeoPoint, serverTimestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const formSchema = z.object({
  role: z.enum(['freelancer', 'client'], { required_error: 'Please select a role.' }),
  name: z.string().min(2, 'Please enter a name.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  phone: z.string().regex(/^[0-9]{10,15}$/, 'Invalid phone number.').optional(),
  address: z.string().min(10, 'Please enter a valid address.').optional(),
  location: z.string().regex(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}, ?-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/, 'Please enter valid Latitude, Longitude.').optional(),
  skills: z.string().optional(),
  services: z.string().optional(),
  experience: z.coerce.number().optional(),
  hourlyRate: z.coerce.number().optional(),
  companyName: z.string().optional(),
  industry: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });
  
  const userRole = form.watch('role');

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      
      const [lat, lng] = values.location ? values.location.split(',').map(coord => parseFloat(coord.trim())) : [0,0];

      const userData: any = {
        email: values.email,
        name: values.name,
        phone: values.phone || '',
        address: values.address || '',
        location: new GeoPoint(lat, lng),
        role: values.role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        activeProjects: 0,
        completedProjects: 0,
        tasksApplied: 0,
        totalEarnings: 0,
        unreadMessages: 0,
      };

      if (values.role === 'freelancer') {
        userData.freelancerProfile = {
          fullName: values.name,
          skills: values.skills?.split(',').map(s => s.trim()) || [],
          services: values.services || '',
          experience: values.experience || 0,
          hourlyRate: values.hourlyRate || 0,
        };
      } else if (values.role === 'client') {
        userData.clientProfile = {
          companyName: values.companyName || '',
          industry: values.industry || '',
        };
      }
      
      await setDoc(doc(db, 'users', user.uid), userData);

      toast({ title: 'Success!', description: 'Your account has been created.' });
      router.push('/login');

    } catch (error: any) {
      console.error('Signup error:', error);
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to create account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">Sign Up</CardTitle>
            <CardDescription>Create an account to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="role" render={({ field }) => (
                  <FormItem>
                    <FormLabel>You want to join as *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="freelancer">Freelancer (Offer Services)</SelectItem>
                        <SelectItem value="client">Client (Post Tasks)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email *</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem><FormLabel>Password *</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                {userRole === 'freelancer' && (
                  <div className="space-y-4 p-4 border rounded-md">
                     <h3 className="font-semibold">Freelancer Details</h3>
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="Your phone number" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Address</FormLabel><FormControl><Textarea rows={3} placeholder="Your full address" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="location" render={({ field }) => (
                        <FormItem><FormLabel>Location (Latitude, Longitude)</FormLabel><FormControl><Input placeholder="e.g., 40.7128, -74.0060" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="skills" render={({ field }) => (
                        <FormItem><FormLabel>Skills</FormLabel><FormControl><Input placeholder="e.g., Web Development, Graphic Design" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="services" render={({ field }) => (
                        <FormItem><FormLabel>Services You Offer</FormLabel><FormControl><Textarea placeholder="Describe services you provide" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="experience" render={({ field }) => (
                          <FormItem><FormLabel>Years of Experience</FormLabel><FormControl><Input type="number" placeholder="e.g., 5" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="hourlyRate" render={({ field }) => (
                          <FormItem><FormLabel>Hourly Rate (₹)</FormLabel><FormControl><Input type="number" placeholder="e.g., 2500" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Join Our Freelancer Community</h3>
                        <Button asChild variant="outline">
                           <Link href="https://chat.whatsapp.com/KKNWoExT1E18vsHh4Hu6OT?mode=ac_c" target="_blank">
                              Join Workflow Freelancers on WhatsApp
                           </Link>
                        </Button>
                        <p className="text-sm text-muted-foreground mt-1">Required to receive task notifications</p>
                      </div>
                  </div>
                )}
                
                {userRole === 'client' && (
                  <div className="space-y-4 p-4 border rounded-md">
                    <h3 className="font-semibold">Client Details</h3>
                    <FormField control={form.control} name="companyName" render={({ field }) => (
                      <FormItem><FormLabel>Company/Organization Name</FormLabel><FormControl><Input placeholder="e.g., Acme Inc." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="industry" render={({ field }) => (
                      <FormItem><FormLabel>Industry</FormLabel><FormControl><Input placeholder="e.g., Technology, Construction" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="Your phone number" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem><FormLabel>Address</FormLabel><FormControl><Textarea rows={3} placeholder="Your full address" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting || !userRole}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Complete Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
