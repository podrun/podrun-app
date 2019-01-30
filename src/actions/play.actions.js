import { SET_PODCAST, CHANGE_STATE } from '../types';

export const setPodcast = podcast => dispatch =>
  dispatch({
    type: SET_PODCAST,
    payload: {
      podcast
    }
  });

export const setPlayerState = state => dispatch =>
  dispatch({
    type: CHANGE_STATE,
    payload: {
      playerState: state
    }
  });
