import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from 'constants/Colors';
import { CustomButtonProps } from './types';

const CustomButton = ({ handlePress, text, loading }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={handlePress}
      disabled={loading}
    >
      {loading && <ActivityIndicator style={styles.activityIndicator} />}
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.light.main,
    marginBottom: 10,
    backgroundColor: Colors.light.accent,
  },
  buttonText: {
    margin: 'auto',
    color: Colors.light.secondary,
  },
  activityIndicator: {
    position: 'absolute',
    top: 10,
    left: 40,
  },
});
