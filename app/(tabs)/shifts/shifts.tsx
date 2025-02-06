import { FlatList, StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import { FAB, Card, Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { fetchShifts } from '@store/shifts/shifts.thunk';

export const ShiftsScreen = () => {
  const dispatch = useAppDispatch();
  const { shifts, loading } = useAppSelector((state) => state.shiftsSlice);
  const { appUser } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(fetchShifts());
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={shifts}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => router.push(`/shifts/${item.id}`)}
          >
            <Card.Title
              title={`${item.title}`}
              subtitle={`Location: ${item.location.municipality}, ${item.location.province}`}
            />
            {/* <Card.Content>
              <Text>
                {item.reservedBy
                  ? `Reserved by: ${item.reservedBy}`
                  : 'Available'}
              </Text>
            </Card.Content> */}
          </Card>
        )}
        onRefresh={() => dispatch(fetchShifts())}
        refreshing={loading}
      />

      {appUser?.isAdmin && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.push('/shifts/create')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentedButtons: {},
  card: {},
  fab: {},
});
