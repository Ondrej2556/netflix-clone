"use client";

import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AccountForm from "./accountForm";
import { toast } from "react-toastify";

interface editAccountProps {
  close: any;
  imagePath: string;
  name: string;
  accountId: string;
}

interface SessionData {
  data: {
    user: {
      email: string;
    };
  };
}

const CreateAccount: React.FC<editAccountProps> = ({
  close,
  imagePath,
  name,
  accountId,
}) => {
  const router = useRouter();
  const { data: session } = useSession() as SessionData; 
  if (!session || !session.user) {
    router.push("/");
    return null;
  }

  const [profilePic, setProfilePic] = useState(
    imagePath.substring(imagePath.indexOf("-") + 1, imagePath.indexOf(".", imagePath.indexOf("-") + 1))
  );
  const [nickname, setNickname] = useState(name);
  const [nameError, setNameError] = useState(false);

  const editProfile = async () => {
    try {
      await axios.put("/api/account", {
        accountId,
        nickname,
        imageUrl: `/images/default-${profilePic}.png`,
        userEmail: session?.user?.email,
      });
      toast.success("Účet upraven");
      router.push("/");
    } catch (error) {
      toast.error("Failed to update account");
    }
  };
  const deleteAccount = async () => {
    try {
      await axios.delete("/api/account", {
        params: {
          accountId,
          userEmail: session?.user?.email,
        },
      });
      toast.success("Účet smazán");
      router.push("/");
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="absolute bg-neutral-800 z-10 flex flex-col gap-4 p-16 top-3 rounded-md lg:right-1/3 sm:right-1/4 right-100">
      <AccountForm
        name={nickname}
        setName={setNickname}
        profileImage={profilePic}
        setProfileImage={setProfilePic}
        title="Upravit profil"
        formAction={editProfile}
        formActionLabel="Upravit profil"
        formSecondAction={deleteAccount}
        formSecondActionLabel="Smazat účet"
        nameError={nameError}
        setNameError={setNameError}
        closeModal={close}
      />
    </div>
  );
};

export default CreateAccount;
