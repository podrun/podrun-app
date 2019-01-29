import {
  FETCH_EPISODES,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_ERROR
} from '../types';

const initialState = {
  isEpisodesLoading: false,
  isEpisodesEmpty: false,
  isEpisodesError: false,
  episodes: []
};

const episodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EPISODES:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_EPISODES_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_EPISODES_ERROR:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default episodesReducer;
