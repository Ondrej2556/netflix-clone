import React, { useRef, useState, useEffect } from "react";
import {  Movie } from "@/d.types";
import {
  AiOutlineRight,
  AiOutlineLeft,
} from "react-icons/ai";
import Loader from "../loader/loader";
import MovieCard from "./movieCard";

interface movieSliderProps {
  data: Movie[] | undefined;
  openMovieModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
}

const MovieSlider: React.FC<movieSliderProps> = ({
  data,
  openMovieModal,
  selectMovie,
}) => {
  const [scrollX, setScrollX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMoveButtonVisible, setIsMoveButtonVisible] = useState(false);
  const [totalMoviesWidth, setTotalMoviesWidth] = useState<number>(0);

  useEffect(() => {
    const totalWidth = data?.reduce((acc, movie) => {
      const movieBox = document.getElementById(`${movie.id}`);
      if (movieBox) {
        return acc + movieBox.offsetWidth;
      }
      return acc;
    }, 0);
    if (totalWidth) setTotalMoviesWidth(totalWidth);
  }, [data]);

  const handleScroll = (direction: "left" | "right") => {
    const slider = sliderRef.current;

    if (slider) {
      const sliderWidth = slider.offsetWidth;

      if (direction === "left") {
        if (scrollX >= 0) {
          return;
        }
        setScrollX(scrollX + sliderWidth);
      } else {
        if (totalMoviesWidth - Math.abs(scrollX) <= sliderWidth) {
          setScrollX(0);
          return;
        }
        setScrollX(scrollX - sliderWidth);
      }
    }
  };

  return (
    <div
      className="flex gap-2 lg:pl-16 pl-4 lg:py-40 py-[114px] overflow-x-auto  scrollbar-hide lg:overflow-hidden overflow-scroll relative"
      ref={sliderRef}
      onMouseEnter={() => setIsMoveButtonVisible(true)}
      onMouseLeave={() => setIsMoveButtonVisible(false)}
    >
      {!data ? (
        <Loader />
      ) : (
        <>
          {data?.map((movie, i) => (
            <MovieCard
              key={i}
              i={i}
              movie={movie}
              openMovieModal={openMovieModal}
              selectMovie={selectMovie}
              scrollX={scrollX}
            />
          ))}
          {isMoveButtonVisible && (
            <>
              <div
                onClick={() => handleScroll("left")}
                className={`${
                  scrollX >= 0 ? "hidden" : "visible"
                } absolute w-14 xl:h-40 h-24 left-0 flex items-center justify-center text-3xl transition bg-black bg-opacity-40 hover:bg-opacity-60 hover:text-4xl cursor-pointer z-40`}
              >
                <AiOutlineLeft />
              </div>
              <div
                onClick={() => handleScroll("right")}
                className="absolute w-14 xl:h-40 h-24 right-0 flex items-center justify-center text-3xl transition bg-black bg-opacity-40 hover:bg-opacity-60 hover:text-4xl cursor-pointer z-40"
              >
                <AiOutlineRight />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MovieSlider;
