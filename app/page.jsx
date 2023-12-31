"use client";

import ContactCard from "@/components/ContactCard";
import ContactList from "@/components/ContactList";
ContactCard;
import CreateForm from "@/components/CreateForm";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ContactManager() {
  const [data, setData] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const { data: session, status } = useSession({
    required: true,
  });

  console.log(currentUser);

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

  // Delete specified contact
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    getData();
  };

  // Get all contacts on mount
  useEffect(() => {
    getData();
    console.log(session);
  }, []);

  return (
    <div className="p-2 max-w-3xl mx-auto">
      <Navbar />
      <CreateForm getData={getData} />
      <hr className="h-[2px] my-4 bg-slate-50 border-0" />
      <ContactList data={data} getData={getData} />
    </div>
  );
}
