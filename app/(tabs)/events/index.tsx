import { FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchEvents } from "../../../store/slices/events.slice";
import EventListItem from "../../../components/Profile/EventListItem/EventListItem";

const Events = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const { events } = useAppSelector((state) => state.events);

  console.log(events);

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
