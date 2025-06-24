import { useState, useEffect } from 'react';
import {
  Box, CssBaseline, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Collapse, Divider, useMediaQuery, useTheme, IconButton, AppBar
} from '@mui/material';

// Professional MUI Icons for Optical Industry
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import InventoryIcon from '@mui/icons-material/Inventory';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LensIcon from '@mui/icons-material/Lens';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import HandymanIcon from '@mui/icons-material/Handyman';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

import Monture from '../components/Products/Monture/Monture';
import Lentille from '../components/Products/Lentille/Lentille';
import Home from './Home';
import Verre from '../components/Products/Verre/Verre';
import Accessoire from '../components/Products/Accessoire/Accessoire';
import Magasin from '../components/Organization/Client/Magasin/Magasin';
import Particulier from '../components/Organization/Client/Particulier/Particulier';
import Vente from '../components/Vente/Vente';
import NewVente from '../components/Vente/NewVente';

// Add these imports at the top of Layout.jsx
import UserManagement from '../components/Admin/UserManagement';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 280;
const mobileDrawerWidth = 260;

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activePage, setActivePage] = useState('home');
  const [openProduits, setOpenProduits] = useState(true);
  const [openOrganization, setOpenOrganization] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  console.log({ Monture, Lentille, Verre, Accessoire, Home, Magasin, Particulier, Vente, NewVente });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

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
      case 'accessoire':
        return <Accessoire />;
      case 'magasin':
        return <Magasin />;
      case 'particulier':
        return <Particulier />;
      case 'vente':
        return <Vente setActivePage={setActivePage} />;
      case 'new-vente':
        return <NewVente setActivePage={setActivePage} />;
      case 'user-management':
        return <UserManagement />;
      default:
        return <Home />;
    }
  };

  const drawerContent = (
    <>
      {/* User Profile Section */}
      <Box sx={{ 
        p: isMobile ? 2 : 3,
        borderBottom: '1px solid #E5E7EB',
        backgroundColor: '#F9FAFB'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccountCircleIcon sx={{ mr: 2, color: '#6B7280', fontSize: isMobile ? 28 : 32 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight={600} color="#111827">
              {user?.name || user?.username}
            </Typography>
            <Typography variant="caption" color="#6B7280">
              {user?.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Logo Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        py: isMobile ? 2 : 3,
        borderBottom: '1px solid #F3F4F6'
      }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"}
          fontWeight={700} 
          color="#000000"
          sx={{
            letterSpacing: '0.5px'
          }}
        >
          Optics Manager
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ 
        flex: 1,
        px: 2,
        py: 1,
        '& .MuiListItem-root': {
          borderRadius: '8px',
          mb: 0.5,
          transition: 'all 0.2s ease-in-out',
        }
      }}>
        
        {/* Home */}
        <ListItem 
          button 
          selected={activePage === 'home'} 
          onClick={() => {
            setActivePage('home');
            if (isMobile) setMobileOpen(false);
          }}
          sx={{
            cursor: 'pointer',
            '&.Mui-selected': {
              backgroundColor: '#EBF8FF',
              borderLeft: '3px solid #3B82F6',
              '& .MuiListItemIcon-root': { color: '#3B82F6' },
              '& .MuiListItemText-primary': { color: '#1E40AF', fontWeight: 600 }
            },
            '&:hover': {
              backgroundColor: '#F8FAFC',
            }
          }}
        >
          <ListItemIcon>
            <HomeRoundedIcon sx={{ color: activePage === 'home' ? '#3B82F6' : '#6B7280' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Accueil" 
            primaryTypographyProps={{ 
              fontWeight: activePage === 'home' ? 600 : 500,
              fontSize: '0.9rem'
            }} 
          />
        </ListItem>

        {/* Ventes */}
        <ListItem 
          button 
          selected={activePage === 'vente'} 
          onClick={() => {
            setActivePage('vente');
            if (isMobile) setMobileOpen(false);
          }}
          sx={{
            cursor: 'pointer',
            '&.Mui-selected': {
              backgroundColor: '#F0FDF4',
              borderLeft: '3px solid #22C55E',
              '& .MuiListItemIcon-root': { color: '#22C55E' },
              '& .MuiListItemText-primary': { color: '#15803D', fontWeight: 600 }
            },
            '&:hover': {
              backgroundColor: '#F8FAFC',
            }
          }}
        >
          <ListItemIcon>
            <ReceiptLongIcon sx={{ color: activePage === 'vente' ? '#22C55E' : '#6B7280' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Ventes" 
            primaryTypographyProps={{ 
              fontWeight: activePage === 'vente' ? 600 : 500,
              fontSize: '0.9rem'
            }} 
          />
        </ListItem>

        <Divider sx={{ my: 2, mx: 1 }} />

        {/* Produits Section */}
        <ListItem 
          button 
          onClick={() => setOpenProduits(!openProduits)}
          sx={{
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#F8FAFC' }
          }}
        >
          <ListItemIcon>
            <InventoryIcon sx={{ color: '#8B5CF6' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Produits" 
            primaryTypographyProps={{ 
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#374151'
            }} 
          />
          {openProduits ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openProduits} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 1 }}>
            
            {/* Monture */}
            <ListItem
              button
              sx={{ 
                pl: 4,
                borderRadius: '6px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#F8FAFC' },
                ...(activePage === 'monture' && {
                  backgroundColor: '#FEF3F2',
                  borderLeft: '2px solid #EF4444',
                  '& .MuiListItemIcon-root': { color: '#EF4444' },
                  '& .MuiListItemText-primary': { color: '#DC2626', fontWeight: 600 }
                })
              }}
              onClick={() => {
                setActivePage('monture');
                if (isMobile) setMobileOpen(false);
              }}
              selected={activePage === 'monture'}
            >
              <ListItemIcon>
                <VisibilityIcon sx={{ 
                  fontSize: 20,
                  color: activePage === 'monture' ? '#EF4444' : '#9CA3AF' 
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Montures" 
                primaryTypographyProps={{ 
                  fontSize: '0.85rem',
                  fontWeight: activePage === 'monture' ? 600 : 500
                }} 
              />
            </ListItem>

            {/* Lentilles */}
            <ListItem
              button
              sx={{ 
                pl: 4,
                borderRadius: '6px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#F8FAFC' },
                ...(activePage === 'lentilles' && {
                  backgroundColor: '#FFF7ED',
                  borderLeft: '2px solid #F97316',
                  '& .MuiListItemIcon-root': { color: '#F97316' },
                  '& .MuiListItemText-primary': { color: '#EA580C', fontWeight: 600 }
                })
              }}
              onClick={() => {
                setActivePage('lentilles');
                if (isMobile) setMobileOpen(false);
              }}
              selected={activePage === 'lentilles'}
            >
              <ListItemIcon>
                <LensIcon sx={{ 
                  fontSize: 20,
                  color: activePage === 'lentilles' ? '#F97316' : '#9CA3AF' 
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Lentilles" 
                primaryTypographyProps={{ 
                  fontSize: '0.85rem',
                  fontWeight: activePage === 'lentilles' ? 600 : 500
                }} 
              />
            </ListItem>

            {/* Verre */}
            <ListItem
              button
              sx={{ 
                pl: 4,
                borderRadius: '6px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#F8FAFC' },
                ...(activePage === 'verre' && {
                  backgroundColor: '#F0F9FF',
                  borderLeft: '2px solid #0EA5E9',
                  '& .MuiListItemIcon-root': { color: '#0EA5E9' },
                  '& .MuiListItemText-primary': { color: '#0284C7', fontWeight: 600 }
                })
              }}
              onClick={() => {
                setActivePage('verre');
                if (isMobile) setMobileOpen(false);
              }}
              selected={activePage === 'verre'}
            >
              <ListItemIcon>
                <AutoFixHighIcon sx={{ 
                  fontSize: 20,
                  color: activePage === 'verre' ? '#0EA5E9' : '#9CA3AF' 
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Verres" 
                primaryTypographyProps={{ 
                  fontSize: '0.85rem',
                  fontWeight: activePage === 'verre' ? 600 : 500
                }} 
              />
            </ListItem>

            {/* Accessoire */}
            <ListItem
              button
              sx={{ 
                pl: 4,
                borderRadius: '6px',
                cursor: 'pointer', 
                '&:hover': { backgroundColor: '#F8FAFC' },
                ...(activePage === 'accessoire' && {
                  backgroundColor: '#FEFCE8',
                  borderLeft: '2px solid #EAB308',
                  '& .MuiListItemIcon-root': { color: '#EAB308' },
                  '& .MuiListItemText-primary': { color: '#CA8A04', fontWeight: 600 }
                })
              }}
              onClick={() => {
                setActivePage('accessoire');
                if (isMobile) setMobileOpen(false);
              }}
              selected={activePage === 'accessoire'}
            >
              <ListItemIcon>
                <HandymanIcon sx={{ 
                  fontSize: 20,
                  color: activePage === 'accessoire' ? '#EAB308' : '#9CA3AF' 
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Accessoires" 
                primaryTypographyProps={{ 
                  fontSize: '0.85rem',
                  fontWeight: activePage === 'accessoire' ? 600 : 500
                }} 
              />
            </ListItem>
          </List>
        </Collapse>

        <Divider sx={{ my: 2, mx: 1 }} />

        {/* Organization Section */}
        <ListItem 
          button 
          onClick={() => setOpenOrganization(!openOrganization)}
          sx={{
            cursor: 'pointer', 
            '&:hover': { backgroundColor: '#F8FAFC' }
          }}
        >
          <ListItemIcon>
            <BusinessIcon sx={{ color: '#EC4899' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Organisation" 
            primaryTypographyProps={{ 
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#374151'
            }} 
          />
          {openOrganization ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openOrganization} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 1 }}>
            
            {/* Client Submenu */}
            <ListItem 
              button 
              sx={{ pl: 4, cursor: 'pointer'}} 
              onClick={() => setOpenClient(!openClient)}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: '#6366F1', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText 
                primary="Clients" 
                primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} 
              />
              {openClient ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openClient} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                
                {/* Magasin */}
                <ListItem
                  button
                  sx={{ 
                    pl: 6,
                    cursor: 'pointer', 
                    borderRadius: '6px',
                    '&:hover': { backgroundColor: '#F8FAFC' },
                    ...(activePage === 'magasin' && {
                      backgroundColor: '#F0FDF4',
                      '& .MuiListItemIcon-root': { color: '#059669' },
                      '& .MuiListItemText-primary': { color: '#047857', fontWeight: 600 }
                    })
                  }}
                  onClick={() => {
                    setActivePage('magasin');
                    if (isMobile) setMobileOpen(false);
                  }}
                  selected={activePage === 'magasin'}
                >
                  <ListItemIcon>
                    <StoreIcon sx={{ 
                      fontSize: 18,
                      color: activePage === 'magasin' ? '#059669' : '#9CA3AF' 
                    }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Magasins" 
                    primaryTypographyProps={{ 
                      fontSize: '0.8rem',
                      fontWeight: activePage === 'magasin' ? 600 : 500
                    }} 
                  />
                </ListItem>

                {/* Particulier */}
                <ListItem
                  button
                  sx={{ 
                    pl: 6,
                    cursor: 'pointer', 
                    borderRadius: '6px',
                    '&:hover': { backgroundColor: '#F8FAFC' },
                    ...(activePage === 'particulier' && {
                      backgroundColor: '#F5F3FF',
                      '& .MuiListItemIcon-root': { color: '#7C3AED' },
                      '& .MuiListItemText-primary': { color: '#6D28D9', fontWeight: 600 }
                    })
                  }}
                  onClick={() => {
                    setActivePage('particulier');
                    if (isMobile) setMobileOpen(false);
                  }}
                  selected={activePage === 'particulier'}
                >
                  <ListItemIcon>
                    <PersonIcon sx={{ 
                      fontSize: 18,
                      color: activePage === 'particulier' ? '#7C3AED' : '#9CA3AF' 
                    }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Particuliers" 
                    primaryTypographyProps={{ 
                      fontSize: '0.8rem',
                      fontWeight: activePage === 'particulier' ? 600 : 500
                    }} 
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Fournisseur */}
            <ListItem
              button
              sx={{ 
                pl: 4,
                borderRadius: '6px',
                cursor: 'pointer', 
                '&:hover': { backgroundColor: '#F8FAFC' },
                ...(activePage === 'fournisseur' && {
                  backgroundColor: '#FEF2F2',
                  '& .MuiListItemIcon-root': { color: '#DC2626' },
                  '& .MuiListItemText-primary': { color: '#B91C1C', fontWeight: 600 }
                })
              }}
              onClick={() => {
                setActivePage('fournisseur');
                if (isMobile) setMobileOpen(false);
              }}
              selected={activePage === 'fournisseur'}
            >
              <ListItemIcon>
                <PrecisionManufacturingIcon sx={{ 
                  fontSize: 20,
                  color: activePage === 'fournisseur' ? '#DC2626' : '#9CA3AF' 
                }} />
              </ListItemIcon>
              <ListItemText 
                primary="Fournisseurs" 
                primaryTypographyProps={{ 
                  fontSize: '0.85rem',
                  fontWeight: activePage === 'fournisseur' ? 600 : 500
                }} 
              />
            </ListItem>

            {/* Admin Section - Only show for admin users */}
            {user?.role === 'ADMIN' && (
              <>
                <Divider sx={{ my: 2, mx: 1 }} />
                
                <ListItem 
                  button 
                  selected={activePage === 'user-management'} 
                  onClick={() => {
                    setActivePage('user-management');
                    if (isMobile) setMobileOpen(false);
                  }}
                  sx={{
                    cursor: 'pointer',
                    '&.Mui-selected': {
                      backgroundColor: '#F3E5F5',
                      borderLeft: '3px solid #9C27B0',
                      '& .MuiListItemIcon-root': { color: '#9C27B0' },
                      '& .MuiListItemText-primary': { color: '#7B1FA2', fontWeight: 600 }
                    },
                    '&:hover': {
                      backgroundColor: '#F8FAFC',
                    }
                  }}
                >
                  <ListItemIcon>
                    <SupervisorAccountIcon sx={{ color: activePage === 'user-management' ? '#9C27B0' : '#6B7280' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Gestion Utilisateurs" 
                    primaryTypographyProps={{ 
                      fontWeight: activePage === 'user-management' ? 600 : 500,
                      fontSize: '0.9rem'
                    }} 
                  />
                </ListItem>
              </>
            )}
          </List>
        </Collapse>
      </List>

      {/* Logout Section */}
      <Box sx={{ p: 2, borderTop: '1px solid #E5E7EB' }}>
        <ListItem
          component="div"
          onClick={handleLogout}
          sx={{ 
            cursor: 'pointer', 
            borderRadius: '8px',
            '&:hover': { 
              backgroundColor: '#FEF2F2',
              '& .MuiListItemIcon-root': { color: '#EF4444' },
              '& .MuiListItemText-primary': { color: '#DC2626' }
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#6B7280' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Déconnexion" 
            primaryTypographyProps={{ 
              fontSize: '0.9rem',
              fontWeight: 500
            }} 
          />
        </ListItem>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F9FAFB' }}>
      <CssBaseline />
      
      {/* AppBar for mobile */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Optics Manager
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ 
          width: { md: drawerWidth }, 
          flexShrink: { md: 0 } 
        }}
      >
        {/* Mobile drawer */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: mobileDrawerWidth,
                backgroundColor: '#F9FAFB',
                borderRight: '1px solid #E5E7EB',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}
        
        {/* Desktop drawer */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#F9FAFB',
                borderRight: '1px solid #E5E7EB',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}
      </Box>

      {/* Main content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          backgroundColor: '#F9FAFB',
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: 0 },
          mt: { xs: 8, md: 0 }, // Add top margin on mobile for AppBar
        }}
      >
        {!isMobile && <Toolbar />}
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
//   Box, CssBaseline, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
//   ListItemText, Collapse, Divider
// } from '@mui/material';

// // Professional MUI Icons for Optical Industry
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import LensIcon from '@mui/icons-material/Lens';
// import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
// import HandymanIcon from '@mui/icons-material/Handyman';
// import BusinessIcon from '@mui/icons-material/Business';
// import PersonIcon from '@mui/icons-material/Person';
// import StoreIcon from '@mui/icons-material/Store';
// import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// import Monture from '../components/Products/Monture/Monture';
// import Lentille from '../components/Products/Lentille/Lentille';
// import Home from './Home';
// import Verre from '../components/Products/Verre/Verre';
// import Accessoire from '../components/Products/Accessoire/Accessoire';
// import Magasin from '../components/Organization/Client/Magasin/Magasin';
// import Particulier from '../components/Organization/Client/Particulier/Particulier';
// import Vente from '../components/Vente/Vente';
// import NewVente from '../components/Vente/NewVente';

// // Add these imports at the top of Layout.jsx
// import UserManagement from '../components/Admin/UserManagement';
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// import { useAuth } from '../context/authContext';
// import { useNavigate } from 'react-router-dom';

// const drawerWidth = 280;

// function Layout() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [activePage, setActivePage] = useState('home');
//   const [openProduits, setOpenProduits] = useState(true);
//   const [openOrganization, setOpenOrganization] = useState(false);
//   const [openClient, setOpenClient] = useState(false);

//   console.log({ Monture, Lentille, Verre, Accessoire, Home, Magasin, Particulier, Vente, NewVente });

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
//       case 'accessoire':
//         return <Accessoire />;
//       case 'magasin':
//         return <Magasin />;
//       case 'particulier':
//         return <Particulier />;
//       case 'vente':
//         return <Vente setActivePage={setActivePage} />;
//       case 'new-vente':
//         return <NewVente setActivePage={setActivePage} />;
//       case 'user-management':
//         return <UserManagement />;
//       default:
//         return <Home />;
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', backgroundColor: '#F9FAFB' }}>
//       <CssBaseline />
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             backgroundColor: '#F9FAFB',
//             borderRight: '1px solid #E5E7EB',
//             boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
//           },
//         }}
//       >
//         {/* User Profile Section */}
//         <Box sx={{ 
//           p: 3, 
//           borderBottom: '1px solid #E5E7EB',
//           backgroundColor: '#F8FAFC'
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//             <AccountCircleIcon sx={{ mr: 2, color: '#6B7280', fontSize: 32 }} />
//             <Box>
//               <Typography variant="subtitle1" fontWeight={600} color="#111827">
//                 {user?.name || user?.username}
//               </Typography>
//               <Typography variant="caption" color="#6B7280">
//                 {user?.email}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>

//         {/* Logo Section */}
//         <Box sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           py: 3,
//           borderBottom: '1px solid #F3F4F6'
//         }}>
//           <Typography 
//             variant="h5" 
//             fontWeight={700} 
//             color="#1F2937"
//             sx={{
//               background: '#3B82F6',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               letterSpacing: '0.5px'
//             }}
//           >
//             Optics Manager
//           </Typography>
//         </Box>

//         {/* Navigation Menu */}
//         <List sx={{ 
//           flex: 1,
//           px: 2,
//           py: 1,
//           '& .MuiListItem-root': {
//             borderRadius: '8px',
//             mb: 0.5,
//             transition: 'all 0.2s ease-in-out',
//           }
//         }}>
          
//           {/* Home */}
//           <ListItem 
//             button 
//             selected={activePage === 'home'} 
//             onClick={() => setActivePage('home')}
//             sx={{
//               cursor: 'pointer',
//               '&.Mui-selected': {
//                 backgroundColor: '#EBF8FF',
//                 borderLeft: '3px solid #3B82F6',
//                 '& .MuiListItemIcon-root': { color: '#3B82F6' },
//                 '& .MuiListItemText-primary': { color: '#1E40AF', fontWeight: 600 }
//               },
//               '&:hover': {
//                 backgroundColor: '#F8FAFC',
//               }
//             }}
//           >
//             <ListItemIcon>
//               <HomeRoundedIcon sx={{ color: activePage === 'home' ? '#3B82F6' : '#6B7280' }} />
//             </ListItemIcon>
//             <ListItemText 
//               primary="Accueil" 
//               primaryTypographyProps={{ 
//                 fontWeight: activePage === 'home' ? 600 : 500,
//                 fontSize: '0.9rem'
//               }} 
//             />
//           </ListItem>

//           {/* Ventes */}
//           <ListItem 
//             button 
//             selected={activePage === 'vente'} 
//             onClick={() => setActivePage('vente')}
//             sx={{
//               cursor: 'pointer',
//               '&.Mui-selected': {
//                 backgroundColor: '#F0FDF4',
//                 borderLeft: '3px solid #22C55E',
//                 '& .MuiListItemIcon-root': { color: '#22C55E' },
//                 '& .MuiListItemText-primary': { color: '#15803D', fontWeight: 600 }
//               },
//               '&:hover': {
//                 backgroundColor: '#F8FAFC',
//               }
//             }}
//           >
//             <ListItemIcon>
//               <ReceiptLongIcon sx={{ color: activePage === 'vente' ? '#22C55E' : '#6B7280' }} />
//             </ListItemIcon>
//             <ListItemText 
//               primary="Ventes" 
//               primaryTypographyProps={{ 
//                 fontWeight: activePage === 'vente' ? 600 : 500,
//                 fontSize: '0.9rem'
//               }} 
//             />
//           </ListItem>

//           <Divider sx={{ my: 2, mx: 1 }} />

//           {/* Produits Section */}
//           <ListItem 
//             button 
//             onClick={() => setOpenProduits(!openProduits)}
//             sx={{
//               cursor: 'pointer',
//               '&:hover': { backgroundColor: '#F8FAFC' }
//             }}
//           >
//             <ListItemIcon>
//               <InventoryIcon sx={{ color: '#8B5CF6' }} />
//             </ListItemIcon>
//             <ListItemText 
//               primary="Produits" 
//               primaryTypographyProps={{ 
//                 fontWeight: 600,
//                 fontSize: '0.9rem',
//                 color: '#374151'
//               }} 
//             />
//             {openProduits ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>

//           <Collapse in={openProduits} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding sx={{ pl: 1 }}>
              
//               {/* Monture */}
//               <ListItem
//                 button
//                 sx={{ 
//                   pl: 4,
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   '&:hover': { backgroundColor: '#F8FAFC' },
//                   ...(activePage === 'monture' && {
//                     backgroundColor: '#FEF3F2',
//                     borderLeft: '2px solid #EF4444',
//                     '& .MuiListItemIcon-root': { color: '#EF4444' },
//                     '& .MuiListItemText-primary': { color: '#DC2626', fontWeight: 600 }
//                   })
//                 }}
//                 onClick={() => setActivePage('monture')}
//                 selected={activePage === 'monture'}
//               >
//                 <ListItemIcon>
//                   <VisibilityIcon sx={{ 
//                     fontSize: 20,
//                     color: activePage === 'monture' ? '#EF4444' : '#9CA3AF' 
//                   }} />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="Montures" 
//                   primaryTypographyProps={{ 
//                     fontSize: '0.85rem',
//                     fontWeight: activePage === 'monture' ? 600 : 500
//                   }} 
//                 />
//               </ListItem>

//               {/* Lentilles */}
//               <ListItem
//                 button
//                 sx={{ 
//                   pl: 4,
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   '&:hover': { backgroundColor: '#F8FAFC' },
//                   ...(activePage === 'lentilles' && {
//                     backgroundColor: '#FFF7ED',
//                     borderLeft: '2px solid #F97316',
//                     '& .MuiListItemIcon-root': { color: '#F97316' },
//                     '& .MuiListItemText-primary': { color: '#EA580C', fontWeight: 600 }
//                   })
//                 }}
//                 onClick={() => setActivePage('lentilles')}
//                 selected={activePage === 'lentilles'}
//               >
//                 <ListItemIcon>
//                   <LensIcon sx={{ 
//                     fontSize: 20,
//                     color: activePage === 'lentilles' ? '#F97316' : '#9CA3AF' 
//                   }} />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="Lentilles" 
//                   primaryTypographyProps={{ 
//                     fontSize: '0.85rem',
//                     fontWeight: activePage === 'lentilles' ? 600 : 500
//                   }} 
//                 />
//               </ListItem>

//               {/* Verre */}
//               <ListItem
//                 button
//                 sx={{ 
//                   pl: 4,
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   '&:hover': { backgroundColor: '#F8FAFC' },
//                   ...(activePage === 'verre' && {
//                     backgroundColor: '#F0F9FF',
//                     borderLeft: '2px solid #0EA5E9',
//                     '& .MuiListItemIcon-root': { color: '#0EA5E9' },
//                     '& .MuiListItemText-primary': { color: '#0284C7', fontWeight: 600 }
//                   })
//                 }}
//                 onClick={() => setActivePage('verre')}
//                 selected={activePage === 'verre'}
//               >
//                 <ListItemIcon>
//                   <AutoFixHighIcon sx={{ 
//                     fontSize: 20,
//                     color: activePage === 'verre' ? '#0EA5E9' : '#9CA3AF' 
//                   }} />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="Verres" 
//                   primaryTypographyProps={{ 
//                     fontSize: '0.85rem',
//                     fontWeight: activePage === 'verre' ? 600 : 500
//                   }} 
//                 />
//               </ListItem>

//               {/* Accessoire */}
//               <ListItem
//                 button
//                 sx={{ 
//                   pl: 4,
//                   borderRadius: '6px',
//                   cursor: 'pointer', 

//                   '&:hover': { backgroundColor: '#F8FAFC' },
//                   ...(activePage === 'accessoire' && {
//                     backgroundColor: '#FEFCE8',
//                     borderLeft: '2px solid #EAB308',
//                     '& .MuiListItemIcon-root': { color: '#EAB308' },
//                     '& .MuiListItemText-primary': { color: '#CA8A04', fontWeight: 600 }
//                   })
//                 }}
//                 onClick={() => setActivePage('accessoire')}
//                 selected={activePage === 'accessoire'}
//               >
//                 <ListItemIcon>
//                   <HandymanIcon sx={{ 
//                     fontSize: 20,
//                     color: activePage === 'accessoire' ? '#EAB308' : '#9CA3AF' 
//                   }} />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="Accessoires" 
//                   primaryTypographyProps={{ 
//                     fontSize: '0.85rem',
//                     fontWeight: activePage === 'accessoire' ? 600 : 500
//                   }} 
//                 />
//               </ListItem>
//             </List>
//           </Collapse>

//           <Divider sx={{ my: 2, mx: 1 }} />

//           {/* Organization Section */}
//           <ListItem 
//             button 
//             onClick={() => setOpenOrganization(!openOrganization)}
//             sx={{
//               cursor: 'pointer', 
//               '&:hover': { backgroundColor: '#F8FAFC' }
//             }}
//           >
//             <ListItemIcon>
//               <BusinessIcon sx={{ color: '#EC4899' }} />
//             </ListItemIcon>
//             <ListItemText 
//               primary="Organisation" 
//               primaryTypographyProps={{ 
//                 fontWeight: 600,
//                 fontSize: '0.9rem',
//                 color: '#374151'
//               }} 
//             />
//             {openOrganization ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>

//           <Collapse in={openOrganization} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding sx={{ pl: 1 }}>
              
//               {/* Client Submenu */}
//               <ListItem 
//                 button 
//                 sx={{ pl: 4 ,cursor: 'pointer'}} 
//                 onClick={() => setOpenClient(!openClient)}
//               >
//                 <ListItemIcon>
//                   <PersonIcon sx={{ color: '#6366F1', fontSize: 20 }} />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="Clients" 
//                   primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} 
//                 />
//                 {openClient ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>

//               <Collapse in={openClient} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
                  
//                   {/* Magasin */}
//                   <ListItem
//                     button
//                     sx={{ 
//                       pl: 6,
//                       cursor: 'pointer', 
//                       borderRadius: '6px',
//                       '&:hover': { backgroundColor: '#F8FAFC' },
//                       ...(activePage === 'magasin' && {
//                         backgroundColor: '#F0FDF4',
//                         '& .MuiListItemIcon-root': { color: '#059669' },
//                         '& .MuiListItemText-primary': { color: '#047857', fontWeight: 600 }
//                       })
//                     }}
//                     onClick={() => setActivePage('magasin')}
//                     selected={activePage === 'magasin'}
//                   >
//                     <ListItemIcon>
//                       <StoreIcon sx={{ 
//                         fontSize: 18,
//                         color: activePage === 'magasin' ? '#059669' : '#9CA3AF' 
//                       }} />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Magasins" 
//                       primaryTypographyProps={{ 
//                         fontSize: '0.8rem',
//                         fontWeight: activePage === 'magasin' ? 600 : 500
//                       }} 
//                     />
//                   </ListItem>

//                   {/* Particulier */}
//                   <ListItem
//                     button
//                     sx={{ 
//                       pl: 6,
//                       cursor: 'pointer', 

//                       borderRadius: '6px',
//                       '&:hover': { backgroundColor: '#F8FAFC' },
//                       ...(activePage === 'particulier' && {
//                         backgroundColor: '#F5F3FF',
//                         '& .MuiListItemIcon-root': { color: '#7C3AED' },
//                         '& .MuiListItemText-primary': { color: '#6D28D9', fontWeight: 600 }
//                       })
//                     }}
//                     onClick={() => setActivePage('particulier')}
//                     selected={activePage === 'particulier'}
//                   >
//                     <ListItemIcon>
//                       <PersonIcon sx={{ 
//                         fontSize: 18,
//                         color: activePage === 'particulier' ? '#7C3AED' : '#9CA3AF' 
//                       }} />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Particuliers" 
//                       primaryTypographyProps={{ 
//                         fontSize: '0.8rem',
//                         fontWeight: activePage === 'particulier' ? 600 : 500
//                       }} 
//                     />
//                   </ListItem>
//                 </List>
//               </Collapse>

//               {/* Fournisseur */}
//               <ListItem
//                 button
//                 sx={{ 
//                   pl: 4,
//                   borderRadius: '6px',
//                   cursor: 'pointer', 

//                   '&:hover': { backgroundColor: '#F8FAFC' },
//                   ...(activePage === 'fournisseur' && {
//                     backgroundColor: '#FEF2F2',
//                     '& .MuiListItemIcon-root': { color: '#DC2626' },
//                     '& .MuiListItemText-primary': { color: '#B91C1C', fontWeight: 600 }
//                   })
//                 }}
//                 onClick={() => setActivePage('fournisseur')}
//                 selected={activePage === 'fournisseur'}
//               >
//                 <ListItemIcon>
//                   <PrecisionManufacturingIcon sx={{ 
//                     fontSize: 20,
//                     color: activePage === 'fournisseur' ? '#DC2626' : '#9CA3AF' 
//                   }} />
//                 </ListItemIcon>
//                 <ListItemText 
//                   primary="Fournisseurs" 
//                   primaryTypographyProps={{ 
//                     fontSize: '0.85rem',
//                     fontWeight: activePage === 'fournisseur' ? 600 : 500
//                   }} 
//                 />
//               </ListItem>


//               {/* Admin Section - Only show for admin users */}
//               {user?.role === 'ADMIN' && (
//                 <>
//                   <Divider sx={{ my: 2, mx: 1 }} />
                  
//                   <ListItem 
//                     button 
//                     selected={activePage === 'user-management'} 
//                     onClick={() => setActivePage('user-management')}
//                     sx={{
//                       cursor: 'pointer',
//                       '&.Mui-selected': {
//                         backgroundColor: '#F3E5F5',
//                         borderLeft: '3px solid #9C27B0',
//                         '& .MuiListItemIcon-root': { color: '#9C27B0' },
//                         '& .MuiListItemText-primary': { color: '#7B1FA2', fontWeight: 600 }
//                       },
//                       '&:hover': {
//                         backgroundColor: '#F8FAFC',
//                       }
//                     }}
//                   >
//                     <ListItemIcon>
//                       <SupervisorAccountIcon sx={{ color: activePage === 'user-management' ? '#9C27B0' : '#6B7280' }} />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary="Gestion Utilisateurs" 
//                       primaryTypographyProps={{ 
//                         fontWeight: activePage === 'user-management' ? 600 : 500,
//                         fontSize: '0.9rem'
//                       }} 
//                     />
//                   </ListItem>
//                 </>
//               )}




//             </List>
//           </Collapse>
//         </List>

//         {/* Logout Section */}
//         <Box sx={{ p: 2, borderTop: '1px solid #E5E7EB' }}>
//           <ListItem
//             component="div"
//             onClick={handleLogout}
//             sx={{ 
//               cursor: 'pointer', 
//               borderRadius: '8px',
//               '&:hover': { 
//                 backgroundColor: '#FEF2F2',
//                 '& .MuiListItemIcon-root': { color: '#EF4444' },
//                 '& .MuiListItemText-primary': { color: '#DC2626' }
//               },
//               transition: 'all 0.2s ease-in-out'
//             }}
//           >
//             <ListItemIcon>
//               <LogoutIcon sx={{ color: '#6B7280' }} />
//             </ListItemIcon>
//             <ListItemText 
//               primary="Déconnexion" 
//               primaryTypographyProps={{ 
//                 fontSize: '0.9rem',
//                 fontWeight: 500
//               }} 
//             />
//           </ListItem>
//         </Box>
//       </Drawer>

//       {/* Main content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#F9FAFB' }}>
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
// //   Box, CssBaseline, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
// //   ListItemText, Collapse, Divider
// // } from '@mui/material';

// // // Professional MUI Icons for Optical Industry
// // import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// // import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// // import InventoryIcon from '@mui/icons-material/Inventory';
// // import VisibilityIcon from '@mui/icons-material/Visibility';
// // import ContactLensIcon from '@mui/icons-material/Lens';
// // import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
// // import HandymanIcon from '@mui/icons-material/Handyman';
// // import BusinessIcon from '@mui/icons-material/Business';
// // import PersonIcon from '@mui/icons-material/Person';
// // import StoreIcon from '@mui/icons-material/Store';
// // import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
// // import ExpandLess from '@mui/icons-material/ExpandLess';
// // import ExpandMore from '@mui/icons-material/ExpandMore';
// // import LogoutIcon from '@mui/icons-material/Logout';
// // import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// // import Monture from '../components/Products/Monture/Monture';
// // import Lentille from '../components/Products/Lentille/Lentille';
// // import Home from './Home';
// // import Verre from '../components/Products/Verre/Verre';
// // import Accessoire from '../components/Products/Accessoire/Accessoire';
// // import Magasin from '../components/Organization/Client/Magasin/Magasin';
// // import Particulier from '../components/Organization/Client/Particulier/Particulier';
// // import Vente from '../components/Vente/Vente';
// // import NewVente from '../components/Vente/NewVente';

// // import { useAuth } from '../context/authContext';
// // import { useNavigate } from 'react-router-dom';

// // const drawerWidth = 280;

// // function Layout() {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const [activePage, setActivePage] = useState('home');
// //   const [openProduits, setOpenProduits] = useState(true);
// //   const [openOrganization, setOpenOrganization] = useState(false);
// //   const [openClient, setOpenClient] = useState(false);

// //   console.log({ Monture, Lentille, Verre, Accessoire, Home, Magasin, Particulier, Vente, NewVente });

// //   const handleLogout = () => {
// //     logout();
// //     navigate('/login');
// //   };

// //   const renderContent = () => {
// //     switch (activePage) {
// //       case 'home':
// //         return <Home />;
// //       case 'monture':
// //         return <Monture />;
// //       case 'lentilles':
// //         return <Lentille />;
// //       case 'verre':
// //         return <Verre />;
// //       case 'accessoire':
// //         return <Accessoire />;
// //       case 'magasin':
// //         return <Magasin />;
// //       case 'particulier':
// //         return <Particulier />;
// //       case 'vente':
// //         return <Vente setActivePage={setActivePage} />;
// //       case 'new-vente':
// //         return <NewVente setActivePage={setActivePage} />;
// //       default:
// //         return <Home />;
// //     }
// //   };

// //   return (
// //     <Box sx={{ display: 'flex', backgroundColor: '#F9FAFB' }}>
// //       <CssBaseline />
// //       <Drawer
// //         variant="permanent"
// //         sx={{
// //           width: drawerWidth,
// //           flexShrink: 0,
// //           [`& .MuiDrawer-paper`]: {
// //             width: drawerWidth,
// //             boxSizing: 'border-box',
// //             backgroundColor: '#FFFFFF',
// //             borderRight: '1px solid #E5E7EB',
// //             boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
// //           },
// //         }}
// //       >
// //         {/* User Profile Section */}
// //         <Box sx={{ 
// //           p: 3, 
// //           borderBottom: '1px solid #E5E7EB',
// //           backgroundColor: '#F8FAFC'
// //         }}>
// //           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// //             <AccountCircleIcon sx={{ mr: 2, color: '#6B7280', fontSize: 32 }} />
// //             <Box>
// //               <Typography variant="subtitle1" fontWeight={600} color="#111827">
// //                 {user?.name || user?.username}
// //               </Typography>
// //               <Typography variant="caption" color="#6B7280">
// //                 {user?.email}
// //               </Typography>
// //             </Box>
// //           </Box>
// //         </Box>

// //         {/* Logo Section */}
// //         <Box sx={{ 
// //           display: 'flex', 
// //           justifyContent: 'center', 
// //           alignItems: 'center', 
// //           py: 3,
// //           borderBottom: '1px solid #F3F4F6'
// //         }}>
// //           <Typography 
// //             variant="h5" 
// //             fontWeight={700} 
// //             color="#1F2937"
// //             sx={{
// //               background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
// //               WebkitBackgroundClip: 'text',
// //               WebkitTextFillColor: 'transparent',
// //               letterSpacing: '0.5px'
// //             }}
// //           >
// //             Optics Manager
// //           </Typography>
// //         </Box>

// //         {/* Navigation Menu */}
// //         <List sx={{ 
// //           flex: 1,
// //           px: 2,
// //           py: 1,
// //           '& .MuiListItem-root': {
// //             borderRadius: '8px',
// //             mb: 0.5,
// //             transition: 'all 0.2s ease-in-out',
// //           }
// //         }}>
          
// //           {/* Home */}
// //           <ListItem 
// //             button 
// //             selected={activePage === 'home'} 
// //             onClick={() => setActivePage('home')}
// //             sx={{
// //               '&.Mui-selected': {
// //                 backgroundColor: '#EBF8FF',
// //                 borderLeft: '3px solid #3B82F6',
// //                 '& .MuiListItemIcon-root': { color: '#3B82F6' },
// //                 '& .MuiListItemText-primary': { color: '#1E40AF', fontWeight: 600 }
// //               },
// //               '&:hover': {
// //                 backgroundColor: '#F8FAFC',
// //               }
// //             }}
// //           >
// //             <ListItemIcon>
// //               <HomeRoundedIcon sx={{ color: activePage === 'home' ? '#3B82F6' : '#6B7280' }} />
// //             </ListItemIcon>
// //             <ListItemText 
// //               primary="Accueil" 
// //               primaryTypographyProps={{ 
// //                 fontWeight: activePage === 'home' ? 600 : 500,
// //                 fontSize: '0.9rem'
// //               }} 
// //             />
// //           </ListItem>

// //           {/* Ventes */}
// //           <ListItem 
// //             button 
// //             selected={activePage === 'vente'} 
// //             onClick={() => setActivePage('vente')}
// //             sx={{
// //               '&.Mui-selected': {
// //                 backgroundColor: '#F0FDF4',
// //                 borderLeft: '3px solid #22C55E',
// //                 '& .MuiListItemIcon-root': { color: '#22C55E' },
// //                 '& .MuiListItemText-primary': { color: '#15803D', fontWeight: 600 }
// //               },
// //               '&:hover': {
// //                 backgroundColor: '#F8FAFC',
// //               }
// //             }}
// //           >
// //             <ListItemIcon>
// //               <ReceiptLongIcon sx={{ color: activePage === 'vente' ? '#22C55E' : '#6B7280' }} />
// //             </ListItemIcon>
// //             <ListItemText 
// //               primary="Ventes" 
// //               primaryTypographyProps={{ 
// //                 fontWeight: activePage === 'vente' ? 600 : 500,
// //                 fontSize: '0.9rem'
// //               }} 
// //             />
// //           </ListItem>

// //           <Divider sx={{ my: 2, mx: 1 }} />

// //           {/* Produits Section */}
// //           <ListItem 
// //             button 
// //             onClick={() => setOpenProduits(!openProduits)}
// //             sx={{
// //               '&:hover': { backgroundColor: '#F8FAFC' }
// //             }}
// //           >
// //             <ListItemIcon>
// //               <InventoryIcon sx={{ color: '#8B5CF6' }} />
// //             </ListItemIcon>
// //             <ListItemText 
// //               primary="Produits" 
// //               primaryTypographyProps={{ 
// //                 fontWeight: 600,
// //                 fontSize: '0.9rem',
// //                 color: '#374151'
// //               }} 
// //             />
// //             {openProduits ? <ExpandLess /> : <ExpandMore />}
// //           </ListItem>

// //           <Collapse in={openProduits} timeout="auto" unmountOnExit>
// //             <List component="div" disablePadding sx={{ pl: 1 }}>
              
// //               {/* Monture */}
// //               <ListItem
// //                 button
// //                 sx={{ 
// //                   pl: 4,
// //                   borderRadius: '6px',
// //                   '&:hover': { backgroundColor: '#F8FAFC' },
// //                   ...(activePage === 'monture' && {
// //                     backgroundColor: '#FEF3F2',
// //                     borderLeft: '2px solid #EF4444',
// //                     '& .MuiListItemIcon-root': { color: '#EF4444' },
// //                     '& .MuiListItemText-primary': { color: '#DC2626', fontWeight: 600 }
// //                   })
// //                 }}
// //                 onClick={() => setActivePage('monture')}
// //                 selected={activePage === 'monture'}
// //               >
// //                 <ListItemIcon>
// //                   <VisibilityIcon sx={{ 
// //                     fontSize: 20,
// //                     color: activePage === 'monture' ? '#EF4444' : '#9CA3AF' 
// //                   }} />
// //                 </ListItemIcon>
// //                 <ListItemText 
// //                   primary="Montures" 
// //                   primaryTypographyProps={{ 
// //                     fontSize: '0.85rem',
// //                     fontWeight: activePage === 'monture' ? 600 : 500
// //                   }} 
// //                 />
// //               </ListItem>

// //               {/* Lentilles */}
// //               <ListItem
// //                 button
// //                 sx={{ 
// //                   pl: 4,
// //                   borderRadius: '6px',
// //                   '&:hover': { backgroundColor: '#F8FAFC' },
// //                   ...(activePage === 'lentilles' && {
// //                     backgroundColor: '#FFF7ED',
// //                     borderLeft: '2px solid #F97316',
// //                     '& .MuiListItemIcon-root': { color: '#F97316' },
// //                     '& .MuiListItemText-primary': { color: '#EA580C', fontWeight: 600 }
// //                   })
// //                 }}
// //                 onClick={() => setActivePage('lentilles')}
// //                 selected={activePage === 'lentilles'}
// //               >
// //                 <ListItemIcon>
// //                   <ContactLensIcon sx={{ 
// //                     fontSize: 20,
// //                     color: activePage === 'lentilles' ? '#F97316' : '#9CA3AF' 
// //                   }} />
// //                 </ListItemIcon>
// //                 <ListItemText 
// //                   primary="Lentilles" 
// //                   primaryTypographyProps={{ 
// //                     fontSize: '0.85rem',
// //                     fontWeight: activePage === 'lentilles' ? 600 : 500
// //                   }} 
// //                 />
// //               </ListItem>

// //               {/* Verre */}
// //               <ListItem
// //                 button
// //                 sx={{ 
// //                   pl: 4,
// //                   borderRadius: '6px',
// //                   '&:hover': { backgroundColor: '#F8FAFC' },
// //                   ...(activePage === 'verre' && {
// //                     backgroundColor: '#F0F9FF',
// //                     borderLeft: '2px solid #0EA5E9',
// //                     '& .MuiListItemIcon-root': { color: '#0EA5E9' },
// //                     '& .MuiListItemText-primary': { color: '#0284C7', fontWeight: 600 }
// //                   })
// //                 }}
// //                 onClick={() => setActivePage('verre')}
// //                 selected={activePage === 'verre'}
// //               >
// //                 <ListItemIcon>
// //                   <AutoFixHighIcon sx={{ 
// //                     fontSize: 20,
// //                     color: activePage === 'verre' ? '#0EA5E9' : '#9CA3AF' 
// //                   }} />
// //                 </ListItemIcon>
// //                 <ListItemText 
// //                   primary="Verres" 
// //                   primaryTypographyProps={{ 
// //                     fontSize: '0.85rem',
// //                     fontWeight: activePage === 'verre' ? 600 : 500
// //                   }} 
// //                 />
// //               </ListItem>

// //               {/* Accessoire */}
// //               <ListItem
// //                 button
// //                 sx={{ 
// //                   pl: 4,
// //                   borderRadius: '6px',
// //                   '&:hover': { backgroundColor: '#F8FAFC' },
// //                   ...(activePage === 'accessoire' && {
// //                     backgroundColor: '#FEFCE8',
// //                     borderLeft: '2px solid #EAB308',
// //                     '& .MuiListItemIcon-root': { color: '#EAB308' },
// //                     '& .MuiListItemText-primary': { color: '#CA8A04', fontWeight: 600 }
// //                   })
// //                 }}
// //                 onClick={() => setActivePage('accessoire')}
// //                 selected={activePage === 'accessoire'}
// //               >
// //                 <ListItemIcon>
// //                   <HandymanIcon sx={{ 
// //                     fontSize: 20,
// //                     color: activePage === 'accessoire' ? '#EAB308' : '#9CA3AF' 
// //                   }} />
// //                 </ListItemIcon>
// //                 <ListItemText 
// //                   primary="Accessoires" 
// //                   primaryTypographyProps={{ 
// //                     fontSize: '0.85rem',
// //                     fontWeight: activePage === 'accessoire' ? 600 : 500
// //                   }} 
// //                 />
// //               </ListItem>
// //             </List>
// //           </Collapse>

// //           <Divider sx={{ my: 2, mx: 1 }} />

// //           {/* Organization Section */}
// //           <ListItem 
// //             button 
// //             onClick={() => setOpenOrganization(!openOrganization)}
// //             sx={{
// //               '&:hover': { backgroundColor: '#F8FAFC' }
// //             }}
// //           >
// //             <ListItemIcon>
// //               <BusinessIcon sx={{ color: '#EC4899' }} />
// //             </ListItemIcon>
// //             <ListItemText 
// //               primary="Organisation" 
// //               primaryTypographyProps={{ 
// //                 fontWeight: 600,
// //                 fontSize: '0.9rem',
// //                 color: '#374151'
// //               }} 
// //             />
// //             {openOrganization ? <ExpandLess /> : <ExpandMore />}
// //           </ListItem>

// //           <Collapse in={openOrganization} timeout="auto" unmountOnExit>
// //             <List component="div" disablePadding sx={{ pl: 1 }}>
              
// //               {/* Client Submenu */}
// //               <ListItem 
// //                 button 
// //                 sx={{ pl: 4 }} 
// //                 onClick={() => setOpenClient(!openClient)}
// //               >
// //                 <ListItemIcon>
// //                   <PersonIcon sx={{ color: '#6366F1', fontSize: 20 }} />
// //                 </ListItemIcon>
// //                 <ListItemText 
// //                   primary="Clients" 
// //                   primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} 
// //                 />
// //                 {openClient ? <ExpandLess /> : <ExpandMore />}
// //               </ListItem>

// //               <Collapse in={openClient} timeout="auto" unmountOnExit>
// //                 <List component="div" disablePadding>
                  
// //                   {/* Magasin */}
// //                   <ListItem
// //                     button
// //                     sx={{ 
// //                       pl: 6,
// //                       borderRadius: '6px',
// //                       '&:hover': { backgroundColor: '#F8FAFC' },
// //                       ...(activePage === 'magasin' && {
// //                         backgroundColor: '#F0FDF4',
// //                         '& .MuiListItemIcon-root': { color: '#059669' },
// //                         '& .MuiListItemText-primary': { color: '#047857', fontWeight: 600 }
// //                       })
// //                     }}
// //                     onClick={() => setActivePage('magasin')}
// //                     selected={activePage === 'magasin'}
// //                   >
// //                     <ListItemIcon>
// //                       <StoreIcon sx={{ 
// //                         fontSize: 18,
// //                         color: activePage === 'magasin' ? '#059669' : '#9CA3AF' 
// //                       }} />
// //                     </ListItemIcon>
// //                     <ListItemText 
// //                       primary="Magasins" 
// //                       primaryTypographyProps={{ 
// //                         fontSize: '0.8rem',
// //                         fontWeight: activePage === 'magasin' ? 600 : 500
// //                       }} 
// //                     />
// //                   </ListItem>

// //                   {/* Particulier */}
// //                   <ListItem
// //                     button
// //                     sx={{ 
// //                       pl: 6,
// //                       borderRadius: '6px',
// //                       '&:hover': { backgroundColor: '#F8FAFC' },
// //                       ...(activePage === 'particulier' && {
// //                         backgroundColor: '#F5F3FF',
// //                         '& .MuiListItemIcon-root': { color: '#7C3AED' },
// //                         '& .MuiListItemText-primary': { color: '#6D28D9', fontWeight: 600 }
// //                       })
// //                     }}
// //                     onClick={() => setActivePage('particulier')}
// //                     selected={activePage === 'particulier'}
// //                   >
// //                     <ListItemIcon>
// //                       <PersonIcon sx={{ 
// //                         fontSize: 18,
// //                         color: activePage === 'particulier' ? '#7C3AED' : '#9CA3AF' 
// //                       }} />
// //                     </ListItemIcon>
// //                     <ListItemText 
// //                       primary="Particuliers" 
// //                       primaryTypographyProps={{ 
// //                         fontSize: '0.8rem',
// //                         fontWeight: activePage === 'particulier' ? 600 : 500
// //                       }} 
// //                     />
// //                   </ListItem>
// //                 </List>
// //               </Collapse>

// //               {/* Fournisseur */}
// //               <ListItem
// //                 button
// //                 sx={{ 
// //                   pl: 4,
// //                   borderRadius: '6px',
// //                   '&:hover': { backgroundColor: '#F8FAFC' },
// //                   ...(activePage === 'fournisseur' && {
// //                     backgroundColor: '#FEF2F2',
// //                     '& .MuiListItemIcon-root': { color: '#DC2626' },
// //                     '& .MuiListItemText-primary': { color: '#B91C1C', fontWeight: 600 }
// //                   })
// //                 }}
// //                 onClick={() => setActivePage('fournisseur')}
// //                 selected={activePage === 'fournisseur'}
// //               >
// //                 <ListItemIcon>
// //                   <PrecisionManufacturingIcon sx={{ 
// //                     fontSize: 20,
// //                     color: activePage === 'fournisseur' ? '#DC2626' : '#9CA3AF' 
// //                   }} />
// //                 </ListItemIcon>
// //                 <ListItemText 
// //                   primary="Fournisseurs" 
// //                   primaryTypographyProps={{ 
// //                     fontSize: '0.85rem',
// //                     fontWeight: activePage === 'fournisseur' ? 600 : 500
// //                   }} 
// //                 />
// //               </ListItem>
// //             </List>
// //           </Collapse>
// //         </List>

// //         {/* Logout Section */}
// //         <Box sx={{ p: 2, borderTop: '1px solid #E5E7EB' }}>
// //           <ListItem
// //             component="div"
// //             onClick={handleLogout}
// //             sx={{ 
// //               cursor: 'pointer', 
// //               borderRadius: '8px',
// //               '&:hover': { 
// //                 backgroundColor: '#FEF2F2',
// //                 '& .MuiListItemIcon-root': { color: '#EF4444' },
// //                 '& .MuiListItemText-primary': { color: '#DC2626' }
// //               },
// //               transition: 'all 0.2s ease-in-out'
// //             }}
// //           >
// //             <ListItemIcon>
// //               <LogoutIcon sx={{ color: '#6B7280' }} />
// //             </ListItemIcon>
// //             <ListItemText 
// //               primary="Déconnexion" 
// //               primaryTypographyProps={{ 
// //                 fontSize: '0.9rem',
// //                 fontWeight: 500
// //               }} 
// //             />
// //           </ListItem>
// //         </Box>
// //       </Drawer>

// //       {/* Main content */}
// //       <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#F9FAFB' }}>
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








// // // import { useState } from 'react';
// // // import {
// // //   Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
// // //   ListItemText, Collapse
// // // } from '@mui/material';
// // // import DashboardIcon from '@mui/icons-material/Dashboard';
// // // import GlassesIcon from '@mui/icons-material/Visibility';
// // // import ExpandLess from '@mui/icons-material/ExpandLess';
// // // import ExpandMore from '@mui/icons-material/ExpandMore';
// // // import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// // // import CategoryIcon from '@mui/icons-material/CategoryRounded';
// // // import LensIcon from '@mui/icons-material/VisibilityRounded';
// // // import PeopleIcon from '@mui/icons-material/People';
// // // import StoreIcon from '@mui/icons-material/Store';
// // // import PersonIcon from '@mui/icons-material/Person';
// // // import BusinessIcon from '@mui/icons-material/Business';
// // // import ReceiptIcon from '@mui/icons-material/Receipt';
// // // import BuildIcon from '@mui/icons-material/Build'; // ✅ ADD ICON FOR ACCESSOIRE


// // // import Monture from '../components/Products/Monture/Monture';
// // // import Lentille from '../components/Products/Lentille/Lentille';
// // // import Home from './Home';
// // // import Verre from '../components/Products/Verre/Verre';
// // // import Accessoire from '../components/Products/Accessoire/Accessoire'; // ✅ ADD THIS IMPORT
// // // import Magasin from '../components/Organization/Client/Magasin/Magasin';
// // // import Particulier from '../components/Organization/Client/Particulier/Particulier'; // ✅ ADD THIS IMPORT
// // // import Vente from '../components/Vente/Vente';
// // // import NewVente from '../components/Vente/NewVente'; // ✅ NEW COMPONENT

// // // import { useAuth } from '../context/authContext';
// // // import { useNavigate } from 'react-router-dom';
// // // import LogoutIcon from '@mui/icons-material/Logout';
// // // import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// // // const drawerWidth = 280;

// // // function Layout() {
// // //   const { user, logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const [activePage, setActivePage] = useState('home');
// // //   const [openProduits, setOpenProduits] = useState(true);
// // //   const [openOrganization, setOpenOrganization] = useState(false);
// // //   const [openClient, setOpenClient] = useState(false);

// // //   console.log({ Monture, Lentille, Verre, Accessoire, Home, Magasin, Particulier, Vente, NewVente });

// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate('/login');
// // //   };

// // //   const renderContent = () => {
// // //     switch (activePage) {
// // //       case 'home':
// // //         return <Home />;
// // //       case 'monture':
// // //         return <Monture />;
// // //       case 'lentilles':
// // //         return <Lentille />;
// // //       case 'verre':
// // //         return <Verre />;
// // //       case 'accessoire': // ✅ ADD THIS CASE
// // //         return <Accessoire />;
// // //       case 'magasin':
// // //         return <Magasin />;
// // //       case 'particulier':
// // //         return <Particulier />;
// // //       case 'vente':
// // //         return <Vente setActivePage={setActivePage} />; // ✅ Pass setActivePage to allow navigation
// // //       case 'new-vente': // ✅ NEW CASE
// // //         return <NewVente setActivePage={setActivePage} />;
// // //       default:
// // //         return <Home />;
// // //     }
// // //   };

// // //   return (
// // //     <Box sx={{ display: 'flex', backgroundColor: '#F9FAFB' }}>
// // //       <CssBaseline />
// // //       <Drawer
// // //         variant="permanent"
// // //         sx={{
// // //           width: drawerWidth,
// // //           flexShrink: 0,
// // //           [`& .MuiDrawer-paper`]: {
// // //             width: drawerWidth,
// // //             boxSizing: 'border-box',
// // //             backgroundColor: '#F9FAFB',
// // //           },
// // //         }}
// // //       >
// // //         {/* Add user info at the top */}
// // //         <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
// // //           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // //             <AccountCircleIcon sx={{ mr: 1, color: 'grey.600' }} />
// // //             <Typography variant="subtitle1" noWrap>
// // //               {user?.name || user?.username}
// // //             </Typography>
// // //           </Box>
// // //           <Typography variant="body2" color="text.secondary" noWrap>
// // //             {user?.email}
// // //           </Typography>
// // //         </Box>

// // //         <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB !important', borderRadius: 2, height: 60, width: 250, px: 2, mt: 10, mx: 'auto' }}>
// // //           <Typography variant="h6" noWrap component="div">
// // //             Optics Manager
// // //           </Typography>
// // //         </Toolbar>

// // //         <Toolbar />

// // //         <List sx={{         
// // //           fontSize: '0.875rem',
// // //           lineHeight: '1.5rem',
// // //           fontWeight: 600,
// // //           color: '#637381',
// // //           borderBottom: '1px solid var(--palette-TableCell-border)',
// // //           textAlign: 'left',
// // //           padding: '16px',
// // //           }}>
// // //           <ListItem button selected={activePage === 'home'} onClick={() => setActivePage('home')} >
// // //             <ListItemIcon>
// // //               <HomeRoundedIcon sx={{ color: 'grey.500' }} />
// // //             </ListItemIcon>
// // //             <ListItemText primary="Home" />
// // //           </ListItem>

// // //           {/* ✅ Ventes Section */}
// // //           <ListItem 
// // //             button 
// // //             selected={activePage === 'vente'} 
// // //             onClick={() => setActivePage('vente')}
// // //           >
// // //             <ListItemIcon>
// // //               <ReceiptIcon sx={{ color: 'grey.500' }} />
// // //             </ListItemIcon>
// // //             <ListItemText primary="Ventes" />
// // //           </ListItem>

// // //           {/* Produits Section */}
// // //           <ListItem button onClick={() => setOpenProduits(!openProduits)}>
// // //             <ListItemIcon><CategoryIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // //             <ListItemText primary="Produits" />
// // //             {openProduits ? <ExpandLess /> : <ExpandMore />}
// // //           </ListItem>

// // //           <Collapse in={openProduits} timeout="auto" unmountOnExit>
// // //             <List component="div" disablePadding>
// // //               <ListItem
// // //                 button
// // //                 sx={{ pl: 4 }}
// // //                 onClick={() => setActivePage('monture')}
// // //                 selected={activePage === 'monture'}
// // //               >
// // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // //                 <ListItemText primary="Monture" />
// // //               </ListItem>

// // //               <ListItem
// // //                 button
// // //                 sx={{ pl: 4 }}
// // //                 onClick={() => setActivePage('lentilles')}
// // //                 selected={activePage === 'lentilles'}
// // //               >
// // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // //                 <ListItemText primary="Lentilles" />
// // //               </ListItem>

// // //               <ListItem
// // //                 button
// // //                 sx={{ pl: 4 }}
// // //                 onClick={() => setActivePage('verre')}
// // //                 selected={activePage === 'verre'}
// // //               >
// // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // //                 <ListItemText primary="Verre" />
// // //               </ListItem>
// // //             </List>

// // //             {/* ✅ ADD ACCESSOIRE MENU ITEM */}
// // //               <ListItem
// // //                 button
// // //                 sx={{ pl: 4 }}
// // //                 onClick={() => setActivePage('accessoire')}
// // //                 selected={activePage === 'accessoire'}
// // //               >
// // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // //                 <ListItemText primary="Accessoire" />
// // //               </ListItem>
  
// // //           </Collapse>

// // //           {/* ✅ Organization Section */}
// // //           <ListItem button onClick={() => setOpenOrganization(!openOrganization)}>
// // //             <ListItemIcon><PeopleIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // //             <ListItemText primary="Organization" />
// // //             {openOrganization ? <ExpandLess /> : <ExpandMore />}
// // //           </ListItem>

// // //           <Collapse in={openOrganization} timeout="auto" unmountOnExit>
// // //             <List component="div" disablePadding>
// // //               {/* ✅ Client */}
// // //               <ListItem button sx={{ pl: 4 }} onClick={() => setOpenClient(!openClient)}>
// // //                 <ListItemIcon><PersonIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // //                 <ListItemText primary="Client" />
// // //                 {openClient ? <ExpandLess /> : <ExpandMore />}
// // //               </ListItem>

// // //               <Collapse in={openClient} timeout="auto" unmountOnExit>
// // //                 <List component="div" disablePadding>
// // //                   {/* ✅ Magasin under Client */}
// // //                   <ListItem
// // //                     button
// // //                     sx={{ pl: 6 }}
// // //                     onClick={() => setActivePage('magasin')}
// // //                     selected={activePage === 'magasin'}
// // //                   >
// // //                     <ListItemIcon><StoreIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // //                     <ListItemText primary="Magasin" />
// // //                   </ListItem>

// // //                   {/* ✅ Particulier under Client */}
// // //                   <ListItem
// // //                     button
// // //                     sx={{ pl: 6 }}
// // //                     onClick={() => setActivePage('particulier')}
// // //                     selected={activePage === 'particulier'}
// // //                   >
// // //                     <ListItemIcon><PersonIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // //                     <ListItemText primary="Particulier" />
// // //                   </ListItem>
// // //                 </List>
// // //               </Collapse>

// // //               {/* ✅ Fournisseur */}
// // //               <ListItem
// // //                 button
// // //                 sx={{ pl: 4 }}
// // //                 onClick={() => setActivePage('fournisseur')}
// // //                 selected={activePage === 'fournisseur'}
// // //               >
// // //                 <ListItemIcon><BusinessIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // //                 <ListItemText primary="Fournisseur" />
// // //               </ListItem>
// // //             </List>
// // //           </Collapse>
// // //         </List>

// // //           {/* Add logout at the bottom */}
// // //         <Box sx={{ mt: 'auto', p: 2 }}>
// // //           <ListItem
// // //             component="div"
// // //             onClick={handleLogout}
// // //             sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
// // //           >
// // //             <ListItemIcon>
// // //               <LogoutIcon sx={{ color: 'grey.500' }} />
// // //             </ListItemIcon>
// // //             <ListItemText primary="Déconnexion" />
// // //           </ListItem>
// // //         </Box>

// // //       </Drawer>

// // //       {/* Main content */}
// // //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// // //         <Toolbar />
// // //         {renderContent()}
// // //         <Box mt={5} textAlign="center">
// // //           <Typography variant="body2" color="text.secondary">
// // //             © 2023 Optics Manager
// // //           </Typography>
// // //         </Box>
// // //       </Box>
// // //     </Box>
// // //   );
// // // }

// // // export default Layout;



// // // // import { useState } from 'react';
// // // // import {
// // // //   Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
// // // //   ListItemText, Collapse
// // // // } from '@mui/material';
// // // // import DashboardIcon from '@mui/icons-material/Dashboard';
// // // // import GlassesIcon from '@mui/icons-material/Visibility';
// // // // import ExpandLess from '@mui/icons-material/ExpandLess';
// // // // import ExpandMore from '@mui/icons-material/ExpandMore';
// // // // import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// // // // import CategoryIcon from '@mui/icons-material/CategoryRounded';
// // // // import LensIcon from '@mui/icons-material/VisibilityRounded';
// // // // import PeopleIcon from '@mui/icons-material/People';
// // // // import StoreIcon from '@mui/icons-material/Store';
// // // // import PersonIcon from '@mui/icons-material/Person';
// // // // import BusinessIcon from '@mui/icons-material/Business';
// // // // import ReceiptIcon from '@mui/icons-material/Receipt';

// // // // import Monture from '../components/Products/Monture/Monture';
// // // // import Lentille from '../components/Products/Lentille/Lentille';
// // // // import Home from './Home';
// // // // import Verre from '../components/Products/Verre/Verre';
// // // // import Magasin from '../components/Organization/Client/Magasin/Magasin';
// // // // import Vente from '../components/Vente/Vente'; // ✅ AJOUT

// // // // import { useAuth } from '../context/authContext';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import LogoutIcon from '@mui/icons-material/Logout';
// // // // import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// // // // const drawerWidth = 280;

// // // // function Layout() {
// // // //   const { user, logout } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const [activePage, setActivePage] = useState('home');
// // // //   const [openProduits, setOpenProduits] = useState(true);
// // // //   const [openOrganization, setOpenOrganization] = useState(false);
// // // //   const [openClient, setOpenClient] = useState(false);

// // // //   console.log({ Monture, Lentille, Verre, Home, Magasin, Vente }); // ✅ AJOUT Vente

// // // //   const handleLogout = () => {
// // // //     logout();
// // // //     navigate('/login');
// // // //   };

// // // //   const renderContent = () => {
// // // //     switch (activePage) {
// // // //       case 'home':
// // // //         return <Home />;
// // // //       case 'monture':
// // // //         return <Monture />;
// // // //       case 'lentilles':
// // // //         return <Lentille />;
// // // //       case 'verre':
// // // //         return <Verre />;
// // // //       case 'magasin':
// // // //         return <Magasin />;
// // // //       case 'vente':  // ✅ AJOUT
// // // //         return <Vente />;
// // // //       default:
// // // //         return <Home />;
// // // //     }
// // // //   };

// // // //   return (
// // // //     <Box sx={{ display: 'flex', backgroundColor: '#F9FAFB' }}>
// // // //       <CssBaseline />
// // // //       <Drawer
// // // //         variant="permanent"
// // // //         sx={{
// // // //           width: drawerWidth,
// // // //           flexShrink: 0,
// // // //           [`& .MuiDrawer-paper`]: {
// // // //             width: drawerWidth,
// // // //             boxSizing: 'border-box',
// // // //             backgroundColor: '#F9FAFB',
// // // //           },
// // // //         }}
// // // //       >
// // // //         {/* Add user info at the top */}
// // // //         <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
// // // //           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // //             <AccountCircleIcon sx={{ mr: 1, color: 'grey.600' }} />
// // // //             <Typography variant="subtitle1" noWrap>
// // // //               {user?.name || user?.username}
// // // //             </Typography>
// // // //           </Box>
// // // //           <Typography variant="body2" color="text.secondary" noWrap>
// // // //             {user?.email}
// // // //           </Typography>
// // // //         </Box>

// // // //         <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB !important', borderRadius: 2, height: 60, width: 250, px: 2, mt: 10, mx: 'auto' }}>
// // // //           <Typography variant="h6" noWrap component="div">
// // // //             Optics Manager
// // // //           </Typography>
// // // //         </Toolbar>

// // // //         <Toolbar />

// // // //         <List sx={{         
// // // //           fontSize: '0.875rem',
// // // //           lineHeight: '1.5rem',
// // // //           fontWeight: 600,
// // // //           color: '#637381',
// // // //           borderBottom: '1px solid var(--palette-TableCell-border)',
// // // //           textAlign: 'left',
// // // //           padding: '16px',
// // // //           }}>
// // // //           <ListItem button selected={activePage === 'home'} onClick={() => setActivePage('home')} >
// // // //             <ListItemIcon>
// // // //               <HomeRoundedIcon sx={{ color: 'grey.500' }} />
// // // //             </ListItemIcon>
// // // //             <ListItemText primary="Home" />
// // // //           </ListItem>

// // // //           {/* ✅ Ventes Section - Add after Home */}
// // // //           <ListItem 
// // // //             button 
// // // //             selected={activePage === 'vente'} 
// // // //             onClick={() => setActivePage('vente')}
// // // //           >
// // // //             <ListItemIcon>
// // // //               <ReceiptIcon sx={{ color: 'grey.500' }} />
// // // //             </ListItemIcon>
// // // //             <ListItemText primary="Ventes" />
// // // //           </ListItem>

// // // //           {/* Produits Section */}
// // // //           <ListItem button onClick={() => setOpenProduits(!openProduits)}>
// // // //             <ListItemIcon><CategoryIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
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
// // // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // //                 <ListItemText primary="Monture" />
// // // //               </ListItem>

// // // //               <ListItem
// // // //                 button
// // // //                 sx={{ pl: 4 }}
// // // //                 onClick={() => setActivePage('lentilles')}
// // // //                 selected={activePage === 'lentilles'}
// // // //               >
// // // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // //                 <ListItemText primary="Lentilles" />
// // // //               </ListItem>

// // // //               <ListItem
// // // //                 button
// // // //                 sx={{ pl: 4 }}
// // // //                 onClick={() => setActivePage('verre')}
// // // //                 selected={activePage === 'verre'}
// // // //               >
// // // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // //                 <ListItemText primary="Verre" />
// // // //               </ListItem>
// // // //             </List>
// // // //           </Collapse>

// // // //           {/* ✅ Organization Section */}
// // // //           <ListItem button onClick={() => setOpenOrganization(!openOrganization)}>
// // // //             <ListItemIcon><PeopleIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // //             <ListItemText primary="Organization" />
// // // //             {openOrganization ? <ExpandLess /> : <ExpandMore />}
// // // //           </ListItem>

// // // //           <Collapse in={openOrganization} timeout="auto" unmountOnExit>
// // // //             <List component="div" disablePadding>
// // // //               {/* ✅ Client */}
// // // //               <ListItem button sx={{ pl: 4 }} onClick={() => setOpenClient(!openClient)}>
// // // //                 <ListItemIcon><PersonIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // //                 <ListItemText primary="Client" />
// // // //                 {openClient ? <ExpandLess /> : <ExpandMore />}
// // // //               </ListItem>

// // // //               <Collapse in={openClient} timeout="auto" unmountOnExit>
// // // //                 <List component="div" disablePadding>
// // // //                   {/* ✅ Magasin under Client */}
// // // //                   <ListItem
// // // //                     button
// // // //                     sx={{ pl: 6 }}
// // // //                     onClick={() => setActivePage('magasin')}
// // // //                     selected={activePage === 'magasin'}
// // // //                   >
// // // //                     <ListItemIcon><StoreIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // //                     <ListItemText primary="Magasin" />
// // // //                   </ListItem>

// // // //                   {/* ✅ Particulier under Client */}
// // // //                   <ListItem
// // // //                     button
// // // //                     sx={{ pl: 6 }}
// // // //                     onClick={() => setActivePage('particulier')}
// // // //                     selected={activePage === 'particulier'}
// // // //                   >
// // // //                     <ListItemIcon><PersonIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // //                     <ListItemText primary="Particulier" />
// // // //                   </ListItem>
// // // //                 </List>
// // // //               </Collapse>

// // // //               {/* ✅ Fournisseur */}
// // // //               <ListItem
// // // //                 button
// // // //                 sx={{ pl: 4 }}
// // // //                 onClick={() => setActivePage('fournisseur')}
// // // //                 selected={activePage === 'fournisseur'}
// // // //               >
// // // //                 <ListItemIcon><BusinessIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // //                 <ListItemText primary="Fournisseur" />
// // // //               </ListItem>
// // // //             </List>
// // // //           </Collapse>
// // // //         </List>

// // // //           {/* Add logout at the bottom */}
// // // //         <Box sx={{ mt: 'auto', p: 2 }}>
// // // //           <ListItem
// // // //             component="div"
// // // //             onClick={handleLogout}
// // // //             sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
// // // //           >
// // // //             <ListItemIcon>
// // // //               <LogoutIcon sx={{ color: 'grey.500' }} />
// // // //             </ListItemIcon>
// // // //             <ListItemText primary="Déconnexion" />
// // // //           </ListItem>
// // // //         </Box>

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

// // // // export default Layout;



// // // // // import { useState } from 'react';
// // // // // import {
// // // // //   Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
// // // // //   ListItemText, Collapse
// // // // // } from '@mui/material';
// // // // // import DashboardIcon from '@mui/icons-material/Dashboard';
// // // // // import GlassesIcon from '@mui/icons-material/Visibility';
// // // // // import ExpandLess from '@mui/icons-material/ExpandLess';
// // // // // import ExpandMore from '@mui/icons-material/ExpandMore';
// // // // // import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// // // // // import CategoryIcon from '@mui/icons-material/CategoryRounded';
// // // // // import LensIcon from '@mui/icons-material/VisibilityRounded';
// // // // // import PeopleIcon from '@mui/icons-material/People'; // Added for Organization
// // // // // import StoreIcon from '@mui/icons-material/Store';   // Icon for magasin
// // // // // import PersonIcon from '@mui/icons-material/Person'; // Icon for particulier
// // // // // import BusinessIcon from '@mui/icons-material/Business'; // Icon for fournisseur
// // // // // import ReceiptIcon from '@mui/icons-material/Receipt'; // ✅ Add icon for Ventes


// // // // // import Monture from '../components/Products/Monture/Monture';
// // // // // import Lentille from '../components/Products/Lentille/Lentille';
// // // // // import Home from './Home';
// // // // // import Verre from '../components/Products/Verre/Verre';

// // // // // // ✅ Import Magasin component
// // // // // // import Magasin from '../components/Organization/Magasin/Magasin';
// // // // // import Magasin from '../components/Organization/Client/Magasin/Magasin';
// // // // // // import Vente from '../components/Vente/Vente';
// // // // // // import NewVente from '../components/Vente/NewVente';



// // // // // import { useAuth } from '../context/authContext';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import LogoutIcon from '@mui/icons-material/Logout';
// // // // // import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// // // // // const drawerWidth = 280;

// // // // // function Layout() {

// // // // //   const { user, logout } = useAuth();
// // // // //   const navigate = useNavigate();

// // // // //   const [activePage, setActivePage] = useState('home');
// // // // //   const [openProduits, setOpenProduits] = useState(true);
// // // // //   // ✅ New state for Organization and Client collapsibles
// // // // //   const [openOrganization, setOpenOrganization] = useState(false);
// // // // //   const [openClient, setOpenClient] = useState(false);

// // // // //   console.log({ Monture, Lentille, Verre, Home, Magasin });


// // // // //   const handleLogout = () => {
// // // // //     logout();
// // // // //     navigate('/login');
// // // // //   };

// // // // //   const renderContent = () => {
// // // // //     switch (activePage) {
// // // // //       case 'home':
// // // // //         return <Home />;
// // // // //       case 'monture':
// // // // //         return <Monture />;
// // // // //       case 'lentilles':
// // // // //         return <Lentille />;
// // // // //       case 'verre':
// // // // //         return <Verre />;
// // // // //       // ✅ Add Magasin rendering
// // // // //       case 'magasin':
// // // // //         return <Magasin />;
// // // // //       // Dans renderContent():
// // // // //       // case 'vente':
// // // // //       //   return <Vente setActivePage={setActivePage} />;
// // // // //       // case 'new-vente':
// // // // //       //   return <NewVente setActivePage={setActivePage} />;
// // // // //       // case 'vente':
// // // // //       //   return <Vente setActivePage={setActivePage} />; // Pass setActivePage
// // // // //       // case 'new-vente':
// // // // //       //   return <NewVente setActivePage={setActivePage} />;
// // // // //       // case 'vente':  // ✅ Add vente case
// // // // //       //   return <Vente />;
// // // // //       // // In Layout.jsx, add to renderContent():
// // // // //       // case 'new-vente':
// // // // //       //   return <NewVente />;
// // // // //       default:
// // // // //         return <Home />;
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <Box sx={{ display: 'flex', backgroundColor: '#F9FAFB' /* <-- Set background color here */ }}>
// // // // //       <CssBaseline />
// // // // //       <Drawer
// // // // //         variant="permanent"
// // // // //         sx={{
// // // // //           width: drawerWidth,
// // // // //           flexShrink: 0,
// // // // //           [`& .MuiDrawer-paper`]: {
// // // // //             width: drawerWidth,
// // // // //             boxSizing: 'border-box',
// // // // //             backgroundColor: '#F9FAFB',  // add this line
// // // // //           },
// // // // //         }}
// // // // //       >
// // // // //       {/* <Drawer
// // // // //         variant="permanent"
// // // // //         sx={{
// // // // //           width: drawerWidth,
// // // // //           backgroundColor: '#F9FAFB !important',
// // // // //           flexShrink: 0,
// // // // //           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
// // // // //         }}
// // // // //       > */}



// // // // //         {/* Add user info at the top */}
// // // // //         <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
// // // // //           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // // //             <AccountCircleIcon sx={{ mr: 1, color: 'grey.600' }} />
// // // // //             <Typography variant="subtitle1" noWrap>
// // // // //               {user?.name || user?.username}
// // // // //             </Typography>
// // // // //           </Box>
// // // // //           <Typography variant="body2" color="text.secondary" noWrap>
// // // // //             {user?.email}
// // // // //           </Typography>
// // // // //         </Box>

// // // // //         <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB !important', borderRadius: 2, height: 60, width: 250, px: 2, mt: 10, mx: 'auto' }}>
// // // // //           <Typography variant="h6" noWrap component="div">
// // // // //             Optics Manager
// // // // //           </Typography>
// // // // //         </Toolbar>

// // // // //         <Toolbar />

// // // // //         <List sx={{         
// // // // //           fontSize: '0.875rem',
// // // // //           lineHeight: '1.5rem',
// // // // //           fontWeight: 600,
// // // // //           color: '#637381',
// // // // //           // backgroundColor: '#F4F6F8',
// // // // //           borderBottom: '1px solid var(--palette-TableCell-border)',
// // // // //           textAlign: 'left',
// // // // //           padding: '16px',
// // // // //           }}>
// // // // //           <ListItem button selected={activePage === 'home'} onClick={() => setActivePage('home')} >
// // // // //             <ListItemIcon>
// // // // //               <HomeRoundedIcon sx={{ color: 'grey.500' }} />
// // // // //             </ListItemIcon>
// // // // //             <ListItemText primary="Home" />
// // // // //           </ListItem>

// // // // //           {/* ✅ Ventes Section - Add after Home */}
// // // // //           <ListItem 
// // // // //             button 
// // // // //             selected={activePage === 'vente'} 
// // // // //             onClick={() => setActivePage('vente')}
// // // // //           >
// // // // //             <ListItemIcon>
// // // // //               <ReceiptIcon sx={{ color: 'grey.500' }} />
// // // // //             </ListItemIcon>
// // // // //             <ListItemText primary="Ventes" />
// // // // //           </ListItem>

// // // // //           {/* Produits Section */}
// // // // //           <ListItem button onClick={() => setOpenProduits(!openProduits)}>
// // // // //             <ListItemIcon><CategoryIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // //             <ListItemText primary="Produits" />
// // // // //             {openProduits ? <ExpandLess /> : <ExpandMore />}
// // // // //           </ListItem>

// // // // //           <Collapse in={openProduits} timeout="auto" unmountOnExit>
// // // // //             <List component="div" disablePadding>
// // // // //               <ListItem
// // // // //                 button
// // // // //                 sx={{ pl: 4 }}
// // // // //                 onClick={() => setActivePage('monture')}
// // // // //                 selected={activePage === 'monture'}
// // // // //               >
// // // // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // //                 <ListItemText primary="Monture" />
// // // // //               </ListItem>

// // // // //               <ListItem
// // // // //                 button
// // // // //                 sx={{ pl: 4 }}
// // // // //                 onClick={() => setActivePage('lentilles')}
// // // // //                 selected={activePage === 'lentilles'}
// // // // //               >
// // // // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // //                 <ListItemText primary="Lentilles" />
// // // // //               </ListItem>

// // // // //               <ListItem
// // // // //                 button
// // // // //                 sx={{ pl: 4 }}
// // // // //                 onClick={() => setActivePage('verre')}
// // // // //                 selected={activePage === 'verre'}
// // // // //               >
// // // // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // //                 <ListItemText primary="Verre" />
// // // // //               </ListItem>
// // // // //             </List>
// // // // //           </Collapse>

// // // // //           {/* ✅ Organization Section */}
// // // // //           <ListItem button onClick={() => setOpenOrganization(!openOrganization)}>
// // // // //             <ListItemIcon><PeopleIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // //             <ListItemText primary="Organization" />
// // // // //             {openOrganization ? <ExpandLess /> : <ExpandMore />}
// // // // //           </ListItem>

// // // // //           <Collapse in={openOrganization} timeout="auto" unmountOnExit>
// // // // //             <List component="div" disablePadding>
// // // // //               {/* ✅ Client */}
// // // // //               <ListItem button sx={{ pl: 4 }} onClick={() => setOpenClient(!openClient)}>
// // // // //                 <ListItemIcon><PersonIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // //                 <ListItemText primary="Client" />
// // // // //                 {openClient ? <ExpandLess /> : <ExpandMore />}
// // // // //               </ListItem>

// // // // //               <Collapse in={openClient} timeout="auto" unmountOnExit>
// // // // //                 <List component="div" disablePadding>
// // // // //                   {/* ✅ Magasin under Client */}
// // // // //                   <ListItem
// // // // //                     button
// // // // //                     sx={{ pl: 6 }}
// // // // //                     onClick={() => setActivePage('magasin')}
// // // // //                     selected={activePage === 'magasin'}
// // // // //                   >
// // // // //                     <ListItemIcon><StoreIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // //                     <ListItemText primary="Magasin" />
// // // // //                   </ListItem>

// // // // //                   {/* ✅ Particulier under Client */}
// // // // //                   <ListItem
// // // // //                     button
// // // // //                     sx={{ pl: 6 }}
// // // // //                     onClick={() => setActivePage('particulier')}
// // // // //                     selected={activePage === 'particulier'}
// // // // //                   >
// // // // //                     <ListItemIcon><PersonIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // //                     <ListItemText primary="Particulier" />
// // // // //                   </ListItem>
// // // // //                 </List>
// // // // //               </Collapse>

// // // // //               {/* ✅ Fournisseur */}
// // // // //               <ListItem
// // // // //                 button
// // // // //                 sx={{ pl: 4 }}
// // // // //                 onClick={() => setActivePage('fournisseur')}
// // // // //                 selected={activePage === 'fournisseur'}
// // // // //               >
// // // // //                 <ListItemIcon><BusinessIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // //                 <ListItemText primary="Fournisseur" />
// // // // //               </ListItem>
// // // // //             </List>
// // // // //           </Collapse>
// // // // //         </List>

// // // // //           {/* Add logout at the bottom */}
// // // // //         <Box sx={{ mt: 'auto', p: 2 }}>
// // // // //           <ListItem
// // // // //             component="div"
// // // // //             onClick={handleLogout}
// // // // //             sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
// // // // //           >
// // // // //             <ListItemIcon>
// // // // //               <LogoutIcon sx={{ color: 'grey.500' }} />
// // // // //             </ListItemIcon>
// // // // //             <ListItemText primary="Déconnexion" />
// // // // //           </ListItem>
// // // // //         </Box>

// // // // //       </Drawer>

// // // // //       {/* Main content */}
// // // // //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// // // // //         <Toolbar />
// // // // //         {renderContent()}
// // // // //         <Box mt={5} textAlign="center">
// // // // //           <Typography variant="body2" color="text.secondary">
// // // // //             © 2023 Optics Manager
// // // // //           </Typography>
// // // // //         </Box>
// // // // //       </Box>
// // // // //     </Box>
// // // // //   );
// // // // // }

// // // // // export default Layout;


// // // // // // import { useState } from 'react';
// // // // // // import {
// // // // // //   Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
// // // // // //   ListItemText, Collapse
// // // // // // } from '@mui/material';
// // // // // // import DashboardIcon from '@mui/icons-material/Dashboard';
// // // // // // import GlassesIcon from '@mui/icons-material/Visibility';
// // // // // // // import LensIcon from '@mui/icons-material/VisibilityOutlined';
// // // // // // // import CategoryIcon from '@mui/icons-material/Category';
// // // // // // import ExpandLess from '@mui/icons-material/ExpandLess';
// // // // // // import ExpandMore from '@mui/icons-material/ExpandMore';
// // // // // // import HomeIcon from '@mui/icons-material/Home'
// // // // // // import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// // // // // // import CategoryIcon from '@mui/icons-material/CategoryRounded';
// // // // // // import LensIcon from '@mui/icons-material/VisibilityRounded';

// // // // // // // import Monture from './components/Monture';
// // // // // // // import Lentille from './components/Lentille';
// // // // // // import Monture from '../components/Products/Monture/Monture';
// // // // // // import Lentille from '../components/Products/Lentille/Lentille';
// // // // // // import Home from './Home';
// // // // // // import Verre from '../components/Products/Verre/Verre';
// // // // // // const drawerWidth = 280;

// // // // // // function Layout() {
// // // // // //   const [activePage, setActivePage] = useState('home');
// // // // // //   const [openProduits, setOpenProduits] = useState(true); // Controls expand/collapse

// // // // // //   const renderContent = () => {
// // // // // //     switch (activePage) {
// // // // // //         case 'home':
// // // // // //         return <Home />;
// // // // // //       case 'monture':
// // // // // //         return <Monture />;
// // // // // //       case 'lentilles':
// // // // // //         return <Lentille />;
// // // // // //       case 'verre':
// // // // // //         return <Verre />;
// // // // // //       default:
// // // // // //         return <Home />;
// // // // // //     }
// // // // // //   };

// // // // // //   console.log('Verre:', Verre);


// // // // // //   return (
// // // // // //     <Box sx={{ display: 'flex' }}>
// // // // // //       <CssBaseline />

// // // // // //       {/* AppBar */}
// // // // // //       {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
// // // // // //         <Toolbar>
// // // // // //           <Typography variant="h6" noWrap component="div">
// // // // // //             Optics Manager
// // // // // //           </Typography>
// // // // // //         </Toolbar>
// // // // // //       </AppBar> */}

// // // // // //       {/* Sidebar */}
// // // // // //       <Drawer
// // // // // //         variant="permanent"
// // // // // //         sx={{
// // // // // //           width: drawerWidth,
// // // // // //           flexShrink: 0,
// // // // // //           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
// // // // // //         }}
// // // // // //       >
// // // // // //         <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 2, height: 60, width: 250, px: 2, mt: 10, mx: 'auto'}}
// // // // // // >
// // // // // //           <Typography variant="h6" noWrap component="div">
// // // // // //             Optics Manager
// // // // // //           </Typography>
// // // // // //         </Toolbar>

// // // // // //         <Toolbar />

// // // // // //         <List>
// // // // // //             <ListItem button selected={activePage === 'home'} onClick={() => setActivePage('home')} >
// // // // // //             <ListItemIcon>
// // // // // //             {/* Use a relevant MUI icon for Home */}
// // // // // //             <HomeRoundedIcon sx={{ color: 'grey.500' }} />
// // // // // //             </ListItemIcon>
// // // // // //             <ListItemText primary="Home" />
// // // // // //             </ListItem>
// // // // // //           {/* Produits (Collapsible Section) */}
// // // // // //           <ListItem button onClick={() => setOpenProduits(!openProduits)}>
// // // // // //             <ListItemIcon><CategoryIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // // //             <ListItemText primary="Produits" />
// // // // // //             {openProduits ? <ExpandLess /> : <ExpandMore />}
// // // // // //           </ListItem>


// // // // // //           <Collapse in={openProduits} timeout="auto" unmountOnExit>
// // // // // //             <List component="div" disablePadding>
// // // // // //               <ListItem
// // // // // //                 button
// // // // // //                 sx={{ pl: 4 }}
// // // // // //                 onClick={() => setActivePage('monture')}
// // // // // //                 selected={activePage === 'monture'}
// // // // // //               >
// // // // // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // // //                 <ListItemText primary="Monture" />
// // // // // //               </ListItem>
// // // // // //               <ListItem
// // // // // //                 button
// // // // // //                 sx={{ pl: 4 }}
// // // // // //                 onClick={() => setActivePage('lentilles')}
// // // // // //                 selected={activePage === 'lentilles'}
// // // // // //               >
// // // // // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // // //                 <ListItemText primary="Lentilles" />
// // // // // //               </ListItem>

// // // // // //               <ListItem
// // // // // //                 button
// // // // // //                 sx={{ pl: 4 }}
// // // // // //                 onClick={() => setActivePage('verre')}
// // // // // //                 selected={activePage === 'verre'}
// // // // // //               >
// // // // // //                 <ListItemIcon><LensIcon sx={{ color: 'grey.500' }} /></ListItemIcon>
// // // // // //                 <ListItemText primary="Verre" />
// // // // // //               </ListItem>


// // // // // //             </List>
// // // // // //           </Collapse>
// // // // // //         </List>
// // // // // //       </Drawer>

// // // // // //       {/* Main content */}
// // // // // //       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// // // // // //         <Toolbar />
// // // // // //         {renderContent()}
// // // // // //         <Box mt={5} textAlign="center">
// // // // // //           <Typography variant="body2" color="text.secondary">
// // // // // //             © 2023 Optics Manager
// // // // // //           </Typography>
// // // // // //         </Box>
// // // // // //       </Box>
// // // // // //     </Box>
// // // // // //   );
// // // // // // }

// // // // // // export default Layout;