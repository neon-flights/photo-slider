import React from "react";
import { Image } from "react-native";
import shorthash from 'shorthash';
import * as FileSystem from "expo-file-system";

export default class CacheImage extends React.Component {
  
  state = {
    source: null
  };

  componentDidMount = async () => {
    const photoLink = this.props.uri;
    const name = shorthash.unique(photoLink);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const photo = await FileSystem.getInfoAsync(path);
    if (photo.exists) {
      // console.log("Reading image from cache");
      this.setState({
        source: {
          uri: photo.uri
        }
      });
      return;
    }

    // console.log("Downloading image to cache...");
    const newPhoto = await FileSystem.downloadAsync(photoLink, path);
    this.setState({
      source: {
        uri: newPhoto.uri
      }
    });
  };

  render() {
    return <Image style={this.props.style} source={this.state.source} />;
  }
}
