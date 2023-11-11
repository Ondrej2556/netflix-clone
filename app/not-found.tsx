"use client";

import Logo from "@/components/navbar/logo";
import React from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter()
  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      <header>
        <nav className="w-full bg-black lg:px-16 px-4 py-4">
          <Logo height={150} width={150} />
        </nav>
      </header>
      <main className="bg-[url('/images/notFound.jpeg')] w-full h-full bg-bottom bg-cover bg-no-repeat ">
        <div className="h-full w-full bg-black bg-opacity-60 flex items-center justify-center">
        <div className="text-center sm:w-1/3  w-full">
            <h1 className="lg:text-7xl text-4xl font-bold">Ztratili jste se?</h1>
            <br />
            <h3 className="text-3xl">Je nám líto, ale tuhle stránku jsme nenašli. Na našich stránkách je toho ale spousta.</h3>
            <button 
            onClick={() => router.push("/")}
            className="bg-white text-black text-3xl font-semibold py-2 px-4 rounded-md mt-4">Domovská stránka Netflix</button>
        </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
