
import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import LensIcon from '@mui/icons-material/BlurOn';
import GlassesIcon from '@mui/icons-material/Visibility';

const drawerWidth = 240;

const Sidebar = ({ onNavigate }) => {
  const [openProduits, setOpenProduits] = useState(false);

  const handleProduitsClick = () => {
    setOpenProduits(!openProduits);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          {/* Replace with your logo */}
          <img src="/logo192.png" alt="Logo" style={{ height: 40 }} />
        </Typography>
      </Toolbar>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => onNavigate('dashboard')}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItemButton onClick={handleProduitsClick}>
          <ListItemIcon><InventoryIcon /></ListItemIcon>
          <ListItemText primary="Produits" />
          {openProduits ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openProduits} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton onClick={() => onNavigate('monture')}>
              <ListItemIcon><GlassesIcon /></ListItemIcon>
              <ListItemText primary="Monture" />
            </ListItemButton>
            <ListItemButton onClick={() => onNavigate('verres')}>
              <ListItemIcon><LensIcon /></ListItemIcon>
              <ListItemText primary="Verres" />
            </ListItemButton>
            <ListItemButton onClick={() => onNavigate('lentilles')}>
              <ListItemIcon><CategoryIcon /></ListItemIcon>
              <ListItemText primary="Lentilles" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton onClick={() => onNavigate('vente')}>
            <ListItemIcon><LocalMallIcon /></ListItemIcon>
            <ListItemText primary="Vente" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => onNavigate('achat')}>
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Achat" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
