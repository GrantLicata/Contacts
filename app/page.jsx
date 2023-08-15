"use client";

import ContactCard from "@/components/ContactCard";
import CreateForm from "@/components/CreateForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

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
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Create Contact</h1>
      <p>Enter your new contact below</p>
      <CreateForm getData={getData} />
      {data.map((contact) => (
        <ContactCard
          key={contact._id}
          firstName={contact.firstName}
          lastName={contact.lastName}
          email={contact.email}
          phone={contact.phone}
          address={contact.address}
          id={contact._id}
          getData={getData}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
