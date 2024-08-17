import { NewTrainingFormFields } from '@components/Events/TrainingForm/schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Event } from '@store/events/events.types';
import { FirebaseStore } from 'firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  try {
    const eventsCollection = query(collection(FirebaseStore, 'events'));
    const eventsSnapshot = await getDocs(eventsCollection);

    const events = eventsSnapshot.docs
      .filter((doc) => doc.id !== '0')
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
        // timestamp: doc.data().timestamp,
      })) as Event[];

    return events;
  } catch (error: any) {
    throw new Error(error);
  }
});

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (event: Event, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(FirebaseStore, 'events'), event);
      console.log(event);
      return {
        ...event,
        id: docRef.id,
      } as Event;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editEvent = createAsyncThunk(
  'events/editEvent',
  async (event: Event, { rejectWithValue }) => {
    try {
      const docRef = doc(FirebaseStore, 'events', event.id);
      await updateDoc(docRef, event);

      // Return the updated event data (you may also refetch the document if needed)
      return event;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const docRef = doc(FirebaseStore, 'events', eventId);
      await deleteDoc(docRef);

      // Return the ID of the deleted event
      return eventId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
