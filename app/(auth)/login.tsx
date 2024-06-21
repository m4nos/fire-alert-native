import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { FirebaseAuth } from "../../firebase";
import { useAppDispatch } from "../../store/hooks";
import { setFirebaseUser } from "../../store/slices/user.slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const signIn = async () => {
    // TODO: make this a thunk action
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      );
      if (response.user.emailVerified) {
        dispatch(setFirebaseUser(response.user.toJSON() as User));
        router.replace("/(tabs)/profile");
      } else alert("You need to verify your email first!");
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
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        onPress={() => signIn()}
        disabled={loading}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/signup")}
      >
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    display: "flex",
    backgroundColor: "#fefefe",
  },
  input: {
    width: 300,
    margin: 5,
    padding: 5,
    borderRadius: 20,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    margin: "auto",
  },
});

export default Login;
