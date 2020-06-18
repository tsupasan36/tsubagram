import React, { Component } from "react";
import AuthNavigation from "./AuthNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import TabNavigation from "./TabNavigation";
import firebase from "../configs/Firebase";

class IndexNavigation extends Component {
  state = {
    isLogin: false,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({ isLogin: true });
        // ...
      } else {
        this.setState({ isLogin: false });
      }
    });
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar />
        {this.state.isLogin ? <TabNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    );
  }
}

export default IndexNavigation;
