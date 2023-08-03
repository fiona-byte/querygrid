import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const resp = error.response;

    if (
      resp.status === 400 &&
      resp.data?.message === 'invalid token' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      await instance.post('/users/refresh');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return instance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;
