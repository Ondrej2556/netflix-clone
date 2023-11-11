"use client";

import YourAccountSection from "@/components/account/yourAccountSection";
import Footer from "@/components/footer";
import Loader from "@/components/loader/loader";
import LoggedNavbar from "@/components/navbar/loggedNavbar";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { toast } from "react-toastify";

const YourAccount = () => {
  const { userAccounts, setAccount, setUserAccounts, reset } = useUserStore();
  const { data: session } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (!session || !session.user) {
      router.push("/");
      return;
    }

    const account = localStorage.getItem("account");
    if (account) {
      setAccount(JSON.parse(account));
    }

    if (!userAccounts) {
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
    }
  }, [setUserAccounts, router, session, setAccount, userAccounts]);

  const handleUserDelete = async () => {
    if(confirm("Opravdu si přejete smazat účet?")){
      
      try {
        await axios.delete("/api/user",{
          params:{email: session?.user?.email}
        })
        toast.success("Účet smazán")
        signOut()
        localStorage.removeItem("account")
        router.push("/")
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      {!userAccounts || !session ? (
        <Loader />
      ) : (
        <>
          <LoggedNavbar />
          <main className="bg-white  w-full pt-20 mb-20">
            <div className="lg:px-16 px-4 pr-6 py-12 h-full">
              <div className="flex flex-col  xl:w-2/3 w-full mx-auto text-black">
                <div className="flex gap-3 text-4xl font-semibold items-center">
                  Účet
                  <span className="text-sm text-neutral-700 flex items-center">
                    <AiOutlinePlaySquare className="text-red-500" size={24} />{" "}
                    Členem od: srpen 2020
                  </span>
                </div>
                <hr className="w-full  border-neutral-400 mt-4" />
                <YourAccountSection
                  title="ČLENSTVÍ A FAKTURACE"
                  buttonTitle="Zručit členství"
                  buttonAction={handleUserDelete}
                  leftData={[`E-mail: ${session.user?.email}`, "Heslo: XXXXXXXX", "Telefon: Není"]}
                  rightData={[
                    "Změnit e-mail účtu",
                    "Změnit heslo",
                    "Změnit telefonní číslo",
                  ]}
                />
                <hr className="w-full  border-neutral-400 mt-4" />
                <YourAccountSection
                  title="VAŠE PŘEDPLATNÉ"
                  leftData={["Basic HD"]}
                  rightData={["Změnit předplatné"]}
                />
                <hr className="w-full  border-neutral-400 mt-4" />
                <YourAccountSection
                  title="ZABEZPEČENÍ A SOUKROMÍ"
                  leftData={[
                    "Udržujte si přehled o přístupu k tomuhle účtu, procházejte si seznam nedávno aktivních zařízení a další.",
                  ]}
                  rightData={[
                    "Spravovat přístup a zařízení",
                    "Odhlásit se ze všech zařízení",
                    "Stáhnout osobní údaje",
                  ]}
                />
                <hr className="w-full  border-neutral-400 mt-4" />
                <YourAccountSection
                  title="ČLENOVÉ NAVÍC"
                  leftData={[
                    "Předplatné Standard nebo Premium vám umožňuje sdílet Netflix i s lidmi, kteří s vámi nebydlí.",
                  ]}
                  rightData={[""]}
                />
                <hr className="w-full  border-neutral-400 mt-4" />

                <div className="flex gap-10 pt-2 w-full">
                  <div className="flex flex-col flex-2 w-1/3">
                    <h3 className="text-xl text-neutral-500 ">
                      UŽIVATELSKÉ PROFILY
                    </h3>
                  </div>
                  <div className="flex flex-col flex-1  gap-4">
                    {userAccounts.map((account, i) => (
                      <div key={i}>
                        <div className="flex gap-4 items-center">
                          <Image
                            height={10}
                            width={10}
                            src={account.imageUrl}
                            alt={account.nickname}
                            className="h-14 w-14 rounded-md"
                          />
                          <h3 className="text-xl text-black font-semibold">
                            {account.nickname}
                          </h3>
                        </div>
                        <hr className="w-full  border-neutral-200 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default YourAccount;
