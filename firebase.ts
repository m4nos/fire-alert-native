import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from 'firebase.config'

const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = initializeAuth(FirebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const FirebaseStore = getFirestore(FirebaseApp)
