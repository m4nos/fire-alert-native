import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { createEvent, editEvent } from '@store/events/events.thunk';
import MapView, { Marker } from 'react-native-maps';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { format, set } from 'date-fns';
import { Event } from '@store/events/events.types';
import useReverseGeolocation from '@hooks/useReverseGeolocation';
import { router } from 'expo-router';
import {
  newTrainingFormValidationSchema,
  newTrainingInitialValues,
} from './schema';

type TrainingFormProps = {
  eventId?: string;
};

export const TrainingForm = (props: TrainingFormProps) => {
  const dispatch = useAppDispatch();
  const { firebaseUser } = useAppSelector((state) => state.user);

  const {
    events,
    loading: { addingEvent, editingEvent },
  } = useAppSelector((state) => state.events);

  const eventToEdit = events.find((event) => event.id === props.eventId);

  const transformedEventToEdit = {
    ...eventToEdit,
    date: eventToEdit?.timestamp,
    time: eventToEdit?.timestamp,
  };

  const [showDateSelection, setShowDateSelection] = useState(false);
  const [showTimeSelection, setShowTimeSelection] = useState(false);

  const handleSubmit = async (
    values: typeof newTrainingInitialValues & Event
  ) => {
    const { date, time, ...restValues } = values;

    const combinedDateTime = set(values.date, {
      hours: new Date(time).getHours(),
      minutes: new Date(time).getMinutes(),
    });
    const timestamp = combinedDateTime.getTime();

    if (eventToEdit)
      return await dispatch(editEvent({ ...restValues, timestamp }))
        .then(() => Alert.alert('Event edited successfully!'))
        .catch(() => Alert.alert('There was an error editing this event'))
        .finally(() => router.back());

    return await dispatch(
      createEvent({
        ...restValues,
        timestamp,
        organizer: firebaseUser?.uid,
      })
    )
      .then(() => Alert.alert('New training event created successfully!'))
      .catch(() =>
        Alert.alert('There was an error creting a new training event')
      )
      .finally(() => router.back());
  };

  const handleMapPress = async (e: any, setFieldValue: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setFieldValue('location.latitude', latitude);
    setFieldValue('location.longitude', longitude);

    try {
      const locationDetails = await useReverseGeolocation({
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
      // @ts-expect-error Formik expects the same types as initial values
      initialValues={
        eventToEdit ? transformedEventToEdit : newTrainingInitialValues
      }
      onSubmit={handleSubmit}
      validationSchema={newTrainingFormValidationSchema}
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
        <SafeAreaView style={{ flex: 1 }}>
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
                style={{ width: '100%', height: 300 }}
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
                    title="Selected training location"
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
                  minimumDate={new Date()}
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
                loading={addingEvent || editingEvent}
                mode="contained"
                disabled={!isValid || addingEvent || editingEvent}
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
    padding: 20,
    flexGrow: 1,
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
