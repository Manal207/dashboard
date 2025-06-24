import axios from 'axios';

// Set base URL based on environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
// const API_BASE_URL = process.env.REACT_APP_API_URL ;

// Temporarily point to Railway for testing
// axios.defaults.baseURL = 'https://dashboardbackend-production-8fde.up.railway.app';




axios.defaults.baseURL = API_BASE_URL;

// // Log the environment for debugging
// console.log('Environment:', process.env.REACT_APP_ENV);
// console.log('API Base URL:', API_BASE_URL);

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
    
    // Log requests in development
    if (process.env.REACT_APP_ENV === 'development') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
axios.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (process.env.REACT_APP_ENV === 'development') {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      // Token expired or invalid
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Log errors in development
    if (process.env.REACT_APP_ENV === 'development') {
      console.error('API Error:', error.response?.status, error.response?.data);
    }
    
    return Promise.reject(error);
  }
);

export default axios;




// import axios from 'axios';

// // Set base URL
// axios.defaults.baseURL = 'http://localhost:8080';

// // Function to get token
// const getToken = () => {
//   const userStr = localStorage.getItem('user');
//   if (userStr) {
//     const user = JSON.parse(userStr);
//     return user.token;
//   }
//   return null;
// };

// // Request interceptor to add auth token
// axios.interceptors.request.use(
//   (config) => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
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
//     if (error.response?.status === 401 && window.location.pathname !== '/login') {
//       // Token expired or invalid
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default axios;


// // // src/api/axiosConfig.js
// // import axios from 'axios';
// // import { getCurrentUser } from './authApi';

// // // Set base URL
// // axios.defaults.baseURL = 'http://localhost:8080';

// // // Request interceptor to add auth token
// // axios.interceptors.request.use(
// //   (config) => {
// //     const user = getCurrentUser();
// //     if (user && user.token) {
// //       config.headers.Authorization = `Bearer ${user.token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // Response interceptor to handle auth errors
// // axios.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error.response?.status === 401) {
// //       // Token expired or invalid
// //       localStorage.removeItem('user');
// //       window.location.href = '/login';
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // export default axios;