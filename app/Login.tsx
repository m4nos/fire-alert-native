import React, { useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseAuth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
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
      <Button title="Login" onPress={() => signIn()} />
      <Button title="Create account" onPress={() => signUp()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    display: "flex",
    backgroundColor: "#fefefe",
  },
  input: {},
});

export default Login;
