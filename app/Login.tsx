import React, { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { TextInput } from "react-native-gesture-handler";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "../firebase";
import { NavigationProp } from "@react-navigation/native";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/user.slice";

const Login = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      if (response.user) dispatch(setUser(response.user.toJSON() as User));
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
      <Button
        title="Create account"
        onPress={() => navigation.navigate("Signup")}
      />
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
