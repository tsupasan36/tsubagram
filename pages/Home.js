import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import firebase from "../configs/Firebase";

import { Icon } from "native-base";

const LogoImage = require("../images/tsubagram.logo.png");

class Home extends Component {
  static navigationOptions = {
    headerLeft: <Icon name="ios-camera-outline" style={{ paddingLeft: 10 }} />,
    title: <Image source={LogoImage} style={{ width: 20, height: 20 }} />,
    headerRight: <Icon name="ios-send-outline" />,
  };

  logoutHandler = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>this is home</Text>
        <TouchableOpacity onPress={this.logoutHandler}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
