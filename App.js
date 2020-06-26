import React from "react";
import { StyleSheet } from "react-native";
import { encode, decode } from "base-64";
import IndexNavigation from "./navigations/IndexNavigation";

import "react-native-gesture-handler";

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducers from "./reducers";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const store = createStore(rootReducers);

export default function App() {
  return (
    <Provider store={store}>
      <IndexNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
