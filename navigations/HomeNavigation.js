import React from "react";
import CameraCapture from "../pages/CameraCapture";
import PostScreen from "../pages/PostScreen";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="CameraCapture" component={CameraCapture} />
      <Stack.Screen name="PostScreen" component={PostScreen} />
    </Stack.Navigator>
  );
};
