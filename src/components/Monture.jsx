// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import MontureTable from './MontureTable';
import MontureForm from './MontureForm';
import DeleteConfirmation from './DeleteConfirmation';
import { fetchAllMontures, deleteMonture } from '../api/montureApi';
import './Dashboard.css';
import Button from '@mui/material/Button';



function Monture() {
  const [montures, setMontures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentMonture, setCurrentMonture] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [montureToDelete, setMontureToDelete] = useState(null);


  useEffect(() => {
    loadMontures();
  }, []);

  const loadMontures = async () => {
    try {
      setLoading(true);
      const data = await fetchAllMontures();
      setMontures(data);
    } catch (error) {
      console.error('Error loading montures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentMonture(null);
    setShowForm(true);
  };

  const handleEdit = (monture) => {
    setCurrentMonture(monture);
    setShowForm(true);
  };

  const handleDelete = (monture) => {
    setMontureToDelete(monture);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMonture(montureToDelete.id);
      setShowDeleteModal(false);
      loadMontures();
    } catch (error) {
      console.error('Error deleting monture:', error);
    }
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    loadMontures();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Gestion des Montures</h1>
        {/* <button className="btn-add" onClick={handleAddNew}>
          Nouveau
        </button> */}

        <Button
          variant="contained"
          color="inherit"
          onClick={handleAddNew}
          // startIcon={<Iconify icon="mingcute:add-line" />}
          >
          Nouveau
        </Button>
      </div>

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <MontureTable 
          montures={montures} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}

      {/* Here you directly render MontureForm with open prop */}
      <MontureForm
        monture={currentMonture}
        open={showForm}
        onClose={() => setShowForm(false)}
        onSubmitSuccess={handleFormSubmitSuccess}
      />

      {showDeleteModal && (
        // <DeleteConfirmation
        //   monture={montureToDelete}
        //   onConfirm={confirmDelete}
        //   onCancel={() => setShowDeleteModal(false)}
        // />
        <DeleteConfirmation
  monture={montureToDelete}
  open={showDeleteModal}
  onConfirm={confirmDelete}
  onCancel={() => setShowDeleteModal(false)}
/>

      )}
    </div>
  );
}

export default Monture;


// // src/components/Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import MontureTable from './MontureTable';
// import MontureForm from './MontureForm';
// import DeleteConfirmation from './DeleteConfirmation';
// import { fetchAllMontures, deleteMonture } from '../api/montureApi';
// import './Dashboard.css';

// function Monture() {
//   const [montures, setMontures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [currentMonture, setCurrentMonture] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [montureToDelete, setMontureToDelete] = useState(null);

//   useEffect(() => {
//     loadMontures();
//   }, []);

//   const loadMontures = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchAllMontures();
//       setMontures(data);
//     } catch (error) {
//       console.error('Error loading montures:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddNew = () => {
//     setCurrentMonture(null);
//     setShowForm(true);
//   };

//   const handleEdit = (monture) => {
//     setCurrentMonture(monture);
//     setShowForm(true);
//   };

//   const handleDelete = (monture) => {
//     setMontureToDelete(monture);
//     setShowDeleteModal(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await deleteMonture(montureToDelete.id);
//       setShowDeleteModal(false);
//       loadMontures();
//     } catch (error) {
//       console.error('Error deleting monture:', error);
//     }
//   };

//   const handleFormSubmitSuccess = () => {
//     setShowForm(false);
//     loadMontures();
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <h1>Gestion des Montures</h1>
//         <button className="btn-add" onClick={handleAddNew}>
//           Ajouter une nouvelle monture
//         </button>
//       </div>

//       {loading ? (
//         <div className="loading">Chargement...</div>
//       ) : (
//         <MontureTable 
//           montures={montures} 
//           onEdit={handleEdit} 
//           onDelete={handleDelete} 
//         />
//       )}

//       {showForm && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <MontureForm 
//               monture={currentMonture} 
//               onClose={() => setShowForm(false)} 
//               onSubmitSuccess={handleFormSubmitSuccess} 
//             />
//           </div>
//         </div>
//       )}

//       {showDeleteModal && (
//         <DeleteConfirmation 
//           monture={montureToDelete}
//           onConfirm={confirmDelete}
//           onCancel={() => setShowDeleteModal(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default Monture;