import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import TrainingForm from '@components/Events/TrainingForm';

const EditEvent = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <TrainingForm eventId={id as string} />
    </View>
  );
};

export default EditEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
