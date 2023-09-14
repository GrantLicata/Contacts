"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ContactPage = (params) => {
  const [contact, setContact] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  // Get all contacts on mount
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

  // Get the contact
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

  // Update the contact
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
    <div className="p-2 max-w-3xl mx-auto">
      <Navbar />
      <div className="bg-white rounded-lg p-4 mt-4 flex flex-col gap-5">
        <h2 className="text-xl font-bold">Edit Contact</h2>
        <div className="flex flex-col">
          <label htmlFor="first-name" className="pb-1">
            First Name
          </label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="rounded-md"
            type="text"
            id="first-name"
            alt="first name field"
            placeholder="John"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="last-name" className="pb-1">
            Last Name
          </label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="rounded-md"
            type="text"
            id="last-name"
            alt="last name field"
            placeholder="Doe"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="pb-1">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="rounded-md"
            type="text"
            id="email"
            alt="email field"
            placeholder="john@gmail.com"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="pb-1">
            Phone Number
          </label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="rounded-md"
            id="phone"
            alt="phone number field"
            placeholder="(###) ###-####"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="pb-1">
            Address
          </label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            className="rounded-md"
            id="address"
            alt="address field"
            placeholder="123 Name Street, State"
          />
        </div>
        <div className="flex gap-3 justify-center">
          <button
            className="text-white bg-green-700 opacity-80 rounded-md w-20 h-10 cursor-pointer"
            onClick={updateContact}
          >
            Update
          </button>
          <button
            className="text-white bg-red-700 opacity-80 rounded-md w-20 h-10 cursor-pointer"
            onClick={() => deleteContact(params.params.id)}
          >
            Delete
          </button>
          <button
            className="text-white bg-slate-700 opacity-80 rounded-md w-20 h-10 cursor-pointer"
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
