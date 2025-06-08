import { useState } from 'react';
import {
  Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Collapse
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GlassesIcon from '@mui/icons-material/Visibility';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CategoryIcon from '@mui/icons-material/CategoryRounded';
import LensIcon from '@mui/icons-material/VisibilityRounded';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import ReceiptIcon from '@mui/icons-material/Receipt';

import Monture from '../components/Products/Monture/Monture';
import Lentille from '../components/Products/Lentille/Lentille';
import Home from './Home';
import Verre from '../components/Products/Verre/Verre';
import Magasin from '../components/Organization/Client/Magasin/Magasin';
import Vente from '../components/Vente/Vente'; // ✅ AJOUT

import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 280;

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState('home');
  const [openProduits, setOpenProduits] = useState(true);
  const [openOrganization, setOpenOrganization] = useState(false);
  const [openClient, setOpenClient] = useState(false);

  console.log({ Monture, Lentille, Verre, Home, Magasin, Vente }); // ✅ AJOUT Vente

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'monture':
        return <Monture />;
      case 'lentilles':
        return <Lentille />;
      case 'verre':
        return <Verre />;
      case 'magasin':
        return <Magasin />;
      case 'vente':  // ✅ AJOUT
        return <Vente />;
      default:
        return <Home />;
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F9FAFB' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#F9FAFB',
          },
        }}
      >
        {/* Add user info at the top */}
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccountCircleIcon sx={{ mr: 1, color: 'grey.600' }} />
            <Typography variant="subtitle1" noWrap>
              {user?.name || user?.username}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB !important', borderRadius: 2, height: 60, width: 250, px: 2, mt: 10, mx: 'auto' }}>
          <Typography variant="h6" noWrap component="div">
            Optics Manager
          </Typography>
        </Toolbar>

        <Toolbar />

        <List sx={{         
          fontSize: '0.875rem',
          lineHeight: '1.5rem',
          fontWeight: 600,
          color: '#637381',
          borderBottom: '1px solid var(--palette-TableCell-border)',
          textAlign: 'left',
          padding: '16px',
          }}>
          <ListItem button selected={activePage === 'home'} onClick={() => setActivePage('home')} >
            <ListItemIcon>
              <HomeRoundedIcon sx={{ color: 'grey.500' }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          {/* ✅ Ventes Section - Add after Home */}
          <ListItem 
            button 
            selected={activePage === 'vente'} 
            onClick={() => setActivePage('vente')}
          >
            <ListItemIcon>
              <ReceiptIcon sx={{ color: 'grey.500' }} />
            </ListItemIcon>
            <ListItemText primary="Ventes" />
          </ListItem>

          {/* Produits Section */}
          <ListItem button onClick={() => setOpenProduits(!openProduits)}>
            <ListItemIcon><CategoryIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
            <ListItemText primary="Produits" />
            {openProduits ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openProduits} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => setActivePage('monture')}
                selected={activePage === 'monture'}
              >
                <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
                <ListItemText primary="Monture" />
              </ListItem>

              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => setActivePage('lentilles')}
                selected={activePage === 'lentilles'}
              >
                <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
                <ListItemText primary="Lentilles" />
              </ListItem>

              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => setActivePage('verre')}
                selected={activePage === 'verre'}
              >
                <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
                <ListItemText primary="Verre" />
              </ListItem>
            </List>
          </Collapse>

          {/* ✅ Organization Section */}
          <ListItem button onClick={() => setOpenOrganization(!openOrganization)}>
            <ListItemIcon><PeopleIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
            <ListItemText primary="Organization" />
            {openOrganization ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openOrganization} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* ✅ Client */}
              <ListItem button sx={{ pl: 4 }} onClick={() => setOpenClient(!openClient)}>
                <ListItemIcon><PersonIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
                <ListItemText primary="Client" />
                {openClient ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={openClient} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {/* ✅ Magasin under Client */}
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    onClick={() => setActivePage('magasin')}
                    selected={activePage === 'magasin'}
                  >
                    <ListItemIcon><StoreIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
                    <ListItemText primary="Magasin" />
                  </ListItem>

                  {/* ✅ Particulier under Client */}
                  <ListItem
                    button
                    sx={{ pl: 6 }}
                    onClick={() => setActivePage('particulier')}
                    selected={activePage === 'particulier'}
                  >
                    <ListItemIcon><PersonIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
                    <ListItemText primary="Particulier" />
                  </ListItem>
                </List>
              </Collapse>

              {/* ✅ Fournisseur */}
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => setActivePage('fournisseur')}
                selected={activePage === 'fournisseur'}
              >
                <ListItemIcon><BusinessIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
                <ListItemText primary="Fournisseur" />
              </ListItem>
            </List>
          </Collapse>
        </List>

          {/* Add logout at the bottom */}
        <Box sx={{ mt: 'auto', p: 2 }}>
          <ListItem
            component="div"
            onClick={handleLogout}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: 'grey.500' }} />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItem>
        </Box>

      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderContent()}
        <Box mt={5} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © 2023 Optics Manager
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;



// import { useState } from 'react';
// import {
//   Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
//   ListItemText, Collapse
// } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import GlassesIcon from '@mui/icons-material/Visibility';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import CategoryIcon from '@mui/icons-material/CategoryRounded';
// import LensIcon from '@mui/icons-material/VisibilityRounded';
// import PeopleIcon from '@mui/icons-material/People'; // Added for Organization
// import StoreIcon from '@mui/icons-material/Store';   // Icon for magasin
// import PersonIcon from '@mui/icons-material/Person'; // Icon for particulier
// import BusinessIcon from '@mui/icons-material/Business'; // Icon for fournisseur
// import ReceiptIcon from '@mui/icons-material/Receipt'; // ✅ Add icon for Ventes


// import Monture from '../components/Products/Monture/Monture';
// import Lentille from '../components/Products/Lentille/Lentille';
// import Home from './Home';
// import Verre from '../components/Products/Verre/Verre';

// // ✅ Import Magasin component
// // import Magasin from '../components/Organization/Magasin/Magasin';
// import Magasin from '../components/Organization/Client/Magasin/Magasin';
// // import Vente from '../components/Vente/Vente';
// // import NewVente from '../components/Vente/NewVente';



// import { useAuth } from '../context/authContext';
// import { useNavigate } from 'react-router-dom';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// const drawerWidth = 280;

// function Layout() {

//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [activePage, setActivePage] = useState('home');
//   const [openProduits, setOpenProduits] = useState(true);
//   // ✅ New state for Organization and Client collapsibles
//   const [openOrganization, setOpenOrganization] = useState(false);
//   const [openClient, setOpenClient] = useState(false);

//   console.log({ Monture, Lentille, Verre, Home, Magasin });


//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const renderContent = () => {
//     switch (activePage) {
//       case 'home':
//         return <Home />;
//       case 'monture':
//         return <Monture />;
//       case 'lentilles':
//         return <Lentille />;
//       case 'verre':
//         return <Verre />;
//       // ✅ Add Magasin rendering
//       case 'magasin':
//         return <Magasin />;
//       // Dans renderContent():
//       // case 'vente':
//       //   return <Vente setActivePage={setActivePage} />;
//       // case 'new-vente':
//       //   return <NewVente setActivePage={setActivePage} />;
//       // case 'vente':
//       //   return <Vente setActivePage={setActivePage} />; // Pass setActivePage
//       // case 'new-vente':
//       //   return <NewVente setActivePage={setActivePage} />;
//       // case 'vente':  // ✅ Add vente case
//       //   return <Vente />;
//       // // In Layout.jsx, add to renderContent():
//       // case 'new-vente':
//       //   return <NewVente />;
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', backgroundColor: '#F9FAFB' /* <-- Set background color here */ }}>
//       <CssBaseline />
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             backgroundColor: '#F9FAFB',  // add this line
//           },
//         }}
//       >
//       {/* <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           backgroundColor: '#F9FAFB !important',
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//         }}
//       > */}



//         {/* Add user info at the top */}
//         <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//             <AccountCircleIcon sx={{ mr: 1, color: 'grey.600' }} />
//             <Typography variant="subtitle1" noWrap>
//               {user?.name || user?.username}
//             </Typography>
//           </Box>
//           <Typography variant="body2" color="text.secondary" noWrap>
//             {user?.email}
//           </Typography>
//         </Box>

//         <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB !important', borderRadius: 2, height: 60, width: 250, px: 2, mt: 10, mx: 'auto' }}>
//           <Typography variant="h6" noWrap component="div">
//             Optics Manager
//           </Typography>
//         </Toolbar>

//         <Toolbar />

//         <List sx={{         
//           fontSize: '0.875rem',
//           lineHeight: '1.5rem',
//           fontWeight: 600,
//           color: '#637381',
//           // backgroundColor: '#F4F6F8',
//           borderBottom: '1px solid var(--palette-TableCell-border)',
//           textAlign: 'left',
//           padding: '16px',
//           }}>
//           <ListItem button selected={activePage === 'home'} onClick={() => setActivePage('home')} >
//             <ListItemIcon>
//               <HomeRoundedIcon sx={{ color: 'grey.500' }} />
//             </ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>

//           {/* ✅ Ventes Section - Add after Home */}
//           <ListItem 
//             button 
//             selected={activePage === 'vente'} 
//             onClick={() => setActivePage('vente')}
//           >
//             <ListItemIcon>
//               <ReceiptIcon sx={{ color: 'grey.500' }} />
//             </ListItemIcon>
//             <ListItemText primary="Ventes" />
//           </ListItem>

//           {/* Produits Section */}
//           <ListItem button onClick={() => setOpenProduits(!openProduits)}>
//             <ListItemIcon><CategoryIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
//             <ListItemText primary="Produits" />
//             {openProduits ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>

//           <Collapse in={openProduits} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => setActivePage('monture')}
//                 selected={activePage === 'monture'}
//               >
//                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
//                 <ListItemText primary="Monture" />
//               </ListItem>

//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => setActivePage('lentilles')}
//                 selected={activePage === 'lentilles'}
//               >
//                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
//                 <ListItemText primary="Lentilles" />
//               </ListItem>

//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => setActivePage('verre')}
//                 selected={activePage === 'verre'}
//               >
//                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
//                 <ListItemText primary="Verre" />
//               </ListItem>
//             </List>
//           </Collapse>

//           {/* ✅ Organization Section */}
//           <ListItem button onClick={() => setOpenOrganization(!openOrganization)}>
//             <ListItemIcon><PeopleIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
//             <ListItemText primary="Organization" />
//             {openOrganization ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>

//           <Collapse in={openOrganization} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               {/* ✅ Client */}
//               <ListItem button sx={{ pl: 4 }} onClick={() => setOpenClient(!openClient)}>
//                 <ListItemIcon><PersonIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
//                 <ListItemText primary="Client" />
//                 {openClient ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>

//               <Collapse in={openClient} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   {/* ✅ Magasin under Client */}
//                   <ListItem
//                     button
//                     sx={{ pl: 6 }}
//                     onClick={() => setActivePage('magasin')}
//                     selected={activePage === 'magasin'}
//                   >
//                     <ListItemIcon><StoreIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
//                     <ListItemText primary="Magasin" />
//                   </ListItem>

//                   {/* ✅ Particulier under Client */}
//                   <ListItem
//                     button
//                     sx={{ pl: 6 }}
//                     onClick={() => setActivePage('particulier')}
//                     selected={activePage === 'particulier'}
//                   >
//                     <ListItemIcon><PersonIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
//                     <ListItemText primary="Particulier" />
//                   </ListItem>
//                 </List>
//               </Collapse>

//               {/* ✅ Fournisseur */}
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => setActivePage('fournisseur')}
//                 selected={activePage === 'fournisseur'}
//               >
//                 <ListItemIcon><BusinessIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
//                 <ListItemText primary="Fournisseur" />
//               </ListItem>
//             </List>
//           </Collapse>
//         </List>

//           {/* Add logout at the bottom */}
//         <Box sx={{ mt: 'auto', p: 2 }}>
//           <ListItem
//             component="div"
//             onClick={handleLogout}
//             sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
//           >
//             <ListItemIcon>
//               <LogoutIcon sx={{ color: 'grey.500' }} />
//             </ListItemIcon>
//             <ListItemText primary="Déconnexion" />
//           </ListItem>
//         </Box>

//       </Drawer>

//       {/* Main content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar />
//         {renderContent()}
//         <Box mt={5} textAlign="center">
//           <Typography variant="body2" color="text.secondary">
//             © 2023 Optics Manager
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default Layout;


// // import { useState } from 'react';
// // import {
// //   Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
// //   ListItemText, Collapse
// // } from '@mui/material';
// // import DashboardIcon from '@mui/icons-material/Dashboard';
// // import GlassesIcon from '@mui/icons-material/Visibility';
// // // import LensIcon from '@mui/icons-material/VisibilityOutlined';
// // // import CategoryIcon from '@mui/icons-material/Category';
// // import ExpandLess from '@mui/icons-material/ExpandLess';
// // import ExpandMore from '@mui/icons-material/ExpandMore';
// // import HomeIcon from '@mui/icons-material/Home'
// // import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// // import CategoryIcon from '@mui/icons-material/CategoryRounded';
// // import LensIcon from '@mui/icons-material/VisibilityRounded';

// // // import Monture from './components/Monture';
// // // import Lentille from './components/Lentille';
// // import Monture from '../components/Products/Monture/Monture';
// // import Lentille from '../components/Products/Lentille/Lentille';
// // import Home from './Home';
// // import Verre from '../components/Products/Verre/Verre';
// // const drawerWidth = 280;

// // function Layout() {
// //   const [activePage, setActivePage] = useState('home');
// //   const [openProduits, setOpenProduits] = useState(true); // Controls expand/collapse

// //   const renderContent = () => {
// //     switch (activePage) {
// //         case 'home':
// //         return <Home />;
// //       case 'monture':
// //         return <Monture />;
// //       case 'lentilles':
// //         return <Lentille />;
// //       case 'verre':
// //         return <Verre />;
// //       default:
// //         return <Home />;
// //     }
// //   };

// //   console.log('Verre:', Verre);


// //   return (
// //     <Box sx={{ display: 'flex' }}>
// //       <CssBaseline />

// //       {/* AppBar */}
// //       {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
// //         <Toolbar>
// //           <Typography variant="h6" noWrap component="div">
// //             Optics Manager
// //           </Typography>
// //         </Toolbar>
// //       </AppBar> */}

// //       {/* Sidebar */}
// //       <Drawer
// //         variant="permanent"
// //         sx={{
// //           width: drawerWidth,
// //           flexShrink: 0,
// //           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
// //         }}
// //       >
// //         <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 2, height: 60, width: 250, px: 2, mt: 10, mx: 'auto'}}
// // >
// //           <Typography variant="h6" noWrap component="div">
// //             Optics Manager
// //           </Typography>
// //         </Toolbar>

// //         <Toolbar />

// //         <List>
// //             <ListItem button selected={activePage === 'home'} onClick={() => setActivePage('home')} >
// //             <ListItemIcon>
// //             {/* Use a relevant MUI icon for Home */}
// //             <HomeRoundedIcon sx={{ color: 'grey.500' }} />
// //             </ListItemIcon>
// //             <ListItemText primary="Home" />
// //             </ListItem>
// //           {/* Produits (Collapsible Section) */}
// //           <ListItem button onClick={() => setOpenProduits(!openProduits)}>
// //             <ListItemIcon><CategoryIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// //             <ListItemText primary="Produits" />
// //             {openProduits ? <ExpandLess /> : <ExpandMore />}
// //           </ListItem>


// //           <Collapse in={openProduits} timeout="auto" unmountOnExit>
// //             <List component="div" disablePadding>
// //               <ListItem
// //                 button
// //                 sx={{ pl: 4 }}
// //                 onClick={() => setActivePage('monture')}
// //                 selected={activePage === 'monture'}
// //               >
// //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// //                 <ListItemText primary="Monture" />
// //               </ListItem>
// //               <ListItem
// //                 button
// //                 sx={{ pl: 4 }}
// //                 onClick={() => setActivePage('lentilles')}
// //                 selected={activePage === 'lentilles'}
// //               >
// //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// //                 <ListItemText primary="Lentilles" />
// //               </ListItem>

// //               <ListItem
// //                 button
// //                 sx={{ pl: 4 }}
// //                 onClick={() => setActivePage('verre')}
// //                 selected={activePage === 'verre'}
// //               >
// //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// //                 <ListItemText primary="Verre" />
// //               </ListItem>


// //             </List>
// //           </Collapse>
// //         </List>
// //       </Drawer>

// //       {/* Main content */}
// //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// //         <Toolbar />
// //         {renderContent()}
// //         <Box mt={5} textAlign="center">
// //           <Typography variant="body2" color="text.secondary">
// //             © 2023 Optics Manager
// //           </Typography>
// //         </Box>
// //       </Box>
// //     </Box>
// //   );
// // }

// // export default Layout;