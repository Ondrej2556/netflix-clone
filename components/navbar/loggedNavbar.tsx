"use client";

import React, { useEffect, useState, JSX, useRef } from "react";
import { signOut } from "next-auth/react";
import Logo from "./logo";
import Link from "next/link";
import {
  FaRegBell,
  FaSearch,
  FaPencilAlt,
  FaRegUser,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { IoCaretDownSharp, IoReloadCircleOutline } from "react-icons/io5";
import Image from "next/image";
import { useMediaQuery } from "@react-hook/media-query";
import { Account } from "@/d.types";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface loggedNavbarProps {
  userAccounts: Account[] | null;
  selectedAccount: Account;
  setAccount: React.Dispatch<React.SetStateAction<any>>;
}

const LoggedNavbar: React.FC<loggedNavbarProps> = ({
  userAccounts,
  selectedAccount,
  setAccount,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const mediaQuery = useMediaQuery("(max-width: 830px)");
  const [isSecondMenuShown, setIsSecondMenuShown] = useState(false);
  const [isMainMenuShown, setIsMainMenuShown] = useState(false);
  const [navMenu, setNavMenu] = useState<JSX.Element | null>(null);
  const timeoutRef = useRef<number | NodeJS.Timeout | null>(null);
  const [scrollBg, setScrollBg] = useState(
    "bg-gradient-to-b from-black to-transparent "
  );

    const handleLogout = ()=> {
      localStorage.removeItem("account")
      signOut(); 
      router.push("/")
      router.refresh()
    }
  
  useEffect(() => {
    const updatedNavMenu = mediaQuery ? (
      <div
        className="flex items-center gap-1"
        onMouseEnter={() => handleMouseEnter("main")}
        onMouseLeave={() => handleMouseLeave("main")}
      >
        <button>Prohlížet</button>
        <IoCaretDownSharp size={15} />
      </div>
    ) : (
      <>
        <Link href="/browse">Domovská stránka</Link>
        <Link href="/series">Pořady</Link>
        <Link href="/browse">Filmy</Link>
        <Link href="/browse">Nové a oblíbené</Link>
        <Link href="/browse">Můj seznam</Link>
      </>
    );

    setNavMenu(updatedNavMenu);
  }, [mediaQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrollBg("bg-black");
      } else {
        setScrollBg("bg-gradient-to-b from-black to-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current as number);
      timeoutRef.current = null;
    }
    menu === "main" ? setIsMainMenuShown(true) : setIsSecondMenuShown(true);
  };

  const handleMouseLeave = (menu: string) => {
    timeoutRef.current = setTimeout(() => {
      menu === "main" ? setIsMainMenuShown(false) : setIsSecondMenuShown(false);
    }, 200);
  };
  return (
    <nav
      className={`transition-all duration-150 ease-in-out fixed w-full ${scrollBg} md:text-xs`}
    >
      <div className="lg:px-16 px-4 py-5 flex items-center">
        <div className="flex items-center flex-2 lg:justify-between gap-6">
          {/* MAIN NAV + LOGO */}
          <Logo width={100} height={100} />
          {navMenu}
          {isMainMenuShown && (
            <div
              onMouseEnter={() => clearTimeout(timeoutRef.current as number)}
              onMouseLeave={() => setIsMainMenuShown(false)}
              className="absolute border-t-[3px] border-x-[0.1px] border-b-[0.1px] border-white border-x-slate-400 border-b-slate-500 z-10 w-72 flex flex-col items-center top-24 bg-black opacity-90"
            >
              <Link
                className="py-4 hover:bg-neutral-600 transiiton w-full text-center"
                href="/browse"
              >
                Domovská stránka
              </Link>
              <Link
                className="py-4 hover:bg-neutral-600 transiiton w-full text-center"
                href="/series"
              >
                Pořady
              </Link>
              <Link
                className="py-4 hover:bg-neutral-600 transiiton w-full text-center"
                href="/browse"
              >
                Filmy
              </Link>
              <Link
                className="py-4 hover:bg-neutral-600 transiiton w-full text-center"
                href="/browse"
              >
                Nové a oblíbené
              </Link>
              <Link
                className="py-4 hover:bg-neutral-600 transiiton w-full text-center"
                href="/browse"
              >
                Můj seznam
              </Link>
            </div>
          )}
        </div>
        <div className="flex-1">
          {/* SECOND NAV */}
          <div className="flex flex-row justify-end items-center gap-6">
            <FaSearch size={19} />
            <FaRegBell size={19} />
            <div
              onClick={() => setIsSecondMenuShown(!isSecondMenuShown)}
              className="flex items-center gap-2 relative"
              onMouseEnter={() => handleMouseEnter("second")}
              onMouseLeave={() => handleMouseLeave("second")}
            >
              <Image
                src={selectedAccount.imageUrl}
                width={30}
                height={30}
                alt="Avatar"
                className="rounded-md"
              />
              <IoCaretDownSharp size={13} />
              {isSecondMenuShown && (
                <div
                  onMouseEnter={() =>
                    clearTimeout(timeoutRef.current as number)
                  }
                  onMouseLeave={() => setIsSecondMenuShown(false)}
                  className="absolute w-48  z-10 top-12  border-[1px] border-neutral-700 bg-black bg-opacity-80 right-1 flex flex-col text-sm"
                >
                  <div className="p-2 flex flex-col gap-3 text-xs">
                    {userAccounts
                      ?.filter((account) => account.id !== selectedAccount.id)
                      .map((account) => (
                        <div
                          key={account.id}
                          onClick={() => {setAccount(account); localStorage.setItem("account", JSON.stringify(account))}}
                          className="flex gap-2 items-center cursor-pointer hover:underline"
                        >
                          <Image
                            src={account.imageUrl}
                            width={30}
                            height={30}
                            alt="Avatar"
                            className="rounded-md"
                          />
                          <h6>{account.nickname}</h6>
                        </div>
                      ))}
                      {session?.user?.email==="admin@admin.cz" && (
                    <div
                      onClick={() => router.push("/createMovie")}
                      className="flex gap-2 items-center cursor-pointer hover:underline"
                    >
                      <FaPencilAlt size={20} />
                      <h4>Vytvořit film</h4>
                    </div>
                      )}
                    <div
                      onClick={() => router.push("/")}
                      className="flex gap-2 items-center cursor-pointer hover:underline"
                    >
                      <FaPencilAlt size={20} />
                      <h4>Spravovat profily</h4>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer hover:underline">
                      <IoReloadCircleOutline size={20} />
                      <h4>Převést profil</h4>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer hover:underline">
                      <FaRegUser size={20} />
                      <h4>Účet</h4>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer hover:underline">
                      <FaRegQuestionCircle size={20} />
                      <h4>Centrum zákaznické podpory</h4>
                    </div>
                  </div>
                  <h6
                    onClick={handleLogout}
                    className="border-t-[1px] border-neutral-700 text-center py-2 cursor-pointer hover:underline text-sm"
                  >
                    Odhlásit se z Neftlixu
                  </h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoggedNavbar;
