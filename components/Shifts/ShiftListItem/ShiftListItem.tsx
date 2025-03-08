import React, { useState } from 'react'
import { router } from 'expo-router'
import { Shift } from '@store/shifts/shifts.types'
import {
  Button,
  Card,
  Dialog,
  IconButton,
  MD3LightTheme,
  Portal,
  Text
} from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons'
import { StyleSheet } from 'react-native'
import { format } from 'date-fns'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { deleteShift } from '@store/shifts/shifts.thunk'

const ShiftListItem = ({ shift }: { shift: Shift }) => {
  const { appUser } = useAppSelector((state) => state.userSlice)
  const dispatch = useAppDispatch()

  const [visible, setVisible] = useState(false)

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  return (
    <Card
      onPress={() => router.push(`/shifts/${shift.id}`)}
      style={styles.card}
    >
      <Card.Title
        title={shift.title}
        subtitle={`${shift.location.stateDistrict} - ${format(
          new Date(shift.startDate),
          'dd/MM/yyyy'
        )}`}
        left={() => (
          <FontAwesome name="calendar" color={MD3LightTheme.colors.primary} />
        )}
        titleNumberOfLines={2}
      />
      {shift?.createdBy?.uid === appUser?.uid && (
        <Card.Actions style={{ position: 'absolute', right: 0 }}>
          <IconButton
            onPress={() => showDialog()}
            icon={'delete'}
            iconColor={MD3LightTheme.colors.error}
            mode="contained"
          />
        </Card.Actions>
      )}
      <Portal>
        <Dialog visible={visible} onDismiss={() => {}}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              {`Are you sure you want to delete this shift? (${shift.title})`}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={() => dispatch(deleteShift(shift.id))}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
