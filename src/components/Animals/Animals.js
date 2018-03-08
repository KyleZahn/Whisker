import React, { Component } from 'react';
import { ActivityIndicator, Image, View, TouchableOpacity } from 'react-native';
import { API_KEY } from 'react-native-dotenv';
import SwipeCards from '../../modules/SwipeCards/SwipeCards';
import HeaderSmall from '../../../assets/headerSmall.png';
import FavoriteHeader from '../../../assets/favorites.png';
import BackArrow from '../../../assets/backArrow.png';


export default class Animals extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={{ backgroundColor: '#303030', height: '8%' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            zIndex: 3,
            height: '57%',
            width: '30%',
            top: '22%',
            }}
          hitSlop={{
            top: -1,
            bottom: -1,
            left: -5,
            right: -95,
          }}
        >
          <Image
            source={BackArrow}
            style={{
              height: 30,
              width: 37,
              }}
          />
        </TouchableOpacity>
        <Image
          source={HeaderSmall}
          style={{
            height: 50,
            width: 170,
            bottom: 28,
            left: 120,
            }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Favorites')}
          style={{
            zIndex: 1,
            height: 55,
            width: 225,
            left: '90%',
            bottom: 73,
          }}
        >
          <Image
            source={FavoriteHeader}
            style={{
              zIndex: 1,
              height: '70%',
              width: '15%',
              }}
          />
        </TouchableOpacity>
      </View>
    ),
  })


  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
    this.fetchAnimals(
      this.props.navigation.state.params.zip,
      this.props.navigation.state.params.animal,
      this.props.navigation.state.params.size,
      this.props.navigation.state.params.age,
      this.props.navigation.state.params.sex,
    );
  }

  /*
    Fetch function which takes pet parameters from the user, passes them into the petfinder API, and returns the response in JSON format.
    The response is then set to the array in the state, cards, which renders individual pets in the form of swipe-cards.
  */
  fetchAnimals = (zip, animal, size, age, sex) => fetch(`http://api.petfinder.com/pet.find?format=json&key=${API_KEY}&location=${zip}&animal=${animal}&size=${size}&age=${age}&sex=${sex}&count=200`)
    .then(response => response.json())
    .then((response) => {
      this.setState({ cards: response.petfinder.pets.pet });
    });


  // Checks if the fetchAnimals response has been set, if not, displays a loading icon.
  render() {
    if (this.state.cards.length === 0) {
      return (
        <ActivityIndicator style={{ top: '40%' }} size="large" color="#e74c3c" />
      );
    }
    return (
      <SwipeCards cards={this.state.cards} style={{ flex: 1 }} />
    );
  }
}
