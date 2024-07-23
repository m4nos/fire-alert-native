import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import EventListItem from '@components/Events/EventListItem/EventListItem';
import { fetchEvents } from '@store/events/events.thunk';

const Events = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const { events } = useAppSelector((state) => state.events);

  console.log(events[0]);

  return (
    <View style={styles.container}>
      {events && (
        <FlatList
          data={events}
          renderItem={({ item }) => <EventListItem event={item} />}
        />
      )}
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },
});
