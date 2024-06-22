import axios from 'axios';
//todo: Enhance by using dotenv
const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : '/',
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
