// src/api/particulierApi.js
import axios from 'axios';

// const API_URL = 'http://localhost:8080';
// console.log('Using API URL:', API_URL);

// Fetch all particuliers
export const fetchAllParticuliers = async () => {
  try {
    console.log('Fetching particuliers from:', `/particulier/all`);
    const response = await axios.get(`/particulier/all`);
    console.log('Particuliers received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching particuliers:', error);
    throw error;
  }
};

// Fetch a single particulier by ID
export const fetchParticulierById = async (id) => {
  const response = await axios.get(`/particulier/find/${id}`);
  return response.data;
};

// Create a new particulier
export const createParticulier = async (particulier) => {
  const response = await axios.post(`/particulier/add`, particulier);
  return response.data;
};

// Update an existing particulier
export const updateParticulier = async (particulier) => {
  const response = await axios.put(`/particulier/update`, particulier);
  return response.data;
};

// Delete a particulier by ID
export const deleteParticulier = async (id) => {
  await axios.delete(`/particulier/delete/${id}`);
};