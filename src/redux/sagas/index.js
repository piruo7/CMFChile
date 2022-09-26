import {all} from 'redux-saga/effects';

import getResource from './getResource';

export default function* sagas() {
  yield all([getResource()]);
}
