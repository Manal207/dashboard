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
  Select,
  Box,
  Typography,
  Avatar,
  Alert
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { createMonture, updateMonture, updateMontureWithImage, getImageUrl } from '../../../api/montureApi';

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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (monture) {
      setFormData({ ...initialFormState, ...monture });
      // Set image preview if monture has an image
      if (monture.image) {
        setImagePreview(getImageUrl(monture.image));
      }
    } else {
      setFormData(initialFormState);
      setErrors({});
      setImageFile(null);
      setImagePreview(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      if (monture?.id) {
        // For updates: check if we have an image file to upload
        if (imageFile) {
          // Use image upload endpoint if new image selected
          await updateMontureWithImage(formData, imageFile);
        } else {
          // Use regular JSON endpoint if no new image
          await updateMonture(formData);
        }
      } else {
        // For new montures, use the image upload endpoint
        await createMonture(formData, imageFile);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
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
          
          {/* Image Upload Section */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Image de la monture
            </Typography>
            
            {imagePreview && (
              <Box sx={{ mb: 2 }}>
                <Avatar
                  src={imagePreview}
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto',
                    border: '2px solid #ddd'
                  }}
                  variant="rounded"
                />
              </Box>
            )}
            
            <input
              accept="image/*"
              type="file"
              id="image-upload"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 1 }}
              >
                {imagePreview ? 'Changer l\'image' : 'Ajouter une image'}
              </Button>
            </label>
            
            {imageFile && (
              <Typography variant="caption" display="block" color="text.secondary">
                Fichier sélectionné: {imageFile.name}
              </Typography>
            )}
          </Box>

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
              <MenuItem value="GAMME_1">Gamme 1</MenuItem>
              <MenuItem value="GAMME_2">Gamme 2</MenuItem>
              <MenuItem value="GAMME_3">Gamme 3</MenuItem>
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

          {errors.submit && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.submit}
            </Alert>
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
          {isSubmitting ? 'Enregistrement...' : (monture ? 'Modifier' : 'Ajouter')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MontureForm;


// // src/components/MontureForm.jsx
// import React, { useState, useEffect } from 'react';
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
//   Select,
//   Box,
//   Typography,
//   Avatar,
//   Alert,
//   useTheme,
//   useMediaQuery,
//   IconButton,
//   Collapse,
//   Divider,
//   Grid,
//   Card,
//   CardContent,
//   Stack,
//   Slide,
//   AppBar,
//   Toolbar
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import CloseIcon from '@mui/icons-material/Close';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
// import { createMonture, updateMonture, updateMontureWithImage, getImageUrl } from '../../../api/montureApi';

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

// // Transition for mobile full-screen modal
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// // Collapsible Section Component for Mobile
// function CollapsibleSection({ title, children, defaultExpanded = true }) {
//   const [expanded, setExpanded] = useState(defaultExpanded);

//   return (
//     <Card sx={{ mb: 2, borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
//       <CardContent sx={{ p: 0 }}>
//         <Box
//           onClick={() => setExpanded(!expanded)}
//           sx={{
//             p: 2,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             cursor: 'pointer',
//             borderBottom: expanded ? '1px solid #f0f0f0' : 'none',
//             '&:hover': { backgroundColor: '#f8f9fa' }
//           }}
//         >
//           <Typography variant="subtitle1" fontWeight={600} color="primary.main">
//             {title}
//           </Typography>
//           {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//         </Box>
//         <Collapse in={expanded}>
//           <Box sx={{ p: 2 }}>
//             {children}
//           </Box>
//         </Collapse>
//       </CardContent>
//     </Card>
//   );
// }

// // Enhanced Image Upload Component
// function ImageUploadSection({ imagePreview, imageFile, onImageChange, isMobile }) {
//   return (
//     <Box sx={{ 
//       textAlign: 'center', 
//       mb: { xs: 2, sm: 3 },
//       p: { xs: 2, sm: 3 },
//       border: '2px dashed #e0e0e0',
//       borderRadius: '12px',
//       backgroundColor: '#fafafa',
//       transition: 'all 0.2s ease'
//     }}>
//       <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
//         Image de la monture
//       </Typography>
      
//       {imagePreview && (
//         <Box sx={{ mb: 2 }}>
//           <Avatar
//             src={imagePreview}
//             sx={{ 
//               width: isMobile ? 100 : 120, 
//               height: isMobile ? 100 : 120, 
//               mx: 'auto',
//               border: '3px solid #ddd',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//             }}
//             variant="rounded"
//           />
//         </Box>
//       )}
      
//       <input
//         accept="image/*"
//         type="file"
//         id="image-upload"
//         onChange={onImageChange}
//         style={{ display: 'none' }}
//       />
//       <label htmlFor="image-upload">
//         <Button
//           variant="contained"
//           component="span"
//           startIcon={imagePreview ? <PhotoCameraIcon /> : <CloudUploadIcon />}
//           sx={{ 
//             mb: 1,
//             px: { xs: 2, sm: 3 },
//             py: { xs: 1, sm: 1.5 },
//             fontSize: { xs: '0.875rem', sm: '1rem' },
//             borderRadius: '8px'
//           }}
//           size={isMobile ? "medium" : "large"}
//         >
//           {imagePreview ? 'Changer l\'image' : 'Ajouter une image'}
//         </Button>
//       </label>
      
//       {imageFile && (
//         <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
//           📁 {imageFile.name}
//         </Typography>
//       )}
//     </Box>
//   );
// }

// function MontureForm({ monture, onClose, onSubmitSuccess, open }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
//   const [formData, setFormData] = useState(initialFormState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   useEffect(() => {
//     if (monture) {
//       setFormData({ ...initialFormState, ...monture });
//       if (monture.image) {
//         setImagePreview(getImageUrl(monture.image));
//       }
//     } else {
//       setFormData(initialFormState);
//       setErrors({});
//       setImageFile(null);
//       setImagePreview(null);
//     }
//   }, [monture, open]);

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

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       setIsSubmitting(true);
//       if (monture?.id) {
//         if (imageFile) {
//           await updateMontureWithImage(formData, imageFile);
//         } else {
//           await updateMonture(formData);
//         }
//       } else {
//         await createMonture(formData, imageFile);
//       }
//       onSubmitSuccess();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setErrors({ submit: 'Une erreur est survenue lors de l\'enregistrement' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Mobile Layout - Full Screen Modal
//   if (isMobile) {
//     return (
//       <Dialog
//         fullScreen
//         open={open}
//         onClose={onClose}
//         TransitionComponent={Transition}
//         PaperProps={{
//           sx: { backgroundColor: '#f8f9fa' }
//         }}
//       >
//         {/* Mobile App Bar */}
//         <AppBar 
//           sx={{ 
//             position: 'relative', 
//             backgroundColor: 'white', 
//             color: 'black',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//           }}
//         >
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={onClose}
//               aria-label="close"
//               disabled={isSubmitting}
//             >
//               <ArrowBackIcon />
//             </IconButton>
//             <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" fontWeight={600}>
//               {monture ? 'Modifier la monture' : 'Nouvelle monture'}
//             </Typography>
//             <Button 
//               autoFocus 
//               color="primary" 
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               variant="contained"
//               sx={{ borderRadius: '8px' }}
//             >
//               {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
//             </Button>
//           </Toolbar>
//         </AppBar>

//         {/* Mobile Content */}
//         <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
//           <form onSubmit={handleSubmit} noValidate>
            
//             {/* Image Upload */}
//             <CollapsibleSection title="Image du produit" defaultExpanded={true}>
//               <ImageUploadSection 
//                 imagePreview={imagePreview}
//                 imageFile={imageFile}
//                 onImageChange={handleImageChange}
//                 isMobile={isMobile}
//               />
//             </CollapsibleSection>

//             {/* Basic Information */}
//             <CollapsibleSection title="Informations de base" defaultExpanded={true}>
//               <Stack spacing={2}>
//                 <TextField
//                   label="Marque*"
//                   name="marque"
//                   value={formData.marque}
//                   onChange={handleChange}
//                   fullWidth
//                   error={!!errors.marque}
//                   helperText={errors.marque}
//                   required
//                   size="medium"
//                   sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
//                 />
                
//                 <TextField
//                   label="Référence*"
//                   name="reference"
//                   value={formData.reference}
//                   onChange={handleChange}
//                   fullWidth
//                   error={!!errors.reference}
//                   helperText={errors.reference}
//                   required
//                   size="medium"
//                   sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
//                 />
                
//                 <TextField
//                   label="Couleur"
//                   name="couleur"
//                   value={formData.couleur}
//                   onChange={handleChange}
//                   fullWidth
//                   size="medium"
//                   sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
//                 />
//               </Stack>
//             </CollapsibleSection>

//             {/* Product Characteristics */}
//             <CollapsibleSection title="Caractéristiques" defaultExpanded={false}>
//               <Stack spacing={2}>
//                 <FormControl fullWidth error={!!errors.forme} required>
//                   <InputLabel>Forme*</InputLabel>
//                   <Select
//                     name="forme"
//                     value={formData.forme}
//                     onChange={handleChange}
//                     label="Forme*"
//                     sx={{ borderRadius: '8px' }}
//                   >
//                     <MenuItem value=""><em>Sélectionner une forme</em></MenuItem>
//                     <MenuItem value="CARRE">Carré</MenuItem>
//                     <MenuItem value="CARPE">Carpe</MenuItem>
//                     <MenuItem value="CERCLE">Cercle</MenuItem>
//                     <MenuItem value="OVALE">Ovale</MenuItem>
//                     <MenuItem value="AVIATEUR">Aviateur</MenuItem>
//                     <MenuItem value="RECT">Rectangulaire</MenuItem>
//                     <MenuItem value="RONDE">Ronde</MenuItem>
//                     <MenuItem value="PANTOS">Pantos</MenuItem>
//                     <MenuItem value="CLUBMASTER">Clubmaster</MenuItem>
//                     <MenuItem value="WAYFARER">Wayfarer</MenuItem>
//                     <MenuItem value="PAPILLON">Papillon</MenuItem>
//                     <MenuItem value="MASQUE">Masque</MenuItem>
//                   </Select>
//                   {errors.forme && <FormHelperText>{errors.forme}</FormHelperText>}
//                 </FormControl>

//                 <FormControl fullWidth error={!!errors.genre} required>
//                   <InputLabel>Genre*</InputLabel>
//                   <Select
//                     name="genre"
//                     value={formData.genre}
//                     onChange={handleChange}
//                     label="Genre*"
//                     sx={{ borderRadius: '8px' }}
//                   >
//                     <MenuItem value=""><em>Sélectionner un genre</em></MenuItem>
//                     <MenuItem value="HOMME">Homme</MenuItem>
//                     <MenuItem value="FEMME">Femme</MenuItem>
//                     <MenuItem value="ENFANT">Enfant</MenuItem>
//                     <MenuItem value="JUNIOR">Junior</MenuItem>
//                     <MenuItem value="MIXTE">Mixte</MenuItem>
//                   </Select>
//                   {errors.genre && <FormHelperText>{errors.genre}</FormHelperText>}
//                 </FormControl>

//                 <FormControl fullWidth error={!!errors.matiere} required>
//                   <InputLabel>Matière*</InputLabel>
//                   <Select
//                     name="matiere"
//                     value={formData.matiere}
//                     onChange={handleChange}
//                     label="Matière*"
//                     sx={{ borderRadius: '8px' }}
//                   >
//                     <MenuItem value=""><em>Sélectionner une matière</em></MenuItem>
//                     <MenuItem value="METAL">Métal</MenuItem>
//                     <MenuItem value="PLASTIQUE">Plastique</MenuItem>
//                   </Select>
//                   {errors.matiere && <FormHelperText>{errors.matiere}</FormHelperText>}
//                 </FormControl>

//                 <FormControl fullWidth>
//                   <InputLabel>Type de montage</InputLabel>
//                   <Select
//                     name="typeMontage"
//                     value={formData.typeMontage}
//                     onChange={handleChange}
//                     label="Type de montage"
//                     sx={{ borderRadius: '8px' }}
//                   >
//                     <MenuItem value=""><em>Sélectionner un type</em></MenuItem>
//                     <MenuItem value="PERCE">Percé</MenuItem>
//                     <MenuItem value="NYLOR">Nylor</MenuItem>
//                     <MenuItem value="CERCLE">Cerclé</MenuItem>
//                     <MenuItem value="SOLAIRE">Solaire</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <FormControl fullWidth>
//                   <InputLabel>Gamme</InputLabel>
//                   <Select
//                     name="gamme"
//                     value={formData.gamme}
//                     onChange={handleChange}
//                     label="Gamme"
//                     sx={{ borderRadius: '8px' }}
//                   >
//                     <MenuItem value=""><em>Sélectionner une gamme</em></MenuItem>
//                     <MenuItem value="GAMME_1">Gamme 1</MenuItem>
//                     <MenuItem value="GAMME_2">Gamme 2</MenuItem>
//                     <MenuItem value="GAMME_3">Gamme 3</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Stack>
//             </CollapsibleSection>

//             {/* Pricing */}
//             <CollapsibleSection title="Prix et remises" defaultExpanded={false}>
//               <Stack spacing={2}>
//                 <TextField
//                   label="Prix d'achat (€)"
//                   name="prixAchat"
//                   type="number"
//                   step="0.01"
//                   value={formData.prixAchat}
//                   onChange={handleChange}
//                   fullWidth
//                   size="medium"
//                   sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
//                 />

//                 <TextField
//                   label="Prix de vente (€)*"
//                   name="prixVente"
//                   type="number"
//                   step="0.01"
//                   value={formData.prixVente}
//                   onChange={handleChange}
//                   error={!!errors.prixVente}
//                   helperText={errors.prixVente}
//                   fullWidth
//                   required
//                   size="medium"
//                   sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
//                 />

//                 <TextField
//                   label="Remise client (%)"
//                   name="remiseClient"
//                   type="number"
//                   step="0.01"
//                   value={formData.remiseClient}
//                   onChange={handleChange}
//                   fullWidth
//                   size="medium"
//                   sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
//                 />
//               </Stack>
//             </CollapsibleSection>

//             {/* Stock & Other */}
//             <CollapsibleSection title="Stock et détails" defaultExpanded={false}>
//               <Stack spacing={2}>
//                 <TextField
//                   label="Quantité initiale"
//                   name="quantiteInitiale"
//                   type="number"
//                   value={formData.quantiteInitiale}
//                   onChange={handleChange}
//                   fullWidth
//                   size="medium"
//                   sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
//                 />

//                 <TextField
//                   label="Numéro"
//                   name="numero"
//                   value={formData.numero}
//                   onChange={handleChange}
//                   fullWidth
//                   size="medium"
//                   sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
//                 />

//                 <TextField
//                   label="Branche"
//                   name="branche"
//                   value={formData.branche}
//                   onChange={handleChange}
//                   fullWidth
//                   size="medium"
//                   sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
//                 />
//               </Stack>
//             </CollapsibleSection>

//             {errors.submit && (
//               <Alert severity="error" sx={{ mt: 2, borderRadius: '8px' }}>
//                 {errors.submit}
//               </Alert>
//             )}
//           </form>
//         </Box>
//       </Dialog>
//     );
//   }

//   // Tablet & Desktop Layout
//   return (
//     <Dialog 
//       open={open} 
//       onClose={onClose} 
//       maxWidth={isTablet ? "md" : "lg"} 
//       fullWidth
//       PaperProps={{
//         sx: { borderRadius: '16px', maxHeight: '90vh' }
//       }}
//     >
//       <DialogTitle sx={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center',
//         pb: 1
//       }}>
//         <Typography variant="h6" fontWeight={700}>
//           {monture ? 'Modifier la monture' : 'Ajouter une nouvelle monture'}
//         </Typography>
//         <IconButton onClick={onClose} disabled={isSubmitting}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
      
//       <DialogContent sx={{ pb: 1 }}>
//         <form id="monture-form" onSubmit={handleSubmit} noValidate>
          
//           {/* Image Upload Section */}
//           <ImageUploadSection 
//             imagePreview={imagePreview}
//             imageFile={imageFile}
//             onImageChange={handleImageChange}
//             isMobile={isMobile}
//           />

//           <Divider sx={{ my: 3 }} />

//           {/* Form Fields Grid */}
//           <Grid container spacing={isTablet ? 2 : 3}>
            
//             {/* Left Column */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: 'primary.main' }}>
//                 Informations de base
//               </Typography>
              
//               <Stack spacing={2}>
//                 <TextField
//                   label="Marque*"
//                   name="marque"
//                   value={formData.marque}
//                   onChange={handleChange}
//                   fullWidth
//                   error={!!errors.marque}
//                   helperText={errors.marque}
//                   required
//                 />
                
//                 <TextField
//                   label="Référence*"
//                   name="reference"
//                   value={formData.reference}
//                   onChange={handleChange}
//                   fullWidth
//                   error={!!errors.reference}
//                   helperText={errors.reference}
//                   required
//                 />
                
//                 <TextField
//                   label="Couleur"
//                   name="couleur"
//                   value={formData.couleur}
//                   onChange={handleChange}
//                   fullWidth
//                 />

//                 <FormControl fullWidth error={!!errors.forme} required>
//                   <InputLabel>Forme*</InputLabel>
//                   <Select
//                     name="forme"
//                     value={formData.forme}
//                     onChange={handleChange}
//                     label="Forme*"
//                   >
//                     <MenuItem value=""><em>Sélectionner une forme</em></MenuItem>
//                     <MenuItem value="CARRE">Carré</MenuItem>
//                     <MenuItem value="CARPE">Carpe</MenuItem>
//                     <MenuItem value="CERCLE">Cercle</MenuItem>
//                     <MenuItem value="OVALE">Ovale</MenuItem>
//                     <MenuItem value="AVIATEUR">Aviateur</MenuItem>
//                     <MenuItem value="RECT">Rectangulaire</MenuItem>
//                     <MenuItem value="RONDE">Ronde</MenuItem>
//                     <MenuItem value="PANTOS">Pantos</MenuItem>
//                     <MenuItem value="CLUBMASTER">Clubmaster</MenuItem>
//                     <MenuItem value="WAYFARER">Wayfarer</MenuItem>
//                     <MenuItem value="PAPILLON">Papillon</MenuItem>
//                     <MenuItem value="MASQUE">Masque</MenuItem>
//                   </Select>
//                   {errors.forme && <FormHelperText>{errors.forme}</FormHelperText>}
//                 </FormControl>

//                 <FormControl fullWidth error={!!errors.genre} required>
//                   <InputLabel>Genre*</InputLabel>
//                   <Select
//                     name="genre"
//                     value={formData.genre}
//                     onChange={handleChange}
//                     label="Genre*"
//                   >
//                     <MenuItem value=""><em>Sélectionner un genre</em></MenuItem>
//                     <MenuItem value="HOMME">Homme</MenuItem>
//                     <MenuItem value="FEMME">Femme</MenuItem>
//                     <MenuItem value="ENFANT">Enfant</MenuItem>
//                     <MenuItem value="JUNIOR">Junior</MenuItem>
//                     <MenuItem value="MIXTE">Mixte</MenuItem>
//                   </Select>
//                   {errors.genre && <FormHelperText>{errors.genre}</FormHelperText>}
//                 </FormControl>
//               </Stack>
//             </Grid>

//             {/* Right Column */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: 'primary.main' }}>
//                 Spécifications & Prix
//               </Typography>
              
//               <Stack spacing={2}>
//                 <FormControl fullWidth error={!!errors.matiere} required>
//                   <InputLabel>Matière*</InputLabel>
//                   <Select
//                     name="matiere"
//                     value={formData.matiere}
//                     onChange={handleChange}
//                     label="Matière*"
//                   >
//                     <MenuItem value=""><em>Sélectionner une matière</em></MenuItem>
//                     <MenuItem value="METAL">Métal</MenuItem>
//                     <MenuItem value="PLASTIQUE">Plastique</MenuItem>
//                   </Select>
//                   {errors.matiere && <FormHelperText>{errors.matiere}</FormHelperText>}
//                 </FormControl>

//                 <FormControl fullWidth>
//                   <InputLabel>Type de montage</InputLabel>
//                   <Select
//                     name="typeMontage"
//                     value={formData.typeMontage}
//                     onChange={handleChange}
//                     label="Type de montage"
//                   >
//                     <MenuItem value=""><em>Sélectionner un type</em></MenuItem>
//                     <MenuItem value="PERCE">Percé</MenuItem>
//                     <MenuItem value="NYLOR">Nylor</MenuItem>
//                     <MenuItem value="CERCLE">Cerclé</MenuItem>
//                     <MenuItem value="SOLAIRE">Solaire</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <FormControl fullWidth>
//                   <InputLabel>Gamme</InputLabel>
//                   <Select
//                     name="gamme"
//                     value={formData.gamme}
//                     onChange={handleChange}
//                     label="Gamme"
//                   >
//                     <MenuItem value=""><em>Sélectionner une gamme</em></MenuItem>
//                     <MenuItem value="GAMME_1">Gamme 1</MenuItem>
//                     <MenuItem value="GAMME_2">Gamme 2</MenuItem>
//                     <MenuItem value="GAMME_3">Gamme 3</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <TextField
//                   label="Prix d'achat (€)"
//                   name="prixAchat"
//                   type="number"
//                   step="0.01"
//                   value={formData.prixAchat}
//                   onChange={handleChange}
//                   fullWidth
//                 />

//                 <TextField
//                   label="Prix de vente (€)*"
//                   name="prixVente"
//                   type="number"
//                   step="0.01"
//                   value={formData.prixVente}
//                   onChange={handleChange}
//                   error={!!errors.prixVente}
//                   helperText={errors.prixVente}
//                   fullWidth
//                   required
//                 />
//               </Stack>
//             </Grid>

//             {/* Bottom Row - Additional Fields */}
//             <Grid item xs={12}>
//               <Divider sx={{ my: 2 }} />
//               <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2, color: 'primary.main' }}>
//                 Stock et détails supplémentaires
//               </Typography>
              
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField
//                     label="Remise client (%)"
//                     name="remiseClient"
//                     type="number"
//                     step="0.01"
//                     value={formData.remiseClient}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField
//                     label="Quantité initiale"
//                     name="quantiteInitiale"
//                     type="number"
//                     value={formData.quantiteInitiale}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField
//                     label="Numéro"
//                     name="numero"
//                     value={formData.numero}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField
//                     label="Branche"
//                     name="branche"
//                     value={formData.branche}
//                     onChange={handleChange}
//                     fullWidth
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>

//           {errors.submit && (
//             <Alert severity="error" sx={{ mt: 3 }}>
//               {errors.submit}
//             </Alert>
//           )}
//         </form>
//       </DialogContent>
      
//       <DialogActions sx={{ p: 3, pt: 1 }}>
//         <Button onClick={onClose} disabled={isSubmitting} size="large">
//           Annuler
//         </Button>
//         <Button
//           type="submit"
//           form="monture-form"
//           variant="contained"
//           disabled={isSubmitting}
//           size="large"
//           sx={{ borderRadius: '8px', px: 4 }}
//         >
//           {isSubmitting ? 'Enregistrement...' : (monture ? 'Modifier' : 'Ajouter')}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default MontureForm;




// // // src/components/MontureForm.jsx
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
// //   Select,
// //   Box,
// //   Typography,
// //   Avatar,
// //   Alert
// // } from '@mui/material';
// // import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// // import { createMonture, updateMonture, getImageUrl } from '../../../api/montureApi';

// // const initialFormState = {
// //   typeProduit: 'MONTURE',
// //   marque: '',
// //   reference: '',
// //   couleur: '',
// //   branche: '',
// //   forme: '',
// //   genre: '',
// //   matiere: '',
// //   typeMontage: '',
// //   gamme: '',
// //   quantiteInitiale: 0,
// //   numero: '',
// //   prixAchat: 0,
// //   prixVente: 0,
// //   remiseClient: 0,
// //   nature: 'Optique',
// //   image: ''
// // };

// // function MontureForm({ monture, onClose, onSubmitSuccess, open }) {
// //   const [formData, setFormData] = useState(initialFormState);
// //   const [errors, setErrors] = useState({});
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [imageFile, setImageFile] = useState(null);
// //   const [imagePreview, setImagePreview] = useState(null);

// //   useEffect(() => {
// //     if (monture) {
// //       setFormData({ ...initialFormState, ...monture });
// //       // Set image preview if monture has an image
// //       if (monture.image) {
// //         setImagePreview(getImageUrl(monture.image));
// //       }
// //     } else {
// //       setFormData(initialFormState);
// //       setErrors({});
// //       setImageFile(null);
// //       setImagePreview(null);
// //     }
// //   }, [monture, open]);

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.marque) newErrors.marque = "La marque est requise";
// //     if (!formData.reference) newErrors.reference = "La référence est requise";
// //     if (!formData.forme) newErrors.forme = "La forme est requise";
// //     if (!formData.genre) newErrors.genre = "Le genre est requis";
// //     if (!formData.matiere) newErrors.matiere = "La matière est requise";
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

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setImageFile(file);
// //       // Create preview
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     try {
// //       setIsSubmitting(true);
// //       if (monture?.id) {
// //         // For updates, use the regular JSON endpoint for now
// //         await updateMonture(formData);
// //       } else {
// //         // For new montures, use the image upload endpoint
// //         await createMonture(formData, imageFile);
// //       }
// //       onSubmitSuccess();
// //     } catch (error) {
// //       console.error('Error submitting form:', error);
// //       setErrors({ submit: 'Une erreur est survenue lors de l\'enregistrement' });
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
// //       <DialogTitle>{monture ? 'Modifier la monture' : 'Ajouter une nouvelle monture'}</DialogTitle>
// //       <DialogContent>
// //         <form id="monture-form" onSubmit={handleSubmit} noValidate>
          
// //           {/* Image Upload Section */}
// //           <Box sx={{ mb: 3, textAlign: 'center' }}>
// //             <Typography variant="subtitle2" sx={{ mb: 2 }}>
// //               Image de la monture
// //             </Typography>
            
// //             {imagePreview && (
// //               <Box sx={{ mb: 2 }}>
// //                 <Avatar
// //                   src={imagePreview}
// //                   sx={{ 
// //                     width: 120, 
// //                     height: 120, 
// //                     mx: 'auto',
// //                     border: '2px solid #ddd'
// //                   }}
// //                   variant="rounded"
// //                 />
// //               </Box>
// //             )}
            
// //             <input
// //               accept="image/*"
// //               type="file"
// //               id="image-upload"
// //               onChange={handleImageChange}
// //               style={{ display: 'none' }}
// //             />
// //             <label htmlFor="image-upload">
// //               <Button
// //                 variant="outlined"
// //                 component="span"
// //                 startIcon={<CloudUploadIcon />}
// //                 sx={{ mb: 1 }}
// //               >
// //                 {imagePreview ? 'Changer l\'image' : 'Ajouter une image'}
// //               </Button>
// //             </label>
            
// //             {imageFile && (
// //               <Typography variant="caption" display="block" color="text.secondary">
// //                 Fichier sélectionné: {imageFile.name}
// //               </Typography>
// //             )}
// //           </Box>

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

// //           <FormControl
// //             margin="dense"
// //             fullWidth
// //             error={!!errors.forme}
// //             required
// //           >
// //             <InputLabel>Forme*</InputLabel>
// //             <Select
// //               name="forme"
// //               value={formData.forme}
// //               onChange={handleChange}
// //               label="Forme*"
// //             >
// //               <MenuItem value=""><em>Sélectionner une forme</em></MenuItem>
// //               <MenuItem value="CARRE">Carré</MenuItem>
// //               <MenuItem value="CARPE">Carpe</MenuItem>
// //               <MenuItem value="CERCLE">Cercle</MenuItem>
// //               <MenuItem value="OVALE">Ovale</MenuItem>
// //               <MenuItem value="AVIATEUR">Aviateur</MenuItem>
// //               <MenuItem value="RECT">Rectangulaire</MenuItem>
// //               <MenuItem value="RONDE">Ronde</MenuItem>
// //               <MenuItem value="PANTOS">Pantos</MenuItem>
// //               <MenuItem value="CLUBMASTER">Clubmaster</MenuItem>
// //               <MenuItem value="WAYFARER">Wayfarer</MenuItem>
// //               <MenuItem value="PAPILLON">Papillon</MenuItem>
// //               <MenuItem value="MASQUE">Masque</MenuItem>
// //             </Select>
// //             {errors.forme && <FormHelperText>{errors.forme}</FormHelperText>}
// //           </FormControl>

// //           <FormControl
// //             margin="dense"
// //             fullWidth
// //           >
// //             <InputLabel>Gamme</InputLabel>
// //             <Select
// //               name="gamme"
// //               value={formData.gamme}
// //               onChange={handleChange}
// //               label="Gamme"
// //             >
// //               <MenuItem value=""><em>Sélectionner une gamme</em></MenuItem>
// //               <MenuItem value="GAMME_1">Gamme 1</MenuItem>
// //               <MenuItem value="GAMME_2">Gamme 2</MenuItem>
// //               <MenuItem value="GAMME_3">Gamme 3</MenuItem>
// //             </Select>
// //           </FormControl>

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

// //           <FormControl
// //             margin="dense"
// //             fullWidth
// //             error={!!errors.matiere}
// //             required
// //           >
// //             <InputLabel>Matière*</InputLabel>
// //             <Select
// //               name="matiere"
// //               value={formData.matiere}
// //               onChange={handleChange}
// //               label="Matière*"
// //             >
// //               <MenuItem value=""><em>Sélectionner une matière</em></MenuItem>
// //               <MenuItem value="METAL">Métal</MenuItem>
// //               <MenuItem value="PLASTIQUE">Plastique</MenuItem>
// //             </Select>
// //             {errors.matiere && <FormHelperText>{errors.matiere}</FormHelperText>}
// //           </FormControl>

// //           <FormControl margin="dense" fullWidth>
// //             <InputLabel>Type de montage</InputLabel>
// //             <Select
// //               name="typeMontage"
// //               value={formData.typeMontage}
// //               onChange={handleChange}
// //               label="Type de montage"
// //             >
// //               <MenuItem value=""><em>Sélectionner un type</em></MenuItem>
// //               <MenuItem value="PERCE">Percé</MenuItem>
// //               <MenuItem value="NYLOR">Nylor</MenuItem>
// //               <MenuItem value="CERCLE">Cerclé</MenuItem>
// //               <MenuItem value="SOLAIRE">Solaire</MenuItem>
// //             </Select>
// //           </FormControl>

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
// //             label="Branche"
// //             name="branche"
// //             value={formData.branche}
// //             onChange={handleChange}
// //             fullWidth
// //           />

// //           {errors.submit && (
// //             <Alert severity="error" sx={{ mt: 2 }}>
// //               {errors.submit}
// //             </Alert>
// //           )}
// //         </form>
// //       </DialogContent>
// //       <DialogActions>
// //         <Button onClick={onClose} disabled={isSubmitting}>
// //           Annuler
// //         </Button>
// //         <Button
// //           type="submit"
// //           form="monture-form"
// //           variant="contained"
// //           disabled={isSubmitting}
// //         >
// //           {isSubmitting ? 'Enregistrement...' : (monture ? 'Modifier' : 'Ajouter')}
// //         </Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // }

// // export default MontureForm;

// // // // src/components/MontureForm.jsx
// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   Button,
// // //   TextField,
// // //   MenuItem,
// // //   FormHelperText,
// // //   FormControl,
// // //   InputLabel,
// // //   Select
// // // } from '@mui/material';
// // // // import { createMonture, updateMonture } from '../api/montureApi';
// // // import { createMonture} from '../../../api/montureApi';
// // // import { updateMonture } from '../../../api/montureApi';

// // // const initialFormState = {
// // //   typeProduit: 'MONTURE',
// // //   marque: '',
// // //   reference: '',
// // //   couleur: '',
// // //   branche: '',
// // //   forme: '',
// // //   genre: '',
// // //   matiere: '',
// // //   typeMontage: '',
// // //   gamme: '',
// // //   quantiteInitiale: 0,
// // //   numero: '',
// // //   prixAchat: 0,
// // //   prixVente: 0,
// // //   remiseClient: 0,
// // //   nature: 'Optique',
// // //   image: ''
// // // };

// // // function MontureForm({ monture, onClose, onSubmitSuccess, open }) {
// // //   const [formData, setFormData] = useState(initialFormState);
// // //   const [errors, setErrors] = useState({});
// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   useEffect(() => {
// // //     if (monture) {
// // //       setFormData({ ...initialFormState, ...monture });
// // //     } else {
// // //       setFormData(initialFormState);
// // //       setErrors({});
// // //     }
// // //   }, [monture, open]);

// // //   const validateForm = () => {
// // //     const newErrors = {};
// // //     if (!formData.marque) newErrors.marque = "La marque est requise";
// // //     if (!formData.reference) newErrors.reference = "La référence est requise";
// // //     if (!formData.forme) newErrors.forme = "La forme est requise";
// // //     if (!formData.genre) newErrors.genre = "Le genre est requis";
// // //     if (!formData.matiere) newErrors.matiere = "La matière est requise";
// // //     if (!formData.prixVente || formData.prixVente <= 0) 
// // //       newErrors.prixVente = "Le prix de vente doit être supérieur à 0";
// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleChange = (e) => {
// // //     const { name, value, type } = e.target;
// // //     setFormData({
// // //       ...formData,
// // //       [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value,
// // //     });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!validateForm()) return;

// // //     try {
// // //       setIsSubmitting(true);
// // //       if (monture?.id) {
// // //         await updateMonture(formData);
// // //       } else {
// // //         await createMonture(formData);
// // //       }
// // //       onSubmitSuccess();
// // //     } catch (error) {
// // //       setErrors({ submit: 'Une erreur est survenue lors de l\'enregistrement' });
// // //     } finally {
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   return (
// // //     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
// // //       <DialogTitle>{monture ? 'Modifier la monture' : 'Ajouter une nouvelle monture'}</DialogTitle>
// // //       <DialogContent>
// // //         <form id="monture-form" onSubmit={handleSubmit} noValidate>
// // //           <TextField
// // //             margin="dense"
// // //             label="Marque*"
// // //             name="marque"
// // //             value={formData.marque}
// // //             onChange={handleChange}
// // //             fullWidth
// // //             error={!!errors.marque}
// // //             helperText={errors.marque}
// // //             required
// // //           />
// // //           <TextField
// // //             margin="dense"
// // //             label="Référence*"
// // //             name="reference"
// // //             value={formData.reference}
// // //             onChange={handleChange}
// // //             fullWidth
// // //             error={!!errors.reference}
// // //             helperText={errors.reference}
// // //             required
// // //           />
// // //           <TextField
// // //             margin="dense"
// // //             label="Couleur"
// // //             name="couleur"
// // //             value={formData.couleur}
// // //             onChange={handleChange}
// // //             fullWidth
// // //           />

// // //           <FormControl
// // //             margin="dense"
// // //             fullWidth
// // //             error={!!errors.forme}
// // //             required
// // //           >
// // //             <InputLabel>Forme*</InputLabel>
// // //             <Select
// // //               name="forme"
// // //               value={formData.forme}
// // //               onChange={handleChange}
// // //               label="Forme*"
// // //             >
// // //               <MenuItem value=""><em>Sélectionner une forme</em></MenuItem>
// // //               <MenuItem value="CARRE">Carré</MenuItem>
// // //               <MenuItem value="CARPE">Carpe</MenuItem>
// // //               <MenuItem value="CERCLE">Cercle</MenuItem>
// // //               <MenuItem value="OVALE">Ovale</MenuItem>
// // //               <MenuItem value="AVIATEUR">Aviateur</MenuItem>
// // //               <MenuItem value="RECT">Rectangulaire</MenuItem>
// // //               <MenuItem value="RONDE">Ronde</MenuItem>
// // //               <MenuItem value="PANTOS">Pantos</MenuItem>
// // //               <MenuItem value="CLUBMASTER">Clubmaster</MenuItem>
// // //               <MenuItem value="WAYFARER">Wayfarer</MenuItem>
// // //               <MenuItem value="PAPILLON">Papillon</MenuItem>
// // //               <MenuItem value="MASQUE">Masque</MenuItem>
// // //             </Select>
// // //             {errors.forme && <FormHelperText>{errors.forme}</FormHelperText>}
// // //           </FormControl>

// // //           <FormControl
// // //             margin="dense"
// // //             fullWidth
// // //           >
// // //             <InputLabel>Gamme</InputLabel>
// // //             <Select
// // //               name="gamme"
// // //               value={formData.gamme}
// // //               onChange={handleChange}
// // //               label="Gamme"
// // //             >
// // //               <MenuItem value=""><em>Sélectionner une gamme</em></MenuItem>
// // //               <MenuItem value="GAMME_1">gamme_1</MenuItem>
// // //               <MenuItem value="GAMME_2">gamme_2</MenuItem>
// // //               <MenuItem value="GAMME_3">gamme_3</MenuItem>
// // //             </Select>
// // //           </FormControl>

// // //           <FormControl
// // //             margin="dense"
// // //             fullWidth
// // //             error={!!errors.genre}
// // //             required
// // //           >
// // //             <InputLabel>Genre*</InputLabel>
// // //             <Select
// // //               name="genre"
// // //               value={formData.genre}
// // //               onChange={handleChange}
// // //               label="Genre*"
// // //             >
// // //               <MenuItem value=""><em>Sélectionner un genre</em></MenuItem>
// // //               <MenuItem value="HOMME">Homme</MenuItem>
// // //               <MenuItem value="FEMME">Femme</MenuItem>
// // //               <MenuItem value="ENFANT">Enfant</MenuItem>
// // //               <MenuItem value="JUNIOR">Junior</MenuItem>
// // //               <MenuItem value="MIXTE">Mixte</MenuItem>
// // //             </Select>
// // //             {errors.genre && <FormHelperText>{errors.genre}</FormHelperText>}
// // //           </FormControl>

// // //           <FormControl
// // //             margin="dense"
// // //             fullWidth
// // //             error={!!errors.matiere}
// // //             required
// // //           >
// // //             <InputLabel>Matière*</InputLabel>
// // //             <Select
// // //               name="matiere"
// // //               value={formData.matiere}
// // //               onChange={handleChange}
// // //               label="Matière*"
// // //             >
// // //               <MenuItem value=""><em>Sélectionner une matière</em></MenuItem>
// // //               <MenuItem value="METAL">Métal</MenuItem>
// // //               <MenuItem value="PLASTIQUE">Plastique</MenuItem>
// // //             </Select>
// // //             {errors.matiere && <FormHelperText>{errors.matiere}</FormHelperText>}
// // //           </FormControl>

// // //           <FormControl margin="dense" fullWidth>
// // //             <InputLabel>Type de montage</InputLabel>
// // //             <Select
// // //               name="typeMontage"
// // //               value={formData.typeMontage}
// // //               onChange={handleChange}
// // //               label="Type de montage"
// // //             >
// // //               <MenuItem value=""><em>Sélectionner un type</em></MenuItem>
// // //               <MenuItem value="PERCE">Percé</MenuItem>
// // //               <MenuItem value="NYLOR">Nylor</MenuItem>
// // //               <MenuItem value="CERCLE">Cerclé</MenuItem>
// // //               <MenuItem value="SOLAIRE">Solaire</MenuItem>
// // //             </Select>
// // //           </FormControl>

// // //           <TextField
// // //             margin="dense"
// // //             label="Prix d'achat (€)"
// // //             name="prixAchat"
// // //             type="number"
// // //             step="0.01"
// // //             value={formData.prixAchat}
// // //             onChange={handleChange}
// // //             fullWidth
// // //           />

// // //           <TextField
// // //             margin="dense"
// // //             label="Prix de vente (€)*"
// // //             name="prixVente"
// // //             type="number"
// // //             step="0.01"
// // //             value={formData.prixVente}
// // //             onChange={handleChange}
// // //             error={!!errors.prixVente}
// // //             helperText={errors.prixVente}
// // //             fullWidth
// // //             required
// // //           />

// // //           <TextField
// // //             margin="dense"
// // //             label="Remise client (%)"
// // //             name="remiseClient"
// // //             type="number"
// // //             step="0.01"
// // //             value={formData.remiseClient}
// // //             onChange={handleChange}
// // //             fullWidth
// // //           />

// // //           <TextField
// // //             margin="dense"
// // //             label="Quantité initiale"
// // //             name="quantiteInitiale"
// // //             type="number"
// // //             value={formData.quantiteInitiale}
// // //             onChange={handleChange}
// // //             fullWidth
// // //           />

// // //           <TextField
// // //             margin="dense"
// // //             label="Numéro"
// // //             name="numero"
// // //             value={formData.numero}
// // //             onChange={handleChange}
// // //             fullWidth
// // //           />

// // //           <TextField
// // //             margin="dense"
// // //             label="Branche"
// // //             name="branche"
// // //             value={formData.branche}
// // //             onChange={handleChange}
// // //             fullWidth
// // //           />

// // //           {/* You can add file upload or image URL input for 'image' if needed */}

// // //           {errors.submit && (
// // //             <p style={{ color: 'red' }}>{errors.submit}</p>
// // //           )}
// // //         </form>
// // //       </DialogContent>
// // //       <DialogActions>
// // //         <Button onClick={onClose} disabled={isSubmitting}>
// // //           Annuler
// // //         </Button>
// // //         <Button
// // //           type="submit"
// // //           form="monture-form"
// // //           variant="contained"
// // //           disabled={isSubmitting}
// // //         >
// // //           {monture ? 'Modifier' : 'Ajouter'}
// // //         </Button>
// // //       </DialogActions>
// // //     </Dialog>
// // //   );
// // // }

// // // export default MontureForm;


// // // // // src/components/MontureForm.jsx
// // // // import React, { useState, useEffect } from 'react';
// // // // import { createMonture, updateMonture } from '../api/montureApi';
// // // // // import './MontureForm.css';

// // // // const initialFormState = {
// // // //   typeProduit: 'MONTURE',
// // // //   marque: '',
// // // //   reference: '',
// // // //   couleur: '',
// // // //   branche: '',
// // // //   forme: '',
// // // //   genre: '',
// // // //   matiere: '',
// // // //   typeMontage: '',
// // // //   gamme: '',
// // // //   quantiteInitiale: 0,
// // // //   numero: '',
// // // //   prixAchat: 0,
// // // //   prixVente: 0,
// // // //   remiseClient: 0,
// // // //   nature: 'Optique',
// // // //   image: ''
// // // // };


// // // // function MontureForm({ monture, onClose, onSubmitSuccess }) {
// // // //   const [formData, setFormData] = useState(initialFormState);
// // // //   const [errors, setErrors] = useState({});
// // // //   const [isSubmitting, setIsSubmitting] = useState(false);
  
// // // //   useEffect(() => {
// // // //     if (monture) {
// // // //       setFormData({
// // // //         ...initialFormState,
// // // //         ...monture
// // // //       });
// // // //     }
// // // //   }, [monture]);

// // // //   const validateForm = () => {
// // // //     const newErrors = {};
    
// // // //     if (!formData.marque) newErrors.marque = "La marque est requise";
// // // //     if (!formData.reference) newErrors.reference = "La référence est requise";
// // // //     if (!formData.forme) newErrors.forme = "La forme est requise";
// // // //     if (!formData.genre) newErrors.genre = "Le genre est requis";
// // // //     if (!formData.matiere) newErrors.matiere = "La matière est requise";
// // // //     if (!formData.prixVente || formData.prixVente <= 0) 
// // // //       newErrors.prixVente = "Le prix de vente doit être supérieur à 0";
    
// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   // const handleChange = (e) => {
// // // //   //   const { name, value, type } = e.target;
    
// // // //   //   setFormData({
// // // //   //     ...formData,
// // // //   //     [name]: type === 'number' ? parseFloat(value) : value
// // // //   //   });
// // // //   // };

// // // //   const handleChange = (e) => {
// // // //   const { name, value, type } = e.target;

// // // //   setFormData({
// // // //     ...formData,
// // // //     [name]: type === 'number' 
// // // //       ? (value === '' ? '' : parseFloat(value))  // keep empty string if blank
// // // //       : value
// // // //     });
// // // //   };

// // // //   // const handleSubmit = async (e) => {
// // // //   //   e.preventDefault();
    
// // // //   //   if (!validateForm()) return;
    
// // // //   //   try {
// // // //   //     setIsSubmitting(true);
      
// // // //   //     if (monture?.id) {
// // // //   //       await updateMonture(formData);
// // // //   //     } else {
// // // //   //       await createMonture(formData);
// // // //   //     }
      
// // // //   //     onSubmitSuccess();
// // // //   //   } catch (error) {
// // // //   //     console.error('Error submitting form:', error);
// // // //   //     setErrors({ submit: 'Une erreur est survenue lors de l\'enregistrement' });
// // // //   //   } finally {
// // // //   //     setIsSubmitting(false);
// // // //   //   }
// // // //   // };

// // // //   const handleSubmit = async (e) => {
// // // //   e.preventDefault();
  
// // // //   if (!validateForm()) return;

// // // //   console.log('Submitting form data:', formData);
// // // //   console.log('Is update?', monture?.id);

// // // //   try {
// // // //     setIsSubmitting(true);
    
// // // //     if (monture?.id) {
// // // //       const updated = await updateMonture(formData);
// // // //       console.log('Updated monture:', updated);
// // // //     } else {
// // // //       const created = await createMonture(formData);
// // // //       console.log('Created monture:', created);
// // // //     }
    
// // // //     onSubmitSuccess();
// // // //   } catch (error) {
// // // //     console.error('Error submitting form:', error);
// // // //     setErrors({ submit: 'Une erreur est survenue lors de l\'enregistrement' });
// // // //   } finally {
// // // //     setIsSubmitting(false);
// // // //   }
// // // // };

// // // //   return (
// // // //     <div className="form-container">
// // // //       <div className="form-header">
// // // //         <h2>{monture ? 'Modifier la monture' : 'Ajouter une nouvelle monture'}</h2>
// // // //         <button className="close-btn" onClick={onClose}>×</button>
// // // //       </div>
      
// // // //       <form onSubmit={handleSubmit}>
// // // //         <div className="form-grid">
// // // //           <div className="form-group">
// // // //             <label htmlFor="marque">Marque*</label>
// // // //             <input
// // // //               type="text"
// // // //               id="marque"
// // // //               name="marque"
// // // //               value={formData.marque}
// // // //               onChange={handleChange}
// // // //               className={errors.marque ? 'error' : ''}
// // // //             />
// // // //             {errors.marque && <span className="error-message">{errors.marque}</span>}
// // // //           </div>
          
// // // //           <div className="form-group">
// // // //             <label htmlFor="reference">Référence*</label>
// // // //             <input
// // // //               type="text"
// // // //               id="reference"
// // // //               name="reference"
// // // //               value={formData.reference}
// // // //               onChange={handleChange}
// // // //               className={errors.reference ? 'error' : ''}
// // // //             />
// // // //             {errors.reference && <span className="error-message">{errors.reference}</span>}
// // // //           </div>
          
// // // //           <div className="form-group">
// // // //             <label htmlFor="couleur">Couleur</label>
// // // //             <input
// // // //               type="text"
// // // //               id="couleur"
// // // //               name="couleur"
// // // //               value={formData.couleur}
// // // //               onChange={handleChange}
// // // //             />
// // // //           </div>
          
// // // //           <div className="form-group">
// // // //             <label htmlFor="forme">Forme*</label>
// // // //             <select
// // // //               id="forme"
// // // //               name="forme"
// // // //               value={formData.forme}
// // // //               onChange={handleChange}
// // // //               className={errors.forme ? 'error' : ''}
// // // //             >
// // // //               <option value="">Sélectionner une forme</option>
// // // //               <option value="CARRE">Carré</option>
// // // //               <option value="CARPE">Carpe</option>
// // // //               <option value="CERCLE">Cercle</option>
// // // //               <option value="OVALE">Ovale</option>
// // // //               <option value="AVIATEUR">Aviateur</option>
// // // //               <option value="RECT">Rectangulaire</option>
// // // //               <option value="RONDE">Ronde</option>
// // // //               <option value="PANTOS">Pantos</option>
// // // //               <option value="CLUBMASTER">Clubmaster</option>
// // // //               <option value="WAYFARER">Wayfarer</option>
// // // //               <option value="PAPILLON">Papillon</option>
// // // //               <option value="MASQUE">Masque</option>
// // // //             </select>
// // // //             {errors.forme && <span className="error-message">{errors.forme}</span>}
// // // //           </div>

// // // //                     <div className="form-group">
// // // //             <label htmlFor="gamme">Gamme*</label>
// // // //             <select
// // // //               id="gamme"
// // // //               name="gamme"
// // // //               value={formData.gamme}
// // // //               onChange={handleChange}
// // // //               className={errors.forme ? 'error' : ''}
// // // //             >
// // // //               <option value="gamme">Sélectionner une gamme</option>
// // // //               <option value="GAMME_1">gamme_1</option>
// // // //               <option value="GAMME_2">gamme_2</option>
// // // //               <option value="GAMME_3">gamme_3</option>
              
// // // //             </select>
// // // //             {errors.forme && <span className="error-message">{errors.forme}</span>}
// // // //           </div>
          
// // // //           <div className="form-group">
// // // //             <label htmlFor="genre">Genre*</label>
// // // //             <select
// // // //               id="genre"
// // // //               name="genre"
// // // //               value={formData.genre}
// // // //               onChange={handleChange}
// // // //               className={errors.genre ? 'error' : ''}
// // // //             >
// // // //               <option value="">Sélectionner un genre</option>
// // // //               <option value="HOMME">Homme</option>
// // // //               <option value="FEMME">Femme</option>
// // // //               <option value="ENFANT">Enfant</option>
// // // //               <option value="JUNIOR">Junior</option>
// // // //               <option value="MIXTE">Mixte</option>
// // // //             </select>
// // // //             {errors.genre && <span className="error-message">{errors.genre}</span>}
// // // //           </div>
          
// // // //           <div className="form-group">
// // // //             <label htmlFor="matiere">Matière*</label>
// // // //             <select
// // // //               id="matiere"
// // // //               name="matiere"
// // // //               value={formData.matiere}
// // // //               onChange={handleChange}
// // // //               className={errors.matiere ? 'error' : ''}
// // // //             >
// // // //               <option value="">Sélectionner une matière</option>
// // // //               <option value="METAL">Métal</option>
// // // //               <option value="PLASTIQUE">Plastique</option>
// // // //             </select>
// // // //             {errors.matiere && <span className="error-message">{errors.matiere}</span>}
// // // //           </div>
          
// // // //           <div className="form-group">
// // // //             <label htmlFor="typeMontage">Type de montage</label>
// // // //             <select
// // // //               id="typeMontage"
// // // //               name="typeMontage"
// // // //               value={formData.typeMontage}
// // // //               onChange={handleChange}
// // // //             >
// // // //               <option value="">Sélectionner un type</option>
// // // //               <option value="PERCE">Percé</option>
// // // //               <option value="NYLOR">Nylor</option>
// // // //               <option value="CERCLE">Cerclé</option>
// // // //               <option value="SOLAIRE">Solaire</option>
// // // //             </select>
// // // //           </div>
          
// // // //           <div className="form-group">
// // // //             <label htmlFor="prixAchat">Prix d'achat (€)</label>
// // // //             <input
// // // //               type="number"
// // // //               id="prixAchat"
// // // //               name="prixAchat"
// // // //               step="0.01"
// // // //               value={formData.prixAchat}
// // // //               onChange={handleChange}
// // // //             />
// // // //           </div>
          
// // // //           <div className="form-group">
// // // //             <label htmlFor="prixVente">Prix de vente (€)*</label>
// // // //             <input
// // // //               type="number"
// // // //               id="prixVente"
// // // //               name="prixVente"
// // // //               step="0.01"
// // // //               value={formData.prixVente}
// // // //               onChange={handleChange}
// // // //               className={errors.prixVente ? 'error' : ''}
// // // //             />
// // // //             {errors.prixVente && <span className="error-message">{errors.prixVente}</span>}
// // // //           </div>
          
// // // //           <div className="form-group">
// // // //             <label htmlFor="quantiteInitiale">Quantité</label>
// // // //             <input
// // // //               type="number"
// // // //               id="quantiteInitiale"
// // // //               name="quantiteInitiale"
// // // //               value={formData.quantiteInitiale}
// // // //               onChange={handleChange}
// // // //             />
// // // //           </div>
// // // //         </div>
        
// // // //         {errors.submit && <div className="error-global">{errors.submit}</div>}
        
// // // //         <div className="form-actions">
// // // //           <button type="button" className="btn-cancel" onClick={onClose}>
// // // //             Annuler
// // // //           </button>
// // // //           <button type="submit" className="btn-save" disabled={isSubmitting}>
// // // //             {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
// // // //           </button>
// // // //         </div>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default MontureForm;