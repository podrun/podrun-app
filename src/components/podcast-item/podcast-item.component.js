import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

const setImage = podcast =>
  podcast.lowResImage
    ? podcast.lowResImage
    : 'https://source.unsplash.com/random';

const PodcastItem = ({ podcast }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={podcast => {
          /* 1. Navigate to the Details route with params */
          /*this.props.navigation.navigate('Podcast', {
            showId: podcast.showId,
            title: podcast.title
          });*/
          console.log('clicked', podcast);
        }}
      >
        <Card featuredTitle={podcast.title} image={setImage(podcast)} />
      </TouchableOpacity>
    </View>
  );
};
export default PodcastItem;
