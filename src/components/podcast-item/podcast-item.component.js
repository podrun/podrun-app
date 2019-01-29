import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

const setImage = podcast =>
  podcast.lowResImage
    ? podcast.lowResImage
    : 'https://source.unsplash.com/random';

const PodcastItem = props => {
  const { podcast, routeName, title, navigateTo } = props;
  return (
    <View>
      <TouchableOpacity onPress={() => navigateTo(podcast, routeName)}>
        <Card
          featuredTitle={podcast.title}
          image={{ uri: setImage(podcast) }}
        />
      </TouchableOpacity>
    </View>
  );
};
export default PodcastItem;
