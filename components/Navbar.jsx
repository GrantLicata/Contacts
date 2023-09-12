"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = (params) => {
  const [navMenu, setNavMenu] = useState(false);

  const { data: session, status } = useSession();

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
        {status === "authenticated" ? (
          <button
            className="flex items-center gap-1 bg-slate-800 text-white hover:bg-slate-700 hover:shadow-md rounded-md px-2 py-1"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <p>Logout</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </button>
        ) : (
          <Link href="/login">
            <button className="flex items-center gap-1 bg-slate-800 text-white hover:bg-slate-700 hover:shadow-md rounded-md px-2 py-1">
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
