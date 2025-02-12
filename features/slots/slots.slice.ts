import { createSlice } from '@reduxjs/toolkit';
import { Slot } from './slots.types';
import { fetchSlots } from './slots.thunk';

interface SlotsState {
  slots: Slot[];
  loading: boolean;
  error: string | null;
}

const initialState: SlotsState = {
  slots: [],
  loading: false,
  error: null,
};

const shiftsSlice = createSlice({
  name: 'shiftsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlots.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSlots.rejected, (state) => {
        state.loading = true;
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.slots = action.payload;
        // .map((shift) => ({
        //   ...shift,
          // startDate: shift.startDate.toMillis(),
          // endDate: shift.endDate.toMillis(),
          // createdAt: shift.createdAt.toMillis(),
          // updatedAt: shift.updatedAt.toMillis(),
        // }));
        state.loading = false;
      });
    // .addCase(reserveSlot.fulfilled, (state, action) => {
    //   const index = state.shifts.findIndex((s) => s.id === action.payload.id);
    //   if (index !== -1) {
    //     state.shifts[index] = action.payload;
    //   }
    // });
  },
});

export default shiftsSlice.reducer;
export const {} = shiftsSlice.actions;
