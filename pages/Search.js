import React, { Component } from "react";
import { SafeAreaView, Text } from "react-native";
import { Container, Header, Item, Input, Icon, Button } from "native-base";

class Search extends Component {
  render() {
    return (
      <SafeAreaView>
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
              <Icon name="ios-people" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
        </Container>
      </SafeAreaView>
    );
  }
}

export default Search;
