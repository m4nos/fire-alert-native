import React from 'react'
import { router } from 'expo-router'
import { Shift } from '@store/shifts/shifts.types'
import { Card, IconButton, MD3LightTheme } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import { Alert, StyleSheet } from 'react-native'
import { format } from 'date-fns'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { deleteShift } from '@store/shifts/shifts.thunk'

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
        subtitle={`${
          shift.location.province || shift.location.municipality
        } - ${format(new Date(shift.startDate), 'dd/MM/yyyy')}`}
        left={() => (
          <FontAwesome name="calendar" color={MD3LightTheme.colors.primary} />
        )}
        titleNumberOfLines={2}
      />
      {shift?.createdBy?.uid === appUser?.uid && (
        <Card.Actions>
          <IconButton
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
                  onPress: () => dispatch(deleteShift(shift.id))
                }
              ])
            }}
            icon={'delete'}
            iconColor={MD3LightTheme.colors.error}
            mode="contained"
          />
        </Card.Actions>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: MD3LightTheme.colors.background,
    borderRadius: 0
  }
})

export default ShiftListItem
