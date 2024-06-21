import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { profileActionTypes } from "../profile.reducer";
import { PhonenumberInputProps } from "./types";

const PhoneNumberInput = ({ value, dispatch }: PhonenumberInputProps) => {
  return (
    <View>
      <TextInput
        placeholder="Phone number"
        value={value}
        onChangeText={(text) =>
          dispatch({ type: profileActionTypes.SET_PHONE_NUMBER, payload: text })
        }
      />
    </View>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({});
