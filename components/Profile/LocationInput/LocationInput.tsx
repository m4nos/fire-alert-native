import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import * as Location from 'expo-location'
import { TextInput } from 'react-native-paper'
import { useFormikContext } from 'formik'
import { UserProfileFields } from '../ProfileInfo/types'
import useReverseGeolocation from '@hooks/useReverseGeolocation'

const LocationInput = () => {
  const { setFieldValue, values } = useFormikContext<UserProfileFields>()
  const { stateDistrict } = values.location

  const handleLocationAccess = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        return Alert.alert('Permission to access location was denied')
      }

      const location = await Location.getCurrentPositionAsync()
      const { latitude, longitude } = location.coords
      const address = await useReverseGeolocation({
        latitude,
        longitude
      })

      setFieldValue('location', {
        latitude,
        longitude,
        stateDistrict: address.state_district || address.state
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      {stateDistrict ? (
        <TextInput
          label="Location"
          value={stateDistrict}
          disabled
          multiline
          mode="outlined"
          right={
            <TextInput.Icon icon="refresh" onPress={handleLocationAccess} />
          }
        />
      ) : (
        <TextInput
          disabled
          placeholder="Grant access to location"
          mode="outlined"
          right={
            <TextInput.Icon icon="target" onPress={handleLocationAccess} />
          }
        />
      )}
    </View>
  )
}

export default LocationInput

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
