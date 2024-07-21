import React, { useEffect, useReducer } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import { fetchAppUser, logout, updateAppUser } from '@store/user/user.thunk';
import LocationInput from '@components/Profile/LocationInput';
import {
  UserProfileFields,
  profileActionTypes,
  userFormReducer,
  profileInitialState,
} from '@components/Profile/profile.reducer';
import ProfileInput from '@components/Profile/ProfileInput';
import Colors from 'constants/Colors';

const Profile = () => {
  const storeDispatch = useAppDispatch();
  const { firebaseUser, appUser, loading } = useAppSelector(
    (state) => state.user
  );

  const [profileForm, reducerDispatch] = useReducer(
    userFormReducer,
    profileInitialState
  );

  useEffect(() => {
    if (!appUser && firebaseUser) {
      storeDispatch(fetchAppUser(firebaseUser.uid))
        .then((user) => {
          reducerDispatch({
            type: profileActionTypes.HYDRATE_USER_DATA,
            payload: user.payload as UserProfileFields,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [firebaseUser, appUser]);

  const handleSubmit = async () =>
    await storeDispatch(updateAppUser(profileForm));

  return (
    <View style={styles.container}>
      <Text>welcome {profileForm?.email}</Text>
      <ProfileInput
        value={profileForm?.phoneNumber}
        placeholder="69..."
        dispatch={reducerDispatch}
        actionType={profileActionTypes.SET_PHONE_NUMBER}
        label="Phone number"
      />
      <LocationInput value={profileForm?.location} dispatch={reducerDispatch} />
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => storeDispatch(logout())}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: Colors.light.secondary,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    margin: 'auto',
  },
});
