import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseStore } from 'firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { Shift } from './shifts.types';
import { RootState } from '../store';

export const fetchShifts = createAsyncThunk('shifts/fetchShifts', async () => {
  try {
    const shiftsCollection = query(collection(FirebaseStore, 'shifts'));
    const shiftsSnapshot = await getDocs(shiftsCollection);

    const shifts = shiftsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Shift[];

    return shifts;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const reserveShift = createAsyncThunk(
  'shifts/reserveShift',
  async (shiftId: string, { getState }) => {
    const {
      userSlice: { appUser },
    } = getState() as RootState;
    try {
      const shiftDoc = doc(collection(FirebaseStore, 'shifts'), shiftId);
      const shiftSnapshot = await getDoc(shiftDoc);

      if (!shiftSnapshot.exists()) {
        throw new Error('Shift not found');
      }

      const shift = shiftSnapshot.data() as Shift;

      if (shift.status !== 'available') {
        throw new Error('Shift is not available');
      }

      await updateDoc(shiftDoc, {
        reservedBy: appUser?.uid,
        status: 'reserved',
      });

      return shift;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const createShift = createAsyncThunk(
  'shifts/createShift',
  async (shiftData: Omit<Shift, 'id' | 'status' | 'reservedBy'>) => {
    try {
      const shiftsCollection = collection(FirebaseStore, 'shifts');
      const newShiftDoc = doc(shiftsCollection);

      const newShift = {
        ...shiftData,
        status: 'available',
        reservedBy: null,
      };

      await setDoc(newShiftDoc, newShift);

      return {
        ...newShift,
        id: newShiftDoc.id,
      } as unknown as Shift;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
