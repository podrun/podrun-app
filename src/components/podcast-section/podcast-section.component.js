import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import PodcastItem from '../podcast-item/podcast-item.component';

const PodcastSection = ({ section }) => (
  <View>
    {section.items.map((podcast, i) => (
      <PodcastItem key={i} podcast={podcast} />
    ))}
  </View>
);
export default PodcastSection;
