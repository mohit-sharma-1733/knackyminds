import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/learning_app';
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
