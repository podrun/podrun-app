import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class PodcastItem extends Component {
  parseHTML(htmlString) {
    const regex = /(<([^>]+)>)/gi;
    return htmlString ? htmlString.replace(regex, '') : '';
  }

  get image() {
    const {
      data: { highResImage },
      even
    } = this.props;

    return (
      <Image
        source={{ uri: highResImage }}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {}
        ]}
        style={styles.image}
      />
    );
  }

  render() {
    const { data, routeName, navigateTo, even, isVertical } = this.props;

    const uppercaseTitle = data.title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}
      >
        {data.title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={
          isVertical
            ? styles.verticalSlideInnerContainer
            : styles.slideInnerContainer
        }
        onPress={() => navigateTo(data, routeName)}
      >
        <View style={styles.shadow} />
        <View
          style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        >
          {this.image}
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          />
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : {}]}
        >
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={isVertical ? 8 : 2}
          >
            {this.parseHTML(data.description)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
