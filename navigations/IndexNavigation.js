import React, { Component } from "react";
import AuthNavigation from "./AuthNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, SafeAreaView } from "react-native";
import TabNavigation from "./TabNavigation";
import firebase from "../configs/Firebase";
import { connect } from "react-redux";
import { setUser } from "../actions";

class IndexNavigation extends Component {
  state = {
    isLogin: false,
    userRef: firebase.firestore().collection("users"),
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({ isLogin: true });
        this.state.userRef
          .doc(user.uid)
          .get()
          .then((doc) => {
            this.props.dispatch(setUser(doc.data()));
          });
        // ...
      } else {
        this.setState({ isLogin: false });
      }
    });
  }

  render() {
    return (
      <NavigationContainer>
        {this.state.isLogin ? <TabNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(null, mapDispatchToProps)(IndexNavigation);
