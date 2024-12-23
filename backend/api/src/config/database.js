import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
        });
        console.log('Conectado con éxito a MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
};

export default connectDB;