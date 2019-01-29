import {
  LOAD_PODCAST,
  LOAD_PODCAST_SUCCESS,
  LOAD_PODCAST_ERROR,
  PLAY,
  PAUSE,
  RESUME,
  SKIP,
  STOP
} from '../types';

const initialState = {
  isPodcastPlaying: false,
  isPodcastLoading: false,
  isPodcastError: false,
  podcast: {},
  position: null
};

const playReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PODCAST:
      return {
        ...state,
        ...action.payload
      };
    case LOAD_PODCAST_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case LOAD_PODCAST_ERROR:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default playReducer;
