import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  EMPTY_RESULTS,
  FETCH_POPULAR,
  FETCH_POPULAR_SUCCESS,
  FETCH_POPULAR_ERROR
} from '../types';
import { CLEAR_RESULTS } from '../types/index';

export const getPodcasts = searchTerm => async (dispatch, getState, api) => {
  console.log('getPodcasts');
  function onSuccess(results) {
    dispatch({
      type: SEARCH_SUCCESS,
      payload: {
        isSearchLoading: false,
        results: results
      }
    });
  }
  function onEmptySuccess() {
    dispatch({
      type: EMPTY_RESULTS,
      payload: {
        isSearchLoading: false,
        isSearchEmpty: true
      }
    });
  }
  function onError(err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: {
        isSearchLoading: false,
        isSearchError: true,
        error: err
      }
    });
  }
  try {
    dispatch({
      type: SEARCH,
      meta: {
        debounce: {
          time: 500
        }
      },
      payload: {
        searchTerm: searchTerm,
        isSearchLoading: true,
        isSearchError: false,
        isSearchEmpty: false
      }
    });
    const results = await api.search(searchTerm);
    const items = results.sections[0].items;
    items.length > 0 ? onSuccess(items) : onEmptySuccess();
  } catch (err) {
    console.log('getPodcasts err', err);
    onError(err);
  }
};

export const getPopular = () => async (dispatch, getState, api) => {
  console.log('getPopular');
  function onSuccess(results) {
    console.log('results', results);
    dispatch({
      type: FETCH_POPULAR_SUCCESS,
      payload: {
        isPopularLoading: false,
        popular: results
      }
    });
  }
  function onError(err) {
    dispatch({
      type: FETCH_POPULAR_ERROR,
      payload: {
        isPopularLoading: false,
        isPopularError: true,
        error: err
      }
    });
  }
  try {
    dispatch({
      type: FETCH_POPULAR,
      payload: {
        isPopularLoading: true,
        isPopularError: false
      }
    });
    const results = await api.getAllLists();
    const items = results.sections;
    onSuccess(items);
  } catch (err) {
    console.log('getPopular err', err);
    onError(err);
  }
};

export const clearResults = () => dispatch =>
  dispatch({
    type: CLEAR_RESULTS,
    payload: {
      searchTerm: '',
      results: [],
      isSearchLoading: false,
      isSearchEmpty: false,
      isSearchError: false
    }
  });
