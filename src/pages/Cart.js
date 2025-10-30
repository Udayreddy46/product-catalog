import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Divider,
  Chip,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useContext(CartContext);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert('🎉 Checkout functionality would be implemented here!\nTotal: $' + getTotalPrice().toFixed(2));
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', py: 4, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <IconButton onClick={() => navigate('/')} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 700, flexGrow: 1 }}>
            Shopping Cart
          </Typography>
          {cart.length > 0 && (
            <Button 
              variant="outlined" 
              color="error" 
              onClick={clearCart}
              startIcon={<DeleteIcon />}
            >
              Clear Cart
            </Button>
          )}
        </Box>

        {cart.length === 0 ? (
          // Empty Cart State
          <Paper 
            elevation={0} 
            sx={{ 
              p: 8, 
              textAlign: 'center', 
              borderRadius: 3,
              backgroundColor: 'background.paper' 
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight={600}>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Start shopping to add items to your cart
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/')}
              startIcon={<ArrowBackIcon />}
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          // Cart with Items
          <Grid container spacing={3}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Cart Items ({cart.length})
                </Typography>

                {cart.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        mb: 2, 
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ 
                          width: { xs: '100%', sm: 150 },
                          height: { xs: 200, sm: 150 },
                          objectFit: 'contain',
                          p: 2,
                          backgroundColor: 'background.default',
                        }}
                        image={item.image}
                        alt={item.title}
                      />
                      
                      <CardContent sx={{ flex: 1, p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, flex: 1 }}>
                            {item.title}
                          </Typography>
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => removeFromCart(item.id)}
                            sx={{ ml: 1 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>

                        <Chip 
                          label={item.category.toUpperCase()} 
                          size="small" 
                          sx={{ mb: 2 }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <TextField
                              size="small"
                              value={item.quantity}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 1;
                                handleQuantityChange(item.id, value);
                              }}
                              inputProps={{ 
                                min: 1, 
                                style: { textAlign: 'center', width: '60px' } 
                              }}
                              type="number"
                            />
                            <IconButton 
                              size="small" 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>

                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" color="text.secondary">
                              ${item.price.toFixed(2)} × {item.quantity}
                            </Typography>
                            <Typography variant="h6" color="primary" fontWeight={700}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                    {index < cart.length - 1 && <Divider sx={{ my: 2 }} />}
                  </React.Fragment>
                ))}
              </Paper>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 80 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Order Summary
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Subtotal:
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ${getTotalPrice().toFixed(2)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Shipping:
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="success.main">
                      FREE
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Tax (10%):
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      ${(getTotalPrice() * 0.1).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight={700}>
                    Total:
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight={700}>
                    ${(getTotalPrice() * 1.1).toFixed(2)}
                  </Typography>
                </Box>

                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  onClick={handleCheckout}
                  sx={{ mb: 2 }}
                >
                  Proceed to Checkout
                </Button>

                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </Button>

                <Box sx={{ mt: 3, p: 2, backgroundColor: 'background.default', borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    🔒 Secure checkout - Your payment information is protected
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
