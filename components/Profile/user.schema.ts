import * as z from 'zod'
import { UserProfileFields } from './ProfileInfo/types'

const equipmentSchema = z.object({
  car: z.string().optional()
})

export const profileValidationSchema = z.object({
  userName: z.string().min(1, 'Username is required'),
  phoneNumber: z
    .string()
    .length(10, 'Phone number must be exactly 10 characters long'),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    stateDistrict: z.string()
  }),
  equipment: equipmentSchema
})

export const initialValues: UserProfileFields = {
  email: '',
  userName: '',
  phoneNumber: '',
  location: { latitude: 0, longitude: 0, stateDistrict: '' },
  equipment: {
    car: ''
  }
}
