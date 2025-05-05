
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EventForm from '@/components/EventForm';
import { useEvents } from '@/context/EventContext';
import { toast } from 'sonner';

const EditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById, updateEvent } = useEvents();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const event = id ? getEventById(id) : undefined;

  useEffect(() => {
    if (id && !event) {
      setNotFound(true);
      toast.error('Event not found');
    }
  }, [id, event]);

  const handleSubmit = (data: any) => {
    if (!id) return;
    
    setIsSubmitting(true);
    
    // Add a slight delay to simulate API call
    setTimeout(() => {
      try {
        updateEvent(id, data);
        navigate('/events');
        toast.success('Event updated successfully');
      } finally {
        setIsSubmitting(false);
      }
    }, 500);
  };

  if (notFound) {
    return (
      <div className="container px-4 py-8 mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Event not found</h3>
          <button 
            onClick={() => navigate('/events')}
            className="text-eventPurple hover:underline"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Edit Event</h1>
        <p className="text-gray-500 mt-1">Update the details of your event</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent>
          {event && (
            <EventForm 
              initialData={event} 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditEvent;
