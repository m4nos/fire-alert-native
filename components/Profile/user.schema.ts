import * as z from 'zod';
import { UserProfileFields } from './ProfileInfo/types';

export const profileValidationSchema = z.object({
  userName: z.string().min(1, 'Username is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  location: z.object({
    latitude: z.string(),
    longitude: z.string(),
  }),
  equipment: z.string().optional(),
});

export const initialValues: UserProfileFields = {
  email: '',
  userName: '',
  phoneNumber: '',
  location: { latitude: 0, longitude: 0 },
  equipment: {
    car: '',
  },
};
