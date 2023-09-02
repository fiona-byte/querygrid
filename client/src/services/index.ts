import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const resp = error.response;

    if (resp.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        await instance.post('/users/refresh');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return instance(originalRequest);
      } catch (err) {
        const error = err as AxiosError;
        const message = error.response?.data?.message;
        if (message === 'bad token') {
          window.location.replace('/login');
        } else {
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
