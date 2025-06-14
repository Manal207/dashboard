// src/components/Accessoire.jsx
import React, { useState, useEffect } from 'react';

import DeleteConfirmationAccessoire from './DeleteConfirmationAccessoire';
import { fetchAllAccessoires, deleteAccessoire } from '../../../api/accessoireApi';
import '../../Dashboard.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import AccessoireTable from './AccessoireTable';
import AccessoireForm from './AccessoireForm';

function Accessoire() {
  const [accessoires, setAccessoires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentAccessoire, setCurrentAccessoire] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accessoireToDelete, setAccessoireToDelete] = useState(null);

  useEffect(() => {
    loadAccessoires();
  }, []);

  const loadAccessoires = async () => {
    try {
      setLoading(true);
      const data = await fetchAllAccessoires();
      setAccessoires(data);
    } catch (error) {
      console.error('Error loading accessoires:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentAccessoire(null);
    setShowForm(true);
  };

  const handleEdit = (accessoire) => {
    setCurrentAccessoire(accessoire);
    setShowForm(true);
  };

  const handleDelete = (accessoire) => {
    setAccessoireToDelete(accessoire);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAccessoire(accessoireToDelete.id);
      setShowDeleteModal(false);
      loadAccessoires();
    } catch (error) {
      console.error('Error deleting accessoire:', error);
    }
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    loadAccessoires();
  };

  console.log('AccessoireTable:', AccessoireTable);
  console.log('AccessoireForm:', AccessoireForm);

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
          Accessoires
        </Typography>

        <Button
          variant="contained"
          onClick={handleAddNew}
          startIcon={<AddIcon sx={{ color: 'white'}} />}
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
          Nouveau
        </Button>
      </div>

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <AccessoireTable 
          accessoires={accessoires} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      <AccessoireForm
        accessoire={currentAccessoire}
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmitSuccess={handleFormSubmitSuccess}
      />

      {showDeleteModal && (
        <DeleteConfirmationAccessoire
          accessoire={accessoireToDelete}
          open={showDeleteModal}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default Accessoire;