import { createSlice } from '@reduxjs/toolkit'
import { MapState } from './map.types'
import { fetchMarkers } from '@store/map/map.thunk'

const initialState: MapState = {
  markers: [],
  loading: false
}

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState,
  reducers: {
    setMarker: (state, action) => (state.markers = action.payload)
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMarkers.pending, (state) => {
      state.loading = true
      console.log('fetching markers...')
    }),
      builder.addCase(fetchMarkers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as Error
      }),
      builder.addCase(fetchMarkers.fulfilled, (state, action) => {
        state.loading = false
        state.markers = action.payload
        console.log('markers fetched!')
      })
  }
})

export const { setMarker } = mapSlice.actions
export default mapSlice.reducer
