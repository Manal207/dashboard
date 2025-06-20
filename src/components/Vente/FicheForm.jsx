// src/components/Vente/FicheForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Chip,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import ProductSelector from './ProductSelector';

const initialFicheState = {
  montureId: null,
  montureNom: '',
  prixMonture: 0,
  verreODId: null,
  verreODNom: '',
  prixVerreOD: 0,
  verreOGId: null,
  verreOGNom: '',
  prixVerreOG: 0,
  mesuresOD: {
    sph: '',
    cyl: '',
    axe: ''
  },
  mesuresOG: {
    sph: '',
    cyl: '',
    axe: ''
  },
  accessoires: [],
  totalFiche: 0
};

function FicheForm({ onAddFiche, editMode = false, initialData = null }) {
  const [ficheData, setFicheData] = useState(
    editMode && initialData ? initialData : initialFicheState
  );
  const [errors, setErrors] = useState({});
  const [showProductSelector, setShowProductSelector] = useState(false);
  const [selectorType, setSelectorType] = useState('');

  // ✅ useEffect to recalculate total when any price changes
  useEffect(() => {
    const total = 
      (ficheData.prixMonture || 0) +
      (ficheData.prixVerreOD || 0) +
      (ficheData.prixVerreOG || 0) +
      ficheData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
    // Only update if total is different to avoid infinite loops
    if (total !== ficheData.totalFiche) {
      setFicheData(prev => ({
        ...prev,
        totalFiche: total
      }));
    }
  }, [ficheData.prixMonture, ficheData.prixVerreOD, ficheData.prixVerreOG, ficheData.accessoires]);

  // ✅ Fixed handleProductSelect function
  const handleProductSelect = (product, type, customPrice = null) => {
    let updatedFicheData = { ...ficheData };
    
    switch (type) {
      case 'monture':
        updatedFicheData = {
          ...updatedFicheData,
          montureId: product.id,
          montureNom: `${product.marque} ${product.reference}`,
          prixMonture: customPrice || product.prixVente
        };
        break;
      case 'verreOD':
        updatedFicheData = {
          ...updatedFicheData,
          verreODId: product.id,
          verreODNom: product.nom,
          prixVerreOD: customPrice || product.prixVente
        };
        break;
      case 'verreOG':
        updatedFicheData = {
          ...updatedFicheData,
          verreOGId: product.id,
          verreOGNom: product.nom,
          prixVerreOG: customPrice || product.prixVente
        };
        break;
      case 'accessoire':
        if (updatedFicheData.accessoires.length < 3) {
          const newAccessoire = {
            accessoireId: product.id,
            accessoireNom: product.nom,
            accessoireReference: product.reference,
            prixAccessoire: customPrice || product.prixVente,
            ordre: updatedFicheData.accessoires.length + 1
          };
          updatedFicheData = {
            ...updatedFicheData,
            accessoires: [...updatedFicheData.accessoires, newAccessoire]
          };
        }
        break;
    }
    
    // Calculate total immediately
    const total = 
      (updatedFicheData.prixMonture || 0) +
      (updatedFicheData.prixVerreOD || 0) +
      (updatedFicheData.prixVerreOG || 0) +
      updatedFicheData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
    updatedFicheData.totalFiche = total;
    
    // Update state once with all changes
    setFicheData(updatedFicheData);
    setShowProductSelector(false);
    
    console.log('DEBUG - Product added, new total:', total);
  };

  const handleMesuresChange = (oeil, field, value) => {
    setFicheData(prev => ({
      ...prev,
      [`mesures${oeil}`]: {
        ...prev[`mesures${oeil}`],
        [field]: value
      }
    }));
  };

  // ✅ Fixed handlePriceChange function
  const handlePriceChange = (field, value) => {
    const updatedData = {
      ...ficheData,
      [field]: parseFloat(value) || 0
    };
    
    // Recalculate total immediately
    const total = 
      (updatedData.prixMonture || 0) +
      (updatedData.prixVerreOD || 0) +
      (updatedData.prixVerreOG || 0) +
      updatedData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
    updatedData.totalFiche = total;
    
    setFicheData(updatedData);
  };

  // ✅ Fixed removeAccessoire function
  const removeAccessoire = (index) => {
    const updatedAccessoires = ficheData.accessoires.filter((_, i) => i !== index);
    
    const total = 
      (ficheData.prixMonture || 0) +
      (ficheData.prixVerreOD || 0) +
      (ficheData.prixVerreOG || 0) +
      updatedAccessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
    setFicheData(prev => ({
      ...prev,
      accessoires: updatedAccessoires,
      totalFiche: total
    }));
    
    console.log('DEBUG - Accessoire removed, new total:', total);
  };

  const validateFiche = () => {
    const newErrors = {};
    
    if (!ficheData.montureId) newErrors.monture = "Sélectionnez une monture";
    if (!ficheData.verreODId) newErrors.verreOD = "Sélectionnez un verre pour l'œil droit";
    if (!ficheData.verreOGId) newErrors.verreOG = "Sélectionnez un verre pour l'œil gauche";
    
    // Validation des mesures
    if (!ficheData.mesuresOD.sph && ficheData.mesuresOD.sph !== 0) {
      newErrors.mesuresOD = "Renseignez les mesures de l'œil droit";
    }
    if (!ficheData.mesuresOG.sph && ficheData.mesuresOG.sph !== 0) {
      newErrors.mesuresOG = "Renseignez les mesures de l'œil gauche";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFiche()) {
      onAddFiche(ficheData);
      setFicheData(initialFicheState);
      setErrors({});
    }
  };

  const openProductSelector = (type) => {
    setSelectorType(type);
    setShowProductSelector(true);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {editMode ? 'Modifier la fiche' : 'Ajouter une fiche'}
      </Typography>

      {/* Ligne 1: Monture (Full Width) */}
      <Paper 
        sx={{ 
          p: 2, 
          mb: 3,
          border: errors.monture ? '2px solid #d32f2f' : '1px solid #e0e0e0',
          borderRadius: '8px',
          cursor: 'pointer',
          '&:hover': { borderColor: '#1976d2' }
        }}
        onClick={() => openProductSelector('monture')}
      >
        <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Monture
          </Typography>
          {/* <VisibilityIcon fontSize="small" color="action" /> */}
        </Box>
        {ficheData.montureNom ? (
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {ficheData.montureNom}
            </Typography>
            <TextField
              size="small"
              label="Prix (DH)"
              type="number"
              value={ficheData.prixMonture}
              onChange={(e) => handlePriceChange('prixMonture', e.target.value)}
              sx={{ mt: 1, width: '100px' }}
            />
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Cliquer pour sélectionner
          </Typography>
        )}
        {errors.monture && (
          <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
            {errors.monture}
          </Typography>
        )}
      </Paper>

      {/* Ligne 2: Verre Œil Droit + Mesures Œil Droit */}
      <Box sx={{ display: 'flex', gap: 0, mb: 3 }}>
        {/* Verre OD */}
        <Paper 
          sx={{ 
            p: 2, 
            width: '500px',
            border: errors.verreOD ? '2px solid #d32f2f' : '1px solid #e0e0e0',
            borderRadius: '8px 0 0 8px',
            borderRight: 'none',
            cursor: 'pointer',
            '&:hover': { borderColor: '#1976d2' }
          }}
          onClick={() => openProductSelector('verreOD')}
        >
          <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Verre Œil Droit
            </Typography>
            {/* <VisibilityIcon fontSize="small" color="action" /> */}
          </Box>
          {ficheData.verreODNom ? (
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {ficheData.verreODNom}
              </Typography>
              <TextField
                size="small"
                label="Prix (DH)"
                type="number"
                value={ficheData.prixVerreOD}
                onChange={(e) => handlePriceChange('prixVerreOD', e.target.value)}
                sx={{ mt: 1, width: '100px' }}
              />
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Cliquer pour sélectionner
            </Typography>
          )}
          {errors.verreOD && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
              {errors.verreOD}
            </Typography>
          )}
        </Paper>

        {/* Mesures OD */}
        <Paper sx={{ 
          p: 2, 
          flex: 1,
          borderRadius: '0 8px 8px 0',
          border: '1px solid #e0e0e0'
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Mesures Œil Droit
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              label="SPH"
              type="number"
              step="0.25"
              value={ficheData.mesuresOD.sph}
              onChange={(e) => handleMesuresChange('OD', 'sph', e.target.value)}
              error={!!errors.mesuresOD}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              label="CYL"
              type="number"
              step="0.25"
              value={ficheData.mesuresOD.cyl}
              onChange={(e) => handleMesuresChange('OD', 'cyl', e.target.value)}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              label="AXE"
              type="number"
              value={ficheData.mesuresOD.axe}
              onChange={(e) => handleMesuresChange('OD', 'axe', e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
          {errors.mesuresOD && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
              {errors.mesuresOD}
            </Typography>
          )}
        </Paper>
      </Box>

      {/* Ligne 3: Verre Œil Gauche + Mesures Œil Gauche */}
      <Box sx={{ display: 'flex', gap: 0, mb: 3 }}>
        {/* Verre OG */}
        <Paper 
          sx={{ 
            p: 2, 
            width: '500px',
            border: errors.verreOG ? '2px solid #d32f2f' : '1px solid #e0e0e0',
            borderRadius: '8px 0 0 8px',
            borderRight: 'none',
            cursor: 'pointer',
            '&:hover': { borderColor: '#1976d2' }
          }}
          onClick={() => openProductSelector('verreOG')}
        >
          <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Verre Œil Gauche
            </Typography>
            {/* <VisibilityIcon fontSize="small" color="action" /> */}
          </Box>
          {ficheData.verreOGNom ? (
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {ficheData.verreOGNom}
              </Typography>
              <TextField
                size="small"
                label="Prix (DH)"
                type="number"
                value={ficheData.prixVerreOG}
                onChange={(e) => handlePriceChange('prixVerreOG', e.target.value)}
                sx={{ mt: 1, width: '100px' }}
              />
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Cliquer pour sélectionner
            </Typography>
          )}
          {errors.verreOG && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
              {errors.verreOG}
            </Typography>
          )}
        </Paper>

        {/* Mesures OG */}
        <Paper sx={{ 
          p: 2, 
          flex: 1,
          borderRadius: '0 8px 8px 0',
          border: '1px solid #e0e0e0'
        }}>
          <Typography variant="subtitle2" gutterBottom>
            Mesures Œil Gauche
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              label="SPH"
              type="number"
              step="0.25"
              value={ficheData.mesuresOG.sph}
              onChange={(e) => handleMesuresChange('OG', 'sph', e.target.value)}
              error={!!errors.mesuresOG}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              label="CYL"
              type="number"
              step="0.25"
              value={ficheData.mesuresOG.cyl}
              onChange={(e) => handleMesuresChange('OG', 'cyl', e.target.value)}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              label="AXE"
              type="number"
              value={ficheData.mesuresOG.axe}
              onChange={(e) => handleMesuresChange('OG', 'axe', e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
          {errors.mesuresOG && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
              {errors.mesuresOG}
            </Typography>
          )}
        </Paper>
      </Box>

      {/* Ligne 4: Accessoires */}
      <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0', mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2">
            Accessoires ({ficheData.accessoires.length}/3)
          </Typography>
          {ficheData.accessoires.length < 3 && (
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={() => openProductSelector('accessoire')}
            >
              Ajouter
            </Button>
          )}
        </Box>

        {ficheData.accessoires.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            Aucun accessoire ajouté
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {ficheData.accessoires.map((accessoire, index) => (
              <Chip
                key={index}
                label={`${accessoire.accessoireNom} - ${accessoire.prixAccessoire} DH`}
                onDelete={() => removeAccessoire(index)}
                deleteIcon={<DeleteIcon />}
                variant="outlined"
                sx={{ maxWidth: 300 }}
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* Total et bouton d'ajout */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={700}>
          Total de la fiche: {ficheData.totalFiche.toFixed(2)} DH
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            px: 4
          }}
        >
          {editMode ? 'Modifier la fiche' : 'Ajouter la fiche'}
        </Button>
      </Box>

      {/* Erreurs générales */}
      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Veuillez corriger les erreurs avant d'ajouter la fiche
        </Alert>
      )}

      {/* Product Selector Modal */}
      <ProductSelector
        open={showProductSelector}
        type={selectorType}
        onClose={() => setShowProductSelector(false)}
        onSelect={handleProductSelect}
      />
    </Box>
  );
}

export default FicheForm;





// // src/components/Vente/FicheForm.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Grid,
//   Chip,
//   Alert
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import DeleteIcon from '@mui/icons-material/Delete';

// import ProductSelector from './ProductSelector';

// const initialFicheState = {
//   montureId: null,
//   montureNom: '',
//   prixMonture: 0,
//   verreODId: null,
//   verreODNom: '',
//   prixVerreOD: 0,
//   verreOGId: null,
//   verreOGNom: '',
//   prixVerreOG: 0,
//   mesuresOD: {
//     sph: '',
//     cyl: '',
//     axe: ''
//   },
//   mesuresOG: {
//     sph: '',
//     cyl: '',
//     axe: ''
//   },
//   accessoires: [],
//   totalFiche: 0
// };

// function FicheForm({ onAddFiche, editMode = false, initialData = null }) {
//   const [ficheData, setFicheData] = useState(
//     editMode && initialData ? initialData : initialFicheState
//   );
//   const [errors, setErrors] = useState({});
//   const [showProductSelector, setShowProductSelector] = useState(false);
//   const [selectorType, setSelectorType] = useState('');

//   // ✅ useEffect to recalculate total when any price changes
//   useEffect(() => {
//     const total = 
//       (ficheData.prixMonture || 0) +
//       (ficheData.prixVerreOD || 0) +
//       (ficheData.prixVerreOG || 0) +
//       ficheData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
//     // Only update if total is different to avoid infinite loops
//     if (total !== ficheData.totalFiche) {
//       setFicheData(prev => ({
//         ...prev,
//         totalFiche: total
//       }));
//     }
//   }, [ficheData.prixMonture, ficheData.prixVerreOD, ficheData.prixVerreOG, ficheData.accessoires]);

//   // ✅ Fixed handleProductSelect function
//   const handleProductSelect = (product, type, customPrice = null) => {
//     let updatedFicheData = { ...ficheData };
    
//     switch (type) {
//       case 'monture':
//         updatedFicheData = {
//           ...updatedFicheData,
//           montureId: product.id,
//           montureNom: `${product.marque} ${product.reference}`,
//           prixMonture: customPrice || product.prixVente
//         };
//         break;
//       case 'verreOD':
//         updatedFicheData = {
//           ...updatedFicheData,
//           verreODId: product.id,
//           verreODNom: product.nom,
//           prixVerreOD: customPrice || product.prixVente
//         };
//         break;
//       case 'verreOG':
//         updatedFicheData = {
//           ...updatedFicheData,
//           verreOGId: product.id,
//           verreOGNom: product.nom,
//           prixVerreOG: customPrice || product.prixVente
//         };
//         break;
//       case 'accessoire':
//         if (updatedFicheData.accessoires.length < 3) {
//           const newAccessoire = {
//             accessoireId: product.id,
//             accessoireNom: product.nom,
//             accessoireReference: product.reference,
//             prixAccessoire: customPrice || product.prixVente,
//             ordre: updatedFicheData.accessoires.length + 1
//           };
//           updatedFicheData = {
//             ...updatedFicheData,
//             accessoires: [...updatedFicheData.accessoires, newAccessoire]
//           };
//         }
//         break;
//     }
    
//     // Calculate total immediately
//     const total = 
//       (updatedFicheData.prixMonture || 0) +
//       (updatedFicheData.prixVerreOD || 0) +
//       (updatedFicheData.prixVerreOG || 0) +
//       updatedFicheData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
//     updatedFicheData.totalFiche = total;
    
//     // Update state once with all changes
//     setFicheData(updatedFicheData);
//     setShowProductSelector(false);
    
//     console.log('DEBUG - Product added, new total:', total);
//   };

//   const handleMesuresChange = (oeil, field, value) => {
//     setFicheData(prev => ({
//       ...prev,
//       [`mesures${oeil}`]: {
//         ...prev[`mesures${oeil}`],
//         [field]: value
//       }
//     }));
//   };

//   // ✅ Fixed handlePriceChange function
//   const handlePriceChange = (field, value) => {
//     const updatedData = {
//       ...ficheData,
//       [field]: parseFloat(value) || 0
//     };
    
//     // Recalculate total immediately
//     const total = 
//       (updatedData.prixMonture || 0) +
//       (updatedData.prixVerreOD || 0) +
//       (updatedData.prixVerreOG || 0) +
//       updatedData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
//     updatedData.totalFiche = total;
    
//     setFicheData(updatedData);
//   };

//   // ✅ Fixed removeAccessoire function
//   const removeAccessoire = (index) => {
//     const updatedAccessoires = ficheData.accessoires.filter((_, i) => i !== index);
    
//     const total = 
//       (ficheData.prixMonture || 0) +
//       (ficheData.prixVerreOD || 0) +
//       (ficheData.prixVerreOG || 0) +
//       updatedAccessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
//     setFicheData(prev => ({
//       ...prev,
//       accessoires: updatedAccessoires,
//       totalFiche: total
//     }));
    
//     console.log('DEBUG - Accessoire removed, new total:', total);
//   };

//   const validateFiche = () => {
//     const newErrors = {};
    
//     if (!ficheData.montureId) newErrors.monture = "Sélectionnez une monture";
//     if (!ficheData.verreODId) newErrors.verreOD = "Sélectionnez un verre pour l'œil droit";
//     if (!ficheData.verreOGId) newErrors.verreOG = "Sélectionnez un verre pour l'œil gauche";
    
//     // Validation des mesures
//     if (!ficheData.mesuresOD.sph && ficheData.mesuresOD.sph !== 0) {
//       newErrors.mesuresOD = "Renseignez les mesures de l'œil droit";
//     }
//     if (!ficheData.mesuresOG.sph && ficheData.mesuresOG.sph !== 0) {
//       newErrors.mesuresOG = "Renseignez les mesures de l'œil gauche";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     if (validateFiche()) {
//       onAddFiche(ficheData);
//       setFicheData(initialFicheState);
//       setErrors({});
//     }
//   };

//   const openProductSelector = (type) => {
//     setSelectorType(type);
//     setShowProductSelector(true);
//   };

//   return (
//     <Box>
//       <Typography variant="h6" gutterBottom>
//         {editMode ? 'Modifier la fiche' : 'Ajouter une fiche'}
//       </Typography>

//       {/* Ligne 1: Monture (Full Width) */}
//       <Paper 
//         sx={{ 
//           p: 2, 
//           mb: 3,
//           border: errors.monture ? '2px solid #d32f2f' : '1px solid #e0e0e0',
//           borderRadius: '8px',
//           cursor: 'pointer',
//           '&:hover': { borderColor: '#1976d2' }
//         }}
//         onClick={() => openProductSelector('monture')}
//       >
//         <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
//           <Typography variant="subtitle2" color="text.secondary">
//             Monture
//           </Typography>
//           <VisibilityIcon fontSize="small" color="action" />
//         </Box>
//         {ficheData.montureNom ? (
//           <Box>
//             <Typography variant="body2" fontWeight={600}>
//               {ficheData.montureNom}
//             </Typography>
//             <TextField
//               size="small"
//               label="Prix (DH)"
//               type="number"
//               value={ficheData.prixMonture}
//               onChange={(e) => handlePriceChange('prixMonture', e.target.value)}
//               sx={{ mt: 1, width: '100px' }}
//             />
//           </Box>
//         ) : (
//           <Typography variant="body2" color="text.secondary">
//             Cliquer pour sélectionner
//           </Typography>
//         )}
//         {errors.monture && (
//           <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
//             {errors.monture}
//           </Typography>
//         )}
//       </Paper>

//       {/* Ligne 2: Verre Œil Droit + Mesures Œil Droit */}
//       <Box sx={{ display: 'flex', gap: 0, mb: 3 }}>
//         {/* Verre OD */}
//         <Paper 
//           sx={{ 
//             p: 2, 
//             flex: 1,
//             border: errors.verreOD ? '2px solid #d32f2f' : '1px solid #e0e0e0',
//             borderRadius: '8px 0 0 8px',
//             borderRight: 'none',
//             cursor: 'pointer',
//             '&:hover': { borderColor: '#1976d2' }
//           }}
//           onClick={() => openProductSelector('verreOD')}
//         >
//           <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Verre Œil Droit
//             </Typography>
//             <VisibilityIcon fontSize="small" color="action" />
//           </Box>
//           {ficheData.verreODNom ? (
//             <Box>
//               <Typography variant="body2" fontWeight={600}>
//                 {ficheData.verreODNom}
//               </Typography>
//               <TextField
//                 size="small"
//                 label="Prix (DH)"
//                 type="number"
//                 value={ficheData.prixVerreOD}
//                 onChange={(e) => handlePriceChange('prixVerreOD', e.target.value)}
//                 sx={{ mt: 1, width: '100px' }}
//               />
//             </Box>
//           ) : (
//             <Typography variant="body2" color="text.secondary">
//               Cliquer pour sélectionner
//             </Typography>
//           )}
//           {errors.verreOD && (
//             <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
//               {errors.verreOD}
//             </Typography>
//           )}
//         </Paper>

//         {/* Mesures OD */}
//         <Paper sx={{ 
//           p: 2, 
//           flex: 1,
//           borderRadius: '0 8px 8px 0',
//           border: '1px solid #e0e0e0'
//         }}>
//           <Typography variant="subtitle2" gutterBottom>
//             Mesures Œil Droit
//           </Typography>
//           <Grid container spacing={1}>
//             <Grid item xs={4}>
//               <TextField
//                 size="small"
//                 label="SPH"
//                 type="number"
//                 step="0.25"
//                 value={ficheData.mesuresOD.sph}
//                 onChange={(e) => handleMesuresChange('OD', 'sph', e.target.value)}
//                 error={!!errors.mesuresOD}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={4}>
//               <TextField
//                 size="small"
//                 label="CYL"
//                 type="number"
//                 step="0.25"
//                 value={ficheData.mesuresOD.cyl}
//                 onChange={(e) => handleMesuresChange('OD', 'cyl', e.target.value)}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={4}>
//               <TextField
//                 size="small"
//                 label="AXE"
//                 type="number"
//                 value={ficheData.mesuresOD.axe}
//                 onChange={(e) => handleMesuresChange('OD', 'axe', e.target.value)}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//           {errors.mesuresOD && (
//             <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
//               {errors.mesuresOD}
//             </Typography>
//           )}
//         </Paper>
//       </Box>

//       {/* Ligne 3: Verre Œil Gauche + Mesures Œil Gauche */}
//       <Box sx={{ display: 'flex', gap: 0, mb: 3 }}>
//         {/* Verre OG */}
//         <Paper 
//           sx={{ 
//             p: 2, 
//             flex: 1,
//             border: errors.verreOG ? '2px solid #d32f2f' : '1px solid #e0e0e0',
//             borderRadius: '8px 0 0 8px',
//             borderRight: 'none',
//             cursor: 'pointer',
//             '&:hover': { borderColor: '#1976d2' }
//           }}
//           onClick={() => openProductSelector('verreOG')}
//         >
//           <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               Verre Œil Gauche
//             </Typography>
//             <VisibilityIcon fontSize="small" color="action" />
//           </Box>
//           {ficheData.verreOGNom ? (
//             <Box>
//               <Typography variant="body2" fontWeight={600}>
//                 {ficheData.verreOGNom}
//               </Typography>
//               <TextField
//                 size="small"
//                 label="Prix (DH)"
//                 type="number"
//                 value={ficheData.prixVerreOG}
//                 onChange={(e) => handlePriceChange('prixVerreOG', e.target.value)}
//                 sx={{ mt: 1, width: '100px' }}
//               />
//             </Box>
//           ) : (
//             <Typography variant="body2" color="text.secondary">
//               Cliquer pour sélectionner
//             </Typography>
//           )}
//           {errors.verreOG && (
//             <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
//               {errors.verreOG}
//             </Typography>
//           )}
//         </Paper>

//         {/* Mesures OG */}
//         <Paper sx={{ 
//           p: 2, 
//           flex: 1,
//           borderRadius: '0 8px 8px 0',
//           border: '1px solid #e0e0e0'
//         }}>
//           <Typography variant="subtitle2" gutterBottom>
//             Mesures Œil Gauche
//           </Typography>
//           <Grid container spacing={1}>
//             <Grid item xs={4}>
//               <TextField
//                 size="small"
//                 label="SPH"
//                 type="number"
//                 step="0.25"
//                 value={ficheData.mesuresOG.sph}
//                 onChange={(e) => handleMesuresChange('OG', 'sph', e.target.value)}
//                 error={!!errors.mesuresOG}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={4}>
//               <TextField
//                 size="small"
//                 label="CYL"
//                 type="number"
//                 step="0.25"
//                 value={ficheData.mesuresOG.cyl}
//                 onChange={(e) => handleMesuresChange('OG', 'cyl', e.target.value)}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={4}>
//               <TextField
//                 size="small"
//                 label="AXE"
//                 type="number"
//                 value={ficheData.mesuresOG.axe}
//                 onChange={(e) => handleMesuresChange('OG', 'axe', e.target.value)}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//           {errors.mesuresOG && (
//             <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
//               {errors.mesuresOG}
//             </Typography>
//           )}
//         </Paper>
//       </Box>

//       {/* Ligne 4: Accessoires */}
//       <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0', mb: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="subtitle2">
//             Accessoires ({ficheData.accessoires.length}/3)
//           </Typography>
//           {ficheData.accessoires.length < 3 && (
//             <Button
//               size="small"
//               startIcon={<AddIcon />}
//               onClick={() => openProductSelector('accessoire')}
//             >
//               Ajouter
//             </Button>
//           )}
//         </Box>

//         {ficheData.accessoires.length === 0 ? (
//           <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
//             Aucun accessoire ajouté
//           </Typography>
//         ) : (
//           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//             {ficheData.accessoires.map((accessoire, index) => (
//               <Chip
//                 key={index}
//                 label={`${accessoire.accessoireNom} - ${accessoire.prixAccessoire} DH`}
//                 onDelete={() => removeAccessoire(index)}
//                 deleteIcon={<DeleteIcon />}
//                 variant="outlined"
//                 sx={{ maxWidth: 300 }}
//               />
//             ))}
//           </Box>
//         )}
//       </Paper>

//       {/* Total et bouton d'ajout */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant="h6" fontWeight={700}>
//           Total de la fiche: {ficheData.totalFiche.toFixed(2)} DH
//         </Typography>
        
//         <Button
//           variant="contained"
//           size="large"
//           onClick={handleSubmit}
//           startIcon={<AddIcon />}
//           sx={{
//             textTransform: 'none',
//             borderRadius: '8px',
//             px: 4
//           }}
//         >
//           {editMode ? 'Modifier la fiche' : 'Ajouter la fiche'}
//         </Button>
//       </Box>

//       {/* Erreurs générales */}
//       {Object.keys(errors).length > 0 && (
//         <Alert severity="error" sx={{ mt: 2 }}>
//           Veuillez corriger les erreurs avant d'ajouter la fiche
//         </Alert>
//       )}

//       {/* Product Selector Modal */}
//       <ProductSelector
//         open={showProductSelector}
//         type={selectorType}
//         onClose={() => setShowProductSelector(false)}
//         onSelect={handleProductSelect}
//       />
//     </Box>
//   );
// }

// export default FicheForm;





// // // src/components/Vente/FicheForm.jsx
// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Button,
// //   TextField,
// //   Typography,
// //   Paper,
// //   Grid,
// //   Chip,
// //   Alert
// // } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// // import VisibilityIcon from '@mui/icons-material/Visibility';
// // import DeleteIcon from '@mui/icons-material/Delete';

// // import ProductSelector from './ProductSelector';

// // const initialFicheState = {
// //   montureId: null,
// //   montureNom: '',
// //   prixMonture: 0,
// //   verreODId: null,
// //   verreODNom: '',
// //   prixVerreOD: 0,
// //   verreOGId: null,
// //   verreOGNom: '',
// //   prixVerreOG: 0,
// //   mesuresOD: {
// //     sph: '',
// //     cyl: '',
// //     axe: ''
// //   },
// //   mesuresOG: {
// //     sph: '',
// //     cyl: '',
// //     axe: ''
// //   },
// //   accessoires: [],
// //   totalFiche: 0
// // };

// // function FicheForm({ onAddFiche, editMode = false, initialData = null }) {
// //   const [ficheData, setFicheData] = useState(
// //     editMode && initialData ? initialData : initialFicheState
// //   );
// //   const [errors, setErrors] = useState({});
// //   const [showProductSelector, setShowProductSelector] = useState(false);
// //   const [selectorType, setSelectorType] = useState('');

// //   // ✅ useEffect to recalculate total when any price changes
// //   useEffect(() => {
// //     const total = 
// //       (ficheData.prixMonture || 0) +
// //       (ficheData.prixVerreOD || 0) +
// //       (ficheData.prixVerreOG || 0) +
// //       ficheData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
// //     // Only update if total is different to avoid infinite loops
// //     if (total !== ficheData.totalFiche) {
// //       setFicheData(prev => ({
// //         ...prev,
// //         totalFiche: total
// //       }));
// //     }
// //   }, [ficheData.prixMonture, ficheData.prixVerreOD, ficheData.prixVerreOG, ficheData.accessoires]);

// //   // ✅ Fixed handleProductSelect function
// //   const handleProductSelect = (product, type, customPrice = null) => {
// //     let updatedFicheData = { ...ficheData };
    
// //     switch (type) {
// //       case 'monture':
// //         updatedFicheData = {
// //           ...updatedFicheData,
// //           montureId: product.id,
// //           montureNom: `${product.marque} ${product.reference}`,
// //           prixMonture: customPrice || product.prixVente
// //         };
// //         break;
// //       case 'verreOD':
// //         updatedFicheData = {
// //           ...updatedFicheData,
// //           verreODId: product.id,
// //           verreODNom: product.nom,
// //           prixVerreOD: customPrice || product.prixVente
// //         };
// //         break;
// //       case 'verreOG':
// //         updatedFicheData = {
// //           ...updatedFicheData,
// //           verreOGId: product.id,
// //           verreOGNom: product.nom,
// //           prixVerreOG: customPrice || product.prixVente
// //         };
// //         break;
// //       case 'accessoire':
// //         if (updatedFicheData.accessoires.length < 3) {
// //           const newAccessoire = {
// //             accessoireId: product.id,
// //             accessoireNom: product.nom,
// //             accessoireReference: product.reference,
// //             prixAccessoire: customPrice || product.prixVente,
// //             ordre: updatedFicheData.accessoires.length + 1
// //           };
// //           updatedFicheData = {
// //             ...updatedFicheData,
// //             accessoires: [...updatedFicheData.accessoires, newAccessoire]
// //           };
// //         }
// //         break;
// //     }
    
// //     // Calculate total immediately
// //     const total = 
// //       (updatedFicheData.prixMonture || 0) +
// //       (updatedFicheData.prixVerreOD || 0) +
// //       (updatedFicheData.prixVerreOG || 0) +
// //       updatedFicheData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
// //     updatedFicheData.totalFiche = total;
    
// //     // Update state once with all changes
// //     setFicheData(updatedFicheData);
// //     setShowProductSelector(false);
    
// //     console.log('DEBUG - Product added, new total:', total);
// //   };

// //   const handleMesuresChange = (oeil, field, value) => {
// //     setFicheData(prev => ({
// //       ...prev,
// //       [`mesures${oeil}`]: {
// //         ...prev[`mesures${oeil}`],
// //         [field]: value
// //       }
// //     }));
// //   };

// //   // ✅ Fixed handlePriceChange function
// //   const handlePriceChange = (field, value) => {
// //     const updatedData = {
// //       ...ficheData,
// //       [field]: parseFloat(value) || 0
// //     };
    
// //     // Recalculate total immediately
// //     const total = 
// //       (updatedData.prixMonture || 0) +
// //       (updatedData.prixVerreOD || 0) +
// //       (updatedData.prixVerreOG || 0) +
// //       updatedData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
// //     updatedData.totalFiche = total;
    
// //     setFicheData(updatedData);
// //   };

// //   // ✅ Fixed removeAccessoire function
// //   const removeAccessoire = (index) => {
// //     const updatedAccessoires = ficheData.accessoires.filter((_, i) => i !== index);
    
// //     const total = 
// //       (ficheData.prixMonture || 0) +
// //       (ficheData.prixVerreOD || 0) +
// //       (ficheData.prixVerreOG || 0) +
// //       updatedAccessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
// //     setFicheData(prev => ({
// //       ...prev,
// //       accessoires: updatedAccessoires,
// //       totalFiche: total
// //     }));
    
// //     console.log('DEBUG - Accessoire removed, new total:', total);
// //   };

// //   const validateFiche = () => {
// //     const newErrors = {};
    
// //     if (!ficheData.montureId) newErrors.monture = "Sélectionnez une monture";
// //     if (!ficheData.verreODId) newErrors.verreOD = "Sélectionnez un verre pour l'œil droit";
// //     if (!ficheData.verreOGId) newErrors.verreOG = "Sélectionnez un verre pour l'œil gauche";
    
// //     // Validation des mesures
// //     if (!ficheData.mesuresOD.sph && ficheData.mesuresOD.sph !== 0) {
// //       newErrors.mesuresOD = "Renseignez les mesures de l'œil droit";
// //     }
// //     if (!ficheData.mesuresOG.sph && ficheData.mesuresOG.sph !== 0) {
// //       newErrors.mesuresOG = "Renseignez les mesures de l'œil gauche";
// //     }
    
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = () => {
// //     if (validateFiche()) {
// //       onAddFiche(ficheData);
// //       setFicheData(initialFicheState);
// //       setErrors({});
// //     }
// //   };

// //   const openProductSelector = (type) => {
// //     setSelectorType(type);
// //     setShowProductSelector(true);
// //   };

// //   return (
// //     <Box>
// //       <Typography variant="h6" gutterBottom>
// //         {editMode ? 'Modifier la fiche' : 'Ajouter une fiche'}
// //       </Typography>

// //       {/* Ligne 1: Monture (Full Width) */}
// //       <Grid container spacing={2} sx={{ mb: 3 }}>
// //         <Grid item xs={12}>
// //           <Paper 
// //             sx={{ 
// //               p: 2, 
// //               border: errors.monture ? '2px solid #d32f2f' : '1px solid #e0e0e0',
// //               borderRadius: '8px',
// //               cursor: 'pointer',
// //               '&:hover': { borderColor: '#1976d2' }
// //             }}
// //             onClick={() => openProductSelector('monture')}
// //           >
// //             <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 Monture
// //               </Typography>
// //               <VisibilityIcon fontSize="small" color="action" />
// //             </Box>
// //             {ficheData.montureNom ? (
// //               <Box>
// //                 <Typography variant="body2" fontWeight={600}>
// //                   {ficheData.montureNom}
// //                 </Typography>
// //                 <TextField
// //                   size="small"
// //                   label="Prix (DH)"
// //                   type="number"
// //                   value={ficheData.prixMonture}
// //                   onChange={(e) => handlePriceChange('prixMonture', e.target.value)}
// //                   sx={{ mt: 1, width: '100px' }}
// //                 />
// //               </Box>
// //             ) : (
// //               <Typography variant="body2" color="text.secondary">
// //                 Cliquer pour sélectionner
// //               </Typography>
// //             )}
// //           </Paper>
// //           {errors.monture && (
// //             <Typography variant="caption" color="error">
// //               {errors.monture}
// //             </Typography>
// //           )}
// //         </Grid>
// //       </Grid>

// //       {/* Ligne 2: Verre Œil Droit + Mesures Œil Droit */}
// //       <Grid container spacing={2} sx={{ mb: 3 }}>
// //         {/* Verre OD */}
// //         <Grid item xs={6}>
// //           <Paper 
// //             sx={{ 
// //               p: 2, 
// //               border: errors.verreOD ? '2px solid #d32f2f' : '1px solid #e0e0e0',
// //               borderRadius: '8px',
// //               cursor: 'pointer',
// //               '&:hover': { borderColor: '#1976d2' }
// //             }}
// //             onClick={() => openProductSelector('verreOD')}
// //           >
// //             <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 Verre Œil Droit
// //               </Typography>
// //               <VisibilityIcon fontSize="small" color="action" />
// //             </Box>
// //             {ficheData.verreODNom ? (
// //               <Box>
// //                 <Typography variant="body2" fontWeight={600}>
// //                   {ficheData.verreODNom}
// //                 </Typography>
// //                 <TextField
// //                   size="small"
// //                   label="Prix (DH)"
// //                   type="number"
// //                   value={ficheData.prixVerreOD}
// //                   onChange={(e) => handlePriceChange('prixVerreOD', e.target.value)}
// //                   sx={{ mt: 1, width: '100px' }}
// //                 />
// //               </Box>
// //             ) : (
// //               <Typography variant="body2" color="text.secondary">
// //                 Cliquer pour sélectionner
// //               </Typography>
// //             )}
// //           </Paper>
// //           {errors.verreOD && (
// //             <Typography variant="caption" color="error">
// //               {errors.verreOD}
// //             </Typography>
// //           )}
// //         </Grid>

// //         {/* Mesures OD */}
// //         <Grid item xs={6}>
// //           <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0' }}>
// //             <Typography variant="subtitle2" gutterBottom>
// //               Mesures Œil Droit
// //             </Typography>
// //             <Grid container spacing={1}>
// //               <Grid item xs={4}>
// //                 <TextField
// //                   size="small"
// //                   label="SPH"
// //                   type="number"
// //                   step="0.25"
// //                   value={ficheData.mesuresOD.sph}
// //                   onChange={(e) => handleMesuresChange('OD', 'sph', e.target.value)}
// //                   error={!!errors.mesuresOD}
// //                 />
// //               </Grid>
// //               <Grid item xs={4}>
// //                 <TextField
// //                   size="small"
// //                   label="CYL"
// //                   type="number"
// //                   step="0.25"
// //                   value={ficheData.mesuresOD.cyl}
// //                   onChange={(e) => handleMesuresChange('OD', 'cyl', e.target.value)}
// //                 />
// //               </Grid>
// //               <Grid item xs={4}>
// //                 <TextField
// //                   size="small"
// //                   label="AXE"
// //                   type="number"
// //                   value={ficheData.mesuresOD.axe}
// //                   onChange={(e) => handleMesuresChange('OD', 'axe', e.target.value)}
// //                 />
// //               </Grid>
// //             </Grid>
// //             {errors.mesuresOD && (
// //               <Typography variant="caption" color="error">
// //                 {errors.mesuresOD}
// //               </Typography>
// //             )}
// //           </Paper>
// //         </Grid>
// //       </Grid>

// //       {/* Ligne 3: Verre Œil Gauche + Mesures Œil Gauche */}
// //       <Grid container spacing={2} sx={{ mb: 3 }}>
// //         {/* Verre OG */}
// //         <Grid item xs={6}>
// //           <Paper 
// //             sx={{ 
// //               p: 2, 
// //               border: errors.verreOG ? '2px solid #d32f2f' : '1px solid #e0e0e0',
// //               borderRadius: '8px',
// //               cursor: 'pointer',
// //               '&:hover': { borderColor: '#1976d2' }
// //             }}
// //             onClick={() => openProductSelector('verreOG')}
// //           >
// //             <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
// //               <Typography variant="subtitle2" color="text.secondary">
// //                 Verre Œil Gauche
// //               </Typography>
// //               <VisibilityIcon fontSize="small" color="action" />
// //             </Box>
// //             {ficheData.verreOGNom ? (
// //               <Box>
// //                 <Typography variant="body2" fontWeight={600}>
// //                   {ficheData.verreOGNom}
// //                 </Typography>
// //                 <TextField
// //                   size="small"
// //                   label="Prix (DH)"
// //                   type="number"
// //                   value={ficheData.prixVerreOG}
// //                   onChange={(e) => handlePriceChange('prixVerreOG', e.target.value)}
// //                   sx={{ mt: 1, width: '100px' }}
// //                 />
// //               </Box>
// //             ) : (
// //               <Typography variant="body2" color="text.secondary">
// //                 Cliquer pour sélectionner
// //               </Typography>
// //             )}
// //           </Paper>
// //           {errors.verreOG && (
// //             <Typography variant="caption" color="error">
// //               {errors.verreOG}
// //             </Typography>
// //           )}
// //         </Grid>

// //         {/* Mesures OG */}
// //         <Grid item xs={6}>
// //           <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0' }}>
// //             <Typography variant="subtitle2" gutterBottom>
// //               Mesures Œil Gauche
// //             </Typography>
// //             <Grid container spacing={1}>
// //               <Grid item xs={4}>
// //                 <TextField
// //                   size="small"
// //                   label="SPH"
// //                   type="number"
// //                   step="0.25"
// //                   value={ficheData.mesuresOG.sph}
// //                   onChange={(e) => handleMesuresChange('OG', 'sph', e.target.value)}
// //                   error={!!errors.mesuresOG}
// //                 />
// //               </Grid>
// //               <Grid item xs={4}>
// //                 <TextField
// //                   size="small"
// //                   label="CYL"
// //                   type="number"
// //                   step="0.25"
// //                   value={ficheData.mesuresOG.cyl}
// //                   onChange={(e) => handleMesuresChange('OG', 'cyl', e.target.value)}
// //                 />
// //               </Grid>
// //               <Grid item xs={4}>
// //                 <TextField
// //                   size="small"
// //                   label="AXE"
// //                   type="number"
// //                   value={ficheData.mesuresOG.axe}
// //                   onChange={(e) => handleMesuresChange('OG', 'axe', e.target.value)}
// //                 />
// //               </Grid>
// //             </Grid>
// //             {errors.mesuresOG && (
// //               <Typography variant="caption" color="error">
// //                 {errors.mesuresOG}
// //               </Typography>
// //             )}
// //           </Paper>
// //         </Grid>
// //       </Grid>

// //       {/* Ligne 4: Accessoires */}
// //       <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0', mb: 3 }}>
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //           <Typography variant="subtitle2">
// //             Accessoires ({ficheData.accessoires.length}/3)
// //           </Typography>
// //           {ficheData.accessoires.length < 3 && (
// //             <Button
// //               size="small"
// //               startIcon={<AddIcon />}
// //               onClick={() => openProductSelector('accessoire')}
// //             >
// //               Ajouter
// //             </Button>
// //           )}
// //         </Box>

// //         {ficheData.accessoires.length === 0 ? (
// //           <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
// //             Aucun accessoire ajouté
// //           </Typography>
// //         ) : (
// //           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
// //             {ficheData.accessoires.map((accessoire, index) => (
// //               <Chip
// //                 key={index}
// //                 label={`${accessoire.accessoireNom} - ${accessoire.prixAccessoire} DH`}
// //                 onDelete={() => removeAccessoire(index)}
// //                 deleteIcon={<DeleteIcon />}
// //                 variant="outlined"
// //                 sx={{ maxWidth: 300 }}
// //               />
// //             ))}
// //           </Box>
// //         )}
// //       </Paper>

// //       {/* Total et bouton d'ajout */}
// //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //         <Typography variant="h6" fontWeight={700}>
// //           Total de la fiche: {ficheData.totalFiche.toFixed(2)} DH
// //         </Typography>
        
// //         <Button
// //           variant="contained"
// //           size="large"
// //           onClick={handleSubmit}
// //           startIcon={<AddIcon />}
// //           sx={{
// //             textTransform: 'none',
// //             borderRadius: '8px',
// //             px: 4
// //           }}
// //         >
// //           {editMode ? 'Modifier la fiche' : 'Ajouter la fiche'}
// //         </Button>
// //       </Box>

// //       {/* Erreurs générales */}
// //       {Object.keys(errors).length > 0 && (
// //         <Alert severity="error" sx={{ mt: 2 }}>
// //           Veuillez corriger les erreurs avant d'ajouter la fiche
// //         </Alert>
// //       )}

// //       {/* Product Selector Modal */}
// //       <ProductSelector
// //         open={showProductSelector}
// //         type={selectorType}
// //         onClose={() => setShowProductSelector(false)}
// //         onSelect={handleProductSelect}
// //       />
// //     </Box>
// //   );
// // }

// // export default FicheForm;






// // // // src/components/Vente/FicheForm.jsx
// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Box,
// // //   Button,
// // //   TextField,
// // //   Typography,
// // //   Paper,
// // //   Grid,
// // //   // IconButton,
// // //   Chip,
// // //   Alert
// // // } from '@mui/material';
// // // import AddIcon from '@mui/icons-material/Add';
// // // import VisibilityIcon from '@mui/icons-material/Visibility';
// // // import DeleteIcon from '@mui/icons-material/Delete';

// // // import ProductSelector from './ProductSelector';

// // // const initialFicheState = {
// // //   montureId: null,
// // //   montureNom: '',
// // //   prixMonture: 0,
// // //   verreODId: null,
// // //   verreODNom: '',
// // //   prixVerreOD: 0,
// // //   verreOGId: null,
// // //   verreOGNom: '',
// // //   prixVerreOG: 0,
// // //   mesuresOD: {
// // //     sph: '',
// // //     cyl: '',
// // //     axe: ''
// // //   },
// // //   mesuresOG: {
// // //     sph: '',
// // //     cyl: '',
// // //     axe: ''
// // //   },
// // //   accessoires: [],
// // //   totalFiche: 0
// // // };

// // // function FicheForm({ onAddFiche, editMode = false, initialData = null }) {
// // //   const [ficheData, setFicheData] = useState(
// // //     editMode && initialData ? initialData : initialFicheState
// // //   );
// // //   const [errors, setErrors] = useState({});
// // //   const [showProductSelector, setShowProductSelector] = useState(false);
// // //   const [selectorType, setSelectorType] = useState('');

// // //   // ✅ useEffect to recalculate total when any price changes
// // //   useEffect(() => {
// // //     const total = 
// // //       (ficheData.prixMonture || 0) +
// // //       (ficheData.prixVerreOD || 0) +
// // //       (ficheData.prixVerreOG || 0) +
// // //       ficheData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
// // //     // Only update if total is different to avoid infinite loops
// // //     if (total !== ficheData.totalFiche) {
// // //       setFicheData(prev => ({
// // //         ...prev,
// // //         totalFiche: total
// // //       }));
// // //     }
// // //   }, [ficheData.prixMonture, ficheData.prixVerreOD, ficheData.prixVerreOG, ficheData.accessoires]);

// // //   // ✅ Fixed handleProductSelect function
// // //   const handleProductSelect = (product, type, customPrice = null) => {
// // //     let updatedFicheData = { ...ficheData };
    
// // //     switch (type) {
// // //       case 'monture':
// // //         updatedFicheData = {
// // //           ...updatedFicheData,
// // //           montureId: product.id,
// // //           montureNom: `${product.marque} ${product.reference}`,
// // //           prixMonture: customPrice || product.prixVente
// // //         };
// // //         break;
// // //       case 'verreOD':
// // //         updatedFicheData = {
// // //           ...updatedFicheData,
// // //           verreODId: product.id,
// // //           verreODNom: product.nom,
// // //           prixVerreOD: customPrice || product.prixVente
// // //         };
// // //         break;
// // //       case 'verreOG':
// // //         updatedFicheData = {
// // //           ...updatedFicheData,
// // //           verreOGId: product.id,
// // //           verreOGNom: product.nom,
// // //           prixVerreOG: customPrice || product.prixVente
// // //         };
// // //         break;
// // //       case 'accessoire':
// // //         if (updatedFicheData.accessoires.length < 3) {
// // //           const newAccessoire = {
// // //             accessoireId: product.id,
// // //             accessoireNom: product.nom,
// // //             accessoireReference: product.reference,
// // //             prixAccessoire: customPrice || product.prixVente,
// // //             ordre: updatedFicheData.accessoires.length + 1
// // //           };
// // //           updatedFicheData = {
// // //             ...updatedFicheData,
// // //             accessoires: [...updatedFicheData.accessoires, newAccessoire]
// // //           };
// // //         }
// // //         break;
// // //     }
    
// // //     // Calculate total immediately
// // //     const total = 
// // //       (updatedFicheData.prixMonture || 0) +
// // //       (updatedFicheData.prixVerreOD || 0) +
// // //       (updatedFicheData.prixVerreOG || 0) +
// // //       updatedFicheData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
// // //     updatedFicheData.totalFiche = total;
    
// // //     // Update state once with all changes
// // //     setFicheData(updatedFicheData);
// // //     setShowProductSelector(false);
    
// // //     console.log('DEBUG - Product added, new total:', total);
// // //   };

// // //   const handleMesuresChange = (oeil, field, value) => {
// // //     setFicheData(prev => ({
// // //       ...prev,
// // //       [`mesures${oeil}`]: {
// // //         ...prev[`mesures${oeil}`],
// // //         [field]: value
// // //       }
// // //     }));
// // //   };

// // //   // ✅ Fixed handlePriceChange function
// // //   const handlePriceChange = (field, value) => {
// // //     const updatedData = {
// // //       ...ficheData,
// // //       [field]: parseFloat(value) || 0
// // //     };
    
// // //     // Recalculate total immediately
// // //     const total = 
// // //       (updatedData.prixMonture || 0) +
// // //       (updatedData.prixVerreOD || 0) +
// // //       (updatedData.prixVerreOG || 0) +
// // //       updatedData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
// // //     updatedData.totalFiche = total;
    
// // //     setFicheData(updatedData);
// // //   };

// // //   // ✅ Fixed removeAccessoire function
// // //   const removeAccessoire = (index) => {
// // //     const updatedAccessoires = ficheData.accessoires.filter((_, i) => i !== index);
    
// // //     const total = 
// // //       (ficheData.prixMonture || 0) +
// // //       (ficheData.prixVerreOD || 0) +
// // //       (ficheData.prixVerreOG || 0) +
// // //       updatedAccessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
    
// // //     setFicheData(prev => ({
// // //       ...prev,
// // //       accessoires: updatedAccessoires,
// // //       totalFiche: total
// // //     }));
    
// // //     console.log('DEBUG - Accessoire removed, new total:', total);
// // //   };

// // //   const validateFiche = () => {
// // //     const newErrors = {};
    
// // //     if (!ficheData.montureId) newErrors.monture = "Sélectionnez une monture";
// // //     if (!ficheData.verreODId) newErrors.verreOD = "Sélectionnez un verre pour l'œil droit";
// // //     if (!ficheData.verreOGId) newErrors.verreOG = "Sélectionnez un verre pour l'œil gauche";
    
// // //     // Validation des mesures
// // //     if (!ficheData.mesuresOD.sph && ficheData.mesuresOD.sph !== 0) {
// // //       newErrors.mesuresOD = "Renseignez les mesures de l'œil droit";
// // //     }
// // //     if (!ficheData.mesuresOG.sph && ficheData.mesuresOG.sph !== 0) {
// // //       newErrors.mesuresOG = "Renseignez les mesures de l'œil gauche";
// // //     }
    
// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   const handleSubmit = () => {
// // //     if (validateFiche()) {
// // //       onAddFiche(ficheData);
// // //       setFicheData(initialFicheState);
// // //       setErrors({});
// // //     }
// // //   };

// // //   const openProductSelector = (type) => {
// // //     setSelectorType(type);
// // //     setShowProductSelector(true);
// // //   };

// // //   return (
// // //     <Box>
// // //       <Typography variant="h6" gutterBottom>
// // //         {editMode ? 'Modifier la fiche' : 'Ajouter une fiche'}
// // //       </Typography>

// // //       {/* Ligne 1: Sélection des produits principaux */}
// // //       <Grid container spacing={2} sx={{ mb: 3 }}>
// // //         {/* Monture */}
// // //         <Grid item xs={4}>
// // //           <Paper 
// // //             sx={{ 
// // //               p: 2, 
// // //               border: errors.monture ? '2px solid #d32f2f' : '1px solid #e0e0e0',
// // //               borderRadius: '8px',
// // //               cursor: 'pointer',
// // //               '&:hover': { borderColor: '#1976d2' }
// // //             }}
// // //             onClick={() => openProductSelector('monture')}
// // //           >
// // //             <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 Monture
// // //               </Typography>
// // //               <VisibilityIcon fontSize="small" color="action" />
// // //             </Box>
// // //             {ficheData.montureNom ? (
// // //               <Box>
// // //                 <Typography variant="body2" fontWeight={600}>
// // //                   {ficheData.montureNom}
// // //                 </Typography>
// // //                 <TextField
// // //                   size="small"
// // //                   label="Prix (DH)"
// // //                   type="number"
// // //                   value={ficheData.prixMonture}
// // //                   onChange={(e) => handlePriceChange('prixMonture', e.target.value)}
// // //                   sx={{ mt: 1, width: '100px' }}
// // //                 />
// // //               </Box>
// // //             ) : (
// // //               <Typography variant="body2" color="text.secondary">
// // //                 Cliquer pour sélectionner
// // //               </Typography>
// // //             )}
// // //           </Paper>
// // //           {errors.monture && (
// // //             <Typography variant="caption" color="error">
// // //               {errors.monture}
// // //             </Typography>
// // //           )}
// // //         </Grid>

// // //         {/* Verre OD */}
// // //         <Grid item xs={4}>
// // //           <Paper 
// // //             sx={{ 
// // //               p: 2, 
// // //               border: errors.verreOD ? '2px solid #d32f2f' : '1px solid #e0e0e0',
// // //               borderRadius: '8px',
// // //               cursor: 'pointer',
// // //               '&:hover': { borderColor: '#1976d2' }
// // //             }}
// // //             onClick={() => openProductSelector('verreOD')}
// // //           >
// // //             <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 Verre Œil Droit
// // //               </Typography>
// // //               <VisibilityIcon fontSize="small" color="action" />
// // //             </Box>
// // //             {ficheData.verreODNom ? (
// // //               <Box>
// // //                 <Typography variant="body2" fontWeight={600}>
// // //                   {ficheData.verreODNom}
// // //                 </Typography>
// // //                 <TextField
// // //                   size="small"
// // //                   label="Prix (DH)"
// // //                   type="number"
// // //                   value={ficheData.prixVerreOD}
// // //                   onChange={(e) => handlePriceChange('prixVerreOD', e.target.value)}
// // //                   sx={{ mt: 1, width: '100px' }}
// // //                 />
// // //               </Box>
// // //             ) : (
// // //               <Typography variant="body2" color="text.secondary">
// // //                 Cliquer pour sélectionner
// // //               </Typography>
// // //             )}
// // //           </Paper>
// // //           {errors.verreOD && (
// // //             <Typography variant="caption" color="error">
// // //               {errors.verreOD}
// // //             </Typography>
// // //           )}
// // //         </Grid>

// // //         {/* Verre OG */}
// // //         <Grid item xs={4}>
// // //           <Paper 
// // //             sx={{ 
// // //               p: 2, 
// // //               border: errors.verreOG ? '2px solid #d32f2f' : '1px solid #e0e0e0',
// // //               borderRadius: '8px',
// // //               cursor: 'pointer',
// // //               '&:hover': { borderColor: '#1976d2' }
// // //             }}
// // //             onClick={() => openProductSelector('verreOG')}
// // //           >
// // //             <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
// // //               <Typography variant="subtitle2" color="text.secondary">
// // //                 Verre Œil Gauche
// // //               </Typography>
// // //               <VisibilityIcon fontSize="small" color="action" />
// // //             </Box>
// // //             {ficheData.verreOGNom ? (
// // //               <Box>
// // //                 <Typography variant="body2" fontWeight={600}>
// // //                   {ficheData.verreOGNom}
// // //                 </Typography>
// // //                 <TextField
// // //                   size="small"
// // //                   label="Prix (DH)"
// // //                   type="number"
// // //                   value={ficheData.prixVerreOG}
// // //                   onChange={(e) => handlePriceChange('prixVerreOG', e.target.value)}
// // //                   sx={{ mt: 1, width: '100px' }}
// // //                 />
// // //               </Box>
// // //             ) : (
// // //               <Typography variant="body2" color="text.secondary">
// // //                 Cliquer pour sélectionner
// // //               </Typography>
// // //             )}
// // //           </Paper>
// // //           {errors.verreOG && (
// // //             <Typography variant="caption" color="error">
// // //               {errors.verreOG}
// // //             </Typography>
// // //           )}
// // //         </Grid>
// // //       </Grid>

// // //       {/* Ligne 2: Mesures oculaires */}
// // //       <Grid container spacing={2} sx={{ mb: 3 }}>
// // //         {/* Mesures OD */}
// // //         <Grid item xs={6}>
// // //           <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0' }}>
// // //             <Typography variant="subtitle2" gutterBottom>
// // //               Mesures Œil Droit
// // //             </Typography>
// // //             <Grid container spacing={1}>
// // //               <Grid item xs={4}>
// // //                 <TextField
// // //                   size="small"
// // //                   label="SPH"
// // //                   type="number"
// // //                   step="0.25"
// // //                   value={ficheData.mesuresOD.sph}
// // //                   onChange={(e) => handleMesuresChange('OD', 'sph', e.target.value)}
// // //                   error={!!errors.mesuresOD}
// // //                 />
// // //               </Grid>
// // //               <Grid item xs={4}>
// // //                 <TextField
// // //                   size="small"
// // //                   label="CYL"
// // //                   type="number"
// // //                   step="0.25"
// // //                   value={ficheData.mesuresOD.cyl}
// // //                   onChange={(e) => handleMesuresChange('OD', 'cyl', e.target.value)}
// // //                 />
// // //               </Grid>
// // //               <Grid item xs={4}>
// // //                 <TextField
// // //                   size="small"
// // //                   label="AXE"
// // //                   type="number"
// // //                   value={ficheData.mesuresOD.axe}
// // //                   onChange={(e) => handleMesuresChange('OD', 'axe', e.target.value)}
// // //                 />
// // //               </Grid>
// // //             </Grid>
// // //             {errors.mesuresOD && (
// // //               <Typography variant="caption" color="error">
// // //                 {errors.mesuresOD}
// // //               </Typography>
// // //             )}
// // //           </Paper>
// // //         </Grid>

// // //         {/* Mesures OG */}
// // //         <Grid item xs={6}>
// // //           <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0' }}>
// // //             <Typography variant="subtitle2" gutterBottom>
// // //               Mesures Œil Gauche
// // //             </Typography>
// // //             <Grid container spacing={1}>
// // //               <Grid item xs={4}>
// // //                 <TextField
// // //                   size="small"
// // //                   label="SPH"
// // //                   type="number"
// // //                   step="0.25"
// // //                   value={ficheData.mesuresOG.sph}
// // //                   onChange={(e) => handleMesuresChange('OG', 'sph', e.target.value)}
// // //                   error={!!errors.mesuresOG}
// // //                 />
// // //               </Grid>
// // //               <Grid item xs={4}>
// // //                 <TextField
// // //                   size="small"
// // //                   label="CYL"
// // //                   type="number"
// // //                   step="0.25"
// // //                   value={ficheData.mesuresOG.cyl}
// // //                   onChange={(e) => handleMesuresChange('OG', 'cyl', e.target.value)}
// // //                 />
// // //               </Grid>
// // //               <Grid item xs={4}>
// // //                 <TextField
// // //                   size="small"
// // //                   label="AXE"
// // //                   type="number"
// // //                   value={ficheData.mesuresOG.axe}
// // //                   onChange={(e) => handleMesuresChange('OG', 'axe', e.target.value)}
// // //                 />
// // //               </Grid>
// // //             </Grid>
// // //             {errors.mesuresOG && (
// // //               <Typography variant="caption" color="error">
// // //                 {errors.mesuresOG}
// // //               </Typography>
// // //             )}
// // //           </Paper>
// // //         </Grid>
// // //       </Grid>

// // //       {/* Ligne 3: Accessoires */}
// // //       <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0', mb: 3 }}>
// // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // //           <Typography variant="subtitle2">
// // //             Accessoires ({ficheData.accessoires.length}/3)
// // //           </Typography>
// // //           {ficheData.accessoires.length < 3 && (
// // //             <Button
// // //               size="small"
// // //               startIcon={<AddIcon />}
// // //               onClick={() => openProductSelector('accessoire')}
// // //             >
// // //               Ajouter
// // //             </Button>
// // //           )}
// // //         </Box>

// // //         {ficheData.accessoires.length === 0 ? (
// // //           <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
// // //             Aucun accessoire ajouté
// // //           </Typography>
// // //         ) : (
// // //           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
// // //             {ficheData.accessoires.map((accessoire, index) => (
// // //               <Chip
// // //                 key={index}
// // //                 label={`${accessoire.accessoireNom} - ${accessoire.prixAccessoire} DH`}
// // //                 onDelete={() => removeAccessoire(index)}
// // //                 deleteIcon={<DeleteIcon />}
// // //                 variant="outlined"
// // //                 sx={{ maxWidth: 300 }}
// // //               />
// // //             ))}
// // //           </Box>
// // //         )}
// // //       </Paper>

// // //       {/* Total et bouton d'ajout */}
// // //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // //         <Typography variant="h6" fontWeight={700}>
// // //           Total de la fiche: {ficheData.totalFiche.toFixed(2)} DH
// // //         </Typography>
        
// // //         <Button
// // //           variant="contained"
// // //           size="large"
// // //           onClick={handleSubmit}
// // //           startIcon={<AddIcon />}
// // //           sx={{
// // //             textTransform: 'none',
// // //             borderRadius: '8px',
// // //             px: 4
// // //           }}
// // //         >
// // //           {editMode ? 'Modifier la fiche' : 'Ajouter la fiche'}
// // //         </Button>
// // //       </Box>

// // //       {/* Erreurs générales */}
// // //       {Object.keys(errors).length > 0 && (
// // //         <Alert severity="error" sx={{ mt: 2 }}>
// // //           Veuillez corriger les erreurs avant d'ajouter la fiche
// // //         </Alert>
// // //       )}

// // //       {/* Product Selector Modal */}
// // //       <ProductSelector
// // //         open={showProductSelector}
// // //         type={selectorType}
// // //         onClose={() => setShowProductSelector(false)}
// // //         onSelect={handleProductSelect}
// // //       />
// // //     </Box>
// // //   );
// // // }

// // // export default FicheForm;






// // // // // src/components/Vente/FicheForm.jsx
// // // // import React, { useState } from 'react';
// // // // import {
// // // //   Box,
// // // //   Button,
// // // //   TextField,
// // // //   Typography,
// // // //   Paper,
// // // //   Grid,
// // // //   // IconButton,
// // // //   Chip,
// // // //   Alert
// // // // } from '@mui/material';
// // // // import AddIcon from '@mui/icons-material/Add';
// // // // import VisibilityIcon from '@mui/icons-material/Visibility';
// // // // import DeleteIcon from '@mui/icons-material/Delete';

// // // // import ProductSelector from './ProductSelector';

// // // // const initialFicheState = {
// // // //   montureId: null,
// // // //   montureNom: '',
// // // //   prixMonture: 0,
// // // //   verreODId: null,
// // // //   verreODNom: '',
// // // //   prixVerreOD: 0,
// // // //   verreOGId: null,
// // // //   verreOGNom: '',
// // // //   prixVerreOG: 0,
// // // //   mesuresOD: {
// // // //     sph: '',
// // // //     cyl: '',
// // // //     axe: ''
// // // //   },
// // // //   mesuresOG: {
// // // //     sph: '',
// // // //     cyl: '',
// // // //     axe: ''
// // // //   },
// // // //   accessoires: [],
// // // //   totalFiche: 0
// // // // };

// // // // function FicheForm({ onAddFiche, editMode = false, initialData = null }) {
// // // //   const [ficheData, setFicheData] = useState(
// // // //     editMode && initialData ? initialData : initialFicheState
// // // //   );
// // // //   const [errors, setErrors] = useState({});
// // // //   const [showProductSelector, setShowProductSelector] = useState(false);
// // // //   const [selectorType, setSelectorType] = useState('');

// // // //   const handleProductSelect = (product, type, customPrice = null) => {
// // // //     switch (type) {
// // // //       case 'monture':
// // // //         setFicheData(prev => ({
// // // //           ...prev,
// // // //           montureId: product.id,
// // // //           montureNom: `${product.marque} ${product.reference}`,
// // // //           prixMonture: customPrice || product.prixVente
// // // //         }));
// // // //         break;
// // // //       case 'verreOD':
// // // //         setFicheData(prev => ({
// // // //           ...prev,
// // // //           verreODId: product.id,
// // // //           verreODNom: product.nom,
// // // //           prixVerreOD: customPrice || product.prixVente
// // // //         }));
// // // //         break;
// // // //       case 'verreOG':
// // // //         setFicheData(prev => ({
// // // //           ...prev,
// // // //           verreOGId: product.id,
// // // //           verreOGNom: product.nom,
// // // //           prixVerreOG: customPrice || product.prixVente
// // // //         }));
// // // //         break;
// // // //       case 'accessoire':
// // // //         if (ficheData.accessoires.length < 3) {
// // // //           const newAccessoire = {
// // // //             accessoireId: product.id,
// // // //             accessoireNom: product.nom,
// // // //             accessoireReference: product.reference,
// // // //             prixAccessoire: customPrice || product.prixVente,
// // // //             ordre: ficheData.accessoires.length + 1
// // // //           };
// // // //           setFicheData(prev => ({
// // // //             ...prev,
// // // //             accessoires: [...prev.accessoires, newAccessoire]
// // // //           }));
// // // //         }
// // // //         break;
// // // //     }
// // // //     setShowProductSelector(false);
// // // //     calculateTotal();
// // // //   };

// // // //   const handleMesuresChange = (oeil, field, value) => {
// // // //     setFicheData(prev => ({
// // // //       ...prev,
// // // //       [`mesures${oeil}`]: {
// // // //         ...prev[`mesures${oeil}`],
// // // //         [field]: value
// // // //       }
// // // //     }));
// // // //   };

// // // //   const handlePriceChange = (field, value) => {
// // // //     setFicheData(prev => ({
// // // //       ...prev,
// // // //       [field]: parseFloat(value) || 0
// // // //     }));
// // // //     setTimeout(calculateTotal, 100);
// // // //   };

// // // //   const removeAccessoire = (index) => {
// // // //     setFicheData(prev => ({
// // // //       ...prev,
// // // //       accessoires: prev.accessoires.filter((_, i) => i !== index)
// // // //     }));
// // // //     calculateTotal();
// // // //   };

// // // //   const calculateTotal = () => {
// // // //     setTimeout(() => {
// // // //       const total = 
// // // //         (ficheData.prixMonture || 0) +
// // // //         (ficheData.prixVerreOD || 0) +
// // // //         (ficheData.prixVerreOG || 0) +
// // // //         ficheData.accessoires.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0);
      
// // // //       setFicheData(prev => ({
// // // //         ...prev,
// // // //         totalFiche: total
// // // //       }));
// // // //     }, 50);
// // // //   };

// // // //   const validateFiche = () => {
// // // //     const newErrors = {};
    
// // // //     if (!ficheData.montureId) newErrors.monture = "Sélectionnez une monture";
// // // //     if (!ficheData.verreODId) newErrors.verreOD = "Sélectionnez un verre pour l'œil droit";
// // // //     if (!ficheData.verreOGId) newErrors.verreOG = "Sélectionnez un verre pour l'œil gauche";
    
// // // //     // Validation des mesures
// // // //     if (!ficheData.mesuresOD.sph && ficheData.mesuresOD.sph !== 0) {
// // // //       newErrors.mesuresOD = "Renseignez les mesures de l'œil droit";
// // // //     }
// // // //     if (!ficheData.mesuresOG.sph && ficheData.mesuresOG.sph !== 0) {
// // // //       newErrors.mesuresOG = "Renseignez les mesures de l'œil gauche";
// // // //     }
    
// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   const handleSubmit = () => {
// // // //     if (validateFiche()) {
// // // //       onAddFiche(ficheData);
// // // //       setFicheData(initialFicheState);
// // // //       setErrors({});
// // // //     }
// // // //   };

// // // //   const openProductSelector = (type) => {
// // // //     setSelectorType(type);
// // // //     setShowProductSelector(true);
// // // //   };

// // // //   return (
// // // //     <Box>
// // // //       <Typography variant="h6" gutterBottom>
// // // //         {editMode ? 'Modifier la fiche' : 'Ajouter une fiche'}
// // // //       </Typography>

// // // //       {/* Ligne 1: Sélection des produits principaux */}
// // // //       <Grid container spacing={2} sx={{ mb: 3 }}>
// // // //         {/* Monture */}
// // // //         <Grid item xs={4}>
// // // //           <Paper 
// // // //             sx={{ 
// // // //               p: 2, 
// // // //               border: errors.monture ? '2px solid #d32f2f' : '1px solid #e0e0e0',
// // // //               borderRadius: '8px',
// // // //               cursor: 'pointer',
// // // //               '&:hover': { borderColor: '#1976d2' }
// // // //             }}
// // // //             onClick={() => openProductSelector('monture')}
// // // //           >
// // // //             <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
// // // //               <Typography variant="subtitle2" color="text.secondary">
// // // //                 Monture
// // // //               </Typography>
// // // //               <VisibilityIcon fontSize="small" color="action" />
// // // //             </Box>
// // // //             {ficheData.montureNom ? (
// // // //               <Box>
// // // //                 <Typography variant="body2" fontWeight={600}>
// // // //                   {ficheData.montureNom}
// // // //                 </Typography>
// // // //                 <TextField
// // // //                   size="small"
// // // //                   label="Prix (DH)"
// // // //                   type="number"
// // // //                   value={ficheData.prixMonture}
// // // //                   onChange={(e) => handlePriceChange('prixMonture', e.target.value)}
// // // //                   sx={{ mt: 1, width: '100px' }}
// // // //                 />
// // // //               </Box>
// // // //             ) : (
// // // //               <Typography variant="body2" color="text.secondary">
// // // //                 Cliquer pour sélectionner
// // // //               </Typography>
// // // //             )}
// // // //           </Paper>
// // // //           {errors.monture && (
// // // //             <Typography variant="caption" color="error">
// // // //               {errors.monture}
// // // //             </Typography>
// // // //           )}
// // // //         </Grid>

// // // //         {/* Verre OD */}
// // // //         <Grid item xs={4}>
// // // //           <Paper 
// // // //             sx={{ 
// // // //               p: 2, 
// // // //               border: errors.verreOD ? '2px solid #d32f2f' : '1px solid #e0e0e0',
// // // //               borderRadius: '8px',
// // // //               cursor: 'pointer',
// // // //               '&:hover': { borderColor: '#1976d2' }
// // // //             }}
// // // //             onClick={() => openProductSelector('verreOD')}
// // // //           >
// // // //             <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
// // // //               <Typography variant="subtitle2" color="text.secondary">
// // // //                 Verre Œil Droit
// // // //               </Typography>
// // // //               <VisibilityIcon fontSize="small" color="action" />
// // // //             </Box>
// // // //             {ficheData.verreODNom ? (
// // // //               <Box>
// // // //                 <Typography variant="body2" fontWeight={600}>
// // // //                   {ficheData.verreODNom}
// // // //                 </Typography>
// // // //                 <TextField
// // // //                   size="small"
// // // //                   label="Prix (DH)"
// // // //                   type="number"
// // // //                   value={ficheData.prixVerreOD}
// // // //                   onChange={(e) => handlePriceChange('prixVerreOD', e.target.value)}
// // // //                   sx={{ mt: 1, width: '100px' }}
// // // //                 />
// // // //               </Box>
// // // //             ) : (
// // // //               <Typography variant="body2" color="text.secondary">
// // // //                 Cliquer pour sélectionner
// // // //               </Typography>
// // // //             )}
// // // //           </Paper>
// // // //           {errors.verreOD && (
// // // //             <Typography variant="caption" color="error">
// // // //               {errors.verreOD}
// // // //             </Typography>
// // // //           )}
// // // //         </Grid>

// // // //         {/* Verre OG */}
// // // //         <Grid item xs={4}>
// // // //           <Paper 
// // // //             sx={{ 
// // // //               p: 2, 
// // // //               border: errors.verreOG ? '2px solid #d32f2f' : '1px solid #e0e0e0',
// // // //               borderRadius: '8px',
// // // //               cursor: 'pointer',
// // // //               '&:hover': { borderColor: '#1976d2' }
// // // //             }}
// // // //             onClick={() => openProductSelector('verreOG')}
// // // //           >
// // // //             <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 1 }}>
// // // //               <Typography variant="subtitle2" color="text.secondary">
// // // //                 Verre Œil Gauche
// // // //               </Typography>
// // // //               <VisibilityIcon fontSize="small" color="action" />
// // // //             </Box>
// // // //             {ficheData.verreOGNom ? (
// // // //               <Box>
// // // //                 <Typography variant="body2" fontWeight={600}>
// // // //                   {ficheData.verreOGNom}
// // // //                 </Typography>
// // // //                 <TextField
// // // //                   size="small"
// // // //                   label="Prix (DH)"
// // // //                   type="number"
// // // //                   value={ficheData.prixVerreOG}
// // // //                   onChange={(e) => handlePriceChange('prixVerreOG', e.target.value)}
// // // //                   sx={{ mt: 1, width: '100px' }}
// // // //                 />
// // // //               </Box>
// // // //             ) : (
// // // //               <Typography variant="body2" color="text.secondary">
// // // //                 Cliquer pour sélectionner
// // // //               </Typography>
// // // //             )}
// // // //           </Paper>
// // // //           {errors.verreOG && (
// // // //             <Typography variant="caption" color="error">
// // // //               {errors.verreOG}
// // // //             </Typography>
// // // //           )}
// // // //         </Grid>
// // // //       </Grid>

// // // //       {/* Ligne 2: Mesures oculaires */}
// // // //       <Grid container spacing={2} sx={{ mb: 3 }}>
// // // //         {/* Mesures OD */}
// // // //         <Grid item xs={6}>
// // // //           <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0' }}>
// // // //             <Typography variant="subtitle2" gutterBottom>
// // // //               Mesures Œil Droit
// // // //             </Typography>
// // // //             <Grid container spacing={1}>
// // // //               <Grid item xs={4}>
// // // //                 <TextField
// // // //                   size="small"
// // // //                   label="SPH"
// // // //                   type="number"
// // // //                   step="0.25"
// // // //                   value={ficheData.mesuresOD.sph}
// // // //                   onChange={(e) => handleMesuresChange('OD', 'sph', e.target.value)}
// // // //                   error={!!errors.mesuresOD}
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={4}>
// // // //                 <TextField
// // // //                   size="small"
// // // //                   label="CYL"
// // // //                   type="number"
// // // //                   step="0.25"
// // // //                   value={ficheData.mesuresOD.cyl}
// // // //                   onChange={(e) => handleMesuresChange('OD', 'cyl', e.target.value)}
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={4}>
// // // //                 <TextField
// // // //                   size="small"
// // // //                   label="AXE"
// // // //                   type="number"
// // // //                   value={ficheData.mesuresOD.axe}
// // // //                   onChange={(e) => handleMesuresChange('OD', 'axe', e.target.value)}
// // // //                 />
// // // //               </Grid>
// // // //             </Grid>
// // // //             {errors.mesuresOD && (
// // // //               <Typography variant="caption" color="error">
// // // //                 {errors.mesuresOD}
// // // //               </Typography>
// // // //             )}
// // // //           </Paper>
// // // //         </Grid>

// // // //         {/* Mesures OG */}
// // // //         <Grid item xs={6}>
// // // //           <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0' }}>
// // // //             <Typography variant="subtitle2" gutterBottom>
// // // //               Mesures Œil Gauche
// // // //             </Typography>
// // // //             <Grid container spacing={1}>
// // // //               <Grid item xs={4}>
// // // //                 <TextField
// // // //                   size="small"
// // // //                   label="SPH"
// // // //                   type="number"
// // // //                   step="0.25"
// // // //                   value={ficheData.mesuresOG.sph}
// // // //                   onChange={(e) => handleMesuresChange('OG', 'sph', e.target.value)}
// // // //                   error={!!errors.mesuresOG}
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={4}>
// // // //                 <TextField
// // // //                   size="small"
// // // //                   label="CYL"
// // // //                   type="number"
// // // //                   step="0.25"
// // // //                   value={ficheData.mesuresOG.cyl}
// // // //                   onChange={(e) => handleMesuresChange('OG', 'cyl', e.target.value)}
// // // //                 />
// // // //               </Grid>
// // // //               <Grid item xs={4}>
// // // //                 <TextField
// // // //                   size="small"
// // // //                   label="AXE"
// // // //                   type="number"
// // // //                   value={ficheData.mesuresOG.axe}
// // // //                   onChange={(e) => handleMesuresChange('OG', 'axe', e.target.value)}
// // // //                 />
// // // //               </Grid>
// // // //             </Grid>
// // // //             {errors.mesuresOG && (
// // // //               <Typography variant="caption" color="error">
// // // //                 {errors.mesuresOG}
// // // //               </Typography>
// // // //             )}
// // // //           </Paper>
// // // //         </Grid>
// // // //       </Grid>

// // // //       {/* Ligne 3: Accessoires */}
// // // //       <Paper sx={{ p: 2, borderRadius: '8px', border: '1px solid #e0e0e0', mb: 3 }}>
// // // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // // //           <Typography variant="subtitle2">
// // // //             Accessoires ({ficheData.accessoires.length}/3)
// // // //           </Typography>
// // // //           {ficheData.accessoires.length < 3 && (
// // // //             <Button
// // // //               size="small"
// // // //               startIcon={<AddIcon />}
// // // //               onClick={() => openProductSelector('accessoire')}
// // // //             >
// // // //               Ajouter
// // // //             </Button>
// // // //           )}
// // // //         </Box>

// // // //         {ficheData.accessoires.length === 0 ? (
// // // //           <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
// // // //             Aucun accessoire ajouté
// // // //           </Typography>
// // // //         ) : (
// // // //           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
// // // //             {ficheData.accessoires.map((accessoire, index) => (
// // // //               <Chip
// // // //                 key={index}
// // // //                 label={`${accessoire.accessoireNom} - ${accessoire.prixAccessoire} DH`}
// // // //                 onDelete={() => removeAccessoire(index)}
// // // //                 deleteIcon={<DeleteIcon />}
// // // //                 variant="outlined"
// // // //                 sx={{ maxWidth: 300 }}
// // // //               />
// // // //             ))}
// // // //           </Box>
// // // //         )}
// // // //       </Paper>

// // // //       {/* Total et bouton d'ajout */}
// // // //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // // //         <Typography variant="h6" fontWeight={700}>
// // // //           Total de la fiche: {ficheData.totalFiche.toFixed(2)} DH
// // // //         </Typography>
        
// // // //         <Button
// // // //           variant="contained"
// // // //           size="large"
// // // //           onClick={handleSubmit}
// // // //           startIcon={<AddIcon />}
// // // //           sx={{
// // // //             textTransform: 'none',
// // // //             borderRadius: '8px',
// // // //             px: 4
// // // //           }}
// // // //         >
// // // //           {editMode ? 'Modifier la fiche' : 'Ajouter la fiche'}
// // // //         </Button>
// // // //       </Box>

// // // //       {/* Erreurs générales */}
// // // //       {Object.keys(errors).length > 0 && (
// // // //         <Alert severity="error" sx={{ mt: 2 }}>
// // // //           Veuillez corriger les erreurs avant d'ajouter la fiche
// // // //         </Alert>
// // // //       )}

// // // //       {/* Product Selector Modal */}
// // // //       <ProductSelector
// // // //         open={showProductSelector}
// // // //         type={selectorType}
// // // //         onClose={() => setShowProductSelector(false)}
// // // //         onSelect={handleProductSelect}
// // // //       />
// // // //     </Box>
// // // //   );
// // // // }

// // // // export default FicheForm;