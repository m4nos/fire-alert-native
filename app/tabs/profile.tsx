import React, { useEffect, useReducer } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FirebaseAuth } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearUser,
  fetchFireAlertUser,
  setFireAlertUser,
} from "../../store/slices/user.slice";
import { router } from "expo-router";

type UserProfileFields = {
  email: string;
  phoneNumber: string;
};

interface SetPhoneNumberAction {
  type: typeof actionTypes.SET_PHONE_NUMBER;
  payload: string;
}

interface SetUserDataAction {
  type: typeof actionTypes.SET_USER_DATA;
  payload: {
    email: string;
    phoneNumber: string;
  };
}

export type UserAction = SetPhoneNumberAction | SetUserDataAction;

export const initialState = {
  email: "",
  phoneNumber: "",
};

export const actionTypes = {
  SET_USER_DATA: "SET_USER_DATA",
  SET_PHONE_NUMBER: "SET_PHONE_NUMBER",
} as const;

export const userReducer = (state: UserProfileFields, action: UserAction) => {
  switch (action.type) {
    case actionTypes.SET_PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
    case actionTypes.SET_USER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const Profile = () => {
  const storeDispatch = useAppDispatch();
  const { firebaseUser, user } = useAppSelector((state) => state.user);

  const [profile, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      if (firebaseUser && firebaseUser.email)
        return await storeDispatch(fetchFireAlertUser(firebaseUser.email));
    };
    if (!user) {
      fetchUser()
        .then((user) => {
          dispatch({
            type: actionTypes.SET_USER_DATA,
            payload: user?.payload as UserProfileFields,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [firebaseUser, user]);

  const handleSubmit = async () => {
    await storeDispatch(setFireAlertUser(profile));
  };

  return (
    <View>
      <Text>Profile</Text>
      <Text>welcome {profile?.email}</Text>
      <TextInput
        placeholder="Phone number"
        value={profile?.phoneNumber}
        onChangeText={(text) =>
          dispatch({ type: actionTypes.SET_PHONE_NUMBER, payload: text })
        }
      />

      <Button title="Submit" onPress={handleSubmit} />
      <Button
        title="Log out"
        onPress={() =>
          FirebaseAuth.signOut()
            .then(() => storeDispatch(clearUser()))
            .then(() => router.push("/auth/login"))
            .catch((error) => console.log(error))
        }
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
