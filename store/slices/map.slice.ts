import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseStore } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";

type Marker = {
  id: string;
  latitude: number;
  longitude: number;
};

interface MapState {
  markers: Marker[];
  loading: boolean;
  error?: Error;
}

const initialState: MapState = {
  markers: [],
  loading: false,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMarker: (state, action) => (state.markers = action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMarkers.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchMarkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      }),
      builder.addCase(fetchMarkers.fulfilled, (state, action) => {
        state.loading = false;
        state.markers = action.payload;
      });
  },
});

export const fetchMarkers = createAsyncThunk("map/fetchMarkers", async () => {
  try {
    const markersCollection = query(collection(FirebaseStore, "markers"));
    const markersSnapshot = await getDocs(markersCollection);

    const markers = markersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Marker[];
    return markers;
  } catch (error: any) {
    throw new Error(error);
  }
});

export default mapSlice.reducer;
