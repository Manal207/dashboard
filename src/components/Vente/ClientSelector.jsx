// src/components/Vente/ClientSelector.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  InputAdornment,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';

import { fetchAllMagasins, fetchAllParticuliers } from '../../api/venteApi';

function ClientSelector({ selectedType, selectedClientId, onClientSelect }) {
  const [clientType, setClientType] = useState(selectedType || '');
  const [magasins, setMagasins] = useState([]);
  const [particuliers, setParticuliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clientType) {
      loadClients();
    }
  }, [clientType]);

  const loadClients = async () => {
    try {
      setLoading(true);
      if (clientType === 'MAGASIN') {
        const data = await fetchAllMagasins();
        setMagasins(data);
      } else if (clientType === 'PARTICULIER') {
        const data = await fetchAllParticuliers();
        setParticuliers(data);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setClientType(newType);
    setSearchTerm('');
  };

  const handleClientSelect = (client) => {
    const clientData = {
      typeClient: clientType,
      clientId: client.id,
      clientNom: clientType === 'MAGASIN' 
        ? client.nom 
        : `${client.nom} ${client.prenom}`
    };
    onClientSelect(clientData);
  };

  const getFilteredClients = () => {
    const clients = clientType === 'MAGASIN' ? magasins : particuliers;
    return clients.filter(client => {
      if (clientType === 'MAGASIN') {
        return client.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               client.code?.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return client.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               client.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
               client.code?.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Sélection du client
      </Typography>

      {/* Type de client */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
        <Typography variant="subtitle1" gutterBottom fontWeight={600}>
          Type de client
        </Typography>
        <RadioGroup
          value={clientType}
          onChange={handleTypeChange}
          row
        >
          <FormControlLabel
            value="MAGASIN"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StoreIcon color="primary" />
                <Typography>Magasin</Typography>
              </Box>
            }
            sx={{ mr: 4 }}
          />
          <FormControlLabel
            value="PARTICULIER"
            control={<Radio />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="secondary" />
                <Typography>Particulier</Typography>
              </Box>
            }
          />
        </RadioGroup>
      </Paper>

      {/* Liste des clients */}
      {clientType && (
        <Paper sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
            <TextField
              placeholder={`Rechercher un ${clientType.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
              }}
            />
          </Box>

          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {loading ? (
              <ListItem>
                <ListItemText primary="Chargement..." />
              </ListItem>
            ) : getFilteredClients().length === 0 ? (
              <ListItem>
                <ListItemText 
                  primary="Aucun client trouvé" 
                  secondary={`Aucun ${clientType.toLowerCase()} ne correspond à votre recherche`}
                />
              </ListItem>
            ) : (
              getFilteredClients().map((client) => (
                <ListItemButton
                  key={client.id}
                  onClick={() => handleClientSelect(client)}
                  selected={selectedClientId === client.id}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#e3f2fd',
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ 
                      backgroundColor: clientType === 'MAGASIN' ? '#1976d2' : '#9c27b0',
                      width: 40,
                      height: 40
                    }}>
                      {clientType === 'MAGASIN' ? (
                        <StoreIcon />
                      ) : (
                        <PersonIcon />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" fontWeight={600}>
                          {clientType === 'MAGASIN' 
                            ? client.nom 
                            : `${client.nom} ${client.prenom}`
                          }
                        </Typography>
                        <Chip 
                          label={client.code} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {client.email || 'Pas d\'email'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          📍 {client.ville || 'Ville non renseignée'}
                        </Typography>
                        {client.remise > 0 && (
                          <Chip 
                            label={`Remise: ${client.remise}%`}
                            size="small"
                            color="success"
                            sx={{ mt: 0.5, fontSize: '0.7rem' }}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
              ))
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default ClientSelector;