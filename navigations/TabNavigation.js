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

import { HomeNavigation } from "./HomeNavigation";
import { StatusBar } from "react-native";

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
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="search" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={HomeNavigation}
          options={{
            tabBarLabel: "Camera",
            tabBarIcon: ({ color }) => (
              <AntDesign name="pluscircleo" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            tabBarLabel: "Favorite",
            tabBarIcon: ({ color }) => (
              <AntDesign name="hearto" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
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
