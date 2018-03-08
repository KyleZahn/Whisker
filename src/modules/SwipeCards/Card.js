import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../../styles/stylesheet';
import noPhotos from '../../../assets/noPhotos.png';


export default class Card extends Component {
  renderImage = (props) => {
    const hasPhotos = props.media.hasOwnProperty('photos');
    if (hasPhotos) {
      return (
        <Image
          style={[styles.image]}
          resizeMode="stretch"
          source={{ uri: props.media.photos.photo[2].$t }}
        />
      );
    }
    return (
      <Image
        style={[styles.image]}
        resizeMode="stretch"
        source={noPhotos}
      />
    );
  }
  render() {
    return (
      <View style={{ flex: 10 }}>
        <View style={[styles.card]}>
          {this.renderImage(this.props)}
          <Text style={styles.cardName}>{this.props.name.$t}</Text>
          <Text style={styles.cardText}>
            {this.props.breeds.breed.$t}
          </Text>
          <Text style={styles.cardText}>{this.props.age.$t} • {this.props.sex.$t} <Text>| </Text>
            {this.props.contact.city.$t}, {this.props.contact.state.$t}
          </Text>
        </View>
      </View>
    );
  }
}
