import {takeLatest, call, put} from 'redux-saga/effects';

import apiCall from '../../api';
import {
  GET_RESOURCE_ERROR,
  GET_RESOURCE_START,
  GET_RESOURCE_SUCCESS,
} from '../types';
import {API_KEY} from '../../utils/utils';

export function* get({payload}) {
  try {
    let url;
    if (payload.isYear) {
      url = `recursos_api/${payload.code}/${payload.year_today}?apikey=${API_KEY}&formato=json`;
    } else {
      url = `recursos_api/${payload.code}/periodo/${payload.year_prior}/${payload.month_prior}/${payload.year_today}/${payload.month_today}?apikey=${API_KEY}&formato=json`;
    }
    const method = 'GET';
    const headers = {};
    const results = yield call(apiCall, url, method, headers);
    yield put({type: GET_RESOURCE_SUCCESS, results: results.data});
  } catch (error) {
    yield put({type: GET_RESOURCE_ERROR, error});
  }
}

export default function* getResource() {
  yield takeLatest(GET_RESOURCE_START, get);
}
