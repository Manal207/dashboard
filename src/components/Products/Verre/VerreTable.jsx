// VerreTable.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
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

// const headCells = [
//   { id: 'nom', label: 'Nom' },
//   { id: 'nomInterne', label: 'Nom Interne' },
//   { id: 'pht', label: 'PHT' },
//   { id: 'duret', label: 'Duret' },
//   { id: 'uv', label: 'UV' },
//   { id: 'ar', label: 'AR' },
//   { id: 'teint', label: 'Teint' },
//   { id: 'solaire', label: 'Solaire' },
//   { id: 'valeurMin', label: 'Valeur Min' },
//   { id: 'valeurMax', label: 'Valeur Max' },
//   { id: 'gamme', label: 'Gamme' },
//   { id: 'fournisseur', label: 'Fournisseur' },
//   { id: 'actions', label: 'Actions' },
// ];

// const headCells = [
//   { id: 'marque', label: 'Marque' },
//   { id: 'reference', label: 'Référence' },
//   { id: 'indice', label: 'Indice' },
//   { id: 'genre', label: 'Genre' },
//   { id: 'prixVente', label: 'Prix Vente' },
//   { id: 'actions', label: 'Actions' },
// ];

const headCells = [
  { id: 'nom', label: 'Nom' },
  { id: 'nomInterne', label: 'Référence' },
  { id: 'nature', label: 'Nature' },
  { id: 'indice', label: 'Indice' },
  { id: 'foyer', label: 'Foyer' },
  { id: 'prixVente', label: 'Prix Vente' },
  { id: 'actions', label: 'Actions' },
];

const EnhancedTableHead = ({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all verres' }}
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

const VerreTable = ({ verres, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nom');
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

  const filteredVerres = verres.filter((verre) =>
    (verre.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (verre.nomInterne?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const sortedVerres = filteredVerres.sort(getComparator(order, orderBy));
  const paginatedVerres = sortedVerres.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const isSelected = (id) => selected.includes(id);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = paginatedVerres.map((n) => n.id);
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
      const response = await fetch('http://localhost:8080/verre/delete/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selected),
      });

      if (!response.ok) {
        throw new Error('Failed to delete selected items');
      }

      selected.forEach((id) => {
        const verreToDelete = verres.find((v) => v.id === id);
        if (verreToDelete) onDelete(verreToDelete);
      });

      setSelected([]);
    } catch (error) {
      console.error('Bulk delete error:', error);
      alert('Une erreur est survenue lors de la suppression.');
    }
  };

  return (
       <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar sx={{ padding: 4 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher par nom ou référence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: 350,
              '& .MuiOutlinedInput-root': {
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
              rowCount={paginatedVerres.length}
              numSelected={selected.length}
            />
            <TableBody>
              {paginatedVerres.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1} align="center">
                    Aucun verre trouvé.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedVerres.map((row) => {
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
                          inputProps={{ 'aria-labelledby': `verre-${row.id}` }}
                        />
                      </TableCell>
                      <TableCell>{displayValue(row.nom)}</TableCell>
                      <TableCell>{displayValue(row.nomInterne)}</TableCell>
                      <TableCell>{displayValue(row.nature)}</TableCell>
                      <TableCell>{displayValue(row.indice)}</TableCell>
                      <TableCell>{displayValue(row.foyer)}</TableCell>
                      <TableCell>{`${displayValue(row.prixVente)} €`}</TableCell>
                      <TableCell>
                        <Tooltip title="Modifier">
                          <IconButton
                            color="primary"
                            onClick={() => onEdit(row)}
                            aria-label={`Modifier verre ${row.nom}`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <IconButton
                            color="error"
                            onClick={() => onDelete(row)}
                            aria-label={`Supprimer verre ${row.nom}`}
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
          count={filteredVerres.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>

  );
};

VerreTable.propTypes = {
  verres: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default VerreTable;

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import SearchIcon from '@mui/icons-material/Search';
// import { InputAdornment } from '@mui/material';
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
//   { id: 'nom', label: 'Nom' },
//   { id: 'nomInterne', label: 'Nom Interne' },
//   { id: 'pht', label: 'PHT' },
//   { id: 'duret', label: 'Duret' },
//   { id: 'uv', label: 'UV' },
//   { id: 'ar', label: 'AR' },
//   { id: 'teint', label: 'Teint' },
//   { id: 'solaire', label: 'Solaire' },
//   { id: 'valeurMin', label: 'Valeur Min' },
//   { id: 'valeurMax', label: 'Valeur Max' },
//   { id: 'gamme', label: 'Gamme' },
//   { id: 'fournisseur', label: 'Fournisseur' },
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
//             inputProps={{ 'aria-label': 'select all verres' }}
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

// function VerreTable({ verres, onEdit, onDelete }) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('nom');
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

//   // Search filters by 'nom' and 'nomInterne' fields:
//   const filteredVerres = verres.filter((verre) =>
//     (verre.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//     (verre.nomInterne?.toLowerCase() || '').includes(searchTerm.toLowerCase())
//   );

//   const sortedVerres = filteredVerres.sort(getComparator(order, orderBy));
//   const paginatedVerres = sortedVerres.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const isSelected = (id) => selected.includes(id);

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = paginatedVerres.map((n) => n.id);
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
//       const response = await fetch('http://localhost:8080/verre/delete/bulk', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(selected),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete selected items');
//       }

//       selected.forEach((id) => {
//         const verreToDelete = verres.find((v) => v.id === id);
//         if (verreToDelete) onDelete(verreToDelete);
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
//         <Toolbar sx={{ padding: 4 }}>
//           <TextField
//             variant="outlined"
//             size="small"
//             placeholder="Rechercher..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{
//               width: 350,
//               '& .MuiOutlinedInput-root': {
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
//           <Table sx={{ minWidth: 700 }} aria-labelledby="tableTitle" size="medium">
//             <EnhancedTableHead
//               order={order}
//               orderBy={orderBy}
//               onRequestSort={handleRequestSort}
//               onSelectAllClick={handleSelectAllClick}
//               rowCount={paginatedVerres.length}
//               numSelected={selected.length}
//             />
//             <TableBody>
//               {paginatedVerres.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={headCells.length + 1} align="center">
//                     Aucun verre trouvé.
//                   </TableCell>
//                 </TableRow>
//               )}

//               {paginatedVerres.map((row) => {
//                 const isItemSelected = isSelected(row.id);
//                 return (
//                   <TableRow
//                     hover
//                     key={row.id}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     selected={isItemSelected}
//                     tabIndex={-1}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         checked={isItemSelected}
//                         onChange={() => handleClick(row.id)}
//                         inputProps={{ 'aria-labelledby': `verre-${row.id}` }}
//                       />
//                     </TableCell>
//                     <TableCell>{displayValue(row.nom)}</TableCell>
//                     <TableCell>{displayValue(row.nomInterne)}</TableCell>
//                     <TableCell>{displayValue(row.pht)}</TableCell>
//                     <TableCell>{row.duret ? 'Oui' : 'Non'}</TableCell>
//                     <TableCell>{row.uv ? 'Oui' : 'Non'}</TableCell>
//                     <TableCell>{displayValue(row.ar)}</TableCell>
//                     <TableCell>{displayValue(row.teint)}</TableCell>
//                     <TableCell>{row.solaire ? 'Oui' : 'Non'}</TableCell>
//                     <TableCell>{displayValue(row.valeurMin)}</TableCell>
//                     <TableCell>{displayValue(row.valeurMax)}</TableCell>
//                     <TableCell>{row.gamme || '-'}</TableCell>
//                     <TableCell>{row.fournisseur?.nom || '-'}</TableCell>
//                     <TableCell>
//                       <Tooltip title="Modifier">
//                         <IconButton
//                           color="primary"
//                           onClick={() => onEdit(row)}
//                           aria-label={`Modifier verre ${row.nom}`}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Supprimer">
//                         <IconButton
//                           color="error"
//                           onClick={() => onDelete(row)}
//                           aria-label={`Supprimer verre ${row.nom}`}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredVerres.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Box>
//   );
// }


// VerreTable.propTypes = {
//   verres: PropTypes.array.isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// export default VerreTable;



