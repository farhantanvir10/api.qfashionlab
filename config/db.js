const mongoose = require('mongoose');
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return; // Already connected
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            maxPoolSize: 10,
            bufferCommands: true,
        });
        if (connection) {
            console.log('Database connected successfully');
        }
    } catch (e) {
        console.log('Error connecting to database', e);
        process.exit(1);
    }
};
module.exports = connectDB;
