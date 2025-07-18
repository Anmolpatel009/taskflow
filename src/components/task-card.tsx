
'use client';

import { useState } from 'react';
import type { Task } from '@/types';
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
      <div className="card">
        <div className="content">
          <div className="flex flex-col h-full w-full p-4 bg-[#171717] rounded-[5px] text-white">
            <div className="flex justify-between items-start">
              <h3 className="font-headline text-lg md:text-xl text-white">{task.title}</h3>
              <Badge variant={task.status === 'open' ? 'secondary' : 'default'} className="capitalize shrink-0 bg-gray-600 text-gray-200">
                {task.status}
              </Badge>
            </div>
            <div className="text-lg font-semibold text-blue-400">Budget: ₹{Number(task.posterWillPay).toLocaleString('en-IN') || 'Not specified'}</div>

            <div className="flex-grow mt-2">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 mb-2">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {task.location}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {task.timeframe}</span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-3">{task.description}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant={feedback === 'interested' ? 'default' : 'outline'} onClick={handleInterestedClick} className="bg-gray-600 hover:bg-gray-500 text-white">
                    <ThumbsUp className="mr-2 h-4 w-4" /> Interested
                </Button>
                <Button size="sm" variant={feedback === 'not-interested' ? 'destructive' : 'outline'} onClick={handleNotInterested} className="bg-gray-600 hover:bg-red-700 text-white">
                    <ThumbsDown className="mr-2 h-4 w-4" /> Not Interested
                </Button>
            </div>

             <div className="mt-2 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="cursor-default bg-gray-600 text-white">
                    <Users className="mr-2 h-4 w-4" /> {interestedCount}
                </Button>
                {interestedCount > 0 && (
                  <Button size="sm" variant="outline" onClick={() => setIsViewInterestedModalOpen(true)} className="bg-gray-600 hover:bg-gray-500 text-white">
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Button>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>{task.posterName?.charAt(0).toUpperCase() || 'P'}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-white">{task.posterName}</p>
                        <p className="text-xs text-gray-400">Task Poster</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild className="bg-gray-600 hover:bg-gray-500">
                    <a href={`mailto:${task.posterEmail}`}>
                        <Mail className="h-4 w-4" />
                    </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="bg-gray-600 hover:bg-gray-500">
                    <a href={`tel:${task.posterPhone}`}>
                        <Phone className="h-4 w-4" />
                    </a>
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </div>

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
