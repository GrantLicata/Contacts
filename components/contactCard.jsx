import React from "react";

const ContactCard = (props) => {
  return (
    <div className="bg-slate-200  rounded-lg py-4 px-3 mt-4 border-t">
      <h3>{props.fullName}</h3>
      <p>{props.email}</p>
      <p>{props.message}</p>
    </div>
  );
};

export default ContactCard;
