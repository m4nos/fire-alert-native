import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import TrainingForm from '@components/Events/TrainingForm';
import EmergencyForm from '@components/Events/EmergencyForm';

const CreateEvent = () => {
  const [segmentation, setSegmentation] = useState('training');
  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={segmentation}
        onValueChange={setSegmentation}
        buttons={[
          { value: 'training', label: 'Training', icon: 'fire-extinguisher' },
          {
            value: 'emergency',
            label: 'Emergency',
            icon: 'alert',
          },
        ]}
        style={styles.segmentedButtons}
      />
      {segmentation === 'training' ? <TrainingForm /> : <EmergencyForm />}
    </View>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  segmentedButtons: {},
});
