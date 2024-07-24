import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppUser } from '@store/user/user.types';
import { router } from 'expo-router';
import { FirebaseAuth, FirebaseStore } from 'firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Alert } from 'react-native';

interface AuthCredentials {
  email: string;
  password: string;
}

export const login = createAsyncThunk<User | null, AuthCredentials>(
  'user/login',
  async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      if (response.user.emailVerified) {
        router.replace('/(tabs)/profile');
        return response.user.toJSON() as User;
      } else alert('You need to verify your email first!');
    } catch (error) {
      console.error(error);
    }
    return null;
  }
);

export const signUp = createAsyncThunk<void, AuthCredentials>(
  'user/signUp',
  async ({ email, password }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      ).catch((error) => {
        throw new Error(error);
      });

      await addDoc(collection(FirebaseStore, 'users'), {
        email,
        uid: user.uid,
      }).catch((error) => {
        throw new Error(error);
      });

      await sendEmailVerification(user, {
        handleCodeInApp: true,
        url: 'https://fire-alert-d86d4.firebaseapp.com',
      })
        .then(() => {
          Alert.alert('email verification sent!');
        })
        .catch((error) => {
          throw new Error(error);
        });

      router.push('/(auth)/login');
    } catch (error) {
      console.log(error);
    }
  }
);

export const logout = createAsyncThunk<void>('user/logout', async () => {
  try {
    await FirebaseAuth.signOut();
    router.replace('/(auth)/login');
  } catch (error) {
    console.error(error);
  }
});

export const fetchAppUser = createAsyncThunk<AppUser | null, string>(
  'user/fetchAppUser',
  async (uid: string) => {
    try {
      // Perform query to find user document with matching uid
      const userQuery = query(
        collection(FirebaseStore, 'users'),
        where('uid', '==', uid)
      );
      const querySnapshot = await getDocs(userQuery);

      // Check if any matching documents were found
      if (!querySnapshot.empty) {
        // Get the first document (assuming unique uid)
        const userDoc = querySnapshot.docs[0];
        // Extract user data from document
        const userData = userDoc.data() as AppUser;
        console.log('user fetched!');
        return userData;
      } else {
        // No matching user found
        return null;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const updateAppUser = createAsyncThunk(
  'user/updateAppUser',
  async (profileData: AppUser) => {
    try {
      // Query Firestore to find the document with the user's email
      const userQuery = query(
        collection(FirebaseStore, 'users'),
        where('email', '==', profileData.email)
      );
      const querySnapshot = await getDocs(userQuery);

      // Check if any documents match the query
      if (!querySnapshot.empty) {
        // Get the first document (assuming unique email)
        const userDoc = querySnapshot.docs[0];
        const userDocRef = doc(FirebaseStore, 'users', userDoc.id);

        // Update the existing document with the new user data
        await updateDoc(userDocRef, profileData);
        Alert.alert('User data updated successfully!');
        console.log('User data updated successfully!');
      } else {
        console.log('No matching document found for the user email');
      }
    } catch (error) {
      console.error('Error updating user data: ', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }
);
