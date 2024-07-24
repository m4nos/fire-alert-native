import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import { fetchAppUser, logout, updateAppUser } from '@store/user/user.thunk';
import LocationInput from '@components/Profile/LocationInput';
import {
  profileActionTypes,
  userFormReducer,
  profileInitialState,
} from '@components/Profile/profile.reducer';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';
import { AppUser } from '@store/user/user.types';
import EquipmentInfo from '@components/Profile/EquipmentInfo';

const Profile = () => {
  const storeDispatch = useAppDispatch();
  const { firebaseUser, appUser, loading } = useAppSelector(
    (state) => state.user
  );

  const [value, setValue] = useState('profile');

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
            payload: user.payload as AppUser,
          });
        })
        .catch((error) => console.error(error));
    }
  }, [firebaseUser, appUser]);

  return (
    <View style={styles.container}>
      <Text>welcome {profileForm?.email}</Text>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'profile',
            label: 'Profile info',
          },
          {
            value: 'equipment',
            label: 'Equipment',
          },
        ]}
      />
      {value === 'profile' ? (
        <>
          <TextInput
            label="User name"
            value={profileForm.userName}
            onChangeText={(text) =>
              reducerDispatch({
                type: profileActionTypes.SET_USER_NAME,
                payload: text,
              })
            }
            mode="outlined"
          />
          <TextInput
            label="Phone number"
            value={profileForm.phoneNumber}
            keyboardType="number-pad"
            onChangeText={(text) =>
              reducerDispatch({
                type: profileActionTypes.SET_PHONE_NUMBER,
                payload: text,
              })
            }
            mode="outlined"
          />
          <LocationInput
            value={profileForm?.location}
            dispatch={reducerDispatch}
          />
        </>
      ) : (
        <EquipmentInfo />
      )}

      <Button
        onPress={() => storeDispatch(updateAppUser(profileForm))}
        loading={loading.updateAppUser || loading.fetchAppUser}
        disabled={loading.updateAppUser || loading.fetchAppUser}
        mode="contained"
      >
        Save
      </Button>
      <Button
        onPress={() => storeDispatch(logout())}
        loading={loading.logout}
        mode="outlined"
      >
        Logout
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    gap: 20,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    margin: 'auto',
  },
});
