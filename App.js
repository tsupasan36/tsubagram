import React from "react";
import { StyleSheet } from "react-native";

import AuthNavigation from "./navigations/AuthNavigation";
import "react-native-gesture-handler";

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
