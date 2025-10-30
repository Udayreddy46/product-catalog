import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Tooltip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const { getTotalItems } = useContext(CartContext);

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          🛒 Product Catalog
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Toggle light/dark mode">
            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>

          {location.pathname === '/cart' ? (
            <Tooltip title="Home">
              <IconButton color="inherit" onClick={() => navigate('/')}>
                <HomeIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="View Cart">
              <IconButton color="inherit" onClick={() => navigate('/cart')}>
                <Badge badgeContent={getTotalItems()} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
