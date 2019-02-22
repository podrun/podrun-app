import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import SearchComponent from '../../components/search/search.component';
import PodcastSection from '../../components/podcast-section/podcast-section.component';
import Loading from '../../components/loading/loading.component';
import Empty from '../../components/empty/empty.component';
import Error from '../../components/error/error.component';

export default class HomeComponent extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none'
    }
  };

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
      popular,
      searchTerm
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          {!isLoading && (
            <SearchComponent
              isLoading={isSearchLoading}
              onClear={clearResults}
              onChangeText={search}
            />
          )}
        </View>
        <View style={styles.content}>
          {isLoading && <Loading text={'Fetching popular podcasts'} />}
          {isEmpty && <Empty />}
          {isError && <Error />}
          {!(isLoading || isEmpty || isError) && (
            <ScrollView>
              {displayPopular &&
                popular.map((section, index) => (
                  <PodcastSection
                    key={index}
                    section={section}
                    routeName={'Podcast'}
                  />
                ))}
              {displaySearch && (
                <PodcastSection
                  section={{
                    listName: `We found ${
                      results.length
                    } results for "${searchTerm}"`,
                    items: results
                  }}
                  isVertical
                  routeName={'Podcast'}
                />
              )}
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#004363'
  },
  search: {
    height: '5%'
  },
  content: {
    marginTop: '10%',
    paddingTop: 20,
    height: '95%'
  },
  text: {
    color: '#faf6bc',
    fontSize: 20,
    padding: 20
  }
});
