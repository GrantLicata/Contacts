import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/Contact";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
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

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connectDB();

    const contact = await Contact.findById(id);

    return new NextResponse(JSON.stringify(contact), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newFullname: fullname,
    newEmail: email,
    newMessage: message,
  } = await request.json();
  await connectDB();
  await Contact.findByIdAndUpdate(id, { fullname, email, message });
  return new NextResponse("Post has been updated", { status: 200 });
}
