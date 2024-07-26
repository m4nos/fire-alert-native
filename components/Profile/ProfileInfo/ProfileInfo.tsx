import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useFormikContext } from 'formik';
import LocationInput from '@components/Profile/LocationInput';
import { UserProfileFields } from './types';

const ProfileInfo = () => {
  const { values, handleChange, handleBlur, errors, touched, setFieldValue } =
    useFormikContext<UserProfileFields>();

  return (
    <View>
      <TextInput
        label="User name"
        value={values.userName}
        onChangeText={handleChange('userName')}
        onBlur={handleBlur('userName')}
        mode="outlined"
        error={touched.userName && Boolean(errors.userName)}
      />
      {touched.userName && errors.userName && (
        <Text style={{ color: 'red' }}>{errors.userName}</Text>
      )}
      <TextInput
        label="Phone number"
        value={values.phoneNumber}
        keyboardType="number-pad"
        onChangeText={handleChange('phoneNumber')}
        onBlur={handleBlur('phoneNumber')}
        mode="outlined"
        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
      />
      {touched.phoneNumber && errors.phoneNumber && (
        <Text style={{ color: 'red' }}>{errors.phoneNumber}</Text>
      )}
      <LocationInput />
    </View>
  );
};

export default ProfileInfo;
