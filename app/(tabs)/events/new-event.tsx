import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SegmentedButtons } from 'react-native-paper';
import NewTrainingForm from '@components/Events/NewTrainingForm/NewTrainingForm';
import NewEmergencyForm from '@components/Events/NewEmergencyForm';

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
      {segmentation === 'training' ? <NewTrainingForm /> : <NewEmergencyForm />}
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
