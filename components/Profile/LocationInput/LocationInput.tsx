import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { LocationInputProps } from ".";
import { actionTypes } from "../../../app/(tabs)/profile";
import * as Location from "expo-location";

const LocationInput = ({ value, dispatch }: LocationInputProps) => {
  const handleLocationAccess = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return alert("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      dispatch({
        type: actionTypes.SET_LOCATION,
        payload: { latitude, longitude },
      });
    } catch (error) {}
  };

  console.log("value", value);

  return (
    <View>
      <Text>LocationInput</Text>
      {value.latitude !== 0 ? (
        <Text>
          Location:{" "}
          {`Latitude: ${value.latitude}, Longitude: ${value.longitude}`}
        </Text>
      ) : (
        <Button title="Grant Location Access" onPress={handleLocationAccess} />
      )}
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({});
