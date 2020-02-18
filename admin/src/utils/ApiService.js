import axios from 'axios';

const instance = axios.create({
  baseURL: '',
  timeout: 20000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

instance.interceptors.response.use(
  response => {
  return response;
  },
  error => {
  // Do something with response error
  if (error.response.status < 500) {
   return error.response
  }
  return Promise.reject(error);
  }
);

// eslint-disable-next-line import/prefer-default-export
export default instance;