import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { useAppSelector } from '@store/hooks';

const EventDetails = () => {
  const { id: eventId } = useLocalSearchParams();
  const event = useAppSelector((state) =>
    state.events.events.find((e) => e.id === eventId)
  );

  return (
    <View style={styles.container}>
      <Text>EventDetails {eventId}</Text>
      <MapView
        style={{ width: '100%', height: '60%' }}
        initialRegion={{
          latitude: 37.78825, // Initial latitude
          longitude: -336, // Initial longitude
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
      {/* {selectedLocation && (
        <View style={{ padding: 10 }}>
          <Text>Selected Latitude: {selectedLocation.latitude}</Text>
          <Text>Selected Longitude: {selectedLocation.longitude}</Text>
        </View>
      )} */}
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
