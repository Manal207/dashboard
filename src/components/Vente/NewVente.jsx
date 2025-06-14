// src/components/Vente/NewVente.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Alert,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

import ClientSelector from './ClientSelector';
import FicheForm from './FicheForm';
import FicheCard from './FicheCard';
import { createVente, updateVente } from '../../api/venteApi';

const steps = ['Sélection du client', 'Ajout des fiches', 'Récapitulatif'];

const initialFormState = {
  typeClient: '',
  clientId: null,
  clientNom: '',
  notes: '',
  fiches: []
};

function NewVente({ setActivePage }) {
  const [formData, setFormData] = useState(initialFormState);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [total, setTotal] = useState(0);
  const [editingVente, setEditingVente] = useState(null);

  useEffect(() => {
    // Check if we're editing an existing vente
    const venteToEdit = localStorage.getItem('venteToEdit');
    if (venteToEdit) {
      const vente = JSON.parse(venteToEdit);
      setEditingVente(vente);
      setFormData({
        typeClient: vente.typeClient || '',
        clientId: vente.clientId || null,
        clientNom: vente.clientNom || '',
        notes: vente.notes || '',
        fiches: vente.fiches || []
      });
      setCurrentStep(vente.fiches?.length > 0 ? 2 : 1);
      localStorage.removeItem('venteToEdit'); // Clean up
    }
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [formData.fiches]);

  const calculateTotal = () => {
    const totalAmount = formData.fiches.reduce((sum, fiche) => {
      return sum + (fiche.totalFiche || 0);
    }, 0);
    setTotal(totalAmount);
  };

  const handleBackToVentes = () => {
    setActivePage('vente');
  };

  const handleClientSelect = (clientData) => {
    setFormData(prev => ({
      ...prev,
      typeClient: clientData.typeClient,
      clientId: clientData.clientId,
      clientNom: clientData.clientNom
    }));
    setCurrentStep(1);
  };

  const handleAddFiche = (ficheData) => {
    const newFiche = {
      ...ficheData,
      ordre: formData.fiches.length + 1,
      id: Date.now() // Temporary ID for new fiches
    };
    
    setFormData(prev => ({
      ...prev,
      fiches: [...prev.fiches, newFiche]
    }));
  };

  const handleRemoveFiche = (ficheIndex) => {
    setFormData(prev => ({
      ...prev,
      fiches: prev.fiches.filter((_, index) => index !== ficheIndex)
    }));
  };

  const handleEditFiche = (ficheIndex, updatedFiche) => {
    setFormData(prev => ({
      ...prev,
      fiches: prev.fiches.map((fiche, index) => 
        index === ficheIndex ? { ...updatedFiche, ordre: fiche.ordre } : fiche
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.typeClient || !formData.clientId) {
      newErrors.client = "Veuillez sélectionner un client";
    }
    
    if (formData.fiches.length === 0) {
      newErrors.fiches = "Ajoutez au moins une fiche";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      
      const venteData = {
        typeClient: formData.typeClient,
        clientId: formData.clientId,
        notes: formData.notes || "",
        fiches: formData.fiches.map((fiche, index) => ({
          ordre: index + 1,
          montureId: fiche.montureId,
          prixMonture: parseFloat(fiche.prixMonture) || 0,
          verreODId: fiche.verreODId,
          prixVerreOD: parseFloat(fiche.prixVerreOD) || 0,
          verreOGId: fiche.verreOGId,
          prixVerreOG: parseFloat(fiche.prixVerreOG) || 0,
          mesuresOD: {
            sph: parseFloat(fiche.mesuresOD?.sph) || null,
            cyl: parseFloat(fiche.mesuresOD?.cyl) || null,
            axe: parseFloat(fiche.mesuresOD?.axe) || null
          },
          mesuresOG: {
            sph: parseFloat(fiche.mesuresOG?.sph) || null,
            cyl: parseFloat(fiche.mesuresOG?.cyl) || null,
            axe: parseFloat(fiche.mesuresOG?.axe) || null
          },
          accessoires: (fiche.accessoires || []).map((acc, accIndex) => ({
            accessoireId: acc.accessoireId,
            prixAccessoire: parseFloat(acc.prixAccessoire) || 0,
            ordre: accIndex + 1
          }))
        }))
      };

      console.log('📤 Sending vente data:', JSON.stringify(venteData, null, 2));

      if (editingVente?.id) {
        await updateVente(editingVente.id, venteData);
      } else {
        await createVente(venteData);
      }
      
      // Navigate back to ventes list
      setActivePage('vente');
      
    } catch (error) {
      console.error('❌ Error submitting vente:', error);
      
      if (error.response?.data) {
        console.error('📋 Error details:', error.response.data);
        setErrors({ 
          submit: `Erreur de validation: ${JSON.stringify(error.response.data)}`
        });
      } else {
        setErrors({ submit: 'Une erreur est survenue lors de l\'enregistrement' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: return formData.typeClient && formData.clientId;
      case 1: return formData.fiches.length > 0;
      case 2: return true;
      default: return false;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleBackToVentes}>
            <ArrowBackIcon />
          </IconButton>
          <Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                fontSize: '1.5rem',
                letterSpacing: '0.75px'
              }}
            >
              {editingVente ? 'Modifier la vente' : 'Nouvelle vente'}
            </Typography>
            {formData.clientNom && (
              <Typography variant="subtitle1" color="text.secondary">
                Client: {formData.clientNom}
              </Typography>
            )}
          </Box>
        </Box>

        {currentStep === 2 && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!canProceedToNext() || isSubmitting}
            startIcon={<SaveIcon />}
            sx={{
              textTransform: 'none',
              backgroundColor: 'black',
              borderRadius: '8px',
              fontWeight: 700,
              px: 3,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            {isSubmitting ? 'Enregistrement...' : editingVente ? 'Modifier' : 'Créer la vente'}
          </Button>
        )}
      </Box>

      {/* Stepper */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Error Messages */}
      {Object.keys(errors).length > 0 && (
        <Box sx={{ mb: 3 }}>
          {Object.values(errors).map((error, index) => (
            <Alert key={index} severity="error" sx={{ mb: 1 }}>
              {error}
            </Alert>
          ))}
        </Box>
      )}

      {/* Step Content */}
      <Box sx={{ minHeight: 400 }}>
        {currentStep === 0 && (
          <ClientSelector
            selectedType={formData.typeClient}
            selectedClientId={formData.clientId}
            onClientSelect={handleClientSelect}
          />
        )}

        {currentStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Ajout des fiches
            </Typography>
            
            {/* Form for adding fiches */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: '12px', border: '2px dashed #e0e0e0' }}>
              <FicheForm onAddFiche={handleAddFiche} />
            </Paper>

            {/* List of added fiches */}
            {formData.fiches.length > 0 && (
              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                  Fiches ajoutées ({formData.fiches.length})
                </Typography>
                <Box sx={{ display: 'grid', gap: 2 }}>
                  {formData.fiches.map((fiche, index) => (
                    <FicheCard
                      key={fiche.id || index}
                      fiche={fiche}
                      index={index}
                      onEdit={(updatedFiche) => handleEditFiche(index, updatedFiche)}
                      onRemove={() => handleRemoveFiche(index)}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        )}

        {currentStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Récapitulatif de la vente
            </Typography>
            
            <Paper sx={{ p: 3, borderRadius: '12px' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Client</Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {formData.clientNom} ({formData.typeClient})
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Nombre de fiches</Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {formData.fiches.length} fiche(s)
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={700}>
                  Total de la vente
                </Typography>
                <Typography variant="h4" fontWeight={700} color="primary">
                  {total.toFixed(2)} DH
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mt: 4,
        p: 3,
        backgroundColor: '#f8f9fa',
        borderRadius: '12px'
      }}>
        <Box>
          {currentStep > 0 && (
            <Button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={isSubmitting}
              sx={{ textTransform: 'none' }}
            >
              Précédent
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            onClick={handleBackToVentes} 
            disabled={isSubmitting}
            sx={{ textTransform: 'none' }}
          >
            Annuler
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceedToNext() || isSubmitting}
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                px: 3
              }}
            >
              Suivant
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!canProceedToNext() || isSubmitting}
              startIcon={<SaveIcon />}
              sx={{
                textTransform: 'none',
                backgroundColor: '#2e7d32',
                borderRadius: '8px',
                px: 3,
                '&:hover': {
                  backgroundColor: '#1b5e20',
                },
              }}
            >
              {isSubmitting ? 'Enregistrement...' : editingVente ? 'Modifier' : 'Créer la vente'}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default NewVente;