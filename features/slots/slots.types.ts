import { AppUser } from "@store/user/user.types";

export type Slot = {
  id: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'reserved' | 'completed';
  reservedBy?: AppUser;
};