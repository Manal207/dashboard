// src/pages/Home.jsx
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  LinearProgress,
  Divider,
  IconButton
} from '@mui/material';

// Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Home() {
  // Données simulées
  const todayStats = [
    {
      title: 'Ventes du Jour',
      value: '2,450',
      currency: 'DH',
      trend: 8.5,
      isUp: true,
      icon: ReceiptIcon,
      color: '#22C55E',
      bg: '#F0FDF4'
    },
    {
      title: 'Commandes en Attente',
      value: '12',
      trend: -2.1,
      isUp: false,
      icon: ShoppingCartIcon,
      color: '#F59E0B',
      bg: '#FFFBEB'
    },
    {
      title: 'Nouveaux Clients',
      value: '5',
      trend: 15.3,
      isUp: true,
      icon: PeopleIcon,
      color: '#3B82F6',
      bg: '#EFF6FF'
    },
    {
      title: 'Produits en Rupture',
      value: '8',
      trend: 0,
      isUp: null,
      icon: WarningIcon,
      color: '#EF4444',
      bg: '#FEF2F2'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'vente',
      title: 'Nouvelle vente créée',
      description: 'Vente V-2025-0027 pour Optique Vision Plus',
      amount: '1,318.00 DH',
      time: 'Il y a 5 min',
      icon: ReceiptIcon,
      color: '#22C55E'
    },
    {
      id: 2,
      type: 'client',
      title: 'Client ajouté',
      description: 'Dr. Ahmed Bennani - Particulier',
      time: 'Il y a 12 min',
      icon: PersonAddIcon,
      color: '#3B82F6'
    },
    {
      id: 3,
      type: 'stock',
      title: 'Stock mis à jour',
      description: 'Ray-Ban RB3025 - Quantité: 45',
      time: 'Il y a 25 min',
      icon: InventoryIcon,
      color: '#8B5CF6'
    },
    {
      id: 4,
      type: 'livraison',
      title: 'Commande livrée',
      description: 'Commande #1234 - Client: Optique Center',
      time: 'Il y a 45 min',
      icon: LocalShippingIcon,
      color: '#F59E0B'
    }
  ];

  const topProducts = [
    { name: 'Ray-Ban Aviator Classic', sold: 45, revenue: '22,500 DH', progress: 90 },
    { name: 'Essilor Varilux Comfort', sold: 32, revenue: '19,200 DH', progress: 64 },
    { name: 'Kit de Nettoyage Premium', sold: 28, revenue: '1,400 DH', progress: 56 },
    { name: 'Oakley Holbrook', sold: 24, revenue: '14,400 DH', progress: 48 }
  ];

  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Stock faible',
      message: '8 produits ont un stock insuffisant',
      icon: WarningIcon,
      color: '#EF4444'
    },
    {
      id: 2,
      type: 'delivery',
      title: 'Livraisons du jour',
      message: '3 commandes à livrer aujourd\'hui',
      icon: LocalShippingIcon,
      color: '#F59E0B'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Paiement en attente',
      message: 'Facture #INV-2025-045',
      icon: PaymentIcon,
      color: '#8B5CF6'
    }
  ];

  const getCurrentDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('fr-FR', options);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header - Style similaire à Vente */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              fontSize: '1.5rem',
              letterSpacing: '0.75px',
              mb: 1,
              color: '#1F2937'
            }}
          >
            Tableau de Bord
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getCurrentDate()}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            backgroundColor: 'black',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.875rem',
            color: 'white',
            px: 3,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Nouvelle Vente
        </Button>
      </Box>

      {/* Stats Cards - Layout Grid cohérent */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
        {todayStats.map((stat, index) => (
          <Paper 
            key={index}
            sx={{ 
              p: 3, 
              borderRadius: '12px', 
              border: '1px solid #e0e0e0',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                  {stat.value}
                  {stat.currency && (
                    <Typography component="span" variant="h6" sx={{ ml: 0.5, color: stat.color }}>
                      {stat.currency}
                    </Typography>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {stat.title}
                </Typography>
              </Box>
              <stat.icon sx={{ fontSize: 40, color: stat.color, opacity: 0.7 }} />
            </Box>
            
            {stat.trend !== 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {stat.isUp ? (
                  <TrendingUpIcon sx={{ color: '#22C55E', fontSize: 16 }} />
                ) : (
                  <TrendingDownIcon sx={{ color: '#EF4444', fontSize: 16 }} />
                )}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: stat.isUp ? '#22C55E' : '#EF4444',
                    fontWeight: 600 
                  }}
                >
                  {Math.abs(stat.trend)}% ce mois
                </Typography>
              </Box>
            )}
          </Paper>
        ))}
      </Box>



      {/* Contenu principal en 3 colonnes - pleine largeur */}
      <Box sx={{ display: 'flex', gap: 3, width: '100%' }}>
        {/* Notifications */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ borderRadius: '12px', overflow: 'hidden', height: 'fit-content' }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationsIcon sx={{ color: '#F59E0B' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Notifications
                  </Typography>
                  <Chip 
                    label={notifications.length} 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#FEF3F2',
                      color: '#EF4444',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
            
            <List sx={{ p: 0 }}>
              {notifications.map((notif, index) => (
                <ListItem 
                  key={notif.id} 
                  sx={{ 
                    px: 3,
                    py: 2,
                    borderBottom: index < notifications.length - 1 ? '1px solid #f0f0f0' : 'none',
                    '&:hover': { backgroundColor: '#f8f9fa' }
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ 
                      backgroundColor: `${notif.color}15`, 
                      width: 36, 
                      height: 36 
                    }}>
                      <notif.icon sx={{ color: notif.color, fontSize: 18 }} />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={600} color="#374151">
                        {notif.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {notif.message}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Activité récente */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ borderRadius: '12px', overflow: 'hidden', height: 'fit-content' }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon sx={{ color: '#3B82F6' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Activité Récente
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
            
            <List sx={{ p: 0 }}>
              {recentActivities.map((activity, index) => (
                <ListItem 
                  key={activity.id} 
                  sx={{ 
                    px: 3, 
                    py: 2,
                    borderBottom: index < recentActivities.length - 1 ? '1px solid #f0f0f0' : 'none',
                    '&:hover': { backgroundColor: '#f8f9fa' }
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ 
                      backgroundColor: `${activity.color}15`, 
                      width: 36, 
                      height: 36 
                    }}>
                      <activity.icon sx={{ color: activity.color, fontSize: 18 }} />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={600} color="#374151">
                        {activity.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {activity.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            {activity.time}
                          </Typography>
                          {activity.amount && (
                            <Chip 
                              label={activity.amount} 
                              size="small"
                              sx={{ 
                                backgroundColor: '#F0FDF4',
                                color: '#22C55E',
                                fontWeight: 600,
                                fontSize: '0.7rem'
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        {/* Top produits */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ borderRadius: '12px', overflow: 'hidden', height: 'fit-content' }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmojiEventsIcon sx={{ color: '#F59E0B' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Top Ventes
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
            
            <List sx={{ p: 0 }}>
              {topProducts.map((product, index) => (
                <ListItem 
                  key={index} 
                  sx={{ 
                    px: 3, 
                    py: 2,
                    borderBottom: index < topProducts.length - 1 ? '1px solid #f0f0f0' : 'none',
                    '&:hover': { backgroundColor: '#f8f9fa' }
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ 
                      backgroundColor: '#FEF3F2',
                      color: '#EF4444',
                      fontWeight: 700,
                      width: 36,
                      height: 36,
                      fontSize: '0.875rem'
                    }}>
                      {index + 1}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={600} color="#374151">
                        {product.name}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {product.sold} vendus
                          </Typography>
                          <Typography variant="caption" fontWeight={600} color="#22C55E">
                            {product.revenue}
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={product.progress} 
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: '#F3F4F6',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#22C55E',
                              borderRadius: 2
                            }
                          }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;








// // src/pages/Home.jsx
// import React from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Button,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Chip,
//   Avatar,
//   LinearProgress,
//   Divider,
//   IconButton
// } from '@mui/material';

// // Icons
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import PeopleIcon from '@mui/icons-material/People';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import WarningIcon from '@mui/icons-material/Warning';
// import AddIcon from '@mui/icons-material/Add';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import PaymentIcon from '@mui/icons-material/Payment';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// function Home() {
//   // Données simulées
//   const todayStats = [
//     {
//       title: 'Ventes du Jour',
//       value: '2,450',
//       currency: 'DH',
//       trend: 8.5,
//       isUp: true,
//       icon: ReceiptIcon,
//       color: '#22C55E',
//       bg: '#F0FDF4'
//     },
//     {
//       title: 'Commandes en Attente',
//       value: '12',
//       trend: -2.1,
//       isUp: false,
//       icon: ShoppingCartIcon,
//       color: '#F59E0B',
//       bg: '#FFFBEB'
//     },
//     {
//       title: 'Nouveaux Clients',
//       value: '5',
//       trend: 15.3,
//       isUp: true,
//       icon: PeopleIcon,
//       color: '#3B82F6',
//       bg: '#EFF6FF'
//     },
//     {
//       title: 'Produits en Rupture',
//       value: '8',
//       trend: 0,
//       isUp: null,
//       icon: WarningIcon,
//       color: '#EF4444',
//       bg: '#FEF2F2'
//     }
//   ];

//   const recentActivities = [
//     {
//       id: 1,
//       type: 'vente',
//       title: 'Nouvelle vente créée',
//       description: 'Vente V-2025-0027 pour Optique Vision Plus',
//       amount: '1,318.00 DH',
//       time: 'Il y a 5 min',
//       icon: ReceiptIcon,
//       color: '#22C55E'
//     },
//     {
//       id: 2,
//       type: 'client',
//       title: 'Client ajouté',
//       description: 'Dr. Ahmed Bennani - Particulier',
//       time: 'Il y a 12 min',
//       icon: PersonAddIcon,
//       color: '#3B82F6'
//     },
//     {
//       id: 3,
//       type: 'stock',
//       title: 'Stock mis à jour',
//       description: 'Ray-Ban RB3025 - Quantité: 45',
//       time: 'Il y a 25 min',
//       icon: InventoryIcon,
//       color: '#8B5CF6'
//     },
//     {
//       id: 4,
//       type: 'livraison',
//       title: 'Commande livrée',
//       description: 'Commande #1234 - Client: Optique Center',
//       time: 'Il y a 45 min',
//       icon: LocalShippingIcon,
//       color: '#F59E0B'
//     }
//   ];

//   const topProducts = [
//     { name: 'Ray-Ban Aviator Classic', sold: 45, revenue: '22,500 DH', progress: 90 },
//     { name: 'Essilor Varilux Comfort', sold: 32, revenue: '19,200 DH', progress: 64 },
//     { name: 'Kit de Nettoyage Premium', sold: 28, revenue: '1,400 DH', progress: 56 },
//     { name: 'Oakley Holbrook', sold: 24, revenue: '14,400 DH', progress: 48 }
//   ];

//   const notifications = [
//     {
//       id: 1,
//       type: 'warning',
//       title: 'Stock faible',
//       message: '8 produits ont un stock insuffisant',
//       icon: WarningIcon,
//       color: '#EF4444'
//     },
//     {
//       id: 2,
//       type: 'delivery',
//       title: 'Livraisons du jour',
//       message: '3 commandes à livrer aujourd\'hui',
//       icon: LocalShippingIcon,
//       color: '#F59E0B'
//     },
//     {
//       id: 3,
//       type: 'payment',
//       title: 'Paiement en attente',
//       message: 'Facture #INV-2025-045',
//       icon: PaymentIcon,
//       color: '#8B5CF6'
//     }
//   ];

//   const getCurrentDate = () => {
//     const options = { 
//       weekday: 'long', 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     };
//     return new Date().toLocaleDateString('fr-FR', options);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       {/* Header - Style similaire à Vente */}
//       <Box sx={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center', 
//         mb: 3 
//       }}>
//         <Box>
//           <Typography 
//             variant="h4" 
//             sx={{ 
//               fontWeight: 700, 
//               fontSize: '1.5rem',
//               letterSpacing: '0.75px',
//               mb: 1,
//               color: '#1F2937'
//             }}
//           >
//             Tableau de Bord
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {getCurrentDate()}
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           sx={{
//             textTransform: 'none',
//             backgroundColor: 'black',
//             borderRadius: '8px',
//             fontWeight: 700,
//             fontSize: '0.875rem',
//             color: 'white',
//             px: 3,
//             py: 1.5,
//             '&:hover': {
//               backgroundColor: '#333',
//             },
//           }}
//         >
//           Nouvelle Vente
//         </Button>
//       </Box>

//       {/* Stats Cards - Layout Grid cohérent */}
//       <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
//         {todayStats.map((stat, index) => (
//           <Paper 
//             key={index}
//             sx={{ 
//               p: 3, 
//               borderRadius: '12px', 
//               border: '1px solid #e0e0e0',
//               transition: 'transform 0.2s ease-in-out',
//               '&:hover': {
//                 transform: 'translateY(-2px)',
//                 boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
//               }
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
//               <Box>
//                 <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
//                   {stat.value}
//                   {stat.currency && (
//                     <Typography component="span" variant="h6" sx={{ ml: 0.5, color: stat.color }}>
//                       {stat.currency}
//                     </Typography>
//                   )}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                   {stat.title}
//                 </Typography>
//               </Box>
//               <stat.icon sx={{ fontSize: 40, color: stat.color, opacity: 0.7 }} />
//             </Box>
            
//             {stat.trend !== 0 && (
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                 {stat.isUp ? (
//                   <TrendingUpIcon sx={{ color: '#22C55E', fontSize: 16 }} />
//                 ) : (
//                   <TrendingDownIcon sx={{ color: '#EF4444', fontSize: 16 }} />
//                 )}
//                 <Typography 
//                   variant="caption" 
//                   sx={{ 
//                     color: stat.isUp ? '#22C55E' : '#EF4444',
//                     fontWeight: 600 
//                   }}
//                 >
//                   {Math.abs(stat.trend)}% ce mois
//                 </Typography>
//               </Box>
//             )}
//           </Paper>
//         ))}
//       </Box>



//       {/* Contenu principal en 3 colonnes - pleine largeur */}
//       <Grid container spacing={3}>
//         {/* Notifications */}
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ borderRadius: '12px', overflow: 'hidden', height: 'fit-content' }}>
//             <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <NotificationsIcon sx={{ color: '#F59E0B' }} />
//                   <Typography variant="h6" fontWeight={700}>
//                     Notifications
//                   </Typography>
//                   <Chip 
//                     label={notifications.length} 
//                     size="small" 
//                     sx={{ 
//                       backgroundColor: '#FEF3F2',
//                       color: '#EF4444',
//                       fontWeight: 600,
//                       fontSize: '0.75rem'
//                     }}
//                   />
//                 </Box>
//                 <IconButton size="small">
//                   <MoreVertIcon />
//                 </IconButton>
//               </Box>
//             </Box>
            
//             <List sx={{ p: 0 }}>
//               {notifications.map((notif, index) => (
//                 <ListItem 
//                   key={notif.id} 
//                   sx={{ 
//                     px: 3,
//                     py: 2,
//                     borderBottom: index < notifications.length - 1 ? '1px solid #f0f0f0' : 'none',
//                     '&:hover': { backgroundColor: '#f8f9fa' }
//                   }}
//                 >
//                   <ListItemIcon>
//                     <Avatar sx={{ 
//                       backgroundColor: `${notif.color}15`, 
//                       width: 36, 
//                       height: 36 
//                     }}>
//                       <notif.icon sx={{ color: notif.color, fontSize: 18 }} />
//                     </Avatar>
//                   </ListItemIcon>
//                   <ListItemText
//                     primary={
//                       <Typography variant="subtitle2" fontWeight={600} color="#374151">
//                         {notif.title}
//                       </Typography>
//                     }
//                     secondary={
//                       <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                         {notif.message}
//                       </Typography>
//                     }
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Grid>

//         {/* Activité récente */}
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ borderRadius: '12px', overflow: 'hidden', height: 'fit-content' }}>
//             <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <AccessTimeIcon sx={{ color: '#3B82F6' }} />
//                   <Typography variant="h6" fontWeight={700}>
//                     Activité Récente
//                   </Typography>
//                 </Box>
//                 <IconButton size="small">
//                   <MoreVertIcon />
//                 </IconButton>
//               </Box>
//             </Box>
            
//             <List sx={{ p: 0 }}>
//               {recentActivities.map((activity, index) => (
//                 <ListItem 
//                   key={activity.id} 
//                   sx={{ 
//                     px: 3, 
//                     py: 2,
//                     borderBottom: index < recentActivities.length - 1 ? '1px solid #f0f0f0' : 'none',
//                     '&:hover': { backgroundColor: '#f8f9fa' }
//                   }}
//                 >
//                   <ListItemIcon>
//                     <Avatar sx={{ 
//                       backgroundColor: `${activity.color}15`, 
//                       width: 36, 
//                       height: 36 
//                     }}>
//                       <activity.icon sx={{ color: activity.color, fontSize: 18 }} />
//                     </Avatar>
//                   </ListItemIcon>
//                   <ListItemText
//                     primary={
//                       <Typography variant="subtitle2" fontWeight={600} color="#374151">
//                         {activity.title}
//                       </Typography>
//                     }
//                     secondary={
//                       <Box sx={{ mt: 0.5 }}>
//                         <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
//                           {activity.description}
//                         </Typography>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                           <Typography variant="caption" color="text.secondary">
//                             {activity.time}
//                           </Typography>
//                           {activity.amount && (
//                             <Chip 
//                               label={activity.amount} 
//                               size="small"
//                               sx={{ 
//                                 backgroundColor: '#F0FDF4',
//                                 color: '#22C55E',
//                                 fontWeight: 600,
//                                 fontSize: '0.7rem'
//                               }}
//                             />
//                           )}
//                         </Box>
//                       </Box>
//                     }
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Grid>

//         {/* Top produits */}
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ borderRadius: '12px', overflow: 'hidden', height: 'fit-content' }}>
//             <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <EmojiEventsIcon sx={{ color: '#F59E0B' }} />
//                   <Typography variant="h6" fontWeight={700}>
//                     Top Ventes
//                   </Typography>
//                 </Box>
//                 <IconButton size="small">
//                   <MoreVertIcon />
//                 </IconButton>
//               </Box>
//             </Box>
            
//             <List sx={{ p: 0 }}>
//               {topProducts.map((product, index) => (
//                 <ListItem 
//                   key={index} 
//                   sx={{ 
//                     px: 3, 
//                     py: 2,
//                     borderBottom: index < topProducts.length - 1 ? '1px solid #f0f0f0' : 'none',
//                     '&:hover': { backgroundColor: '#f8f9fa' }
//                   }}
//                 >
//                   <ListItemIcon>
//                     <Avatar sx={{ 
//                       backgroundColor: '#FEF3F2',
//                       color: '#EF4444',
//                       fontWeight: 700,
//                       width: 36,
//                       height: 36,
//                       fontSize: '0.875rem'
//                     }}>
//                       {index + 1}
//                     </Avatar>
//                   </ListItemIcon>
//                   <ListItemText
//                     primary={
//                       <Typography variant="subtitle2" fontWeight={600} color="#374151">
//                         {product.name}
//                       </Typography>
//                     }
//                     secondary={
//                       <Box sx={{ mt: 1 }}>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//                           <Typography variant="caption" color="text.secondary">
//                             {product.sold} vendus
//                           </Typography>
//                           <Typography variant="caption" fontWeight={600} color="#22C55E">
//                             {product.revenue}
//                           </Typography>
//                         </Box>
//                         <LinearProgress 
//                           variant="determinate" 
//                           value={product.progress} 
//                           sx={{
//                             height: 4,
//                             borderRadius: 2,
//                             backgroundColor: '#F3F4F6',
//                             '& .MuiLinearProgress-bar': {
//                               backgroundColor: '#22C55E',
//                               borderRadius: 2
//                             }
//                           }}
//                         />
//                       </Box>
//                     }
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// export default Home;





// // // src/pages/Home.jsx
// // import React from 'react';
// // import {
// //   Box,
// //   Typography,
// //   Paper,
// //   Grid,
// //   Button,
// //   Card,
// //   CardContent,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   ListItemIcon,
// //   Chip,
// //   Avatar,
// //   LinearProgress,
// //   Divider,
// //   IconButton
// // } from '@mui/material';

// // // Icons
// // import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// // import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// // import ReceiptIcon from '@mui/icons-material/Receipt';
// // import PeopleIcon from '@mui/icons-material/People';
// // import InventoryIcon from '@mui/icons-material/Inventory';
// // import WarningIcon from '@mui/icons-material/Warning';
// // import AddIcon from '@mui/icons-material/Add';
// // import PersonAddIcon from '@mui/icons-material/PersonAdd';
// // import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// // import NotificationsIcon from '@mui/icons-material/Notifications';
// // import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// // import AccessTimeIcon from '@mui/icons-material/AccessTime';
// // import PaymentIcon from '@mui/icons-material/Payment';
// // import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// // import MoreVertIcon from '@mui/icons-material/MoreVert';

// // function Home() {
// //   // Données simulées
// //   const todayStats = [
// //     {
// //       title: 'Ventes du Jour',
// //       value: '2,450',
// //       currency: 'DH',
// //       trend: 8.5,
// //       isUp: true,
// //       icon: ReceiptIcon,
// //       color: '#22C55E',
// //       bg: '#F0FDF4'
// //     },
// //     {
// //       title: 'Commandes en Attente',
// //       value: '12',
// //       trend: -2.1,
// //       isUp: false,
// //       icon: ShoppingCartIcon,
// //       color: '#F59E0B',
// //       bg: '#FFFBEB'
// //     },
// //     {
// //       title: 'Nouveaux Clients',
// //       value: '5',
// //       trend: 15.3,
// //       isUp: true,
// //       icon: PeopleIcon,
// //       color: '#3B82F6',
// //       bg: '#EFF6FF'
// //     },
// //     {
// //       title: 'Produits en Rupture',
// //       value: '8',
// //       trend: 0,
// //       isUp: null,
// //       icon: WarningIcon,
// //       color: '#EF4444',
// //       bg: '#FEF2F2'
// //     }
// //   ];

// //   const recentActivities = [
// //     {
// //       id: 1,
// //       type: 'vente',
// //       title: 'Nouvelle vente créée',
// //       description: 'Vente V-2025-0027 pour Optique Vision Plus',
// //       amount: '1,318.00 DH',
// //       time: 'Il y a 5 min',
// //       icon: ReceiptIcon,
// //       color: '#22C55E'
// //     },
// //     {
// //       id: 2,
// //       type: 'client',
// //       title: 'Client ajouté',
// //       description: 'Dr. Ahmed Bennani - Particulier',
// //       time: 'Il y a 12 min',
// //       icon: PersonAddIcon,
// //       color: '#3B82F6'
// //     },
// //     {
// //       id: 3,
// //       type: 'stock',
// //       title: 'Stock mis à jour',
// //       description: 'Ray-Ban RB3025 - Quantité: 45',
// //       time: 'Il y a 25 min',
// //       icon: InventoryIcon,
// //       color: '#8B5CF6'
// //     },
// //     {
// //       id: 4,
// //       type: 'livraison',
// //       title: 'Commande livrée',
// //       description: 'Commande #1234 - Client: Optique Center',
// //       time: 'Il y a 45 min',
// //       icon: LocalShippingIcon,
// //       color: '#F59E0B'
// //     }
// //   ];

// //   const topProducts = [
// //     { name: 'Ray-Ban Aviator Classic', sold: 45, revenue: '22,500 DH', progress: 90 },
// //     { name: 'Essilor Varilux Comfort', sold: 32, revenue: '19,200 DH', progress: 64 },
// //     { name: 'Kit de Nettoyage Premium', sold: 28, revenue: '1,400 DH', progress: 56 },
// //     { name: 'Oakley Holbrook', sold: 24, revenue: '14,400 DH', progress: 48 }
// //   ];

// //   const notifications = [
// //     {
// //       id: 1,
// //       type: 'warning',
// //       title: 'Stock faible',
// //       message: '8 produits ont un stock insuffisant',
// //       icon: WarningIcon,
// //       color: '#EF4444'
// //     },
// //     {
// //       id: 2,
// //       type: 'delivery',
// //       title: 'Livraisons du jour',
// //       message: '3 commandes à livrer aujourd\'hui',
// //       icon: LocalShippingIcon,
// //       color: '#F59E0B'
// //     },
// //     {
// //       id: 3,
// //       type: 'payment',
// //       title: 'Paiement en attente',
// //       message: 'Facture #INV-2025-045',
// //       icon: PaymentIcon,
// //       color: '#8B5CF6'
// //     }
// //   ];

// //   const getCurrentDate = () => {
// //     const options = { 
// //       weekday: 'long', 
// //       year: 'numeric', 
// //       month: 'long', 
// //       day: 'numeric' 
// //     };
// //     return new Date().toLocaleDateString('fr-FR', options);
// //   };

// //   return (
// //     <Box sx={{ width: '100%' }}>
// //       {/* Header - Style similaire à Vente */}
// //       <Box sx={{ 
// //         display: 'flex', 
// //         justifyContent: 'space-between', 
// //         alignItems: 'center', 
// //         mb: 3 
// //       }}>
// //         <Box>
// //           <Typography 
// //             variant="h4" 
// //             sx={{ 
// //               fontWeight: 700, 
// //               fontSize: '1.5rem',
// //               letterSpacing: '0.75px',
// //               mb: 1,
// //               color: '#1F2937'
// //             }}
// //           >
// //             Tableau de Bord
// //           </Typography>
// //           <Typography variant="body2" color="text.secondary">
// //             {getCurrentDate()}
// //           </Typography>
// //         </Box>

// //         <Button
// //           variant="contained"
// //           startIcon={<AddIcon />}
// //           sx={{
// //             textTransform: 'none',
// //             backgroundColor: 'black',
// //             borderRadius: '8px',
// //             fontWeight: 700,
// //             fontSize: '0.875rem',
// //             color: 'white',
// //             px: 3,
// //             py: 1.5,
// //             '&:hover': {
// //               backgroundColor: '#333',
// //             },
// //           }}
// //         >
// //           Nouvelle Vente
// //         </Button>
// //       </Box>

// //       {/* Stats Cards - Layout Grid cohérent */}
// //       <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
// //         {todayStats.map((stat, index) => (
// //           <Paper 
// //             key={index}
// //             sx={{ 
// //               p: 3, 
// //               borderRadius: '12px', 
// //               border: '1px solid #e0e0e0',
// //               transition: 'transform 0.2s ease-in-out',
// //               '&:hover': {
// //                 transform: 'translateY(-2px)',
// //                 boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
// //               }
// //             }}
// //           >
// //             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
// //               <Box>
// //                 <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
// //                   {stat.value}
// //                   {stat.currency && (
// //                     <Typography component="span" variant="h6" sx={{ ml: 0.5, color: stat.color }}>
// //                       {stat.currency}
// //                     </Typography>
// //                   )}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
// //                   {stat.title}
// //                 </Typography>
// //               </Box>
// //               <stat.icon sx={{ fontSize: 40, color: stat.color, opacity: 0.7 }} />
// //             </Box>
            
// //             {stat.trend !== 0 && (
// //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
// //                 {stat.isUp ? (
// //                   <TrendingUpIcon sx={{ color: '#22C55E', fontSize: 16 }} />
// //                 ) : (
// //                   <TrendingDownIcon sx={{ color: '#EF4444', fontSize: 16 }} />
// //                 )}
// //                 <Typography 
// //                   variant="caption" 
// //                   sx={{ 
// //                     color: stat.isUp ? '#22C55E' : '#EF4444',
// //                     fontWeight: 600 
// //                   }}
// //                 >
// //                   {Math.abs(stat.trend)}% ce mois
// //                 </Typography>
// //               </Box>
// //             )}
// //           </Paper>
// //         ))}
// //       </Box>

// //       {/* Actions Rapides */}
// //       <Paper sx={{ p: 3, borderRadius: '12px', border: '1px solid #e0e0e0', mb: 3 }}>
// //         <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
// //           Actions Rapides
// //         </Typography>
// //         <Grid container spacing={2}>
// //           <Grid item xs={12} md={4}>
// //             <Button
// //               fullWidth
// //               variant="contained"
// //               startIcon={<AddIcon />}
// //               sx={{
// //                 py: 1.5,
// //                 borderRadius: '8px',
// //                 backgroundColor: '#22C55E',
// //                 textTransform: 'none',
// //                 fontWeight: 600,
// //                 '&:hover': { backgroundColor: '#16A34A' }
// //               }}
// //             >
// //               Nouvelle Vente
// //             </Button>
// //           </Grid>
// //           <Grid item xs={12} md={4}>
// //             <Button
// //               fullWidth
// //               variant="outlined"
// //               startIcon={<PersonAddIcon />}
// //               sx={{
// //                 py: 1.5,
// //                 borderRadius: '8px',
// //                 textTransform: 'none',
// //                 fontWeight: 600,
// //                 borderColor: '#3B82F6',
// //                 color: '#3B82F6',
// //                 '&:hover': { borderColor: '#2563EB', backgroundColor: '#EFF6FF' }
// //               }}
// //             >
// //               Nouveau Client
// //             </Button>
// //           </Grid>
// //           <Grid item xs={12} md={4}>
// //             <Button
// //               fullWidth
// //               variant="outlined"
// //               startIcon={<InventoryIcon />}
// //               sx={{
// //                 py: 1.5,
// //                 borderRadius: '8px',
// //                 textTransform: 'none',
// //                 fontWeight: 600,
// //                 borderColor: '#8B5CF6',
// //                 color: '#8B5CF6',
// //                 '&:hover': { borderColor: '#7C3AED', backgroundColor: '#F5F3FF' }
// //               }}
// //             >
// //               Nouveau Produit
// //             </Button>
// //           </Grid>
// //         </Grid>
// //       </Paper>

// //       {/* Contenu principal en 3 colonnes */}
// //       <Grid container spacing={3}>
// //         {/* Notifications */}
// //         <Grid item xs={12} lg={4}>
// //           <Paper sx={{ borderRadius: '12px', overflow: 'hidden' }}>
// //             <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
// //               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
// //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                   <NotificationsIcon sx={{ color: '#F59E0B' }} />
// //                   <Typography variant="h6" fontWeight={700}>
// //                     Notifications
// //                   </Typography>
// //                   <Chip 
// //                     label={notifications.length} 
// //                     size="small" 
// //                     sx={{ 
// //                       backgroundColor: '#FEF3F2',
// //                       color: '#EF4444',
// //                       fontWeight: 600,
// //                       fontSize: '0.75rem'
// //                     }}
// //                   />
// //                 </Box>
// //                 <IconButton size="small">
// //                   <MoreVertIcon />
// //                 </IconButton>
// //               </Box>
// //             </Box>
            
// //             <List sx={{ p: 0 }}>
// //               {notifications.map((notif, index) => (
// //                 <ListItem 
// //                   key={notif.id} 
// //                   sx={{ 
// //                     px: 3,
// //                     py: 2,
// //                     borderBottom: index < notifications.length - 1 ? '1px solid #f0f0f0' : 'none',
// //                     '&:hover': { backgroundColor: '#f8f9fa' }
// //                   }}
// //                 >
// //                   <ListItemIcon>
// //                     <Avatar sx={{ 
// //                       backgroundColor: `${notif.color}15`, 
// //                       width: 36, 
// //                       height: 36 
// //                     }}>
// //                       <notif.icon sx={{ color: notif.color, fontSize: 18 }} />
// //                     </Avatar>
// //                   </ListItemIcon>
// //                   <ListItemText
// //                     primary={
// //                       <Typography variant="subtitle2" fontWeight={600} color="#374151">
// //                         {notif.title}
// //                       </Typography>
// //                     }
// //                     secondary={
// //                       <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
// //                         {notif.message}
// //                       </Typography>
// //                     }
// //                   />
// //                 </ListItem>
// //               ))}
// //             </List>
// //           </Paper>
// //         </Grid>

// //         {/* Activité récente */}
// //         <Grid item xs={12} lg={4}>
// //           <Paper sx={{ borderRadius: '12px', overflow: 'hidden' }}>
// //             <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
// //               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
// //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                   <AccessTimeIcon sx={{ color: '#3B82F6' }} />
// //                   <Typography variant="h6" fontWeight={700}>
// //                     Activité Récente
// //                   </Typography>
// //                 </Box>
// //                 <IconButton size="small">
// //                   <MoreVertIcon />
// //                 </IconButton>
// //               </Box>
// //             </Box>
            
// //             <List sx={{ p: 0 }}>
// //               {recentActivities.map((activity, index) => (
// //                 <ListItem 
// //                   key={activity.id} 
// //                   sx={{ 
// //                     px: 3, 
// //                     py: 2,
// //                     borderBottom: index < recentActivities.length - 1 ? '1px solid #f0f0f0' : 'none',
// //                     '&:hover': { backgroundColor: '#f8f9fa' }
// //                   }}
// //                 >
// //                   <ListItemIcon>
// //                     <Avatar sx={{ 
// //                       backgroundColor: `${activity.color}15`, 
// //                       width: 36, 
// //                       height: 36 
// //                     }}>
// //                       <activity.icon sx={{ color: activity.color, fontSize: 18 }} />
// //                     </Avatar>
// //                   </ListItemIcon>
// //                   <ListItemText
// //                     primary={
// //                       <Typography variant="subtitle2" fontWeight={600} color="#374151">
// //                         {activity.title}
// //                       </Typography>
// //                     }
// //                     secondary={
// //                       <Box sx={{ mt: 0.5 }}>
// //                         <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
// //                           {activity.description}
// //                         </Typography>
// //                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                           <Typography variant="caption" color="text.secondary">
// //                             {activity.time}
// //                           </Typography>
// //                           {activity.amount && (
// //                             <Chip 
// //                               label={activity.amount} 
// //                               size="small"
// //                               sx={{ 
// //                                 backgroundColor: '#F0FDF4',
// //                                 color: '#22C55E',
// //                                 fontWeight: 600,
// //                                 fontSize: '0.7rem'
// //                               }}
// //                             />
// //                           )}
// //                         </Box>
// //                       </Box>
// //                     }
// //                   />
// //                 </ListItem>
// //               ))}
// //             </List>
// //           </Paper>
// //         </Grid>

// //         {/* Top produits */}
// //         <Grid item xs={12} lg={4}>
// //           <Paper sx={{ borderRadius: '12px', overflow: 'hidden' }}>
// //             <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
// //               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
// //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //                   <EmojiEventsIcon sx={{ color: '#F59E0B' }} />
// //                   <Typography variant="h6" fontWeight={700}>
// //                     Top Ventes
// //                   </Typography>
// //                 </Box>
// //                 <IconButton size="small">
// //                   <MoreVertIcon />
// //                 </IconButton>
// //               </Box>
// //             </Box>
            
// //             <List sx={{ p: 0 }}>
// //               {topProducts.map((product, index) => (
// //                 <ListItem 
// //                   key={index} 
// //                   sx={{ 
// //                     px: 3, 
// //                     py: 2,
// //                     borderBottom: index < topProducts.length - 1 ? '1px solid #f0f0f0' : 'none',
// //                     '&:hover': { backgroundColor: '#f8f9fa' }
// //                   }}
// //                 >
// //                   <ListItemIcon>
// //                     <Avatar sx={{ 
// //                       backgroundColor: '#FEF3F2',
// //                       color: '#EF4444',
// //                       fontWeight: 700,
// //                       width: 36,
// //                       height: 36,
// //                       fontSize: '0.875rem'
// //                     }}>
// //                       {index + 1}
// //                     </Avatar>
// //                   </ListItemIcon>
// //                   <ListItemText
// //                     primary={
// //                       <Typography variant="subtitle2" fontWeight={600} color="#374151">
// //                         {product.name}
// //                       </Typography>
// //                     }
// //                     secondary={
// //                       <Box sx={{ mt: 1 }}>
// //                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
// //                           <Typography variant="caption" color="text.secondary">
// //                             {product.sold} vendus
// //                           </Typography>
// //                           <Typography variant="caption" fontWeight={600} color="#22C55E">
// //                             {product.revenue}
// //                           </Typography>
// //                         </Box>
// //                         <LinearProgress 
// //                           variant="determinate" 
// //                           value={product.progress} 
// //                           sx={{
// //                             height: 4,
// //                             borderRadius: 2,
// //                             backgroundColor: '#F3F4F6',
// //                             '& .MuiLinearProgress-bar': {
// //                               backgroundColor: '#22C55E',
// //                               borderRadius: 2
// //                             }
// //                           }}
// //                         />
// //                       </Box>
// //                     }
// //                   />
// //                 </ListItem>
// //               ))}
// //             </List>
// //           </Paper>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // }

// // export default Home;









// // // // src/pages/Home.jsx
// // // import React from 'react';
// // // import {
// // //   Box,
// // //   Typography,
// // //   Paper,
// // //   Grid,
// // //   Button,
// // //   Card,
// // //   CardContent,
// // //   List,
// // //   ListItem,
// // //   ListItemText,
// // //   ListItemIcon,
// // //   Chip,
// // //   Avatar,
// // //   LinearProgress,
// // //   Divider
// // // } from '@mui/material';

// // // // Icons
// // // import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// // // import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// // // import ReceiptIcon from '@mui/icons-material/Receipt';
// // // import PeopleIcon from '@mui/icons-material/People';
// // // import InventoryIcon from '@mui/icons-material/Inventory';
// // // import WarningIcon from '@mui/icons-material/Warning';
// // // import AddIcon from '@mui/icons-material/Add';
// // // import VisibilityIcon from '@mui/icons-material/Visibility';
// // // import PersonAddIcon from '@mui/icons-material/PersonAdd';
// // // import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// // // import NotificationsIcon from '@mui/icons-material/Notifications';
// // // import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// // // import AccessTimeIcon from '@mui/icons-material/AccessTime';
// // // import PaymentIcon from '@mui/icons-material/Payment';
// // // import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// // // function Home() {
// // //   // Données simulées
// // //   const todayStats = {
// // //     sales: { value: '2,450', currency: 'DH', trend: 8.5, isUp: true },
// // //     orders: { value: '12', trend: -2.1, isUp: false },
// // //     clients: { value: '5', trend: 15.3, isUp: true },
// // //     lowStock: { value: '8', trend: 0, isUp: null }
// // //   };

// // //   const recentActivities = [
// // //     {
// // //       id: 1,
// // //       type: 'vente',
// // //       message: 'Vente V-2025-0027 créée pour Optique Vision Plus',
// // //       amount: '1,318.00 DH',
// // //       time: 'Il y a 5 minutes',
// // //       icon: ReceiptIcon,
// // //       color: '#22C55E'
// // //     },
// // //     {
// // //       id: 2,
// // //       type: 'client',
// // //       message: 'Nouveau client "Dr. Ahmed Bennani" ajouté',
// // //       time: 'Il y a 12 minutes',
// // //       icon: PersonAddIcon,
// // //       color: '#3B82F6'
// // //     },
// // //     {
// // //       id: 3,
// // //       type: 'stock',
// // //       message: 'Stock monture "Ray-Ban RB3025" mis à jour',
// // //       time: 'Il y a 25 minutes',
// // //       icon: InventoryIcon,
// // //       color: '#8B5CF6'
// // //     },
// // //     {
// // //       id: 4,
// // //       type: 'livraison',
// // //       message: 'Commande #1234 marquée comme livrée',
// // //       time: 'Il y a 45 minutes',
// // //       icon: LocalShippingIcon,
// // //       color: '#F59E0B'
// // //     }
// // //   ];

// // //   const topProducts = [
// // //     { name: 'Ray-Ban Aviator Classic', sold: 45, revenue: '22,500 DH' },
// // //     { name: 'Essilor Varilux Comfort', sold: 32, revenue: '19,200 DH' },
// // //     { name: 'Kit de Nettoyage Premium', sold: 28, revenue: '1,400 DH' },
// // //     { name: 'Oakley Holbrook', sold: 24, revenue: '14,400 DH' }
// // //   ];

// // //   const notifications = [
// // //     {
// // //       id: 1,
// // //       type: 'warning',
// // //       title: 'Stock faible',
// // //       message: '8 produits ont un stock insuffisant',
// // //       icon: WarningIcon,
// // //       color: '#EF4444'
// // //     },
// // //     {
// // //       id: 2,
// // //       type: 'delivery',
// // //       title: 'Livraisons du jour',
// // //       message: '3 commandes à livrer aujourd\'hui',
// // //       icon: LocalShippingIcon,
// // //       color: '#F59E0B'
// // //     },
// // //     {
// // //       id: 3,
// // //       type: 'payment',
// // //       title: 'Rappel de paiement',
// // //       message: 'Facture #INV-2025-045 en attente',
// // //       icon: PaymentIcon,
// // //       color: '#8B5CF6'
// // //     }
// // //   ];

// // //   const getCurrentDate = () => {
// // //     const options = { 
// // //       weekday: 'long', 
// // //       year: 'numeric', 
// // //       month: 'long', 
// // //       day: 'numeric' 
// // //     };
// // //     return new Date().toLocaleDateString('fr-FR', options);
// // //   };

// // //   const StatCard = ({ title, value, currency, trend, isUp, icon: Icon, color }) => (
// // //     <Paper sx={{ 
// // //       p: 3, 
// // //       borderRadius: '16px',
// // //       background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
// // //       border: `1px solid ${color}20`,
// // //       transition: 'transform 0.2s ease-in-out',
// // //       '&:hover': {
// // //         transform: 'translateY(-2px)',
// // //         boxShadow: `0 8px 25px ${color}25`
// // //       }
// // //     }}>
// // //       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
// // //         <Avatar sx={{ backgroundColor: color, width: 48, height: 48 }}>
// // //           <Icon sx={{ color: 'white' }} />
// // //         </Avatar>
// // //         {trend !== 0 && (
// // //           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
// // //             {isUp ? (
// // //               <TrendingUpIcon sx={{ color: '#22C55E', fontSize: 16 }} />
// // //             ) : (
// // //               <TrendingDownIcon sx={{ color: '#EF4444', fontSize: 16 }} />
// // //             )}
// // //             <Typography 
// // //               variant="caption" 
// // //               sx={{ 
// // //                 color: isUp ? '#22C55E' : '#EF4444',
// // //                 fontWeight: 600 
// // //               }}
// // //             >
// // //               {Math.abs(trend)}%
// // //             </Typography>
// // //           </Box>
// // //         )}
// // //       </Box>
      
// // //       <Typography variant="h3" fontWeight={700} color={color} gutterBottom>
// // //         {value} {currency && <span style={{ fontSize: '0.7em' }}>{currency}</span>}
// // //       </Typography>
      
// // //       <Typography variant="body2" color="text.secondary" fontWeight={500}>
// // //         {title}
// // //       </Typography>
// // //     </Paper>
// // //   );

// // //   return (
// // //     <Box sx={{ p: 0 }}>
// // //       {/* En-tête de bienvenue */}
// // //       <Box sx={{ mb: 4 }}>
// // //         <Typography 
// // //           variant="h3" 
// // //           fontWeight={700} 
// // //           color="#1F2937"
// // //           gutterBottom
// // //           sx={{
// // //             background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
// // //             WebkitBackgroundClip: 'text',
// // //             WebkitTextFillColor: 'transparent'
// // //           }}
// // //         >
// // //           Bienvenue sur Optics Manager
// // //         </Typography>
// // //         <Typography variant="h6" color="text.secondary" fontWeight={400}>
// // //           {getCurrentDate()}
// // //         </Typography>
// // //       </Box>

// // //       {/* Cartes de statistiques */}
// // //       <Grid container spacing={3} sx={{ mb: 4 }}>
// // //         <Grid item xs={12} sm={6} lg={3}>
// // //           <StatCard
// // //             title="Ventes du jour"
// // //             value={todayStats.sales.value}
// // //             currency={todayStats.sales.currency}
// // //             trend={todayStats.sales.trend}
// // //             isUp={todayStats.sales.isUp}
// // //             icon={ReceiptIcon}
// // //             color="#22C55E"
// // //           />
// // //         </Grid>
// // //         <Grid item xs={12} sm={6} lg={3}>
// // //           <StatCard
// // //             title="Commandes en attente"
// // //             value={todayStats.orders.value}
// // //             trend={todayStats.orders.trend}
// // //             isUp={todayStats.orders.isUp}
// // //             icon={ShoppingCartIcon}
// // //             color="#F59E0B"
// // //           />
// // //         </Grid>
// // //         <Grid item xs={12} sm={6} lg={3}>
// // //           <StatCard
// // //             title="Nouveaux clients"
// // //             value={todayStats.clients.value}
// // //             trend={todayStats.clients.trend}
// // //             isUp={todayStats.clients.isUp}
// // //             icon={PeopleIcon}
// // //             color="#3B82F6"
// // //           />
// // //         </Grid>
// // //         <Grid item xs={12} sm={6} lg={3}>
// // //           <StatCard
// // //             title="Stock faible"
// // //             value={todayStats.lowStock.value}
// // //             trend={todayStats.lowStock.trend}
// // //             isUp={todayStats.lowStock.isUp}
// // //             icon={WarningIcon}
// // //             color="#EF4444"
// // //           />
// // //         </Grid>
// // //       </Grid>

// // //       <Grid container spacing={3}>
// // //         {/* Actions rapides */}
// // //         <Grid item xs={12} lg={4}>
// // //           <Paper sx={{ p: 3, borderRadius: '16px', height: 'fit-content' }}>
// // //             <Typography variant="h6" fontWeight={700} gutterBottom color="#1F2937">
// // //               🚀 Actions Rapides
// // //             </Typography>
            
// // //             <Grid container spacing={2} sx={{ mt: 1 }}>
// // //               <Grid item xs={12}>
// // //                 <Button
// // //                   fullWidth
// // //                   variant="contained"
// // //                   startIcon={<AddIcon />}
// // //                   sx={{
// // //                     py: 1.5,
// // //                     borderRadius: '12px',
// // //                     background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
// // //                     textTransform: 'none',
// // //                     fontWeight: 600,
// // //                     fontSize: '0.95rem'
// // //                   }}
// // //                 >
// // //                   Nouvelle Vente
// // //                 </Button>
// // //               </Grid>
// // //               <Grid item xs={6}>
// // //                 <Button
// // //                   fullWidth
// // //                   variant="outlined"
// // //                   startIcon={<PersonAddIcon />}
// // //                   sx={{
// // //                     py: 1.2,
// // //                     borderRadius: '10px',
// // //                     textTransform: 'none',
// // //                     fontWeight: 500,
// // //                     borderColor: '#3B82F6',
// // //                     color: '#3B82F6'
// // //                   }}
// // //                 >
// // //                   Nouveau Client
// // //                 </Button>
// // //               </Grid>
// // //               <Grid item xs={6}>
// // //                 <Button
// // //                   fullWidth
// // //                   variant="outlined"
// // //                   startIcon={<InventoryIcon />}
// // //                   sx={{
// // //                     py: 1.2,
// // //                     borderRadius: '10px',
// // //                     textTransform: 'none',
// // //                     fontWeight: 500,
// // //                     borderColor: '#8B5CF6',
// // //                     color: '#8B5CF6'
// // //                   }}
// // //                 >
// // //                   Nouveau Produit
// // //                 </Button>
// // //               </Grid>
// // //             </Grid>
// // //           </Paper>

// // //           {/* Notifications */}
// // //           <Paper sx={{ p: 3, borderRadius: '16px', mt: 3 }}>
// // //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
// // //               <NotificationsIcon sx={{ color: '#F59E0B' }} />
// // //               <Typography variant="h6" fontWeight={700} color="#1F2937">
// // //                 Notifications
// // //               </Typography>
// // //               <Chip 
// // //                 label={notifications.length} 
// // //                 size="small" 
// // //                 sx={{ 
// // //                   backgroundColor: '#FEF3F2',
// // //                   color: '#EF4444',
// // //                   fontWeight: 600,
// // //                   fontSize: '0.75rem'
// // //                 }}
// // //               />
// // //             </Box>
            
// // //             <List sx={{ p: 0 }}>
// // //               {notifications.map((notif, index) => (
// // //                 <ListItem 
// // //                   key={notif.id} 
// // //                   sx={{ 
// // //                     px: 0,
// // //                     py: 1.5,
// // //                     borderBottom: index < notifications.length - 1 ? '1px solid #F3F4F6' : 'none'
// // //                   }}
// // //                 >
// // //                   <ListItemIcon>
// // //                     <Avatar sx={{ 
// // //                       backgroundColor: `${notif.color}15`, 
// // //                       width: 40, 
// // //                       height: 40 
// // //                     }}>
// // //                       <notif.icon sx={{ color: notif.color, fontSize: 20 }} />
// // //                     </Avatar>
// // //                   </ListItemIcon>
// // //                   <ListItemText
// // //                     primary={
// // //                       <Typography variant="body2" fontWeight={600} color="#374151">
// // //                         {notif.title}
// // //                       </Typography>
// // //                     }
// // //                     secondary={
// // //                       <Typography variant="caption" color="text.secondary">
// // //                         {notif.message}
// // //                       </Typography>
// // //                     }
// // //                   />
// // //                 </ListItem>
// // //               ))}
// // //             </List>
// // //           </Paper>
// // //         </Grid>

// // //         {/* Activité récente */}
// // //         <Grid item xs={12} lg={4}>
// // //           <Paper sx={{ p: 3, borderRadius: '16px' }}>
// // //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
// // //               <AccessTimeIcon sx={{ color: '#3B82F6' }} />
// // //               <Typography variant="h6" fontWeight={700} color="#1F2937">
// // //                 Activité Récente
// // //               </Typography>
// // //             </Box>
            
// // //             <List sx={{ p: 0 }}>
// // //               {recentActivities.map((activity, index) => (
// // //                 <ListItem 
// // //                   key={activity.id} 
// // //                   sx={{ 
// // //                     px: 0, 
// // //                     py: 2,
// // //                     borderBottom: index < recentActivities.length - 1 ? '1px solid #F3F4F6' : 'none'
// // //                   }}
// // //                 >
// // //                   <ListItemIcon>
// // //                     <Avatar sx={{ 
// // //                       backgroundColor: `${activity.color}15`, 
// // //                       width: 40, 
// // //                       height: 40 
// // //                     }}>
// // //                       <activity.icon sx={{ color: activity.color, fontSize: 20 }} />
// // //                     </Avatar>
// // //                   </ListItemIcon>
// // //                   <ListItemText
// // //                     primary={
// // //                       <Typography variant="body2" fontWeight={500} color="#374151">
// // //                         {activity.message}
// // //                       </Typography>
// // //                     }
// // //                     secondary={
// // //                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
// // //                         <Typography variant="caption" color="text.secondary">
// // //                           {activity.time}
// // //                         </Typography>
// // //                         {activity.amount && (
// // //                           <Chip 
// // //                             label={activity.amount} 
// // //                             size="small"
// // //                             sx={{ 
// // //                               backgroundColor: '#F0FDF4',
// // //                               color: '#22C55E',
// // //                               fontWeight: 600,
// // //                               fontSize: '0.7rem'
// // //                             }}
// // //                           />
// // //                         )}
// // //                       </Box>
// // //                     }
// // //                   />
// // //                 </ListItem>
// // //               ))}
// // //             </List>
// // //           </Paper>
// // //         </Grid>

// // //         {/* Produits les plus vendus */}
// // //         <Grid item xs={12} lg={4}>
// // //           <Paper sx={{ p: 3, borderRadius: '16px' }}>
// // //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
// // //               <EmojiEventsIcon sx={{ color: '#F59E0B' }} />
// // //               <Typography variant="h6" fontWeight={700} color="#1F2937">
// // //                 Top Ventes du Mois
// // //               </Typography>
// // //             </Box>
            
// // //             <List sx={{ p: 0 }}>
// // //               {topProducts.map((product, index) => (
// // //                 <ListItem 
// // //                   key={index} 
// // //                   sx={{ 
// // //                     px: 0, 
// // //                     py: 2,
// // //                     borderBottom: index < topProducts.length - 1 ? '1px solid #F3F4F6' : 'none'
// // //                   }}
// // //                 >
// // //                   <ListItemIcon>
// // //                     <Avatar sx={{ 
// // //                       backgroundColor: '#FEF3F2',
// // //                       color: '#EF4444',
// // //                       fontWeight: 700,
// // //                       width: 40,
// // //                       height: 40
// // //                     }}>
// // //                       {index + 1}
// // //                     </Avatar>
// // //                   </ListItemIcon>
// // //                   <ListItemText
// // //                     primary={
// // //                       <Typography variant="body2" fontWeight={600} color="#374151">
// // //                         {product.name}
// // //                       </Typography>
// // //                     }
// // //                     secondary={
// // //                       <Box sx={{ mt: 0.5 }}>
// // //                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
// // //                           <Typography variant="caption" color="text.secondary">
// // //                             {product.sold} vendus
// // //                           </Typography>
// // //                           <Typography variant="caption" fontWeight={600} color="#22C55E">
// // //                             {product.revenue}
// // //                           </Typography>
// // //                         </Box>
// // //                         <LinearProgress 
// // //                           variant="determinate" 
// // //                           value={(product.sold / 50) * 100} 
// // //                           sx={{
// // //                             height: 4,
// // //                             borderRadius: 2,
// // //                             backgroundColor: '#F3F4F6',
// // //                             '& .MuiLinearProgress-bar': {
// // //                               backgroundColor: '#22C55E'
// // //                             }
// // //                           }}
// // //                         />
// // //                       </Box>
// // //                     }
// // //                   />
// // //                 </ListItem>
// // //               ))}
// // //             </List>
// // //           </Paper>
// // //         </Grid>
// // //       </Grid>
// // //     </Box>
// // //   );
// // // }

// // // export default Home;



// // // // // src/pages/HomePage.js
// // // // import { Typography } from '@mui/material';
// // // // import DashboardLayout from '../Layout/DashboardLayout';

// // // // const Home = () => {

// // // //   return (

// // // //       <Typography variant="h4">
// // // //         Welcome to the Dashboard!
// // // //       </Typography>
// // // //   );
// // // // };

// // // // export default Home;