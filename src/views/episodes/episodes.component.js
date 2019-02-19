import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Loading from '../../components/loading/loading.component';
import PodcastSection from '../../components/podcast-section/podcast-section.component';

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
        {isLoading && <Loading text={'Fetching latest episodes'} />}
        {!(isLoading || isEmpty || isError) && episodes.length > 0 && (
          <PodcastSection
            section={{ items: episodes }}
            routeName={'Play'}
            isVertical
          />
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
