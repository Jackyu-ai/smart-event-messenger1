import { Event } from '../types';

export async function generateMessage(event: Event): Promise<string> {
  // In a real application, this would call the OpenAI API
  // For now, we'll use a simple template
  const templates = {
    birthday: "Happy birthday, {recipient}! Hope you have a fantastic day!",
    reminder: "Don't forget: {title} on {date}.",
    other: "Reminder: {title} is scheduled for {date}.",
  };

  const template = templates[event.type] || templates.other;
  return template
    .replace('{recipient}', event.recipient)
    .replace('{title}', event.title)
    .replace('{date}', event.date);
}