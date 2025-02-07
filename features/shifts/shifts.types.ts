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
  timeSlots: TimeSlot[];
  location: Location;
  title: string;
  description?: string;
  status: "active" | "inactive";
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  startDate: number;
  endDate: number;
}
