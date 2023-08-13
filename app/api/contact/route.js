import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { firstName, lastName, email, phone, address } = await req.json();

  try {
    await connectDB();
    await Contact.create({ firstName, lastName, email, phone, address });

    return NextResponse.json({
      msg: ["Message sent successfully"],
      success: true,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET() {
  try {
    await connectDB();
    const response = await Contact.find({}).sort({ updatedAt: -1 });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
}
