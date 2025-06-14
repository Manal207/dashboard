// src/components/Particulier.jsx
import React, { useState, useEffect } from 'react';

import DeleteConfirmationParticulier from './DeleteConfirmationParticulier';
import { fetchAllParticuliers } from '../../../../api/particulierApi';
import { deleteParticulier } from '../../../../api/particulierApi';
import '../../../Dashboard.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import ParticulierTable from './ParticulierTable';
import ParticulierForm from './ParticulierForm';

function Particulier() {
  const [particuliers, setParticuliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentParticulier, setCurrentParticulier] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [particulierToDelete, setParticulierToDelete] = useState(null);

  useEffect(() => {
    loadParticuliers();
  }, []);

  const loadParticuliers = async () => {
    try {
      setLoading(true);
      const data = await fetchAllParticuliers();
      setParticuliers(data);
    } catch (error) {
      console.error('Error loading particuliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentParticulier(null);
    setShowForm(true);
  };

  const handleEdit = (particulier) => {
    setCurrentParticulier(particulier);
    setShowForm(true);
  };

  const handleDelete = (particulier) => {
    setParticulierToDelete(particulier);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteParticulier(particulierToDelete.id);
      setShowDeleteModal(false);
      loadParticuliers();
    } catch (error) {
      console.error('Error deleting particulier:', error);
    }
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    loadParticuliers();
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
          Particuliers
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
          Nouveau
        </Button>
      </div>

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <ParticulierTable
          particuliers={particuliers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ParticulierForm
        particulier={currentParticulier}
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmitSuccess={handleFormSubmitSuccess}
      />

      {showDeleteModal && (
        <DeleteConfirmationParticulier
          particulier={particulierToDelete}
          open={showDeleteModal}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default Particulier;