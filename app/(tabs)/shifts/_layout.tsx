import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Shifts' }} />
      <Stack.Screen
        name="[id]"
        options={{ headerShown: true, title: 'Shift' }}
      />
      <Stack.Screen
        name="create"
        options={{ headerShown: true, title: 'Create shift' }}
      />
    </Stack>
  )
}

export default _layout
