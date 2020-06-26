import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button, Item, Input, Card } from "native-base";
import Divider from "react-native-divider";

import md5 from "md5";

import firebase from "../configs/Firebase.js";

const LogoImage = require("../images/tsubagram.logo.png");

class SignIn extends Component {
  state = {
    name: null,
    email: null,
    password: null,
    passwordConfirmation: null,
    loading: false,
    errors: [],
    userRef: firebase.firestore().collection("users"),
  };

  nameHandler = (input) => {
    this.setState({ name: input });
  };

  emailHandler = (input) => {
    this.setState({ email: input });
  };

  passwordHandler = (input) => {
    this.setState({ password: input });
  };

  passwordConfirmationHandler = (input) => {
    this.setState({ passwordConfirmation: input });
  };

  handleSubmit = () => {
    if (this.formValidation()) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          createdUser.user
            .updateProfile({
              displayName: this.state.name,
              photoURL: `https://gravatar.com/avatar/${md5(
                this.state.email
              )}?d=identicon `,
            })
            .then(() => {
              this.saveUser(createdUser);
              this.setState({ loading: false });
            });
        })
        .catch((err) => {
          console.log(err.message);
          this.setState({ loading: false });
        });
    }
  };

  formValidation = () => {
    let errors = [];
    let error = "";
    if (this.state.email === null) {
      error = { message: "email is empty" };

      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (this.state.name === null) {
      error = { message: "Name is empty" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (this.state.password === null) {
      error = { message: "Password is empty" };

      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (this.state.password !== this.state.passwordConfirmation) {
      error = { message: "Password confirm is empty" };

      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  saveUser = (createdUser) => {
    return this.state.userRef.doc(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      email: createdUser.user.email,
      uid: createdUser.user.uid,
      bio: "",
      photo: createdUser.user.photoURL,
      token: null,
    });
  };

  changeScreen = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          <View style={styles.firebaseLogin}>
            <Image source={LogoImage} style={styles.img} />
            <Text style={{ fontWeight: "bold" }}>
              友達の写真や動画をチェックしよう
            </Text>
            <TouchableOpacity style={styles.button} onPress={this.changeScreen}>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                ログイン
              </Text>
            </TouchableOpacity>
          </View>
          <Divider borderColor="#000000" color="#000000" orientation="center">
            or
          </Divider>
          <Item rounded style={styles.textBox}>
            <Input
              placeholder="メールアドレス"
              onChangeText={this.emailHandler}
            />
          </Item>
          <Item rounded style={styles.textBox}>
            <Input
              placeholder="ユーザーネーム"
              onChangeText={this.nameHandler}
            />
          </Item>
          <Item rounded style={styles.textBox}>
            <Input
              placeholder="パスワード"
              onChangeText={this.passwordHandler}
              secureTextEntry={true}
            />
          </Item>
          <Item rounded style={styles.textBox}>
            <Input
              placeholder="確認パスワード"
              onChangeText={this.passwordConfirmationHandler}
              secureTextEntry={true}
            />
          </Item>
          <View>
            {this.state.errors.map((error, index) => {
              return <Text key={index}>{error.message}</Text>;
            })}
          </View>
          <View style={styles.signIn}>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                {" "}
                登録する
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
        <View style={styles.logIn}>
          <Text>アカウントをお持ちですか？</Text>
          <TouchableOpacity onPress={this.changeScreen}>
            <Text>ログイン</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  cardContainer: {
    width: "90%",
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 30,
  },

  firebaseLogin: {
    alignItems: "center",
  },
  signIn: {
    alignItems: "center",
  },
  logIn: {
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3e7ef1",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    color: "#ffffff",
    borderRadius: 4,
  },
  textBox: {
    marginTop: 10,
    borderRadius: 4,
  },

  img: { width: 250, height: 100 },
});
