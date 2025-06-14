// src/api/particulierApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';
console.log('Using API URL:', API_URL);

// Fetch all particuliers
export const fetchAllParticuliers = async () => {
  try {
    console.log('Fetching particuliers from:', `${API_URL}/particulier/all`);
    const response = await axios.get(`${API_URL}/particulier/all`);
    console.log('Particuliers received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching particuliers:', error);
    throw error;
  }
};

// Fetch a single particulier by ID
export const fetchParticulierById = async (id) => {
  const response = await axios.get(`${API_URL}/particulier/find/${id}`);
  return response.data;
};

// Create a new particulier
export const createParticulier = async (particulier) => {
  const response = await axios.post(`${API_URL}/particulier/add`, particulier);
  return response.data;
};

// Update an existing particulier
export const updateParticulier = async (particulier) => {
  const response = await axios.put(`${API_URL}/particulier/update`, particulier);
  return response.data;
};

// Delete a particulier by ID
export const deleteParticulier = async (id) => {
  await axios.delete(`${API_URL}/particulier/delete/${id}`);
};