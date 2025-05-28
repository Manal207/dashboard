// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import LentilleTable from './LentilleTable';
import LentilleForm from './LentilleForm';
import DeleteConfirmation from './DeleteConfirmation';
import { fetchAllLentilles, deleteLentille } from '../api/lentilleApi';
import './Dashboard.css';

function Lentille() {
  const [lentilles, setLentilles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentLentille, setCurrentLentille] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lentilleToDelete, setLentilleToDelete] = useState(null);

  useEffect(() => {
    loadLentilles();
  }, []);

  const loadLentilles = async () => {
    try {
      setLoading(true);
      const data = await fetchAllLentilles();
      setLentilles(data);
    } catch (error) {
      console.error('Error loading lentilles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentLentille(null);
    setShowForm(true);
  };

  const handleEdit = (lentille) => {
    setCurrentLentille(lentille);
    setShowForm(true);
  };

  const handleDelete = (lentille) => {
    setLentilleToDelete(lentille);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteLentille(lentilleToDelete.id);
      setShowDeleteModal(false);
      loadLentilles();
    } catch (error) {
      console.error('Error deleting lentille:', error);
    }
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    loadLentilles();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Gestion des Lentilles</h1>
        <button className="btn-add" onClick={handleAddNew}>
          Ajouter une nouvelle lentille
        </button>
      </div>

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <LentilleTable 
          lentilles={lentilles} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <LentilleForm 
              lentille={currentLentille} 
              onClose={() => setShowForm(false)} 
              onSubmitSuccess={handleFormSubmitSuccess} 
            />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeleteConfirmation 
          lentille={lentilleToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default Lentille;
