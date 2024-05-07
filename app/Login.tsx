import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, isLoading] = useState(false);
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
        placeholder="Email"
        autoCapitalize="none"
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    display: "flex",
  },
  input: {},
});

export default Login;
