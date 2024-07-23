import React from 'react';
import { Link } from 'expo-router';
import { Event, EventType } from '@store/events/events.types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, MD3LightTheme } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const EventListItem = ({ event }: { event: Event }) => {
  return (
    <Link href={`/events/${event.id}`} asChild>
      <TouchableOpacity>
        <Card.Title
          title={`${event.type[0] + event.type.slice(1).toLowerCase()} at ${
            event.province
          }`}
          subtitle={event.date}
          left={() =>
            event.type === EventType.TRAINING ? (
              <FontAwesome
                name="fire-extinguisher"
                size={24}
                color={MD3LightTheme.colors.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="fire-alert"
                size={24}
                color={MD3LightTheme.colors.error}
              />
            )
          }
        />
      </TouchableOpacity>
    </Link>
  );
};

export default EventListItem;
