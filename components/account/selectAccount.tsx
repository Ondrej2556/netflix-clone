import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "../loader/loader";
import AccountPicker from "./accountPicker";
import {Account} from "@/d.types"
import { useUserStore } from "@/store/userStore";

interface selectAccountProps {
  setAccount:React.Dispatch<React.SetStateAction<any>>;
  setUserAccounts: React.Dispatch<React.SetStateAction<any>>;
  userAccounts: Account[] | null;
}

const SelectAccount: React.FC<selectAccountProps> = ({ setAccount, setUserAccounts, userAccounts }) => {
  const { data: session } = useSession();
  const [isPickState, setIsPickState] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!session || !session.user) {
      router.push("/");
      return;
    }

    getUserAccounts();
  }, [session]);
  const getUserAccounts = async () => {
    try {
      const accounts = await axios.get("/api/account", {
        params: { userEmail: session?.user?.email },
      });
      if (accounts.data === "User has no accounts") {
        console.log("User has no accounts");
        setUserAccounts([]);
        return;
      }
      setUserAccounts(accounts.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className=" w-screen h-screen flex flex-col justify-center items-center gap-4 bg-neutral-900 text-neutral-500">
      {!userAccounts ? (
        <Loader />
      ) : (
        <>
          {isPickState ? (
            <>
              {userAccounts.length > 0 ? (
                <>
                  <h1 className="text-4xl mb-12 text-white text-center">
                    Kdo se právě dívá?
                  </h1>
                  <div className="flex gap-12 justify-center flex-wrap">
                    {userAccounts.map((account, i) => (
                      <AccountPicker
                        key={i}
                        type="pick"
                        setAccount={setAccount}
                        id={account.id}
                        imageUrl={account.imageUrl}
                        nickname={account.nickname}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-5xl text-white">
                    Pro pokračování si vytvořte účet.
                  </h1>
                </>
              )}
              <button
                onClick={() =>
                  userAccounts.length > 0
                    ? setIsPickState(false)
                    : router.push("/createAccount")
                }
                className="mt-12 outline outline-1 px-12 py-3 text-2xl hover:text-white hover:outline-white"
              >
                {userAccounts.length > 0
                  ? "Spravovat profily"
                  : "Vytvořit profil"}
              </button>
            </>
          ) : (
            <>
              <h1 className="text-4xl mb-12 text-white">Spravovat profily</h1>
              <div className="flex gap-12 justify-center flex-wrap">
                {userAccounts.map((account, i) => (
                  <AccountPicker
                    key={i}
                    id={account.id}
                    imageUrl={account.imageUrl}
                    nickname={account.nickname}
                    type="edit"
                  />
                ))}
              </div>
              <div className="flex gap-4">
              <button 
              onClick={()=> setIsPickState(true)}
              className="mt-12 outline outline-1 sm:px-12 px-4 py-3 sm:text-2xl hover:text-white hover:outline-white">
                Hotovo
              </button>
              {userAccounts.length < 5 && (
              <button 
              onClick={()=> router.push("/createAccount")}
              className="mt-12 outline outline-1 sm:px-12 px-4 py-3 sm:text-2xl hover:text-white hover:outline-white">
                Vytvořit nový účet
              </button>
              )}
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
};

export default SelectAccount;
