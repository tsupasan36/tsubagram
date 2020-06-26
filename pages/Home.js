import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import firebase from "../configs/Firebase";

class Home extends Component {
  logoutHandler = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <View>
        <Text>this is home</Text>
        <TouchableOpacity onPress={this.logoutHandler}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;
