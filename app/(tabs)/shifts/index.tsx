import { FlatList, StyleSheet, View } from 'react-native'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { FAB } from 'react-native-paper'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { fetchShifts } from '@store/shifts/shifts.thunk'
import ShiftListItem from '@components/Shifts/ShiftListItem'
import LoadingSpinner from '@components/LoadingSpinner'

const ShiftsScreen = () => {
  const dispatch = useAppDispatch()
  const { shifts, loading } = useAppSelector((state) => state.shiftsSlice)
  const { appUser } = useAppSelector((state) => state.userSlice)

  useEffect(() => {
    dispatch(fetchShifts())
  }, [])

  return (
    <View style={styles.container}>
      <LoadingSpinner loading={loading} />
      <FlatList
        data={shifts}
        renderItem={({ item }) => <ShiftListItem shift={item} />}
        onRefresh={() => dispatch(fetchShifts())}
        refreshing={loading}
      />
      {appUser?.role === 'admin' && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.push('/shifts/create')}
        />
      )}
    </View>
  )
}

export default ShiftsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
})
