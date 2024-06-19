import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import MapView from "react-native-maps";

const map = () => {
  const mapRef = useRef(null);
  return (
    <View>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -336,
          latitudeDelta: 13,
          longitudeDelta: 4,
        }}
        mapType="terrain"
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
      ></MapView>
    </View>
  );
};

export default map;

const styles = StyleSheet.create({});
