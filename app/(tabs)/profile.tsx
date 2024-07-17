import React, { useEffect, useReducer } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FirebaseAuth } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearUser,
  fetchAppUser,
  updateAppUser,
} from "../../store/slices/user.slice";
import { router } from "expo-router";
import LocationInput from "../../components/Profile/LocationInput";
import {
  UserProfileFields,
  profileActionTypes,
  userFormReducer,
} from "../../components/Profile/profile.reducer";
import { profileInitialState } from "../../components/Profile/profile.reducer";
import PhoneNumberInput from "../../components/Profile/ProfileInput";

const Profile = () => {
  const storeDispatch = useAppDispatch();
  const { firebaseUser, appUser, loading } = useAppSelector(
    (state) => state.user
  );

  const [profileForm, dispatch] = useReducer(
    userFormReducer,
    profileInitialState
  );

  useEffect(() => {
    if (!appUser && firebaseUser) {
      storeDispatch(fetchAppUser(firebaseUser.uid))
        .then((user) => {
          dispatch({
            type: profileActionTypes.HYDRATE_USER_DATA,
            payload: user.payload as UserProfileFields,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [firebaseUser, appUser]);

  const handleSubmit = async () =>
    await storeDispatch(updateAppUser(profileForm));

  // TODO: ASYNC THUNK
  const handleSignOut = async () =>
    await FirebaseAuth.signOut()
      .then(() => storeDispatch(clearUser()))
      .then(() => router.replace("/(auth)/login"))
      .catch((error) => console.log(error));

  return (
    <View style={{ flex: 1, gap: 10 }}>
      <Text>Profile</Text>
      <Text>welcome {profileForm?.email}</Text>
      <PhoneNumberInput
        value={profileForm?.phoneNumber}
        dispatch={dispatch}
        actionType={profileActionTypes.SET_PHONE_NUMBER}
      />
      <LocationInput value={profileForm?.location} dispatch={dispatch} />
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  buttonText: {
    margin: "auto",
  },
});
