import React from 'react';
import { View } from 'react-native';
import PodcastItem from '../podcast-item';

const PodcastSection = ({ section }) => (
  <View>
    {section.items.map((podcast, i) => (
      <PodcastItem key={i} podcast={podcast} routeName={'Podcast'} />
    ))}
  </View>
);
export default PodcastSection;
