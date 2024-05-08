import { Button, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { TextInput } from "react-native-gesture-handler";
import { NavigationProp } from "@react-navigation/native";
import { FirebaseAuth } from "../firebase";

const Signup = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    await sendEmailVerification(resp.user, {
      handleCodeInApp: true,
      url: "https://fire-alert-d86d4.firebaseapp.com",
    })
      .then(() => alert("email verification sent!"))
      .catch((error) => console.log("error", error))
      .finally(() => navigation.navigate("Login"));
    // .catch((error) => console.error(error))
    // .finally(() => setLoading(false));
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
