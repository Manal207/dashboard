import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import { 
  InputAdornment, 
  Avatar, 
  useTheme, 
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { visuallyHidden } from '@mui/utils';
import { getImageUrl } from '../../../api/montureApi';
import ImageViewer from './ImageViewer';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: 'image', label: 'Image' },
  { id: 'marque', label: 'Marque' },
  { id: 'reference', label: 'Référence' },
  { id: 'couleur', label: 'Couleur' },
  { id: 'genre', label: 'Genre' },
  { id: 'forme', label: 'Forme' },
  { id: 'matiere', label: 'Matière' },
  { id: 'prixVente', label: 'Prix Vente (€)' },
  { id: 'quantiteInitiale', label: 'Quantité' },
  { id: 'actions', label: 'Actions' },
];

// Tablet simplified columns
const tabletHeadCells = [
  { id: 'image', label: 'Image' },
  { id: 'product', label: 'Produit' },
  { id: 'prixVente', label: 'Prix' },
  { id: 'quantiteInitiale', label: 'Stock' },
  { id: 'actions', label: 'Actions' },
];

function EnhancedTableHead({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected, isTablet }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const columns = isTablet ? tabletHeadCells : headCells;

  return (
    <TableHead sx={{ backgroundColor: '#F4F6F8' }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all montures' }}
            icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff'}}/>}
            checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
            indeterminateIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><Box sx={{width: 12, height: 2, backgroundColor: 'white', borderRadius: 1}}/></Box>}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== 'actions' && headCell.id !== 'image' ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  numSelected: PropTypes.number.isRequired,
  isTablet: PropTypes.bool
};

// Responsive Image Component
function MontureImage({ monture, onImageClick, size = "default" }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageUrl = monture.image ? getImageUrl(monture.image) : null;
  const avatarSize = size === "large" ? { width: 80, height: 80 } : { width: 50, height: 50 };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (error) => {
    console.error('❌ Image failed to load:', imageUrl, error);
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <Tooltip title="Cliquer pour agrandir l'image">
      <Avatar
        src={imageError ? null : imageUrl}
        sx={{ 
          ...avatarSize,
          borderRadius: '8px',
          backgroundColor: imageError ? '#ffebee' : undefined,
          border: imageError ? '2px solid #f44336' : '1px solid #e0e0e0',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }
        }}
        variant="rounded"
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={() => onImageClick(monture)}
      >
        {!monture.image || imageError ? 
          (monture.marque ? monture.marque.charAt(0) : '?') : 
          (imageLoaded ? '' : '...')}
      </Avatar>
    </Tooltip>
  );
}

// Mobile Card Component
function MobileCard({ monture, isSelected, onSelect, onEdit, onDelete, onImageClick }) {
  const getStockColor = (stock) => {
    if (stock > 10) return 'success';
    if (stock > 0) return 'warning';
    return 'error';
  };

  const getStockLabel = (stock) => {
    if (stock > 10) return 'En stock';
    if (stock > 0) return 'Stock faible';
    return 'Rupture';
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderRadius: '12px', 
        border: isSelected ? '2px solid #1976d2' : '1px solid #e0e0e0',
        backgroundColor: isSelected ? '#f5f5f5' : 'white',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transform: 'translateY(-1px)'
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header with checkbox and actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={isSelected}
              onChange={onSelect}
              size="small"
              icon={<Box sx={{ width: 18, height: 18, borderRadius: '4px', border: '2px solid #cfd8dc', backgroundColor: '#fff'}}/>}
              checkedIcon={<Box sx={{ width: 18, height: 18, borderRadius: '4px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 12 }} /></Box>}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              size="small" 
              onClick={onEdit}
              sx={{ 
                backgroundColor: '#EFF6FF',
                color: '#3B82F6',
                '&:hover': { backgroundColor: '#DBEAFE' },
                width: 36,
                height: 36
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={onDelete}
              sx={{ 
                backgroundColor: '#FEF2F2',
                color: '#EF4444',
                '&:hover': { backgroundColor: '#FEE2E2' },
                width: 36,
                height: 36
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Main content */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Image */}
          <MontureImage monture={monture} onImageClick={onImageClick} size="large" />
          
          {/* Product info */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem', mb: 1, lineHeight: 1.2 }}>
              {monture.marque} {monture.reference}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {[monture.couleur, monture.genre, monture.forme].filter(Boolean).join(' • ')}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" fontWeight={700} color="primary.main" sx={{ fontSize: '1.1rem' }}>
                {monture.prixVente}€
              </Typography>
              <Chip 
                label={`${monture.quantiteInitiale} ${getStockLabel(monture.quantiteInitiale)}`}
                color={getStockColor(monture.quantiteInitiale)}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Box>

            {/* Additional details */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {monture.matiere && (
                <Chip label={monture.matiere} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 20 }} />
              )}
              {monture.typeMontage && (
                <Chip label={monture.typeMontage} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 20 }} />
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function MontureTable({ montures, onEdit, onDelete }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('marque');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 10 : 5);
  const [selected, setSelected] = useState([]);
  
  // Image viewer state
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedMonture, setSelectedMonture] = useState(null);

  // Update rows per page when screen size changes
  React.useEffect(() => {
    setRowsPerPage(isMobile ? 10 : 5);
    setPage(0); // Reset to first page when changing layout
  }, [isMobile]);

  const handleImageClick = (monture) => {
    setSelectedMonture(monture);
    setImageViewerOpen(true);
  };

  const handleImageViewerClose = () => {
    setImageViewerOpen(false);
    setSelectedMonture(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayValue = (value, defaultValue = '-') =>
    value !== null && value !== undefined ? value : defaultValue;

  const filteredMontures = montures.filter((monture) =>
    (monture.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (monture.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (monture.couleur?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const sortedMontures = filteredMontures.sort(getComparator(order, orderBy));
  const paginatedMontures = sortedMontures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const isSelected = (id) => selected.includes(id);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = paginatedMontures.map((n) => n.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleClick = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selected.length === 0) return;

    try {
      const response = await fetch('http://localhost:8080/monture/delete/bulk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selected),
      });

      if (!response.ok) {
        throw new Error('Failed to delete selected items');
      }

      selected.forEach((id) => {
        const montureToDelete = montures.find((m) => m.id === id);
        if (montureToDelete) onDelete(montureToDelete);
      });

      setSelected([]);
    } catch (error) {
      console.error('Bulk delete error:', error);
      alert('Une erreur est survenue lors de la suppression.');
    }
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <Box sx={{ width: '100%' }}>
        {/* Mobile Toolbar */}
        <Paper sx={{ 
          mb: 2, 
          borderRadius: '12px', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
        }}>
          <Box sx={{ p: 2 }}>
            <TextField
              variant="outlined"
              size="medium"
              placeholder="Rechercher montures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              sx={{
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
            
            {selected.length > 0 && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="primary">
                  {selected.length} élément(s) sélectionné(s)
                </Typography>
                <IconButton 
                  onClick={handleDeleteSelected} 
                  sx={{ 
                    backgroundColor: '#FEF2F2', 
                    color: '#EF4444',
                    '&:hover': { backgroundColor: '#FEE2E2' }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Mobile Cards */}
        <Box>
          {paginatedMontures.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
              <Typography variant="body1" color="text.secondary">
                Aucune monture trouvée
              </Typography>
            </Paper>
          ) : (
            paginatedMontures.map((monture) => (
              <MobileCard
                key={monture.id}
                monture={monture}
                isSelected={isSelected(monture.id)}
                onSelect={() => handleClick(monture.id)}
                onEdit={() => onEdit(monture)}
                onDelete={() => onDelete(monture)}
                onImageClick={handleImageClick}
              />
            ))
          )}
        </Box>

        {/* Mobile Pagination */}
        <Paper sx={{ borderRadius: '12px', mt: 2 }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredMontures.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Lignes par page:"
            labelDisplayedRows={({ from, to, count }) => 
              `${from}-${to} sur ${count !== -1 ? count : `plus de ${to}`}`
            }
          />
        </Paper>

        {/* Image Viewer Modal */}
        <ImageViewer
          monture={selectedMonture}
          open={imageViewerOpen}
          onClose={handleImageViewerClose}
        />
      </Box>
    );
  }

  // Tablet & Desktop Layout
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ 
        width: '100%', 
        mb: 2, 
        borderRadius: '16px', 
        boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)'
      }}>
        <Toolbar sx={{ padding: { xs: 2, sm: 4 } }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 350 },
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                height: 55,
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
          {selected.length > 0 && (
            <Tooltip title="Supprimer la sélection">
              <IconButton onClick={handleDeleteSelected} sx={{ ml: 2 }}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        
        <TableContainer>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              rowCount={paginatedMontures.length}
              numSelected={selected.length}
              isTablet={isTablet}
            />
            <TableBody>
              {paginatedMontures.map((monture) => {
                const isItemSelected = isSelected(monture.id);
                return (
                  <TableRow key={monture.id} hover selected={isItemSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={() => handleClick(monture.id)}
                        inputProps={{ 'aria-label': 'select monture' }}
                        icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff'}}/>}
                        checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
                      />
                    </TableCell>
                    
                    {/* Image Cell */}
                    <TableCell>
                      <MontureImage monture={monture} onImageClick={handleImageClick} />
                    </TableCell>
                    
                    {isTablet ? (
                      // Tablet Layout - Simplified columns
                      <>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {displayValue(monture.marque)} {displayValue(monture.reference)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {[monture.couleur, monture.genre, monture.forme].filter(Boolean).join(' • ')}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600} color="primary.main">
                            {displayValue(monture.prixVente, 0)}€
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={displayValue(monture.quantiteInitiale, 0)}
                            color={monture.quantiteInitiale > 10 ? "success" : monture.quantiteInitiale > 0 ? "warning" : "error"}
                            size="small"
                          />
                        </TableCell>
                      </>
                    ) : (
                      // Desktop Layout - All columns
                      <>
                        <TableCell>{displayValue(monture.marque)}</TableCell>
                        <TableCell>{displayValue(monture.reference)}</TableCell>
                        <TableCell>{displayValue(monture.couleur)}</TableCell>
                        <TableCell>{displayValue(monture.genre)}</TableCell>
                        <TableCell>{displayValue(monture.forme)}</TableCell>
                        <TableCell>{displayValue(monture.matiere)}</TableCell>
                        <TableCell>{displayValue(monture.prixVente, 0)} €</TableCell>
                        <TableCell>{displayValue(monture.quantiteInitiale, 0)}</TableCell>
                      </>
                    )}
                    
                    <TableCell>
                      <Tooltip title="Modifier">
                        <IconButton onClick={() => onEdit(monture)}>
                          <EditIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton onClick={() => onDelete(monture)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {paginatedMontures.length === 0 && (
                <TableRow>
                  <TableCell colSpan={isTablet ? 6 : 11} align="center">
                    Aucune monture trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredMontures.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Image Viewer Modal */}
      <ImageViewer
        monture={selectedMonture}
        open={imageViewerOpen}
        onClose={handleImageViewerClose}
      />
    </Box>
  );
}

MontureTable.propTypes = {
  montures: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MontureTable;

// // import React, { useState } from 'react';
// // import PropTypes from 'prop-types';
// // import SearchIcon from '@mui/icons-material/Search';
// // import Checkbox from '@mui/material/Checkbox';
// // import { InputAdornment, Avatar } from '@mui/material';
// // import CheckIcon from '@mui/icons-material/Check';
// // import {
// //   Box,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TablePagination,
// //   TableRow,
// //   TableSortLabel,
// //   Toolbar,
// //   Paper,
// //   IconButton,
// //   Tooltip,
// //   TextField,
// // } from '@mui/material';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import EditIcon from '@mui/icons-material/Edit';
// // import { visuallyHidden } from '@mui/utils';
// // import { getImageUrl } from '../../../api/montureApi';
// // import ImageViewer from './ImageViewer'; // Import the new component

// // function descendingComparator(a, b, orderBy) {
// //   if (b[orderBy] < a[orderBy]) return -1;
// //   if (b[orderBy] > a[orderBy]) return 1;
// //   return 0;
// // }

// // function getComparator(order, orderBy) {
// //   return order === 'desc'
// //     ? (a, b) => descendingComparator(a, b, orderBy)
// //     : (a, b) => -descendingComparator(a, b, orderBy);
// // }

// // const headCells = [
// //   { id: 'image', label: 'Image' },
// //   { id: 'marque', label: 'Marque' },
// //   { id: 'reference', label: 'Référence' },
// //   { id: 'couleur', label: 'Couleur' },
// //   { id: 'genre', label: 'Genre' },
// //   { id: 'forme', label: 'Forme' },
// //   { id: 'matiere', label: 'Matière' },
// //   { id: 'prixVente', label: 'Prix Vente (€)' },
// //   { id: 'quantiteInitiale', label: 'Quantité' },
// //   { id: 'actions', label: 'Actions' },
// // ];

// // function EnhancedTableHead({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected }) {
// //   const createSortHandler = (property) => (event) => {
// //     onRequestSort(event, property);
// //   };

// //   return (
// //     <TableHead sx={{ backgroundColor: '#F4F6F8' }}>
// //       <TableRow>
// //         <TableCell padding="checkbox">
// //           <Checkbox
// //             color="primary"
// //             indeterminate={numSelected > 0 && numSelected < rowCount}
// //             checked={rowCount > 0 && numSelected === rowCount}
// //             onChange={onSelectAllClick}
// //             inputProps={{ 'aria-label': 'select all montures' }}
// //             icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff'}}/>}
// //             checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
// //             indeterminateIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><Box sx={{width: 12, height: 2, backgroundColor: 'white', borderRadius: 1}}/></Box>}
// //           />
// //         </TableCell>
// //         {headCells.map((headCell) => (
// //           <TableCell
// //             key={headCell.id}
// //             sortDirection={orderBy === headCell.id ? order : false}
// //           >
// //             {headCell.id !== 'actions' && headCell.id !== 'image' ? (
// //               <TableSortLabel
// //                 active={orderBy === headCell.id}
// //                 direction={orderBy === headCell.id ? order : 'asc'}
// //                 onClick={createSortHandler(headCell.id)}
// //               >
// //                 {headCell.label}
// //                 {orderBy === headCell.id ? (
// //                   <Box component="span" sx={visuallyHidden}>
// //                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
// //                   </Box>
// //                 ) : null}
// //               </TableSortLabel>
// //             ) : (
// //               headCell.label
// //             )}
// //           </TableCell>
// //         ))}
// //       </TableRow>
// //     </TableHead>
// //   );
// // }

// // EnhancedTableHead.propTypes = {
// //   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
// //   orderBy: PropTypes.string.isRequired,
// //   onRequestSort: PropTypes.func.isRequired,
// //   onSelectAllClick: PropTypes.func.isRequired,
// //   rowCount: PropTypes.number.isRequired,
// //   numSelected: PropTypes.number.isRequired,
// // };

// // // Updated MontureImage Component with click handler
// // function MontureImage({ monture, onImageClick }) {
// //   const [imageError, setImageError] = useState(false);
// //   const [imageLoaded, setImageLoaded] = useState(false);

// //   React.useEffect(() => {
// //     console.log('🖼️ MontureImage Debug:', {
// //       marque: monture.marque,
// //       hasImage: !!monture.image,
// //       imageValue: monture.image,
// //       generatedUrl: monture.image ? getImageUrl(monture.image) : null
// //     });
// //   }, [monture]);

// //   const imageUrl = monture.image ? getImageUrl(monture.image) : null;

// //   const handleImageLoad = () => {
// //     console.log('✅ Image loaded successfully:', imageUrl);
// //     setImageLoaded(true);
// //     setImageError(false);
// //   };

// //   const handleImageError = (error) => {
// //     console.error('❌ Image failed to load:', imageUrl, error);
// //     setImageError(true);
// //     setImageLoaded(false);
// //   };

// //   return (
// //     <Tooltip title="Cliquer pour agrandir l'image">
// //       <Avatar
// //         src={imageError ? null : imageUrl}
// //         sx={{ 
// //           width: 50, 
// //           height: 50,
// //           borderRadius: '8px',
// //           backgroundColor: imageError ? '#ffebee' : undefined,
// //           border: imageError ? '2px solid #f44336' : undefined,
// //           cursor: 'pointer',
// //           transition: 'transform 0.2s, box-shadow 0.2s',
// //           '&:hover': {
// //             transform: 'scale(1.05)',
// //             boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
// //           }
// //         }}
// //         variant="rounded"
// //         onLoad={handleImageLoad}
// //         onError={handleImageError}
// //         onClick={() => onImageClick(monture)}
// //       >
// //         {!monture.image || imageError ? 
// //           (monture.marque ? monture.marque.charAt(0) : '?') : 
// //           (imageLoaded ? '' : '...')}
// //       </Avatar>
// //     </Tooltip>
// //   );
// // }

// // function MontureTable({ montures, onEdit, onDelete }) {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [order, setOrder] = useState('asc');
// //   const [orderBy, setOrderBy] = useState('marque');
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(5);
// //   const [selected, setSelected] = useState([]);
  
// //   // New state for image viewer
// //   const [imageViewerOpen, setImageViewerOpen] = useState(false);
// //   const [selectedMonture, setSelectedMonture] = useState(null);

// //   // Debug montures data when component mounts or data changes
// //   React.useEffect(() => {
// //     console.log('📊 MontureTable Debug - Total montures:', montures.length);
// //     console.log('🔍 Sample monture data:', montures[0]);
    
// //     const monturesWithImages = montures.filter(m => m.image);
// //     console.log('🖼️ Montures with images:', monturesWithImages.length);
    
// //     if (monturesWithImages.length > 0) {
// //       console.log('🔗 Sample image URLs:', monturesWithImages.slice(0, 3).map(m => ({
// //         marque: m.marque,
// //         image: m.image,
// //         url: getImageUrl(m.image)
// //       })));
// //     }
// //   }, [montures]);

// //   // Image click handler
// //   const handleImageClick = (monture) => {
// //     setSelectedMonture(monture);
// //     setImageViewerOpen(true);
// //   };

// //   const handleImageViewerClose = () => {
// //     setImageViewerOpen(false);
// //     setSelectedMonture(null);
// //   };

// //   const handleRequestSort = (event, property) => {
// //     const isAsc = orderBy === property && order === 'asc';
// //     setOrder(isAsc ? 'desc' : 'asc');
// //     setOrderBy(property);
// //   };

// //   const handleChangePage = (event, newPage) => setPage(newPage);
// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const displayValue = (value, defaultValue = '-') =>
// //     value !== null && value !== undefined ? value : defaultValue;

// //   const filteredMontures = montures.filter((monture) =>
// //     (monture.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
// //     (monture.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
// //   );

// //   const sortedMontures = filteredMontures.sort(getComparator(order, orderBy));
// //   const paginatedMontures = sortedMontures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

// //   const isSelected = (id) => selected.includes(id);

// //   const handleSelectAllClick = (event) => {
// //     if (event.target.checked) {
// //       const newSelected = paginatedMontures.map((n) => n.id);
// //       setSelected(newSelected);
// //     } else {
// //       setSelected([]);
// //     }
// //   };

// //   const handleClick = (id) => {
// //     setSelected((prevSelected) =>
// //       prevSelected.includes(id)
// //         ? prevSelected.filter((selectedId) => selectedId !== id)
// //         : [...prevSelected, id]
// //     );
// //   };

// //   const handleDeleteSelected = async () => {
// //     if (selected.length === 0) return;

// //     try {
// //       const response = await fetch('http://localhost:8080/monture/delete/bulk', {
// //         method: 'DELETE',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(selected),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to delete selected items');
// //       }

// //       selected.forEach((id) => {
// //         const montureToDelete = montures.find((m) => m.id === id);
// //         if (montureToDelete) onDelete(montureToDelete);
// //       });

// //       setSelected([]);
// //     } catch (error) {
// //       console.error('Bulk delete error:', error);
// //       alert('Une erreur est survenue lors de la suppression.');
// //     }
// //   };

// //   return (
// //     <Box sx={{ width: '100%' }}>
// //       <Paper sx={{ width: '100%', mb: 2, borderRadius:'16px' , boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)'}}>
// //         <Toolbar sx={{ padding:4 }}>
// //           <TextField
// //             variant="outlined"
// //             size="small"
// //             placeholder="Rechercher..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             sx={{
// //               width: 350,
// //               borderRadius : '8px',
// //               '& .MuiOutlinedInput-root': {
// //                 borderRadius: '8px',
// //                 height: 55,
// //               },
// //             }}
// //             InputProps={{
// //               startAdornment: (
// //                 <InputAdornment position="start">
// //                   <SearchIcon />
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />
// //           {selected.length > 0 && (
// //             <Tooltip title="Supprimer la sélection">
// //               <IconButton onClick={handleDeleteSelected} sx={{ ml: 2 }}>
// //                 <DeleteIcon color="error" />
// //               </IconButton>
// //             </Tooltip>
// //           )}
// //         </Toolbar>
// //         <TableContainer>
// //           <Table>
// //             <EnhancedTableHead
// //               order={order}
// //               orderBy={orderBy}
// //               onRequestSort={handleRequestSort}
// //               onSelectAllClick={handleSelectAllClick}
// //               rowCount={paginatedMontures.length}
// //               numSelected={selected.length}
// //             />
// //             <TableBody>
// //               {paginatedMontures.map((monture) => {
// //                 const isItemSelected = isSelected(monture.id);
// //                 return (
// //                   <TableRow key={monture.id} hover selected={isItemSelected}>
// //                     <TableCell padding="checkbox">
// //                       <Checkbox
// //                         checked={isItemSelected}
// //                         onChange={() => handleClick(monture.id)}
// //                         inputProps={{ 'aria-label': 'select monture' }}
// //                         icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff'}}/>}
// //                         checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
// //                       />
// //                     </TableCell>
                    
// //                     {/* Enhanced Image Cell with click handler */}
// //                     <TableCell>
// //                       <MontureImage 
// //                         monture={monture} 
// //                         onImageClick={handleImageClick}
// //                       />
// //                     </TableCell>
                    
// //                     <TableCell>{displayValue(monture.marque)}</TableCell>
// //                     <TableCell>{displayValue(monture.reference)}</TableCell>
// //                     <TableCell>{displayValue(monture.couleur)}</TableCell>
// //                     <TableCell>{displayValue(monture.genre)}</TableCell>
// //                     <TableCell>{displayValue(monture.forme)}</TableCell>
// //                     <TableCell>{displayValue(monture.matiere)}</TableCell>
// //                     <TableCell>{displayValue(monture.prixVente, 0)} €</TableCell>
// //                     <TableCell>{displayValue(monture.quantiteInitiale, 0)}</TableCell>
// //                     <TableCell>
// //                       <Tooltip title="Modifier">
// //                         <IconButton onClick={() => onEdit(monture)}>
// //                           <EditIcon color="primary" />
// //                         </IconButton>
// //                       </Tooltip>
// //                       <Tooltip title="Supprimer">
// //                         <IconButton onClick={() => onDelete(monture)}>
// //                           <DeleteIcon color="error" />
// //                         </IconButton>
// //                       </Tooltip>
// //                     </TableCell>
// //                   </TableRow>
// //                 );
// //               })}
// //               {paginatedMontures.length === 0 && (
// //                 <TableRow>
// //                   <TableCell colSpan={11} align="center">
// //                     Aucune monture trouvée
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //         <TablePagination
// //           rowsPerPageOptions={[5, 10, 25]}
// //           component="div"
// //           count={filteredMontures.length}
// //           rowsPerPage={rowsPerPage}
// //           page={page}
// //           onPageChange={handleChangePage}
// //           onRowsPerPageChange={handleChangeRowsPerPage}
// //         />
// //       </Paper>

// //       {/* Image Viewer Modal */}
// //       <ImageViewer
// //         monture={selectedMonture}
// //         open={imageViewerOpen}
// //         onClose={handleImageViewerClose}
// //       />
// //     </Box>
// //   );
// // }

// // MontureTable.propTypes = {
// //   montures: PropTypes.array.isRequired,
// //   onEdit: PropTypes.func.isRequired,
// //   onDelete: PropTypes.func.isRequired,
// // };

// // export default MontureTable;

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import SearchIcon from '@mui/icons-material/Search';
// import Checkbox from '@mui/material/Checkbox';
// import { InputAdornment, Avatar } from '@mui/material';
// import CheckIcon from '@mui/icons-material/Check';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TableSortLabel,
//   Toolbar,
//   Paper,
//   IconButton,
//   Tooltip,
//   TextField,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { visuallyHidden } from '@mui/utils';
// import { getImageUrl } from '../../../api/montureApi';

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) return -1;
//   if (b[orderBy] > a[orderBy]) return 1;
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// const headCells = [
//   { id: 'image', label: 'Image' },
//   { id: 'marque', label: 'Marque' },
//   { id: 'reference', label: 'Référence' },
//   { id: 'couleur', label: 'Couleur' },
//   { id: 'genre', label: 'Genre' },
//   { id: 'forme', label: 'Forme' },
//   { id: 'matiere', label: 'Matière' },
//   { id: 'prixVente', label: 'Prix Vente (€)' },
//   { id: 'quantiteInitiale', label: 'Quantité' },
//   { id: 'actions', label: 'Actions' },
// ];

// function EnhancedTableHead({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected }) {
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead sx={{ backgroundColor: '#F4F6F8' }}>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ 'aria-label': 'select all montures' }}
//             icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff'}}/>}
//             checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
//             indeterminateIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><Box sx={{width: 12, height: 2, backgroundColor: 'white', borderRadius: 1}}/></Box>}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             {headCell.id !== 'actions' && headCell.id !== 'image' ? (
//               <TableSortLabel
//                 active={orderBy === headCell.id}
//                 direction={orderBy === headCell.id ? order : 'asc'}
//                 onClick={createSortHandler(headCell.id)}
//               >
//                 {headCell.label}
//                 {orderBy === headCell.id ? (
//                   <Box component="span" sx={visuallyHidden}>
//                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                   </Box>
//                 ) : null}
//               </TableSortLabel>
//             ) : (
//               headCell.label
//             )}
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   rowCount: PropTypes.number.isRequired,
//   numSelected: PropTypes.number.isRequired,
// };

// // Custom Image Component with debugging
// function MontureImage({ monture }) {
//   const [imageError, setImageError] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   React.useEffect(() => {
//     console.log('🖼️ MontureImage Debug:', {
//       marque: monture.marque,
//       hasImage: !!monture.image,
//       imageValue: monture.image,
//       generatedUrl: monture.image ? getImageUrl(monture.image) : null
//     });
//   }, [monture]);

//   const imageUrl = monture.image ? getImageUrl(monture.image) : null;

//   const handleImageLoad = () => {
//     console.log('✅ Image loaded successfully:', imageUrl);
//     setImageLoaded(true);
//     setImageError(false);
//   };

//   const handleImageError = (error) => {
//     console.error('❌ Image failed to load:', imageUrl, error);
//     setImageError(true);
//     setImageLoaded(false);
//   };

//   return (
//     <Avatar
//       src={imageError ? null : imageUrl}
//       sx={{ 
//         width: 50, 
//         height: 50,
//         borderRadius: '8px',
//         backgroundColor: imageError ? '#ffebee' : undefined,
//         border: imageError ? '2px solid #f44336' : undefined
//       }}
//       variant="rounded"
//       onLoad={handleImageLoad}
//       onError={handleImageError}
//     >
//       {!monture.image || imageError ? 
//         (monture.marque ? monture.marque.charAt(0) : '?') : 
//         (imageLoaded ? '' : '...')}
//     </Avatar>
//   );
// }

// function MontureTable({ montures, onEdit, onDelete }) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('marque');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState([]);

//   // Debug montures data when component mounts or data changes
//   React.useEffect(() => {
//     console.log('📊 MontureTable Debug - Total montures:', montures.length);
//     console.log('🔍 Sample monture data:', montures[0]);
    
//     const monturesWithImages = montures.filter(m => m.image);
//     console.log('🖼️ Montures with images:', monturesWithImages.length);
    
//     if (monturesWithImages.length > 0) {
//       console.log('🔗 Sample image URLs:', monturesWithImages.slice(0, 3).map(m => ({
//         marque: m.marque,
//         image: m.image,
//         url: getImageUrl(m.image)
//       })));
//     }
//   }, [montures]);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const displayValue = (value, defaultValue = '-') =>
//     value !== null && value !== undefined ? value : defaultValue;

//   const filteredMontures = montures.filter((monture) =>
//     (monture.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//     (monture.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
//   );

//   const sortedMontures = filteredMontures.sort(getComparator(order, orderBy));
//   const paginatedMontures = sortedMontures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const isSelected = (id) => selected.includes(id);

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = paginatedMontures.map((n) => n.id);
//       setSelected(newSelected);
//     } else {
//       setSelected([]);
//     }
//   };

//   const handleClick = (id) => {
//     setSelected((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((selectedId) => selectedId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   const handleDeleteSelected = async () => {
//     if (selected.length === 0) return;

//     try {
//       const response = await fetch('http://localhost:8080/monture/delete/bulk', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(selected),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete selected items');
//       }

//       selected.forEach((id) => {
//         const montureToDelete = montures.find((m) => m.id === id);
//         if (montureToDelete) onDelete(montureToDelete);
//       });

//       setSelected([]);
//     } catch (error) {
//       console.error('Bulk delete error:', error);
//       alert('Une erreur est survenue lors de la suppression.');
//     }
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2, borderRadius:'16px' , boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)'}}>
//         <Toolbar sx={{ padding:4 }}>
//           <TextField
//             variant="outlined"
//             size="small"
//             placeholder="Rechercher..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{
//               width: 350,
//               borderRadius : '8px',
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: '8px',
//                 height: 55,
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
//           {selected.length > 0 && (
//             <Tooltip title="Supprimer la sélection">
//               <IconButton onClick={handleDeleteSelected} sx={{ ml: 2 }}>
//                 <DeleteIcon color="error" />
//               </IconButton>
//             </Tooltip>
//           )}
//         </Toolbar>
//         <TableContainer>
//           <Table>
//             <EnhancedTableHead
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={handleRequestSort}
//               onSelectAllClick={handleSelectAllClick}
//               rowCount={paginatedMontures.length}
//               numSelected={selected.length}
//             />
//             <TableBody>
//               {paginatedMontures.map((monture) => {
//                 const isItemSelected = isSelected(monture.id);
//                 return (
//                   <TableRow key={monture.id} hover selected={isItemSelected}>
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         checked={isItemSelected}
//                         onChange={() => handleClick(monture.id)}
//                         inputProps={{ 'aria-label': 'select monture' }}
//                         icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff'}}/>}
//                         checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
//                       />
//                     </TableCell>
                    
//                     {/* Enhanced Image Cell with debugging */}
//                     <TableCell>
//                       <MontureImage monture={monture} />
//                     </TableCell>
                    
//                     <TableCell>{displayValue(monture.marque)}</TableCell>
//                     <TableCell>{displayValue(monture.reference)}</TableCell>
//                     <TableCell>{displayValue(monture.couleur)}</TableCell>
//                     <TableCell>{displayValue(monture.genre)}</TableCell>
//                     <TableCell>{displayValue(monture.forme)}</TableCell>
//                     <TableCell>{displayValue(monture.matiere)}</TableCell>
//                     <TableCell>{displayValue(monture.prixVente, 0)} €</TableCell>
//                     <TableCell>{displayValue(monture.quantiteInitiale, 0)}</TableCell>
//                     <TableCell>
//                       <Tooltip title="Modifier">
//                         <IconButton onClick={() => onEdit(monture)}>
//                           <EditIcon color="primary" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Supprimer">
//                         <IconButton onClick={() => onDelete(monture)}>
//                           <DeleteIcon color="error" />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//               {paginatedMontures.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={11} align="center">
//                     Aucune monture trouvée
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredMontures.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Box>
//   );
// }

// MontureTable.propTypes = {
//   montures: PropTypes.array.isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// export default MontureTable;

// // // // import PropTypes from 'prop-types';
// // // // import SearchIcon from '@mui/icons-material/Search';
// // // // import Checkbox from '@mui/material/Checkbox';
// // // // import { InputAdornment, Avatar } from '@mui/material';
// // // // import CheckIcon from '@mui/icons-material/Check';
// // // // import {
// // // //   Box,
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableContainer,
// // // //   TableHead,
// // // //   TablePagination,
// // // //   TableRow,
// // // //   TableSortLabel,
// // // //   Toolbar,
// // // //   Paper,
// // // //   IconButton,
// // // //   Tooltip,
// // // //   TextField,
// // // // } from '@mui/material';
// // // // import DeleteIcon from '@mui/icons-material/Delete';
// // // // import EditIcon from '@mui/icons-material/Edit';
// // // // import { visuallyHidden } from '@mui/utils';
// // // // import { getImageUrl } from '../../../api/montureApi';

// // // // function descendingComparator(a, b, orderBy) {
// // // //   if (b[orderBy] < a[orderBy]) return -1;
// // // //   if (b[orderBy] > a[orderBy]) return 1;
// // // //   return 0;
// // // // }

// // // // function getComparator(order, orderBy) {
// // // //   return order === 'desc'
// // // //     ? (a, b) => descendingComparator(a, b, orderBy)
// // // //     : (a, b) => -descendingComparator(a, b, orderBy);
// // // // }

// // // // const headCells = [
// // // //   { id: 'image', label: 'Image' },
// // // //   { id: 'marque', label: 'Marque' },
// // // //   { id: 'reference', label: 'Référence' },
// // // //   { id: 'couleur', label: 'Couleur' },
// // // //   { id: 'genre', label: 'Genre' },
// // // //   { id: 'forme', label: 'Forme' },
// // // //   { id: 'matiere', label: 'Matière' },
// // // //   { id: 'prixVente', label: 'Prix Vente (€)' },
// // // //   { id: 'quantiteInitiale', label: 'Quantité' },
// // // //   { id: 'actions', label: 'Actions' },
// // // // ];

// // // // function EnhancedTableHead({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected }) {
// // // //   const createSortHandler = (property) => (event) => {
// // // //     onRequestSort(event, property);
// // // //   };

// // // //   return (
// // // //     <TableHead sx={{ backgroundColor: '#F4F6F8' }}>
// // // //       <TableRow>
// // // //         <TableCell padding="checkbox">
// // // //           <Checkbox
// // // //             color="primary"
// // // //             indeterminate={numSelected > 0 && numSelected < rowCount}
// // // //             checked={rowCount > 0 && numSelected === rowCount}
// // // //             onChange={onSelectAllClick}
// // // //             inputProps={{ 'aria-label': 'select all montures' }}
// // // //             icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff'}}/>}
// // // //             checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
// // // //             indeterminateIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><Box sx={{width: 12, height: 2, backgroundColor: 'white', borderRadius: 1}}/></Box>}
// // // //           />
// // // //         </TableCell>
// // // //         {headCells.map((headCell) => (
// // // //           <TableCell
// // // //             key={headCell.id}
// // // //             sortDirection={orderBy === headCell.id ? order : false}
// // // //           >
// // // //             {headCell.id !== 'actions' && headCell.id !== 'image' ? (
// // // //               <TableSortLabel
// // // //                 active={orderBy === headCell.id}
// // // //                 direction={orderBy === headCell.id ? order : 'asc'}
// // // //                 onClick={createSortHandler(headCell.id)}
// // // //               >
// // // //                 {headCell.label}
// // // //                 {orderBy === headCell.id ? (
// // // //                   <Box component="span" sx={visuallyHidden}>
// // // //                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
// // // //                   </Box>
// // // //                 ) : null}
// // // //               </TableSortLabel>
// // // //             ) : (
// // // //               headCell.label
// // // //             )}
// // // //           </TableCell>
// // // //         ))}
// // // //       </TableRow>
// // // //     </TableHead>
// // // //   );
// // // // }

// // // // EnhancedTableHead.propTypes = {
// // // //   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
// // // //   orderBy: PropTypes.string.isRequired,
// // // //   onRequestSort: PropTypes.func.isRequired,
// // // //   onSelectAllClick: PropTypes.func.isRequired,
// // // //   rowCount: PropTypes.number.isRequired,
// // // //   numSelected: PropTypes.number.isRequired,
// // // // };

// // // // function MontureTable({ montures, onEdit, onDelete }) {
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [order, setOrder] = useState('asc');
// // // //   const [orderBy, setOrderBy] = useState('marque');
// // // //   const [page, setPage] = useState(0);
// // // //   const [rowsPerPage, setRowsPerPage] = useState(5);
// // // //   const [selected, setSelected] = useState([]);

// // // //   const handleRequestSort = (event, property) => {
// // // //     const isAsc = orderBy === property && order === 'asc';
// // // //     setOrder(isAsc ? 'desc' : 'asc');
// // // //     setOrderBy(property);
// // // //   };

// // // //   const handleChangePage = (event, newPage) => setPage(newPage);
// // // //   const handleChangeRowsPerPage = (event) => {
// // // //     setRowsPerPage(parseInt(event.target.value, 10));
// // // //     setPage(0);
// // // //   };

// // // //   const displayValue = (value, defaultValue = '-') =>
// // // //     value !== null && value !== undefined ? value : defaultValue;

// // // //   const filteredMontures = montures.filter((monture) =>
// // // //     (monture.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
// // // //     (monture.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
// // // //   );

// // // //   const sortedMontures = filteredMontures.sort(getComparator(order, orderBy));
// // // //   const paginatedMontures = sortedMontures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

// // // //   const isSelected = (id) => selected.includes(id);

// // // //   const handleSelectAllClick = (event) => {
// // // //     if (event.target.checked) {
// // // //       const newSelected = paginatedMontures.map((n) => n.id);
// // // //       setSelected(newSelected);
// // // //     } else {
// // // //       setSelected([]);
// // // //     }
// // // //   };

// // // //   const handleClick = (id) => {
// // // //     setSelected((prevSelected) =>
// // // //       prevSelected.includes(id)
// // // //         ? prevSelected.filter((selectedId) => selectedId !== id)
// // // //         : [...prevSelected, id]
// // // //     );
// // // //   };

// // // //   const handleDeleteSelected = async () => {
// // // //     if (selected.length === 0) return;

// // // //     try {
// // // //       const response = await fetch('http://localhost:8080/monture/delete/bulk', {
// // // //         method: 'DELETE',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify(selected),
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error('Failed to delete selected items');
// // // //       }

// // // //       // Call onDelete for each deleted item to update the frontend state
// // // //       selected.forEach((id) => {
// // // //         const montureToDelete = montures.find((m) => m.id === id);
// // // //         if (montureToDelete) onDelete(montureToDelete);
// // // //       });

// // // //       setSelected([]);
// // // //     } catch (error) {
// // // //       console.error('Bulk delete error:', error);
// // // //       alert('Une erreur est survenue lors de la suppression.');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Box sx={{ width: '100%' }}>
// // // //       <Paper sx={{ width: '100%', mb: 2, borderRadius:'16px' , boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)'}}>
// // // //         <Toolbar sx={{ padding:4 }}>
// // // //           <TextField
// // // //             variant="outlined"
// // // //             size="small"
// // // //             placeholder="Rechercher..."
// // // //             value={searchTerm}
// // // //             onChange={(e) => setSearchTerm(e.target.value)}
// // // //             sx={{
// // // //               width: 350,
// // // //               borderRadius : '8px',
// // // //               '& .MuiOutlinedInput-root': {
// // // //                 borderRadius: '8px',
// // // //                 height: 55,
// // // //               },
// // // //             }}
// // // //             InputProps={{
// // // //               startAdornment: (
// // // //                 <InputAdornment position="start">
// // // //                   <SearchIcon />
// // // //                 </InputAdornment>
// // // //               ),
// // // //             }}
// // // //           />
// // // //           {selected.length > 0 && (
// // // //             <Tooltip title="Supprimer la sélection">
// // // //               <IconButton onClick={handleDeleteSelected} sx={{ ml: 2 }}>
// // // //                 <DeleteIcon color="error" />
// // // //               </IconButton>
// // // //             </Tooltip>
// // // //           )}
// // // //         </Toolbar>
// // // //         <TableContainer>
// // // //           <Table>
// // // //             <EnhancedTableHead
// // // //               order={order}
// // // //               orderBy={orderBy}
// // // //               onRequestSort={handleRequestSort}
// // // //               onSelectAllClick={handleSelectAllClick}
// // // //               rowCount={paginatedMontures.length}
// // // //               numSelected={selected.length}
// // // //             />
// // // //             <TableBody>
// // // //               {paginatedMontures.map((monture) => {
// // // //                 const isItemSelected = isSelected(monture.id);
// // // //                 return (
// // // //                   <TableRow key={monture.id} hover selected={isItemSelected}>
// // // //                     <TableCell padding="checkbox">
// // // //                       <Checkbox
// // // //                         checked={isItemSelected}
// // // //                         onChange={() => handleClick(monture.id)}
// // // //                         inputProps={{ 'aria-label': 'select monture' }}
// // // //                         icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff'}}/>}
// // // //                         checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
// // // //                       />
// // // //                     </TableCell>
                    
// // // //                     {/* Image Cell */}
// // // //                     <TableCell>
// // // //                       <Avatar
// // // //                         src={monture.image ? getImageUrl(monture.image) : null}
// // // //                         sx={{ 
// // // //                           width: 50, 
// // // //                           height: 50,
// // // //                           borderRadius: '8px'
// // // //                         }}
// // // //                         variant="rounded"
// // // //                       >
// // // //                         {!monture.image && monture.marque ? monture.marque.charAt(0) : '?'}
// // // //                       </Avatar>
// // // //                     </TableCell>
                    
// // // //                     <TableCell>{displayValue(monture.marque)}</TableCell>
// // // //                     <TableCell>{displayValue(monture.reference)}</TableCell>
// // // //                     <TableCell>{displayValue(monture.couleur)}</TableCell>
// // // //                     <TableCell>{displayValue(monture.genre)}</TableCell>
// // // //                     <TableCell>{displayValue(monture.forme)}</TableCell>
// // // //                     <TableCell>{displayValue(monture.matiere)}</TableCell>
// // // //                     <TableCell>{displayValue(monture.prixVente, 0)} €</TableCell>
// // // //                     <TableCell>{displayValue(monture.quantiteInitiale, 0)}</TableCell>
// // // //                     <TableCell>
// // // //                       <Tooltip title="Modifier">
// // // //                         <IconButton onClick={() => onEdit(monture)}>
// // // //                           <EditIcon color="primary" />
// // // //                         </IconButton>
// // // //                       </Tooltip>
// // // //                       <Tooltip title="Supprimer">
// // // //                         <IconButton onClick={() => onDelete(monture)}>
// // // //                           <DeleteIcon color="error" />
// // // //                         </IconButton>
// // // //                       </Tooltip>
// // // //                     </TableCell>
// // // //                   </TableRow>
// // // //                 );
// // // //               })}
// // // //               {paginatedMontures.length === 0 && (
// // // //                 <TableRow>
// // // //                   <TableCell colSpan={11} align="center">
// // // //                     Aucune monture trouvée
// // // //                   </TableCell>
// // // //                 </TableRow>
// // // //               )}
// // // //             </TableBody>
// // // //           </Table>
// // // //         </TableContainer>
// // // //         <TablePagination
// // // //           rowsPerPageOptions={[5, 10, 25]}
// // // //           component="div"
// // // //           count={filteredMontures.length}
// // // //           rowsPerPage={rowsPerPage}
// // // //           page={page}
// // // //           onPageChange={handleChangePage}
// // // //           onRowsPerPageChange={handleChangeRowsPerPage}
// // // //         />
// // // //       </Paper>
// // // //     </Box>
// // // //   );
// // // // }

// // // // MontureTable.propTypes = {
// // // //   montures: PropTypes.array.isRequired,
// // // //   onEdit: PropTypes.func.isRequired,
// // // //   onDelete: PropTypes.func.isRequired,
// // // // };

// // // // export default MontureTable;


// // // // // import React, { useState } from 'react';
// // // // // import PropTypes from 'prop-types';
// // // // // import SearchIcon from '@mui/icons-material/Search';
// // // // // import Checkbox from '@mui/material/Checkbox';
// // // // // import { InputAdornment} from '@mui/material';
// // // // // import CheckIcon from '@mui/icons-material/Check';
// // // // // import {
// // // // //   Box,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TablePagination,
// // // // //   TableRow,
// // // // //   TableSortLabel,
// // // // //   Toolbar,
// // // // //   Paper,
// // // // //   // Checkbox,
// // // // //   IconButton,
// // // // //   Tooltip,
// // // // //   TextField,
// // // // // } from '@mui/material';
// // // // // import DeleteIcon from '@mui/icons-material/Delete';
// // // // // import EditIcon from '@mui/icons-material/Edit';
// // // // // import { visuallyHidden } from '@mui/utils';

// // // // // function descendingComparator(a, b, orderBy) {
// // // // //   if (b[orderBy] < a[orderBy]) return -1;
// // // // //   if (b[orderBy] > a[orderBy]) return 1;
// // // // //   return 0;
// // // // // }

// // // // // function getComparator(order, orderBy) {
// // // // //   return order === 'desc'
// // // // //     ? (a, b) => descendingComparator(a, b, orderBy)
// // // // //     : (a, b) => -descendingComparator(a, b, orderBy);
// // // // // }

// // // // // const headCells = [
// // // // //   { id: 'marque', label: 'Marque' },
// // // // //   { id: 'reference', label: 'Référence' },
// // // // //   { id: 'couleur', label: 'Couleur' },
// // // // //   { id: 'genre', label: 'Genre' },
// // // // //   { id: 'forme', label: 'Forme' },
// // // // //   { id: 'matiere', label: 'Matière' },
// // // // //   { id: 'prixVente', label: 'Prix Vente (€)' },
// // // // //   { id: 'quantiteInitiale', label: 'Quantité' },
// // // // //   { id: 'actions', label: 'Actions' },
// // // // // ];

// // // // // function EnhancedTableHead({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected }) {
// // // // //   const createSortHandler = (property) => (event) => {
// // // // //     onRequestSort(event, property);
// // // // //   };

// // // // //   return (
// // // // //     <TableHead sx={{ backgroundColor: '#F4F6F8' }}>
// // // // //       <TableRow>
// // // // //         <TableCell 
// // // // //           padding="checkbox" 
// // // // //           >
// // // // //           <Checkbox
// // // // //             color="primary"
// // // // //             indeterminate={numSelected > 0 && numSelected < rowCount}
// // // // //             checked={rowCount > 0 && numSelected === rowCount}
// // // // //             onChange={onSelectAllClick}
// // // // //             inputProps={{ 'aria-label': 'select all montures' }}
// // // // //             icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff',}}/>}
// // // // //             checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
// // // // //             indeterminateIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><Box sx={{width: 12, height: 2, backgroundColor: 'white', borderRadius: 1}}/></Box>}
// // // // //           />
// // // // //         </TableCell>
// // // // //         {headCells.map((headCell) => (
// // // // //           <TableCell
// // // // //             key={headCell.id}
// // // // //             sortDirection={orderBy === headCell.id ? order : false}
// // // // //           >
// // // // //             {headCell.id !== 'actions' ? (
// // // // //               <TableSortLabel
// // // // //                 active={orderBy === headCell.id}
// // // // //                 direction={orderBy === headCell.id ? order : 'asc'}
// // // // //                 onClick={createSortHandler(headCell.id)}
// // // // //               >
// // // // //                 {headCell.label}
// // // // //                 {orderBy === headCell.id ? (
// // // // //                   <Box component="span" sx={visuallyHidden}>
// // // // //                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
// // // // //                   </Box>
// // // // //                 ) : null}
// // // // //               </TableSortLabel>
// // // // //             ) : (
// // // // //               headCell.label
// // // // //             )}
// // // // //           </TableCell>
// // // // //         ))}
// // // // //       </TableRow>
// // // // //     </TableHead>
// // // // //   );
// // // // // }

// // // // // EnhancedTableHead.propTypes = {
// // // // //   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
// // // // //   orderBy: PropTypes.string.isRequired,
// // // // //   onRequestSort: PropTypes.func.isRequired,
// // // // //   onSelectAllClick: PropTypes.func.isRequired,
// // // // //   rowCount: PropTypes.number.isRequired,
// // // // //   numSelected: PropTypes.number.isRequired,
// // // // // };

// // // // // function MontureTable({ montures, onEdit, onDelete }) {
// // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // //   const [order, setOrder] = useState('asc');
// // // // //   const [orderBy, setOrderBy] = useState('marque');
// // // // //   const [page, setPage] = useState(0);
// // // // //   const [rowsPerPage, setRowsPerPage] = useState(5);
// // // // //   const [selected, setSelected] = useState([]);

// // // // //   const handleRequestSort = (event, property) => {
// // // // //     const isAsc = orderBy === property && order === 'asc';
// // // // //     setOrder(isAsc ? 'desc' : 'asc');
// // // // //     setOrderBy(property);
// // // // //   };

// // // // //   const handleChangePage = (event, newPage) => setPage(newPage);
// // // // //   const handleChangeRowsPerPage = (event) => {
// // // // //     setRowsPerPage(parseInt(event.target.value, 10));
// // // // //     setPage(0);
// // // // //   };

// // // // //   const displayValue = (value, defaultValue = '-') =>
// // // // //     value !== null && value !== undefined ? value : defaultValue;

// // // // //   const filteredMontures = montures.filter((monture) =>
// // // // //     (monture.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
// // // // //     (monture.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
// // // // //   );

// // // // //   const sortedMontures = filteredMontures.sort(getComparator(order, orderBy));
// // // // //   const paginatedMontures = sortedMontures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

// // // // //   const isSelected = (id) => selected.includes(id);

// // // // //   const handleSelectAllClick = (event) => {
// // // // //     if (event.target.checked) {
// // // // //       const newSelected = paginatedMontures.map((n) => n.id);
// // // // //       setSelected(newSelected);
// // // // //     } else {
// // // // //       setSelected([]);
// // // // //     }
// // // // //   };

// // // // //   const handleClick = (id) => {
// // // // //     setSelected((prevSelected) =>
// // // // //       prevSelected.includes(id)
// // // // //         ? prevSelected.filter((selectedId) => selectedId !== id)
// // // // //         : [...prevSelected, id]
// // // // //     );
// // // // //   };

// // // // //   // const handleDeleteSelected = () => {
// // // // //   //   selected.forEach((id) => {
// // // // //   //     const montureToDelete = montures.find((m) => m.id === id);
// // // // //   //     if (montureToDelete) onDelete(montureToDelete);
// // // // //   //   });
// // // // //   //   setSelected([]);
// // // // //   // };

// // // // //   const handleDeleteSelected = async () => {
// // // // //   if (selected.length === 0) return;

// // // // //   try {
// // // // //     const response = await fetch('http://localhost:8080/monture/delete/bulk', {
// // // // //       method: 'DELETE',
// // // // //       headers: {
// // // // //         'Content-Type': 'application/json',
// // // // //       },
// // // // //       body: JSON.stringify(selected),
// // // // //     });

// // // // //     if (!response.ok) {
// // // // //       throw new Error('Failed to delete selected items');
// // // // //     }

// // // // //     // Call onDelete for each deleted item to update the frontend state
// // // // //     selected.forEach((id) => {
// // // // //       const montureToDelete = montures.find((m) => m.id === id);
// // // // //       if (montureToDelete) onDelete(montureToDelete);
// // // // //     });

// // // // //     setSelected([]);
// // // // //   } catch (error) {
// // // // //     console.error('Bulk delete error:', error);
// // // // //     alert('Une erreur est survenue lors de la suppression.');
// // // // //   }
// // // // // };

// // // // //   return (
// // // // //     <Box sx={{ width: '100%' }}>
// // // // //       <Paper sx={{ width: '100%', mb: 2, borderRadius:'16px' , boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)'}}>
// // // // //         <Toolbar sx={{ padding:4 }}>

// // // // //           {/* <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
// // // // //             Montures
// // // // //           </Typography> */}
// // // // //           <TextField
// // // // //             variant="outlined"
// // // // //             size="small"
// // // // //             placeholder="Rechercher..."
// // // // //             value={searchTerm}
// // // // //             onChange={(e) => setSearchTerm(e.target.value)}
// // // // //             sx={{
// // // // //               // mt: 2,       // margin-top outside the field
// // // // //               // ml: 2,       // margin-left outside the field
// // // // //               width: 350,
// // // // //               borderRadius : '8px',
// // // // //               '& .MuiOutlinedInput-root': {
// // // // //                 borderRadius: '8px',
// // // // //                 height: 55,  // set input height
// // // // //               },
// // // // //             }}
// // // // //             InputProps={{
// // // // //               startAdornment: (
// // // // //                 <InputAdornment position="start">
// // // // //                   <SearchIcon />
// // // // //                 </InputAdornment>
// // // // //               ),
// // // // //             }}
// // // // //           />
// // // // //           {selected.length > 0 && (
// // // // //             <Tooltip title="Supprimer la sélection">
// // // // //               <IconButton onClick={handleDeleteSelected} sx={{ ml: 2 }}>
// // // // //                 <DeleteIcon color="error" />
// // // // //               </IconButton>
// // // // //             </Tooltip>
// // // // //           )}
// // // // //         </Toolbar>
// // // // //         <TableContainer>
// // // // //           <Table>
// // // // //             <EnhancedTableHead
// // // // //               order={order}
// // // // //               orderBy={orderBy}
// // // // //               onRequestSort={handleRequestSort}
// // // // //               onSelectAllClick={handleSelectAllClick}
// // // // //               rowCount={paginatedMontures.length}
// // // // //               numSelected={selected.length}
// // // // //             />
// // // // //             <TableBody>
// // // // //               {paginatedMontures.map((monture) => {
// // // // //                 const isItemSelected = isSelected(monture.id);
// // // // //                 return (
// // // // //                   <TableRow key={monture.id} hover selected={isItemSelected}>
// // // // //                     <TableCell padding="checkbox">
// // // // //                       <Checkbox
// // // // //                         checked={isItemSelected}
// // // // //                         onChange={() => handleClick(monture.id)}
// // // // //                         inputProps={{ 'aria-label': 'select monture' }}
// // // // //                         icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff',}}/>}
// // // // //                         checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
// // // // //                       />
// // // // //                     </TableCell>
// // // // //                     <TableCell>{displayValue(monture.marque)}</TableCell>
// // // // //                     <TableCell>{displayValue(monture.reference)}</TableCell>
// // // // //                     <TableCell>{displayValue(monture.couleur)}</TableCell>
// // // // //                     <TableCell>{displayValue(monture.genre)}</TableCell>
// // // // //                     <TableCell>{displayValue(monture.forme)}</TableCell>
// // // // //                     <TableCell>{displayValue(monture.matiere)}</TableCell>
// // // // //                     <TableCell>{displayValue(monture.prixVente, 0)} €</TableCell>
// // // // //                     <TableCell>{displayValue(monture.quantiteInitiale, 0)}</TableCell>
// // // // //                     <TableCell>
// // // // //                       <Tooltip title="Modifier">
// // // // //                         <IconButton onClick={() => onEdit(monture)}>
// // // // //                           <EditIcon color="primary" />
// // // // //                         </IconButton>
// // // // //                       </Tooltip>
// // // // //                       <Tooltip title="Supprimer">
// // // // //                         <IconButton onClick={() => onDelete(monture)}>
// // // // //                           <DeleteIcon color="error" />
// // // // //                         </IconButton>
// // // // //                       </Tooltip>
// // // // //                     </TableCell>
// // // // //                   </TableRow>
// // // // //                 );
// // // // //               })}
// // // // //               {paginatedMontures.length === 0 && (
// // // // //                 <TableRow>
// // // // //                   <TableCell colSpan={10} align="center">
// // // // //                     Aucune monture trouvée
// // // // //                   </TableCell>
// // // // //                 </TableRow>
// // // // //               )}
// // // // //             </TableBody>
// // // // //           </Table>
// // // // //         </TableContainer>
// // // // //         <TablePagination
// // // // //           rowsPerPageOptions={[5, 10, 25]}
// // // // //           component="div"
// // // // //           count={filteredMontures.length}
// // // // //           rowsPerPage={rowsPerPage}
// // // // //           page={page}
// // // // //           onPageChange={handleChangePage}
// // // // //           onRowsPerPageChange={handleChangeRowsPerPage}
// // // // //         />
// // // // //       </Paper>
// // // // //     </Box>
// // // // //   );
// // // // // }

// // // // // MontureTable.propTypes = {
// // // // //   montures: PropTypes.array.isRequired,
// // // // //   onEdit: PropTypes.func.isRequired,
// // // // //   onDelete: PropTypes.func.isRequired,
// // // // // };

// // // // // export default MontureTable;





