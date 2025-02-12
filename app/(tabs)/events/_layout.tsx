import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Events' }} />
      <Stack.Screen
        name="[id]"
        options={{ headerShown: true, title: 'Training' }}
      />
      <Stack.Screen
        name="edit-event"
        options={{ headerShown: true, title: 'Edit event' }}
      />
    </Stack>
  )
}

export default _layout
