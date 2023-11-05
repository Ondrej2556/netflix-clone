"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoggedNavbar from "@/components/navbar/loggedNavbar";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import SelectAccount from "@/components/account/selectAccount";
import { Account } from "@/d.types";
import MovieSlider from "@/components/movie/movieSlider";
import axios from "axios";
import MovieModal from "@/components/movie/movieModal";
import { Movie } from "@/d.types";
import Footer from "@/components/footer";

const Browse = () => {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>();
  const [userAccounts, setUserAccounts] = useState<Account[] | null>(null);
  
  const [series, setSeries] = useState<Movie[] | undefined>();
  const [movies, setMovies] = useState<Movie[] | undefined>();
  const [likedMovies, setLikedMovies] = useState<Movie[] | undefined>();
  const [reccomendedMovies, setReccomendedMovies] = useState<Movie[] | undefined>();
  const [isMovieModalOpen, SetIsMovieModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie |null>(null)
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
    if(!selectedAccount) {
      return
    }
    const getLikedMovies = async () => {
      try {
        const series = await axios.get("/api/account/movie/favorites", {
          params: { userId: selectedAccount.id },
        });
        setLikedMovies(series.data);
      } catch (error) {
        console.log(error)
      }
    }

    getSeries();
    getMovies();
    getLikedMovies()
    if (movies) {
      setReccomendedMovies(movies.slice().reverse());
    }
  }, [selectedAccount, movies]);
  
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
        <div className="relative">
          <header>
            <LoggedNavbar
              userAccounts={userAccounts}
              selectedAccount={selectedAccount}
              setAccount={setSelectedAccount}
            />
            <div className="bg-[url('/images/loggedHero.webp')] w-full lg:h-screen h-full bg-center bg-cover bg-no-repeat">
              <div className="bg-black h-full bg-opacity-10 flex justify-left items-start ">
                <div className=" flex justify-center flex-col  gap-4 lg:mx-16 mx-4 mt-32 lg:w-1/3 sm:w-2/3 ">
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
                  <div className="flex gap-4 mt-2 2xl:text-2xl  lg:text-md  text-sm pb-20 z-20">
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
          <main className="relative">
            <div className="lg:-mt-56 -mt-28">
              <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 mt-10 lg:text-3xl">Pořady</h1>
              <MovieSlider data={series} openMovieModal={SetIsMovieModalOpen} selectMovie={setSelectedMovie} user={selectedAccount} />
            </div>
            <div className="lg:-mt-30 -mt-20">
              <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 mt-10 lg:text-3xl">Filmy</h1>
              <MovieSlider data={movies} openMovieModal={SetIsMovieModalOpen} selectMovie={setSelectedMovie} user={selectedAccount} />
            </div>
            {likedMovies && (
            <div className="lg:-mt-30 -mt-20">
              <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 mt-10 lg:text-3xl">Oblíbené uživatele: {selectedAccount.nickname}</h1>
                <MovieSlider data={likedMovies} openMovieModal={SetIsMovieModalOpen} selectMovie={setSelectedMovie} user={selectedAccount} />
            </div>
            )}
            <div className="lg:-mt-30 -mt-20">
              <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 mt-10 lg:text-3xl">Top tipy pro profil: {selectedAccount.nickname}</h1>
              <MovieSlider data={reccomendedMovies} openMovieModal={SetIsMovieModalOpen} selectMovie={setSelectedMovie} user={selectedAccount} />
            </div>
          </main>
          <MovieModal closeMovieModal={SetIsMovieModalOpen} onMovieOpen={isMovieModalOpen} selectedMovie={selectedMovie} user={selectedAccount}/>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Browse;
