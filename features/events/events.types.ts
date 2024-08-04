export const EventType = {
  TRAINING: 'TRAINING',
  EMERGENCY: 'EMERGENCY',
} as const;

export type Event = {
  id: string;
  type: keyof typeof EventType;
  date: string;
  // participants: number;
  // location: Coordinates;
  // province: string;
  description: string;
  organizer?: string;
};

export type EventsState = {
  events: Event[];
  loading: {
    fetchingEvents: boolean;
    addingEvent: boolean;
  };
  error?: Error;
};
