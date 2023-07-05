"use client";

import ContactCard from "@/components/contactCard";
import ContactForm from "@/components/contactForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);

  // Gather contacts upon loading of the page
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("api/contact", {
        cache: "no-store",
      });

      if (!res.ok) {
        setErr(true);
      }

      const data = await res.json();

      setData(data);
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p>Please fill in the form below</p>
      <ContactForm />
      {data.map((contact) => (
        <ContactCard
          key={contact._id}
          fullname={contact.fullname}
          email={contact.email}
          message={contact.message}
          id={contact.id}
        />
      ))}
    </div>
  );
}
