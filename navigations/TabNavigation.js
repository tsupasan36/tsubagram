import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import Home from "../pages/Home";
import Search from "../pages/Search";
import Favorite from "../pages/Favorite";
import Profile from "../pages/Profile";

import {
  CameraNavigation,
  HomeNavigation,
  ProfileNavigation,
  SearchNavigation,
  FavoriteNavigation,
} from "./HomeNavigation";

const Tab = createMaterialBottomTabNavigator();

export default class TabNavigation extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#e91e63"
        style={{ backgroundColor: "tomato" }}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigation}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchNavigation}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="search" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={CameraNavigation}
          options={{
            tabBarLabel: "Camera",
            tabBarIcon: ({ color }) => (
              <AntDesign name="pluscircleo" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteNavigation}
          options={{
            tabBarLabel: "Favorite",
            tabBarIcon: ({ color }) => (
              <AntDesign name="hearto" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigation}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color="black" size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
