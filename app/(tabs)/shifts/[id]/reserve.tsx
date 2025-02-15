import AgendaItem from '@components/Shifts/SlotsContainer/AgendaItem/AgendaItem'
import { useLocalSearchParams } from 'expo-router'
import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar
} from 'react-native-calendars'
import { MarkedDates } from 'react-native-calendars/src/types'

const today = new Date().toISOString().split('T')[0]
const dates = Array.from({ length: 7 }, (_, index) => {
  const date = new Date()
  date.setDate(date.getDate() + index)
  return date.toISOString().split('T')[0]
})

export function getMarkedDates() {
  const marked: MarkedDates = {}

  agendaItems.forEach((item) => {
    // NOTE: only mark dates with data
    // if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
    if (item.data && item.data.length > 0) {
      marked[item.title] = { marked: true }
    } else {
      marked[item.title] = { disabled: true }
    }
  })
  return marked
}

export const agendaItems = [
  {
    title: dates[0],
    data: [
      { hour: '12am', duration: '1h', title: 'First Yoga' },
      {
        hour: '9am',
        duration: '1h',
        title: 'Long Yoga',
        itemCustomHeightType: 'LongEvent'
      }
    ]
  },
  {
    title: dates[1],
    data: [
      { hour: '4pm', duration: '1h', title: 'Pilates ABC' },
      { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' }
    ]
  },
  {
    title: dates[2],
    data: [
      { hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' },
      { hour: '2pm', duration: '1h', title: 'Deep Stretches' },
      { hour: '3pm', duration: '1h', title: 'Private Yoga' }
    ]
  },
  {
    title: dates[3],
    data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }]
  },
  {
    title: dates[4],
    data: [{}]
  },
  {
    title: dates[5],
    data: [
      { hour: '9pm', duration: '1h', title: 'Middle Yoga' },
      { hour: '10pm', duration: '1h', title: 'Ashtanga' },
      { hour: '11pm', duration: '1h', title: 'TRX' },
      { hour: '12pm', duration: '1h', title: 'Running Group' }
    ]
  },
  {
    title: dates[6],
    data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }]
  }
]

const ReserveSlot = () => {
  const { id: shiftId } = useLocalSearchParams()

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />
  }, [])

  return (
    <View style={styles.container}>
      <CalendarProvider date={new Date().toISOString().split('T')[0]}>
        <ExpandableCalendar
        // Add any necessary props for your calendar
        />
        <AgendaList
          sections={agendaItems}
          renderItem={renderItem}
          //   scrollToNextEvent
          //   sectionStyle={styles.section}
          // dayFormat={'yyyy-MM-d'}
        />
      </CalendarProvider>
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
