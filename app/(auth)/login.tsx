import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from 'features/hooks';
import { login } from '@store/user/user.thunk';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as z from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleLogin = (values: typeof initialValues) => {
    dispatch(login(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(loginSchema)}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <View style={styles.container}>
          <TextInput
            label="Email"
            value={values.email}
            style={styles.input}
            autoCapitalize="none"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            mode="outlined"
            error={touched.email && !!errors.email}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <TextInput
            label="Password"
            value={values.password}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            mode="outlined"
            error={touched.password && !!errors.password}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <Button
            onPress={() => handleSubmit()}
            mode="contained"
            loading={loading.login}
            disabled={loading.login || !isValid}
          >
            Login
          </Button>
          <Button onPress={() => router.push('/(auth)/signup')} mode="outlined">
            Create account
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    gap: 25,
  },
  input: {},
  errorText: {
    color: 'red',
    fontSize: 12,
    top: -16,
    marginBottom: -37,
  },
});

export default Login;
