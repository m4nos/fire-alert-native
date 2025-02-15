import { FB_Shift, Shift } from './shifts.types'
import { Timestamp } from 'firebase/firestore'

export const fromFirebase = (entity: FB_Shift): Shift => ({
  id: entity.id,
  createdAt: entity.createdAt.toMillis(),
  title: entity.title,
  timeSlots: entity.timeSlots,
  slots: entity.slots,
  location: entity.location,
  description: entity.description,
  status: entity.status,
  createdBy: entity.createdBy,
  updatedAt: entity.updatedAt.toMillis(),
  startDate: entity.startDate.toMillis()
})
