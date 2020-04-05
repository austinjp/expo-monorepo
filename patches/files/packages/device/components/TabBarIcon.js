import React from 'react';
import { Image } from 'react-native';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/images/icon.png')}
        fadeDuration={0}
        style={{width:26,height:26}}
      />
    );
  }
}
