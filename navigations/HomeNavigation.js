import React from "react";
import CameraCapture from "../pages/CameraCapture";
import PostScreen from "../pages/PostScreen";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Search from "../pages/Search";
import Favorite from "../pages/Favorite";

import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Feather, FontAwesome } from "@expo/vector-icons";

const Stack = createStackNavigator();

export const CameraNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="CameraCapture" component={CameraCapture} />
      <Stack.Screen name="PostScreen" component={PostScreen} />
    </Stack.Navigator>
  );
};

export const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => (
            <TouchableOpacity>
              <Feather
                name="camera"
                size={32}
                color="black"
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <FontAwesome
                name="send-o"
                size={32}
                color="black"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export const ProfileNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export const SearchNavigation = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export const FavoriteNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite" component={Favorite} />
    </Stack.Navigator>
  );
};
