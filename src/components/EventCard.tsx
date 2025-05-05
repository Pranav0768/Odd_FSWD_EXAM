
import React from 'react';
import { CalendarCheck, MapPin, User } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Event } from '@/context/EventContext';

interface EventCardProps {
  event: Event;
  onView: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onView, onEdit, onDelete }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, 'MM dd, yyyy');
  };

  return (
    <Card className="event-card overflow-hidden transition-all h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="object-cover w-full h-full transition-transform"
        />
        <div className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded bg-white/80">
          {event.type}
        </div>
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold truncate">{event.title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarCheck size={16} className="mr-2 text-eventPurple" />
            <span>{formatDate(event.date)} at {event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={16} className="mr-2 text-eventPurple" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <User size={16} className="mr-2 text-eventPurple" />
            <span>{event.organizer}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onView(event.id)}
          className="border-eventPurple text-eventPurple hover:bg-eventPurple hover:text-white"
        >
          View Details
        </Button>
        
        {onEdit && onDelete && (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEdit(event.id)}
              className="border-eventTeal text-eventTeal hover:bg-eventTeal hover:text-white"
            >
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDelete(event.id)}
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;
