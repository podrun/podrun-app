import {
  FETCH_EPISODES,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_ERROR
} from '../types';

export const getEpisodes = podcastId => async (dispatch, getState, api) => {
  console.log('getEpisodes');
  function onSuccess(results) {
    console.log('results', results);
    dispatch({
      type: FETCH_EPISODES_SUCCESS,
      payload: {
        isEpisodesLoading: false,
        episodes: results
      }
    });
  }
  function onError(err) {
    dispatch({
      type: FETCH_EPISODES_ERROR,
      payload: {
        isEpisodesLoading: false,
        isEpisodesError: true,
        error: err
      }
    });
  }
  try {
    dispatch({
      type: FETCH_EPISODES,
      payload: {
        isEpisodesLoading: true,
        isEpisodesError: false
      }
    });
    const results = await api.getEpisodes(podcastId);
    const items = results.episodes;
    onSuccess(items);
  } catch (err) {
    console.log('getEpisodes err', err);
    onError(err);
  }
};
