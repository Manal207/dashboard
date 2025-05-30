// src/components/Verre.jsx
import React, { useState, useEffect } from 'react';

import DeleteConfirmation from './DeleteConfirmation';
import { fetchAllVerres, deleteVerre } from '../../../api/verreApi';
import '../../Dashboard.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import VerreTable from './VerreTable';
import VerreForm from './VerreForm';

function Verre() {
  const [verres, setVerres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentVerre, setCurrentVerre] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [verreToDelete, setVerreToDelete] = useState(null);

  

  useEffect(() => {
    loadVerres();
  }, []);

  const loadVerres = async () => {
    try {
      setLoading(true);
      const data = await fetchAllVerres();
      setVerres(data);
    } catch (error) {
      console.error('Error loading verres:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentVerre(null);
    setShowForm(true);
  };

  const handleEdit = (verre) => {
    setCurrentVerre(verre);
    setShowForm(true);
  };

  const handleDelete = (verre) => {
    setVerreToDelete(verre);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteVerre(verreToDelete.id);
      setShowDeleteModal(false);
      loadVerres();
    } catch (error) {
      console.error('Error deleting verre:', error);
    }
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    loadVerres();
  };

    console.log('VerreTaable:', VerreTable);
      console.log('VerreForm:', VerreForm);



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
          }}
        >
          Verres
        </Typography>

        <Button
          variant="contained"
          onClick={handleAddNew}
          startIcon={<AddIcon sx={{ color: 'white' }} />}
          sx={{
            textTransform: 'none',
            backgroundColor: 'black',
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
        <VerreTable 
          verres={verres} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      <VerreForm
        verre={currentVerre}
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmitSuccess={handleFormSubmitSuccess}
      />

      {showDeleteModal && (
        <DeleteConfirmation
          verre={verreToDelete}
          open={showDeleteModal}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default Verre;