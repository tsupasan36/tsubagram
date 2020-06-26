import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default class GalleryItem extends Component {
  render() {
    return (
      <View style={styles.imageItem}>
        <Image
          source={{ uri: this.props.gallery.postPhoto }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageItem: {
    width: 100,
    height: 100,
    borderWidth: 4,
    borderColor: "gray",
    borderRadius: 4,
    margin: 10,
  },
});
