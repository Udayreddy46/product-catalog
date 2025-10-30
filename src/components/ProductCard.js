import React, { useContext } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product, onViewDetails }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const success = addToCart(product);
    if (!success) {
      alert('This product is already in your cart!');
    }
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={product.image}
        alt={product.title}
        sx={{ 
          objectFit: 'contain', 
          p: 2, 
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }}
        onClick={() => onViewDetails(product)}
      />
      
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Chip 
            label={product.category.toUpperCase()} 
            size="small" 
            color="primary" 
            variant="outlined"
            sx={{ fontSize: '0.7rem' }}
          />
          {product.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Rating value={product.rating.rate} precision={0.1} size="small" readOnly />
              <Typography variant="caption" color="text.secondary">
                ({product.rating.count})
              </Typography>
            </Box>
          )}
        </Box>

        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1rem', 
            mb: 1,
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '3em',
            cursor: 'pointer',
            '&:hover': {
              color: 'primary.main',
            }
          }}
          onClick={() => onViewDetails(product)}
        >
          {product.title}
        </Typography>

        <Typography 
          variant="h5" 
          color="primary" 
          sx={{ fontWeight: 700 }}
        >
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onViewDetails(product)}
          sx={{ minWidth: '44px', p: '6px' }}
        >
          <InfoIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
