
import {mongoose} from "mongoose";
import connectDB from '../connection2';

connectDB(); // Make sure the connection is established
const courseSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    short_desc: String,
    overview: String,
    latest_price: Number,
    before_price: Number,
    lessons: String,
    duration: String,
    image: String,
    access_time: {
      type: String,
      enum: ["Lifetime", "Three Months", "Six Months", "1 Year"],
      default: "Lifetime",
    },
    requirements: String,
    what_you_will_learn: String,
    who_is_this_course_for: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserMongo", // Replace with the actual reference model
      required: true,
    },
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Replace with the actual reference model
      required: true,
    },
    approved: Boolean,
    in_home_page: Boolean,
    in_home_page_set_at: Date,
    is_class: Boolean,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "courses",
  }
);


// Check if the model has already been defined
const CourseMongo = mongoose.models.CourseMongo
  ? mongoose.model('CourseMongo')
  : mongoose.model('CourseMongo', courseSchema);
export default CourseMongo;
