import React from 'react'
import { router } from 'expo-router'
import { Shift } from '@store/shifts/shifts.types'
import { Button, Card, MD3LightTheme } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import { Alert, StyleSheet } from 'react-native'
import { format } from 'date-fns'
import { useAppDispatch, useAppSelector } from '@store/hooks'

const ShiftListItem = ({ shift }: { shift: Shift }) => {
  const { appUser } = useAppSelector((state) => state.userSlice)
  const dispatch = useAppDispatch()

  return (
    <Card
      onPress={() => router.push(`/shifts/${shift.id}`)}
      style={styles.card}
    >
      <Card.Title
        title={shift.title}
        subtitle={`${shift.id} - ${format(
          new Date(shift.startDate),
          'dd/MM/yyyy'
        )}`}
        left={() => (
          <FontAwesome
            name="calendar"
            size={14}
            color={MD3LightTheme.colors.primary}
          />
        )}
        leftStyle={{ width: 10 }}
        titleNumberOfLines={2}
        style={styles.title}
      />
      {shift?.createdBy?.uid === appUser?.uid && (
        <Card.Actions>
          <Button
            onPress={() => {
              // TODO: Implement delete shift functionality
              Alert.alert('Delete shift', 'Are you sure?', [
                {
                  text: 'Cancel',
                  style: 'cancel'
                },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => {
                    // dispatch(deleteShift(shift.id))
                  }
                }
              ])
            }}
            buttonColor={MD3LightTheme.colors.error}
          >
            Delete
          </Button>
        </Card.Actions>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 8,
    backgroundColor: MD3LightTheme.colors.background
  },
  title: {
    marginVertical: 4
  }
})

export default ShiftListItem
