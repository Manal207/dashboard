import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
  { id: 'diametre', label: 'Diamètre' },
  { id: 'rayonCourbure', label: 'Rayon de Courbure' },
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
            inputProps={{ 'aria-label': 'select all lentilles' }}
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

function LentilleTable({ lentilles, onEdit, onDelete }) {
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

  const filteredLentilles = lentilles.filter((lentille) =>
    (lentille.marque?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (lentille.reference?.toLowerCase() || '').includes(searchTerm.toLowerCase())
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
        headers: {
          'Content-Type': 'application/json',
        },
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
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
            Lentilles
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ ml: 2 }}
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
              rowCount={paginatedLentilles.length}
              numSelected={selected.length}
            />
            <TableBody>
              {paginatedLentilles.map((lentille) => {
                const isItemSelected = isSelected(lentille.id);
                return (
                  <TableRow key={lentille.id} hover selected={isItemSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={() => handleClick(lentille.id)}
                      />
                    </TableCell>
                    <TableCell>{displayValue(lentille.marque)}</TableCell>
                    <TableCell>{displayValue(lentille.reference)}</TableCell>
                    <TableCell>{displayValue(lentille.couleur)}</TableCell>
                    <TableCell>{displayValue(lentille.diametre)}</TableCell>
                    <TableCell>{displayValue(lentille.rayonCourbure)}</TableCell>
                    <TableCell>{displayValue(lentille.prixVente, 0)} €</TableCell>
                    <TableCell>{displayValue(lentille.quantiteInitiale, 0)}</TableCell>
                    <TableCell>
                      <Tooltip title="Modifier">
                        <IconButton onClick={() => onEdit(lentille)}>
                          <EditIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton onClick={() => onDelete(lentille)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {paginatedLentilles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    Aucune lentille trouvée
                  </TableCell>
                </TableRow>
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
}

LentilleTable.propTypes = {
  lentilles: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LentilleTable;
