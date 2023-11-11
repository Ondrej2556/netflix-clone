"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import AccountPicker from "@/components/account/accountPicker";
import { useRouter } from "next/navigation";

const ManageProfiles = () => {
  const { userAccounts } = useUserStore();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  useEffect(() => {
    if (!userAccounts) router.push("/");

    setTimeout(()=> {
      setIsOpen(true);
    }, 300)
  }, [userAccounts, router]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4 bg-neutral-900 text-neutral-500 ">
      {userAccounts && (
        <div className={`transition-all ease-in-out duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-150 opacity-0"} flex flex-col items-center`}>
          <h1 className="text-4xl mb-12 text-white">Spravovat profily</h1>
          <div className="flex gap-12 justify-center flex-wrap">
            {userAccounts?.map((account, i) => (
              <AccountPicker
                key={i}
                id={account.id}
                imageUrl={account.imageUrl}
                nickname={account.nickname}
                type="edit"
                likedMoviesId={account.likedMoviesId}
              />
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/")}
              className="mt-12 outline outline-1 sm:px-12 px-4 py-3 sm:text-2xl hover:text-white hover:outline-white"
            >
              Hotovo
            </button>
            {userAccounts.length < 5 && (
              <button
                onClick={() => router.push("/createAccount")}
                className="mt-12 outline outline-1 sm:px-12 px-4 py-3 sm:text-2xl hover:text-white hover:outline-white"
              >
                Vytvořit nový účet
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProfiles;
