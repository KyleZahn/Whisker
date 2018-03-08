import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import Communications from 'react-native-communications';
import { Linking, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import FavoriteHeader from '../../../assets/favorites.png';
import BackArrow from '../../../assets/backArrow.png';
import HeaderSmall from '../../../assets/headerSmall.png';

import styles from '../../styles/stylesheet';


export default class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={{ backgroundColor: '#303030', height: '8%' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Favorites')}
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

  // Opens the pet's address from the Petfinder response in Google Maps, in a browser.
  openMaps = () => {
    const address = this.props.navigation.state.params.item.contact.address1.$t;
    const city = this.props.navigation.state.params.item.contact.city.$t;
    const state = this.props.navigation.state.params.item.contact.state.$t;
    const zip = this.props.navigation.state.params.item.contact.zip.$t;
    const maps = 'http://maps.google.com/?q=';
    Linking.openURL(`${maps} ${address} ${city} ${state} ${zip}`);
  }

  // Pushes all available pet photos to the array, images, which is displayed in a slideshow format.
  render() {
    const images = [];
    const { photo } = this.props.navigation.state.params.item.media.photos;
    if (photo[2]) {
      images.push(photo[2].$t);
    }
    if (photo[7]) {
      images.push(photo[7].$t);
    }
    if (photo[12]) {
      images.push(photo[12].$t);
    }
    if (photo[17]) {
      images.push(photo[17].$t);
    }
    if (photo[22]) {
      images.push(photo[22].$t);
    }
    if (photo[27]) {
      images.push(photo[27].$t);
    }
    if (photo[32]) {
      images.push(photo[32].$t);
    }
    return (
      <ScrollView>
        <ImageSlider
          images={images}
        />
        <Text style={styles.descName}>
          {this.props.navigation.state.params.item.name.$t}
        </Text>
        <Text style={styles.descBreed}>
          {this.props.navigation.state.params.item.breeds.breed.$t}
        </Text>
        <Text style={styles.descDesc}>{this.props.navigation.state.params.item.age.$t} • {this.props.navigation.state.params.item.sex.$t} <Text>| </Text>
          {this.props.navigation.state.params.item.contact.city.$t}, {this.props.navigation.state.params.item.contact.state.$t}
        </Text>
        <Text style={styles.description}>
          {this.props.navigation.state.params.item.description.$t}
        </Text>
        <Text
          style={styles.phone}
          onPress={() =>
            Communications.phonecall(
            this.props.navigation.state.params.item.contact.phone.$t,
            true,
          )}
        >
          {this.props.navigation.state.params.item.contact.phone.$t}
        </Text>
        <Text
          style={styles.email}
          onPress={() =>
            Communications.email(
            [this.props.navigation.state.params.item.contact.email.$t],
            null, null, this.props.navigation.state.params.item.name.$t, null,
          )}
        >
          {this.props.navigation.state.params.item.contact.email.$t}
        </Text>
        <TouchableOpacity
          onPress={this.openMaps}
          style={styles.viewMaps}
        >
          <Text style={styles.viewText}>
            Find in Maps
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

