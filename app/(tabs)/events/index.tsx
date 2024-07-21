import { FlatList, StyleSheet } from 'react-native';
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

  return (
    events && (
      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
      />
    )
  );
};

export default Events;

const styles = StyleSheet.create({});
