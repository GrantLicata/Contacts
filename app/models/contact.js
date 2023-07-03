import mongoose, { Schema } from "mongoose";

// Define contact schema for database
const contactSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minLength: [2, "Name must have more than 2 characters"],
    maxLength: [50, "Name must have less than 50 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
  },

  message: {
    type: String,
    required: [true, "Message is required"],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
