// src/components/Vente/VenteTable.jsx
import React, { useState } from 'react';
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
  Chip,
  Avatar,
  Typography,
  InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils';

const headCells = [
  { id: 'numeroVente', label: 'N° Vente' },
  { id: 'dateCreation', label: 'Date' },
  { id: 'clientNom', label: 'Client' },
  { id: 'typeClient', label: 'Type' },
  { id: 'userNom', label: 'Créateur' },
  { id: 'statut', label: 'Statut' },
  { id: 'totalHT', label: 'Total HT' },
  { id: 'ficheCount', label: 'Fiches' },
  { id: 'actions', label: 'Actions' },
];

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

function EnhancedTableHead({ order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{ backgroundColor: '#F4F6F8' }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 600, fontSize: '0.875rem' }}
          >
            {headCell.id !== 'actions' ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id && (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                )}
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

const getStatutChip = (statut) => {
  const configs = {
    BROUILLON: { color: '#ed6c02', bg: '#fff3e0', label: 'Brouillon' },
    CONFIRMEE: { color: '#2e7d32', bg: '#e8f5e8', label: 'Confirmée' },
    FACTUREE: { color: '#1976d2', bg: '#e3f2fd', label: 'Facturée' },
    LIVREE: { color: '#7b1fa2', bg: '#f3e5f5', label: 'Livrée' },
    ANNULEE: { color: '#d32f2f', bg: '#ffebee', label: 'Annulée' },
  };
  
  const config = configs[statut] || configs.BROUILLON;
  
  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        backgroundColor: config.bg,
        color: config.color,
        fontWeight: 600,
        fontSize: '0.75rem'
      }}
    />
  );
};

const getTypeClientChip = (type) => {
  return (
    <Chip
      label={type}
      size="small"
      variant="outlined"
      sx={{
        fontSize: '0.75rem',
        fontWeight: 500,
        borderColor: type === 'MAGASIN' ? '#1976d2' : '#9c27b0',
        color: type === 'MAGASIN' ? '#1976d2' : '#9c27b0'
      }}
    />
  );
};

function VenteTable({ ventes, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('dateCreation');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const displayValue = (value, defaultValue = '-') =>
    value !== null && value !== undefined ? value : defaultValue;

  const filteredVentes = ventes.filter((vente) =>
    (vente.numeroVente?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (vente.clientNom?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (vente.userNom?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const sortedVentes = filteredVentes.sort(getComparator(order, orderBy));
  const paginatedVentes = sortedVentes.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ 
        width: '100%', 
        mb: 2, 
        borderRadius: '16px',
        boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)'
      }}>
        <Toolbar sx={{ p: 3 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher une vente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: 400,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                height: 48,
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
        </Toolbar>

        <TableContainer>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {paginatedVentes.map((vente) => (
                <TableRow key={vente.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {vente.numeroVente}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(vente.dateCreation)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                        {vente.clientNom?.charAt(0) || 'C'}
                      </Avatar>
                      <Typography variant="body2" fontWeight={500}>
                        {displayValue(vente.clientNom)}
                      </Typography>
                    </Box>
                  </TableCell>
                  
                  <TableCell>{getTypeClientChip(vente.typeClient)}</TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {displayValue(vente.userNom)}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>{getStatutChip(vente.statut)}</TableCell>
                  
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {displayValue(vente.totalHT, 0).toFixed(2)} DH
                    </Typography>
                  </TableCell>
                  
                  <TableCell>
                    <Chip
                      label={`${vente.fiches?.length || 0} fiche(s)`}
                      size="small"
                      color="info"
                      variant="outlined"
                    />
                  </TableCell>
                  
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Voir détails">
                        <IconButton size="small" onClick={() => onEdit(vente)}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Modifier">
                        <IconButton size="small" onClick={() => onEdit(vente)}>
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton size="small" onClick={() => onDelete(vente)}>
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              
              {paginatedVentes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary">
                      Aucune vente trouvée
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredVentes.length}
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

export default VenteTable;