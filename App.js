import React from "react";
import { StyleSheet } from "react-native";
import { encode, decode } from "base-64";
import IndexNavigation from "./navigations/IndexNavigation";

import "react-native-gesture-handler";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  return <IndexNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
