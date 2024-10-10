import React from 'react';
import { Event } from '../types';
import { Calendar, MessageSquare } from 'lucide-react';

interface EventListProps {
  events: Event[];
  onGenerateMessage: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onGenerateMessage }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              <span className="mr-2">{event.title} - {event.date}</span>
              <span className="text-sm text-gray-500">({event.type})</span>
            </div>
            <button
              onClick={() => onGenerateMessage(event)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center"
            >
              <MessageSquare className="w-4 h-4 mr-1" /> Generate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;