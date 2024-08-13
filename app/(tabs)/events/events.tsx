import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import EventListItem from '@components/Events/EventListItem/EventListItem';
import { fetchEvents } from '@store/events/events.thunk';
import { FAB } from 'react-native-paper';
import { router } from 'expo-router';

export const Events = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const { events } = useAppSelector((state) => state.events);
  const { fetchingEvents } = useAppSelector((state) => state.events.loading);
  const { appUser } = useAppSelector((state) => state.user);

  console.log('events', events);

  // sort emergencies on top
  const sortedEvents = useMemo(() => {
    return events
      ? [...events].sort((a, b) => {
          if (a.type === 'EMERGENCY' && b.type !== 'EMERGENCY') {
            return -1;
          }
          if (a.type !== 'EMERGENCY' && b.type === 'EMERGENCY') {
            return 1;
          }
          return 0;
        })
      : [];
  }, [events]);

  return (
    <View style={styles.container}>
      {!!events.length && (
        <FlatList
          data={sortedEvents}
          renderItem={({ item }) => <EventListItem event={item} />}
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
  FAB: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 16,
  },
});
