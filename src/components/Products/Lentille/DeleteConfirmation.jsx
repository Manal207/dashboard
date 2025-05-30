


// src/components/DeleteConfirmation.jsx
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function DeleteConfirmation({ lentille, open, onConfirm, onCancel }) {
  if (!lentille) return null; // Safety check

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
          Êtes-vous sûr de vouloir supprimer la lentille <strong>{lentille.marque} {lentille.reference}</strong>?
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

export default DeleteConfirmation;

// // // src/components/DeleteConfirmation.jsx
// // import React from 'react';
// // // import './DeleteConfirmation.css';

// // function DeleteConfirmation({ monture, onConfirm, onCancel }) {
// //   return (
// //     <div className="delete-modal-overlay">
// //       <div className="delete-modal">
// //         <h3>Confirmer la suppression</h3>
// //         <p>
// //           Êtes-vous sûr de vouloir supprimer la monture <strong>{monture.marque} {monture.reference}</strong>?
// //         </p>
// //         <p className="warning">Cette action est irréversible.</p>
        
// //         <div className="delete-actions">
// //           <button className="btn-cancel" onClick={onCancel}>
// //             Annuler
// //           </button>
// //           <button className="btn-confirm" onClick={onConfirm}>
// //             Supprimer
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default DeleteConfirmation;