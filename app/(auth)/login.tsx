import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import Colors from '../../constants/Colors';
import CustomButton from '@components/Button';
import { login } from '@store/user/user.thunk';

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <CustomButton
        handlePress={() => dispatch(login({ email, password }))}
        text="Login"
        loading={loading}
      />
      <CustomButton
        handlePress={() => router.push('/(auth)/signup')}
        text="Create account"
      />
    </View>
  );
};

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

export default Login;
