// src/api/verreApi.js
import axios from 'axios';

// const API_URL = 'http://localhost:8080';
// console.log('Using API URL:', API_URL);

export const fetchAllVerres = async () => {
  try {
    console.log('Fetching verres from:', `/verre/all`);
    const response = await axios.get(`/verre/all`);
    console.log('Verres received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching verres:', error);
    throw error;
  }
};

export const fetchVerreById = async (id) => {
  const response = await axios.get(`/verre/find/${id}`);
  return response.data;
};

export const createVerre = async (verre) => {
  const response = await axios.post(`/verre/add`, verre);
  return response.data;
};

export const updateVerre = async (verre) => {
  const response = await axios.put(`/verre/update`, verre);
  return response.data;
};

export const deleteVerre = async (id) => {
  await axios.delete(`/verre/delete/${id}`);
};
