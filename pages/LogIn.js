import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Item, Input, Card } from "native-base";
import firebase from "../configs/Firebase";

const LogoImage = require("../images/tsubagram.logo.png");

export default class Login extends Component {
  state = {
    email: null,
    password: null,
    loading: false,
    errors: [],
  };

  changeScreen = () => {
    this.props.navigation.navigate("Register");
  };

  nameHandler = (input) => {
    this.setState({ email: input });
  };
  passwordHandler = (input) => {
    this.setState({ password: input });
  };

  formValidation = () => {
    let errors = [];
    let error = "";
    if (this.state.email === null) {
      error = { email: "email is empty" };
      this.setState({ loading: false, errors: errors.concat(error) });
      return false;
    } else if (this.state.password === null) {
      errors.push("password is empty");
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = () => {
    console.log(this.formValidation());
    if (this.formValidation()) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          <View style={styles.firebaseSignIn}>
            <Image source={LogoImage} style={styles.img} />
          </View>
          <Item rounded style={styles.textBox}>
            <Input
              placeholder="メールアドレス"
              onChangeText={this.nameHandler}
            />
          </Item>
          <Item rounded style={styles.textBox}>
            <Input
              placeholder="パスワード"
              onChangeText={this.passwordHandler}
            />
          </Item>
          <View style={styles.signIn}>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                {" "}
                ログイン
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card style={styles.cardLink}>
          <View style={styles.SignInLink}>
            <Text style={{ fontSize: 12 }}>
              アカウントをお持ちでないですか？
            </Text>
            <TouchableOpacity onPress={this.changeScreen}>
              <Text style={{ fontSize: 12 }}>サインイン</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  cardContainer: {
    marginRight: 10,
    marginLeft: 10,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 30,
  },

  firebaseSignIn: {
    alignItems: "center",
  },
  signIn: {
    alignItems: "center",
  },
  SignInLink: {
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

  cardLink: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
});
