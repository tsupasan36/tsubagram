import React from "react";
import { StyleSheet } from "react-native";
import { encode, decode } from "base-64";

import AuthNavigation from "./navigations/AuthNavigation";
import "react-native-gesture-handler";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  return <AuthNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
