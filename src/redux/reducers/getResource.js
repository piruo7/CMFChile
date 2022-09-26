import {
  GET_RESOURCE_ERROR,
  GET_RESOURCE_START,
  GET_RESOURCE_SUCCESS,
} from '../types';

export default function (state, action) {
  switch (action.type) {
    case GET_RESOURCE_START:
      return {
        ...state,
        data: [],
        loading: true,
        error: null,
      };
    case GET_RESOURCE_SUCCESS:
      return {
        ...state,
        data: action.results,
        loading: false,
        error: null,
      };
    case GET_RESOURCE_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.error,
      };
    default:
      return {...state};
  }
}
