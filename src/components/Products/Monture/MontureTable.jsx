


import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment} from '@mui/material';
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
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  TextField,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

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

function EnhancedTableHead({ order, orderBy, onRequestSort, onSelectAllClick, rowCount, numSelected }) {
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
            inputProps={{ 'aria-label': 'select all montures' }}
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
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  numSelected: PropTypes.number.isRequired,
};

function MontureTable({ montures, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('marque');
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

  const filteredMontures = montures.filter((monture) =>
    (monture.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (monture.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
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

  // const handleDeleteSelected = () => {
  //   selected.forEach((id) => {
  //     const montureToDelete = montures.find((m) => m.id === id);
  //     if (montureToDelete) onDelete(montureToDelete);
  //   });
  //   setSelected([]);
  // };

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

    // Call onDelete for each deleted item to update the frontend state
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

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar sx={{ padding:4 }}>

          {/* <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
            Montures
          </Typography> */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              // mt: 2,       // margin-top outside the field
              // ml: 2,       // margin-left outside the field
              width: 350,
              '& .MuiOutlinedInput-root': {
                height: 55,  // set input height
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
            />
            <TableBody>
              {paginatedMontures.map((monture) => {
                const isItemSelected = isSelected(monture.id);
                return (
                  <TableRow key={monture.id} hover selected={isItemSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={() => handleClick(monture.id)}
                      />
                    </TableCell>
                    <TableCell>{displayValue(monture.marque)}</TableCell>
                    <TableCell>{displayValue(monture.reference)}</TableCell>
                    <TableCell>{displayValue(monture.couleur)}</TableCell>
                    <TableCell>{displayValue(monture.genre)}</TableCell>
                    <TableCell>{displayValue(monture.forme)}</TableCell>
                    <TableCell>{displayValue(monture.matiere)}</TableCell>
                    <TableCell>{displayValue(monture.prixVente, 0)} €</TableCell>
                    <TableCell>{displayValue(monture.quantiteInitiale, 0)}</TableCell>
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
                  <TableCell colSpan={10} align="center">
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
// // import FilterListIcon from '@mui/icons-material/FilterList';
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
// //   { id: 'genre', label: 'Genre' },
// //   { id: 'forme', label: 'Forme' },
// //   { id: 'matiere', label: 'Matière' },
// //   { id: 'prixVente', label: 'Prix Vente (€)' },
// //   { id: 'quantiteInitiale', label: 'Quantité' },
// //   { id: 'actions', label: 'Actions' },
// // ];

// // function EnhancedTableHead({ order, orderBy, onRequestSort }) {
// //   const createSortHandler = (property) => (event) => {
// //     onRequestSort(event, property);
// //   };

// //   return (
// //     <TableHead>
// //       <TableRow>
// //         {headCells.map((headCell) => (
// //           <TableCell
// //             key={headCell.id}
// //             sortDirection={orderBy === headCell.id ? order : false}
// //             padding="checkbox"
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
// // };

// // function MontureTable({ montures, onEdit, onDelete }) {
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

// //   const displayValue = (value, defaultValue = '-') => (
// //     value !== null && value !== undefined ? value : defaultValue
// //   );

// //   const filteredMontures = montures.filter((monture) =>
// //     (monture.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
// //     (monture.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
// //   );

// //   const sortedMontures = filteredMontures.sort(getComparator(order, orderBy));
// //   const paginatedMontures = sortedMontures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);




// //   return (
// //     <Box sx={{ width: '100%' }}>

// //       <Paper sx={{ width: '100%', mb: 2 }}>
// //         <Toolbar>
// //           <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
// //             Montures
// //           </Typography>
// //           <TextField
// //             variant="outlined"
// //             size="small"
// //             placeholder="Rechercher..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             sx={{ ml: 2 }}
// //           />
// //         </Toolbar>
// //         <TableContainer>
// //           <Table>
// //             <EnhancedTableHead
// //               order={order}
// //               orderBy={orderBy}
// //               onRequestSort={handleRequestSort}
// //             />
// //             <TableBody>
// //               {paginatedMontures.map((monture) => (
// //                 <TableRow key={monture.id}>
// //                   <TableCell padding="checkbox">
 
// //       </TableCell>
// //                   <TableCell>{displayValue(monture.marque)}</TableCell>
// //                   <TableCell>{displayValue(monture.reference)}</TableCell>
// //                   <TableCell>{displayValue(monture.couleur)}</TableCell>
// //                   <TableCell>{displayValue(monture.genre)}</TableCell>
// //                   <TableCell>{displayValue(monture.forme)}</TableCell>
// //                   <TableCell>{displayValue(monture.matiere)}</TableCell>
// //                   <TableCell>{displayValue(monture.prixVente, 0)} €</TableCell>
// //                   <TableCell>{displayValue(monture.quantiteInitiale, 0)}</TableCell>
// //                   <TableCell>
// //                     <Tooltip title="Modifier">
// //                       <IconButton onClick={() => onEdit(monture)}>
// //                         <EditIcon color="primary" />
// //                       </IconButton>
// //                     </Tooltip>
// //                     <Tooltip title="Supprimer">
// //                       <IconButton onClick={() => onDelete(monture)}>
// //                         <DeleteIcon color="error" />
// //                       </IconButton>
// //                     </Tooltip>
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //               {paginatedMontures.length === 0 && (
// //                 <TableRow>
// //                   <TableCell colSpan={9} align="center">
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
// // import './MontureTable.css';

// function MontureTable({ montures, onEdit, onDelete }) {
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const filteredMontures = montures.filter(monture => 
//     (monture.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//     (monture.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
//   );

//   // Function to safely display values
//   const displayValue = (value, defaultValue = '-') => {
//     return value !== null && value !== undefined ? value : defaultValue;
//   };

//   return (
//     <div className="table-container">
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Rechercher par marque ou référence..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
      
//       {filteredMontures.length === 0 ? (
//         <div className="no-data">Aucune monture trouvée</div>
//       ) : (
//         <table className="monture-table">
//           <thead>
//             <tr>
//               <th>Marque</th>
//               <th>Référence</th>
//               <th>Couleur</th>
//               <th>Genre</th>
//               <th>Forme</th>
//               <th>Matière</th>
//               <th>Prix Vente</th>
//               <th>Quantité</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredMontures.map((monture) => (
//               <tr key={monture.id}>
//                 <td>{displayValue(monture.marque)}</td>
//                 <td>{displayValue(monture.reference)}</td>
//                 <td>{displayValue(monture.couleur)}</td>
//                 <td>{displayValue(monture.genre)}</td>
//                 <td>{displayValue(monture.forme)}</td>
//                 <td>{displayValue(monture.matiere)}</td>
//                 <td>{displayValue(monture.prixVente, 0)} €</td>
//                 <td>{displayValue(monture.quantiteInitiale, 0)}</td>
//                 <td className="actions">
//                   <button 
//                     className="btn-edit" 
//                     onClick={() => onEdit(monture)}
//                   >
//                     Modifier
//                   </button>
//                   <button 
//                     className="btn-delete" 
//                     onClick={() => onDelete(monture)}
//                   >
//                     Supprimer
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default MontureTable;