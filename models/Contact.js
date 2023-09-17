import mongoose, { Schema } from "mongoose";

// Define contact schema for database
const contactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
