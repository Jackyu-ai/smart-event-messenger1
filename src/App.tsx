import React, { useState, useEffect } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import MessageApproval from './components/MessageApproval';
import { Event, GeneratedMessage } from './types';
import { Calendar } from 'lucide-react';
import { generateMessage } from './utils/messageGenerator';

const initialEvents: Event[] = [
  { id: '1', title: 'John\'s Birthday', date: '2024-04-15', type: 'birthday', recipient: 'John' },
  { id: '2', title: 'Project Deadline', date: '2024-03-10', type: 'reminder', recipient: 'Self' },
];

function App() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [generatedMessage, setGeneratedMessage] = useState<GeneratedMessage | null>(null);

  const addEvent = (newEvent: Omit<Event, 'id'>) => {
    const event: Event = { ...newEvent, id: Date.now().toString() };
    setEvents([...events, event]);
  };

  const generateMessageForEvent = async (event: Event) => {
    const content = await generateMessage(event);
    setGeneratedMessage({ eventId: event.id, content, approved: false });
  };

  const handleApprove = (messageId: string, content: string) => {
    console.log(`Message for event ${messageId} approved: ${content}`);
    setGeneratedMessage(null);
    // Here you would typically send the approved message via email
  };

  const handleReject = (messageId: string) => {
    console.log(`Message for event ${messageId} rejected.`);
    setGeneratedMessage(null);
  };

  const handleRegenerate = (messageId: string) => {
    const event = events.find(e => e.id === messageId);
    if (event) {
      generateMessageForEvent(event);
    }
  };

  useEffect(() => {
    // Simulating daily cron job
    const checkDueEvents = () => {
      const today = new Date().toISOString().split('T')[0];
      const dueEvents = events.filter(event => event.date === today);
      dueEvents.forEach(generateMessageForEvent);
    };

    checkDueEvents();
    // In a real application, this would be a server-side cron job
    const interval = setInterval(checkDueEvents, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
            <Calendar className="w-10 h-10 mr-2 text-blue-500" />
            Personal Assistant
          </h1>
        </header>
        <div className="grid grid-cols-1 gap-6">
          <EventForm onAddEvent={addEvent} />
          <EventList events={events} onGenerateMessage={generateMessageForEvent} />
          {generatedMessage && (
            <MessageApproval
              message={generatedMessage}
              onApprove={handleApprove}
              onReject={handleReject}
              onRegenerate={handleRegenerate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;