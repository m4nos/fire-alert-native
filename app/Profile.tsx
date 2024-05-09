import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { FirebaseAuth } from "../firebase";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutUser } from "../store/slices/user.slice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [profileData, setProfileData] = useState(user);

  const handleSubmit = () => {
    console.log(profileData?.phoneNumber);
  };
  return (
    <View>
      <Text>Profile</Text>
      <Text>welcome {user?.email}</Text>
      <TextInput
        placeholder="Phone number"
        value={user?.phoneNumber!}
        onChange={(e) => console.log("psolas")}
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
