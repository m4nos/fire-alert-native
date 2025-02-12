import { initializeApp } from 'firebase/app'
import firebaseConfig from './firebase.json' with { type: 'json' }
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'

const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = initializeAuth(FirebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const FirebaseStore = getFirestore(FirebaseApp)
