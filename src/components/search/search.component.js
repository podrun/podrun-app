import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

export default class SearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(search) {
    const { onChangeText } = this.props;
    this.setState({ search });
    onChangeText(search);
  }

  clearSearch() {
    const { onClear } = this.props;
    this.setState({ search: '' });
    onClear();
  }

  render() {
    const { isLoading } = this.props;
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Search"
        onChangeText={this.updateSearch}
        onClear={this.clearSearch}
        showLoading={isLoading}
        value={search}
      />
    );
  }
}
