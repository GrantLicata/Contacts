"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);

  const { getData } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a new contact document to our database
    const res = await fetch("api/contact", {
      method: "POST",
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
    }).then(
      setFirstName(""),
      setLastName(""),
      setEmail(""),
      setPhone(""),
      setAddress("")
    );

    // Receive a message statement and success response from our api call
    const { msg, success } = await res.json();
    getData();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <div>
          <label htmlFor="first-name">First Name</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            type="text"
            id="first-name"
            alt="first name field"
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            type="text"
            id="last-name"
            alt="last name field"
            placeholder="Doe"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="email"
            alt="email field"
            placeholder="john@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            id="phone"
            alt="phone number field"
            placeholder="(###) ###-####"
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            id="address"
            alt="address field"
            placeholder="123 Name Street, State"
          />
        </div>

        <button
          className="bg-green-700 p-3 text-white font-bold rounded-md"
          type="submit"
          alt="save contact"
        >
          Save
        </button>
      </form>
    </>
  );
}
