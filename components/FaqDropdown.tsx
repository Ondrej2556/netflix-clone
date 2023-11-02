"use client";

import React, { useState } from "react";

interface FaqDropdownProps {
  question: string;
  answer: string;
}

const FaqDropdown: React.FC<FaqDropdownProps> = ({ question, answer }) => {
  const [isOpened, setIsOpened] = useState(false)
  return (
    <>
      <div
        onClick={()=> setIsOpened(!isOpened)}
      className="bg-neutral-800 w-full h-[4rem] mb-1 px-6 flex justify-between items-center cursor-pointer hover:bg-neutral-700 transition">
        <h3 className="sm:text-2xl text-xl">{question}</h3>
        <h3 className="sm:text-3xl text-2xl ">{isOpened ? "❌" : "➕"}</h3>
      </div>
      {isOpened && (
      <div className="bg-neutral-800 w-full mb-2 -mt-[2px] p-6 flex justify-between items-center">
        <h3 className="sm:text-xl text-md text-left" dangerouslySetInnerHTML={{__html: answer}}></h3>
      </div>
      )}
    </>
  );
};

export default FaqDropdown;
