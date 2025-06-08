// Lentille.jsx
import React, { useState, useEffect } from 'react';
import DeleteConfirmation from './DeleteConfirmation';
import { fetchAllLentilles, deleteLentille } from '../../../api/lentilleApi';
import '../../Dashboard.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import LentilleTable from './LentilleTable';
import LentilleForm from './LentilleForm';

function Lentille() {
  const [lentilles, setLentilles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentLentille, setCurrentLentille] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lentilleToDelete, setLentilleToDelete] = useState(null);

  useEffect(() => {
    loadLentilles();
  }, []);

  const loadLentilles = async () => {
    try {
      setLoading(true);
      const data = await fetchAllLentilles();
      setLentilles(data);
    } catch (error) {
      console.error('Error loading lentilles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentLentille(null);
    setShowForm(true);
  };

  const handleEdit = (lentille) => {
    setCurrentLentille(lentille);
    setShowForm(true);
  };

  const handleDelete = (lentille) => {
    setLentilleToDelete(lentille);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteLentille(lentilleToDelete.id);
      setShowDeleteModal(false);
      loadLentilles();
    } catch (error) {
      console.error('Error deleting lentille:', error);
    }
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    loadLentilles();
  };

  console.log('LentilleTable:', LentilleTable);
  console.log('LentilleForm:', LentilleForm);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Typography
          sx={{
            fontFamily: `"DM Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
            fontWeight: 700,
            fontSize: '1.25rem',
            lineHeight: 1.5,
            WebkitBoxFlex: 1,
            flexGrow: 1,
            letterSpacing: '0.75px', // 👈 Add this line

          }}
        >
          Lentilles
        </Typography>

        <Button
          variant="contained"
          onClick={handleAddNew}
          startIcon={<AddIcon sx={{ color: 'white' }} />}
          sx={{
            textTransform: 'none',
            backgroundColor: 'black',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.875rem',
            lineHeight: 1.71429,
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Nouveau
        </Button>
      </div>

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <LentilleTable 
          lentilles={lentilles} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      <LentilleForm
        lentille={currentLentille}
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmitSuccess={handleFormSubmitSuccess}
      />

      {showDeleteModal && (
        <DeleteConfirmation
          lentille={lentilleToDelete}
          open={showDeleteModal}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

export default Lentille;

// // src/components/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import LentilleTable from './LentilleTable';
// import LentilleForm from './LentilleForm';
// import DeleteConfirmation from './DeleteConfirmation';
// // import { fetchAllLentilles, deleteLentille } from '../api/lentilleApi';
// import { fetchAllLentilles } from '../../../api/lentilleApi';
// import { deleteLentille } from '../../../api/lentilleApi';
// import '../../Dashboard.css'

// function Lentille() {
//   const [lentilles, setLentilles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [currentLentille, setCurrentLentille] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [lentilleToDelete, setLentilleToDelete] = useState(null);

//   useEffect(() => {
//     loadLentilles();
//   }, []);

//   const loadLentilles = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchAllLentilles();
//       setLentilles(data);
//     } catch (error) {
//       console.error('Error loading lentilles:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddNew = () => {
//     setCurrentLentille(null);
//     setShowForm(true);
//   };

//   const handleEdit = (lentille) => {
//     setCurrentLentille(lentille);
//     setShowForm(true);
//   };

//   const handleDelete = (lentille) => {
//     setLentilleToDelete(lentille);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteLentille(lentilleToDelete.id);
//       setShowDeleteModal(false);
//       loadLentilles();
//     } catch (error) {
//       console.error('Error deleting lentille:', error);
//     }
//   };

//   const handleFormSubmitSuccess = () => {
//     setShowForm(false);
//     loadLentilles();
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1>Gestion des Lentilles</h1>
//         <button className="btn-add" onClick={handleAddNew}>
//           Ajouter une nouvelle lentille
//         </button>
//       </div>

//       {loading ? (
//         <div className="loading">Chargement...</div>
//       ) : (
//         <LentilleTable 
//           lentilles={lentilles} 
//           onEdit={handleEdit} 
//           onDelete={handleDelete} 
//         />
//       )}

//       {showForm && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <LentilleForm 
//               lentille={currentLentille} 
//               onClose={() => setShowForm(false)} 
//               onSubmitSuccess={handleFormSubmitSuccess} 
//             />
//           </div>
//         </div>
//       )}

//       {showDeleteModal && (
//         <DeleteConfirmation 
//           lentille={lentilleToDelete}
//           onConfirm={confirmDelete}
//           onCancel={() => setShowDeleteModal(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default Lentille;
