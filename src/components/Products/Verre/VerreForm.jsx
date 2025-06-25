// VerreForm.jsx
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
  Switch,
  FormControlLabel,
} from '@mui/material';
import { createVerre, updateVerre } from '../../../api/verreApi';

const GAMME_OPTIONS = {
  BASSE: 'BASSE',
  MOYENNE: 'MOYENNE',
  HAUTE: 'HAUTE'
};

const initialFormState = {
  nature: 'Optique',
  prixAchat: 0,
  prixVente: 0,
  remiseClient: 0,
  image: '',
  typeProduit: 'VERRE',
  nom: '',
  nomInterne: '',
  pht: '',
  duret: false,
  uv: false,
  ar: '',
  teint: '',
  solaire: false,
  remarque: '',
  foyer: '',
  matiere: '',
  disponibilite: '',
  indice: '',
  valeurMin: 0,
  valeurMax: 0,
  gamme: '',
  fournisseur: null
};

const VerreForm = ({ verre, onClose, onSubmitSuccess, open }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (verre) {
      setFormData({ ...initialFormState, ...verre });
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [verre, open]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = "Le nom est requis";
    if (!formData.nomInterne) newErrors.nomInterne = "La référence interne est requise";
    if (!formData.prixVente || formData.prixVente <= 0)
      newErrors.prixVente = "Le prix de vente doit être supérieur à 0";
    if (!formData.gamme) newErrors.gamme = "La gamme est requise";
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
      if (verre?.id) {
        await updateVerre(formData);
      } else {
        await createVerre(formData);
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
      <DialogTitle>{verre ? 'Modifier le verre' : 'Ajouter un nouveau verre'}</DialogTitle>
      <DialogContent>
        <form id="verre-form" onSubmit={handleSubmit} noValidate>
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
            label="Référence Interne*"
            name="nomInterne"
            value={formData.nomInterne}
            onChange={handleChange}
            fullWidth
            error={!!errors.nomInterne}
            helperText={errors.nomInterne}
            required
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
            </Select>
          </FormControl>
          
          <TextField
            margin="dense"
            label="PHT"
            name="pht"
            value={formData.pht}
            onChange={handleChange}
            fullWidth
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel>Foyer</InputLabel>
            <Select
              name="foyer"
              value={formData.foyer}
              onChange={handleChange}
              label="Foyer"
            >
              <MenuItem value="Unifocal">Unifocal</MenuItem>
              <MenuItem value="Progressif">Progressif</MenuItem>
              <MenuItem value="Bifocal">Bifocal</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Indice"
            name="indice"
            value={formData.indice}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            label="Anti-Reflet"
            name="ar"
            value={formData.ar}
            onChange={handleChange}
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.duret}
                onChange={handleChange}
                name="duret"
              />
            }
            label="Traitement Durcisseur"
          />

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
                checked={formData.solaire}
                onChange={handleChange}
                name="solaire"
              />
            }
            label="Verre Solaire"
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
            label="Valeur Minimum"
            name="valeurMin"
            type="number"
            step="0.25"
            value={formData.valeurMin}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            label="Valeur Maximum"
            name="valeurMax"
            type="number"
            step="0.25"
            value={formData.valeurMax}
            onChange={handleChange}
            fullWidth
          />

          <FormControl margin="dense" fullWidth error={!!errors.gamme}>
            <InputLabel>Gamme*</InputLabel>
            <Select
              name="gamme"
              value={formData.gamme || ''}
              onChange={handleChange}
              label="Gamme*"
              required
            >
              <MenuItem value="">
                <em>Sélectionner une gamme</em>
              </MenuItem>
              {Object.entries(GAMME_OPTIONS).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </MenuItem>
              ))}
            </Select>
            {errors.gamme && <FormHelperText>{errors.gamme}</FormHelperText>}
          </FormControl>

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
            label="Remarque"
            name="remarque"
            value={formData.remarque}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
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
          form="verre-form"
          variant="contained"
          disabled={isSubmitting}
          color="primary"
        >
          {verre ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

VerreForm.propTypes = {
  verre: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default VerreForm;

// // VerreForm.jsx
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types'; // Add PropTypes
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
//   FormHelperText,
//   FormControl,
//   InputLabel,
//   Select
// } from '@mui/material';
// import { createVerre, updateVerre } from '../../../api/verreApi';

// const initialFormState = {
//   typeProduit: 'VERRE',
//   marque: '',
//   reference: '',
//   couleur: '',
//   teinte: '',
//   indice: '',
//   diametre: '',
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

// const VerreForm = ({ verre, onClose, onSubmitSuccess, open }) => {
//   const [formData, setFormData] = useState(initialFormState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (verre) {
//       setFormData({ ...initialFormState, ...verre });
//     } else {
//       setFormData(initialFormState);
//       setErrors({});
//     }
//   }, [verre, open]);

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
//       [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       setIsSubmitting(true);
//       if (verre?.id) {
//         await updateVerre(formData);
//       } else {
//         await createVerre(formData);
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
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>{verre ? 'Modifier le verre' : 'Ajouter un nouveau verre'}</DialogTitle>
//       <DialogContent>
//         <form id="verre-form" onSubmit={handleSubmit} noValidate>
//           <TextField
//             margin="dense"
//             label="Marque*"
//             name="marque"
//             value={formData.marque}
//             onChange={handleChange}
//             fullWidth
//             error={!!errors.marque}
//             helperText={errors.marque}
//             required
//           />
//           <TextField
//             margin="dense"
//             label="Référence*"
//             name="reference"
//             value={formData.reference}
//             onChange={handleChange}
//             fullWidth
//             error={!!errors.reference}
//             helperText={errors.reference}
//             required
//           />
//           <TextField
//             margin="dense"
//             label="Couleur"
//             name="couleur"
//             value={formData.couleur}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Teinte"
//             name="teinte"
//             value={formData.teinte}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Indice"
//             name="indice"
//             value={formData.indice}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Diamètre"
//             name="diametre"
//             type="number"
//             value={formData.diametre}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Cylindre"
//             name="cylindre"
//             type="number"
//             value={formData.cylindre}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Axe"
//             name="axe"
//             type="number"
//             value={formData.axe}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Addition"
//             name="addition"
//             type="number"
//             value={formData.addition}
//             onChange={handleChange}
//             fullWidth
//           />
//           <FormControl
//             margin="dense"
//             fullWidth
//             error={!!errors.genre}
//             required
//           >
//             <InputLabel>Genre*</InputLabel>
//             <Select
//               name="genre"
//               value={formData.genre}
//               onChange={handleChange}
//               label="Genre*"
//             >
//               <MenuItem value=""><em>Sélectionner un genre</em></MenuItem>
//               <MenuItem value="HOMME">Homme</MenuItem>
//               <MenuItem value="FEMME">Femme</MenuItem>
//               <MenuItem value="ENFANT">Enfant</MenuItem>
//               <MenuItem value="JUNIOR">Junior</MenuItem>
//               <MenuItem value="MIXTE">Mixte</MenuItem>
//             </Select>
//             {errors.genre && <FormHelperText>{errors.genre}</FormHelperText>}
//           </FormControl>

//           <TextField
//             margin="dense"
//             label="Quantité initiale"
//             name="quantiteInitiale"
//             type="number"
//             value={formData.quantiteInitiale}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Numéro"
//             name="numero"
//             value={formData.numero}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Prix d'achat (€)"
//             name="prixAchat"
//             type="number"
//             step="0.01"
//             value={formData.prixAchat}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             margin="dense"
//             label="Prix de vente (€)*"
//             name="prixVente"
//             type="number"
//             step="0.01"
//             value={formData.prixVente}
//             onChange={handleChange}
//             error={!!errors.prixVente}
//             helperText={errors.prixVente}
//             fullWidth
//             required
//           />
//           <TextField
//             margin="dense"
//             label="Remise client (%)"
//             name="remiseClient"
//             type="number"
//             step="0.01"
//             value={formData.remiseClient}
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
//           form="verre-form"
//           variant="contained"
//           disabled={isSubmitting}
//           color="primary"
//         >
//           {verre ? 'Modifier' : 'Ajouter'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// VerreForm.propTypes = {
//   verre: PropTypes.object,
//   onClose: PropTypes.func.isRequired,
//   onSubmitSuccess: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
// };

// export default VerreForm;


// // // src/components/VerreForm.jsx
// // import React, { useState, useEffect } from 'react';
// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Button,
// //   TextField,
// //   MenuItem,
// //   FormHelperText,
// //   FormControl,
// //   InputLabel,
// //   Select
// // } from '@mui/material';
// // // import { createVerre, updateVerre } from '../api/verreApi';
// // import { createVerre } from '../../../api/verreApi';
// // import { updateVerre } from '../../../api/verreApi';

// // const initialFormState = {
// //   typeProduit: 'VERRE',
// //   marque: '',
// //   reference: '',
// //   couleur: '',
// //   teinte: '',
// //   indice: '',
// //   diametre: '',
// //   cylindre: '',
// //   axe: '',
// //   addition: '',
// //   genre: '',
// //   quantiteInitiale: 0,
// //   numero: '',
// //   prixAchat: 0,
// //   prixVente: 0,
// //   remiseClient: 0,
// //   nature: 'Optique',
// //   image: ''
// // };

// // function VerreForm({ verre, onClose, onSubmitSuccess, open }) {
// //   const [formData, setFormData] = useState(initialFormState);
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   useEffect(() => {
// //     if (verre) {
// //       setFormData({ ...initialFormState, ...verre });
// //     } else {
// //       setFormData(initialFormState);
// //       setErrors({});
// //     }
// //   }, [verre, open]);

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.marque) newErrors.marque = "La marque est requise";
// //     if (!formData.reference) newErrors.reference = "La référence est requise";
// //     if (!formData.genre) newErrors.genre = "Le genre est requis";
// //     if (!formData.prixVente || formData.prixVente <= 0)
// //       newErrors.prixVente = "Le prix de vente doit être supérieur à 0";
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleChange = (e) => {
// //     const { name, value, type } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     try {
// //       setIsSubmitting(true);
// //       if (verre?.id) {
// //         await updateVerre(formData);
// //       } else {
// //         await createVerre(formData);
// //       }
// //       onSubmitSuccess();
// //     } catch (error) {
// //       setErrors({ submit: "Une erreur est survenue lors de l'enregistrement" });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
// //       <DialogTitle>{verre ? 'Modifier le verre' : 'Ajouter un nouveau verre'}</DialogTitle>
// //       <DialogContent>
// //         <form id="verre-form" onSubmit={handleSubmit} noValidate>
// //           <TextField
// //             margin="dense"
// //             label="Marque*"
// //             name="marque"
// //             value={formData.marque}
// //             onChange={handleChange}
// //             fullWidth
// //             error={!!errors.marque}
// //             helperText={errors.marque}
// //             required
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Référence*"
// //             name="reference"
// //             value={formData.reference}
// //             onChange={handleChange}
// //             fullWidth
// //             error={!!errors.reference}
// //             helperText={errors.reference}
// //             required
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Couleur"
// //             name="couleur"
// //             value={formData.couleur}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Teinte"
// //             name="teinte"
// //             value={formData.teinte}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Indice"
// //             name="indice"
// //             value={formData.indice}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Diamètre"
// //             name="diametre"
// //             type="number"
// //             value={formData.diametre}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Cylindre"
// //             name="cylindre"
// //             type="number"
// //             value={formData.cylindre}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Axe"
// //             name="axe"
// //             type="number"
// //             value={formData.axe}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Addition"
// //             name="addition"
// //             type="number"
// //             value={formData.addition}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <FormControl
// //             margin="dense"
// //             fullWidth
// //             error={!!errors.genre}
// //             required
// //           >
// //             <InputLabel>Genre*</InputLabel>
// //             <Select
// //               name="genre"
// //               value={formData.genre}
// //               onChange={handleChange}
// //               label="Genre*"
// //             >
// //               <MenuItem value=""><em>Sélectionner un genre</em></MenuItem>
// //               <MenuItem value="HOMME">Homme</MenuItem>
// //               <MenuItem value="FEMME">Femme</MenuItem>
// //               <MenuItem value="ENFANT">Enfant</MenuItem>
// //               <MenuItem value="JUNIOR">Junior</MenuItem>
// //               <MenuItem value="MIXTE">Mixte</MenuItem>
// //             </Select>
// //             {errors.genre && <FormHelperText>{errors.genre}</FormHelperText>}
// //           </FormControl>

// //           <TextField
// //             margin="dense"
// //             label="Quantité initiale"
// //             name="quantiteInitiale"
// //             type="number"
// //             value={formData.quantiteInitiale}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Numéro"
// //             name="numero"
// //             value={formData.numero}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Prix d'achat (€)"
// //             name="prixAchat"
// //             type="number"
// //             step="0.01"
// //             value={formData.prixAchat}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Prix de vente (€)*"
// //             name="prixVente"
// //             type="number"
// //             step="0.01"
// //             value={formData.prixVente}
// //             onChange={handleChange}
// //             error={!!errors.prixVente}
// //             helperText={errors.prixVente}
// //             fullWidth
// //             required
// //           />
// //           <TextField
// //             margin="dense"
// //             label="Remise client (%)"
// //             name="remiseClient"
// //             type="number"
// //             step="0.01"
// //             value={formData.remiseClient}
// //             onChange={handleChange}
// //             fullWidth
// //           />

// //           {/* Add image upload or URL input here if needed */}

// //           {errors.submit && (
// //             <p style={{ color: 'red' }}>{errors.submit}</p>
// //           )}
// //         </form>
// //       </DialogContent>
// //       <DialogActions>
// //         <Button onClick={onClose} disabled={isSubmitting}>
// //           Annuler
// //         </Button>
// //         <Button
// //           type="submit"
// //           form="verre-form"
// //           variant="contained"
// //           disabled={isSubmitting}
// //         >
// //           {verre ? 'Modifier' : 'Ajouter'}
// //         </Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // }

// // export default VerreForm;
