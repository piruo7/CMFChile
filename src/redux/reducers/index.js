import {combineReducers} from 'redux';

import getResource from './getResource';

const appReducer = combineReducers({
  getResource,
});

const rootReducer = (state, action) => {
  state = {...state};
  return appReducer(state, action);
};

export default rootReducer;
