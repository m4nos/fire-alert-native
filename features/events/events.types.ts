export const EventType = {
  TRAINING: 'TRAINING',
  EMERGENCY: 'EMERGENCY',
} as const;

export type Event = {
  id: string;
  type: keyof typeof EventType;
  date: string;
  participants: number;
  latitude: string;
  longitude: string;
  province: string;
  description: string;
};

export type EventsState = {
  events: Event[];
  loading: boolean;
  error?: Error;
};
