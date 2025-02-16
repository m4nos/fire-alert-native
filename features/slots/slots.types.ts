import { AppUser } from '@store/user/user.types'
import { Timestamp } from 'firebase/firestore'

export type FB_Slot = {
  id: string
  shiftId: string
  startTime: Timestamp
  endTime: Timestamp
  reservedBy?: AppUser
  reservedAt?: Timestamp
}

export type Slot = {
  id: string
  shiftId: string // foreign key
  startTime: number // timestamp
  endTime: number // timestamp
  reservedBy?: AppUser
  reservedAt?: number // timestamp
}
