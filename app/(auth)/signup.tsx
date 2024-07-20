import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { TextInput } from "react-native-gesture-handler";
import { FirebaseAuth, FirebaseStore } from "../../firebase";
import { router } from "expo-router";
import Colors from "../../constants/Colors";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // TODO: make this a thunk action
  // TODO: form validation
  const signUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        FirebaseAuth,
        email,
        password
      ).catch((error) => {
        throw new Error(error);
      });

      await addDoc(collection(FirebaseStore, "users"), {
        email,
        uid: user.uid,
      }).catch((error) => {
        throw new Error(error);
      });

      await sendEmailVerification(user, {
        handleCodeInApp: true,
        url: "https://fire-alert-d86d4.firebaseapp.com",
      })
        .then(() => {
          Alert.alert("email verification sent!");
        })
        .catch((error) => {
          throw new Error(error);
        });

      router.push("/(auth)/login");
    } catch (error) {
      console.log(error);
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
      <Text style={styles.label}>Confirm password</Text>
      <TextInput
        value={confirmPassword}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() => signUp()}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

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
