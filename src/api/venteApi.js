// src/api/venteApi.js
import axios from './axiosConfig';

// ==================== VENTES ====================

export const fetchAllVentes = async () => {
  try {
    console.log('Fetching ventes...');
    const response = await axios.get('/api/ventes');
    console.log('Ventes received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching ventes:', error);
    throw error;
  }
};

export const fetchVenteById = async (id) => {
  try {
    const response = await axios.get(`/api/ventes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vente:', error);
    throw error;
  }
};

export const createVente = async (vente) => {
  try {
    console.log('Creating vente:', vente);
    const response = await axios.post('/api/ventes', vente);
    console.log('Vente created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating vente:', error);
    throw error;
  }
};

export const updateVente = async (id, vente) => {
  try {
    const response = await axios.put(`/api/ventes/${id}`, vente);
    return response.data;
  } catch (error) {
    console.error('Error updating vente:', error);
    throw error;
  }
};

export const deleteVente = async (id) => {
  try {
    await axios.delete(`/api/ventes/${id}`);
  } catch (error) {
    console.error('Error deleting vente:', error);
    throw error;
  }
};

export const addFicheToVente = async (venteId, fiche) => {
  try {
    const response = await axios.post(`/api/ventes/${venteId}/fiches`, fiche);
    return response.data;
  } catch (error) {
    console.error('Error adding fiche:', error);
    throw error;
  }
};

export const fetchMesVentes = async () => {
  try {
    const response = await axios.get('/api/ventes?mesVentes=true');
    return response.data;
  } catch (error) {
    console.error('Error fetching mes ventes:', error);
    throw error;
  }
};

// ==================== PRODUITS ====================

export const fetchAllMontures = async () => {
  try {
    const response = await axios.get('/monture/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching montures:', error);
    throw error;
  }
};

export const fetchAllVerres = async () => {
  try {
    const response = await axios.get('/verre/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching verres:', error);
    throw error;
  }
};

export const fetchAllAccessoires = async () => {
  try {
    const response = await axios.get('/accessoire/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching accessoires:', error);
    throw error;
  }
};

// ==================== CLIENTS ====================

export const fetchAllMagasins = async () => {
  try {
    const response = await axios.get('/magasin/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching magasins:', error);
    throw error;
  }
};

export const fetchAllParticuliers = async () => {
  try {
    const response = await axios.get('/particulier/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching particuliers:', error);
    throw error;
  }
};


// // src/api/venteApi.js
// import axios from './axiosConfig';

// // Ventes
// export const fetchAllVentes = async () => {
//   try {
//     const response = await axios.get('/api/ventes/all');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching ventes:', error);
//     throw error;
//   }
// };

// export const fetchVenteById = async (id) => {
//   const response = await axios.get(`/api/ventes/find/${id}`);
//   return response.data;
// };

// export const createVente = async (vente) => {
//   const response = await axios.post('/api/ventes/create', vente);
//   return response.data;
// };

// export const validerVente = async (id) => {
//   const response = await axios.put(`/api/ventes/valider/${id}`);
//   return response.data;
// };

// export const annulerVente = async (id) => {
//   const response = await axios.put(`/api/ventes/annuler/${id}`);
//   return response.data;
// };

// export const fetchMesVentes = async () => {
//   const response = await axios.get('/api/ventes/mes-ventes');
//   return response.data;
// };

// // Clients
// export const searchMagasins = async (query = '', page = 0, size = 10) => {
//   const response = await axios.get('/magasin/all', {
//     params: { query, page, size }
//   });
//   return response.data;
// };

// export const searchParticuliers = async (query = '', page = 0, size = 10) => {
//   const response = await axios.get('/particulier/all', {
//     params: { query, page, size }
//   });
//   return response.data;
// };



// // // src/api/venteApi.js
// // import axios from 'axios';

// // const API_URL = 'http://localhost:8080';

// // // Vente CRUD operations
// // export const fetchAllVentes = async () => {
// //   try {
// //     console.log('Fetching ventes from:', `${API_URL}/vente/all`);
// //     const response = await axios.get(`${API_URL}/vente/all`);
// //     console.log('Ventes received:', response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching ventes:', error);
// //     throw error;
// //   }
// // };

// // export const fetchVenteById = async (id) => {
// //   const response = await axios.get(`${API_URL}/vente/find/${id}/details`);
// //   return response.data;
// // };

// // // export const createVente = async (vente) => {
// // //   const response = await axios.post(`${API_URL}/vente/add`, vente);
// // //   return response.data;
// // // };

// // // Create vente with correct DTO structure
// // export const createVente = async (venteData) => {
// //   try {
// //     // Transform the data to match backend DTO
// //     const createVenteDTO = {
// //       clientId: venteData.clientId,
// //       typeClient: venteData.typeClient,
// //       lignesVente: venteData.lignesVente || [],
// //       notes: venteData.notes || ''
// //     };
    
// //     console.log('Sending vente data:', createVenteDTO);
// //     const response = await axios.post(`${API_URL}/vente/add`, createVenteDTO);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error creating vente:', error.response?.data || error);
// //     throw error;
// //   }
// // };

// // export const updateVente = async (vente) => {
// //   const response = await axios.put(`${API_URL}/vente/update`, vente);
// //   return response.data;
// // };

// // export const deleteVente = async (id) => {
// //   await axios.delete(`${API_URL}/vente/delete/${id}`);
// // };

// // export const updateVenteStatut = async (id, statut) => {
// //   const response = await axios.put(`${API_URL}/vente/${id}/statut?statut=${statut}`);
// //   return response.data;
// // };

// // // Ligne Vente operations
// // export const addLigneVente = async (venteId, ligneVente) => {
// //   const response = await axios.post(`${API_URL}/vente/${venteId}/ligne`, ligneVente);
// //   return response.data;
// // };

// // export const removeLigneVente = async (venteId, ligneId) => {
// //   const response = await axios.delete(`${API_URL}/vente/${venteId}/ligne/${ligneId}`);
// //   return response.data;
// // };

// // // Client operations
// // export const setClientMagasin = async (venteId, magasinId) => {
// //   const response = await axios.put(`${API_URL}/vente/${venteId}/client/magasin/${magasinId}`);
// //   return response.data;
// // };

// // export const setClientParticulier = async (venteId, particulierId) => {
// //   const response = await axios.put(`${API_URL}/vente/${venteId}/client/particulier/${particulierId}`);
// //   return response.data;
// // };

// // // Helper API calls for product data
// // export const fetchAllMagasins = async () => {
// //   const response = await axios.get(`${API_URL}/magasin/all`);
// //   return response.data;
// // };

// // export const fetchAllParticuliers = async () => {
// //   const response = await axios.get(`${API_URL}/particulier/all`);
// //   return response.data;
// // };

// // export const fetchAllMontures = async () => {
// //   const response = await axios.get(`${API_URL}/monture/all`);
// //   return response.data;
// // };

// // export const fetchAllVerres = async () => {
// //   const response = await axios.get(`${API_URL}/verre/all`);
// //   return response.data;
// // };

// // export const fetchAllLentilles = async () => {
// //   const response = await axios.get(`${API_URL}/lentille/all`);
// //   return response.data;
// // };

// // export const fetchAllAccessoires = async () => {
// //   const response = await axios.get(`${API_URL}/accessoire/all`);
// //   return response.data;
// // };