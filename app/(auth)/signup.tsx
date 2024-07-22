import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import { signUp } from '@store/user/user.thunk';
import { Button, TextInput } from 'react-native-paper';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // TODO: form validation

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        secureTextEntry
        clearButtonMode="always"
        autoCapitalize="none"
        onChangeText={(text) => setConfirmPassword(text)}
        mode="outlined"
      />
      <Button
        onPress={() => dispatch(signUp({ email, password }))}
        mode="contained"
        loading={loading.signUp}
        disabled={loading.signUp}
      >
        Sign up
      </Button>
      <Button onPress={() => router.push('/(auth)/login')} mode="outlined">
        Login
      </Button>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    gap: 20,
  },
});
