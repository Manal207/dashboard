// src/components/DeleteConfirmationAccessoire.jsx
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function DeleteConfirmationAccessoire({ accessoire, open, onConfirm, onCancel }) {
  if (!accessoire) return null; // Safety check

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
    >
      <DialogTitle id="delete-confirmation-title">Confirmer la suppression</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-confirmation-description">
          Êtes-vous sûr de vouloir supprimer l'accessoire <strong>{accessoire.nom} {accessoire.reference}</strong>?
        </DialogContentText>
        <DialogContentText sx={{ color: 'red', mt: 2 }}>
          Cette action est irréversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" variant="outlined">
          Annuler
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationAccessoire;