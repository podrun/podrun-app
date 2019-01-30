import { SET_PODCAST } from '../types';

export const setPodcast = podcast => dispatch =>
  dispatch({
    type: SET_PODCAST,
    payload: {
      podcast
    }
  });
