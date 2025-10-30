# 🛒 Product Catalog App

A modern, responsive React.js application that displays products from the DummyJSON API with advanced features including category filtering, search, shopping cart, product details modal, and theme switching.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-5.14-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Core Features
- ✅ **Product Listing**: Display products in responsive, modern cards
- ✅ **Category Filter**: Filter products by category
- ✅ **Search Functionality**: Real-time search by product name
- ✅ **Shopping Cart**: Add/remove items with localStorage persistence
- ✅ **Responsive Design**: Mobile-first, works on all screen sizes

### Bonus Features Implemented
- 🎯 **Product Details Modal**: View full product information in a beautiful modal
- 🛍️ **Advanced Cart Page**: 
  - Quantity management (increase/decrease)
  - Remove individual items
  - Clear entire cart
  - Calculate subtotal, tax, and total
  - Order summary sidebar
- 🌓 **Dark/Light Mode**: Toggle between themes with persistence
- ⭐ **Product Ratings**: Display ratings and review counts
- 🎨 **Modern UI**: Smooth animations, hover effects, and professional design

## 🚀 Tech Stack

- **React.js** (18.2.0) - Functional components with hooks
- **React Router** (6.20.0) - Client-side routing
- **Material-UI** (5.14) - UI component library
- **Axios** - HTTP client for API calls
- **Context API** - State management for cart and theme
- **localStorage** - Persistent cart and theme storage
- **DummyJSON API** - 100+ products across 30+ categories

## 📁 Project Structure

```
product-catalog/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js                 # Navigation with cart badge and theme toggle
│   │   ├── ProductCard.js            # Individual product card component
│   │   └── ProductDetailsModal.js    # Product details modal dialog
│   ├── context/
│   │   ├── CartContext.js            # Cart state management
│   │   └── ThemeContext.js           # Theme state management (light/dark)
│   ├── pages/
│   │   ├── ProductList.js            # Main product listing page
│   │   └── Cart.js                   # Shopping cart page
│   ├── services/
│   │   └── productApi.js             # API integration with DummyJSON
│   ├── App.js                        # Main app with routing
│   └── index.js                      # Entry point
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step 1: Clone or Download the Project
```bash
cd product-catalog
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- @mui/material
- @mui/icons-material
- @emotion/react
- @emotion/styled

### Step 3: Start the Development Server
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Step 4: Build for Production
```bash
npm run build
```

## 🎯 API Integration

**Provider**: DummyJSON API
**Base URL**: `https://dummyjson.com`

### Endpoints Used:
- `GET /products?limit=100` - Fetch all products
- `GET /products/categories` - Fetch all categories

### Features:
- 100+ products across 30+ categories
- Real product data including smartphones, laptops, fragrances, skincare, groceries, furniture, etc.
- Product details include ratings, stock, brand, and discount information
- Client-side search and filtering for fast performance

## 📱 Features Walkthrough

### 1. Home Page (Product Listing)
- Displays all products in a responsive grid (4 columns on desktop, 1 on mobile)
- **Smart Search**: Searches across title, description, brand, and category
  - Splits search terms by words (e.g., "pants girls dresses" finds all matching items)
  - Real-time filtering
- Category dropdown to filter by category
- Product cards show:
  - Product image
  - Title (truncated)
  - Category badge
  - Star rating with review count
  - Price with discount percentage
  - "Add to Cart" and "View Details" buttons

### 2. Product Details Modal
- Opens when clicking on product image or info button
- Shows:
  - Large product image
  - Full title and description
  - Category badge
  - Detailed rating information
  - Price
  - Add to Cart button

### 3. Shopping Cart Page
- **Empty State**: Shows message and "Continue Shopping" button
- **With Items**:
  - List of cart items with images
  - Quantity controls (increment/decrement)
  - Remove individual items
  - Clear entire cart
  - **Order Summary Sidebar**:
    - Subtotal
    - Free shipping indicator
    - Tax calculation (10%)
    - Total price
    - Checkout button
    - Continue shopping button

### 4. Theme Toggle
- Light/Dark mode switch in navbar
- Persists across sessions
- Smooth transitions between themes

## 💾 LocalStorage Implementation

### Cart Storage
```javascript
// Cart items stored as JSON array
localStorage.setItem('cart', JSON.stringify(cart));
```

### Theme Storage
```javascript
// Theme mode stored as string ('light' or 'dark')
localStorage.setItem('themeMode', mode);
```

## 🎨 Responsive Design

- **Mobile** (< 600px): 1 column grid
- **Tablet** (600px - 960px): 2 column grid
- **Desktop** (960px - 1280px): 3 column grid
- **Large Desktop** (> 1280px): 4 column grid

## 🏆 Key Features

| Feature | Implementation |
|---------|----------------|
| Code Structure | ✅ Modular components, Context API, clean architecture |
| API Integration | ✅ DummyJSON API with Axios, smart multi-word search |
| Filtering | ✅ Category filtering + advanced search across multiple fields |
| Responsive Design | ✅ Material-UI Grid, mobile-first approach |
| UI/UX | ✅ Modern design, smooth animations, dark mode support |

## 🎁 Bonus Features Checklist

- ✅ View Details Modal
- ✅ Cart Page with React Router
- ✅ Quantity Management
- ✅ Total Price Calculation
- ✅ Light/Dark Mode Toggle
- ✅ Rating Display
- ✅ Smooth Animations
- ✅ Loading States
- ✅ Error Handling
- ✅ Empty State Designs

## 🐛 Error Handling

- API errors are caught and displayed to users
- Loading states during data fetching
- Form validation for quantity inputs
- Duplicate cart item prevention

## 🚀 Future Enhancements

- [ ] User authentication
- [ ] Wishlist functionality
- [ ] Product reviews and ratings submission
- [ ] Advanced filtering (price range, ratings)
- [ ] Sorting options (price, rating, popularity)
- [ ] Payment gateway integration
- [ ] Order history
- [ ] Product comparison

## 💻 Technical Highlights

1. **Clean Code**: Well-organized, readable, and maintainable
2. **React Best Practices**: Hooks, Context API, component composition
3. **Modern UI/UX**: Material-UI, responsive design, accessibility
4. **State Management**: Context API for global state (cart & theme)
5. **Routing**: React Router for SPA navigation
6. **API Integration**: Proper error handling and loading states
7. **Smart Search**: Multi-word search with filtering across all product fields
8. **Persistence**: localStorage for cart and theme preferences

## 📄 License

MIT License - Feel free to use this project for learning and portfolio purposes.

---

### 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests (if implemented)
npm test
```

### 🌐 Live Demo
After running `npm start`, visit: **http://localhost:3000**

---

**Thank you for reviewing this project! 🚀**
