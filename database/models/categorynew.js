import mongoose from 'mongoose';
import connectDB from '../connection2'; // Import the connection function

// Establish the MongoDB connection
connectDB();

const categorySchema = new mongoose.Schema(
  {
    name: String,
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'categories',
  }
);

// Use the existing mongoose instance to define the model
const CategoryMongo = mongoose.models.CategoryMongo || mongoose.model('CategoryMongo', categorySchema);

export default CategoryMongo;
