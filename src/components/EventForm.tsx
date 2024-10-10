import React, { useState } from 'react';
import { Event, EventType } from '../types';
import { PlusCircle } from 'lucide-react';

interface EventFormProps {
  onAddEvent: (event: Omit<Event, 'id'>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<EventType>('reminder');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent({ title, date, type, recipient, description });
    setTitle('');
    setDate('');
    setType('reminder');
    setRecipient('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as EventType)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="reminder">Reminder</option>
          <option value="birthday">Birthday</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
      >
        <PlusCircle className="w-4 h-4 mr-2" /> Add Event
      </button>
    </form>
  );
};

export default EventForm;