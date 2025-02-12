import { Coordinates } from '@store/map/map.types'
import { Slot } from '@store/slots/slots.types'
import { AppUser } from '@store/user/user.types'
import { Timestamp } from 'firebase/firestore'

export type Location = Coordinates & {
  province: string
  municipality: string
}

export type TimeSlot = {
  startTime: string
  endTime: string
}

export type Shift = {
  id: string
  title: string
  timeSlots: TimeSlot[]
  slots: Slot[]
  location: Location
  description?: string
  status: 'active' | 'inactive'
  createdBy: AppUser
  createdAt: Timestamp
  updatedAt: Timestamp
  startDate: Timestamp
  endDate: Timestamp
}
