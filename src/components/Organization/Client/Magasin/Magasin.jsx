// src/components/Magasin.jsx
import React, { useState, useEffect } from 'react';

import DeleteConfirmation from './DeleteConfirmation';
import { fetchAllMagasins } from '../../../../api/magasinApi';
import { deleteMagasin } from '../../../../api/magasinApi';
import '../../../Dashboard.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import MagasinTable from './MagasinTable';
import MagasinForm from './MagasinForm';

function Magasin() {
  const [magasins, setMagasins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentMagasin, setCurrentMagasin] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [magasinToDelete, setMagasinToDelete] = useState(null);

  useEffect(() => {
    loadMagasins();
  }, []);

  const loadMagasins = async () => {
    try {
      setLoading(true);
      const data = await fetchAllMagasins();
      setMagasins(data);
    } catch (error) {
      console.error('Error loading magasins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentMagasin(null);
    setShowForm(true);
  };

  const handleEdit = (magasin) => {
    setCurrentMagasin(magasin);
    setShowForm(true);
  };

  const handleDelete = (magasin) => {
    setMagasinToDelete(magasin);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMagasin(magasinToDelete.id);
      setShowDeleteModal(false);
      loadMagasins();
    } catch (error) {
      console.error('Error deleting magasin:', error);
    }
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    loadMagasins();
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
            letterSpacing: '0.75px', // 👈 Add this line
          }}
        >
          Magasins
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
        <MagasinTable
          magasins={magasins}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <MagasinForm
        magasin={currentMagasin}
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmitSuccess={handleFormSubmitSuccess}
      />

      {showDeleteModal && (
        <DeleteConfirmation
          magasin={magasinToDelete}
          open={showDeleteModal}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default Magasin;
