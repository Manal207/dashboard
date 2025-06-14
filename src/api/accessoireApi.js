// src/api/accessoireApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';
console.log('Using API URL:', API_URL);

export const fetchAllAccessoires = async () => {
  try {
    console.log('Fetching accessoires from:', `${API_URL}/accessoire/all`);
    const response = await axios.get(`${API_URL}/accessoire/all`);
    console.log('Accessoires received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching accessoires:', error);
    throw error;
  }
};

export const fetchAccessoireById = async (id) => {
  const response = await axios.get(`${API_URL}/accessoire/find/${id}`);
  return response.data;
};

export const createAccessoire = async (accessoire) => {
  const response = await axios.post(`${API_URL}/accessoire/add`, accessoire);
  return response.data;
};

export const updateAccessoire = async (accessoire) => {
  const response = await axios.put(`${API_URL}/accessoire/update`, accessoire);
  return response.data;
};

export const deleteAccessoire = async (id) => {
  await axios.delete(`${API_URL}/accessoire/delete/${id}`);
};


// // src/api/accessoireApi.js
// import axios from './axiosConfig';

// export const fetchAllAccessoires = async () => {
//   try {
//     const response = await axios.get('/accessoire/all');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching accessoires:', error);
//     throw error;
//   }
// };

// export const fetchAccessoireById = async (id) => {
//   const response = await axios.get(`/accessoire/find/${id}`);
//   return response.data;
// };

