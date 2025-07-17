import type { Timestamp } from "firebase/firestore";

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
}
