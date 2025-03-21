import { createAsyncThunk } from '@reduxjs/toolkit'
import { FirebaseStore } from 'firebase'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc
} from 'firebase/firestore'
import { Shift, FB_Shift } from './shifts.types'
import { RootState } from '../store'
import { shiftFromFirebase } from './shifts.adapters'
import haversine from 'haversine-distance'

export const fetchShifts = createAsyncThunk(
  'shifts/fetchShifts',
  async (_, { getState }) => {
    try {
      const {
        userSlice: { appUser }
      } = getState() as RootState

      if (!appUser) throw new Error('No user in redux state')

      const shiftsCollection = query(collection(FirebaseStore, 'shifts'))
      const shiftsSnapshot = await getDocs(shiftsCollection)

      const fb_shifts = shiftsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as FB_Shift[]

      const shifts = fb_shifts.map((shift) => shiftFromFirebase(shift))

      // Sort shifts by distance from user
      if (appUser.location?.latitude && appUser.location?.longitude) {
        const userLocation = {
          latitude: appUser.location.latitude,
          longitude: appUser.location.longitude
        }
        shifts.sort((a, b) => {
          const aLocation = {
            latitude: a.location.latitude,
            longitude: a.location.longitude
          }
          const bLocation = {
            latitude: b.location.latitude,
            longitude: b.location.longitude
          }
          return (
            haversine(userLocation, aLocation) -
            haversine(userLocation, bLocation)
          )
        })
      }

      return shifts
    } catch (error: any) {
      throw new Error(error)
    }
  }
)

export const deleteShift = createAsyncThunk(
  'shifts/deleteShift',
  async (shiftId: string) => {
    try {
      const shiftRef = doc(FirebaseStore, 'shifts', shiftId)
      await deleteDoc(shiftRef)
      return shiftId
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
)

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

    if (!appUser) throw new Error('No user in redux state')

    try {
      const shiftsCollection = collection(FirebaseStore, 'shifts')
      const newShiftDoc = doc(shiftsCollection)

      const newShift = {
        ...shiftData,
        status: 'active' as const,
        createdBy: appUser,
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
