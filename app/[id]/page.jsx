"use client";

import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

const ContactPage = async (params) => {
  const router = useRouter();
  // Form values
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // API request for a specified contact given a provided ID
  const getData = async (id) => {
    const res = await fetch(`http://localhost:3000/api/contact/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return notFound();
    }
    return res.json();
  };

  // Gather data and assign to variable
  const data = await getData(params.params.id);

  return (
    <div className="flex justify-center pt-5">
      <div className="bg-slate-200 rounded-lg py-4 px-7 mt-4 border-t flex justify-between m-2 gap-6">
        <div className="flex flex-col gap-2 ">
          <input
            className="placeholder:text-slate-700 rounded-sm border-none"
            placeholder={data.fullname}
          />
          <input
            className="placeholder:text-slate-700 rounded-sm border-none"
            placeholder={data.email}
          />
          <input
            className="placeholder:text-slate-700 rounded-sm border-none"
            placeholder={data.message}
          />
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <button
            className="text-white bg-green-700 opacity-80 rounded-md w-20 h-8 cursor-pointer"
            type="submit"
          >
            Submit
          </button>
          <button
            className="text-white bg-red-700 opacity-80 rounded-md w-20 h-8 cursor-pointer"
            onClick={() => deleteUserCard(data.id)}
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
