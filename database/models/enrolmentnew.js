import mongoose from "mongoose";
import connectDB from '../connection2';

connectDB(); // Make sure the connection is established
const enrolmentSchema = new mongoose.Schema(
  {
    bought_price: Number,
    payment_method: String,
    buyer_name: String,
    buyer_email: String,
    buyer_avatar: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserMongo", // Replace with the actual reference model name
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseMongo", // Replace with the actual reference model name
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid"],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "enrolments",
  }
);
// Check if the model has already been defined
const EnrolmentMongo = mongoose.models.EnrolmentMongo
  ? mongoose.model('EnrolmentMongo')
  : mongoose.model('EnrolmentMongo', enrolmentSchema);


export default EnrolmentMongo;
