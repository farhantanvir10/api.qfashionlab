const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        if (connection) {
            console.log('Database connected successfully');
        }
    } catch (e) {
        console.log('Error connecting to database', e);
    }
};
module.exports = connectDB;
