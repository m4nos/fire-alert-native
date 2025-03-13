import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Profile', headerShown: false }}
      />
      {/* Add more screens here if needed */}
    </Stack>
  )
}

export default _layout
