import axios from 'axios';
import Qs from 'qs';
import { setupInterceptorsTo } from './interceptors/not_authorized';

const httpApi = axios.create({
  paramsSerializer: params => Qs.stringify(params, { arrayFormat: 'brackets' })
});

export default setupInterceptorsTo(httpApi);
