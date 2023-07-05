import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/contact";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  // Receive the id parameters entered into the API path upon request
  const { id } = params;

  try {
    // Connect to the database
    await connectDB();
    //Find delete the contact by specified id
    await Contact.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
}
