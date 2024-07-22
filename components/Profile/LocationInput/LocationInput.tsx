import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { profileActionTypes } from '../profile.reducer';
import { LocationInputProps } from './types';
import getReverseGeolocation from '@services/useReverseGeocoding';
import { IconButton, TextInput } from 'react-native-paper';

const LocationInput = ({ value, dispatch }: LocationInputProps) => {
  const [readableLocation, setReadableLocation] = useState<string>();

  useEffect(() => {
    const fetchReadableLocation = async () => {
      if (value.latitude !== 0 && value.longitude !== 0) {
        const district = await getReverseGeolocation({
          latitude: value.latitude,
          longitude: value.longitude,
        });
        setReadableLocation(district);
      }
    };

    fetchReadableLocation();
  }, [value.latitude, value.longitude]);

  const handleLocationAccess = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== 'granted') {
        return Alert.alert('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      dispatch({
        type: profileActionTypes.SET_LOCATION,
        payload: { latitude, longitude },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {value.latitude !== 0 ? (
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
        <View style={styles.container}>
          <Text>Location</Text>
          <IconButton icon="target" onPress={handleLocationAccess} />
        </View>
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
