import { FB_Slot, Slot } from './slots.types'

export const slotFromFirebase = (entity: FB_Slot): Slot => ({
  id: entity.id,
  shiftId: entity.shiftId,
  startTime: entity.startTime.toMillis(),
  endTime: entity.endTime.toMillis(),
  reservedBy: entity.reservedBy,
  reservedAt: entity.reservedAt?.toMillis()
})
