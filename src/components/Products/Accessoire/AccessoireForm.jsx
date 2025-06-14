import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { createAccessoire, updateAccessoire } from '../../../api/accessoireApi';

const initialFormState = {
  nature: 'Optique',
  prixAchat: 0,
  prixVente: 0,
  remiseClient: 0,
  image: '',
  typeProduit: 'ACCESSOIRE',
  nom: '',
  reference: '',
  description: '',
  marque: '',
  quantiteStock: 0,
};

const AccessoireForm = ({ accessoire, onClose, onSubmitSuccess, open }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (accessoire) {
      setFormData({ ...initialFormState, ...accessoire });
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [accessoire, open]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.reference.trim()) newErrors.reference = "La référence est requise";
    if (!formData.marque.trim()) newErrors.marque = "La marque est requise";
    if (!formData.prixVente || formData.prixVente <= 0)
      newErrors.prixVente = "Le prix de vente doit être supérieur à 0";
    if (formData.quantiteStock < 0)
      newErrors.quantiteStock = "La quantité en stock ne peut pas être négative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      if (accessoire?.id) {
        await updateAccessoire(formData);
      } else {
        await createAccessoire(formData);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: "Une erreur est survenue lors de l'enregistrement." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{accessoire ? 'Modifier l\'accessoire' : 'Ajouter un nouvel accessoire'}</DialogTitle>
      <DialogContent>
        <form id="accessoire-form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="dense"
            label="Nom*"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            fullWidth
            error={!!errors.nom}
            helperText={errors.nom}
            required
          />
          <TextField
            margin="dense"
            label="Référence*"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            fullWidth
            error={!!errors.reference}
            helperText={errors.reference}
            required
          />
          <TextField
            margin="dense"
            label="Marque*"
            name="marque"
            value={formData.marque}
            onChange={handleChange}
            fullWidth
            error={!!errors.marque}
            helperText={errors.marque}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
          
          <FormControl margin="dense" fullWidth>
            <InputLabel>Nature</InputLabel>
            <Select
              name="nature"
              value={formData.nature}
              onChange={handleChange}
              label="Nature"
            >
              <MenuItem value="Optique">Optique</MenuItem>
              <MenuItem value="Solaire">Solaire</MenuItem>
              <MenuItem value="Entretien">Entretien</MenuItem>
              <MenuItem value="Protection">Protection</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Quantité en stock*"
            name="quantiteStock"
            type="number"
            value={formData.quantiteStock}
            onChange={handleChange}
            fullWidth
            error={!!errors.quantiteStock}
            helperText={errors.quantiteStock}
            required
          />

          <TextField
            margin="dense"
            label="Prix d'achat (€)"
            name="prixAchat"
            type="number"
            step="0.01"
            value={formData.prixAchat}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            label="Prix de vente (€)*"
            name="prixVente"
            type="number"
            step="0.01"
            value={formData.prixVente}
            onChange={handleChange}
            error={!!errors.prixVente}
            helperText={errors.prixVente}
            fullWidth
            required
          />

          <TextField
            margin="dense"
            label="Remise client (%)"
            name="remiseClient"
            type="number"
            step="0.01"
            value={formData.remiseClient}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            label="Image (URL)"
            name="image"
            value={formData.image}
            onChange={handleChange}
            fullWidth
          />

          {errors.submit && (
            <p style={{ color: 'red', marginTop: 10 }}>{errors.submit}</p>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Annuler
        </Button>
        <Button
          type="submit"
          form="accessoire-form"
          variant="contained"
          disabled={isSubmitting}
          color="primary"
        >
          {accessoire ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AccessoireForm.propTypes = {
  accessoire: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AccessoireForm;