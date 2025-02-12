import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import EventListItem from '@components/Events/EventListItem/EventListItem'
import { fetchEvents } from '@store/events/events.thunk'
import { FAB } from 'react-native-paper'
import { router } from 'expo-router'

const Events = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  const {
    events,
    loading: { fetchingEvents }
  } = useAppSelector((state) => state.eventsSlice)

  const { appUser } = useAppSelector((state) => state.userSlice)

  // sort emergencies on top
  const sortedEvents = useMemo(() => {
    return events
      ? [...events].sort((a, b) => {
          if (a.type === 'EMERGENCY' && b.type !== 'EMERGENCY') {
            return -1
          }
          if (a.type !== 'EMERGENCY' && b.type === 'EMERGENCY') {
            return 1
          }
          return 0
        })
      : []
  }, [events])

  return (
    <View style={styles.container}>
      {!!events.length && (
        <FlatList
          data={sortedEvents}
          renderItem={({ item }) => (
            <EventListItem event={item} key={item.id} />
          )}
          onRefresh={() => dispatch(fetchEvents())}
          refreshing={fetchingEvents}
        />
      )}
      {appUser?.isAdmin && !fetchingEvents && (
        <FAB
          icon="plus"
          style={styles.FAB}
          onPress={() => router.push('/events/new-event')}
        />
      )}
    </View>
  )
}

export default Events

const styles = StyleSheet.create({
  container: {},
  FAB: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 0
  }
})
