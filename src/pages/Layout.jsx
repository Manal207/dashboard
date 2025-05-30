import { useState } from 'react';
import {
  Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Collapse
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GlassesIcon from '@mui/icons-material/Visibility';
// import LensIcon from '@mui/icons-material/VisibilityOutlined';
// import CategoryIcon from '@mui/icons-material/Category';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CategoryIcon from '@mui/icons-material/CategoryRounded';
import LensIcon from '@mui/icons-material/VisibilityRounded';

// import Monture from './components/Monture';
// import Lentille from './components/Lentille';
import Monture from '../components/Products/Monture/Monture';
import Lentille from '../components/Products/Lentille/Lentille';
import Home from './Home';
import Verre from '../components/Products/Verre/Verre';
const drawerWidth = 280;

function Layout() {
  const [activePage, setActivePage] = useState('home');
  const [openProduits, setOpenProduits] = useState(true); // Controls expand/collapse

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
      default:
        return <Home />;
    }
  };

  console.log('Verre:', Verre);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Optics Manager
          </Typography>
        </Toolbar>
      </AppBar> */}

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 2, height: 60, width: 250, px: 2, mt: 10, mx: 'auto'}}
>
          <Typography variant="h6" noWrap component="div">
            Optics Manager
          </Typography>
        </Toolbar>

        <Toolbar />

        <List>
            <ListItem button selected={activePage === 'home'} onClick={() => setActivePage('home')} >
            <ListItemIcon>
            {/* Use a relevant MUI icon for Home */}
            <HomeRoundedIcon sx={{ color: 'grey.500' }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
            </ListItem>
          {/* Produits (Collapsible Section) */}
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
        </List>
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