const express = require('express');
const route = express.Router();
const upload = require('../middleWare/product.middleware');
const { protect } = require('../middleWare/admin.middleware');

const {
    uploadProduct,
    getProduct,
    editProduct,
    deleteProduct,
    getAllProducts,
    getSingleProduct,
} = require('../controller/product.controller');

// Admin Routes
route.get('/products', protect, getProduct); // Admin gets all products
route.post('/products', protect, upload.single('productImage'), uploadProduct);
route.put('/products/:id', protect, upload.single('productImage'), editProduct);
route.delete('/products/:id', protect, deleteProduct);

// Public Routes
route.get('/getAllProducts', getAllProducts);
route.get('/getProduct/:id', getSingleProduct);

module.exports = route;
