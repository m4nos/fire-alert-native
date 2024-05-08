import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FirebaseAuth } from "../firebase";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutUser } from "../store/slices/user.slice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  return (
    <View>
      <Text>Profile</Text>
      <Text>welcome {user.user?.email}</Text>
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
