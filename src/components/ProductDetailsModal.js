import React, { useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Rating,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../context/CartContext';

const ProductDetailsModal = ({ product, open, onClose }) => {
  const { addToCart } = useContext(CartContext);

  if (!product) return null;

  const handleAddToCart = () => {
    const success = addToCart(product);
    if (!success) {
      alert('This product is already in your cart!');
    } else {
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="span" fontWeight={700}>
          Product Details
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {/* Product Image */}
          <Box 
            sx={{ 
              flex: { xs: '1 1 auto', md: '0 0 300px' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              p: 2,
              backgroundColor: 'background.default',
              borderRadius: 2,
            }}
          >
            <img 
              src={product.image} 
              alt={product.title}
              style={{ 
                width: '100%', 
                maxWidth: '280px',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>

          {/* Product Info */}
          <Box sx={{ flex: 1 }}>
            <Chip 
              label={product.category.toUpperCase()} 
              size="small" 
              color="primary"
              sx={{ mb: 2 }}
            />

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              {product.title}
            </Typography>

            {product.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating value={product.rating.rate} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary">
                  {product.rating.rate} / 5 ({product.rating.count} reviews)
                </Typography>
              </Box>
            )}

            <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 3 }}>
              ${product.price.toFixed(2)}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
              <strong>Description:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {product.description}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button 
          onClick={handleAddToCart} 
          variant="contained" 
          startIcon={<ShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailsModal;
