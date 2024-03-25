import mongoose from "mongoose";
// Use the connection to check if the model already exists before defining it
import connectDB from '../connection2';
connectDB(); // Make sure the connection is established



const UserMongo =  mongoose.models.UserMongo || mongoose.model(
    "UserMongo",
    new mongoose.Schema(
      {
        first_name: {
          type: String,
          default: "",
        },
        last_name: {
          type: String,
          default: "",
        },
        email: {
          type: String,
          default: "",
        },
        password: {
          type: String,
          default: "",
        },
        gender: {
          type: String,
          default: "",
        },
        designation: {
          type: String,
          default: "",
        },
        bio: {
          type: String,
          default: "",
        },
        profile_photo: {
          type: String,
          default: "",
        },
        location: {
          type: String,
          default: "",
        },
        phone: {
          type: String,
          default: "",
        },
        reset_password_token: {
          type: String,
          default: "",
        },
        reset_password_send_at: {
          type: Date,
          default: null,
        },
        reset_password_at: {
          type: Date,
          default: null,
        },
        website: {
          type: String,
          default: "",
        },
        twitter: {
          type: String,
          default: "",
        },
        facebook: {
          type: String,
          default: "",
        },
        linkedin: {
          type: String,
          default: "",
        },
        youtube: {
          type: String,
          default: "",
        },
        role: {
          type: String,
          enum: ["student", "admin", "instructor"],
          default: "student",
        },
        email_confirmed: {
          type: Boolean,
          default: false,
        },
        email_confirmed_at: {
          type: Date,
          default: null,
        },
        instructor_request: {
          type: Boolean,
          default: false,
        },
        instructor_request_confirmed: {
          type: Boolean,
          default: false,
        },
        instructor_request_confirmed_at: {
          type: Date,
          default: null,
        },
        instructor_status: {
          type: Boolean,
          default: false,
        },
        instructor_subject: {
          type: String,
          default: "",
        },
        instructor_description: {
          type: String,
          default: "",
        },
        status: {
          type: Boolean,
          default: true,
        },
        is_profile_public: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        collection: "users",
      }
    )
  );


export default UserMongo;
