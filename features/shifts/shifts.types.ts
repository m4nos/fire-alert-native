import { Coordinates } from '@store/map/map.types';
import { AppUser } from '@store/user/user.types';

export type Location = Coordinates & {
  province: string;
  municipality: string;
};

export type Shift = {
  id: string;
  startTime: string;
  endTime: string;
  location: Location;
  description?: string;
  reservedBy?: AppUser;
  status: 'available' | 'reserved' | 'completed';
  createdAt: string;
  updatedAt: string;
};
