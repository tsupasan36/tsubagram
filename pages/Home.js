import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import firebase from "../configs/Firebase";

import { connect } from "react-redux";

import {
  Icon,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Left,
  Body,
  Right,
} from "native-base";

import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const LogoImage = require("../images/tsubagram.logo.png");

class Home extends Component {
  state = {
    postsRef: firebase.firestore().collection("posts"),
    posts: [],
  };

  componentDidMount() {
    this.state.postsRef.get().then((snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return doc.data();
      });
      this.setState({ posts: posts });
    });
  }

  toggleLike = (post) => {
    const userId = this.props.auth.uid;

    post.likes.includes(userId) ? this.unlike(post) : this.like(post);
  };

  unlike = async (post) => {
    const uid = this.props.auth.uid;
    await this.state.postsRef.doc(post.id).update({
      likes: firebase.firestore.FieldValue.arrayRemove(uid),
    });
    const posts = [...this.state.posts];
    const idx = posts.indexOf(post);
    const newPost = posts[idx].likes.filter((like) => like !== uid);
    console.log(newPost);
    posts[idx].likes = newPost;

    this.setState({ posts });
  };

  like = async (post) => {
    const uid = this.props.auth.uid;
    await this.state.postsRef.doc(post.id).update({
      likes: firebase.firestore.FieldValue.arrayUnion(uid),
    });
    const posts = [...this.state.posts];
    const idx = posts.indexOf(post);

    posts[idx].likes.push(uid);

    this.setState({ posts });
  };

  render() {
    const uid = this.props.auth.uid;
    return (
      <View>
        <FlatList
          data={this.state.posts}
          renderItem={({ item }) => (
            <Card>
              <CardItem>
                <Left>
                  <Body
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.postPhoto }}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 40,
                        marginRight: 10,
                      }}
                    />
                    <Text style={{ fontWeight: "bold" }}>{item.username}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image
                  source={{ uri: item.postPhoto }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              </CardItem>
              <CardItem>
                <Text>{item.postDescription}</Text>
              </CardItem>
              <CardItem>
                <TouchableOpacity
                  onPress={() => {
                    this.toggleLike(item);
                  }}
                >
                  <AntDesign
                    name={item.likes.includes(uid) ? "heart" : "hearto"}
                    size={32}
                    color={item.likes.includes(uid) ? "red" : "black"}
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <EvilIcons
                    name="comment"
                    size={45}
                    color="black"
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome
                    name="send-o"
                    size={28}
                    color="black"
                    style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
              </CardItem>
            </Card>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.user.auth,
});

export default connect(mapStateToProps)(Home);
