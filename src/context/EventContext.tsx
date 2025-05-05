
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  imageUrl: string;
  createdBy: string;
}

interface EventContextType {
  events: Event[];
  isLoading: boolean;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => Event | undefined;
  searchEvents: (query: string) => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initialize with some sample data or load from localStorage
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      // Sample events data
      const sampleEvents = [
        {
          id: '1',
          title: 'Odoo x charusat',
          description: 'A coding competition for tech students, freshers, and coding enthusiasts hosted at CHARUSAT University.',
          type: 'Hackathon',
          date: '2025-03-01',
          time: '08:00',
          location: 'Main Auditorium',
          organizer: 'Odoo',
          imageUrl: 'https://d8it4huxumps7.cloudfront.net/lambda-pdfs/opportunity-bannerImages/1739249773.png?d=700x400',
          createdBy: 'admin'
        },
        {
          id: '2',
          title: 'Spoural\'25',
          description: 'sports and cultural festival hosted by CHARUSAT University.',
          type: 'Sports',
          date: '2025-01-01',
          time: '09:00',
          location: 'On Campus',
          organizer: 'Sports Committee',
          imageUrl: 'https://i.ytimg.com/vi/aqJPZLRA2aA/maxresdefault.jpg',
          createdBy: 'admin'
        },
        {
          id: '3',
          title: 'Sanyojan-2025',
          description: 'CHARUSAT University\'s alumni meet event, specifically Sanyojan-2025',
          type: 'Cultural',
          date: '2025-01-24',
          time: '06:00',
          location: 'College Ground',
          organizer: 'Collage Management',
          imageUrl: 'https://img.freepik.com/premium-photo/confetti-fireworks-crowd-music-festival_989072-16.jpg?semt=ais_hybrid&w=740',
          createdBy: 'admin'
        }
      ];
      setEvents(sampleEvents);
      localStorage.setItem('events', JSON.stringify(sampleEvents));
    }
    setIsLoading(false);
  }, []);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9)
    };
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    toast.success('Event created successfully!');
  };

  const updateEvent = (id: string, updatedFields: Partial<Event>) => {
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, ...updatedFields } : event
    );
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    toast.success('Event updated successfully!');
  };

  const deleteEvent = (id: string) => {
    const filteredEvents = events.filter(event => event.id !== id);
    setEvents(filteredEvents);
    localStorage.setItem('events', JSON.stringify(filteredEvents));
    toast.success('Event deleted successfully!');
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  const searchEvents = (query: string) => {
    if (!query) return events;
    
    const lowercaseQuery = query.toLowerCase();
    return events.filter(event => 
      event.title.toLowerCase().includes(lowercaseQuery) || 
      event.type.toLowerCase().includes(lowercaseQuery) || 
      event.location.toLowerCase().includes(lowercaseQuery) ||
      event.description.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <EventContext.Provider value={{ 
      events, 
      isLoading,
      addEvent, 
      updateEvent, 
      deleteEvent, 
      getEventById,
      searchEvents
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
