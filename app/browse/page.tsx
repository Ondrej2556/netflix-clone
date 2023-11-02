"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoggedNavbar from "@/components/navbar/loggedNavbar";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import SelectAccount from "@/components/account/selectAccount";
import { Account } from "@/d.types";
import MovieSlider from "@/components/movieSlider";
import axios from "axios";

const Browse = () => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>();
  const [userAccounts, setUserAccounts] = useState<Account[] | null>(null);
  const [series, setSeries] = useState();
  const [movies, setMovies] = useState();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(()=>{
    if (!session || !session.user) {
      router.push("/");
      return;
    }
  },[])

  useEffect(() => {
    const getSeries = async () => {
      try {
        const series = await axios.get("/api/movie", {
          params: { categoryId: 1 },
        });
        setSeries(series.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getMovies = async () => {
      try {
        const series = await axios.get("/api/movie", {
          params: { categoryId: 2 },
        });
        setMovies(series.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSeries();
    getMovies();
  }, []);
  
  useEffect(() => {
    const account = localStorage.getItem("account");

    if (account) {
      setSelectedAccount(JSON.parse(account));
    }
  }, []);
  return (
    <>
      {!selectedAccount ? (
        <SelectAccount
          setAccount={setSelectedAccount}
          setUserAccounts={setUserAccounts}
          userAccounts={userAccounts}
        />
      ) : (
        <>
          <header>
            <LoggedNavbar
              userAccounts={userAccounts}
              selectedAccount={selectedAccount}
              setAccount={setSelectedAccount}
            />
            <div className="bg-[url('/images/loggedHero.webp')] w-full h-screen bg-center bg-cover bg-no-repeat">
              <div className="bg-black h-full bg-opacity-10 flex justify-left items-start ">
                <div className=" flex justify-center flex-col  gap-4 lg:mx-16 mx-4 mt-32 sm:w-1/3">
                  <img
                    className="max-w-none- "
                    src="/images/loggedHeroTitle.webp"
                    alt="Hero Title"
                  />
                  <h1 className="xl:text-4xl text-xl font-bold">
                    Potvrzeno: další řada je na cestě
                  </h1>
                  <p className="xl:text-2xl md:text-md">
                    Pár desítek let po turnaji, který jim změnil život, na sebe
                    znova narazí soupeři Johny a Daniel. Další pokračování série
                    filmů "Karate Kid".
                  </p>
                  <div className="flex gap-4 mt-2 xl:text-2xl text-sm">
                    <button className="flex items-center gap-2 py-3 px-8 bg-white text-black  font-semibold rounded-md transition hover:bg-neutral-400">
                      <FaPlay />
                      Přehrát
                    </button>
                    <button className="flex items-center gap-2 py-3 px-8 bg-neutral-600 text-white font-semibold rounded-md transition hover:bg-opacity-60">
                      <FaInfoCircle />
                      Další informace
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div className="-mt-24">
              <h1 className="lg:pl-16 pl-4 -mb-16 mt-10 ">Pořady</h1>
              <MovieSlider data={series} />
            </div>
            <div className="-mt-10">
              <h1 className="lg:pl-16 pl-4 -mb-14 mt-10 ">Filmy</h1>
              <MovieSlider data={movies} />
            </div>
          </main>
          <footer>Footer</footer>
        </>
      )}
    </>
  );
};

export default Browse;
