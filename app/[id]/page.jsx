"use client";

import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ContactPage = (params) => {
  const router = useRouter();

  // Send a delete request for the id passed into the function
  const deleteUserCard = async (id) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.log(err);
    }
    router.push("/");
  };

  // API request for a specified contact given a provided ID
  const getData = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/contact/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to retrieve data");
      }

      return res.json();
    } catch (error) {}
  };

  //todo: Update function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Contact the database and update the contact document
    try {
      const res = await fetch(
        `http://localhost:3000/api/contact/${params.params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            newFullname: fullname,
            newEmail: email,
            newMessage: message,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update contact");
      }
    } catch (error) {
      console.log(error);
    }
    router.push("/");
  };

  // Form values
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");

  // Gather data and assign to variables
  useEffect(() => {
    getData(params.params.id).then((data) => {
      setData(data);
      setFullname(data.fullname);
      setEmail(data.email);
      setMessage(data.message);
    });
  }, []);

  return (
    <div className="flex justify-center pt-5">
      <div className="bg-slate-200 rounded-lg py-4 px-7 mt-4 border-t flex justify-between m-2 gap-6">
        <div className="flex flex-col gap-2 ">
          <input
            className="placeholder:text-slate-700 rounded-sm border-none"
            placeholder={data.fullname}
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />
          <input
            className="placeholder:text-slate-700 rounded-sm border-none"
            placeholder={data.email}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="placeholder:text-slate-700 rounded-sm border-none"
            placeholder={data.message}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <button
            className="text-white bg-green-700 opacity-80 rounded-md w-20 h-8 cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="text-white bg-red-700 opacity-80 rounded-md w-20 h-8 cursor-pointer"
            onClick={() => deleteUserCard(data._id)}
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
