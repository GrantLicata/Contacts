"use client";
import React, { useEffect, useState } from "react";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const { data, getData } = props;

  // Get all contacts on mount
  useEffect(() => {
    getData();
  }, []);

  // Delete specified contact
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    getData();
  };

  return (
    <>
      {data && data.length > 0 ? (
        data.map((contact) => (
          <div className="grid grid-cols-2 gap-4 mt-4" key={contact._id}>
            <ContactCard
              firstName={contact.firstName}
              lastName={contact.lastName}
              email={contact.email}
              phone={contact.phone}
              address={contact.address}
              id={contact._id}
              getData={getData}
              handleDelete={handleDelete}
            />
          </div>
        ))
      ) : (
        <p className="bg-slate-600 text-white rounded-md p-3 mt-4">
          No Contacts Available
        </p>
      )}
    </>
  );
};

export default ContactList;