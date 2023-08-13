import connectDB from "@/app/lib/mongodb";
import Contact from "@/app/models/Contact";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectDB();
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
  const { firstName, lastName, email, phone, address } = await request.json();
  await connectDB();
  await Contact.findByIdAndUpdate(id, {
    firstName,
    lastName,
    email,
    phone,
    address,
  });
  return new NextResponse("Post has been updated", { status: 200 });
}
