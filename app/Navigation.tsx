import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import Map from "./Map";
import Signup from "./Signup";
import Login from "./Login";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { User, onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase";
import { setFirebaseUser } from "../store/slices/user.slice";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { firebaseUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(
    () =>
      onAuthStateChanged(FirebaseAuth, (user) => {
        if (user?.emailVerified)
          dispatch(setFirebaseUser(user.toJSON() as User));
      }),
    []
  );

  return (
    <NavigationContainer independent>
      {firebaseUser ? (
        <Tab.Navigator>
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Map" component={Map} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
