import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { 
  InputAdornment, 
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
  TextField,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const headCells = [
  { id: 'designation', label: 'Désignation' },
  { id: 'marque', label: 'Marque' },
  { id: 'modele', label: 'Modèle' },
  { id: 'matiere', label: 'Matière' },
  { id: 'duree', label: 'Durée' },
  { id: 'prixVente', label: 'Prix Vente' },
  { id: 'actions', label: 'Actions' },
];

// Tablet simplified columns
const tabletHeadCells = [
  { id: 'product', label: 'Produit' },
  { id: 'specifications', label: 'Spécifications' },
  { id: 'prixVente', label: 'Prix' },
  { id: 'actions', label: 'Actions' },
];

const EnhancedTableHead = ({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected, isTablet }) => {
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
            inputProps={{ 'aria-label': 'select all lentilles' }}
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
            {headCell.id !== 'actions' && headCell.id !== 'specifications' ? (
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
};

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  numSelected: PropTypes.number.isRequired,
  isTablet: PropTypes.bool
};

// Mobile Card Component for Lentilles
function MobileLentilleCard({ lentille, isSelected, onSelect, onEdit, onDelete }) {
  const getDurationColor = (duree) => {
    if (!duree) return 'default';
    const duration = duree.toLowerCase();
    if (duration.includes('jour') || duration.includes('daily')) return 'info';
    if (duration.includes('semaine') || duration.includes('weekly')) return 'success';
    if (duration.includes('mois') || duration.includes('monthly')) return 'warning';
    return 'default';
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
        <Box>
          {/* Product name and brand */}
          <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem', mb: 1, lineHeight: 1.2 }}>
            {lentille.designation}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {[lentille.marque, lentille.modele].filter(Boolean).join(' • ')}
          </Typography>

          {/* Price and Duration */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={700} color="primary.main" sx={{ fontSize: '1.1rem' }}>
              {lentille.prixVente}€
            </Typography>
            {lentille.duree && (
              <Chip 
                label={lentille.duree}
                color={getDurationColor(lentille.duree)}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            )}
          </Box>

          {/* Specifications */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {lentille.matiere && (
              <Chip label={`Matière: ${lentille.matiere}`} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 20 }} />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

const LentilleTable = ({ lentilles, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('designation');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 10 : 5);
  const [selected, setSelected] = useState([]);

  // Update rows per page when screen size changes
  React.useEffect(() => {
    setRowsPerPage(isMobile ? 10 : 5);
    setPage(0);
  }, [isMobile]);

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

  const filteredLentilles = lentilles.filter((lentille) =>
    (lentille.designation?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (lentille.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (lentille.modele?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const sortedLentilles = filteredLentilles.sort(getComparator(order, orderBy));
  const paginatedLentilles = sortedLentilles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const isSelected = (id) => selected.includes(id);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = paginatedLentilles.map((n) => n.id);
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
      const response = await fetch('http://localhost:8080/lentille/delete/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selected),
      });

      if (!response.ok) {
        throw new Error('Failed to delete selected items');
      }

      selected.forEach((id) => {
        const lentilleToDelete = lentilles.find((l) => l.id === id);
        if (lentilleToDelete) onDelete(lentilleToDelete);
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
              placeholder="Rechercher lentilles..."
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
          {paginatedLentilles.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
              <Typography variant="body1" color="text.secondary">
                Aucune lentille trouvée
              </Typography>
            </Paper>
          ) : (
            paginatedLentilles.map((lentille) => (
              <MobileLentilleCard
                key={lentille.id}
                lentille={lentille}
                isSelected={isSelected(lentille.id)}
                onSelect={() => handleClick(lentille.id)}
                onEdit={() => onEdit(lentille)}
                onDelete={() => onDelete(lentille)}
              />
            ))
          )}
        </Box>

        {/* Mobile Pagination */}
        <Paper sx={{ borderRadius: '12px', mt: 2 }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredLentilles.length}
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
            placeholder="Rechercher par désignation, marque ou modèle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 350 },
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
          <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              rowCount={paginatedLentilles.length}
              numSelected={selected.length}
              isTablet={isTablet}
            />
            <TableBody>
              {paginatedLentilles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isTablet ? 5 : 8} align="center">
                    Aucune lentille trouvée.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedLentilles.map((row) => {
                  const isItemSelected = isSelected(row.id);
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                      tabIndex={-1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onChange={() => handleClick(row.id)}
                          inputProps={{ 'aria-labelledby': `lentille-${row.id}` }}
                          icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff'}}/>}
                          checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
                        />
                      </TableCell>
                      
                      {isTablet ? (
                        // Tablet Layout - Simplified columns
                        <>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {displayValue(row.designation)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {[row.marque, row.modele].filter(Boolean).join(' • ')}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant="body2">
                                {displayValue(row.matiere)}
                              </Typography>
                              {row.duree && (
                                <Typography variant="caption" color="text.secondary">
                                  Durée: {row.duree}
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600} color="primary.main">
                              {displayValue(row.prixVente)}€
                            </Typography>
                          </TableCell>
                        </>
                      ) : (
                        // Desktop Layout - All columns
                        <>
                          <TableCell>{displayValue(row.designation)}</TableCell>
                          <TableCell>{displayValue(row.marque)}</TableCell>
                          <TableCell>{displayValue(row.modele)}</TableCell>
                          <TableCell>{displayValue(row.matiere)}</TableCell>
                          <TableCell>{displayValue(row.duree)}</TableCell>
                          <TableCell>{`${displayValue(row.prixVente)} €`}</TableCell>
                        </>
                      )}
                      
                      <TableCell>
                        <Tooltip title="Modifier">
                          <IconButton
                            color="primary"
                            onClick={() => onEdit(row)}
                            aria-label={`Modifier lentille ${row.designation}`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <IconButton
                            color="error"
                            onClick={() => onDelete(row)}
                            aria-label={`Supprimer lentille ${row.designation}`}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredLentilles.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

LentilleTable.propTypes = {
  lentilles: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LentilleTable;

// // LentilleTable.jsx
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import SearchIcon from '@mui/icons-material/Search';
// import { InputAdornment } from '@mui/material';
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
//   TextField,
//   Paper,
//   Checkbox,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { visuallyHidden } from '@mui/utils';

// const descendingComparator = (a, b, orderBy) => {
//   if (b[orderBy] < a[orderBy]) return -1;
//   if (b[orderBy] > a[orderBy]) return 1;
//   return 0;
// };

// const getComparator = (order, orderBy) => {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// };

// const headCells = [
//   { id: 'designation', label: 'Désignation' },
//   { id: 'marque', label: 'Marque' },
//   { id: 'modele', label: 'Modèle' },
//   { id: 'matiere', label: 'Matière' },
//   { id: 'duree', label: 'Durée' },
//   { id: 'prixVente', label: 'Prix Vente' },
//   { id: 'actions', label: 'Actions' },
// ];

// const EnhancedTableHead = ({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected }) => {
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
//             inputProps={{ 'aria-label': 'select all lentilles' }}
//             icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff',}}/>}
//             checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
//             indeterminateIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><Box sx={{width: 12, height: 2, backgroundColor: 'white', borderRadius: 1}}/></Box>}
            
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             {headCell.id !== 'actions' ? (
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
// };

// EnhancedTableHead.propTypes = {
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   rowCount: PropTypes.number.isRequired,
//   numSelected: PropTypes.number.isRequired,
// };

// const LentilleTable = ({ lentilles, onEdit, onDelete }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('designation');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selected, setSelected] = useState([]);

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

//   const filteredLentilles = lentilles.filter((lentille) =>
//     (lentille.designation?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//     (lentille.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//     (lentille.modele?.toLowerCase() || '').includes(searchTerm.toLowerCase())
//   );

//   const sortedLentilles = filteredLentilles.sort(getComparator(order, orderBy));
//   const paginatedLentilles = sortedLentilles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const isSelected = (id) => selected.includes(id);

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = paginatedLentilles.map((n) => n.id);
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
//       const response = await fetch('http://localhost:8080/lentille/delete/bulk', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(selected),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete selected items');
//       }

//       selected.forEach((id) => {
//         const lentilleToDelete = lentilles.find((l) => l.id === id);
//         if (lentilleToDelete) onDelete(lentilleToDelete);
//       });

//       setSelected([]);
//     } catch (error) {
//       console.error('Bulk delete error:', error);
//       alert('Une erreur est survenue lors de la suppression.');
//     }
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2, borderRadius:'16px' , boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)' }}>
//         <Toolbar sx={{ padding: 4 }}>
//           <TextField
//             variant="outlined"
//             size="small"
//             placeholder="Rechercher par désignation, marque ou modèle..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{
//               width: 350,
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
//                 <DeleteIcon />
//               </IconButton>
//             </Tooltip>
//           )}
//         </Toolbar>

//         <TableContainer>
//           <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle" size="medium">
//             <EnhancedTableHead
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={handleRequestSort}
//               onSelectAllClick={handleSelectAllClick}
//               rowCount={paginatedLentilles.length}
//               numSelected={selected.length}
//             />
//             <TableBody>
//               {paginatedLentilles.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={headCells.length + 1} align="center">
//                     Aucune lentille trouvée.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 paginatedLentilles.map((row) => {
//                   const isItemSelected = isSelected(row.id);
//                   return (
//                     <TableRow
//                       hover
//                       key={row.id}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       selected={isItemSelected}
//                       tabIndex={-1}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           color="primary"
//                           checked={isItemSelected}
//                           onChange={() => handleClick(row.id)}
//                           inputProps={{ 'aria-labelledby': `lentille-${row.id}` }}
//                           icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff',}}/>}
//                           checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
//                         />
//                       </TableCell>
//                       <TableCell>{displayValue(row.designation)}</TableCell>
//                       <TableCell>{displayValue(row.marque)}</TableCell>
//                       <TableCell>{displayValue(row.modele)}</TableCell>
//                       <TableCell>{displayValue(row.matiere)}</TableCell>
//                       <TableCell>{displayValue(row.duree)}</TableCell>
//                       <TableCell>{`${displayValue(row.prixVente)} €`}</TableCell>
//                       <TableCell>
//                         <Tooltip title="Modifier">
//                           <IconButton
//                             color="primary"
//                             onClick={() => onEdit(row)}
//                             aria-label={`Modifier lentille ${row.designation}`}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Supprimer">
//                           <IconButton
//                             color="error"
//                             onClick={() => onDelete(row)}
//                             aria-label={`Supprimer lentille ${row.designation}`}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredLentilles.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Box>
//   );
// };

// LentilleTable.propTypes = {
//   lentilles: PropTypes.array.isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// export default LentilleTable;

// // import React, { useState } from 'react';
// // import PropTypes from 'prop-types';
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
// //   Typography,
// //   Paper,
// //   Checkbox,
// //   IconButton,
// //   Tooltip,
// //   TextField,
// // } from '@mui/material';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import EditIcon from '@mui/icons-material/Edit';
// // import { visuallyHidden } from '@mui/utils';

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
// //   { id: 'marque', label: 'Marque' },
// //   { id: 'reference', label: 'Référence' },
// //   { id: 'couleur', label: 'Couleur' },
// //   { id: 'diametre', label: 'Diamètre' },
// //   { id: 'rayonCourbure', label: 'Rayon de Courbure' },
// //   { id: 'prixVente', label: 'Prix Vente (€)' },
// //   { id: 'quantiteInitiale', label: 'Quantité' },
// //   { id: 'actions', label: 'Actions' },
// // ];

// // function EnhancedTableHead({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected }) {
// //   const createSortHandler = (property) => (event) => {
// //     onRequestSort(event, property);
// //   };

// //   return (
// //     <TableHead>
// //       <TableRow>
// //         <TableCell padding="checkbox">
// //           <Checkbox
// //             color="primary"
// //             indeterminate={numSelected > 0 && numSelected < rowCount}
// //             checked={rowCount > 0 && numSelected === rowCount}
// //             onChange={onSelectAllClick}
// //             inputProps={{ 'aria-label': 'select all lentilles' }}
// //           />
// //         </TableCell>
// //         {headCells.map((headCell) => (
// //           <TableCell
// //             key={headCell.id}
// //             sortDirection={orderBy === headCell.id ? order : false}
// //           >
// //             {headCell.id !== 'actions' ? (
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

// // function LentilleTable({ lentilles, onEdit, onDelete }) {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [order, setOrder] = useState('asc');
// //   const [orderBy, setOrderBy] = useState('marque');
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(5);
// //   const [selected, setSelected] = useState([]);

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

// //   const filteredLentilles = lentilles.filter((lentille) =>
// //     (lentille.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
// //     (lentille.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
// //   );

// //   const sortedLentilles = filteredLentilles.sort(getComparator(order, orderBy));
// //   const paginatedLentilles = sortedLentilles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

// //   const isSelected = (id) => selected.includes(id);

// //   const handleSelectAllClick = (event) => {
// //     if (event.target.checked) {
// //       const newSelected = paginatedLentilles.map((n) => n.id);
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
// //       const response = await fetch('http://localhost:8080/lentille/delete/bulk', {
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
// //         const lentilleToDelete = lentilles.find((l) => l.id === id);
// //         if (lentilleToDelete) onDelete(lentilleToDelete);
// //       });

// //       setSelected([]);
// //     } catch (error) {
// //       console.error('Bulk delete error:', error);
// //       alert('Une erreur est survenue lors de la suppression.');
// //     }
// //   };

// //   return (
// //     <Box sx={{ width: '100%' }}>
// //       <Paper sx={{ width: '100%', mb: 2 }}>
// //         <Toolbar>
// //           <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
// //             Lentilles
// //           </Typography>
// //           <TextField
// //             variant="outlined"
// //             size="small"
// //             placeholder="Rechercher..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             sx={{ ml: 2 }}
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
// //               rowCount={paginatedLentilles.length}
// //               numSelected={selected.length}
// //             />
// //             <TableBody>
// //               {paginatedLentilles.map((lentille) => {
// //                 const isItemSelected = isSelected(lentille.id);
// //                 return (
// //                   <TableRow key={lentille.id} hover selected={isItemSelected}>
// //                     <TableCell padding="checkbox">
// //                       <Checkbox
// //                         color="primary"
// //                         checked={isItemSelected}
// //                         onChange={() => handleClick(lentille.id)}
// //                       />
// //                     </TableCell>
// //                     <TableCell>{displayValue(lentille.marque)}</TableCell>
// //                     <TableCell>{displayValue(lentille.reference)}</TableCell>
// //                     <TableCell>{displayValue(lentille.couleur)}</TableCell>
// //                     <TableCell>{displayValue(lentille.diametre)}</TableCell>
// //                     <TableCell>{displayValue(lentille.rayonCourbure)}</TableCell>
// //                     <TableCell>{displayValue(lentille.prixVente, 0)} €</TableCell>
// //                     <TableCell>{displayValue(lentille.quantiteInitiale, 0)}</TableCell>
// //                     <TableCell>
// //                       <Tooltip title="Modifier">
// //                         <IconButton onClick={() => onEdit(lentille)}>
// //                           <EditIcon color="primary" />
// //                         </IconButton>
// //                       </Tooltip>
// //                       <Tooltip title="Supprimer">
// //                         <IconButton onClick={() => onDelete(lentille)}>
// //                           <DeleteIcon color="error" />
// //                         </IconButton>
// //                       </Tooltip>
// //                     </TableCell>
// //                   </TableRow>
// //                 );
// //               })}
// //               {paginatedLentilles.length === 0 && (
// //                 <TableRow>
// //                   <TableCell colSpan={9} align="center">
// //                     Aucune lentille trouvée
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //         <TablePagination
// //           rowsPerPageOptions={[5, 10, 25]}
// //           component="div"
// //           count={filteredLentilles.length}
// //           rowsPerPage={rowsPerPage}
// //           page={page}
// //           onPageChange={handleChangePage}
// //           onRowsPerPageChange={handleChangeRowsPerPage}
// //         />
// //       </Paper>
// //     </Box>
// //   );
// // }

// // LentilleTable.propTypes = {
// //   lentilles: PropTypes.array.isRequired,
// //   onEdit: PropTypes.func.isRequired,
// //   onDelete: PropTypes.func.isRequired,
// // };

// // export default LentilleTable;
