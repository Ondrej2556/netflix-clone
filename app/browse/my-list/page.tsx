"use client";

import Footer from "@/components/footer";
import Loader from "@/components/loader/loader";
import MovieCard from "@/components/movie/movieCard";
import MovieModal from "@/components/movie/movieModal";
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
  }, []);

  useEffect(() => {
    if (!selectedAccount) {
      router.push("/browse")
      return;
    }
    const getUserFavoriteMovies = async () => {
      try {
        const series = await axios.get("/api/account/movie/favorites", {
          params: { userId: selectedAccount.id },
        });
        setMovies(series.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserFavoriteMovies();
  }, [selectedAccount]);
  
  return (
    <>
      {!session || !selectedAccount ? (
        <Loader />
      ) : (
        <div className="relative ">
          <header>
            <LoggedNavbar />
          </header>
          <main className="py-24 px-16 min-h-screen">
            <h1 className="text-4xl  pb-16">Můj seznam</h1>
            <div className="flex  flex-wrap gap-4 ">
              {movies?.length === 0 ? (
                <>
                <h1 className="text-3xl">Do seznamu jste si zatím nepřidali žádné pořady.</h1>
                </>
              ) : (
                <>
                {movies?.map((movie, i)=> (
                  <MovieCard 
                  key={i}
                  i={i}
                  movie={movie}
                  openMovieModal={SetIsMovieModalOpen}
                  selectMovie={setSelectedMovie}
                  scrollX={0}
                  />
                ))}
                </>
              )}
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
