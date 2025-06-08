// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './components/auth/Login';
// import Layout from './layouts/Layout';
import Layout from './pages/Layout';
import PrivateRoute from './components/auth/PrivateRoute';
import './api/axiosConfig'; // Import to initialize axios
// import NewVente from './components/Venteeee/NewVente';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<PrivateRoute><Layout /></PrivateRoute>}/>
            {/* <Route path="ventes/new" element={<NewVente />} /> */}
            {/* Add more nested protected routes here */}
          {/* </Route> */}

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;




// // src/App.js
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';

// import HomePage from './pages/Home';
// import MonturePage from './pages/MonturePage';
// import LentillePage from './pages/LentillePage';
// import Layout from './pages/Layout';
// // import theme from './Theme';
// import theme from './style/theme';
// import Login from './components/auth/Login';
// import { AuthProvider } from './context/authContext';
// import PrivateRoute from './components/auth/PrivateRoute';

// function App() {
//   console.log({ Login, PrivateRoute, Layout });

//   return (


//     <ThemeProvider theme={theme}>
//           {/* <Router>
//             <Routes>
//               <Route path="/" element={<Layout />} />
//             </Routes>
//           </Router> */}

//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/*"
//             element={<PrivateRoute><Layout /></PrivateRoute>}/>
//         </Routes>
//       </Router>
//     </AuthProvider>

//     </ThemeProvider>
//   );
// }

// export default App;





// // // src/App.js
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import MonturePage from './pages/MonturePage';
// // import LentillePage from './pages/LentillePage';

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/monture" element={<MonturePage />} />
// //         <Route path="/lentille" element={<LentillePage />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// // // // src/App.js
// // // import { useState } from 'react';
// // // import {
// // //   Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem,
// // //   ListItemIcon, ListItemText, Collapse
// // // } from '@mui/material';
// // // import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// // // import DashboardIcon from '@mui/icons-material/Dashboard';
// // // import GlassesIcon from '@mui/icons-material/Visibility';
// // // import LensIcon from '@mui/icons-material/VisibilityOutlined';
// // // import CategoryIcon from '@mui/icons-material/Category';
// // // import ExpandLess from '@mui/icons-material/ExpandLess';
// // // import ExpandMore from '@mui/icons-material/ExpandMore';

// // // import MonturePage from './pages/MonturePage';

// // // const drawerWidth = 280;

// // // function AppLayout() {
// // //   const [openProduits, setOpenProduits] = useState(true);
// // //   const navigate = useNavigate();

// // //   return (
// // //     <Box sx={{ display: 'flex' }}>
// // //       <CssBaseline />
// // //       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
// // //         <Toolbar>
// // //           <Typography variant="h6" noWrap component="div">
// // //             Optics Manager
// // //           </Typography>
// // //         </Toolbar>
// // //       </AppBar>

// // //       <Drawer
// // //         variant="permanent"
// // //         sx={{
// // //           width: drawerWidth,
// // //           flexShrink: 0,
// // //           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
// // //         }}
// // //       >
// // //         <Toolbar />
// // //         <List>
// // //           <ListItem button onClick={() => setOpenProduits(!openProduits)}>
// // //             <ListItemIcon><CategoryIcon /></ListItemIcon>
// // //             <ListItemText primary="Produits" />
// // //             {openProduits ? <ExpandLess /> : <ExpandMore />}
// // //           </ListItem>

// // //           <Collapse in={openProduits} timeout="auto" unmountOnExit>
// // //             <List component="div" disablePadding>
// // //               <ListItem
// // //                 button
// // //                 sx={{ pl: 4 }}
// // //                 onClick={() => navigate('/monture')}
// // //               >
// // //                 <ListItemIcon><GlassesIcon /></ListItemIcon>
// // //                 <ListItemText primary="Monture" />
// // //               </ListItem>
// // //               {/* You can add other items here like Lentilles */}
// // //             </List>
// // //           </Collapse>
// // //         </List>
// // //       </Drawer>

// // //       <Routes>
// // //         <Route path="/monture" element={<MonturePage />} />
// // //         {/* Add more routes here */}
// // //       </Routes>
// // //     </Box>
// // //   );
// // // }

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <AppLayout />
// // //     </Router>
// // //   );
// // // }

// // // export default App;


// // // // import { useState } from 'react';
// // // // import {
// // // //   Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
// // // //   ListItemText, Collapse
// // // // } from '@mui/material';
// // // // import DashboardIcon from '@mui/icons-material/Dashboard';
// // // // import GlassesIcon from '@mui/icons-material/Visibility';
// // // // import LensIcon from '@mui/icons-material/VisibilityOutlined';
// // // // import CategoryIcon from '@mui/icons-material/Category';
// // // // import ExpandLess from '@mui/icons-material/ExpandLess';
// // // // import ExpandMore from '@mui/icons-material/ExpandMore';

// // // // import Monture from './components/Products/Monture/Monture';
// // // // import Lentille from './components/Products/Lentille/Lentille';

// // // // const drawerWidth = 280;

// // // // function App() {
// // // //   const [activePage, setActivePage] = useState('monture');
// // // //   const [openProduits, setOpenProduits] = useState(true); // Controls expand/collapse

// // // //   const renderContent = () => {
// // // //     switch (activePage) {
// // // //       case 'monture':
// // // //         return <Monture />;
// // // //       case 'lentilles':
// // // //         return <Lentille />;
// // // //       default:
// // // //         return <Monture />;
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Box sx={{ display: 'flex' }}>
// // // //       <CssBaseline />

// // // //       {/* AppBar */}
// // // //       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
// // // //         <Toolbar>
// // // //           <Typography variant="h6" noWrap component="div">
// // // //             Optics Manager
// // // //           </Typography>
// // // //         </Toolbar>
// // // //       </AppBar>

// // // //       {/* Sidebar */}
// // // //       <Drawer
// // // //         variant="permanent"
// // // //         sx={{
// // // //           width: drawerWidth,
// // // //           flexShrink: 0,
// // // //           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
// // // //         }}
// // // //       >
// // // //         <Toolbar />
// // // //         <List>
// // // //           {/* Produits (Collapsible Section) */}
// // // //           <ListItem button onClick={() => setOpenProduits(!openProduits)}>
// // // //             <ListItemIcon><CategoryIcon /></ListItemIcon>
// // // //             <ListItemText primary="Produits" />
// // // //             {openProduits ? <ExpandLess /> : <ExpandMore />}
// // // //           </ListItem>

// // // //           <Collapse in={openProduits} timeout="auto" unmountOnExit>
// // // //             <List component="div" disablePadding>
// // // //               <ListItem
// // // //                 button
// // // //                 sx={{ pl: 4 }}
// // // //                 onClick={() => setActivePage('monture')}
// // // //                 selected={activePage === 'monture'}
// // // //               >
// // // //                 <ListItemIcon><GlassesIcon /></ListItemIcon>
// // // //                 <ListItemText primary="Monture" />
// // // //               </ListItem>
// // // //               <ListItem
// // // //                 button
// // // //                 sx={{ pl: 4 }}
// // // //                 onClick={() => setActivePage('lentilles')}
// // // //                 selected={activePage === 'lentilles'}
// // // //               >
// // // //                 <ListItemIcon><LensIcon /></ListItemIcon>
// // // //                 <ListItemText primary="Lentilles" />
// // // //               </ListItem>
// // // //             </List>
// // // //           </Collapse>
// // // //         </List>
// // // //       </Drawer>

// // // //       {/* Main content */}
// // // //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// // // //         <Toolbar />
// // // //         {renderContent()}
// // // //         <Box mt={5} textAlign="center">
// // // //           <Typography variant="body2" color="text.secondary">
// // // //             © 2023 Optics Manager
// // // //           </Typography>
// // // //         </Box>
// // // //       </Box>
// // // //     </Box>
// // // //   );
// // // // }

// // // // export default App;



