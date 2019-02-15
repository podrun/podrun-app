import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import SearchBar from 'react-native-searchbar';

export default class SearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.showSearchBar = this.showSearchBar.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
  }

  updateSearch(search) {
    if (search !== '') {
      this.setState({ search });
    }
  }

  sendSearch() {
    const { search } = this.state;
    const { onChangeText } = this.props;

    onChangeText(search);
  }

  clearSearch() {
    const { onClear } = this.props;
    this.setState({ search: '' });
    onClear();
  }

  showSearchBar() {
    this.searchBar.show();
  }

  render() {
    const { isLoading } = this.props;
    const { search } = this.state;
    return (
      <SearchBar
        ref={ref => (this.searchBar = ref)}
        showOnLoad={false}
        focusOnLayout={false}
        placeholder="Search"
        onBack={this.clearSearch}
        backButton={isLoading ? <ActivityIndicator size="small" /> : null}
        handleChangeText={input => this.updateSearch(input)}
        onSubmitEditing={this.sendSearch}
        onX={this.clearSearch}
        value={search}
        showOnLoad
      />
    );
  }
}
