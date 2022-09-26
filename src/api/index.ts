import axios from 'axios';
import {API_URL} from '../utils/utils';

const baseURL = API_URL;

export default (url: any, method: any, headers: any) =>
  axios({
    baseURL,
    method,
    url,
    headers,
  });
