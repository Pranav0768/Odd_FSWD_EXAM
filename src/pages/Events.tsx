
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '@/components/EventCard';
import EventDetailsModal from '@/components/EventDetailsModal';
import SearchBar from '@/components/SearchBar';
import { useEvents, Event } from '@/context/EventContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus } from 'lucide-react';

const Events: React.FC = () => {
  const { events, searchEvents, deleteEvent } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const filteredEvents = searchQuery ? searchEvents(searchQuery) : events;

  const handleViewEvent = (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  const handleEditEvent = (id: string) => {
    navigate(`/edit-event/${id}`);
  };

  const handleDeleteEvent = (id: string) => {
    setEventToDelete(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete);
      setEventToDelete(null);
      setIsAlertOpen(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">College Events</h1>
          <p className="text-gray-500 mt-1">Manage events at your college</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="w-full sm:w-64">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Search events..." 
            />
          </div>
          <Button 
            onClick={() => navigate('/create-event')}
            className="bg-eventPurple hover:bg-eventPurple/90"
          >
            <Plus size={18} className="mr-1" /> Create Event
          </Button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">No events found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery ? 'Try a different search term' : 'Create your first event to get started'}
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => navigate('/create-event')}
                className="bg-eventPurple hover:bg-eventPurple/90"
              >
                <Plus size={18} className="mr-1" /> Create Event
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onView={handleViewEvent}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>
      )}

      <EventDetailsModal 
        event={selectedEvent} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
             This will permanently delete the event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Events;
