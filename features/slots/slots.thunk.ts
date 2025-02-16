import { createAsyncThunk } from '@reduxjs/toolkit'
import { FirebaseStore } from 'firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { Shift } from '../shifts/shifts.types'
import { RootState } from '../store'
import { FB_Slot, Slot } from './slots.types'
import { slotFromFirebase } from './slots.adapter'

export const fetchSlots = createAsyncThunk(
  'slots/fetchSlots',
  async ({ shiftId }: { shiftId?: Shift['id'] }) => {
    if (!shiftId) {
      console.error('no shift id')
      throw new Error('Shift ID is required')
    }

    try {
      const slotsQuery = query(
        collection(FirebaseStore, 'slots'),
        where('shiftId', '==', shiftId)
      )

      const slotsSnapshot = await getDocs(slotsQuery)

      const fb_slots = slotsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as FB_Slot[]

      const slots = fb_slots.map((slot) => slotFromFirebase(slot))

      return slots
    } catch (error: any) {
      throw new Error(error)
    }
  }
)

type ReserveSlotPayload = {
  shiftId: Shift['id']
  startTime: Date
  endTime: Date
}

export const reserveSlot = createAsyncThunk(
  'slots/reserveSlot',
  async ({ shiftId, startTime, endTime }: ReserveSlotPayload, { getState }) => {
    const {
      userSlice: { appUser }
    } = getState() as RootState

    if (!appUser) {
      console.error('user not in redux store')
      throw new Error('User not found')
    }

    try {
      const newSlotData = {
        shiftId,
        startTime,
        endTime,
        reservedBy: appUser,
        reservedAt: new Date()
      }
      const docRef = await addDoc(
        collection(FirebaseStore, 'slots'),
        newSlotData
      )

      // Convert timestamps to numbers for the frontend
      const slot: Slot = {
        id: docRef.id,
        shiftId,
        startTime: startTime.getTime(),
        endTime: endTime.getTime(),
        reservedBy: appUser,
        reservedAt: new Date().getTime()
      }

      return slot
    } catch (error: any) {
      throw new Error(error)
    }
  }
)
