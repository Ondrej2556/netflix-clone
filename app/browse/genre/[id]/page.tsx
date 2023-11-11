"use client";

import Footer from "@/components/footer";
import Loader from "@/components/loader/loader";
import Hero from "@/components/movie/hero";
import MovieModal from "@/components/movie/movieModal";
import MovieSlider from "@/components/movie/movieSlider";
import LoggedNavbar from "@/components/navbar/loggedNavbar";
import { Movie } from "@/d.types";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const genreData: { [key: string]: any } = {
  "1": {
    BGimageUrl: "/images/loggedHero.webp",
    LOGOimageUrl: "/images/loggedHeroTitle.webp",
    title: "Potvrzeno: další řada je na cestě",
    description:
    'Pár desítek let po turnaji, který jim změnil život, na sebe znova narazí soupeři Johny a Daniel. Další pokračování série filmů "Karate Kid".',
    movieId: "65462455a3658eac9b2beb42",
  },
  "2": {
    BGimageUrl: "/images/loggedHeroMovie.webp",
    LOGOimageUrl: "/images/loggedHeroTitleMovie.webp",
    title: "Ježek Sonic",
    description:
    "Sonic se chce mermomocí stát hrdinou. Spojí proto síly s novým kamarádem Tailsem, aby zastavili doktora Robotnika a ježuru Knucklese.",
    movieId:"654f6885854ab4ce147997fc"
  },
};

const Genre = ({ params }: { params: { id: string } }) => {
  const { userAccounts, selectedAccount, setAccount, setUserAccounts } =
  useUserStore();
  const { data: session } = useSession();
  const [movies, setMovies] = useState<Movie[] | undefined>();
  const [isMovieModalOpen, SetIsMovieModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [moviesByGenre, setMoviesByGenre] = useState<{ [key: string]: any[] }>(
    {}
  );
  const router = useRouter();
  


  useEffect(() => {
    if (!(params.id === "1" || params.id === "2") || !params.id) {
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
    const getMovies = async () => {
      try {
        const series = await axios.get("/api/movie", {
          params: { categoryId: Number(params.id) },
        });
        setMovies(series.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, [setMovies, setUserAccounts]);


  
  const selectedData = genreData[params.id] || genreData["2"];

  useEffect(() => {
    if (movies) {
      movies.forEach((movie) => {
        movie.genres.forEach((genre) => {
          if (!moviesByGenre[genre]) {
            moviesByGenre[genre] = [];
          }
          if (!moviesByGenre[genre].find((m: any) => m.id === movie.id)) {
            moviesByGenre[genre].push(movie);
          }
        });
      });
    }
  }, [movies, moviesByGenre]);

  return (
    <>
      {!session || !selectedAccount || !movies || !params ? (
        <Loader />
      ) : (
        <div className="relative">
          <header>
            <LoggedNavbar />
            <Hero
              BGimageUrl={selectedData.BGimageUrl}
              LOGOimageUrl={selectedData.LOGOimageUrl}
              title={selectedData.title}
              description={selectedData.description}
              movieId={selectedData.movieId}
            />
          </header>
          <main className="relative">
            {Object.keys(moviesByGenre).map((genre, i) => (
              <div
                key={i}
                className={`${
                  i === 0 ? "xl:-mt-56 -mt-28" : "lg:-mt-30 -mt-20"
                }`}
              >
                <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 mt-10 lg:text-3xl">
                  {genre}
                </h1>
                <div>
                  <MovieSlider
                    data={moviesByGenre[genre]}
                    openMovieModal={SetIsMovieModalOpen}
                    selectMovie={setSelectedMovie}
                  />
                </div>
              </div>
            ))}
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
export default Genre;
