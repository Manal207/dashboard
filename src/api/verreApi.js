// src/api/verreApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';
console.log('Using API URL:', API_URL);

export const fetchAllVerres = async () => {
  try {
    console.log('Fetching verres from:', `${API_URL}/verre/all`);
    const response = await axios.get(`${API_URL}/verre/all`);
    console.log('Verres received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching verres:', error);
    throw error;
  }
};

export const fetchVerreById = async (id) => {
  const response = await axios.get(`${API_URL}/verre/find/${id}`);
  return response.data;
};

export const createVerre = async (verre) => {
  const response = await axios.post(`${API_URL}/verre/add`, verre);
  return response.data;
};

export const updateVerre = async (verre) => {
  const response = await axios.put(`${API_URL}/verre/update`, verre);
  return response.data;
};

export const deleteVerre = async (id) => {
  await axios.delete(`${API_URL}/verre/delete/${id}`);
};
