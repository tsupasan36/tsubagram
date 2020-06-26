import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Thumbnail, Item, Input, Button } from "native-base";
import * as ImagePicker from "expo-image-picker";

import firebase from "../configs/Firebase";

import { connect } from "react-redux";
import { setUser } from "../actions/index";

import {
  Feather,
  AntDesign,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { launchImageLibraryAsync } from "expo-image-picker";
import { storage } from "firebase";

class EditProfile extends Component {
  state = {
    name: this.props.auth.name,
    email: this.props.auth.email,
    password: "",
    bio: this.props.auth.bio,
    newImage: null,
    avatar: this.props.auth.avatar,
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ newImage: result.uri, avatar: result.uri });
    }
  };

  updateProfile = async () => {
    firebase.auth().currentUser.updateProfile({
      bio: this.state.bio,
      email: this.state.email,
      name: this.state.name,
    });
    if (this.state.password !== "") {
      firebase.auth().currentUser.updatePassword(this.state.password);
    }

    const userInfo = firebase
      .firestore()
      .collection("users")
      .doc(this.props.auth.uid);

    if (this.state.newImage !== null) {
      const blob = await this.uriToBlob();
      const upload = await firebase.storage().ref(this.uuidv4()).put(blob);
      const imageUrl = await upload.ref.getDownloadURL();
      userInfo.update({
        avatar: imageUrl,
      });
    }

    userInfo
      .update({
        name: this.state.name,
        email: this.state.email,
        bio: this.state.bio,
      })
      .then(() => {
        userInfo.get().then((doc) => {
          this.props.dispatch(setUser(doc.data()));
        });
      });
  };

  uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  uriToBlob = async () => {
    const uri = this.state.newImage;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => resolve(xhr.response);
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  render() {
    const uri =
      "https://facebook.github.io/react-native/docs/assets/favicon.png";
    return (
      <View style={{ flex: 1, backgroundColor: "rgba(185, 121, 252, 0.5)" }}>
        <View style={styles.container}>
          <Text style={{ marginBottom: 5 }}>this is edit page</Text>
          <Thumbnail large source={{ uri: this.state.avatar }} />
          <TouchableOpacity onPress={this.pickImage}>
            <Text style={{ marginTop: 5 }}>Change Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.editContainer}>
          <Item style={styles.Item}>
            <Feather name="user" size={24} color="black" />
            <Input
              value={this.state.name}
              onChangeText={(input) => {
                this.setState({ name: input });
              }}
            />
          </Item>
          <Item style={styles.Item}>
            <Feather name="mail" size={24} color="black" />
            <Input
              value={this.state.email}
              onChangeText={(input) => {
                this.setState({ email: input });
              }}
            />
          </Item>
          <Item style={styles.Item}>
            <AntDesign name="lock1" size={24} color="black" />
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(input) => {
                this.setState({ password: input });
              }}
            />
            <SimpleLineIcons
              name="eye"
              size={24}
              color="black"
              style={{ marginRight: 20 }}
            />
          </Item>
          <Item style={styles.Item}>
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={24}
              color="black"
            />
            <Input
              value={this.state.bio}
              onChangeText={(input) => {
                this.setState({ bio: input });
              }}
            />
          </Item>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={styles.btn} onPress={this.updateProfile}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.user.auth,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  editContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  Item: {
    marginLeft: 20,
  },
  btn: {
    alignItems: "center",
    marginTop: 30,
    justifyContent: "center",
    borderWidth: 1,
    width: 100,
    height: 40,
    borderRadius: 50,
  },
});
