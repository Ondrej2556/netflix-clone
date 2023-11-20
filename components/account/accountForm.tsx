"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Input from "../input"

const profileImages = ["blue", "green", "red", "slate"];

interface accountFromProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    profileImage: string;
    setProfileImage: React.Dispatch<React.SetStateAction<string>>;
    title: string;
    formAction: () => void;
    formActionLabel: string;
    formSecondAction?: (() => void) | undefined;
    formSecondActionLabel?: string;
    nameError: boolean;
    setNameError:  React.Dispatch<React.SetStateAction<boolean>>;
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
}

const AccountForm:React.FC<accountFromProps> = ({
    name,
    setName,
    profileImage,
    setProfileImage,
    title,
    formAction,
    formActionLabel,
    formSecondAction,
    formSecondActionLabel,
    nameError,
    setNameError,
    closeModal,
    loading
}) => {
  return (
    <div className="flex flex-col mt-16 gap-4 self-center">
      <h1 className="text-4xl">{title}</h1>
      <div className="flex justify-between">
        {profileImages.map((image, i) => (
          <div key={i} className="relative">
            <img
              onClick={() => setProfileImage(image)}
              src={`/images/default-${image}.png`}
              alt="profilePic"
              className={`w-12 rounded-md cursor-pointer hover:border-2 border-white 
              ${profileImage === image ? "border-2" : "border-0"}
              `}
            />
            <FaCheckCircle
              className={`
            ${profileImage === image ? "visible" : "hidden"}
            absolute w-3 h-3 rounded-full bg-red-700 top-0 right-0`}
            />
          </div>
        ))}
      </div>
      <div>
        <Input
          type="text"
          id="name"
          label="Jméno"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          error={nameError}
        />
      </div>
      <button
        disabled={loading}
        onClick={formAction}
        className={`rounded-md py-2 px-4 bg-white text-black transition ${
          loading
          ? "bg-red-800 hover:cursor-wait"
          : "bg-red-700 hover:bg-red-700"}`}
      >
        {formActionLabel}
      </button>
      {formSecondAction&&(
      <button
      disabled={loading}
      onClick={formSecondAction}
        className={`rounded-md py-2 px-4 bg-white text-black transition ${
          loading
          ? "bg-red-800 hover:cursor-wait"
          : "bg-red-700 hover:bg-red-700"}`}
      >
        {formSecondActionLabel}
      </button>
      )}
      <button
      onClick={() =>closeModal(false)}
        className="rounded-md py-2 px-4 bg-white text-black hover:bg-red-700 transition"
      >
        Zavřít
      </button>
    </div>
  );
};

export default AccountForm;
