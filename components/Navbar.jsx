"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import DropMenu from "./DropMenu";

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
        <DropMenu />
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={30}
          height={30}
          alt="Profile picture for user"
        />
      </div>
    </div>
  );
};

export default Navbar;
