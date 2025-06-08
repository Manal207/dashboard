// src/components/auth/UserProfile.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function UserProfile({ open, onClose }) {
  const { user } = useAuth();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Mon Profil</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
          <Avatar sx={{ width: 80, height: 80, mb: 2, bgcolor: 'primary.main' }}>
            <AccountCircleIcon sx={{ fontSize: 60 }} />
          </Avatar>
          
          <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Nom d'utilisateur
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user?.username}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
              Nom complet
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user?.name}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
              Email
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user?.email}
            </Typography>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
              ID Utilisateur
            </Typography>
            <Typography variant="body1">
              {user?.id}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserProfile;