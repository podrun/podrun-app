import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';

import PodcastItem from '../../components/podcast-item';

export default class EpisodesComponent extends Component {
  componentDidMount() {
    const { getEpisodes, nav } = this.props;
    const selectedPodcast = nav.routes[nav.index].params;
    getEpisodes(selectedPodcast.showId);
  }
  render() {
    const { isLoading, isEmpty, isError, episodes } = this.props;
    return (
      <View style={styles.container}>
        {isLoading && <Text>Loading episodes</Text>}
        {!(isLoading || isEmpty || isError) && episodes.length > 0 && (
          <ScrollView>
            {episodes.map((podcast, index) => (
              <PodcastItem
                key={index}
                title={'title'}
                podcast={podcast}
                routeName={'Play'}
              />
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding: 20
  }
});
