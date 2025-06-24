// src/api/montureApi.js
import axios from './axiosConfig';

export const fetchAllMontures = async () => {
  try {
    console.log('Fetching montures...');
    const response = await axios.get('/monture/all');
    console.log('Montures received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching montures:', error);
    throw error;
  }
};

export const fetchMontureById = async (id) => {
  const response = await axios.get(`/monture/find/${id}`);
  return response.data;
};

// Updated createMonture to handle file uploads
export const createMonture = async (montureData, imageFile) => {
  const formData = new FormData();
  
  // Add JSON data as string
  formData.append('montureData', JSON.stringify(montureData));
  
  // Add image file if provided
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  const response = await axios.post('/monture/add-with-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// For now, use JSON endpoint for updates (you can enhance this later)
export const updateMonture = async (monture) => {
  const response = await axios.put('/monture/update-json', monture);
  return response.data;
};

// // New function for updating with image
// export const updateMontureWithImage = async (montureData, imageFile) => {
//   const formData = new FormData();
  
//   // Add all monture data as individual form fields
//   Object.keys(montureData).forEach(key => {
//     if (montureData[key] !== null && montureData[key] !== undefined) {
//       formData.append(key, montureData[key]);
//     }
//   });
  
//   // Add image file if provided
//   if (imageFile) {
//     formData.append('image', imageFile);
//   }
  
//   const response = await axios.put('/monture/update', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// };

export const deleteMonture = async (id) => {
  await axios.delete(`/monture/delete/${id}`);
};

// Helper function to get image URL
export const getImageUrl = (filename) => {
  if (!filename) {
    console.log('No filename provided');
    return null;
  }
  // Use the controller endpoint - NOT /uploads/images/
  const url = `http://localhost:8080/monture/images/${filename}`;
  console.log('Generated image URL:', url);
  return url;
};


// New function for updating with image
export const updateMontureWithImage = async (montureData, imageFile) => {
  const formData = new FormData();
  
  // Add all monture data as individual form fields (matching backend expectations)
  formData.append('id', montureData.id);
  formData.append('marque', montureData.marque);
  formData.append('reference', montureData.reference);
  formData.append('couleur', montureData.couleur || '');
  formData.append('branche', montureData.branche || '');
  formData.append('forme', montureData.forme);
  formData.append('genre', montureData.genre);
  formData.append('matiere', montureData.matiere);
  formData.append('typeMontage', montureData.typeMontage || '');
  formData.append('gamme', montureData.gamme || '');
  formData.append('quantiteInitiale', montureData.quantiteInitiale || 0);
  formData.append('numero', montureData.numero || '');
  formData.append('nature', montureData.nature || 'Optique');
  formData.append('prixAchat', montureData.prixAchat || 0);
  formData.append('prixVente', montureData.prixVente || 0);
  if (montureData.remiseClient) {
    formData.append('remiseClient', montureData.remiseClient);
  }
  
  // Add image file if provided
  if (imageFile) {
    formData.append('image', imageFile);
  }
  
  const response = await axios.put('/monture/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


// // src/api/montureApi.js
// import axios from './axiosConfig';

// export const fetchAllMontures = async () => {
//   try {
//     console.log('Fetching montures...');
//     const response = await axios.get('/monture/all');
//     console.log('Montures received:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching montures:', error);
//     throw error;
//   }
// };

// export const fetchMontureById = async (id) => {
//   const response = await axios.get(`/monture/find/${id}`);
//   return response.data;
// };

// // Updated createMonture to handle file uploads
// export const createMonture = async (montureData, imageFile) => {
//   const formData = new FormData();
  
//   // Add JSON data as string
//   formData.append('montureData', JSON.stringify(montureData));
  
//   // Add image file if provided
//   if (imageFile) {
//     formData.append('image', imageFile);
//   }
  
//   const response = await axios.post('/monture/add-with-image', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// };

// // For now, use JSON endpoint for updates (you can enhance this later)
// export const updateMonture = async (monture) => {
//   const response = await axios.put('/monture/update-json', monture);
//   return response.data;
// };

// // New function for updating with image
// export const updateMontureWithImage = async (montureData, imageFile) => {
//   const formData = new FormData();
  
//   // Add all monture data as individual form fields
//   Object.keys(montureData).forEach(key => {
//     if (montureData[key] !== null && montureData[key] !== undefined) {
//       formData.append(key, montureData[key]);
//     }
//   });
  
//   // Add image file if provided
//   if (imageFile) {
//     formData.append('image', imageFile);
//   }
  
//   const response = await axios.put('/monture/update', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// };

// export const deleteMonture = async (id) => {
//   await axios.delete(`/monture/delete/${id}`);
// };

// // Helper function to get image URL
// export const getImageUrl = (filename) => {
//   if (!filename) {
//     console.log('No filename provided');
//     return null;
//   }
//   // Use the static resource URL pattern instead of controller endpoint
//   const url = `http://localhost:8080/uploads/images/${filename}`;
//   console.log('Generated image URL:', url);
//   return url;
// };


// // // src/api/montureApi.js
// // import axios from './axiosConfig';

// // export const fetchAllMontures = async () => {
// //   try {
// //     console.log('Fetching montures...');
// //     const response = await axios.get('/monture/all');
// //     console.log('Montures received:', response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error fetching montures:', error);
// //     throw error;
// //   }
// // };

// // export const fetchMontureById = async (id) => {
// //   const response = await axios.get(`/monture/find/${id}`);
// //   return response.data;
// // };

// // // Updated createMonture to handle file uploads
// // export const createMonture = async (montureData, imageFile) => {
// //   const formData = new FormData();
  
// //   // Add JSON data as string
// //   formData.append('montureData', JSON.stringify(montureData));
  
// //   // Add image file if provided
// //   if (imageFile) {
// //     formData.append('image', imageFile);
// //   }
  
// //   const response = await axios.post('/monture/add-with-image', formData, {
// //     headers: {
// //       'Content-Type': 'multipart/form-data',
// //     },
// //   });
// //   return response.data;
// // };

// // // For now, use JSON endpoint for updates (you can enhance this later)
// // export const updateMonture = async (monture) => {
// //   const response = await axios.put('/monture/update-json', monture);
// //   return response.data;
// // };

// // // New function for updating with image
// // export const updateMontureWithImage = async (montureData, imageFile) => {
// //   const formData = new FormData();
  
// //   // Add all monture data as individual form fields
// //   Object.keys(montureData).forEach(key => {
// //     if (montureData[key] !== null && montureData[key] !== undefined) {
// //       formData.append(key, montureData[key]);
// //     }
// //   });
  
// //   // Add image file if provided
// //   if (imageFile) {
// //     formData.append('image', imageFile);
// //   }
  
// //   const response = await axios.put('/monture/update', formData, {
// //     headers: {
// //       'Content-Type': 'multipart/form-data',
// //     },
// //   });
// //   return response.data;
// // };

// // export const deleteMonture = async (id) => {
// //   await axios.delete(`/monture/delete/${id}`);
// // };

// // // Helper function to get image URL
// // export const getImageUrl = (filename) => {
// //   if (!filename) return null;
// //   return `http://localhost:8080/monture/images/${filename}`;
// // };

// // // // src/api/montureApi.js
// // // import axios from './axiosConfig'; // Change this import

// // // // Remove the base URL
// // // // const API_URL = 'http://localhost:8080'; // Remove this

// // // export const fetchAllMontures = async () => {
// // //   try {
// // //     console.log('Fetching montures...');
// // //     const response = await axios.get('/monture/all'); // Use relative URL
// // //     console.log('Montures received:', response.data);
// // //     return response.data;
// // //   } catch (error) {
// // //     console.error('Error fetching montures:', error);
// // //     throw error;
// // //   }
// // // };

// // // export const fetchMontureById = async (id) => {
// // //   const response = await axios.get(`/monture/find/${id}`);
// // //   return response.data;
// // // };

// // // export const createMonture = async (monture) => {
// // //   const response = await axios.post('/monture/add', monture);
// // //   return response.data;
// // // };

// // // export const updateMonture = async (monture) => {
// // //   const response = await axios.put('/monture/update', monture);
// // //   return response.data;
// // // };

// // // export const deleteMonture = async (id) => {
// // //   await axios.delete(`/monture/delete/${id}`);
// // // };

// // // // // src/api/montureApi.js
// // // // import axios from 'axios';

// // // // const API_URL = 'http://localhost:8080';
// // // // console.log('Using API URL:', API_URL);

// // // // // export const fetchAllMontures = async () => {
// // // // //   const response = await axios.get(`${API_URL}/monture/all`);
// // // // //   return response.data;
// // // // // };

// // // // export const fetchAllMontures = async () => {
// // // //   try {
// // // //     console.log('Fetching montures from:', `${API_URL}/monture/all`);
// // // //     const response = await axios.get(`${API_URL}/monture/all`);
// // // //     console.log('Montures received:', response.data);
// // // //     return response.data;
// // // //   } catch (error) {
// // // //     console.error('Error fetching montures:', error);
// // // //     throw error;
// // // //   }
// // // // };

// // // // export const fetchMontureById = async (id) => {
// // // //   const response = await axios.get(`${API_URL}/monture/find/${id}`);
// // // //   return response.data;
// // // // };

// // // // export const createMonture = async (monture) => {
// // // //   const response = await axios.post(`${API_URL}/monture/add`, monture);
// // // //   return response.data;
// // // // };

// // // // export const updateMonture = async (monture) => {
// // // //   const response = await axios.put(`${API_URL}/monture/update`, monture);
// // // //   return response.data;
// // // // };

// // // // export const deleteMonture = async (id) => {
// // // //   await axios.delete(`${API_URL}/monture/delete/${id}`);
// // // // };