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
import LocationInput from "../../components/LocationInput/LocationInput";
import { Coordinates } from "../../store/types/map.types";

type UserProfileFields = {
  email: string;
  phoneNumber: string;
  // location: Coordinates;
};
type HydrateUserDataAction = {
  type: typeof actionTypes.HYDRATE_USER_DATA;
  payload: {
    email: string;
    phoneNumber: string;
    // location: Coordinates;
  };
};

type SetPhoneNumberAction = {
  type: typeof actionTypes.SET_PHONE_NUMBER;
  payload: string;
};

// type SetLocationAction = {
//   type: typeof actionTypes.SET_LOCATION;
//   payload: {
//     location: Coordinates;
//   };
// };

type UserAction =
  | SetPhoneNumberAction
  // | SetLocationAction
  | HydrateUserDataAction;

const initialState = {
  email: "",
  phoneNumber: "",
  location: {
    latitude: 0,
    longitude: 0,
  },
};

export const actionTypes = {
  HYDRATE_USER_DATA: "HYDRATE_USER_DATA",
  SET_PHONE_NUMBER: "SET_PHONE_NUMBER",
  // SET_LOCATION: "SET_LOCATION",
} as const;

export const userFormReducer = (
  state: UserProfileFields,
  action: UserAction
) => {
  switch (action.type) {
    case actionTypes.SET_PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload };
    // case actionTypes.SET_LOCATION:
    //   return { ...state, location: action.payload };
    case actionTypes.HYDRATE_USER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const Profile = () => {
  const storeDispatch = useAppDispatch();
  const { firebaseUser, user } = useAppSelector((state) => state.user);

  const [profileForm, dispatch] = useReducer(userFormReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      if (firebaseUser && firebaseUser.email)
        return await storeDispatch(fetchFireAlertUser(firebaseUser.email)); // TODO: use uid instead
    };
    if (!user) {
      fetchUser()
        .then((user) => {
          dispatch({
            type: actionTypes.HYDRATE_USER_DATA,
            payload: user?.payload as UserProfileFields,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [firebaseUser, user]);

  const handleSubmit = async () => {
    await storeDispatch(setFireAlertUser(profileForm));
  };

  return (
    <View>
      <Text>Profile</Text>
      <Text>welcome {profileForm?.email}</Text>
      <TextInput
        placeholder="Phone number"
        value={profileForm?.phoneNumber}
        onChangeText={(text) =>
          dispatch({ type: actionTypes.SET_PHONE_NUMBER, payload: text })
        }
      />
      {/* <LocationInput value={profileForm?.location} /> */}

      <Button title="Submit" onPress={handleSubmit} />
      <Button
        title="Log out"
        onPress={() =>
          FirebaseAuth.signOut()
            .then(() => storeDispatch(clearUser()))
            .then(() => router.replace("/(auth)/login"))
            .catch((error) => console.log(error))
        }
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
