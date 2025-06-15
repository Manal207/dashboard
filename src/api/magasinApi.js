// src/api/magasinApi.js
import axios from 'axios';

// const API_URL = 'http://localhost:8080';
// console.log('Using API URL:', API_URL);

// Fetch all magasins
export const fetchAllMagasins = async () => {
  try {
    console.log('Fetching magasins from:', `/magasin/all`);
    const response = await axios.get(`/magasin/all`);
    console.log('Magasins received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching magasins:', error);
    throw error;
  }
};

// Fetch a single magasin by ID
export const fetchMagasinById = async (id) => {
  const response = await axios.get(`/magasin/find/${id}`);
  return response.data;
};

// Create a new magasin
export const createMagasin = async (magasin) => {
  const response = await axios.post(`/magasin/add`, magasin);
  return response.data;
};

// Update an existing magasin
export const updateMagasin = async (magasin) => {
  const response = await axios.put(`/magasin/update`, magasin);
  return response.data;
};

// Delete a magasin by ID
export const deleteMagasin = async (id) => {
  await axios.delete(`/magasin/delete/${id}`);
};
