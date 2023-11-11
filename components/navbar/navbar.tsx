"use client";

import Link from "next/link";
import React from "react";
import Logo from "./logo";

interface navbarProps {
  type?: string;
}
const Navbar: React.FC<navbarProps> = ({ type }) => {
  return (
    <nav className="w-full fixed">
      <div className="w-9/12 mx-auto sm:px-16 py-6 flex flex-row justify-between ">
        <Logo width={100} height={150} />
        <div>
          {type === "home" && (
            <Link
              className="bg-red-700 px-4 xl:py-2 py-1 rounded-md hover:bg-red-800 transition flex"
              href="/auth"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
