
'use client';

import { useState } from 'react';
import type { Task } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Mail, Phone, ThumbsUp, ThumbsDown, Users, Eye } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import InterestModal from '@/components/interest-modal';
import ViewInterestedModal from './view-interested-modal';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


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
        <Card className="flex flex-col h-full bg-card hover:shadow-xl transition-shadow duration-300 w-full">
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="font-headline text-lg md:text-xl line-clamp-2">{task.title}</CardTitle>
                <Badge variant={task.status === 'open' ? 'secondary' : 'default'} className="capitalize shrink-0">
                  {task.status}
                </Badge>
              </div>
              <CardDescription className="text-lg font-semibold text-primary pt-1">Budget: ₹{Number(task.posterWillPay).toLocaleString('en-IN') || 'Not specified'}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {task.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {task.timeframe}</span>
                </div>
                <p className="text-sm text-foreground/80 line-clamp-3 mb-4">{task.description}</p>
                
                 <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" variant={feedback === 'interested' ? 'default' : 'outline'} onClick={handleInterestedClick}>
                        <ThumbsUp className="mr-2 h-4 w-4" /> Interested
                    </Button>
                    <Button size="sm" variant={feedback === 'not-interested' ? 'destructive' : 'outline'} onClick={handleNotInterested}>
                        <ThumbsDown className="mr-2 h-4 w-4" /> Not Interested
                    </Button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2 items-center">
                    <Button size="sm" variant="outline" className="cursor-default">
                        <Users className="mr-2 h-4 w-4" /> {interestedCount}
                    </Button>
                    {interestedCount > 0 && (
                      <Button size="sm" variant="outline" onClick={() => setIsViewInterestedModalOpen(true)}>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Button>
                    )}
                </div>

            </CardContent>
            <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>{task.posterName?.charAt(0).toUpperCase() || 'P'}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm">{task.posterName}</p>
                        <p className="text-xs text-muted-foreground">Task Poster</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <a href={`mailto:${task.posterEmail}`}><Mail className="h-4 w-4" /></a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <a href={`tel:${task.posterPhone}`}><Phone className="h-4 w-4" /></a>
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
