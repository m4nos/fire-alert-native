import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import { MD3LightTheme } from 'react-native-paper'
import { TouchableOpacity } from 'react-native'

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) => <FontAwesome size={24} {...props} />

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        // @ts-ignore
        tabBarButton: (props) => <TouchableOpacity {...props} />
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarActiveTintColor: MD3LightTheme.colors.primary,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          headerShown: false,
          tabBarActiveTintColor: MD3LightTheme.colors.primary,
          tabBarIcon: ({ color }) => <TabBarIcon name="fire" color={color} />
        }}
      />
      <Tabs.Screen
        name="shifts"
        options={{
          title: 'Shifts',
          headerShown: false,
          tabBarActiveTintColor: MD3LightTheme.colors.primary,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="binoculars" color={color} />
          )
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
