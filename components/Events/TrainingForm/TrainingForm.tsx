import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { createEvent, editEvent } from '@store/events/events.thunk';
import MapView, { Marker } from 'react-native-maps';
import getReverseGeolocation from '@services/useReverseGeocoding';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { format, set } from 'date-fns';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { EventType } from '@store/events/events.types';

const initialValues = {
  id: '',
  description: '',
  date: NaN,
  time: NaN,
  location: {
    latitude: NaN,
    longitude: NaN,
    province: '',
    municipality: '',
  },
  type: EventType.TRAINING,
};

const newTrainingFormValidationSchema = z.object({
  description: z.string().min(1, 'Description must be more than 10 characters'),
  // .minLength(10),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  date: z.number({
    required_error: 'Date is required',
  }),
  time: z.number({
    required_error: 'Time is required',
  }),
});

type TrainingFormProps = {
  eventId?: string;
};

export const TrainingForm = (props: TrainingFormProps) => {
  const dispatch = useAppDispatch();
  const { firebaseUser } = useAppSelector((state) => state.user);
  const { addingEvent } = useAppSelector((state) => state.events.loading);

  const { events } = useAppSelector((state) => state.events);

  const eventToEdit = events.find((event) => event.id === props.eventId);

  const transformedEventToEdit = {
    ...eventToEdit,
    date: eventToEdit?.timestamp,
    time: eventToEdit?.timestamp,
  };

  const [showDateSelection, setShowDateSelection] = useState(false);
  const [showTimeSelection, setShowTimeSelection] = useState(false);

  const handleSubmit = async (values: typeof initialValues) => {
    const { date, time, ...restValues } = values;

    const combinedDateTime = set(values.date, {
      hours: new Date(time).getHours(),
      minutes: new Date(time).getMinutes(),
    });
    const timestamp = combinedDateTime.getTime();

    if (eventToEdit)
      return await dispatch(editEvent({ ...restValues, timestamp }));

    return await dispatch(
      createEvent({
        ...restValues,
        timestamp,
        organizer: firebaseUser?.uid,
      })
    );
  };

  const handleMapPress = async (e: any, setFieldValue: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setFieldValue('location.latitude', latitude);
    setFieldValue('location.longitude', longitude);

    try {
      const locationDetails = await getReverseGeolocation({
        latitude,
        longitude,
      });
      setFieldValue(
        'location.municipality',
        locationDetails.municipality ||
          locationDetails.city ||
          locationDetails.village
      );
      setFieldValue(
        'location.province',
        locationDetails.province || locationDetails.county
      );
    } catch (error) {
      console.error('Error fetching reverse geolocation:', error);
    }
  };

  return (
    <Formik
      initialValues={eventToEdit ? transformedEventToEdit : initialValues}
      onSubmit={handleSubmit}
      validationSchema={toFormikValidationSchema(
        newTrainingFormValidationSchema
      )}
    >
      {({
        values,
        isValid,
        touched,
        errors,
        handleSubmit,
        handleChange,
        setFieldValue,
      }) => (
        <SafeAreaView>
          <ScrollView style={styles.container}>
            <View style={styles.flexForm}>
              {/* <>{console.log(values)}</> */}
              <TextInput
                value={values.description}
                onChangeText={handleChange('description')}
                mode="outlined"
                multiline
                label="Description"
                error={touched.description && Boolean(errors.description)}
              />
              {touched.description && errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
              <MapView
                style={{ width: '100%', height: '50%' }}
                initialRegion={{
                  latitude: 37.78825, // Initial latitude
                  longitude: -336, // Initial longitude
                  latitudeDelta: 13,
                  longitudeDelta: 4,
                }}
                onPress={(e) => handleMapPress(e, setFieldValue)}
                zoomControlEnabled
              >
                {!!values.location?.latitude && (
                  <Marker
                    coordinate={values.location}
                    title="Selected Location"
                  />
                )}
              </MapView>
              {!!values.location?.latitude && (
                <Text>
                  Selected Location: {values.location.municipality},
                  {values.location.province}
                </Text>
              )}
              <SegmentedButtons
                value=""
                onValueChange={() => ({})}
                buttons={[
                  {
                    value: '_date',
                    label: 'Select date',
                    icon: 'calendar',
                    onPress: () => setShowDateSelection(true),
                  },
                  {
                    value: '_time',
                    label: 'Select time',
                    icon: 'clock',
                    onPress: () => setShowTimeSelection(true),
                  },
                ]}
                // style={styles.segmentedButtons}
              />
              {!!values.date && (
                <Text style={styles.date}>
                  Selected date: {`${format(values.date, 'dd/MM/yy')}`}
                </Text>
              )}
              {!!values.time && (
                <Text style={styles.time}>
                  Selected time: {`${format(values.time, 'HH:mm')}`}
                </Text>
              )}
              {showDateSelection && (
                <RNDateTimePicker
                  value={values.date ? new Date(values.date) : new Date()}
                  onChange={(newDate) => {
                    setShowDateSelection(false);
                    setFieldValue('date', newDate.nativeEvent.timestamp);
                  }}
                />
              )}
              {showTimeSelection && (
                <RNDateTimePicker
                  value={values.time ? new Date(values.time) : new Date()}
                  onChange={(newDate) => {
                    setShowTimeSelection(false);
                    setFieldValue('time', newDate.nativeEvent.timestamp);
                  }}
                  mode="time"
                  minuteInterval={5}
                />
              )}
              <Button
                onPress={() => handleSubmit()}
                loading={addingEvent}
                mode="contained"
                disabled={!isValid}
              >
                Save
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    padding: 20,
  },
  flexForm: {
    gap: 10,
  },
  date: {
    fontSize: 20,
    fontWeight: '500',
  },
  time: {
    fontSize: 20,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
