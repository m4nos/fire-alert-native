import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMarkers } from "../../store/slices/map.slice";

const map = () => {
  const dispatch = useAppDispatch();

  const mapRef = useRef(null);

  const { markers } = useAppSelector((state) => state.map);
  console.log(markers);

  useEffect(() => {
    dispatch(fetchMarkers());
  }, []);

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
      >
        {!!markers.length &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          ))}
      </MapView>
    </View>
  );
};

export default map;

const styles = StyleSheet.create({});
