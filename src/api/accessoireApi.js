// src/api/accessoireApi.js
import axios from './axiosConfig';

export const fetchAllAccessoires = async () => {
  try {
    const response = await axios.get('/accessoire/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching accessoires:', error);
    throw error;
  }
};

export const fetchAccessoireById = async (id) => {
  const response = await axios.get(`/accessoire/find/${id}`);
  return response.data;
};