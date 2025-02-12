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
import { Shift, TimeSlot } from './shifts.types'
import { RootState } from '../store'

export const fetchShifts = createAsyncThunk('shifts/fetchShifts', async () => {
  try {
    const shiftsCollection = query(collection(FirebaseStore, 'shifts'))
    const shiftsSnapshot = await getDocs(shiftsCollection)

    const shifts = shiftsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })) as Shift[]

    console.log(shifts)

    return shifts
  } catch (error: any) {
    throw new Error(error)
  }
})

export const createShift = createAsyncThunk(
  'shifts/createShift',
  async (
    shiftData: Omit<Shift, 'id' | 'createdAt' | 'updatedAt'>,
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
        status: 'active',
        createdBy: appUser,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }

      await setDoc(newShiftDoc, newShift)

      return {
        ...newShift,
        id: newShiftDoc.id
      } as Shift
    } catch (error: any) {
      throw new Error(error)
    }
  }
)
