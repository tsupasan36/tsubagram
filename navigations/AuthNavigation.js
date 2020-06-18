import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignIn from "../pages/SignIn";
import LogIn from "../pages/LogIn";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();
class AuthNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator initialRouteName="Register" headerMode="none">
          <Stack.Screen name="Register" component={SignIn} />
          <Stack.Screen name="Login" component={LogIn} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AuthNavigation;
