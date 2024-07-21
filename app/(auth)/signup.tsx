import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import Colors from '../../constants/Colors';
import CustomButton from '@components/Button';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { signUp } from '@store/slices/user.slice';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // TODO: form validation

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
      <CustomButton
        handlePress={() => dispatch(signUp({ email, password }))}
        text="Sign up"
        loading={loading}
      />
      <CustomButton
        handlePress={() => router.push('/(auth)/login')}
        text="Login"
      />
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
});
