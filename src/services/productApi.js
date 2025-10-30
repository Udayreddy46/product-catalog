import axios from 'axios';

// Using DummyJSON API - Free API with 100+ products across 30+ categories
// Includes: smartphones, laptops, fragrances, skincare, groceries, furniture, etc.

// Get all products
export const getTrendingProducts = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=100');
    
    // Transform to our format
    return response.data.products.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/300',
      category: product.category,
      description: product.description,
      rating: {
        rate: product.rating || 4.0,
        count: product.reviews?.length || Math.floor(Math.random() * 500) + 50
      },
      stock: product.stock,
      brand: product.brand,
      discount: product.discountPercentage
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products/categories');
    // DummyJSON returns category objects, extract just the slug
    return response.data.map(cat => cat.slug || cat);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

