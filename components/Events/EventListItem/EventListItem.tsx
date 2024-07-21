import React from 'react';
import { Link } from 'expo-router';
import { Event } from '@store/types/events.types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';

const EventListItem = ({ event }: { event: Event }) => {
  return (
    <Link href={`/events/${event.id}`} asChild>
      <TouchableOpacity>
        <Text>event {event.id}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default EventListItem;
