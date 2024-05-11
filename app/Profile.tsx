import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { FirebaseAuth, FirebaseStore } from "../firebase";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutUser } from "../store/slices/user.slice";
import { collection, doc, getDoc } from "firebase/firestore";

const Profile = async () => {
  const dispatch = useAppDispatch();
  const { user: fbUser } = useAppSelector((state) => state.user);
  const docRef = collection(FirebaseStore, "users", { email: fbUser?.email });
  const userSnap = await getDoc(docRef);
  console.log(userSnap);
  const [profileData, setProfileData] = useState();

  const handleSubmit = () => {
    console.log("profileData?.phoneNumber");
  };
  return (
    <View>
      <Text>Profile</Text>
      <Text>welcome {fbUser?.email}</Text>
      <TextInput
        placeholder="Phone number"
        // value={profileData?.phoneNumber!}
        // onChange={(e) =>
        //   setProfileData((prev) => ({
        //     ...prev,
        //     phoneNumber: e.nativeEvent?.text,
        //   }))
        // }
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
