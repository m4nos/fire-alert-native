import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { useAppDispatch } from '@store/hooks';
import { Button, TextInput, Text, IconButton } from 'react-native-paper';
import { createShift } from '@store/shifts/shifts.thunk';
import { router } from 'expo-router';
import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const timeSlotSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
});

const createShiftSchema = z.object({
  date: z.date(),
  timeSlots: z.array(timeSlotSchema),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    municipality: z.string().min(1, 'Municipality is required'),
  }),
});

type TimeSlot = {
  startTime: string;
  endTime: string;
};

const CreateShiftScreen = () => {
  const dispatch = useAppDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const initialValues = {
    date: new Date(),
    timeSlots: [] as TimeSlot[],
    location: {
      latitude: 0,
      longitude: 0,
      municipality: '',
    },
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const shiftData = {
        date: values.date,
        timeSlots: values.timeSlots,
        location: values.location,
      };

      await dispatch(createShift(shiftData)).unwrap();
      router.back();
    } catch (error) {
      console.error('Failed to create shift:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(createShiftSchema)}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <View>
            <Text variant="titleLarge" style={styles.title}>
              Create New Shift
            </Text>

            <Text variant="bodyLarge">Date</Text>
            <Button
              mode="outlined"
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
            >
              {values.date.toLocaleDateString()}
            </Button>
            {showDatePicker && (
              <RNDateTimePicker
                value={values.date}
                mode="date"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) setFieldValue('date', date);
                }}
              />
            )}

            <Text variant="bodyLarge" style={styles.subtitle}>
              Time Slots
            </Text>
            {values.timeSlots.map((slot, index) => (
              <View key={index} style={styles.timeSlotContainer}>
                <TextInput
                  label="Start Time (HH:MM)"
                  value={slot.startTime}
                  onChangeText={(text) =>
                    setFieldValue(`timeSlots.${index}.startTime`, text)
                  }
                  style={styles.timeInput}
                  placeholder="00:00"
                />
                <TextInput
                  label="End Time (HH:MM)"
                  value={slot.endTime}
                  onChangeText={(text) =>
                    setFieldValue(`timeSlots.${index}.endTime`, text)
                  }
                  style={styles.timeInput}
                  placeholder="02:00"
                />
                <IconButton
                  icon="delete"
                  onPress={() =>
                    setFieldValue(
                      'timeSlots',
                      values.timeSlots.filter((_, i) => i !== index)
                    )
                  }
                />
              </View>
            ))}

            <Button
              mode="outlined"
              onPress={() =>
                setFieldValue('timeSlots', [
                  ...values.timeSlots,
                  { startTime: '', endTime: '' },
                ])
              }
              style={styles.addButton}
            >
              Add Time Slot
            </Button>

            <TextInput
              label="Municipality"
              value={values.location.municipality}
              onChangeText={(text) =>
                setFieldValue('location.municipality', text)
              }
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Latitude"
              value={String(values.location.latitude)}
              onChangeText={(text) =>
                setFieldValue('location.latitude', Number(text))
              }
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Longitude"
              value={String(values.location.longitude)}
              onChangeText={(text) =>
                setFieldValue('location.longitude', Number(text))
              }
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={styles.button}
            >
              Create Shifts
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeInput: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    marginBottom: 24,
  },
  button: {
    marginTop: 24,
  },
});

export default CreateShiftScreen;
