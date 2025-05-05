
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User, Tag } from 'lucide-react';
import { Event } from '@/context/EventContext';
import { format } from 'date-fns';

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  isOpen,
  onClose,
  onEdit,
  onDelete
}) => {
  if (!event) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'MMMM dd, yyyy');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <div className="h-56 overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <DialogHeader className="p-6 pb-2">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">{event.title}</DialogTitle>
            <span className="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-eventPurple">
              {event.type}
            </span>
          </div>
          <DialogDescription className="text-base text-gray-600 mt-2">
            {event.description}
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-3 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-eventPurple mr-3" />
              <div>
                <div className="text-sm font-medium">Date</div>
                <div className="text-gray-600">{formatDate(event.date)}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-eventPurple mr-3" />
              <div>
                <div className="text-sm font-medium">Time</div>
                <div className="text-gray-600">{event.time}</div>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-eventPurple mr-3" />
              <div>
                <div className="text-sm font-medium">Location</div>
                <div className="text-gray-600">{event.location}</div>
              </div>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 text-eventPurple mr-3" />
              <div>
                <div className="text-sm font-medium">Organizer</div>
                <div className="text-gray-600">{event.organizer}</div>
              </div>
            </div>
          </div>
        </div>
        {(onEdit || onDelete) && (
          <DialogFooter className="p-6 pt-0">
            <div className="flex justify-end space-x-2">
              {onEdit && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    onClose();
                    onEdit(event.id);
                  }}
                  className="border-eventTeal text-eventTeal hover:bg-eventTeal hover:text-white"
                >
                  Edit Event
                </Button>
              )}
              {onDelete && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    onClose();
                    onDelete(event.id);
                  }}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Delete Event
                </Button>
              )}
            </div>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
