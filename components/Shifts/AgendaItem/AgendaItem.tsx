import React, { useCallback } from 'react'
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button
} from 'react-native'
import testIDs from '../testIDs'
import { useAppDispatch } from '@store/hooks'
import { reserveSlot } from '@store/slots/slots.thunk'
import { useLocalSearchParams } from 'expo-router'
import { AppUser } from '@store/user/user.types'

type ItemProps = {
  item: {
    startHour: string
    endHour: string
    date: string
    duration: string
    title: string
    disabled: boolean
    reservedBy?: AppUser
  }
}

const AgendaItem = ({ item }: ItemProps) => {
  const dispatch = useAppDispatch()
  const { id: shiftId } = useLocalSearchParams()

  const buttonPressed = useCallback(() => {
    Alert.alert('Reserve Slot', 'Are you sure you want to reserve this slot?', [
      {
        text: 'No',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => {
          const [startHours, startMinutes] = item.startHour.split(':')
          const [endHours, endMinutes] = item.endHour.split(':')
          const startTime = new Date(item.date)
          startTime.setHours(parseInt(startHours, 10))
          startTime.setMinutes(parseInt(startMinutes, 10))
          startTime.setSeconds(0)

          const endTime = new Date(item.date)
          endTime.setHours(parseInt(endHours, 10))
          endTime.setMinutes(parseInt(endMinutes, 10))
          endTime.setSeconds(0)

          dispatch(
            reserveSlot({
              shiftId: shiftId as string,
              startTime,
              endTime
            })
          )
            .then(() =>
              Alert.alert('Slot Reserved', 'Slot reserved successfully')
            )
            .catch((error) => {
              console.log('error', error)
              Alert.alert('Error', 'Error reserving slot')
            })
        }
      }
    ])
  }, [dispatch, item, shiftId])

  if (!item) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity
      style={[styles.item, item.disabled && styles.disabledItem]}
      testID={testIDs.agenda.ITEM}
    >
      <View>
        <Text style={styles.itemHourText}>
          {item.startHour} - {item.endHour}
        </Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <Text style={styles.itemTitleText}>
        {item.reservedBy?.userName || item.title}
      </Text>
      <View style={styles.itemButtonContainer}>
        <Button
          color={'grey'}
          title={'Reserve'}
          onPress={buttonPressed}
          disabled={item.disabled}
        />
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(AgendaItem)

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  },
  disabledItem: {
    opacity: 0.5,
    backgroundColor: '#f5f5f5'
  }
})
