import { createAsyncThunk } from '@reduxjs/toolkit'
import { FirebaseStore } from 'firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp
} from 'firebase/firestore'
import { Shift, FB_Shift } from './shifts.types'
import { RootState } from '../store'
import { fromFirebase } from './shifts.adapters'

export const fetchShifts = createAsyncThunk('shifts/fetchShifts', async () => {
  try {
    const shiftsCollection = query(collection(FirebaseStore, 'shifts'))
    const shiftsSnapshot = await getDocs(shiftsCollection)

    const fb_shifts = shiftsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as FB_Shift[]

    const shifts = fb_shifts.map((shift) => fromFirebase(shift))
    return shifts
  } catch (error: any) {
    throw new Error(error)
  }
})

export const createShift = createAsyncThunk(
  'shifts/createShift',
  async (
    shiftData: Pick<
      Shift,
      'title' | 'timeSlots' | 'location' | 'description'
    > & { startDate: Date },
    { getState }
  ) => {
    const {
      userSlice: { appUser }
    } = getState() as RootState
    try {
      const shiftsCollection = collection(FirebaseStore, 'shifts')
      const newShiftDoc = doc(shiftsCollection)

      const newShift = {
        ...shiftData,
        status: 'active' as const,
        createdBy: appUser!,
        id: newShiftDoc.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await setDoc(newShiftDoc, newShift)

      return {
        ...newShift,
        id: newShiftDoc.id,
        startDate: newShift.startDate.getTime(),
        createdAt: newShift.createdAt.getTime(),
        updatedAt: newShift.updatedAt.getTime()
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }
)
