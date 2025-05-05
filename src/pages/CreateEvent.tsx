
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EventForm from '@/components/EventForm';
import { useEvents } from '@/context/EventContext';
import { useAuth } from '@/context/AuthContext';

const CreateEvent: React.FC = () => {
  const { addEvent } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    
    // Add a slight delay to simulate API call
    setTimeout(() => {
      try {
        const eventData = {
          ...data,
          createdBy: user?.id || '',
        };
        
        addEvent(eventData);
        navigate('/events');
      } finally {
        setIsSubmitting(false);
      }
    }, 500);
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Event</h1>
        <p className="text-gray-500 mt-1">Fill in the details to create a new college event</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent>
          <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEvent;
