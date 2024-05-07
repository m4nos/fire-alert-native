import { Button, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "../firebase";
import { TextInput } from "react-native-gesture-handler";
import { NavigationProp } from "@react-navigation/native";

const Signup = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
          value={username}
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          onChange={(e) => setUsername(e.nativeEvent.text)}
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
