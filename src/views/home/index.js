import { connect } from 'react-redux';
import HomeComponent from './home.component';

import {
  clearResults,
  getPodcasts,
  getPopular
} from '../../actions/home.actions';

const mapStateToProps = state => ({
  displayPopular: state.root.displayPopular,
  displaySearch: state.root.displaySearch,
  isSearchLoading: state.root.isSearchLoading,
  searchTerm: state.root.searchTerm,
  isLoading: state.root.isPopularLoading || state.root.isSearchLoading,
  isEmpty: state.root.isSearchEmpty,
  isError: state.root.isSearchError || state.root.isPopularError,
  results: state.root.results,
  popular: state.root.popular,
  nav: state.nav
});

const mapDispatchToProps = dispatch => ({
  getPopular: () => dispatch(getPopular()),
  clearResults: () => dispatch(clearResults()),
  search: searchTerm => dispatch(getPodcasts(searchTerm))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
