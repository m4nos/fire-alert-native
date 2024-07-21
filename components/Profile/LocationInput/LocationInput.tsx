import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { profileActionTypes } from '../profile.reducer';
import { LocationInputProps } from './types';
import { ReadableLocation } from '@services/useReverseGeocoding/types';
import getReverseGeolocation from '@services/useReverseGeocoding';

const LocationInput = ({ value, dispatch }: LocationInputProps) => {
  const [readableLocation, setReadableLocation] = useState<ReadableLocation>();

  useEffect(() => {
    const fetchReadableLocation = async () => {
      if (value.latitude !== 0 && value.longitude !== 0) {
        const { city, province } = await getReverseGeolocation({
          latitude: value.latitude,
          longitude: value.longitude,
        });
        setReadableLocation({ city, province });
      }
    };

    fetchReadableLocation();
  });

  const handleLocationAccess = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return alert('Permission to access location was denied');
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
      <Text>LocationInput</Text>
      {value.latitude !== 0 ? (
        <Text>
          {`Location: ${readableLocation?.city}, ${readableLocation?.province}`}
        </Text>
      ) : (
        <Button title="Grant Location Access" onPress={handleLocationAccess} />
      )}
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({});
