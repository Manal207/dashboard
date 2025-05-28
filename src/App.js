import { useState } from 'react';
import {
  Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Collapse
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GlassesIcon from '@mui/icons-material/Visibility';
import LensIcon from '@mui/icons-material/VisibilityOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Monture from './components/Monture';
import Lentille from './components/Lentille';

const drawerWidth = 280;

function App() {
  const [activePage, setActivePage] = useState('monture');
  const [openProduits, setOpenProduits] = useState(true); // Controls expand/collapse

  const renderContent = () => {
    switch (activePage) {
      case 'monture':
        return <Monture />;
      case 'lentilles':
        return <Lentille />;
      default:
        return <Monture />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Optics Manager
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          {/* Produits (Collapsible Section) */}
          <ListItem button onClick={() => setOpenProduits(!openProduits)}>
            <ListItemIcon><CategoryIcon /></ListItemIcon>
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
                <ListItemIcon><GlassesIcon /></ListItemIcon>
                <ListItemText primary="Monture" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => setActivePage('lentilles')}
                selected={activePage === 'lentilles'}
              >
                <ListItemIcon><LensIcon /></ListItemIcon>
                <ListItemText primary="Lentilles" />
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

export default App;



// import { useState } from 'react';
// import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import GlassesIcon from '@mui/icons-material/Visibility';
// import LensIcon from '@mui/icons-material/VisibilityOutlined';

// import Monture from './components/Monture';
// import Lentille from './components/Lentille';

// const drawerWidth = 240;

// function App() {
//   const [activePage, setActivePage] = useState('monture');

//   const renderContent = () => {
//     switch (activePage) {
//       case 'monture':
//         return <Monture />;
//       case 'lentilles':
//         return <Lentille />;
//       default:
//         return <Monture />;
//     }
//   };

//   const handleNavigation = (page) => {
//     setActivePage(page);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       {/* AppBar */}
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Optics Manager
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Drawer / Sidebar */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//         }}
//       >
//         <Toolbar />
//         <List>
//           <ListItem button onClick={() => handleNavigation('monture')} selected={activePage === 'monture'}>
//             <ListItemIcon><GlassesIcon /></ListItemIcon>
//             <ListItemText primary="Monture" />
//           </ListItem>
//           <ListItem button onClick={() => handleNavigation('lentilles')} selected={activePage === 'lentilles'}>
//             <ListItemIcon><LensIcon /></ListItemIcon>
//             <ListItemText primary="Lentilles" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
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

// export default App;


// // import { useState } from 'react';
// // import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// // import DashboardIcon from '@mui/icons-material/Dashboard';
// // import GlassesIcon from '@mui/icons-material/Visibility';
// // import LensIcon from '@mui/icons-material/VisibilityOutlined';

// // import Monture from './components/Monture';
// // import Lentille from './components/Lentille';

// // const drawerWidth = 240;

// // function App() {
// //   const [activePage, setActivePage] = useState('monture');

// //   const renderContent = () => {
// //     switch (activePage) {
// //       case 'monture':
// //         return <Monture />;
// //       case 'lentilles':
// //         return <Lentille />;
// //       default:
// //         return <Monture />;
// //     }
// //   };

// //   const handleNavigation = (page) => {
// //     setActivePage(page);
// //   };

// //   return (
// //     <Box sx={{ display: 'flex' }}>
// //       <CssBaseline />
// //       {/* AppBar */}
// //       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
// //         <Toolbar>
// //           <Typography variant="h6" noWrap component="div">
// //             Optics Manager
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>

// //       {/* Drawer / Sidebar */}
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
// //           <ListItem button onClick={() => handleNavigation('monture')} selected={activePage === 'monture'}>
// //             <ListItemIcon><GlassesIcon /></ListItemIcon>
// //             <ListItemText primary="Monture" />
// //           </ListItem>
// //           <ListItem button onClick={() => handleNavigation('lentilles')} selected={activePage === 'lentilles'}>
// //             <ListItemIcon><LensIcon /></ListItemIcon>
// //             <ListItemText primary="Lentilles" />
// //           </ListItem>
// //         </List>
// //       </Drawer>

// //       {/* Main Content */}
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

// // export default App;

// // // import logo from './logo.svg';
// // // import './App.css';
// // // import { useState } from 'react';

// // // import Sidebar from './components/Sidebar';
// // // import Monture from './components/Monture';
// // // import Lentille from './components/Lentille';


// // // function App() {
// // //     const [activePage, setActivePage] = useState('dashboard');

// // //     const renderContent = () => {
// // //       switch (activePage) {
// // //         case 'monture':
// // //           return <Monture />;
// // //         case 'lentilles':
// // //           return <Lentille/>
// // //           // Add more cases for future pages if needed
// // //         default:
// // //           return <Monture />;
// // //       }
// // //     };

// // //     return (
// // //        <div className="app-layout">
// // //       <Sidebar onNavigate={setActivePage} />
// // //       <div className="main-content">
// // //         <header className="app-header">
// // //           <h1>Optics Manager</h1>
// // //         </header>
// // //         <main className="app-main">
// // //           {renderContent()}
// // //         </main>
// // //         <footer className="app-footer">
// // //           <p>© 2023 Optics Manager</p>
// // //         </footer>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;
