import React, { Component } from 'react';
import { ScrollView, View, Alert, Text, Image, ImageBackground, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import Background from '../../../assets/background.jpg';
import Logo from '../../../assets/header.png';
import styles from '../../styles/stylesheet';
import Petfinder from '../../../assets/petfinder.png';
import FavoriteHeader from '../../../assets/favorites.png';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Actual value utilitzed in the Petfinder API to specify pet search parameters.
      animalsValue: '',
      sizeValue: '',
      ageValue: '',
      sexValue: '',
      // Acts as a visual placeholder, chosen by the user in drop-down menu.
      animalsPlaceholder: '',
      sizePlaceholder: '',
      agePlaceholder: '',
      sexPlaceholder: '',
    };
  }

  /*
    Ensures a user is unable to enter a zipcode shorter than a US zipcode.
    If zipcode entered meets requirements, navigate to the Animals page and pass in the user's chosen pet search parameters.
  */
  onSubmit = () => {
    Keyboard.dismiss();
    const { navigate } = this.props.navigation;
    if (this.state.zip) {
      if (this.state.zip.length < 5) {
        Alert.alert('', 'Please enter a valid zipcode');
        return;
      }
      navigate('Animals', {
        zip: this.state.zip,
        animal: this.state.animalsValue,
        size: this.state.sizeValue,
        age: this.state.ageValue,
        sex: this.state.sexValue,
      });
    }
  }

  // Sets the zipcode entered by the user in the state, for the API call.
  onChangeText = (zip) => {
    this.setState({ zip });
  }

  // Navigates to favorites page and removes keyboard from screen if it is currently up.
  goFavorites = () => {
    Keyboard.dismiss();
    const { navigate } = this.props.navigation;
    navigate('Favorites');
  }

  render() {
    const Animals = [
      { key: 0, section: true, label: 'Animals' },
      { key: 'cat', label: 'Cats' },
      { key: 'dog', label: 'Dogs' },
      { key: 'barnyard', label: 'Barnyard Animals' },
      { key: 'bird', label: 'Birds' },
      { key: 'horse', label: 'Horses' },
      { key: 'smallfurry', label: 'Small and Furry' },
      { key: 'reptile', label: 'Reptiles' },
    ];
    const Size = [
      { key: 0, section: true, label: 'Size' },
      { key: 'S', label: 'Small' },
      { key: 'M', label: 'Medium' },
      { key: 'L', label: 'Large' },
      { key: 'XL', label: 'Extra Large' },
    ];
    const Age = [
      { key: 0, section: true, label: 'Age' },
      { key: 'Baby', label: 'Baby' },
      { key: 'Young', label: 'Young' },
      { key: 'Adult', label: 'Adult' },
      { key: 'Senior', label: 'Senior' },
    ];
    const Sex = [
      { key: 0, section: true, label: 'Sex' },
      { key: 'M', label: 'Male' },
      { key: 'F', label: 'Female' },
    ];
    return (
      <ImageBackground source={Background} style={styles.background}>
        <ScrollView>
          <TouchableOpacity
            onPress={this.goFavorites}
            style={{
            flex: 2,
            height: 55,
            width: 225,
            top: '2%',
            left: '90%',
          }}
            hitSlop={{
            bottom: -20,
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

          <View style={{ flex: 1 }}>
            <Image source={Logo} style={styles.logo} />
          </View>

          <View style={{ flex: 2 }}>
            <Text style={styles.welcome}>
          Where people find their new best friend
            </Text>
          </View>


          <View style={styles.options}>
            {/* Animals */}
            <ModalPicker
              cancelText="Cancel"
              style={{
              paddingRight: 7,
            }}
              data={Animals}
              onChange={(option) => { this.setState({ animalsValue: option.key, animalsPlaceholder: option.label }); }}
            >
              <TextInput
                style={{
            width: 150,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}
                editable={false}
                placeholder="Animals &#x25BC;"
                value={this.state.animalsPlaceholder}
              />
            </ModalPicker>

            {/* Size */}
            <ModalPicker
              cancelText="Cancel"
              data={Size}
              onChange={(option) => { this.setState({ sizeValue: option.key, sizePlaceholder: option.label }); }}
            >
              <TextInput
                style={{
            width: 150,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}
                editable={false}
                placeholder="Size &#x25BC;"
                value={this.state.sizePlaceholder}
              />
            </ModalPicker>
          </View>

          <View style={styles.options2}>
            <View style={styles.optionsRow}>
              {/* Age */}
              <ModalPicker
                cancelText="Cancel"
                style={{
                paddingRight: 7,
                }}
                data={Age}
                onChange={(option) => { this.setState({ ageValue: option.key, agePlaceholder: option.label }); }}
              >
                <TextInput
                  style={{
                  width: 150,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  }}
                  editable={false}
                  placeholder="Age &#x25BC;"
                  value={this.state.agePlaceholder}
                />
              </ModalPicker>

              {/* Sex */}
              <ModalPicker
                cancelText="Cancel"
                data={Sex}
                onChange={(option) => { this.setState({ sexValue: option.key, sexPlaceholder: option.label }); }}
              >
                <TextInput
                  style={{
                  width: 150,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  }}
                  editable={false}
                  placeholder="Sex &#x25BC;"
                  value={this.state.sexPlaceholder}
                />
              </ModalPicker>
            </View>

            <TextInput
              onSubmitEditing={this.onSubmit}
              onChangeText={this.onChangeText}
              keyboardType="numeric"
              placeholder="Enter your zip code"
              maxLength={5}
              placeholderTextColor="#303030"
              style={styles.zip}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              onPress={this.onSubmit}
              title="Get started"
              style={styles.button}
            >
              <Text style={styles.start}>
            Get started
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={{ flex: 0.3 }}>
          <Image source={Petfinder} style={styles.petfinder} />
        </View>
      </ImageBackground>
    );
  }
}
