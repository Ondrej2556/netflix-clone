"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AccountForm from "./accountForm";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/userStore";

interface editAccountProps {
  isEditOpen: boolean;
  onEditClose: React.Dispatch<React.SetStateAction<boolean>>;
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
  onEditClose,
  imagePath,
  name,
  accountId,
  isEditOpen,
}) => {
  const [nickname, setNickname] = useState(name);
  const [nameError, setNameError] = useState(false);
  const [isOpen, setIsOpen] = useState(isEditOpen);
  const [loading ,setLoading] = useState<boolean>(false)
  const { reset } = useUserStore();
  const router = useRouter();
  const { data: session } = useSession() as SessionData;
  const [profilePic, setProfilePic] = useState(
    imagePath.substring(
      imagePath.indexOf("-") + 1,
      imagePath.indexOf(".", imagePath.indexOf("-") + 1)
    )
  );
  
    useEffect(() => {
      setIsOpen(isEditOpen);
    }, [isEditOpen]);
    
  if (!session || !session.user) {
    router.push("/");
    return null;
  }


  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onEditClose(false);
    }, 300);
  };

  const editProfile = async () => {
    try {
      setLoading(true)
      await axios.put("/api/account", {
        accountId,
        nickname,
        imageUrl: `/images/default-${profilePic}.png`,
        userEmail: session?.user?.email,
      });
      toast.success("Účet upraven");
      localStorage.removeItem("account");
      reset();
      router.push("/browse");
    } catch (error) {
      toast.error("Failed to update account");
    } finally {
      setLoading(false)
    }
  };
  const deleteAccount = async () => {
    try {
      setLoading(true)
      await axios.delete("/api/account", {
        params: {
          accountId,
          userEmail: session?.user?.email,
        },
      });
      toast.success("Účet smazán");
      router.push("/browse");
      localStorage.removeItem("account");
      reset();
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {isEditOpen && (
        <div
          className={`absolute sm:-top-1/2 -top-14 right-1/2 translate-x-1/2 w-full z-50 bg-neutral-800 flex flex-col gap-4 p-16 rounded-md
    transition duration-300 ease-in-out  
    ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-75"}
    `}
        >
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
            closeModal={handleClose}
            loading={loading}
          />
        </div>
      )}
    </>
  );
};

export default CreateAccount;
