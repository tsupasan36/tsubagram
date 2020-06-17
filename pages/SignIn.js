import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, Item, Input, Card } from "native-base";
import Divider from "react-native-divider";
import { TouchableOpacity } from "react-native-gesture-handler";

const LogoImage = require("../images/tsubagram.logo.png");

class SignIn extends Component {
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
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                ログイン
              </Text>
            </TouchableOpacity>
          </View>
          <Divider borderColor="#000000" color="#000000" orientation="center">
            or
          </Divider>
          <Item rounded style={styles.textBox}>
            <Input placeholder="メールアドレス" />
          </Item>
          <Item rounded style={styles.textBox}>
            <Input placeholder="フルネーム" />
          </Item>
          <Item rounded style={styles.textBox}>
            <Input placeholder="ユーザーネーム" />
          </Item>
          <Item rounded style={styles.textBox}>
            <Input placeholder="パスワード" />
          </Item>
          <View style={styles.signIn}>
            <TouchableOpacity style={styles.button}>
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
    marginRight: 10,
    marginLeft: 10,
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
