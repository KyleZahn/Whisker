import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import NoMoreCards from './NoMoreCards';
import Card from './Card';

export default class extends Component {
  /* 
    Adds the pet which is swiped right on to the users favorites, stored in AsyncStorage.
    The function will also check for duplicates and ensure the same pet can only be added to favorites once.
  */
  handleYup = (card) => {
    const id = card.id.$t;
    AsyncStorage.getAllKeys()
      .then((res) => {
        if ((res.indexOf(id)) === -1) {
          AsyncStorage.setItem(id, JSON.stringify(card));
        }
      });
  }

  render() {
    return (
      <SwipeCards
        cards={this.props.cards}
        renderCard={cardData => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}

        handleYup={this.handleYup}
        hasMaybeAction
      />
    );
  }
}

