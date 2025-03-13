import { StyleSheet, View } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useAppSelector } from '@store/hooks'
import { Card, Text, Button, Chip } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { format } from 'date-fns'

const ShiftDetails = () => {
  const { id: shiftId } = useLocalSearchParams()
  const shift = useAppSelector((state) =>
    state.shiftsSlice.shifts.find((s) => s.id === shiftId)
  )

  const { appUser } = useAppSelector((state) => state.userSlice)

  if (!shift) return null

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">{shift.title}</Text>
          {shift.description && (
            <>
              <Text variant="titleMedium">Shift Details</Text>
              <Text variant="bodyMedium">{shift.description}</Text>
            </>
          )}

          <Text variant="bodyLarge" style={styles.detail}>
            Start: {format(new Date(shift?.startDate), 'PPP')}
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Text variant="bodyLarge" style={styles.detail}>
              Status:
            </Text>
            <Chip>{shift.status}</Chip>
          </View>
          <Text variant="bodyLarge" style={styles.detail}>
            Created by: {shift.createdBy.userName}
          </Text>
          <Button
            mode="contained"
            onPress={() => router.push(`/shifts/${shiftId}/reserve`)}
            style={styles.reserveButton}
          >
            Reserve a Slot
          </Button>
        </Card.Content>
      </Card>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: shift.location.latitude,
          longitude: shift.location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.01
        }}
      >
        <Marker
          coordinate={{
            latitude: shift.location.latitude,
            longitude: shift.location.longitude
          }}
          title={shift.title}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  card: {
    marginBottom: 16
  },
  detail: {
    marginVertical: 8
  },
  map: {
    flex: 1,
    borderRadius: 8
  },
  reserveButton: {
    marginTop: 16
  }
})

export default ShiftDetails
