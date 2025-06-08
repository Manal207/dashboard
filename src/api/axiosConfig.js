import axios from 'axios';

// Set base URL
axios.defaults.baseURL = 'http://localhost:8080';

// Function to get token
const getToken = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    return user.token;
  }
  return null;
};

// Request interceptor to add auth token
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      // Token expired or invalid
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;


// // src/api/axiosConfig.js
// import axios from 'axios';
// import { getCurrentUser } from './authApi';

// // Set base URL
// axios.defaults.baseURL = 'http://localhost:8080';

// // Request interceptor to add auth token
// axios.interceptors.request.use(
//   (config) => {
//     const user = getCurrentUser();
//     if (user && user.token) {
//       config.headers.Authorization = `Bearer ${user.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle auth errors
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default axios;