import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addEvent } from '@store/events/events.thunk';
import { NewTrainingFormFields } from './schema';

const initialValues = {
  description: '',
  date: '',
  location: {
    latitude: 0,
    longitude: 0,
  },
};

const NewTrainingForm = () => {
  const dispatch = useAppDispatch();
  const { firebaseUser } = useAppSelector((state) => state.user);
  const { addingEvent } = useAppSelector((state) => state.events.loading);

  const handleSubmit = async (values: NewTrainingFormFields) =>
    await dispatch(addEvent({ ...values, organizer: firebaseUser?.uid }));

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit, handleChange, values }) => (
        <View>
          <Text>NewTrainingForm</Text>
          <TextInput
            value={values.description}
            onChangeText={handleChange('description')}
            mode="outlined"
            multiline
            label="Description"
          />
          <Button
            onPress={() => handleSubmit()}
            loading={addingEvent}
            mode="contained"
            // disabled={!isValid}
          >
            Save
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default NewTrainingForm;

const styles = StyleSheet.create({});
