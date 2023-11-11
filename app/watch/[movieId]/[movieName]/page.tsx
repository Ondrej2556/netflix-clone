"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import Loader from "@/components/loader/loader";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = ({
  params,
}: {
  params: { movieId: string; movieName: string };
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { userAccounts, selectedAccount, setAccount, setUserAccounts } =
    useUserStore();
  const [isHovering, setIsHovering] = useState(true);
  let hoverTimeout: any;
  let mouseMoved = false;

  useEffect(() => {
    if (!params || !params.movieId || !params.movieName) {
      router.push("/");
      return;
    }
    if (!session || !session.user) {
      router.push("/");
      return;
    }

    const account = localStorage.getItem("account");
    if (account) {
      setAccount(JSON.parse(account));
    }

    if(!selectedAccount) {
      router.push("/browse");
      return;
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
  }, [setUserAccounts, params,]);

  const handleMouseMove = () => {
    if (!mouseMoved) {
      clearTimeout(hoverTimeout);
      mouseMoved = true;
    }

    setIsHovering(true);

    hoverTimeout = setTimeout(() => {
      setIsHovering(false);
      mouseMoved = false;
    }, 3000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  return (
    <div>
      {!params || !selectedAccount || !session?.user ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        >
          <nav className="w-full h-24 px-10 flex items-center fixed z-40">
            <AiOutlineArrowLeft
              size={40}
              className="cursor-pointer"
              onClick={() => router.push("/")}
            />
          </nav>
          <video
            autoPlay
            controls
            className="h-screen w-full"
            src="/sampleVideo.mp4"
          ></video>
          {isHovering && (
            <div className="absolute z-40 right-1/2 translate-x-1/2 bottom-10 ">
              Sledujete: {decodeURIComponent(params.movieName)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Watch;
