import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "Signup" }} />
    </Stack>
  );
};

export default AuthLayout;
