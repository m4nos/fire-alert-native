import LoadingSpinner from '@components/LoadingSpinner'
import AgendaItem from '@components/Shifts/AgendaItem'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { fetchSlots } from '@store/slots/slots.thunk'
import { max } from 'date-fns'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar
} from 'react-native-calendars'
import { MarkedDates } from 'react-native-calendars/src/types'

const getDates = (shiftStartingDate?: Date) =>
  Array.from({ length: 7 }, (_, index) => {
    const date = max([new Date(), shiftStartingDate || new Date()])
    date.setDate(date.getDate() + index)
    return date.toISOString().split('T')[0]
  })

// export function getMarkedDates() {
//   const marked: MarkedDates = {}

//   agendaItems.forEach((item) => {
//     // NOTE: only mark dates with data
//     // if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
//     if (item.data && item.data.length > 0) {
//       marked[item.title] = { marked: true }
//     } else {
//       marked[item.title] = { disabled: true }
//     }
//   })
//   return marked
// }

const ReserveSlot = () => {
  const { id: shiftId } = useLocalSearchParams()
  const dispatch = useAppDispatch()
  const { slots, loading } = useAppSelector((state) => state.slotsSlice)

  const shift = useAppSelector((state) =>
    state.shiftsSlice.shifts.find((s) => s.id === shiftId)
  )

  if (!shift) return null

  useEffect(() => {
    dispatch(fetchSlots({ shiftId: shift?.id }))
  }, [dispatch, shiftId])

  // Generate agenda items from shift time slots
  const agendaItems = getDates(new Date(shift.startDate)).map((date) => ({
    title: date,
    data:
      shift?.timeSlots.map((slot) => {
        const [startHours, startMinutes] = slot.startTime.split(':').map(Number)
        const [endHours, endMinutes] = slot.endTime.split(':').map(Number)

        // Calculate duration in minutes
        const startTotalMinutes = startHours * 60 + startMinutes
        const endTotalMinutes = endHours * 60 + endMinutes
        const durationHours = (endTotalMinutes - startTotalMinutes) / 60

        // Create a timestamp for the candidate slot by combining the date and the time slot's startTime.
        const candidateTimestamp = new Date(
          `${date}T${slot.startTime}:00`
        ).getTime()

        // Check if this slot is already reserved by comparing timestamps.
        let isReserved
        let reservedBy

        slots.forEach((existingSlot) => {
          if (existingSlot.startTime === candidateTimestamp) {
            isReserved = true
            reservedBy = existingSlot.reservedBy
          }
        })

        return {
          startHour: slot.startTime,
          endHour: slot.endTime,
          date,
          duration: `${durationHours.toFixed()}h`,
          title: shift.title,
          disabled: isReserved,
          reservedBy
        }
      }) || []
  }))

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />
  }, [])

  return (
    <View style={styles.container}>
      <LoadingSpinner loading={loading} />
      {shift && (
        <CalendarProvider date={getDates(new Date(shift.startDate))[0]}>
          <ExpandableCalendar />
          <AgendaList sections={agendaItems} renderItem={renderItem} />
        </CalendarProvider>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginBottom: 16
  }
})

export default ReserveSlot
