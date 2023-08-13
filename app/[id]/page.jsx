"use client";

import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ContactPage = (params) => {
  const [contact, setContact] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  // Gather data and assign to variables
  useEffect(() => {
    getContact(params.params.id);
  }, []);

  const deleteContact = async (id) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getContact = async (id) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        cache: "no-store",
      });
      const contactData = await res.json();
      setContact(contactData);
      setFirstName(contactData.firstName || "");
      setLastName(contactData.lastName || "");
      setEmail(contactData.email || "");
      setPhone(contactData.phone || "");
      setAddress(contactData.address || "");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (e) => {
    try {
      const res = await fetch(`/api/contact/${params.params.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          address,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    router.push("/");
  };

  return (
    <div className="flex justify-center pt-5">
      <div className="bg-slate-200 rounded-lg py-4 px-7 mt-4 border-t flex flex-col justify-between m-2 gap-6">
        <div className="flex flex-col gap-2">
          <input
            className="placeholder:text-slate-700 rounded-sm border-none"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <input
            className="placeholder:text-slate-700 rounded-sm border-none"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <input
            className="placeholder:text-slate-700 rounded-sm border-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="placeholder:text-slate-700 rounded-sm border-none"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <input
            className="placeholder:text-slate-700 rounded-sm border-none"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div className="flex flex-row gap-3 justify-center">
          <button
            className="text-white bg-green-700 opacity-80 rounded-md w-20 h-8 cursor-pointer"
            onClick={updateContact}
          >
            Update
          </button>
          <button
            className="text-white bg-red-700 opacity-80 rounded-md w-20 h-8 cursor-pointer"
            onClick={() => deleteContact(params.params.id)}
          >
            Delete
          </button>
          <button
            className="text-white bg-slate-700 opacity-80 rounded-md w-20 h-8 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
