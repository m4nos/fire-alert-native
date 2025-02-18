import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useFormikContext } from 'formik'
import LocationInput from '@components/Profile/LocationInput'
import { UserProfileFields } from './types'

const ProfileInfo = () => {
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<UserProfileFields>()

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          label="User name"
          value={values.userName}
          onChangeText={handleChange('userName')}
          onBlur={handleBlur('userName')}
          mode="outlined"
          error={touched.userName && Boolean(errors.userName)}
        />
        {touched.userName && errors.userName && (
          <Text style={styles.errorText}>{errors.userName}</Text>
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
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        )}
        <LocationInput />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    gap: 25,
    overflow: 'scroll'
  },
  input: {},
  errorText: {
    color: 'red',
    fontSize: 12,
    top: -19,
    marginBottom: -42
  }
})

export default React.memo(ProfileInfo)
