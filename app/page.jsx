"use client";

import ContactCard from "@/components/contactCard";
import ContactForm from "@/components/contactForm";
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

    if (!res.ok) {
      setErr(true);
    }

    const data = await res.json();

    setData(data);
    console.log(data);
  };

  // Gather all contacts on first mount
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p>Please fill in the form below</p>
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
