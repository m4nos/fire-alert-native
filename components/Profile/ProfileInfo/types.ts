import { Coordinates } from '@store/map/map.types'

export type UserProfileFields = {
  userName: string
  email: string
  phoneNumber: string
  location: Coordinates
  equipment: { car: string }
}
