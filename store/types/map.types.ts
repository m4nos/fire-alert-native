export type Coordinates = {
  latitude: number;
  longitude: number;
};

export const EventType = {
  training: "TRAINING",
  wildfire: "WILDFIRE",
} as const;

export type Marker = {
  id: string;
  type: typeof EventType;
  latitude: number;
  longitude: number;
};

export type MapState = {
  markers: Marker[];
  loading: boolean;
  error?: Error;
};
