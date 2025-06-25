// LentilleForm.jsx
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
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { createLentille, updateLentille } from '../../../api/lentilleApi';

const initialFormState = {
  // From Produit
  nature: 'Optique',
  prixAchat: 0,
  prixVente: 0,
  remiseClient: 0,
  image: '',
  typeProduit: 'LENTILLE',

  // From Lentille
  designation: '',
  marque: '',
  modele: '',
  matiere: '',
  duree: '',
  h2o: '',
  o2: '',
  teint: '',
  couleur: '',
  uv: false,
  masque: false,
  sphMin: 0,
  sphMax: 0,
  cylMin: '',
  cylMax: '',
  rayonInf: '',
  axe: '',
  diametre: '',
  foyer: '',
  disponibilite: '',
  ajouterAuCatalogue: false,
  pv: 0,
  remisePrn: 0,
  promoClient: 0,
  promoFournisseur: 0,
  fournisseur: null
};

const LentilleForm = ({ lentille, onClose, onSubmitSuccess, open }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (lentille) {
      setFormData({ ...initialFormState, ...lentille });
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [lentille, open]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.designation) newErrors.designation = "La désignation est requise";
    if (!formData.marque) newErrors.marque = "La marque est requise";
    if (!formData.modele) newErrors.modele = "Le modèle est requis";
    if (!formData.prixVente || formData.prixVente <= 0)
      newErrors.prixVente = "Le prix de vente doit être supérieur à 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? (value === '' ? '' : parseFloat(value)) : 
              value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      if (lentille?.id) {
        await updateLentille(formData);
      } else {
        await createLentille(formData);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: "Une erreur est survenue lors de l'enregistrement" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {lentille ? 'Modifier la lentille' : 'Ajouter une nouvelle lentille'}
      </DialogTitle>
      <DialogContent>
        <form id="lentille-form" onSubmit={handleSubmit} noValidate>
          {/* Basic Information */}
          <TextField
            margin="dense"
            label="Désignation*"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            fullWidth
            error={!!errors.designation}
            helperText={errors.designation}
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
            label="Modèle*"
            name="modele"
            value={formData.modele}
            onChange={handleChange}
            fullWidth
            error={!!errors.modele}
            helperText={errors.modele}
            required
          />

          {/* Technical Specifications */}
          <TextField
            margin="dense"
            label="Matière"
            name="matiere"
            value={formData.matiere}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Durée"
            name="duree"
            value={formData.duree}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="H2O"
            name="h2o"
            value={formData.h2o}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="O2"
            name="o2"
            value={formData.o2}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Teinte"
            name="teint"
            value={formData.teint}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Couleur"
            name="couleur"
            value={formData.couleur}
            onChange={handleChange}
            fullWidth
          />

          {/* Boolean Switches */}
          <FormControlLabel
            control={
              <Switch
                checked={formData.uv}
                onChange={handleChange}
                name="uv"
              />
            }
            label="Protection UV"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.masque}
                onChange={handleChange}
                name="masque"
              />
            }
            label="Masque"
          />

          {/* Measurements */}
          <TextField
            margin="dense"
            label="Sphère Minimum"
            name="sphMin"
            type="number"
            step="0.25"
            value={formData.sphMin}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Sphère Maximum"
            name="sphMax"
            type="number"
            step="0.25"
            value={formData.sphMax}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Cylindre Minimum"
            name="cylMin"
            value={formData.cylMin}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Cylindre Maximum"
            name="cylMax"
            value={formData.cylMax}
            onChange={handleChange}
            fullWidth
          />

          {/* Additional Specifications */}
          <TextField
            margin="dense"
            label="Rayon Inférieur"
            name="rayonInf"
            value={formData.rayonInf}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Axe"
            name="axe"
            value={formData.axe}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Diamètre"
            name="diametre"
            value={formData.diametre}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Foyer"
            name="foyer"
            value={formData.foyer}
            onChange={handleChange}
            fullWidth
          />

          {/* Commercial Information */}
          <FormControl margin="dense" fullWidth>
            <InputLabel>Disponibilité</InputLabel>
            <Select
              name="disponibilite"
              value={formData.disponibilite}
              onChange={handleChange}
              label="Disponibilité"
            >
              <MenuItem value="En Stock">En Stock</MenuItem>
              <MenuItem value="Sur Commande">Sur Commande</MenuItem>
              <MenuItem value="Rupture">Rupture</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={formData.ajouterAuCatalogue}
                onChange={handleChange}
                name="ajouterAuCatalogue"
              />
            }
            label="Ajouter au catalogue"
          />

          {/* Pricing */}
          <TextField
            margin="dense"
            label="Prix d'achat (MAD)"
            name="prixAchat"
            type="number"
            step="0.01"
            value={formData.prixAchat}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Prix de vente (MAD)*"
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
            label="PV"
            name="pv"
            type="number"
            step="0.01"
            value={formData.pv}
            onChange={handleChange}
            fullWidth
          />

          {/* Discounts */}
          <TextField
            margin="dense"
            label="Remise PRN (%)"
            name="remisePrn"
            type="number"
            step="0.01"
            value={formData.remisePrn}
            onChange={handleChange}
            fullWidth
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
            label="Promo client (%)"
            name="promoClient"
            type="number"
            step="0.01"
            value={formData.promoClient}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Promo fournisseur (%)"
            name="promoFournisseur"
            type="number"
            step="0.01"
            value={formData.promoFournisseur}
            onChange={handleChange}
            fullWidth
          />

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
          form="lentille-form"
          variant="contained"
          disabled={isSubmitting}
          color="primary"
        >
          {lentille ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

LentilleForm.propTypes = {
  lentille: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default LentilleForm;

// // src/components/LentilleForm.jsx
// import React, { useState, useEffect } from 'react';
// // import { createLentille, updateLentille } from '../api/lentilleApi';
// import { createLentille } from '../../../api/lentilleApi';
// import { updateLentille } from '../../../api/lentilleApi';
// // import './LentilleForm.css';

// const initialFormState = {
//   typeProduit: 'LENTILLE',
//   marque: '',
//   reference: '',
//   couleur: '',
//   diameter: '',
//   baseCurve: '',
//   sphere: '',
//   cylindre: '',
//   axe: '',
//   addition: '',
//   genre: '',
//   quantiteInitiale: 0,
//   numero: '',
//   prixAchat: 0,
//   prixVente: 0,
//   remiseClient: 0,
//   nature: 'Optique',
//   image: ''
// };

// function LentilleForm({ lentille, onClose, onSubmitSuccess }) {
//   const [formData, setFormData] = useState(initialFormState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (lentille) {
//       setFormData({
//         ...initialFormState,
//         ...lentille
//       });
//     }
//   }, [lentille]);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.marque) newErrors.marque = "La marque est requise";
//     if (!formData.reference) newErrors.reference = "La référence est requise";
//     if (!formData.genre) newErrors.genre = "Le genre est requis";
//     if (!formData.prixVente || formData.prixVente <= 0) 
//       newErrors.prixVente = "Le prix de vente doit être supérieur à 0";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'number' 
//         ? (value === '' ? '' : parseFloat(value)) 
//         : value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     try {
//       setIsSubmitting(true);
//       if (lentille?.id) {
//         await updateLentille(formData);
//       } else {
//         await createLentille(formData);
//       }
//       onSubmitSuccess();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setErrors({ submit: "Une erreur est survenue lors de l'enregistrement" });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="form-container">
//       <div className="form-header">
//         <h2>{lentille ? 'Modifier la lentille' : 'Ajouter une nouvelle lentille'}</h2>
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
//             <label htmlFor="diameter">Diamètre (mm)</label>
//             <input
//               type="number"
//               step="0.01"
//               id="diameter"
//               name="diameter"
//               value={formData.diameter}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="baseCurve">Courbure de base</label>
//             <input
//               type="number"
//               step="0.01"
//               id="baseCurve"
//               name="baseCurve"
//               value={formData.baseCurve}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="sphere">Sphère</label>
//             <input
//               type="number"
//               step="0.01"
//               id="sphere"
//               name="sphere"
//               value={formData.sphere}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="cylindre">Cylindre</label>
//             <input
//               type="number"
//               step="0.01"
//               id="cylindre"
//               name="cylindre"
//               value={formData.cylindre}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="axe">Axe</label>
//             <input
//               type="number"
//               id="axe"
//               name="axe"
//               value={formData.axe}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="addition">Addition</label>
//             <input
//               type="number"
//               step="0.01"
//               id="addition"
//               name="addition"
//               value={formData.addition}
//               onChange={handleChange}
//             />
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
//             <label htmlFor="prixAchat">Prix d'achat (€)</label>
//             <input
//               type="number"
//               step="0.01"
//               id="prixAchat"
//               name="prixAchat"
//               value={formData.prixAchat}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="prixVente">Prix de vente (€)*</label>
//             <input
//               type="number"
//               step="0.01"
//               id="prixVente"
//               name="prixVente"
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

// export default LentilleForm;
