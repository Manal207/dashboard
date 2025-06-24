import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PersonIcon from '@mui/icons-material/Person';

const DeleteConfirmationUser = ({ user, open, onConfirm, onCancel }) => {
  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-user-dialog-title"
      aria-describedby="delete-user-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="delete-user-dialog-title">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberIcon color="warning" />
          Confirmer la suppression
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText id="delete-user-dialog-description">
          Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
        </DialogContentText>
        
        <Box sx={{ 
          mt: 2, 
          p: 2, 
          backgroundColor: '#f5f5f5', 
          borderRadius: 1,
          border: '1px solid #e0e0e0'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <PersonIcon color="primary" />
            <Typography variant="subtitle1" fontWeight="bold">
              {user.name}
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Nom d'utilisateur:</strong> {user.username}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Rôle:</strong>
            </Typography>
            <Chip
              label={user.role === 'ADMIN' ? 'Administrateur' : 'Utilisateur'}
              color={user.role === 'ADMIN' ? 'primary' : 'default'}
              size="small"
            />
          </Box>
        </Box>
        
        {user.role === 'ADMIN' && (
          <Box sx={{ 
            mt: 2, 
            p: 2, 
            backgroundColor: '#fff3e0', 
            borderRadius: 1,
            border: '1px solid #ffb74d'
          }}>
            <Typography variant="body2" color="warning.main">
              ⚠️ <strong>Attention:</strong> Vous ne pouvez pas supprimer un utilisateur administrateur.
            </Typography>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          Annuler
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          disabled={user.role === 'ADMIN'}
          autoFocus
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteConfirmationUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmationUser;