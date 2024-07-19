import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { ProfileInputProps } from "./types";
import { SetPhoneNumberAction } from "../profile.reducer";

const ProfileInput = <T extends SetPhoneNumberAction>({
  value,
  actionType,
  dispatch,
  placeholder,
  label,
}: ProfileInputProps<T>) => {
  return (
    <View style={styles.inputView}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        keyboardType="number-pad"
        value={value}
        onChangeText={(text) =>
          dispatch({ type: actionType, payload: text } as T)
        }
      />
    </View>
  );
};

export default ProfileInput;

const styles = StyleSheet.create({
  inputView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 20,
  },
});
