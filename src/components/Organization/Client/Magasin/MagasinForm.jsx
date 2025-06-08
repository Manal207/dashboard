import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { createMagasin, updateMagasin } from '../../../../api/magasinApi';
// import { createMagasin, updateMagasin } from ;

const initialFormState = {
  nom: '',
  code: '',
  adresse: '',
  ville: '',
  tel: '',
  type: '',
  statut: '',
  email: '',
  ice: '',
  societe: '',
  username: '',
  motDePasse: '',
  remise: '', // keep as string here, convert to number on submit if needed
};

const MagasinForm = ({ magasin, onClose, onSubmitSuccess, open }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (magasin) {
      // Convert remise to string for input value if needed
      setFormData({
        ...initialFormState,
        ...magasin,
        remise: magasin.remise != null ? magasin.remise.toString() : '',
      });
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [magasin, open]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.ville.trim()) newErrors.ville = "La ville est requise";
    if (!formData.tel.trim()) newErrors.tel = "Le téléphone est requis";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email invalide";
    if (formData.remise && isNaN(Number(formData.remise)))
      newErrors.remise = "La remise doit être un nombre";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Prepare data with correct types
    const payload = {
      ...formData,
      remise: formData.remise ? parseFloat(formData.remise) : 0,
    };

    try {
      setIsSubmitting(true);
      if (magasin?.id) {
        await updateMagasin(payload);
      } else {
        await createMagasin(payload);
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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{magasin ? 'Modifier le magasin' : 'Ajouter un nouveau magasin'}</DialogTitle>
      <DialogContent>
        <form id="magasin-form" onSubmit={handleSubmit} noValidate>
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
            label="Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Ville*"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            fullWidth
            error={!!errors.ville}
            helperText={errors.ville}
            required
          />
          <TextField
            margin="dense"
            label="Téléphone*"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            fullWidth
            error={!!errors.tel}
            helperText={errors.tel}
            required
          />
          <TextField
            margin="dense"
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Statut"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="dense"
            label="ICE"
            name="ice"
            value={formData.ice}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Société"
            name="societe"
            value={formData.societe}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Nom d'utilisateur"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Mot de passe"
            name="motDePasse"
            type="password"
            value={formData.motDePasse}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Remise (%)"
            name="remise"
            value={formData.remise}
            onChange={handleChange}
            fullWidth
            error={!!errors.remise}
            helperText={errors.remise}
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
          form="magasin-form"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {magasin ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

MagasinForm.propTypes = {
  magasin: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default MagasinForm;







// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   FormHelperText,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';
// // import { createMagasin, updateMagasin } from '../../../api/magasinApi';
// import { createMagasin } from '../../../../api/magasinApi';
// import { updateMagasin } from '../../../../api/magasinApi';

// const initialFormState = {
//   nom: '',
//   adresse: '',
//   ville: '',
//   telephone: '',
//   email: '',
//   responsable: '',
// };

// const MagasinForm = ({ magasin, onClose, onSubmitSuccess, open }) => {
//   const [formData, setFormData] = useState(initialFormState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (magasin) {
//       setFormData({ ...initialFormState, ...magasin });
//     } else {
//       setFormData(initialFormState);
//       setErrors({});
//     }
//   }, [magasin, open]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.nom) newErrors.nom = "Le nom est requis";
//     if (!formData.ville) newErrors.ville = "La ville est requise";
//     if (!formData.telephone) newErrors.telephone = "Le téléphone est requis";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       setIsSubmitting(true);
//       if (magasin?.id) {
//         await updateMagasin(formData);
//       } else {
//         await createMagasin(formData);
//       }
//       onSubmitSuccess();
//     } catch (error) {
//       console.error('Form submission error:', error);
//       setErrors({ submit: "Une erreur est survenue lors de l'enregistrement" });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>{magasin ? 'Modifier le magasin' : 'Ajouter un nouveau magasin'}</DialogTitle>
//       <DialogContent>
//         <form id="magasin-form" onSubmit={handleSubmit} noValidate>
//           <TextField
//             margin="dense"
//             label="Nom*"
//             name="nom"
//             value={formData.nom}
//             onChange={handleChange}
//             fullWidth
//             error={!!errors.nom}
//             helperText={errors.nom}
//             required
//           />
//           <TextField
//             margin="dense"
//             label="Adresse"
//             name="adresse"
//             value={formData.adresse}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Ville*"
//             name="ville"
//             value={formData.ville}
//             onChange={handleChange}
//             fullWidth
//             error={!!errors.ville}
//             helperText={errors.ville}
//             required
//           />
//           <TextField
//             margin="dense"
//             label="Téléphone*"
//             name="telephone"
//             value={formData.telephone}
//             onChange={handleChange}
//             fullWidth
//             error={!!errors.telephone}
//             helperText={errors.telephone}
//             required
//           />
//           <TextField
//             margin="dense"
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Responsable"
//             name="responsable"
//             value={formData.responsable}
//             onChange={handleChange}
//             fullWidth
//           />
//           {errors.submit && (
//             <p style={{ color: 'red' }}>{errors.submit}</p>
//           )}
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} disabled={isSubmitting}>
//           Annuler
//         </Button>
//         <Button
//           type="submit"
//           form="magasin-form"
//           variant="contained"
//           color="primary"
//           disabled={isSubmitting}
//         >
//           {magasin ? 'Modifier' : 'Ajouter'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// MagasinForm.propTypes = {
//   magasin: PropTypes.object,
//   onClose: PropTypes.func.isRequired,
//   onSubmitSuccess: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
// };

// export default MagasinForm;
