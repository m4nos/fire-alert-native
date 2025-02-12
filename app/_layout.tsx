import React from 'react'
import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import { store } from 'features/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MD3LightTheme, PaperProvider } from 'react-native-paper'

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PaperProvider theme={MD3LightTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default RootLayout
