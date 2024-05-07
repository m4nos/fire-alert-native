import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FirebaseAuth } from "../firebase";

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Log out" onPress={() => FirebaseAuth.signOut()} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
