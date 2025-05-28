// src/api/montureApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';
console.log('Using API URL:', API_URL);

// export const fetchAllMontures = async () => {
//   const response = await axios.get(`${API_URL}/monture/all`);
//   return response.data;
// };

export const fetchAllMontures = async () => {
  try {
    console.log('Fetching montures from:', `${API_URL}/monture/all`);
    const response = await axios.get(`${API_URL}/monture/all`);
    console.log('Montures received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching montures:', error);
    throw error;
  }
};

export const fetchMontureById = async (id) => {
  const response = await axios.get(`${API_URL}/monture/find/${id}`);
  return response.data;
};

export const createMonture = async (monture) => {
  const response = await axios.post(`${API_URL}/monture/add`, monture);
  return response.data;
};

export const updateMonture = async (monture) => {
  const response = await axios.put(`${API_URL}/monture/update`, monture);
  return response.data;
};

export const deleteMonture = async (id) => {
  await axios.delete(`${API_URL}/monture/delete/${id}`);
};