// src/api/userApi.js
import axios from './axiosConfig';

// Fetch all users (admin only)
export const fetchAllUsers = async () => {
  try {
    console.log('Fetching users from:', `/api/admin/users`);
    const response = await axios.get(`/api/admin/users`);
    console.log('Users received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch a single user by ID (admin only)
export const fetchUserById = async (id) => {
  const response = await axios.get(`/api/admin/users/${id}`);
  return response.data;
};

// Create a new user (admin only)
export const createUser = async (user) => {
  try {
    console.log('Creating user:', user);
    const response = await axios.post(`/api/admin/users`, user);
    console.log('User created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update user status (enable/disable) (admin only)
export const toggleUserStatus = async (id) => {
  try {
    const response = await axios.put(`/api/admin/users/${id}/toggle-status`);
    return response.data;
  } catch (error) {
    console.error('Error toggling user status:', error);
    throw error;
  }
};

// Delete a user by ID (admin only)
export const deleteUser = async (id) => {
  try {
    console.log('Deleting user with ID:', id);
    await axios.delete(`/api/admin/users/${id}`);
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Get current user info
export const getCurrentUserInfo = async () => {
  try {
    const response = await axios.get('/api/test/whoami');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user info:', error);
    throw error;
  }
};