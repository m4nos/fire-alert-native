import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { useAppSelector } from '@store/hooks';
import { format } from 'date-fns';

const EventDetails = () => {
  const { id: eventId } = useLocalSearchParams();
  const event = useAppSelector((state) =>
    state.events.events.find((e) => e.id === eventId)
  );

  return (
    <View style={styles.container}>
      <Text>Event Description: {event?.description}</Text>
      <MapView
        style={{ width: '100%', height: '60%' }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -336,
          latitudeDelta: 13,
          longitudeDelta: 4,
        }}
      >
        {event?.location && (
          <Marker
            coordinate={{
              latitude: Number(event.location.latitude),
              longitude: Number(event.location.longitude),
            }}
            title="Selected Location"
          />
        )}
      </MapView>
      {event?.timestamp && (
        <Text style={styles.date}>
          Selected date: {`${format(event.timestamp, 'dd/MM/yy')}`}
        </Text>
      )}
      {event?.timestamp && (
        <Text style={styles.time}>
          Selected time: {`${format(event.timestamp, 'HH:mm')}`}
        </Text>
      )}
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  date: {
    fontSize: 20,
    fontWeight: '500',
  },
  time: {
    fontSize: 20,
    fontWeight: '500',
  },
});
