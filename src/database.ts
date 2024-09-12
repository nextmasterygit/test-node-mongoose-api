import mongoose from 'mongoose';

async function connectToDatabase() {
  mongoose
    .connect(process.env.DB as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
}

export default connectToDatabase;
