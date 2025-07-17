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
  status: 'open' | 'closed';
  createdAt: Timestamp;
  interestedCount?: number;
}

export interface User {
  id: string;
  email: string;
  phone: string;
  address: string;
  location: GeoPoint;
  role: 'freelancer' | 'client';
  createdAt: Timestamp;
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
    freelancerId: string;
    freelancer: User;
    interestedAt: Timestamp;
}
