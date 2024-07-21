import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import { login } from '@store/user/user.thunk';
import { Button, TextInput } from 'react-native-paper';

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
      ></TextInput>
      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
      ></TextInput>
      <Button
        onPress={() => dispatch(login({ email, password }))}
        mode="contained"
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>
      <Button onPress={() => router.push('/(auth)/signup')} mode="outlined">
        Create account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    gap: 20,
  },
});

export default Login;
