import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Event } from '../types';

interface CalendarViewProps {
  events: Event[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  const calendarEvents = events.map(event => ({
    title: event.title,
    date: event.date,
    allDay: true,
  }));

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Calendar View</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        height="auto"
      />
    </div>
  );
};

export default CalendarView;