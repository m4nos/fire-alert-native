import { createAsyncThunk } from '@reduxjs/toolkit';
import { Event } from '@store/events/events.types';
import { FirebaseStore } from 'firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const eventsCollection = query(collection(FirebaseStore, 'events'));
    const eventsSnapshot = await getDocs(eventsCollection);

    const events = eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[];

    return events;
  } catch (error: any) {
    throw new Error(error);
  }
});
