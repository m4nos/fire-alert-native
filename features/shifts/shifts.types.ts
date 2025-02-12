import { Coordinates } from '@store/map/map.types';
import { Slot } from '@store/slots/slots.types';
import { AppUser } from '@store/user/user.types';

export type Location = Coordinates & {
  province: string;
  municipality: string;
};

export type TimeSlot = {
  startTime: string;
  endTime: string;
};

export type Shift = {
  id: string;
  timeSlots: TimeSlot[];
  slots: Slot[];
  location: Location;
  title: string;
  description?: string;
  status: "active" | "inactive";
  createdBy: AppUser;
  createdAt: number;
  updatedAt: number;
  startDate: number;
  endDate: number;
}
