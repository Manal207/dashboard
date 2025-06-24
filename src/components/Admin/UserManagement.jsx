// src/components/Admin/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import DeleteConfirmationUser from './DeleteConfirmationUser';
import { fetchAllUsers, deleteUser } from '../../api/userApi';
// import '../../../Dashboard.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import UserTable from './UserTable';
import UserForm from './UserForm';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowForm(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    loadUsers();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Typography
          sx={{
            fontFamily: `"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
            fontWeight: 700,
            fontSize: '1.25rem',
            lineHeight: 1.5,
            WebkitBoxFlex: 1,
            flexGrow: 1,
            letterSpacing: '0.75px',
          }}
        >
          Gestion des Utilisateurs
        </Typography>

        <Button
          variant="contained"
          onClick={handleAddNew}
          startIcon={<AddIcon sx={{ color: 'white' }} />}
          sx={{
            textTransform: 'none',
            backgroundColor: 'black',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.875rem',
            lineHeight: 1.71429,
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Nouvel Utilisateur
        </Button>
      </div>

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRefresh={loadUsers}
        />
      )}

      <UserForm
        user={currentUser}
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmitSuccess={handleFormSubmitSuccess}
      />

      {showDeleteModal && (
        <DeleteConfirmationUser
          user={userToDelete}
          open={showDeleteModal}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default UserManagement;