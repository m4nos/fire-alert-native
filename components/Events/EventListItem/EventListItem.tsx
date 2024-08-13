import React from 'react';
import { Link } from 'expo-router';
import { Event, EventType } from '@store/events/events.types';
import { Card, MD3LightTheme } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const EventListItem = ({ event }: { event: Event }) => {
  return (
    <Link href={`/events/${event.id}`}>
      <Card>
        <Card.Title
          title={`${
            event?.type?.[0] + event?.type?.slice(1).toLowerCase()
          } at ${event?.location?.province}`}
          subtitle={event?.date}
          style={styles.card}
          left={() =>
            event?.type === EventType.TRAINING ? (
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
      </Card>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '55%',
  },
});

export default EventListItem;
