import React, { Component } from "react";
import { SafeAreaView, Text, FlatList } from "react-native";
import firebase from "../configs/Firebase";

class Favorite extends Component {
  state = {
    favoriteRef: firebase.firestore().collection("Favorites"),
  };

  render() {
    return (
      <SafeAreaView>
        <Text>this is Favorite</Text>
        <FlatList />
      </SafeAreaView>
    );
  }
}

export default Favorite;
