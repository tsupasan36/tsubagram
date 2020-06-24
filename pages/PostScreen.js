import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Form, Item, Input, Label } from "native-base";

import { Feather } from "@expo/vector-icons";

import firebase from "../configs/Firebase";
import "firebase/firestore";
import { connect } from "react-redux";
import { ActivityIndicator } from "react-native-paper";

class PostScreen extends Component {
  state = {
    description: "",
    imageUrl: null,
    postRef: firebase.firestore().collection("posts"),
    isLoading: false,
  };

  imagePost = async () => {
    this.setState({ isLoading: true });
    console.log(this.props.auth);
    const blob = await this.uriToBlob();

    const upload = await firebase.storage().ref(this.uuidv4()).put(blob);

    const imageUrl = await upload.ref.getDownloadURL();

    const newPost = {
      location: "",
      postPhoto: imageUrl,
      postDescription: this.state.description,
      uid: this.props.auth.uid,
      likes: [],
      photo: this.props.auth.photo,
      username: this.props.auth.name,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const ref = await this.state.postRef.doc();
    newPost.id = ref.id;
    ref.set(newPost);
    this.setState({ isLoading: false });
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
    const uri = this.props.route.params.imageUri;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => resolve(xhr.response);
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  handleDescription = (input) => {
    this.setState({ description: input });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ image: null })}>
          <Feather
            name="x"
            size={46}
            color="black"
            style={{ marginTop: 40, color: "white" }}
          />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={{ uri: this.props.route.params.imageUri }}
        />
        <Form>
          <Item inlineLabel>
            <Label>Description</Label>
            <Input onChangeText={this.handleDescription} />
          </Item>
          <Item inlineLabel last>
            <Label>Location</Label>
            <Input />
          </Item>
        </Form>
        <TouchableOpacity
          style={styles.button}
          style={{
            width: 200,
            alignItems: "center",
            backgroundColor: "#3e7ef1",
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 90,
            padding: 10,
            color: "#ffffff",
            borderRadius: 4,
          }}
          onPress={this.imagePost}
        >
          <Text style={{ color: "#ffffff", fontWeight: "bold" }}>POST</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.user.auth,
});

export default connect(mapStateToProps)(PostScreen);

const styles = StyleSheet.create({
  image: {
    height: 250,
    marginTop: 50,
    width: Dimensions.get("window").width,
  },
});
