import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { ProfileInputProps } from "./types";
import { SetPhoneNumberAction } from "../profile.reducer";

const ProfileInput = <T extends SetPhoneNumberAction>({
  value,
  actionType,
  dispatch,
  placeholder,
}: ProfileInputProps<T>) => {
  return (
    <View>
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

const styles = StyleSheet.create({});
