import mongoose from 'mongoose';
import connectDB from '../connection2'; // Import the connection function

// Establish the MongoDB connection
connectDB();
const CourseAssetSchema = new mongoose.Schema(
  {
    lecture_name: {
      type: String,
    },
    lecture_file: {
      type: String,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

const CourseAssetMongo = mongoose.models.CategoryMongo || mongoose.model('CourseAssetMongo', CourseAssetSchema);

export default CourseAssetMongo;
