import { useRouter } from "next/navigation";
import React from "react";

const ContactCard = (props) => {
  const { fullname, email, message, id, getData } = props;
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      }).then(getData());
    } catch (err) {
      console.log(err);
    }
  };

  // todo: Create edit function
  // const editHandler = () => {};

  return (
    <div className="bg-slate-200  rounded-lg py-4 px-3 mt-4 border-t flex justify-between">
      <div>
        <h3 className="font-bold">{fullname}</h3>
        <p>{email}</p>
        <p>{message}</p>
      </div>
      <div className="flex flex-col gap-3">
        <button className="text-white bg-green-700 rounded-md w-16">
          Edit
        </button>
        <button
          className="text-white bg-red-700 rounded-md w-16"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
