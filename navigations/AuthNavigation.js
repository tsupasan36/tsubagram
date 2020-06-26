import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../pages/SignIn";
import LogIn from "../pages/LogIn";
import Home from "../pages/Home";

const Stack = createStackNavigator();
class AuthNavigation extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Register" headerMode="none">
        <Stack.Screen name="Register" component={SignIn} />
        <Stack.Screen name="Login" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  }
}

export default AuthNavigation;
