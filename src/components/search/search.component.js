import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';
import { Debounce } from 'react-throttle';

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
    onChangeText(this.state.search);
  }

  render() {
    const { onClear, isLoading } = this.props;
    const { search } = this.state;

    return (
      <Debounce time={'500'} handler={'onChangeText'}>
        <SearchBar
          placeholder="Search"
          onChangeText={this.updateSearch}
          onClear={onClear}
          showLoading={isLoading}
          value={search}
        />
      </Debounce>
    );
  }
}
