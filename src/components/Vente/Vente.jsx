// src/components/Vente/Vente.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Tabs, 
  Tab, 
  Paper,
  Chip 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import VenteTable from './VenteTable';
import VenteForm from './VenteForm';
import { fetchAllVentes, fetchMesVentes, deleteVente } from '../../api/venteApi';

function Vente() {
  const [ventes, setVentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentVente, setCurrentVente] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({
    total: 0,
    montantTotal: 0,
    enCours: 0,
    confirmees: 0
  });

  useEffect(() => {
    loadVentes();
  }, [activeTab]);

  const loadVentes = async () => {
    try {
      setLoading(true);
      const data = activeTab === 0 ? await fetchAllVentes() : await fetchMesVentes();
      setVentes(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error loading ventes:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (ventesData) => {
    const total = ventesData.length;
    const montantTotal = ventesData.reduce((sum, vente) => sum + (vente.totalHT || 0), 0);
    const enCours = ventesData.filter(v => v.statut === 'BROUILLON').length;
    const confirmees = ventesData.filter(v => v.statut === 'CONFIRMEE').length;
    
    setStats({ total, montantTotal, enCours, confirmees });
  };

  const handleAddNew = () => {
    setCurrentVente(null);
    setShowForm(true);
  };

  const handleEdit = (vente) => {
    setCurrentVente(vente);
    setShowForm(true);
  };

  const handleDelete = async (vente) => {
    try {
      await deleteVente(vente.id);
      loadVentes();
    } catch (error) {
      console.error('Error deleting vente:', error);
    }
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    loadVentes();
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              fontSize: '1.5rem',
              letterSpacing: '0.75px',
              mb: 1 
            }}
          >
            Gestion des Ventes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Créez et gérez vos ventes avec fiches multiples
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleAddNew}
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            backgroundColor: 'black',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.875rem',
            color: 'white',
            px: 3,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Nouvelle Vente
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 3, borderRadius: '12px', border: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Ventes
              </Typography>
            </Box>
            <ReceiptIcon sx={{ fontSize: 40, color: '#1976d2', opacity: 0.7 }} />
          </Box>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: '12px', border: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                {stats.montantTotal.toFixed(2)} DH
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Chiffre d'Affaires
              </Typography>
            </Box>
            <TrendingUpIcon sx={{ fontSize: 40, color: '#2e7d32', opacity: 0.7 }} />
          </Box>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: '12px', border: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#ed6c02' }}>
                {stats.enCours}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                En Cours
              </Typography>
            </Box>
            <Chip 
              label="Brouillon" 
              size="small" 
              sx={{ backgroundColor: '#fff3e0', color: '#ed6c02' }} 
            />
          </Box>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: '12px', border: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                {stats.confirmees}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Confirmées
              </Typography>
            </Box>
            <Chip 
              label="Confirmée" 
              size="small" 
              sx={{ backgroundColor: '#e8f5e8', color: '#2e7d32' }} 
            />
          </Box>
        </Paper>
      </Box>

      {/* Tabs */}
      <Paper sx={{ borderRadius: '12px', overflow: 'hidden', mb: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{ 
            borderBottom: '1px solid #e0e0e0',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem'
            }
          }}
        >
          <Tab label="Toutes les ventes" />
          <Tab label="Mes ventes" />
        </Tabs>
      </Paper>

      {/* Table */}
      {loading ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 200 
        }}>
          <Typography>Chargement...</Typography>
        </Box>
      ) : (
        <VenteTable 
          ventes={ventes} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
        />
      )}

      {/* Form Modal */}
      <VenteForm
        vente={currentVente}
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmitSuccess={handleFormSubmitSuccess}
      />
    </Box>
  );
}

export default Vente;