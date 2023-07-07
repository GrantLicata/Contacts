"use client";

import ContactCard from "@/app/components/contactCard";
import ContactForm from "@/app/components/contactForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);

  // Function for gathering all contacts
  const getData = async () => {
    const res = await fetch("api/contact", {
      method: "GET",
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      setData(data);
    } else {
      setErr(true);
    }
  };

  // Gather all contacts on first mount
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Contact Manager</h1>
      <p>Enter your new contact here</p>
      <ContactForm getData={getData} />
      {data.map((contact) => (
        <ContactCard
          key={contact._id}
          fullname={contact.fullname}
          email={contact.email}
          message={contact.message}
          id={contact._id}
          getData={getData}
        />
      ))}
    </div>
  );
}
