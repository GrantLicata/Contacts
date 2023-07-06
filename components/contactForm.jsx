"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactForm(props) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
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
        fullname,
        email,
        message,
      }),
    }).then(setFullname(""), setEmail(""), setMessage(""));

    // Receive a message statement and success response from our api call
    const { msg, success } = await res.json();
    setError(msg);
    setSuccess(success);
    getData();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <div>
          <label htmlFor="fullname">Full name</label>
          <input
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            type="text"
            id="fullname"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="fullname">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="email"
            placeholder="john@gmail.com"
          />
        </div>
        <div>
          <label htmlFor="message">Your Message</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="h-32"
            id="message"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <button className="bg-green-700 p-3 text-white font-bold" type="submit">
          Send
        </button>
      </form>
      <div className="bg-slate-100 flex flex-col">
        {error &&
          error.map((e) => (
            <div
              key={e._id}
              className={`${success ? "hidden" : "text-red-600"} px-5 py-2`}
            >
              {e}
            </div>
          ))}
      </div>
    </>
  );
}
