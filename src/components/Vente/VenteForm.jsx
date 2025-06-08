// src/components/Vente/VenteForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ClientSelector from './ClientSelector';
import FicheForm from './FicheForm';
import FicheCard from './FicheCard';
import { createVente, updateVente } from '../../api/venteApi';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    maxWidth: '95vw',
    width: '1400px',
    maxHeight: '90vh',
  }
}));

const steps = ['Sélection du client', 'Ajout des fiches', 'Récapitulatif'];

const initialFormState = {
  typeClient: '',
  clientId: null,
  clientNom: '',
  notes: '',
  fiches: []
};

function VenteForm({ vente, open, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState(initialFormState);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (open) {
      if (vente) {
        setFormData({
          typeClient: vente.typeClient || '',
          clientId: vente.clientId || null,
          clientNom: vente.clientNom || '',
          notes: vente.notes || '',
          fiches: vente.fiches || []
        });
        setCurrentStep(vente.fiches?.length > 0 ? 2 : 1);
      } else {
        setFormData(initialFormState);
        setCurrentStep(0);
      }
      setErrors({});
    }
  }, [vente, open]);

  useEffect(() => {
    calculateTotal();
  }, [formData.fiches]);

  const calculateTotal = () => {
    const totalAmount = formData.fiches.reduce((sum, fiche) => {
      return sum + (fiche.totalFiche || 0);
    }, 0);
    setTotal(totalAmount);
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
      id: Date.now() // Temporary ID pour les nouvelles fiches
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


  // Dans VenteForm.jsx, remplacez la fonction handleSubmit par :

const handleSubmit = async () => {
  if (!validateForm()) return;

  try {
    setIsSubmitting(true);
    
    // ✅ Structure corrigée des données
    const venteData = {
      typeClient: formData.typeClient,
      clientId: formData.clientId,
      notes: formData.notes || "",
      fiches: formData.fiches.map((fiche, index) => ({
        ordre: index + 1, // Assurer que l'ordre commence à 1
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

    if (vente?.id) {
      await updateVente(vente.id, venteData);
    } else {
      await createVente(venteData);
    }
    
    onSubmitSuccess();
  } catch (error) {
    console.error('❌ Error submitting vente:', error);
    
    // Afficher les détails de l'erreur
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

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     try {
//       setIsSubmitting(true);
      
//       const venteData = {
//         typeClient: formData.typeClient,
//         clientId: formData.clientId,
//         notes: formData.notes,
//         fiches: formData.fiches.map(fiche => ({
//           ordre: fiche.ordre,
//           montureId: fiche.montureId,
//           prixMonture: fiche.prixMonture,
//           verreODId: fiche.verreODId,
//           prixVerreOD: fiche.prixVerreOD,
//           verreOGId: fiche.verreOGId,
//           prixVerreOG: fiche.prixVerreOG,
//           mesuresOD: fiche.mesuresOD,
//           mesuresOG: fiche.mesuresOG,
//           accessoires: fiche.accessoires?.map(acc => ({
//             accessoireId: acc.accessoireId,
//             prixAccessoire: acc.prixAccessoire,
//             ordre: acc.ordre
//           })) || []
//         }))
//       };

//       if (vente?.id) {
//         await updateVente(vente.id, venteData);
//       } else {
//         await createVente(venteData);
//       }
      
//       onSubmitSuccess();
//     } catch (error) {
//       console.error('Error submitting vente:', error);
//       setErrors({ submit: 'Une erreur est survenue lors de l\'enregistrement' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: return formData.typeClient && formData.clientId;
      case 1: return formData.fiches.length > 0;
      case 2: return true;
      default: return false;
    }
  };

  const handleClose = () => {
    setFormData(initialFormState);
    setCurrentStep(0);
    setErrors({});
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} maxWidth={false}>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight={700}>
            {vente ? 'Modifier la vente' : 'Nouvelle vente'}
          </Typography>
          {formData.clientNom && (
            <Typography variant="subtitle1" color="text.secondary">
              Client: {formData.clientNom}
            </Typography>
          )}
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Stepper */}
        <Box sx={{ px: 3, py: 2, backgroundColor: '#f5f5f5' }}>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Error Messages */}
        {Object.keys(errors).length > 0 && (
          <Box sx={{ p: 3 }}>
            {Object.values(errors).map((error, index) => (
              <Alert key={index} severity="error" sx={{ mb: 1 }}>
                {error}
              </Alert>
            ))}
          </Box>
        )}

        {/* Step Content */}
        <Box sx={{ p: 3, minHeight: 400 }}>
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
              
              {/* Formulaire horizontal pour ajouter une fiche */}
              <Paper sx={{ p: 3, mb: 3, borderRadius: '12px', border: '2px dashed #e0e0e0' }}>
                <FicheForm onAddFiche={handleAddFiche} />
              </Paper>

              {/* Liste des fiches ajoutées */}
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
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
        <Box>
          {currentStep > 0 && (
            <Button 
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={isSubmitting}
            >
              Précédent
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Annuler
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceedToNext() || isSubmitting}
            >
              Suivant
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!canProceedToNext() || isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : vente ? 'Modifier' : 'Créer la vente'}
            </Button>
          )}
        </Box>
      </DialogActions>
    </StyledDialog>
  );
}

export default VenteForm;