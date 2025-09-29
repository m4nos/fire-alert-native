import LoadingSpinner from '@components/LoadingSpinner'
import AgendaItem from '@components/Shifts/AgendaItem'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { fetchSlots } from '@store/slots/slots.thunk'
import { max } from 'date-fns'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback, useEffect, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { AgendaList, CalendarProvider } from 'react-native-calendars'

const getDates = (shiftStartingDate?: Date) =>
  Array.from({ length: 7 }, (_, index) => {
    const date = max([new Date(), shiftStartingDate || new Date()])
    date.setDate(date.getDate() + index)
    return date.toISOString().split('T')[0]
  })

const ReserveSlot = () => {
  const { id: shiftId } = useLocalSearchParams()
  const { appUser } = useAppSelector((state) => state.userSlice)
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
  const agendaItems = useMemo(
    () =>
      getDates(new Date(shift.startDate)).map((date) => ({
        title: date,
        data:
          shift?.timeSlots.map((slot) => {
            const [startHours, startMinutes] = slot.startTime
              .split(':')
              .map(Number)
            const [endHours, endMinutes] = slot.endTime.split(':').map(Number)

            // Calculate duration in minutes
            const startTotalMinutes = startHours * 60 + startMinutes
            const endTotalMinutes = endHours * 60 + endMinutes
            const durationHours = (endTotalMinutes - startTotalMinutes) / 60

            // Create a timestamp for the candidate slot by combining the date and the time slot's startTime.
            const candidateTimestamp = new Date(
              `${date}T${slot.startTime}:00`
            ).getTime()

            // Check how many slots are already reserved for this time slot by comparing timestamps.
            const reservedSlots = slots.filter(
              (existingSlot) => existingSlot.startTime === candidateTimestamp
            )

            const currentReservations = reservedSlots.length
            const maxSlots = Number(slot.maxSlots)
            const isFullyBooked = currentReservations >= maxSlots
            const isReservedByCurrentUser = reservedSlots.some(
              (s) => s.reservedBy?.uid === appUser?.uid
            )

            return {
              startHour: slot.startTime,
              endHour: slot.endTime,
              date,
              duration: `${durationHours.toFixed()}h`,
              title: shift.title,
              disabled: isFullyBooked || isReservedByCurrentUser,
              reservedBy: reservedSlots
                .map((s) => s.reservedBy)
                .filter(Boolean),
              currentReservations,
              maxSlots
            }
          }) || []
      })),
    [slots]
  )

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />
  }, [])

  return (
    <View style={styles.container}>
      <LoadingSpinner loading={loading} />
      {shift && (
        <CalendarProvider date={getDates(new Date(shift.startDate))[0]}>
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
