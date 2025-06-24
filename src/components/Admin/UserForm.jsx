import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  Box,
} from '@mui/material';
import { createUser } from '../../api/userApi';

const initialFormState = {
  username: '',
  password: '',
  email: '',
  name: '',
};

const UserForm = ({ user, onClose, onSubmitSuccess, open }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        ...initialFormState,
        ...user,
        password: '', // Don't pre-fill password for editing
      });
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [user, open]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    } else if (formData.username.length < 3) {
      newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères";
    }
    
    if (!user && !formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom complet est requis";
    } else if (formData.name.length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      
      if (user?.id) {
        // For now, we only support creating new users
        // Update functionality can be added later if needed
        setErrors({ submit: "La modification d'utilisateur n'est pas encore supportée." });
        return;
      } else {
        await createUser(formData);
      }
      
      onSubmitSuccess();
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Handle specific error messages from backend
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else if (error.response?.status === 400) {
        setErrors({ submit: "Données invalides. Vérifiez les informations saisies." });
      } else {
        setErrors({ submit: "Une erreur est survenue lors de l'enregistrement." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {user ? 'Modifier l\'utilisateur' : 'Ajouter un nouvel utilisateur'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" id="user-form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="dense"
            label="Nom d'utilisateur*"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            error={!!errors.username}
            helperText={errors.username}
            required
            disabled={!!user} // Disable username editing for existing users
          />
          
          <TextField
            margin="dense"
            label={user ? "Nouveau mot de passe (laisser vide pour ne pas changer)" : "Mot de passe*"}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            required={!user}
          />
          
          <TextField
            margin="dense"
            label="Email*"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          
          <TextField
            margin="dense"
            label="Nom complet*"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            required
          />
          
          {errors.submit && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.submit}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Annuler
        </Button>
        <Button
          type="submit"
          form="user-form"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enregistrement...' : (user ? 'Modifier' : 'Ajouter')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserForm.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default UserForm;