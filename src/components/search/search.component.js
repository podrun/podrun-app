import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import SearchBar from 'react-native-searchbar';

const loadingIcon = <Icon name="loading1" />;

export default class SearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  updateSearch(search) {
    if(search !== "") {
      const { onChangeText } = this.props;
      this.setState({ search });
      onChangeText(search);
    }
  }

  clearSearch() {
    const { onClear } = this.props;
    this.setState({ search: '' });
    onClear();
  }

  render() {
    const { isLoading } = this.props;
    const { search } = this.state;
    console.log(this.props);
    return (
      <SearchBar
        placeholder="Search"
        backButton={isLoading ? loadingIcon : null}
        handleSearch={this.updateSearch}
        onX={this.clearSearch}
        value={search}
        showOnLoad
      />
    );
  }
}
