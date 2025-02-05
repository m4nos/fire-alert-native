import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAppDispatch } from 'features/hooks';
import { TextInput, Button } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { createShift } from '@store/shifts/shifts.thunk';

const ShiftCreationForm = () => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{
        startTime: new Date(),
        endTime: new Date(),
        locationName: '',
        latitude: 0,
        longitude: 0,
      }}
      onSubmit={(values) => dispatch(createShift(values))}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <DateTimePicker
            value={values.startTime}
            onChange={(_, date) => setFieldValue('startTime', date)}
          />

          <DateTimePicker
            value={values.endTime}
            onChange={(_, date) => setFieldValue('endTime', date)}
          />

          <TextInput
            label="Location Name"
            value={values.locationName}
            onChangeText={(text) => setFieldValue('locationName', text)}
          />

          <Button mode="contained" onPress={() => handleSubmit()}>
            Create Shift
          </Button>
        </ScrollView>
      )}
    </Formik>
  );
};

export default ShiftCreationForm;
