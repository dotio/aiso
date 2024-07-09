import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import store from '@web/store';
import { refreshTokenRequestAction } from '@web/store/authSlice/actions';

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
}

const onResponseError = (axiosInstance: AxiosInstance) => async (error: AxiosError<unknown, { _retry: boolean }>): Promise<AxiosError | AxiosResponse> => {
  const originalRequest = error.config;
  if (!originalRequest) {
    return Promise.reject(error);
  }

  if (error?.response?.status !== 401 || originalRequest.data?._retry) {
    return Promise.reject(error);
  }

  originalRequest.data = { _retry: true };
  await store.dispatch(refreshTokenRequestAction());
  originalRequest.data = undefined;

  return axiosInstance(originalRequest);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.response.use(onResponse, onResponseError(axiosInstance));
  return axiosInstance;
}
