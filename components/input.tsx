"use client";

import React from "react";

interface inputProps {
  type: string;
  id: string;
  label: string;
  onChange: any;
  value: string;
  error?: boolean;
}

const Input:React.FC<inputProps> = ({
  type,
  id,
  label,
  onChange,
  error,
  value
}) => {
  return (
    <div className="relative flex justify-center self-center flex-1 w-full">
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={id}
        id={id}
        className={`
            py-4
            px-7
            bg-opacity-50
            bg-neutral-800
            text-white
            font-bold
            rounded-md
            outline
            outline-1
            ${error ? " outline-red-500" : "outline-zinc-500"}
          
            w-full
            peer
            focus:outline-white
            focus:outline-2
            z-10
        `}
        placeholder=" "
      />
      <label 
        className="
            absolute
            transition
            duration-150
            left-6
            scale-75
            origin-[0]
            peer-placeholder-shown:translate-y-4
            peer-placeholder-shown:scale-100
            peer-focus:translate-y-0
            peer-focus:scale-75
        "
      htmlFor={id}>{label}</label>
    </div>
  );
};

export default Input;
