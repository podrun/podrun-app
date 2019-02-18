import { CHANGE_SETTINGS } from '../types';

export const updateSettings = settings => dispatch =>
  dispatch({
    type: CHANGE_SETTINGS,
    payload: settings
  });
