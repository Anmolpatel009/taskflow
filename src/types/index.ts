
import type { Timestamp, GeoPoint } from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  description: string;
  location: string;
  posterName: string;
  posterEmail: string;
  posterPhone: string;
  posterWillPay: string;
  timeframe: string;
  status: 'open' | 'closed' | 'assigned';
  taskType: 'instant' | 'discuss';
  createdAt: Timestamp;
  interestedCount?: number;
  clientId?: string;
  assignedTo?: string; // freelancer's user ID
}

export interface User {
  id: string;
  uid: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: GeoPoint;
  role: 'freelancer' | 'client';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  activeProjects: number;
  completedProjects: number;
  tasksApplied: number;
  totalEarnings: number;
  unreadMessages: number;
  freelancerProfile?: {
    fullName: string;
    skills: string[];
    services: string;
    experience: number;
    hourlyRate: number;
  };
  clientProfile?: {
    companyName: string;
    industry: string;
  };
}

export interface Interest {
    id: string;
    taskId: string;
    taskTitle: string;
    freelancerId: string;
    freelancer: User;
    interestedAt: Timestamp;
}
