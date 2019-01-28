import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { Debounce } from 'react-throttle';

export default class SearchComponent extends Component {
  state = {
    search: ''
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { onChangeText, onClear, isLoading } = this.props;
    const { search } = this.state;

    return (
      <Debounce time="1000" handler="onChangeText">
        <SearchBar
          placeholder="Search"
          onChangeText={text => onChangeText(text)}
          onClear={onClear}
          showLoading={isLoading}
          value={search}
        />
      </Debounce>
    );
  }
}
