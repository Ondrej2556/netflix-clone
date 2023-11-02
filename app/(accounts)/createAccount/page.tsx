"use client";

import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AccountForm from "@/components/account/accountForm";
import { toast } from "react-toastify";

const CreateAccount = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session || !session.user) {
    router.push("/");
    return;
  }
  const [profilePic, setProfilePic] = useState<string>("blue");
  const [nickname, setNickname] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);

  const createProfile = async () => {
    if (nickname.length === 0) {
      setNameError(true);
      return;
    }

    try {
      await axios.post("/api/account", {
        nickname,
        imageUrl: `/images/default-${profilePic}.png`,
        email: session?.user?.email,
      });
      toast.success("Účet vytvořen");
      router.push("/browse");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="bg-neutral-900 w-full h-screen flex justify-center ">
      <AccountForm
        name={nickname}
        setName={setNickname}
        profileImage={profilePic}
        setProfileImage={setProfilePic}
        title="Vytvořit profil"
        formAction={createProfile}
        formActionLabel="Vytvořit profil"
        closeModal={() => router.push("/browse")}
        nameError={nameError}
        setNameError={setNameError}
      />
    </main>
  );
};

export default CreateAccount;