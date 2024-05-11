import { Button, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { FirebaseAuth, FirebaseStore } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { TextInput } from "react-native-gesture-handler";
import { NavigationProp } from "@react-navigation/native";

const Signup = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);

    try {
      const createUserResponse = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      ).catch((error) => {
        throw new Error(error);
      });

      await addDoc(collection(FirebaseStore, "users"), {
        email,
      }).catch((error) => {
        throw new Error(error);
      });

      await sendEmailVerification(createUserResponse.user, {
        handleCodeInApp: true,
        url: "https://fire-alert-d86d4.firebaseapp.com",
      })
        .then(() => {
          setLoading(false);
          alert("email verification sent!");
        })
        .catch((error) => {
          throw new Error(error);
        });

      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          onChange={(e) => setPassword(e.nativeEvent.text)}
        />
        <Button title="Signup" onPress={() => signUp()} />
        <Button title="Log in" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    display: "flex",
    backgroundColor: "#fefefe",
  },
  input: {},
});
