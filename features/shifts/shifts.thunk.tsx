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
import { fromFirebase, toFirebase } from './shifts.adapters'

export const fetchShifts = createAsyncThunk('shifts/fetchShifts', async () => {
  try {
    const shiftsCollection = query(collection(FirebaseStore, 'shifts'))
    const shiftsSnapshot = await getDocs(shiftsCollection)

    const shifts = shiftsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as FB_Shift[]

    return shifts.map(fromFirebase)
  } catch (error: any) {
    throw new Error(error)
  }
})

export const createShift = createAsyncThunk(
  'shifts/createShift',
  async (
    shiftData: Pick<
      Shift,
      'title' | 'timeSlots' | 'startDate' | 'location' | 'description'
    >,
    { getState }
  ) => {
    const {
      userSlice: { appUser }
    } = getState() as RootState
    try {
      const shiftsCollection = collection(FirebaseStore, 'shifts')
      const newShiftDoc = doc(shiftsCollection)

      const newShift = toFirebase({
        ...shiftData,
        status: 'active',
        createdBy: appUser!,
        id: newShiftDoc.id,
        createdAt: Date.now(),
        updatedAt: Date.now()
      })

      await setDoc(newShiftDoc, newShift)

      return {
        ...newShift,
        id: newShiftDoc.id
      } as unknown as Shift
    } catch (error: any) {
      throw new Error(error)
    }
  }
)
