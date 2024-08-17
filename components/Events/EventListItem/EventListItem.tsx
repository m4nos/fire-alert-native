import React from 'react';
import { Link, router } from 'expo-router';
import { Event, EventType } from '@store/events/events.types';
import { Button, Card, MD3LightTheme } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { deleteEvent } from '@store/events/events.thunk';

const EventListItem = ({ event }: { event: Event }) => {
  const { firebaseUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <Card
      onPress={() => router.push(`/events/${event.id}`)}
      style={styles.card}
    >
      <Card.Title
        title={`${event?.type?.[0] + event?.type?.slice(1).toLowerCase()} at ${
          event?.location?.province
        }`}
        subtitle={format(new Date(event?.timestamp), 'dd/MM/yyyy')}
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
      {event.organizer === firebaseUser?.uid && (
        <Card.Actions>
          <Button
            onPress={() =>
              router.push({
                pathname: '/events/edit-event',
                params: { id: event.id },
              })
            }
          >
            Edit
          </Button>
          <Button
            onPress={() =>
              dispatch(deleteEvent(event.id)).then(() =>
                Alert.alert('Event deleted successfully!')
              )
            }
            buttonColor={MD3LightTheme.colors.error}
          >
            Delete
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default EventListItem;
