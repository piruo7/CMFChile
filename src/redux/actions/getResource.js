import {GET_RESOURCE_START} from '../types';

export const getResource = payload => ({
  type: GET_RESOURCE_START,
  payload,
});
