// src/components/Vente/FicheCard.jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Grid,
  Divider,
  Collapse,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import FicheForm from './FicheForm';

function FicheCard({ fiche, index, onEdit, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEditSubmit = (updatedFiche) => {
    onEdit(updatedFiche);
    setShowEditDialog(false);
  };

  const handleDelete = () => {
    onRemove();
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card 
        sx={{ 
          borderRadius: '12px',
          border: '1px solid #e0e0e0',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)',
            transition: 'all 0.2s ease-in-out'
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={`Fiche ${index + 1}`} 
                color="primary" 
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <Typography variant="h6" fontWeight={700} color="primary">
                {fiche.totalFiche?.toFixed(2) || '0.00'} DH
              </Typography>
            </Box>
            
            <Box>
              <IconButton 
                size="small" 
                onClick={() => setExpanded(!expanded)}
                sx={{ mr: 1 }}
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
              <IconButton 
                size="small" 
                onClick={() => setShowEditDialog(true)}
                color="primary"
                sx={{ mr: 1 }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={() => setShowDeleteDialog(true)}
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Resume rapide */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center', p: 1, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <Typography variant="caption" color="text.secondary">Monture</Typography>
                <Typography variant="body2" fontWeight={600} noWrap>
                  {fiche.montureNom || 'Non définie'}
                </Typography>
                <Typography variant="caption" color="primary">
                  {fiche.prixMonture?.toFixed(2) || '0.00'} DH
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center', p: 1, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <Typography variant="caption" color="text.secondary">Verres</Typography>
                <Typography variant="body2" fontWeight={600} noWrap>
                  {fiche.verreODNom || 'Non définis'}
                </Typography>
                <Typography variant="caption" color="primary">
                  {((fiche.prixVerreOD || 0) + (fiche.prixVerreOG || 0)).toFixed(2)} DH
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={4}>
              <Box sx={{ textAlign: 'center', p: 1, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <Typography variant="caption" color="text.secondary">Accessoires</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {fiche.accessoires?.length || 0} article(s)
                </Typography>
                <Typography variant="caption" color="primary">
                  {fiche.accessoires?.reduce((sum, acc) => sum + (acc.prixAccessoire || 0), 0).toFixed(2) || '0.00'} DH
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Détails complets (collapsible) */}
          <Collapse in={expanded}>
            <Divider sx={{ my: 2 }} />
            
            {/* Produits détaillés */}
            <Grid container spacing={3}>
              {/* Monture */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                  🕶️ Monture
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2">
                    <strong>Modèle:</strong> {fiche.montureNom || 'Non sélectionnée'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Prix:</strong> {fiche.prixMonture?.toFixed(2) || '0.00'} DH
                  </Typography>
                </Box>
              </Grid>

              {/* Verres */}
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                  👁️ Œil Droit (OD)
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2">
                    <strong>Verre:</strong> {fiche.verreODNom || 'Non sélectionné'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Prix:</strong> {fiche.prixVerreOD?.toFixed(2) || '0.00'} DH
                  </Typography>
                  <Typography variant="body2">
                    <strong>Mesures:</strong> SPH {fiche.mesuresOD?.sph || '-'} / 
                    CYL {fiche.mesuresOD?.cyl || '-'} / 
                    AXE {fiche.mesuresOD?.axe || '-'}°
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                  👁️ Œil Gauche (OG)
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2">
                    <strong>Verre:</strong> {fiche.verreOGNom || 'Non sélectionné'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Prix:</strong> {fiche.prixVerreOG?.toFixed(2) || '0.00'} DH
                  </Typography>
                  <Typography variant="body2">
                    <strong>Mesures:</strong> SPH {fiche.mesuresOG?.sph || '-'} / 
                    CYL {fiche.mesuresOG?.cyl || '-'} / 
                    AXE {fiche.mesuresOG?.axe || '-'}°
                  </Typography>
                </Box>
              </Grid>

              {/* Accessoires */}
              {fiche.accessoires?.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    🛍️ Accessoires
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    {fiche.accessoires.map((accessoire, idx) => (
                      <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">
                          {accessoire.accessoireNom} ({accessoire.accessoireReference})
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          {accessoire.prixAccessoire?.toFixed(2)} DH
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              )}
            </Grid>

            <Divider sx={{ my: 2 }} />
            
            {/* Total détaillé */}
            <Box sx={{ backgroundColor: '#f8f9fa', p: 2, borderRadius: '8px' }}>
              <Typography variant="subtitle2" gutterBottom>
                💰 Détail du calcul
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Monture:</Typography>
                <Typography variant="body2">{fiche.prixMonture?.toFixed(2) || '0.00'} DH</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Verre OD:</Typography>
                <Typography variant="body2">{fiche.prixVerreOD?.toFixed(2) || '0.00'} DH</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Verre OG:</Typography>
                <Typography variant="body2">{fiche.prixVerreOG?.toFixed(2) || '0.00'} DH</Typography>
              </Box>
              {fiche.accessoires?.map((acc, idx) => (
                <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{acc.accessoireNom}:</Typography>
                  <Typography variant="body2">{acc.prixAccessoire?.toFixed(2)} DH</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" fontWeight={700}>Total:</Typography>
                <Typography variant="subtitle1" fontWeight={700} color="primary">
                  {fiche.totalFiche?.toFixed(2) || '0.00'} DH
                </Typography>
              </Box>
            </Box>
          </Collapse>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog 
        open={showEditDialog} 
        onClose={() => setShowEditDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Modifier la fiche {index + 1}</DialogTitle>
        <DialogContent>
          <FicheForm
            editMode={true}
            initialData={fiche}
            onAddFiche={handleEditSubmit}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={showDeleteDialog} 
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer la fiche {index + 1} ?
          </Typography>
          <Typography color="error" sx={{ mt: 1 }}>
            Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>
            Annuler
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FicheCard;