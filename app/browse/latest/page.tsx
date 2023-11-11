"use client";

import Footer from "@/components/footer";
import Loader from "@/components/loader/loader";
import MovieCard from "@/components/movie/movieCard";
import MovieModal from "@/components/movie/movieModal";
import MovieSlider from "@/components/movie/movieSlider";
import Top10MovieSlider from "@/components/movie/top10MovieSlider";
import LoggedNavbar from "@/components/navbar/loggedNavbar";
import { Movie } from "@/d.types";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyList = () => {
  const { userAccounts, selectedAccount, setAccount, setUserAccounts } =
    useUserStore();

  const [movies, setMovies] = useState<Movie[] | undefined>();
  const [isMovieModalOpen, SetIsMovieModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
    const getLatestMovies = async () => {
      try {
        const series = await axios.get("/api/movie/latest", {
          params: {take: 30}
        });
        setMovies(series.data);
      } catch (error) {
        console.log(error);
      }
    };

    getLatestMovies();
  }, []);

  return (
    <>
      {!session || !selectedAccount ? (
        <Loader />
      ) : (
        <div className="relative ">
          <header>
            <LoggedNavbar />
          </header>
          <main className="py-24 min-h-screen">
            <div>
              <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 mt-10 lg:text-3xl">
                Nově na Netflixu
              </h1>
              <MovieSlider
                data={movies}
                openMovieModal={SetIsMovieModalOpen}
                selectMovie={setSelectedMovie}
              />
            </div>
            <div>
              <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 lg:text-3xl">
                Top 10 filmů v téhle zemi: Česko
              </h1>
              <Top10MovieSlider
                data={movies?.slice(0,10).reverse()}
                openMovieModal={SetIsMovieModalOpen}
                selectMovie={setSelectedMovie}
              />
            </div>
          </main>
          <MovieModal
            closeMovieModal={SetIsMovieModalOpen}
            onMovieOpen={isMovieModalOpen}
            selectedMovie={selectedMovie}
          />
          <Footer />
        </div>
      )}
    </>
  );
};
export default MyList;
