import { StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { fetchMarkers } from '@store/map/map.thunk'
import LoadingSpinner from '@components/LoadingSpinner'

const Map = () => {
  const dispatch = useAppDispatch()

  const mapRef = useRef(null)

  const { markers, loading } = useAppSelector((state) => state.mapSlice)

  useEffect(() => {
    dispatch(fetchMarkers())
  }, [])

  return (
    <View>
      <LoadingSpinner loading={loading} />
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -336,
          latitudeDelta: 13,
          longitudeDelta: 4
        }}
        mapType="terrain"
        ref={mapRef}
        style={{ width: '100%', height: '100%' }}
      >
        {!!markers.length &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: Number(marker.latitude),
                longitude: Number(marker.longitude)
              }}
              image={require('assets/images/fire-1.png')}
            />
          ))}
      </MapView>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})
