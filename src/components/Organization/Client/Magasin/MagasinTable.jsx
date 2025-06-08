import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';


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
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
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
  { id: 'nom', label: 'Nom' },
  { id: 'ville', label: 'Ville' },
  { id: 'adresse', label: 'Adresse' },
  { id: 'tel', label: 'Téléphone' },
  { id: 'email', label: 'Email' },
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
                    {order === 'desc' ? 'tri décroissant' : 'tri croissant'}
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

const MagasinTable = ({ magasins, onEdit, onDelete }) => {
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = magasins.map((m) => m.id);
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

  const filteredMagasins = magasins.filter((m) =>
    (m.nom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (m.ville?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const sortedMagasins = filteredMagasins.sort(getComparator(order, orderBy));
  const paginatedMagasins = sortedMagasins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const isSelected = (id) => selected.includes(id);

  const handleDeleteSelected = async () => {
    if (selected.length === 0) return;

    try {
      const response = await fetch('http://localhost:8080/magasin/delete/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selected),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression des magasins');
      }

      selected.forEach((id) => {
        const magasinToDelete = magasins.find((m) => m.id === id);
        if (magasinToDelete) onDelete(magasinToDelete);
      });

      setSelected([]);
    } catch (err) {
      console.error(err);
      alert('Une erreur est survenue.');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius:'16px' , boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)' }}>
        <Toolbar sx={{ padding: 4 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher par nom ou ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 350, '& .MuiOutlinedInput-root': { borderRadius: '8px', height: 55 } }}
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
          <Table sx={{ minWidth: 650 }}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              rowCount={paginatedMagasins.length}
              numSelected={selected.length}
            />
            <TableBody>
              {paginatedMagasins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1} align="center">
                    Aucun magasin trouvé.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedMagasins.map((row) => {
                  const isItemSelected = isSelected(row.id);
                  return (
                    <TableRow
                      hover
                      key={row.id}
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onChange={() => handleClick(row.id)}
                          icon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #cfd8dc', backgroundColor: '#fff',}}/>}
                          checkedIcon={<Box sx={{ width: 20, height: 20, borderRadius: '6px', border: '2px solid #1976d2', backgroundColor: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'}}><CheckIcon sx={{ fontSize: 16 }} /></Box>}
                        />
                      </TableCell>
                      <TableCell>{row.nom}</TableCell>
                      <TableCell>{row.ville}</TableCell>
                      <TableCell>{row.adresse}</TableCell>
                      <TableCell>{row.tel}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => onEdit(row)}><EditIcon /></IconButton>
                        <IconButton onClick={() => onDelete(row)}><DeleteIcon /></IconButton>
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
          count={filteredMagasins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

MagasinTable.propTypes = {
  magasins: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MagasinTable;
