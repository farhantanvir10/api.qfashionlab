const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors');
const dotenv = require('dotenv');

const adminRoutes = require('../routes/admin.route');
const productRoutes = require('../routes/product.route');

dotenv.config();
const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.ORIGIN || 'http://localhost:5173';

const app = express();
connectDB();
app.use(express.json());

const allowedOrigin =
    process.env.NODE_ENV === 'production'
        ? ORIGIN // ✅ specific origin
        : 'http://localhost:5173';

app.use(
    cors({
        origin: allowedOrigin,
        credentials: true,
    })
);

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

app.use('/api/admin', adminRoutes);
app.use('/api', productRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Backend Server Online...' });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log('Server is running on http://localhost:' + PORT);
    });
}

module.exports = app;
