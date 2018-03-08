import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles/stylesheet';


export default class NoMoreCards extends Component {
  render() {
    return (
      <View style={[styles.card]}>
        <Text>There are no more cards!</Text>
      </View>
    );
  }
}
