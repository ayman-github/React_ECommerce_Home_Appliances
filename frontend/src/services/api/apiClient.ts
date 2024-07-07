import axios from 'axios';
//todo: Enhance by using dotenv
const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '/',
  headers: {
    'Content-type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (localStorage.getItem('userInfo'))
      config.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem('userInfo')!).token
      }`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default apiClient;
