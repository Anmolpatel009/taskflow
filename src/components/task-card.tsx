
'use client';

import { useState } from 'react';
import type { Task } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Mail, Phone, ThumbsUp, ThumbsDown, Users, Eye } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import InterestModal from '@/components/interest-modal';
import ViewInterestedModal from './view-interested-modal';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [interestedCount, setInterestedCount] = useState(task.interestedCount || 0);
  const [feedback, setFeedback] = useState<'interested' | 'not-interested' | null>(null);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [isViewInterestedModalOpen, setIsViewInterestedModalOpen] = useState(false);

  const handleInterestedClick = () => {
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

  return (
    <>
      <Card className="w-full transition-all hover:shadow-md border-l-4 border-primary">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-lg md:text-xl">{task.title}</CardTitle>
            <Badge variant={task.status === 'open' ? 'secondary' : 'default'} className="capitalize shrink-0">
              {task.status}
            </Badge>
          </div>
          <div className="text-lg font-semibold text-primary">Budget: ₹{Number(task.posterWillPay).toLocaleString('en-IN') || 'Not specified'}</div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {task.location}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {task.timeframe}</span>
          </div>
          <CardDescription>{task.description}</CardDescription>
          <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant={feedback === 'interested' ? 'default' : 'outline'} onClick={handleInterestedClick}>
                  <ThumbsUp className="mr-2 h-4 w-4" /> Interested
              </Button>
              <Button size="sm" variant={feedback === 'not-interested' ? 'destructive' : 'outline'} onClick={handleNotInterested}>
                  <ThumbsDown className="mr-2 h-4 w-4" /> Not Interested
              </Button>
              <Button size="sm" variant="outline" className="cursor-default">
                  <Users className="mr-2 h-4 w-4" /> {interestedCount} Interested
              </Button>
              {interestedCount > 0 && (
                <Button size="sm" variant="outline" onClick={() => setIsViewInterestedModalOpen(true)}>
                  <Eye className="mr-2 h-4 w-4" /> View
                </Button>
              )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/50 py-4 px-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{task.posterName?.charAt(0).toUpperCase() || 'P'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{task.posterName}</p>
              <p className="text-xs text-muted-foreground">Task Poster</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${task.posterEmail}`}>
                <Mail className="mr-2 h-4 w-4" /> Email
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
               <a href={`tel:${task.posterPhone}`}>
                <Phone className="mr-2 h-4 w-4" /> Call
              </a>
            </Button>
          </div>
        </CardFooter>
      </Card>
      <InterestModal 
        isOpen={isInterestModalOpen} 
        onOpenChange={setIsInterestModalOpen}
        taskId={task.id}
        onInterestSubmitted={onInterestSubmitted}
      />
      <ViewInterestedModal
        isOpen={isViewInterestedModalOpen}
        onOpenChange={setIsViewInterestedModalOpen}
        taskId={task.id}
      />
    </>
  );
}
