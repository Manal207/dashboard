// src/components/ImageViewer.jsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getImageUrl } from '../../../api/montureApi';

function ImageViewer({ monture, open, onClose }) {
  if (!monture) return null;

  const imageUrl = monture.image ? getImageUrl(monture.image) : null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Box>
          <Typography variant="h6" component="div">
            {monture.marque} {monture.reference}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {monture.couleur && `${monture.couleur} • `}
            {monture.genre} • {monture.forme}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'grey.500',
            '&:hover': {
              backgroundColor: 'grey.100'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          p: 3
        }}>
          {imageUrl ? (
            <Box sx={{ 
              maxWidth: '100%', 
              maxHeight: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2
            }}>
              <img
                src={imageUrl}
                alt={`${monture.marque} ${monture.reference}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Box>
          ) : (
            <Box sx={{
              width: 300,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.100',
              borderRadius: '12px',
              mb: 2
            }}>
              <Typography variant="h4" color="text.secondary">
                {monture.marque ? monture.marque.charAt(0) : '?'}
              </Typography>
            </Box>
          )}
          
          {/* Additional details */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            justifyContent: 'center',
            mt: 2
          }}>
            {monture.matiere && (
              <Chip label={monture.matiere} size="small" variant="outlined" />
            )}
            {monture.typeMontage && (
              <Chip label={monture.typeMontage} size="small" variant="outlined" />
            )}
            {monture.gamme && (
              <Chip label={monture.gamme} size="small" variant="outlined" />
            )}
          </Box>
          
          {monture.prixVente && (
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
              {monture.prixVente} €
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ImageViewer;