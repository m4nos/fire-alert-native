import { NewTrainingFormFields } from '@components/Events/NewTrainingForm/schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Event, EventType } from '@store/events/events.types';
import { FirebaseStore } from 'firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const eventsCollection = query(collection(FirebaseStore, 'events'));
    const eventsSnapshot = await getDocs(eventsCollection);

    const events = eventsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: String(new Date(doc.data().date.seconds)),
    })) as Event[];

    return events;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (
    event: NewTrainingFormFields & {
      organizer?: string;
      type: keyof typeof EventType;
    },
    { rejectWithValue }
  ) => {
    try {
      const docRef = await addDoc(collection(FirebaseStore, 'events'), event);
      return { ...event, id: docRef.id };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
