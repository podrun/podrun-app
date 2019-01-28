import {
  CLEAR_RESULTS,
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  EMPTY_RESULTS,
  FETCH_POPULAR,
  FETCH_POPULAR_SUCCESS,
  FETCH_POPULAR_ERROR
} from '../types';

const initialState = {
  displayPopular: true,
  displaySearch: false,
  isSearchLoading: false,
  isSearchEmpty: false,
  isSearchError: false,
  isPopularLoading: false,
  isPopularError: false,
  results: [],
  popular: [],
  searchTerm: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_RESULTS:
      return {
        ...state,
        ...action.payload,
        displaySearch: false,
        displayPopular: true
      };
    case SEARCH:
      return {
        ...state,
        ...action.payload
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        displaySearch: true,
        displayPopular: false
      };
    case SEARCH_ERROR:
      return {
        ...state,
        ...action.payload
      };
    case EMPTY_RESULTS:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_POPULAR:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_POPULAR_SUCCESS:
      return {
        ...state,
        ...action.payload,
        displayPopular: true,
        displaySearch: false
      };
    case FETCH_POPULAR_ERROR:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
