"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoggedNavbar from "@/components/navbar/loggedNavbar";
import { useEffect, useState } from "react";
import SelectAccount from "@/components/account/selectAccount";
import MovieSlider from "@/components/movie/movieSlider";
import axios from "axios";
import MovieModal from "@/components/movie/movieModal";
import { Movie } from "@/d.types";
import Footer from "@/components/footer";
import { useUserStore } from "@/store/userStore";
import Hero from "@/components/movie/hero";
import Top10MovieSlider from "@/components/movie/top10MovieSlider";

const Browse = () => {
  const { selectedAccount, setAccount, userAccounts } = useUserStore();

  const [series, setSeries] = useState<Movie[] | undefined>();
  const [movies, setMovies] = useState<Movie[] | undefined>();
  const [likedMovies, setLikedMovies] = useState<Movie[] | undefined>();
  const [reccomendedMovies, setReccomendedMovies] = useState<
    Movie[] | undefined
  >();
  const [isMovieModalOpen, SetIsMovieModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session.user) {
      router.push("/");
      return;
    }
    const account = localStorage.getItem("account");

    if (account) {
      setAccount(JSON.parse(account));
    }
  }, []);

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

    if (!selectedAccount) {
      return;
    }
    const getLikedMovies = async () => {
      try {
        const series = await axios.get("/api/account/movie/favorites", {
          params: { userId: selectedAccount.id },
        });
        setLikedMovies(series.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSeries();
    getMovies();
    getLikedMovies();
  }, [setSeries, setMovies, selectedAccount]);

  useEffect(() => {
    if (movies) {
      setReccomendedMovies(movies.slice().reverse());
    }
  }, [movies]);
  return (
    <>
      {!selectedAccount || !session || !userAccounts ? (
        <SelectAccount />
      ) : (
        <div className="relative">
          <header>
            <LoggedNavbar />
            <Hero
              BGimageUrl="/images/loggedHero.webp"
              LOGOimageUrl="/images/loggedHeroTitle.webp"
              title="Potvrzeno: další řada je na cestě"
              description='Pár desítek let po turnaji, který jim změnil život, na sebe
                    znova narazí soupeři Johny a Daniel. Další pokračování série
                    filmů "Karate Kid".'
              movieId="65462455a3658eac9b2beb42"
            />
          </header>
          <main className="relative">
            <div className="xl:-mt-56 -mt-28">
              <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 mt-10 lg:text-3xl">
                Pořady
              </h1>
              <MovieSlider
                data={series}
                openMovieModal={SetIsMovieModalOpen}
                selectMovie={setSelectedMovie}
              />
            </div>
            <div className="lg:-mt-30 -mt-20">
              <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 mt-10 lg:text-3xl">
                Filmy
              </h1>
              <MovieSlider
                data={movies}
                openMovieModal={SetIsMovieModalOpen}
                selectMovie={setSelectedMovie}
              />
            </div>
            {likedMovies && (
              <div className="lg:-mt-30 -mt-20">
                <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 mt-10 lg:text-3xl">
                  Oblíbené uživatele: {selectedAccount.nickname}
                </h1>
                <MovieSlider
                  data={likedMovies}
                  openMovieModal={SetIsMovieModalOpen}
                  selectMovie={setSelectedMovie}
                />
              </div>
            )}
            <div className="lg:-mt-30 -mt-20">
              <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 mt-10 lg:text-3xl">
                Top tipy pro profil: {selectedAccount.nickname}
              </h1>
              <MovieSlider
                data={reccomendedMovies}
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
            <div>
              <h1 className="lg:pl-16 pl-4 lg:-mb-36 -mb-24 lg:text-3xl">
                Top 10 pořadů v téhle zemi: Česko
              </h1>
              <Top10MovieSlider
                data={series?.slice(0,10).reverse()}
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

export default Browse;
