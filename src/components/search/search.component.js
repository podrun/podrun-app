import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import SearchBar from 'react-native-searchbar';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchIcon = (
  <Icon
    name="search"
    size={20}
    style={{
      color: '#faf6bc',
      padding: 10
    }}
  />
);

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
        backButton={SearchIcon}
        handleChangeText={input => this.updateSearch(input)}
        onSubmitEditing={this.sendSearch}
        onX={this.clearSearch}
        value={search}
        showOnLoad
        //fontFamily={'PlayfairDisplay-Regular'}
        backgroundColor={'#004363'}
        iconColor={'#faf6bc'}
        textColor={'#faf6bc'}
        selectionColor={'#faf6bc'}
        placeholderTextColor={'#c9c580'}
        iOSHideShadow={true}
      />
    );
  }
}
