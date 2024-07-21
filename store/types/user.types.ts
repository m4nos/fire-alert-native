import { User } from 'firebase/auth';
import { Coordinates } from './map.types';

export type AppUser = {
  phoneNumber: string;
  email: string;
  location: Coordinates;
  [key: string]: any; // Add index signature to accommodate dynamic keys
};

export type UserState = {
  firebaseUser: User | null;
  appUser: AppUser | null;
  loading: boolean;
  error: Error | null;
};
