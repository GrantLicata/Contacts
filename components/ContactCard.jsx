import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ContactCard = (props) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    id,
    getData,
    handleDelete,
  } = props;
  const router = useRouter();

  return (
    <div className="bg-slate-200 rounded-lg py-4 px-3 mt-4 border-t flex justify-between">
      <div>
        <h3 className="font-bold">
          {firstName} {lastName}
        </h3>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{address}</p>
      </div>
      <div className="flex flex-col gap-3 justify-center">
        <button
          className="text-white bg-slate-700 opacity-80 rounded-md w-20 h-10 cursor-pointer active:outline-blue-500"
          onClick={() => router.push(`/${id}`)}
        >
          Edit
        </button>
        <button
          className="text-white bg-red-700 opacity-80 rounded-md w-20 h-10 cursor-pointer active:outline-blue-500"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
