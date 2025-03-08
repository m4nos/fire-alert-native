import { User } from 'firebase/auth'
import { Location } from '@store/shifts/shifts.types'

export type AppUser = {
  uid: string
  userName: string
  phoneNumber: string
  email: string
  location: Location
  equipment: { car: string }
  isAdmin?: boolean
  [key: string]: any // Add index signature to accommodate dynamic keys
}

export type UserState = {
  firebaseUser: User | null
  appUser: AppUser | null
  loading: {
    login: boolean
    signUp: boolean
    logout: boolean
    fetchAppUser: boolean
    updateAppUser: boolean
  }
  error: Error | null
}
