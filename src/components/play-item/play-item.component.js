import React from 'react';
import { Dimensions, View, StyleSheet, Text, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const PlayItem = ({ isLoading, podcast }) => (
  <View style={styles.container}>
    <Image style={styles.image} source={{ uri: podcast.lowResImage }} />
    <View>
      <Text>{isLoading ? 'Loading...' : podcast.title}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: height,
    width: width
  },
  image: {
    width: '80%',
    height: 'auto',
    maxWidth: 0.5 * height,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

export default PlayItem;
