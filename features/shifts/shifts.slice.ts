import { createSlice } from '@reduxjs/toolkit'
import { Shift } from './shifts.types'
import { fetchShifts } from './shifts.thunk'

interface ShiftsState {
  shifts: Shift[]
  loading: boolean
  error: string | null
}

const initialState: ShiftsState = {
  shifts: [],
  loading: false,
  error: null
}

const shiftsSlice = createSlice({
  name: 'shiftsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShifts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchShifts.rejected, (state) => {
        state.loading = true
      })
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.shifts = action.payload
        // .map((shift) => ({
        //   ...shift,
        // startDate: shift.startDate.toMillis(),
        // endDate: shift.endDate.toMillis(),
        // createdAt: shift.createdAt.toMillis(),
        // updatedAt: shift.updatedAt.toMillis(),
        // }));
        state.loading = false
      })
    // .addCase(reserveShift.fulfilled, (state, action) => {
    //   const index = state.shifts.findIndex((s) => s.id === action.payload.id);
    //   if (index !== -1) {
    //     state.shifts[index] = action.payload;
    //   }
    // });
  }
})

export default shiftsSlice.reducer
export const {} = shiftsSlice.actions
