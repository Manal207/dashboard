// src/api/montureApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';
console.log('Using API URL:', API_URL);

// export const fetchAllMontures = async () => {
//   const response = await axios.get(`${API_URL}/monture/all`);
//   return response.data;
// };

export const fetchAllLentilles = async () => {
  try {
    console.log('Fetching montures from:', `${API_URL}/lentille/all`);
    const response = await axios.get(`${API_URL}/lentille/all`);
    console.log('Lentilles received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching lentilles:', error);
    throw error;
  }
};

export const fetchLentilleById = async (id) => {
  const response = await axios.get(`${API_URL}/lentille/find/${id}`);
  return response.data;
};

export const createLentille = async (lentille) => {
  const response = await axios.post(`${API_URL}/lentille/add`, lentille);
  return response.data;
};

export const updateLentille = async (lentille) => {
  const response = await axios.put(`${API_URL}/lentille/update`, lentille);
  return response.data;
};

export const deleteLentille = async (id) => {
  await axios.delete(`${API_URL}/lentille/delete/${id}`);
};