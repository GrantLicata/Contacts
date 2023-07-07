import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ContactCard = (props) => {
  const { fullname, email, message, id, getData } = props;
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleDelete = async (id) => {
    // Send a delete request for the id passed into the function
    try {
      await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      setError(true);
      console.log(error);
    }
    // If no errors occur, then update the data presented to the user
    if (!error) {
      getData();
    }
  };

  return (
    <div className="bg-slate-200  rounded-lg py-4 px-3 mt-4 border-t flex justify-between">
      <div>
        <h3 className="font-bold">{fullname}</h3>
        <p>{email}</p>
        <p>{message}</p>
      </div>
      <div className="flex flex-col gap-3 justify-center">
        {/* <button className="text-white bg-green-700 rounded-md w-16">
          Edit
        </button> */}
        <button
          className="text-white bg-slate-700 opacity-80 rounded-md w-16 h-8 cursor-pointer"
          onClick={() => router.push(`/${id}`)}
        >
          Edit
        </button>
        <button
          className="text-white bg-red-700 opacity-80 rounded-md w-16 h-8 cursor-pointer"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
