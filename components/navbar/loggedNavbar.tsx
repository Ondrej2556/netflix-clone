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

const LoggedNavbar = () => {
  const mediaQuery = useMediaQuery("(max-width: 830px)");
  const [isSecondMenuShown, setIsSecondMenuShown] = useState(false);
  const [isMainMenuShown, setIsMainMenuShown] = useState(false);
  const [navMenu, setNavMenu] = useState<JSX.Element | null>(null);
  const timeoutRef = useRef<number | NodeJS.Timeout | null>(null);
  const [scrollBg, setScrollBg] = useState('bg-gradient-to-b from-black to-transparent ');

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
        setScrollBg('bg-black');
      } else {
        setScrollBg('bg-gradient-to-b from-black to-transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <nav className={`transition-all duration-150 ease-in-out fixed w-full ${scrollBg}`} >

      <div className="lg:px-16 px-4 py-5 flex items-center">
        <div className="flex items-center flex-2 lg:justify-between gap-6">
          {/* MAIN NAV + LOGO */}
          <Logo width={100} height={100} />
          {navMenu}
          {isMainMenuShown && (
            <div
              onMouseEnter={() => clearTimeout(timeoutRef.current as number)}
              onMouseLeave={() => setIsMainMenuShown(false)}
              className="absolute border-t-[3px] border-x-[0.1px] border-b-[0.1px] border-white border-x-slate-400 border-b-slate-500 z-10 w-72 flex flex-col items-center top-24 bg-black opacity-80"
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
                src="/images/default-blue.png"
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
                  className="absolute w-48  z-10 top-12  border-[1px] border-neutral-700 bg-black bg-opacity-80 right-1 flex flex-col "
                >
                  <div className="p-2 flex flex-col gap-3 ">
                    <div className="flex gap-2 items-center cursor-pointer hover:underline">
                      <Image
                        src="/images/default-red.png"
                        width={30}
                        height={30}
                        alt="Avatar"
                        className="rounded-md"
                      />
                      <h3>Ondřej</h3>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer hover:underline">
                      <FaPencilAlt size={20} />
                      <h3>Spravovat profily</h3>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer hover:underline">
                      <IoReloadCircleOutline size={20} />
                      <h3>Převést profil</h3>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer hover:underline">
                      <FaRegUser size={20} />
                      <h3>Účet</h3>
                    </div>
                    <div className="flex gap-2 items-center cursor-pointer hover:underline">
                      <FaRegQuestionCircle size={20} />
                      <h3>Centrum zákaznické podpory</h3>
                    </div>
                  </div>
                  <h3
                    onClick={() => signOut()}
                    className="border-t-[1px] border-neutral-700 text-center py-2 cursor-pointer hover:underline"
                  >
                    Log out
                  </h3>
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
