import { Location } from '@store/shifts/shifts.types'

export type UserProfileFields = {
  userName: string
  email: string
  phoneNumber: string
  location: Location
  equipment: { car: string }
}
