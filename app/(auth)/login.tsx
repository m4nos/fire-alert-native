import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { FirebaseAuth } from "../../firebase";
import { useAppDispatch } from "@store/hooks";
import { setFirebaseUser } from "@store/slices/user.slice";
import Colors from "../../constants/Colors";

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
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        style={styles.input}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        style={styles.input}
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
    padding: 40,
    flex: 1,
    justifyContent: "center",
    display: "flex",
    backgroundColor: Colors.light.secondary,
  },
  label: {
    color: Colors.light.main,
    marginLeft: 10,
    marginBottom: 10,
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.light.main,
    borderRadius: 20,
  },
  button: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.light.main,
    marginBottom: 10,
    backgroundColor: Colors.light.accent,
  },
  buttonText: {
    margin: "auto",
    color: Colors.light.secondary,
  },
});

export default Login;
