import { Alert, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import getReverseGeolocation from '@services/useReverseGeocoding';
import { TextInput } from 'react-native-paper';
import { useFormikContext } from 'formik';
import { UserProfileFields } from '../ProfileInfo/types';

const LocationInput = () => {
  const { setFieldValue, values } = useFormikContext<UserProfileFields>();
  const { latitude, longitude } = values.location;

  const [readableLocation, setReadableLocation] = useState<string>();

  useEffect(() => {
    const fetchReadableLocation = async () => {
      if (latitude !== 0 && longitude !== 0) {
        const district = await getReverseGeolocation({
          latitude,
          longitude,
        });
        setReadableLocation(district);
      }
    };

    fetchReadableLocation();
  }, [latitude, longitude]);

  const handleLocationAccess = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return Alert.alert('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      setFieldValue('location', { latitude, longitude });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {latitude !== 0 ? (
        <TextInput
          label="Location"
          value={readableLocation}
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
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
