import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  InputAdornment,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import { getTrendingProducts, getCategories } from '../services/productApi';

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch all products once on mount
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const products = await getTrendingProducts();
      setAllProducts(products);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategoriesData = async () => {
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Initial load - fetch data once
  useEffect(() => {
    fetchCategoriesData();
    fetchAllProducts();
  }, []); // Only run once on mount

  // Filter products based on search and category
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchTerm && searchTerm.trim() !== '') {
      // Split search term into individual words and remove empty strings
      const searchWords = searchTerm.toLowerCase().trim().split(/\s+/).filter(word => word.length > 0);
      
      filtered = filtered.filter(p => {
        const productText = [
          p.title,
          p.description,
          p.brand,
          p.category
        ].filter(Boolean).join(' ').toLowerCase();
        
        // Return true if ANY search word is found in the product text
        return searchWords.some(word => productText.includes(word));
      });
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => 
        p.category?.toLowerCase().replace(/-/g, ' ').includes(selectedCategory.toLowerCase().replace(/-/g, ' ')) ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, allProducts]);

  // Handle search button click
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle View Details
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Product Catalog
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Browse and search through our collection of quality products
          </Typography>
        </Box>

        {/* Search & Category Filter */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                label="Search products"
                placeholder="e.g., shoes, laptop, phone, furniture..."
                variant="outlined"
                fullWidth
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSearch}
                startIcon={<SearchIcon />}
                sx={{ height: '56px' }}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={6} md={1}>
              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={handleClearSearch}
                sx={{ height: '56px' }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Product Cards */}
        {!loading && !error && (
          <>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
            </Typography>
            
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} onViewDetails={handleViewDetails} />
                </Grid>
              ))}
            </Grid>

            {filteredProducts.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No products found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your search or filter criteria
                </Typography>
              </Box>
            )}
          </>
        )}

        {/* Product Details Modal */}
        <ProductDetailsModal
          product={selectedProduct}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      </Container>
    </Box>
  );
};

export default ProductList;
