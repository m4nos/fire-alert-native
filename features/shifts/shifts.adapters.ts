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

export const toFirebase = (entity: Shift): FB_Shift => ({
  id: entity.id,
  createdAt: Timestamp.fromMillis(entity.createdAt),
  title: entity.title,
  timeSlots: entity.timeSlots,
  slots: entity.slots,
  location: entity.location,
  description: entity.description,
  status: entity.status,
  createdBy: entity.createdBy,
  updatedAt: Timestamp.fromMillis(entity.updatedAt),
  startDate: Timestamp.fromMillis(entity.startDate)
})
