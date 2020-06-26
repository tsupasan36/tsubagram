import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import firebase from "../configs/Firebase";
import { connect } from "react-redux";

import { Thumbnail, Button } from "native-base";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import GalleryItem from "../components/GalleryItem";

class Profile extends Component {
  state = {
    usersRef: firebase.firestore().collection("users"),
    users: [],
    postsRef: firebase.firestore().collection("posts"),
    posts: [],
  };

  componentDidMount() {
    this.state.usersRef.get().then((snapshot) => {
      const users = snapshot.docs.map((doc) => {
        return doc.data();
      });
      this.setState({ users: users });
    });

    this.state.postsRef.get().then((snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return doc.data();
      });
      this.setState({ posts: posts });
    });
  }

  logoutHandler = () => {
    firebase.auth().signOut();
  };

  changeScreen = () => {
    this.props.navigation.navigate("EditProfile");
  };
  render() {
    const uri =
      "https://facebook.github.io/react-native/docs/assets/favicon.png";

    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "rgba(185, 121, 252, 0.5)" }}
      >
        <StatusBar backgroundColor="rgba(185, 121, 252, 0.5)" />
        <View style={styles.container}>
          <TouchableOpacity
            onPress={this.logoutHandler}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 280,
            }}
          >
            <Text>Logout</Text>
            <MaterialCommunityIcons name="logout" size={36} color="black" />
          </TouchableOpacity>
          <View style={styles.profile}>
            <Thumbnail large source={{ uri: this.props.auth.avatar }} />
            <View style={styles.userInfo}>
              <Text>{this.props.auth.name}</Text>
              <Text>Nothing</Text>
              <Text>{this.props.auth.bio}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.changeScreen}>
            <Text>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gallery}>
          <Text>gallery</Text>
          <FlatList
            numColumns={3}
            data={this.state.posts}
            renderItem={({ item }) => <GalleryItem gallery={item} />}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.user.auth,
});

export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
  },
  button: {
    alignItems: "center",
    marginTop: 20,
    width: "90%",
    marginLeft: 20,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 4,
    padding: 7,
  },
  gallery: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    height: 200,
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
  },
  userInfo: {
    marginLeft: 10,
  },
});
