import { createAsyncThunk } from '@reduxjs/toolkit'
import { FirebaseStore } from 'firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { Shift } from '../shifts/shifts.types'
import { RootState } from '../store'
import { Slot } from './slots.types'

export const fetchSlots = createAsyncThunk(
  'slots/fetchSlots',
  async ({ shiftId }: { shiftId: Shift['id'] }) => {
    try {
      const slotsCollection = query(
        collection(FirebaseStore, 'shifts', shiftId, 'slots')
      )
      const slotsSnapshot = await getDocs(slotsCollection)

      const slots = slotsSnapshot.docs.map((doc) => doc.data()) as Slot[]

      return slots
    } catch (error: any) {
      throw new Error(error)
    }
  }
)

export const reserveSlot = createAsyncThunk(
  'slots/reserveSlot',
  async (
    { shiftId, slotId }: { shiftId: Shift['id']; slotId: Slot['id'] },
    { getState }
  ) => {
    const {
      userSlice: { appUser }
    } = getState() as RootState
    try {
      const slotDoc = doc(collection(FirebaseStore, 'shifts'), shiftId)
      const shiftSnapshot = await getDoc(slotDoc)

      if (!shiftSnapshot.exists()) {
        throw new Error('Shift not found')
      }

      const shift = shiftSnapshot.data() as Shift

      if (shift.status !== 'active') {
        throw new Error('Shift is not available')
      }

      await updateDoc(slotDoc, {
        reservedBy: appUser?.uid,
        status: 'reserved'
      })

      return shift
    } catch (error: any) {
      throw new Error(error)
    }
  }
)
