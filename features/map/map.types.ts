export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Marker = {
  id: string;
  latitude: string;
  longitude: string;
  timestamp: number;
};

export type MapState = {
  markers: Marker[];
  loading: boolean;
  error?: Error;
};
