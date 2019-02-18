import { CHANGE_SETTINGS } from '../types';

const initialState = {
  isActivated: true,
  tempo: 130,
  gain: 0.2
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SETTINGS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default settingsReducer;
