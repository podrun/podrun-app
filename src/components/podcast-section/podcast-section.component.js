import React from 'react';
import { View, FlatList } from 'react-native';
import PodcastItem from '../podcast-item';

const PodcastSection = ({ section }) => (
  <View style={{ flex: 1 }}>
    <FlatList
      data={section.items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }, index) => (
        <PodcastItem podcast={item} key={index} routeName={'Podcast'} />
      )}
    />
  </View>
);
export default PodcastSection;
