import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAppSelector } from '@store/hooks';
import { Card, Text, Button } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { format } from 'date-fns';

const ShiftDetails = () => {
  const { id: shiftId } = useLocalSearchParams();
  const shift = useAppSelector((state) =>
    state.shiftsSlice.shifts.find((s) => s.id === shiftId)
  );
  const { appUser } = useAppSelector((state) => state.userSlice);

  if (!shift) return null;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Shift Details</Text>

          <Text variant="bodyLarge" style={styles.detail}>
            Start: {format(new Date(shift.startTime), 'PPpp')}
          </Text>

          <Text variant="bodyLarge" style={styles.detail}>
            End: {format(new Date(shift.endTime), 'PPpp')}
          </Text>

          <Text variant="bodyLarge" style={styles.detail}>
            Status: {shift.status}
          </Text>

          {shift.reservedBy && (
            <Text variant="bodyLarge" style={styles.detail}>
              Reserved by: {shift.reservedBy.userName}
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: shift.location.latitude,
          longitude: shift.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: shift.location.latitude,
            longitude: shift.location.longitude,
          }}
          title={shift.location.municipality}
        />
      </MapView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  detail: {
    marginVertical: 8,
  },
  map: {
    flex: 1,
    borderRadius: 8,
  },
});

export default ShiftDetails;
