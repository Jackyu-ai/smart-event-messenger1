export type EventType = 'birthday' | 'reminder' | 'other';

export interface Event {
  id: string;
  title: string;
  date: string;
  type: EventType;
  recipient: string;
  description?: string;
}

export interface GeneratedMessage {
  eventId: string;
  content: string;
  approved: boolean;
}