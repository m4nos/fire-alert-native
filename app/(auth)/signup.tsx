import { StyleSheet, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useAppDispatch, useAppSelector } from 'features/hooks'
import { signUp } from '@store/user/user.thunk'
import { Button, Text, TextInput } from 'react-native-paper'
import { isValid, z } from 'zod'
import { Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const signupSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'] // Set the path of the error
  })

const Signup = () => {
  const { loading } = useAppSelector((state) => state.userSlice)
  const dispatch = useAppDispatch()

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  const handleLogin = (values: typeof initialValues) => {
    dispatch(signUp(values))
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(signupSchema)}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
      }) => (
        <View style={styles.container}>
          <TextInput
            label="Email"
            value={values.email}
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
            secureTextEntry
            autoCapitalize="none"
            onChangeText={handleChange('password')}
            mode="outlined"
            error={touched.password && !!errors.password}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <TextInput
            label="Confirm Password"
            value={values.confirmPassword}
            secureTextEntry
            autoCapitalize="none"
            onChangeText={handleChange('confirmPassword')}
            mode="outlined"
            error={touched.confirmPassword && !!errors.confirmPassword}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
          <Button
            onPress={() => handleSubmit()}
            mode="contained"
            loading={loading.signUp}
            disabled={loading.signUp || Object.keys(errors).length !== 0}
          >
            Sign up
          </Button>
          <Button onPress={() => router.push('/(auth)/login')} mode="outlined">
            Login
          </Button>
        </View>
      )}
    </Formik>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    gap: 25
  },
  input: {},
  errorText: {
    color: 'red',
    fontSize: 12,
    top: -16,
    marginBottom: -37
  }
})
