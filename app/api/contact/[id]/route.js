import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  // Receive the following data from the api request
  const { id } = params;

  try {
    // Connect to the database
    await connectDB();
    //Find delete the specified contact
    await Contact.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
}
