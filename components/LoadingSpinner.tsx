import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, Portal } from 'react-native-paper'

const LoadingSpinner = ({ loading }: { loading: boolean }) =>
  loading && (
    <Portal>
      <ActivityIndicator animating={loading} style={styles.activityIndicator} />
    </Portal>
  )

export default LoadingSpinner

const styles = StyleSheet.create({
  activityIndicator: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
