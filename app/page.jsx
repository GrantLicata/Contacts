"use client";

import ContactList from "@/components/ContactList";
import CreateForm from "@/components/CreateForm";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ContactManager() {
  const [data, setData] = useState([]);

  const { data: session } = useSession({
    required: true,
  });

  // Get all contacts
  const getData = async () => {
    const res = await fetch("api/contact", {
      method: "GET",
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      setData(data);
    }
  };

  // Get all contacts on mount
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Navbar />
      <CreateForm getData={getData} />
      <hr className="h-[2px] my-4 bg-slate-50 border-0" />
      <ContactList data={data} getData={getData} />
    </div>
  );
}
