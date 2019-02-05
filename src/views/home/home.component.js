import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import SearchComponent from '../../components/search/search.component';
import PodcastSection from '../../components/podcast-section/podcast-section.component';
import Loading from '../../components/loading/loading.component';
import Empty from '../../components/empty/empty.component';
import Error from '../../components/error/error.component';

export default class HomeComponent extends Component {
  componentDidMount() {
    const { getPopular } = this.props;
    getPopular();
  }
  render() {
    const {
      search,
      isLoading,
      isEmpty,
      isSearchLoading,
      isError,
      displayPopular,
      displaySearch,
      clearResults,
      results,
      popular
    } = this.props;
    return (
      <View style={styles.container}>
        <SearchComponent
          isLoading={isSearchLoading}
          onClear={clearResults}
          onChangeText={search}
        />
        {isLoading && <Loading />}
        {isEmpty && <Empty />}
        {isError && <Error />}
        {!(isLoading || isEmpty || isError) && displayPopular && (
          <ScrollView>
            {popular.map((section, index) => (
              <PodcastSection key={index} section={section} />
            ))}
          </ScrollView>
        )}
        {!(isLoading || isEmpty || isError) && displaySearch && (
          <ScrollView>
            <PodcastSection section={{ items: results }} />
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
