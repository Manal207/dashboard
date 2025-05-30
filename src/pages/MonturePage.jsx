// // // // import DashboardLayout from '../layouts/DashboardLayout';
// // // import DashboardLayout from '../Layout/DashboardLayout';
// // // import Monture from '../components/Products/Monture/Monture';

// // // const MonturePage = () => (
// // //   <DashboardLayout>
// // //     <Monture />
// // //   </DashboardLayout>
// // // );

// // // console.log('Monture:', Monture);


// // // export default MonturePage;


// // // src/pages/MonturePage.js
// // import {
// //   Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem,
// //   ListItemIcon, ListItemText, Collapse
// // } from '@mui/material';
// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // import GlassesIcon from '@mui/icons-material/Visibility';
// // import LensIcon from '@mui/icons-material/VisibilityOutlined';
// // import CategoryIcon from '@mui/icons-material/Category';
// // import ExpandLess from '@mui/icons-material/ExpandLess';
// // import ExpandMore from '@mui/icons-material/ExpandMore';

// // import Monture from '../components/Products/Monture/Monture';

// // const drawerWidth = 280;

// // function MonturePage() {
// //   const [openProduits, setOpenProduits] = useState(true);
// //   const navigate = useNavigate();

// //   return (
// //     <Box sx={{ display: 'flex' }}>
// //       <CssBaseline />
// //       {/* Top AppBar */}
// //       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
// //         <Toolbar>
// //           <Typography variant="h6" noWrap>
// //             Optics Manager
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>

// //       {/* Sidebar */}
// //       <Drawer
// //         variant="permanent"
// //         sx={{
// //           width: drawerWidth,
// //           flexShrink: 0,
// //           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
// //         }}
// //       >
// //         <Toolbar />
// //         <List>
// //           <ListItem button onClick={() => setOpenProduits(!openProduits)}>
// //             <ListItemIcon><CategoryIcon /></ListItemIcon>
// //             <ListItemText primary="Produits" />
// //             {openProduits ? <ExpandLess /> : <ExpandMore />}
// //           </ListItem>

// //           <Collapse in={openProduits} timeout="auto" unmountOnExit>
// //             <List component="div" disablePadding>
// //               <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/monture')}>
// //                 <ListItemIcon><GlassesIcon /></ListItemIcon>
// //                 <ListItemText primary="Monture" />
// //               </ListItem>
// //               <ListItem button sx={{ pl: 4 }} onClick={() => navigate('/lentille')}>
// //                 <ListItemIcon><LensIcon /></ListItemIcon>
// //                 <ListItemText primary="Lentille" />
// //               </ListItem>
// //             </List>
// //           </Collapse>
// //         </List>
// //       </Drawer>

// //       {/* Main Content */}
// //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// //         <Toolbar />
// //         <Monture />
// //         <Box mt={5} textAlign="center">
// //           <Typography variant="body2" color="text.secondary">
// //             © 2023 Optics Manager
// //           </Typography>
// //         </Box>
// //       </Box>
// //     </Box>
// //   );
// // }

// // export default MonturePage;

// // src/pages/MonturePage.js



// import { Box, Toolbar, Typography } from '@mui/material';
// import Monture from '../components/Products/Monture/Monture';

// function MonturePage() {
//   return (
//     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//       <Toolbar />
//       <Monture />
//       <Box mt={5} textAlign="center">
//         <Typography variant="body2" color="text.secondary">
//           © 2023 Optics Manager
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// export default MonturePage;
