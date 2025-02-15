import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Shifts' }} />
      <Stack.Screen
        name="[id]"
        options={{ title: 'Shift', headerShown: true }}
      />
      <Stack.Screen
        name="[id]/reserve"
        options={{ title: 'Reserve Slot', headerShown: true }}
      />
      <Stack.Screen
        name="create"
        options={{ title: 'Create shift', headerShown: true }}
      />
    </Stack>
  )
}

export default _layout
