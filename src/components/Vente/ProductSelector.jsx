// src/components/Vente/ProductSelector.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  List,
  ListItemButton,
  Paper,
  Chip,
  InputAdornment,
  Tabs,
  Tab,
  Avatar,
  Grid,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CategoryIcon from '@mui/icons-material/Category';
import LensIcon from '@mui/icons-material/Lens';
import InventoryIcon from '@mui/icons-material/Inventory';

import { 
  fetchAllMontures, 
  fetchAllVerres, 
  fetchAllAccessoires 
} from '../../api/venteApi';

// Import the image URL helper function
import { getImageUrl } from '../../api/montureApi';

function ProductSelector({ open, type, onClose, onSelect }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customPrice, setCustomPrice] = useState('');
  const [filterTab, setFilterTab] = useState(0);

  useEffect(() => {
    if (open && type) {
      loadProducts();
    }
  }, [open, type]);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, filterTab]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      let data = [];
      
      switch (type) {
        case 'monture':
          data = await fetchAllMontures();
          break;
        case 'verreOD':
        case 'verreOG':
          data = await fetchAllVerres();
          break;
        case 'accessoire':
          data = await fetchAllAccessoires();
          break;
      }
      
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products.filter(product => {
      const searchFields = getSearchFields(product);
      return searchFields.some(field => 
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Filtres spécifiques selon le type
    if (type === 'monture' && filterTab > 0) {
      const filters = ['', 'HOMME', 'FEMME', 'MIXTE', 'ENFANT'];
      if (filters[filterTab]) {
        filtered = filtered.filter(p => p.genre === filters[filterTab]);
      }
    }

    if (type.includes('verre') && filterTab > 0) {
      const filters = ['', 'Unifocal', 'Progressif', 'Bifocal'];
      if (filters[filterTab]) {
        filtered = filtered.filter(p => p.foyer === filters[filterTab]);
      }
    }

    setFilteredProducts(filtered);
  };

  const getSearchFields = (product) => {
    switch (type) {
      case 'monture':
        return [product.marque, product.reference, product.couleur, product.forme];
      case 'verreOD':
      case 'verreOG':
        return [product.nom, product.nomInterne, product.foyer, product.matiere];
      case 'accessoire':
        return [product.nom, product.reference, product.marque, product.description];
      default:
        return [];
    }
  };

  const getProductTitle = () => {
    switch (type) {
      case 'monture': return 'Sélectionner une monture';
      case 'verreOD': return 'Sélectionner un verre pour l\'œil droit';
      case 'verreOG': return 'Sélectionner un verre pour l\'œil gauche';
      case 'accessoire': return 'Sélectionner un accessoire';
      default: return 'Sélectionner un produit';
    }
  };

  const getProductIcon = () => {
    switch (type) {
      case 'monture': return <VisibilityIcon />;
      case 'verreOD':
      case 'verreOG': return <LensIcon />;
      case 'accessoire': return <InventoryIcon />;
      default: return <CategoryIcon />;
    }
  };

  const getTabsForType = () => {
    switch (type) {
      case 'monture':
        return ['Tous', 'Homme', 'Femme', 'Mixte', 'Enfant'];
      case 'verreOD':
      case 'verreOG':
        return ['Tous', 'Unifocal', 'Progressif', 'Bifocal'];
      default:
        return ['Tous'];
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCustomPrice(product.prixVente?.toString() || '');
  };

  const handleConfirmSelection = () => {
    if (selectedProduct) {
      const finalPrice = parseFloat(customPrice) || selectedProduct.prixVente;
      onSelect(selectedProduct, type, finalPrice);
    }
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setCustomPrice('');
    setSearchTerm('');
    setFilterTab(0);
    onClose();
  };

  // Component to render product avatar with image for montures
  const ProductAvatar = ({ product }) => {
    if (type === 'monture' && product.image) {
      return (
        <Avatar 
          src={getImageUrl(product.image)}
          sx={{ 
            width: 56, 
            height: 56, 
            borderRadius: '8px',
            border: '2px solid #e0e0e0'
          }}
          variant="rounded"
        >
          {product.marque?.charAt(0) || '?'}
        </Avatar>
      );
    }
    
    // Fallback to icon for non-monture products or montures without images
    return (
      <Avatar sx={{ 
        backgroundColor: '#f5f5f5', 
        color: '#666',
        width: 56,
        height: 56
      }}>
        {getProductIcon()}
      </Avatar>
    );
  };

  const renderProductCard = (product) => {
    const isSelected = selectedProduct?.id === product.id;
    
    return (
      <ListItemButton
        key={product.id}
        onClick={() => handleProductSelect(product)}
        selected={isSelected}
        sx={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          mb: 1,
          py: 2,
          '&.Mui-selected': {
            backgroundColor: '#e3f2fd',
            borderColor: '#1976d2',
          },
          '&:hover': {
            borderColor: '#1976d2',
            backgroundColor: '#f8f9fa',
          }
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={1}>
              <ProductAvatar product={product} />
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight={600}>
                {type === 'monture' 
                  ? `${product.marque} ${product.reference}`
                  : product.nom
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {type === 'monture' && (
                  <>Couleur: {product.couleur} • Genre: {product.genre}</>
                )}
                {type.includes('verre') && (
                  <>Type: {product.foyer} • Matière: {product.matiere}</>
                )}
                {type === 'accessoire' && (
                  <>Ref: {product.reference} • {product.marque}</>
                )}
              </Typography>
            </Grid>
            
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={700} color="primary">
                  {product.prixVente?.toFixed(2)} DH
                </Typography>
                {product.remiseClient > 0 && (
                  <Chip 
                    label={`-${product.remiseClient}%`} 
                    size="small" 
                    color="success"
                    sx={{ fontSize: '0.7rem' }}
                  />
                )}
              </Box>
            </Grid>
            
            <Grid item xs={2}>
              {type === 'monture' && (
                <Box>
                  <Chip label={product.forme} size="small" variant="outlined" />
                  <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                    Matière: {product.matiere}
                  </Typography>
                </Box>
              )}
              {type === 'accessoire' && (
                <Box>
                  <Typography variant="caption" display="block">
                    Stock: {product.quantiteStock}
                  </Typography>
                  <Chip 
                    label="Disponible" 
                    size="small" 
                    color="success"
                    sx={{ fontSize: '0.7rem', mt: 0.5 }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </ListItemButton>
    );
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="lg" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: '16px', maxHeight: '90vh' }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ backgroundColor: '#1976d2' }}>
            {getProductIcon()}
          </Avatar>
          <Typography variant="h5" fontWeight={700}>
            {getProductTitle()}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Search and Filters */}
        <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
          <TextField
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            size="small"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Tabs for filtering */}
          {getTabsForType().length > 1 && (
            <Tabs 
              value={filterTab} 
              onChange={(e, newValue) => setFilterTab(newValue)}
              sx={{ 
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600
                }
              }}
            >
              {getTabsForType().map((label, index) => (
                <Tab key={index} label={label} />
              ))}
            </Tabs>
          )}
        </Box>

        {/* Products List */}
        <Box sx={{ p: 3, maxHeight: 400, overflow: 'auto' }}>
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography>Chargement des produits...</Typography>
            </Box>
          ) : filteredProducts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                Aucun produit trouvé
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {filteredProducts.map(renderProductCard)}
            </List>
          )}
        </Box>

        {/* Product Details & Price Modification */}
        {selectedProduct && (
          <Box sx={{ p: 3, backgroundColor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
            <Typography variant="h6" gutterBottom>
              Produit sélectionné
            </Typography>
            
            <Paper sx={{ p: 2, mb: 2, borderRadius: '8px' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  {/* Larger image in selected product section */}
                  {type === 'monture' && selectedProduct.image ? (
                    <Avatar 
                      src={getImageUrl(selectedProduct.image)}
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        borderRadius: '12px',
                        border: '3px solid #1976d2'
                      }}
                      variant="rounded"
                    >
                      {selectedProduct.marque?.charAt(0) || '?'}
                    </Avatar>
                  ) : (
                    <Avatar sx={{ 
                      backgroundColor: '#1976d2', 
                      color: 'white',
                      width: 80,
                      height: 80
                    }}>
                      {getProductIcon()}
                    </Avatar>
                  )}
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {type === 'monture' 
                      ? `${selectedProduct.marque} ${selectedProduct.reference}`
                      : selectedProduct.nom
                    }
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Réf: {selectedProduct.reference || selectedProduct.nomInterne}
                  </Typography>
                  
                  {/* Détails spécifiques */}
                  {type === 'monture' && (
                    <Box sx={{ mt: 1 }}>
                      <Chip label={selectedProduct.forme} size="small" sx={{ mr: 1 }} />
                      <Chip label={selectedProduct.genre} size="small" sx={{ mr: 1 }} />
                      <Chip label={selectedProduct.matiere} size="small" />
                    </Box>
                  )}
                  
                  {type.includes('verre') && (
                    <Box sx={{ mt: 1 }}>
                      <Chip label={selectedProduct.foyer} size="small" sx={{ mr: 1 }} />
                      <Chip label={`Indice ${selectedProduct.indice}`} size="small" sx={{ mr: 1 }} />
                      <Chip 
                        label={selectedProduct.gamme} 
                        size="small" 
                        color={selectedProduct.gamme === 'HAUTE' ? 'error' : 'default'}
                      />
                    </Box>
                  )}
                  
                  {type === 'accessoire' && selectedProduct.description && (
                    <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                      {selectedProduct.description}
                    </Typography>
                  )}
                </Grid>
                
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" color="text.secondary">
                      Prix de vente recommandé
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="text.secondary">
                      {selectedProduct.prixVente?.toFixed(2)} DH
                    </Typography>
                    
                    <TextField
                      label="Prix final"
                      type="number"
                      step="0.01"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      size="small"
                      sx={{ mt: 1 }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">DH</InputAdornment>,
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Prix final: <strong>{parseFloat(customPrice || 0).toFixed(2)} DH</strong>
              </Typography>
              
              {parseFloat(customPrice) !== selectedProduct.prixVente && (
                <Chip 
                  label={`${parseFloat(customPrice) > selectedProduct.prixVente ? '+' : ''}${(parseFloat(customPrice) - selectedProduct.prixVente).toFixed(2)} DH`}
                  color={parseFloat(customPrice) > selectedProduct.prixVente ? 'error' : 'success'}
                  size="small"
                />
              )}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>
          Annuler
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirmSelection}
          disabled={!selectedProduct}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            px: 3
          }}
        >
          Sélectionner ce produit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductSelector;


// // src/components/Vente/ProductSelector.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Box,
//   Typography,
//   List,
//   // ListItem,
//   // ListItemText,
//   ListItemButton,
//   Paper,
//   Chip,
//   InputAdornment,
//   Tabs,
//   Tab,
//   Avatar,
//   Grid,
//   Divider
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import CategoryIcon from '@mui/icons-material/Category';
// import LensIcon from '@mui/icons-material/Lens';
// import InventoryIcon from '@mui/icons-material/Inventory';

// import { 
//   fetchAllMontures, 
//   fetchAllVerres, 
//   fetchAllAccessoires 
// } from '../../api/venteApi';

// function ProductSelector({ open, type, onClose, onSelect }) {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [customPrice, setCustomPrice] = useState('');
//   const [filterTab, setFilterTab] = useState(0);

//   useEffect(() => {
//     if (open && type) {
//       loadProducts();
//     }
//   }, [open, type]);

//   useEffect(() => {
//     filterProducts();
//   }, [products, searchTerm, filterTab]);

//   const loadProducts = async () => {
//     try {
//       setLoading(true);
//       let data = [];
      
//       switch (type) {
//         case 'monture':
//           data = await fetchAllMontures();
//           break;
//         case 'verreOD':
//         case 'verreOG':
//           data = await fetchAllVerres();
//           break;
//         case 'accessoire':
//           data = await fetchAllAccessoires();
//           break;
//       }
      
//       setProducts(data);
//     } catch (error) {
//       console.error('Error loading products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterProducts = () => {
//     let filtered = products.filter(product => {
//       const searchFields = getSearchFields(product);
//       return searchFields.some(field => 
//         field?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     });

//     // Filtres spécifiques selon le type
//     if (type === 'monture' && filterTab > 0) {
//       const filters = ['', 'HOMME', 'FEMME', 'MIXTE', 'ENFANT'];
//       if (filters[filterTab]) {
//         filtered = filtered.filter(p => p.genre === filters[filterTab]);
//       }
//     }

//     if (type.includes('verre') && filterTab > 0) {
//       const filters = ['', 'Unifocal', 'Progressif', 'Bifocal'];
//       if (filters[filterTab]) {
//         filtered = filtered.filter(p => p.foyer === filters[filterTab]);
//       }
//     }

//     setFilteredProducts(filtered);
//   };

//   const getSearchFields = (product) => {
//     switch (type) {
//       case 'monture':
//         return [product.marque, product.reference, product.couleur, product.forme];
//       case 'verreOD':
//       case 'verreOG':
//         return [product.nom, product.nomInterne, product.foyer, product.matiere];
//       case 'accessoire':
//         return [product.nom, product.reference, product.marque, product.description];
//       default:
//         return [];
//     }
//   };

//   const getProductTitle = () => {
//     switch (type) {
//       case 'monture': return 'Sélectionner une monture';
//       case 'verreOD': return 'Sélectionner un verre pour l\'œil droit';
//       case 'verreOG': return 'Sélectionner un verre pour l\'œil gauche';
//       case 'accessoire': return 'Sélectionner un accessoire';
//       default: return 'Sélectionner un produit';
//     }
//   };

//   const getProductIcon = () => {
//     switch (type) {
//       case 'monture': return <VisibilityIcon />;
//       case 'verreOD':
//       case 'verreOG': return <LensIcon />;
//       case 'accessoire': return <InventoryIcon />;
//       default: return <CategoryIcon />;
//     }
//   };

//   const getTabsForType = () => {
//     switch (type) {
//       case 'monture':
//         return ['Tous', 'Homme', 'Femme', 'Mixte', 'Enfant'];
//       case 'verreOD':
//       case 'verreOG':
//         return ['Tous', 'Unifocal', 'Progressif', 'Bifocal'];
//       default:
//         return ['Tous'];
//     }
//   };

//   const handleProductSelect = (product) => {
//     setSelectedProduct(product);
//     setCustomPrice(product.prixVente?.toString() || '');
//   };

//   const handleConfirmSelection = () => {
//     if (selectedProduct) {
//       const finalPrice = parseFloat(customPrice) || selectedProduct.prixVente;
//       onSelect(selectedProduct, type, finalPrice);
//     }
//   };

//   const handleClose = () => {
//     setSelectedProduct(null);
//     setCustomPrice('');
//     setSearchTerm('');
//     setFilterTab(0);
//     onClose();
//   };

//   const renderProductCard = (product) => {
//     const isSelected = selectedProduct?.id === product.id;
    
//     return (
//       <ListItemButton
//         key={product.id}
//         onClick={() => handleProductSelect(product)}
//         selected={isSelected}
//         sx={{
//           border: '1px solid #e0e0e0',
//           borderRadius: '8px',
//           mb: 1,
//           '&.Mui-selected': {
//             backgroundColor: '#e3f2fd',
//             borderColor: '#1976d2',
//           }
//         }}
//       >
//         <Box sx={{ width: '100%' }}>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={1}>
//               <Avatar sx={{ backgroundColor: '#f5f5f5', color: '#666' }}>
//                 {getProductIcon()}
//               </Avatar>
//             </Grid>
            
//             <Grid item xs={6}>
//               <Typography variant="subtitle1" fontWeight={600}>
//                 {type === 'monture' 
//                   ? `${product.marque} ${product.reference}`
//                   : product.nom
//                 }
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {type === 'monture' && (
//                   <>Couleur: {product.couleur} • Genre: {product.genre}</>
//                 )}
//                 {type.includes('verre') && (
//                   <>Type: {product.foyer} • Matière: {product.matiere}</>
//                 )}
//                 {type === 'accessoire' && (
//                   <>Ref: {product.reference} • {product.marque}</>
//                 )}
//               </Typography>
//             </Grid>
            
//             <Grid item xs={3}>
//               <Box sx={{ textAlign: 'center' }}>
//                 <Typography variant="h6" fontWeight={700} color="primary">
//                   {product.prixVente?.toFixed(2)} DH
//                 </Typography>
//                 {product.remiseClient > 0 && (
//                   <Chip 
//                     label={`-${product.remiseClient}%`} 
//                     size="small" 
//                     color="success"
//                     sx={{ fontSize: '0.7rem' }}
//                   />
//                 )}
//               </Box>
//             </Grid>
            
//             <Grid item xs={2}>
//               {type === 'monture' && (
//                 <Box>
//                   <Chip label={product.forme} size="small" variant="outlined" />
//                   <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
//                     Indice: {product.indice}
//                   </Typography>
//                 </Box>
//               )}
//               {type === 'accessoire' && (
//                 <Box>
//                   <Typography variant="caption" display="block">
//                     Stock: {product.quantiteStock}
//                   </Typography>
//                   <Chip 
//                     label="Disponible" 
//                     size="small" 
//                     color="success"
//                     sx={{ fontSize: '0.7rem', mt: 0.5 }}
//                   />
//                 </Box>
//               )}
//             </Grid>
//           </Grid>
//         </Box>
//       </ListItemButton>
//     );
//   };

//   return (
//     <Dialog 
//       open={open} 
//       onClose={handleClose} 
//       maxWidth="lg" 
//       fullWidth
//       PaperProps={{
//         sx: { borderRadius: '16px', maxHeight: '90vh' }
//       }}
//     >
//       <DialogTitle>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Avatar sx={{ backgroundColor: '#1976d2' }}>
//             {getProductIcon()}
//           </Avatar>
//           <Typography variant="h5" fontWeight={700}>
//             {getProductTitle()}
//           </Typography>
//         </Box>
//       </DialogTitle>

//       <DialogContent sx={{ p: 0 }}>
//         {/* Search and Filters */}
//         <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
//           <TextField
//             placeholder="Rechercher un produit..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             fullWidth
//             size="small"
//             sx={{
//               mb: 2,
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: '8px',
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {/* Tabs for filtering */}
//           {getTabsForType().length > 1 && (
//             <Tabs 
//               value={filterTab} 
//               onChange={(e, newValue) => setFilterTab(newValue)}
//               sx={{ 
//                 '& .MuiTab-root': {
//                   textTransform: 'none',
//                   fontWeight: 600
//                 }
//               }}
//             >
//               {getTabsForType().map((label, index) => (
//                 <Tab key={index} label={label} />
//               ))}
//             </Tabs>
//           )}
//         </Box>

//         {/* Products List */}
//         <Box sx={{ p: 3, maxHeight: 400, overflow: 'auto' }}>
//           {loading ? (
//             <Box sx={{ textAlign: 'center', py: 4 }}>
//               <Typography>Chargement des produits...</Typography>
//             </Box>
//           ) : filteredProducts.length === 0 ? (
//             <Box sx={{ textAlign: 'center', py: 4 }}>
//               <Typography color="text.secondary">
//                 Aucun produit trouvé
//               </Typography>
//             </Box>
//           ) : (
//             <List sx={{ p: 0 }}>
//               {filteredProducts.map(renderProductCard)}
//             </List>
//           )}
//         </Box>

//         {/* Product Details & Price Modification */}
//         {selectedProduct && (
//           <Box sx={{ p: 3, backgroundColor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
//             <Typography variant="h6" gutterBottom>
//               Produit sélectionné
//             </Typography>
            
//             <Paper sx={{ p: 2, mb: 2, borderRadius: '8px' }}>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={6}>
//                   <Typography variant="subtitle1" fontWeight={600}>
//                     {type === 'monture' 
//                       ? `${selectedProduct.marque} ${selectedProduct.reference}`
//                       : selectedProduct.nom
//                     }
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Réf: {selectedProduct.reference || selectedProduct.nomInterne}
//                   </Typography>
                  
//                   {/* Détails spécifiques */}
//                   {type === 'monture' && (
//                     <Box sx={{ mt: 1 }}>
//                       <Chip label={selectedProduct.forme} size="small" sx={{ mr: 1 }} />
//                       <Chip label={selectedProduct.genre} size="small" sx={{ mr: 1 }} />
//                       <Chip label={selectedProduct.matiere} size="small" />
//                     </Box>
//                   )}
                  
//                   {type.includes('verre') && (
//                     <Box sx={{ mt: 1 }}>
//                       <Chip label={selectedProduct.foyer} size="small" sx={{ mr: 1 }} />
//                       <Chip label={`Indice ${selectedProduct.indice}`} size="small" sx={{ mr: 1 }} />
//                       <Chip 
//                         label={selectedProduct.gamme} 
//                         size="small" 
//                         color={selectedProduct.gamme === 'HAUTE' ? 'error' : 'default'}
//                       />
//                     </Box>
//                   )}
                  
//                   {type === 'accessoire' && selectedProduct.description && (
//                     <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
//                       {selectedProduct.description}
//                     </Typography>
//                   )}
//                 </Grid>
                
//                 <Grid item xs={6}>
//                   <Box sx={{ textAlign: 'right' }}>
//                     <Typography variant="body2" color="text.secondary">
//                       Prix de vente recommandé
//                     </Typography>
//                     <Typography variant="h5" fontWeight={700} color="text.secondary" 
//                     sx={{ 
//                       // textDecoration: 'line-through' 
//                       }}>
//                       {selectedProduct.prixVente?.toFixed(2)} DH
//                     </Typography>
                    
//                     <TextField
//                       label="Prix final"
//                       type="number"
//                       step="0.01"
//                       value={customPrice}
//                       onChange={(e) => setCustomPrice(e.target.value)}
//                       size="small"
//                       sx={{ mt: 1 }}
//                       InputProps={{
//                         endAdornment: <InputAdornment position="end">DH</InputAdornment>,
//                       }}
//                     />
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Paper>

//             <Divider sx={{ my: 2 }} />
            
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography variant="body2" color="text.secondary">
//                 Prix final: <strong>{parseFloat(customPrice || 0).toFixed(2)} DH</strong>
//               </Typography>
              
//               {parseFloat(customPrice) !== selectedProduct.prixVente && (
//                 <Chip 
//                   label={`${parseFloat(customPrice) > selectedProduct.prixVente ? '+' : ''}${(parseFloat(customPrice) - selectedProduct.prixVente).toFixed(2)} DH`}
//                   color={parseFloat(customPrice) > selectedProduct.prixVente ? 'error' : 'success'}
//                   size="small"
//                 />
//               )}
//             </Box>
//           </Box>
//         )}
//       </DialogContent>

//       <DialogActions sx={{ p: 3 }}>
//         <Button onClick={handleClose}>
//           Annuler
//         </Button>
//         <Button
//           variant="contained"
//           onClick={handleConfirmSelection}
//           disabled={!selectedProduct}
//           sx={{
//             textTransform: 'none',
//             borderRadius: '8px',
//             px: 3
//           }}
//         >
//           Sélectionner ce produit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default ProductSelector;