import { Coordinates } from '@store/map/map.types';
import { AppUser } from '@store/user/user.types';

export type Location = Coordinates & {
  province: string;
  municipality: string;
};

export type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'reserved' | 'completed';
  reservedBy?: AppUser;
};

export type Shift = {
  id: string;
  startDate: Date;
  endDate: Date;
  timeSlots: TimeSlot[];
  location: Location;
  title: string;
  description?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
};
