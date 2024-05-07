import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import TabOneScreen from "./(tabs)";
import TabTwoScreen from "./(tabs)/two";
import { User, onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const Stack = createNativeStackNavigator();

const LoggedInStack = createNativeStackNavigator();

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>();

  useEffect(
    () => onAuthStateChanged(FirebaseAuth, (user) => setUser(user)),
    []
  );

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="(tabs)" component={LoggedInLayout} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </ThemeProvider>
  );
}

function LoggedInLayout() {
  return (
    <LoggedInStack.Navigator>
      <LoggedInStack.Screen name="index" component={TabOneScreen} />
      {/* <LoggedInStack.Screen name="modal" options={{ presentation: "modal" }} /> */}
    </LoggedInStack.Navigator>
  );
}

{
  /* <Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
</Stack> */
}
