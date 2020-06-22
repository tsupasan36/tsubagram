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

export default class PostScreen extends Component {
  render() {
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
            <Input />
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
        >
          <Text style={{ color: "#ffffff", fontWeight: "bold" }}>POST</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 250,
    marginTop: 50,
    width: Dimensions.get("window").width,
  },
});
