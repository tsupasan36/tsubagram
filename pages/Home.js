import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import firebase from "../configs/Firebase";

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

  render() {
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
                <TouchableOpacity>
                  <AntDesign
                    name="hearto"
                    size={32}
                    color="black"
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

export default Home;
