
'use client';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { app, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import type { User } from '@/types';
import Header from '@/components/layout/header';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset } from '@/components/ui/sidebar';
import { Home, Briefcase, Users, DollarSign, Calendar, Star, Construction, LogOut, FileText, UserCheck, MessageSquare } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

const freelancerNav = [
  { href: '/find-work', label: 'Find Jobs & Projects', icon: Briefcase },
  { href: '#', label: 'My Clients', icon: Users },
  { href: '#', label: 'My Projects', icon: FileText },
  { href: '#', label: 'Payments', icon: DollarSign },
  { href: '#', label: 'Schedules', icon: Calendar },
  { href: '/one-percent-club', label: 'The 1% Club', icon: Star },
  { href: '/build-together', label: 'Build Together', icon: Construction },
];

const clientNav = [
  { href: '/dashboard', label: 'My Tasks', icon: FileText },
  { href: '#', label: 'My Freelancers', icon: UserCheck },
  { href: '#', label: 'Payments', icon: DollarSign },
  { href: '#', label: 'Meetups', icon: MessageSquare },
];


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth(app);
  const { logout } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser({ id: userDoc.id, ...userDoc.data() } as User);
        } else {
          console.error("User document not found in Firestore.");
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  const navItems = user?.role === 'freelancer' ? freelancerNav : clientNav;

  const renderSidebarContent = () => {
    if (loading) {
       return (
        <div className="flex flex-col gap-2 p-4">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
        </div>
      );
    }
    return (
        <SidebarMenu>
            {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild tooltip={item.label}>
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
  }

  return (
    <SidebarProvider>
        <div className="flex flex-col w-full">
            <Header />
            <div className="flex flex-1">
                <Sidebar>
                    <SidebarContent>
                        <SidebarHeader>
                           <SidebarTrigger />
                        </SidebarHeader>
                        {renderSidebarContent()}
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                           <SidebarMenuItem>
                               <SidebarMenuButton onClick={logout} tooltip="Log Out">
                                   <LogOut />
                                   <span>Log Out</span>
                               </SidebarMenuButton>
                           </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <main className="flex-1 p-4 md:p-6 lg:p-8">
                        {React.cloneElement(children as React.ReactElement, { user, loading })}
                    </main>
                </SidebarInset>
            </div>
        </div>
    </SidebarProvider>
  );
}
