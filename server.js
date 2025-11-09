const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');

const sellerLogin = require('./routes/sellerLoginRoute');
const sellerProductUpload = require('./routes/sellerProductUploadRoute');

const PORT = process.env.PORT || 3000;
// const __dirname = path.resolve();

const app = express();
app.use(express.json());

const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://qfashionlab.vercel.app"  // ✅ specific origin
    : "http://localhost:5173";


console.log("Origin : ", allowedOrigin);

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
app.use('/api/sellerLogin', sellerLogin);
app.use('/api/sellerProductUpload', sellerProductUpload);

// make ready for deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    db();
    console.log('Server is running on port:' + PORT);
});
