"use client";

import ContactCard from "@/components/ContactCard";
import CreateForm from "@/components/CreateForm";
import { useEffect, useState } from "react";

export default function ContactManager() {
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
      <hr className="h-[2px] my-4 bg-gray-200 border-0"></hr>

      {data && data.length > 0 ? (
        data.map((contact) => (
          <div className="grid grid-cols-2 gap-4 mt-4" key={contact._id}>
            <ContactCard
              firstName={contact.firstName}
              lastName={contact.lastName}
              email={contact.email}
              phone={contact.phone}
              address={contact.address}
              id={contact._id}
              getData={getData}
              handleDelete={handleDelete}
            />
          </div>
        ))
      ) : (
        <p className="bg-slate-600 text-white rounded-md p-3 mt-4">
          No Contacts Available
        </p>
      )}
    </div>
  );
}
