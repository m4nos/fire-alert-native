export const EventType = {
  training: "TRAINING",
  wildfire: "WILDFIRE",
} as const;

export type Events = {
  id: string;
  type: keyof typeof EventType;
};

export type EventsState = {
  events: Events[];
  loading: boolean;
  error?: Error;
};
