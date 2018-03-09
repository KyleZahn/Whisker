import React, { Component } from 'react';
import { Alert, TouchableWithoutFeedback, TouchableOpacity, View, Text, Image, AsyncStorage, FlatList } from 'react-native';

import FavoriteHeader from '../../../assets/favorites.png';
import RemoveFavorite from '../../../assets/removeFavorite.png';
import BackArrow from '../../../assets/backArrow.png';
import noPhotos from '../../../assets/noPhotos.png';

import styles from '../../styles/stylesheet';


export default class Favorites extends Component {
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
        <Text style={styles.favoriteTitle}>
          Favorites
        </Text>
        <TouchableOpacity
          style={{
            zIndex: 1,
            height: 55,
            width: 225,
            left: '88%',
            bottom: 49,
          }}
        >
          <Image
            source={FavoriteHeader}
            style={{
              zIndex: 1,
              height: '72%',
              width: '20%',
            }}
          />
        </TouchableOpacity>
      </View>
    ),
  })

  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      refreshing: false,
    };
    this.importData();
  }

  /*
    For every key in async storage, find all pets, return their data in JSON format, then push them to the favorites array in the state.
    A new array, pets, is created each time the function is ran to ensure pet removals from favorites are displayed immediately.
    Sets the refreshing state to false when ran, to handle FlatList updating properly.
  */
  importData = () => {
    const pets = [];
    AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiGet(keys)
      .then((result) => {
        result.forEach((data) => {
          const petData = JSON.parse(data[1]);
          pets.push(petData);
        });
        this.setState({ favorites: pets, refreshing: false });
      }));
  }

  /*
    Function called when a pet is removed from favorites.
    This sets the refreshing state to true, and calls importData as a callback function to update the FlatList.
  */
  refreshList = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.importData();
    });
  }

  /*
    Navigate to a new page, description, dedicated to viewing the pet's photos, reading their description (if provided),
    finding their shelter or foster home in Google Maps, and making a call or email to the proper contacts.
  */
  viewDesc = (item) => {
    const { navigate } = this.props.navigation;
    navigate('Description', { item });
  }

  /*
    Displays an alert asking the user if they would like to remove the pet from their favorites, to ensure there are no accidental removals.
    Passes the pet's unique id into a removeItem function, and calls refreshList to update the FlatList.
  */
  removeFavorite = (item) => {
    const id = item.id.$t;
    Alert.alert(
      'Remove from favorites', 'Are you sure you want to remove this pet from your favorites?',
      [
        { text: 'No' },
        {
          text: 'Yes',
          onPress: () => {
            AsyncStorage.removeItem(id);
            this.refreshList();
          },
        },
      ],
      { cancelable: true },
    );
  }

  renderImage = ({ item }) => {
    const hasPhotos = item.media.hasOwnProperty('photos');
    if (hasPhotos) {
      return (
        <Image
          style={[styles.favoriteImage]}
          resizeMode="stretch"
          source={{ uri: item.media.photos.photo[2].$t }}
        />
      );
    }
    return (
      <Image
        style={[styles.favoriteImage]}
        resizeMode="stretch"
        source={noPhotos}
      />
    );
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.viewDesc(item)} style={{ height: 150, backgroundColor: 'white', margin: 5 }} activeOpacity={0.7}>
      {this.renderImage({ item })}
      <Text style={[styles.favoriteName]}>
        {item.name.$t}
      </Text>
      <Text style={styles.favoriteDesc}>{item.age.$t} • {item.sex.$t} <Text>| </Text>
        {item.contact.city.$t}, {item.contact.state.$t}
      </Text>
      <TouchableWithoutFeedback onPress={() => this.removeFavorite(item)}>
        <Image
          source={RemoveFavorite}
          style={{
            zIndex: 1,
            height: 40,
            width: 40,
            bottom: 65,
            left: 360,
          }}
        />
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  )

  renderSeperator = () => (
    <View style={styles.divider} />
  )

  /*
  If the user has no pets in their favorites, display message below.
*/
  render() {
    if (this.state.favorites.length === 0) {
      return (
        <View>
          <Text style={styles.noAnimalsTitle}>
            :(
          </Text>
          <Text style={styles.noAnimals}>
            Uh oh! You have not added any animals to your favorites!
          </Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.state.favorites}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeperator}
        keyExtractor={item => item.id.$t}
        refreshing={this.state.refreshing}
      />
    );
  }
}
