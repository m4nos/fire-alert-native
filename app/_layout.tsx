import React from "react";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <Slot />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
