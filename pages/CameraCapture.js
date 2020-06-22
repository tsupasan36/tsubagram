import React, { Component } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import {
  Feather,
  AntDesign,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";

class CameraCapture extends Component {
  state = {
    hasPermission: null,
    type: Camera.Constants.Type.back,
    image: null,
  };

  componentDidMount() {
    this.getPermission();
  }

  getPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });
  };

  captureImage = async () => {
    const image = await this.camera.takePictureAsync();

    if (!image.cancelled) {
      const resize = await ImageManipulator.manipulateAsync(image.uri, [], {
        compress: 0.1,
        format: "jpeg",
      });

      this.setState({
        image: resize,
      });
    }
  };

  changeScreen = () => {
    this.props.navigation.navigate("PostScreen", {
      imageUri: this.state.image.uri,
    });
  };

  render() {
    if (this.state.hasPermission === null) {
      return <View />;
    }

    if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    if (this.state.image != null) {
      return (
        <View>
          <ImageBackground
            source={{ uri: this.state.image.uri }}
            style={{ width: "100%", height: "100%" }}
          >
            <TouchableOpacity onPress={() => this.setState({ image: null })}>
              <Feather
                name="x"
                size={46}
                style={{ marginTop: 40, color: "white" }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.changeScreen}>
              <AntDesign
                name="arrowright"
                size={40}
                color="white"
                style={{ marginLeft: 330, margin: -50 }}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          ref={(ref) => {
            this.camera = ref;
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center",
              }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}
            ></TouchableOpacity>
            <TouchableOpacity onPress={this.changeScreen}>
              <Ionicons
                name="md-reverse-camera"
                size={46}
                color="white"
                style={{ marginTop: 650, marginLeft: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: "white",
                marginTop: 650,
                marginLeft: 115,
              }}
              onPress={this.captureImage}
            ></TouchableOpacity>
            <TouchableOpacity onPress={this.changeScreen}>
              <SimpleLineIcons
                name="picture"
                size={40}
                color="white"
                style={{ marginTop: 650, marginLeft: 110 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
}

export default CameraCapture;
