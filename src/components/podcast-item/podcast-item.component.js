import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';

import styles from './styles';

export default class PodcastItem extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  parseHTML(htmlString) {
    const regex = /(<([^>]+)>)/gi;
    return htmlString ? htmlString.replace(regex, '') : '';
  }

  get image() {
    const {
      data: { highResImage },
      parallaxProps,
      even
    } = this.props;

    return (
      <ParallaxImage
        source={{ uri: highResImage }}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {}
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
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
