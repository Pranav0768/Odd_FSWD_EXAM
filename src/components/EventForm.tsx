
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { Event } from '@/context/EventContext';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(100),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  type: z.string().min(1, { message: 'Please select an event type' }),
  date: z.string().min(1, { message: 'Please select a date' }),
  time: z.string().min(1, { message: 'Please select a time' }),
  location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
  organizer: z.string().min(3, { message: 'Organizer name must be at least 3 characters' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL' }).or(z.string().min(0).max(0)),
});

type FormData = z.infer<typeof formSchema>;

const eventTypes = [
  'Academic',
  'Cultural',
  'Sports',
  'Technology',
  'Workshop',
  'Conference',
  'Competition',
  'Social',
  'Hackathon',
  'Other'
];

// Sample images for quick selection
const sampleImages = [
  'https://almashines.s3.dualstack.ap-southeast-1.amazonaws.com/assets/images/portfolio/219/main/219_1529064436_1.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCjyQNsVFW6awOBLzxfVLWKEqxNfsAxCTNTQ&s',
  'https://almashines.s3.dualstack.ap-southeast-1.amazonaws.com/assets/images/campusfeed/380230_17350659059ifkxJ.jpg',
  'https://www.odoo.com/web/image/61255618-df333675/Odoox%20Charusat-01.jpg',
  'https://d8it4huxumps7.cloudfront.net/lambda-pdfs/opportunity-bannerImages/1739249773.png?d=700x400',
  'https://media.licdn.com/dms/image/v2/D4D22AQEqR7WeUrTb_g/feedshare-shrink_800/feedshare-shrink_800/0/1731649762418?e=2147483647&v=beta&t=8yWKZoCuhWVAtsIaCFh0kpuztJXTyY0qXKidlExDwHo',
  'https://i.ytimg.com/vi/aqJPZLRA2aA/maxresdefault.jpg',
  'https://media.istockphoto.com/id/1330424071/photo/large-group-of-people-at-a-concert-party.jpg?s=612x612&w=0&k=20&c=LwdiOCBqbfICjQ3j5AzwyugxmfkbyfL3StKEQhtx4hE=',
  'https://img.freepik.com/premium-photo/confetti-fireworks-crowd-music-festival_989072-16.jpg?semt=ais_hybrid&w=740',
  'https://etvbharatimages.akamaized.net/etvbharat/prod-images/768-512-6796427-974-6796427-1586923279447.jpg',
];

interface EventFormProps {
  initialData?: Event;
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ initialData, onSubmit, isSubmitting }) => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string>(initialData?.imageUrl || '');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      type: '',
      date: new Date().toISOString().split('T')[0],
      time: '12:00',
      location: '',
      organizer: user?.name || '',
      imageUrl: '',
    },
  });

  const handleSelectImage = (url: string) => {
    setSelectedImage(url);
    form.setValue('imageUrl', url);
  };

  const handleSubmit = (data: FormData) => {
    if (!data.imageUrl && selectedImage) {
      data.imageUrl = selectedImage;
    }
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your event" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Event location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="organizer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizer</FormLabel>
                  <FormControl>
                    <Input placeholder="Organizing department/club" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Image URL for event" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a URL or select from sample images below
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <p className="text-sm font-medium mb-2">Sample Images</p>
              <div className="grid grid-cols-3 gap-2">
                {sampleImages.map((url, index) => (
                  <div 
                    key={index}
                    className={`aspect-video border rounded overflow-hidden cursor-pointer ${
                      selectedImage === url ? 'ring-2 ring-eventPurple' : ''
                    }`}
                    onClick={() => handleSelectImage(url)}
                  >
                    <img 
                      src={url} 
                      alt={`Sample ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {selectedImage && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Selected Image Preview</p>
            <div className="aspect-video w-full max-w-md border rounded overflow-hidden">
              <img 
                src={selectedImage} 
                alt="Selected preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-eventPurple hover:bg-eventPurple/90"
          >
            {isSubmitting ? 'Saving...' : initialData ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
