import { createSlice } from "@reduxjs/toolkit";

type Marker = {
  long: string;
  lat: string;
};

interface MapState {
  markers: Marker[];
}

const initialState: MapState = {
  markers: [],
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMarker: (state, action) => (state.markers = action.payload),
  },
});

export default mapSlice.reducer;
