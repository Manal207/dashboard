// src/components/MontureForm.jsx
import React, { useState, useEffect } from 'react';
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
  Select
} from '@mui/material';
// import { createMonture, updateMonture } from '../api/montureApi';
import { createMonture} from '../../../api/montureApi';
import { updateMonture } from '../../../api/montureApi';

const initialFormState = {
  typeProduit: 'MONTURE',
  marque: '',
  reference: '',
  couleur: '',
  branche: '',
  forme: '',
  genre: '',
  matiere: '',
  typeMontage: '',
  gamme: '',
  quantiteInitiale: 0,
  numero: '',
  prixAchat: 0,
  prixVente: 0,
  remiseClient: 0,
  nature: 'Optique',
  image: ''
};

function MontureForm({ monture, onClose, onSubmitSuccess, open }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (monture) {
      setFormData({ ...initialFormState, ...monture });
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [monture, open]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.marque) newErrors.marque = "La marque est requise";
    if (!formData.reference) newErrors.reference = "La référence est requise";
    if (!formData.forme) newErrors.forme = "La forme est requise";
    if (!formData.genre) newErrors.genre = "Le genre est requis";
    if (!formData.matiere) newErrors.matiere = "La matière est requise";
    if (!formData.prixVente || formData.prixVente <= 0) 
      newErrors.prixVente = "Le prix de vente doit être supérieur à 0";
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
      if (monture?.id) {
        await updateMonture(formData);
      } else {
        await createMonture(formData);
      }
      onSubmitSuccess();
    } catch (error) {
      setErrors({ submit: 'Une erreur est survenue lors de l\'enregistrement' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{monture ? 'Modifier la monture' : 'Ajouter une nouvelle monture'}</DialogTitle>
      <DialogContent>
        <form id="monture-form" onSubmit={handleSubmit} noValidate>
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
            label="Couleur"
            name="couleur"
            value={formData.couleur}
            onChange={handleChange}
            fullWidth
          />

          <FormControl
            margin="dense"
            fullWidth
            error={!!errors.forme}
            required
          >
            <InputLabel>Forme*</InputLabel>
            <Select
              name="forme"
              value={formData.forme}
              onChange={handleChange}
              label="Forme*"
            >
              <MenuItem value=""><em>Sélectionner une forme</em></MenuItem>
              <MenuItem value="CARRE">Carré</MenuItem>
              <MenuItem value="CARPE">Carpe</MenuItem>
              <MenuItem value="CERCLE">Cercle</MenuItem>
              <MenuItem value="OVALE">Ovale</MenuItem>
              <MenuItem value="AVIATEUR">Aviateur</MenuItem>
              <MenuItem value="RECT">Rectangulaire</MenuItem>
              <MenuItem value="RONDE">Ronde</MenuItem>
              <MenuItem value="PANTOS">Pantos</MenuItem>
              <MenuItem value="CLUBMASTER">Clubmaster</MenuItem>
              <MenuItem value="WAYFARER">Wayfarer</MenuItem>
              <MenuItem value="PAPILLON">Papillon</MenuItem>
              <MenuItem value="MASQUE">Masque</MenuItem>
            </Select>
            {errors.forme && <FormHelperText>{errors.forme}</FormHelperText>}
          </FormControl>

          <FormControl
            margin="dense"
            fullWidth
          >
            <InputLabel>Gamme</InputLabel>
            <Select
              name="gamme"
              value={formData.gamme}
              onChange={handleChange}
              label="Gamme"
            >
              <MenuItem value=""><em>Sélectionner une gamme</em></MenuItem>
              <MenuItem value="GAMME_1">gamme_1</MenuItem>
              <MenuItem value="GAMME_2">gamme_2</MenuItem>
              <MenuItem value="GAMME_3">gamme_3</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            margin="dense"
            fullWidth
            error={!!errors.genre}
            required
          >
            <InputLabel>Genre*</InputLabel>
            <Select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              label="Genre*"
            >
              <MenuItem value=""><em>Sélectionner un genre</em></MenuItem>
              <MenuItem value="HOMME">Homme</MenuItem>
              <MenuItem value="FEMME">Femme</MenuItem>
              <MenuItem value="ENFANT">Enfant</MenuItem>
              <MenuItem value="JUNIOR">Junior</MenuItem>
              <MenuItem value="MIXTE">Mixte</MenuItem>
            </Select>
            {errors.genre && <FormHelperText>{errors.genre}</FormHelperText>}
          </FormControl>

          <FormControl
            margin="dense"
            fullWidth
            error={!!errors.matiere}
            required
          >
            <InputLabel>Matière*</InputLabel>
            <Select
              name="matiere"
              value={formData.matiere}
              onChange={handleChange}
              label="Matière*"
            >
              <MenuItem value=""><em>Sélectionner une matière</em></MenuItem>
              <MenuItem value="METAL">Métal</MenuItem>
              <MenuItem value="PLASTIQUE">Plastique</MenuItem>
            </Select>
            {errors.matiere && <FormHelperText>{errors.matiere}</FormHelperText>}
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <InputLabel>Type de montage</InputLabel>
            <Select
              name="typeMontage"
              value={formData.typeMontage}
              onChange={handleChange}
              label="Type de montage"
            >
              <MenuItem value=""><em>Sélectionner un type</em></MenuItem>
              <MenuItem value="PERCE">Percé</MenuItem>
              <MenuItem value="NYLOR">Nylor</MenuItem>
              <MenuItem value="CERCLE">Cerclé</MenuItem>
              <MenuItem value="SOLAIRE">Solaire</MenuItem>
            </Select>
          </FormControl>

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
            label="Quantité initiale"
            name="quantiteInitiale"
            type="number"
            value={formData.quantiteInitiale}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            label="Numéro"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            label="Branche"
            name="branche"
            value={formData.branche}
            onChange={handleChange}
            fullWidth
          />

          {/* You can add file upload or image URL input for 'image' if needed */}

          {errors.submit && (
            <p style={{ color: 'red' }}>{errors.submit}</p>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          Annuler
        </Button>
        <Button
          type="submit"
          form="monture-form"
          variant="contained"
          disabled={isSubmitting}
        >
          {monture ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MontureForm;


// // src/components/MontureForm.jsx
// import React, { useState, useEffect } from 'react';
// import { createMonture, updateMonture } from '../api/montureApi';
// // import './MontureForm.css';

// const initialFormState = {
//   typeProduit: 'MONTURE',
//   marque: '',
//   reference: '',
//   couleur: '',
//   branche: '',
//   forme: '',
//   genre: '',
//   matiere: '',
//   typeMontage: '',
//   gamme: '',
//   quantiteInitiale: 0,
//   numero: '',
//   prixAchat: 0,
//   prixVente: 0,
//   remiseClient: 0,
//   nature: 'Optique',
//   image: ''
// };


// function MontureForm({ monture, onClose, onSubmitSuccess }) {
//   const [formData, setFormData] = useState(initialFormState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   useEffect(() => {
//     if (monture) {
//       setFormData({
//         ...initialFormState,
//         ...monture
//       });
//     }
//   }, [monture]);

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.marque) newErrors.marque = "La marque est requise";
//     if (!formData.reference) newErrors.reference = "La référence est requise";
//     if (!formData.forme) newErrors.forme = "La forme est requise";
//     if (!formData.genre) newErrors.genre = "Le genre est requis";
//     if (!formData.matiere) newErrors.matiere = "La matière est requise";
//     if (!formData.prixVente || formData.prixVente <= 0) 
//       newErrors.prixVente = "Le prix de vente doit être supérieur à 0";
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // const handleChange = (e) => {
//   //   const { name, value, type } = e.target;
    
//   //   setFormData({
//   //     ...formData,
//   //     [name]: type === 'number' ? parseFloat(value) : value
//   //   });
//   // };

//   const handleChange = (e) => {
//   const { name, value, type } = e.target;

//   setFormData({
//     ...formData,
//     [name]: type === 'number' 
//       ? (value === '' ? '' : parseFloat(value))  // keep empty string if blank
//       : value
//     });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
    
//   //   if (!validateForm()) return;
    
//   //   try {
//   //     setIsSubmitting(true);
      
//   //     if (monture?.id) {
//   //       await updateMonture(formData);
//   //     } else {
//   //       await createMonture(formData);
//   //     }
      
//   //     onSubmitSuccess();
//   //   } catch (error) {
//   //     console.error('Error submitting form:', error);
//   //     setErrors({ submit: 'Une erreur est survenue lors de l\'enregistrement' });
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   if (!validateForm()) return;

//   console.log('Submitting form data:', formData);
//   console.log('Is update?', monture?.id);

//   try {
//     setIsSubmitting(true);
    
//     if (monture?.id) {
//       const updated = await updateMonture(formData);
//       console.log('Updated monture:', updated);
//     } else {
//       const created = await createMonture(formData);
//       console.log('Created monture:', created);
//     }
    
//     onSubmitSuccess();
//   } catch (error) {
//     console.error('Error submitting form:', error);
//     setErrors({ submit: 'Une erreur est survenue lors de l\'enregistrement' });
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   return (
//     <div className="form-container">
//       <div className="form-header">
//         <h2>{monture ? 'Modifier la monture' : 'Ajouter une nouvelle monture'}</h2>
//         <button className="close-btn" onClick={onClose}>×</button>
//       </div>
      
//       <form onSubmit={handleSubmit}>
//         <div className="form-grid">
//           <div className="form-group">
//             <label htmlFor="marque">Marque*</label>
//             <input
//               type="text"
//               id="marque"
//               name="marque"
//               value={formData.marque}
//               onChange={handleChange}
//               className={errors.marque ? 'error' : ''}
//             />
//             {errors.marque && <span className="error-message">{errors.marque}</span>}
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="reference">Référence*</label>
//             <input
//               type="text"
//               id="reference"
//               name="reference"
//               value={formData.reference}
//               onChange={handleChange}
//               className={errors.reference ? 'error' : ''}
//             />
//             {errors.reference && <span className="error-message">{errors.reference}</span>}
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="couleur">Couleur</label>
//             <input
//               type="text"
//               id="couleur"
//               name="couleur"
//               value={formData.couleur}
//               onChange={handleChange}
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="forme">Forme*</label>
//             <select
//               id="forme"
//               name="forme"
//               value={formData.forme}
//               onChange={handleChange}
//               className={errors.forme ? 'error' : ''}
//             >
//               <option value="">Sélectionner une forme</option>
//               <option value="CARRE">Carré</option>
//               <option value="CARPE">Carpe</option>
//               <option value="CERCLE">Cercle</option>
//               <option value="OVALE">Ovale</option>
//               <option value="AVIATEUR">Aviateur</option>
//               <option value="RECT">Rectangulaire</option>
//               <option value="RONDE">Ronde</option>
//               <option value="PANTOS">Pantos</option>
//               <option value="CLUBMASTER">Clubmaster</option>
//               <option value="WAYFARER">Wayfarer</option>
//               <option value="PAPILLON">Papillon</option>
//               <option value="MASQUE">Masque</option>
//             </select>
//             {errors.forme && <span className="error-message">{errors.forme}</span>}
//           </div>

//                     <div className="form-group">
//             <label htmlFor="gamme">Gamme*</label>
//             <select
//               id="gamme"
//               name="gamme"
//               value={formData.gamme}
//               onChange={handleChange}
//               className={errors.forme ? 'error' : ''}
//             >
//               <option value="gamme">Sélectionner une gamme</option>
//               <option value="GAMME_1">gamme_1</option>
//               <option value="GAMME_2">gamme_2</option>
//               <option value="GAMME_3">gamme_3</option>
              
//             </select>
//             {errors.forme && <span className="error-message">{errors.forme}</span>}
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="genre">Genre*</label>
//             <select
//               id="genre"
//               name="genre"
//               value={formData.genre}
//               onChange={handleChange}
//               className={errors.genre ? 'error' : ''}
//             >
//               <option value="">Sélectionner un genre</option>
//               <option value="HOMME">Homme</option>
//               <option value="FEMME">Femme</option>
//               <option value="ENFANT">Enfant</option>
//               <option value="JUNIOR">Junior</option>
//               <option value="MIXTE">Mixte</option>
//             </select>
//             {errors.genre && <span className="error-message">{errors.genre}</span>}
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="matiere">Matière*</label>
//             <select
//               id="matiere"
//               name="matiere"
//               value={formData.matiere}
//               onChange={handleChange}
//               className={errors.matiere ? 'error' : ''}
//             >
//               <option value="">Sélectionner une matière</option>
//               <option value="METAL">Métal</option>
//               <option value="PLASTIQUE">Plastique</option>
//             </select>
//             {errors.matiere && <span className="error-message">{errors.matiere}</span>}
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="typeMontage">Type de montage</label>
//             <select
//               id="typeMontage"
//               name="typeMontage"
//               value={formData.typeMontage}
//               onChange={handleChange}
//             >
//               <option value="">Sélectionner un type</option>
//               <option value="PERCE">Percé</option>
//               <option value="NYLOR">Nylor</option>
//               <option value="CERCLE">Cerclé</option>
//               <option value="SOLAIRE">Solaire</option>
//             </select>
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="prixAchat">Prix d'achat (€)</label>
//             <input
//               type="number"
//               id="prixAchat"
//               name="prixAchat"
//               step="0.01"
//               value={formData.prixAchat}
//               onChange={handleChange}
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="prixVente">Prix de vente (€)*</label>
//             <input
//               type="number"
//               id="prixVente"
//               name="prixVente"
//               step="0.01"
//               value={formData.prixVente}
//               onChange={handleChange}
//               className={errors.prixVente ? 'error' : ''}
//             />
//             {errors.prixVente && <span className="error-message">{errors.prixVente}</span>}
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="quantiteInitiale">Quantité</label>
//             <input
//               type="number"
//               id="quantiteInitiale"
//               name="quantiteInitiale"
//               value={formData.quantiteInitiale}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
        
//         {errors.submit && <div className="error-global">{errors.submit}</div>}
        
//         <div className="form-actions">
//           <button type="button" className="btn-cancel" onClick={onClose}>
//             Annuler
//           </button>
//           <button type="submit" className="btn-save" disabled={isSubmitting}>
//             {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default MontureForm;