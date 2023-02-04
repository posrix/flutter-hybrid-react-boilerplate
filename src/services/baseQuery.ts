import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Toast } from 'antd-mobile';
import { RootState } from 'src/store';
import { refreshToken } from 'src/store/appSlice';

export const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: async (headers, { getState }) => {
    let { token } = (getState() as RootState).app;
    if (!token) {
      try {
        const response = await window.flutter_inappwebview.callHandler('getToken');
        token = response.token;
        console.info('[system]', 'Call bridge handler getToken successful:', token);
      } catch (error) {
        console.info('[system]', 'Call bridge handler getToken failed:', error);
      }
    }
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
  async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error) {
      if (result.error.status >= 400 && result.error.status < 600) {
        Toast.show({
          //@ts-ignore
          content: result.error.data.msg,
          position: 'top',
        });
        if (result.error.status === 401) {
          // try to get a new token while 401
          try {
            const { token } = await window.flutter_inappwebview.callHandler('refreshToken');
            console.info('[system]', 'Call bridge handler refreshToken successful:', token);
            if (token) {
              // store the new token
              api.dispatch(refreshToken(token));
              // retry the initial query
              result = await baseQuery(args, api, extraOptions);
            }
          } catch (error) {
            console.info('[system]', 'Call bridge handler refreshToken failed:', error);
          }
        }
      }
    }
    return result;
  };
