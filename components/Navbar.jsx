"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = (params) => {
  const [navMenu, setNavMenu] = useState(false);

  useEffect(() => {
    // Changes the navigation bar menu into a profile icon upon initial load
    if (params.navMenu === true) {
      setNavMenu(true);
    }
  }, []);

  return (
    <div className="flex justify-between h-14 items-center px-2">
      <h1 className="text-3xl font-bold">Contact Manager</h1>
      <div className="flex gap-2">
        <Link href="/login">
          <button className="flex items-center gap-1 bg-slate-800 text-white hover:bg-slate-800 hover:shadow-sm rounded-md px-2 py-1">
            <p>Login</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-auto h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
