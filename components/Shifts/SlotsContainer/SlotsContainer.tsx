import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Shift } from '@store/shifts/shifts.types'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { fetchSlots } from '@store/slots/slots.thunk'
import { Card } from 'react-native-paper'

const SlotsContainer = ({ shift }: { shift: Shift }) => {
  const dispatch = useAppDispatch()
  const { slots, loading, error } = useAppSelector((state) => state.slotsSlice)

  useEffect(() => {
    dispatch(fetchSlots({ shiftId: shift.id }))
  }, [shift.id])

  if (loading) {
    return <Text>Loading slots...</Text>
  }

  if (error) {
    return <Text>Error loading slots: {error}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Slots</Text>
      {slots.map((slot) => (
        <Card key={slot.id} style={styles.card}>
          <Card.Content>
            <Text>
              Time: {slot.startTime} - {slot.endTime}
            </Text>
            <Text>Status: {slot.status}</Text>
            {slot.reservedBy && (
              <Text>Reserved by: {slot.reservedBy.userName}</Text>
            )}
          </Card.Content>
        </Card>
      ))}
    </View>
  )
}

export default SlotsContainer

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  card: {
    marginBottom: 8
  }
})
