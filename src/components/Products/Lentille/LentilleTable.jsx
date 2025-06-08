// LentilleTable.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
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

const EnhancedTableHead = ({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

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
            icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff',}}/>}
            checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
            indeterminateIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><Box sx={{width: 12, height: 2, backgroundColor: 'white', borderRadius: 1}}/></Box>}
            
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== 'actions' ? (
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
};

const LentilleTable = ({ lentilles, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('designation');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius:'16px' , boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)' }}>
        <Toolbar sx={{ padding: 4 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher par désignation, marque ou modèle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: 350,
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
                <DeleteIcon />
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
            />
            <TableBody>
              {paginatedLentilles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1} align="center">
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
                          icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff',}}/>}
                          checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
                        />
                      </TableCell>
                      <TableCell>{displayValue(row.designation)}</TableCell>
                      <TableCell>{displayValue(row.marque)}</TableCell>
                      <TableCell>{displayValue(row.modele)}</TableCell>
                      <TableCell>{displayValue(row.matiere)}</TableCell>
                      <TableCell>{displayValue(row.duree)}</TableCell>
                      <TableCell>{`${displayValue(row.prixVente)} €`}</TableCell>
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

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
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
//   Typography,
//   Paper,
//   Checkbox,
//   IconButton,
//   Tooltip,
//   TextField,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { visuallyHidden } from '@mui/utils';

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
//   { id: 'marque', label: 'Marque' },
//   { id: 'reference', label: 'Référence' },
//   { id: 'couleur', label: 'Couleur' },
//   { id: 'diametre', label: 'Diamètre' },
//   { id: 'rayonCourbure', label: 'Rayon de Courbure' },
//   { id: 'prixVente', label: 'Prix Vente (€)' },
//   { id: 'quantiteInitiale', label: 'Quantité' },
//   { id: 'actions', label: 'Actions' },
// ];

// function EnhancedTableHead({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected }) {
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ 'aria-label': 'select all lentilles' }}
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
// }

// EnhancedTableHead.propTypes = {
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   rowCount: PropTypes.number.isRequired,
//   numSelected: PropTypes.number.isRequired,
// };

// function LentilleTable({ lentilles, onEdit, onDelete }) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('marque');
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
//     (lentille.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//     (lentille.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
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
//         headers: {
//           'Content-Type': 'application/json',
//         },
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
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <Toolbar>
//           <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
//             Lentilles
//           </Typography>
//           <TextField
//             variant="outlined"
//             size="small"
//             placeholder="Rechercher..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{ ml: 2 }}
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
//               rowCount={paginatedLentilles.length}
//               numSelected={selected.length}
//             />
//             <TableBody>
//               {paginatedLentilles.map((lentille) => {
//                 const isItemSelected = isSelected(lentille.id);
//                 return (
//                   <TableRow key={lentille.id} hover selected={isItemSelected}>
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         checked={isItemSelected}
//                         onChange={() => handleClick(lentille.id)}
//                       />
//                     </TableCell>
//                     <TableCell>{displayValue(lentille.marque)}</TableCell>
//                     <TableCell>{displayValue(lentille.reference)}</TableCell>
//                     <TableCell>{displayValue(lentille.couleur)}</TableCell>
//                     <TableCell>{displayValue(lentille.diametre)}</TableCell>
//                     <TableCell>{displayValue(lentille.rayonCourbure)}</TableCell>
//                     <TableCell>{displayValue(lentille.prixVente, 0)} €</TableCell>
//                     <TableCell>{displayValue(lentille.quantiteInitiale, 0)}</TableCell>
//                     <TableCell>
//                       <Tooltip title="Modifier">
//                         <IconButton onClick={() => onEdit(lentille)}>
//                           <EditIcon color="primary" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Supprimer">
//                         <IconButton onClick={() => onDelete(lentille)}>
//                           <DeleteIcon color="error" />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//               {paginatedLentilles.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={9} align="center">
//                     Aucune lentille trouvée
//                   </TableCell>
//                 </TableRow>
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
// }

// LentilleTable.propTypes = {
//   lentilles: PropTypes.array.isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// export default LentilleTable;
