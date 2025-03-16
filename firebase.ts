import { initializeApp } from 'firebase/app'
// @ts-expect-error https://stackoverflow.com/questions/76914913/cannot-import-getreactnativepersistence-in-firebase10-1-0
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from 'firebase.config'

const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = initializeAuth(FirebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const FirebaseStore = getFirestore(FirebaseApp)
