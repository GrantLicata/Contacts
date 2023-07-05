import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Receive the following data from the api request
  const { fullname, email, message } = await req.json();

  try {
    // Connect to the database
    await connectDB();
    // Create contact object from model
    await Contact.create({ fullname, email, message });

    // Return a message if successful
    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      // Loop through all the errors and push the error messages to an error list
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      // Send the error list to the console
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      return NextResponse.json(error);
    }
  }
}

export async function GET() {
  try {
    // Connect to the database
    await connectDB();
    // Gather all contacts from the database using mongoose .find method
    const response = await Contact.find({});
    // Return the json-ified version of this response
    return NextResponse.json(response);
  } catch (error) {
    // If an error occurs, return the error data
    return NextResponse.json(error);
  }
}
