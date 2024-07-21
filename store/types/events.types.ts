export const EventType = {
  training: 'TRAINING',
  wildfire: 'WILDFIRE',
} as const;

export type Event = {
  id: string;
  type: keyof typeof EventType;
};

export type EventsState = {
  events: Event[];
  loading: boolean;
  error?: Error;
};
