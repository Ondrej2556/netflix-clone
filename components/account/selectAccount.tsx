import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "../loader/loader";
import AccountPicker from "./accountPicker";
import { useUserStore } from "@/store/userStore";

const SelectAccount = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { userAccounts, setUserAccounts } = useUserStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!session || !session.user) {
      router.push("/");
      return;
    }
    const getUserAccounts = async () => {
      try {
        const accounts = await axios.get("/api/account", {
          params: { userEmail: session?.user?.email },
        });
        if (accounts.data === "User has no accounts") {
          setUserAccounts([]);
          router.push("/browse");
          return;
        }
        setUserAccounts(accounts.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserAccounts();

    setTimeout(()=> {
      setIsOpen(true);
    }, 300)
  }, [session, setUserAccounts, router]);

  return (
    <main className=" w-screen h-screen flex flex-col justify-center items-center gap-4 bg-neutral-900 text-neutral-500">
      {!userAccounts ? (
        <Loader />
      ) : (
        <>
          {userAccounts.length > 0 ? (
            <div className={`transition-all ease-in-out duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-150 opacity-0"} flex flex-col items-center`}>
              <h1 className="text-4xl mb-12 text-white text-center">
                Kdo se právě dívá?
              </h1>
              <div className="flex gap-12 justify-center flex-wrap">
                {userAccounts.map((account, i) => (
                  <AccountPicker
                    key={i}
                    type="pick"
                    id={account.id}
                    imageUrl={account.imageUrl}
                    nickname={account.nickname}
                    likedMoviesId={account.likedMoviesId}
                    movieRating={account.movieRating}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <h1 className="sm:text-5xl text-3xl text-white text-center">
                Pro pokračování si vytvořte účet.
              </h1>
            </>
          )}
          <button
            onClick={() =>
              userAccounts.length > 0
                ? router.push("/ManageProfiles")
                : router.push("/createAccount")
            }
            className="mt-12 outline outline-1 px-12 py-3 text-2xl hover:text-white hover:outline-white"
          >
            {userAccounts.length > 0 ? "Spravovat profily" : "Vytvořit profil"}
          </button>
        </>
      )}
    </main>
  );
};

export default SelectAccount;
