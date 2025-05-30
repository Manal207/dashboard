// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import MontureTable from './MontureTable';
import MontureForm from './MontureForm';
import DeleteConfirmation from './DeleteConfirmation';
// import { fetchAllMontures, deleteMonture } from '../api/montureApi';
import { fetchAllMontures } from '../../../api/montureApi';
import { deleteMonture } from '../../../api/montureApi';
// import './Dashboard.css';
import '../../Dashboard.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';





function Monture() {
  const [montures, setMontures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentMonture, setCurrentMonture] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [montureToDelete, setMontureToDelete] = useState(null);


  useEffect(() => {
    loadMontures();
  }, []);

  const loadMontures = async () => {
    try {
      setLoading(true);
      const data = await fetchAllMontures();
      setMontures(data);
    } catch (error) {
      console.error('Error loading montures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentMonture(null);
    setShowForm(true);
  };

  const handleEdit = (monture) => {
    setCurrentMonture(monture);
    setShowForm(true);
  };

  const handleDelete = (monture) => {
    setMontureToDelete(monture);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMonture(montureToDelete.id);
      setShowDeleteModal(false);
      loadMontures();
    } catch (error) {
      console.error('Error deleting monture:', error);
    }
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    loadMontures();
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
          }}
        >
          Montures
        </Typography>

        {/* <h1 >Montures</h1> */}
        {/* <button className="btn-add" onClick={handleAddNew}>
          Nouveau
        </button> */}
        {/* <Button
          variant="contained"
          color="inherit"
          onClick={handleAddNew}
          startIcon={<AddIcon sx={{ color: 'black' }} />}  // black + icon on the left
        >
          Nouveau
        </Button> */}
        <Button
          variant="contained"
          onClick={handleAddNew}
          startIcon={<AddIcon sx={{ color: 'white' }} />}
          sx={{
            textTransform: 'none',  // <-- This disables uppercase transform
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333', // a slightly lighter black on hover
            },
          }}
        >
          Nouveau
        </Button>


        {/* <Button
          variant="contained"
          color="inherit"
          onClick={handleAddNew}
          // startIcon={<Iconify icon="mingcute:add-line" />}
          >
          Nouveau
        </Button> */}
      </div>

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <MontureTable 
          montures={montures} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      {/* Here you directly render MontureForm with open prop */}
      <MontureForm
        monture={currentMonture}
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmitSuccess={handleFormSubmitSuccess}
      />

      {showDeleteModal && (
        // <DeleteConfirmation
        //   monture={montureToDelete}
        //   onConfirm={confirmDelete}
        //   onCancel={() => setShowDeleteModal(false)}
        // />
        <DeleteConfirmation
  monture={montureToDelete}
  open={showDeleteModal}
  onConfirm={confirmDelete}
  onCancel={() => setShowDeleteModal(false)}
/>

      )}
    </div>
  );
}

export default Monture;


