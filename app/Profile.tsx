import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FirebaseAuth } from "../firebase";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  FireAlertUser,
  fetchFireAlertUser,
  logoutUser,
  setFireAlertUser,
  setUser,
} from "../store/slices/user.slice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { firebaseUser, user } = useAppSelector((state) => state.user);

  const [profileData, setProfileData] = useState<FireAlertUser>();

  useEffect(() => {
    const fetchData = async () =>
      await dispatch(fetchFireAlertUser(firebaseUser?.email!));
    if (!user) {
      fetchData().then((user) => setProfileData(user.payload as FireAlertUser));
    }
  }, [firebaseUser, user]);

  const handleSubmit = async () => {
    console.log(profileData);
    await dispatch(setFireAlertUser(profileData!));
    dispatch(setUser(profileData!));
  };

  return (
    <View>
      <Text>Profilse</Text>
      <Text>welcome {profileData?.email}</Text>
      <TextInput
        placeholder="Phone number"
        value={profileData?.phoneNumber}
        onChange={(e) =>
          setProfileData((prev) => ({
            ...prev,
            phoneNumber: e.nativeEvent.text,
          }))
        }
      />

      <Button title="Submit" onPress={handleSubmit} />
      <Button
        title="Log out"
        onPress={() =>
          FirebaseAuth.signOut().then(() => dispatch(logoutUser()))
        }
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
