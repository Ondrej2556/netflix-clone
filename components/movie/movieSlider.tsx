import React, { useRef, useState, useEffect } from "react";
import { Account, Movie } from "@/d.types";
import {
  AiOutlineDown,
  AiOutlineRight,
  AiOutlineLeft,
  AiOutlinePlus
} from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import Loader from "../loader/loader";
import LikeButton from "./likeButton";

interface movieSliderProps {
  data: Movie[] | undefined;
  openMovieModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  user: Account;
}

const MovieSlider: React.FC<movieSliderProps> = ({
  data,
  openMovieModal,
  selectMovie,
  user,
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
      className="parent flex gap-2 lg:pl-16 pl-4 lg:py-40 py-[114px] overflow-x-auto  scrollbar-hide overflow-scroll relative"
      ref={sliderRef}
      onMouseEnter={() => setIsMoveButtonVisible(true)}
      onMouseLeave={() => setIsMoveButtonVisible(false)}
    >
      {!data ? (
        <Loader />
      ) : (
        <>
          {data?.map((movie, i) => (
            <div
              key={movie.id}
              id={movie.id}
              onClick={() => {
                openMovieModal(true);
                selectMovie(movie);
              }}
              className={`relative xl:w-72 xl:h-40 w-44 h-24 flex-shrink-0 bg-center bg-cover bg-no-repeat cursor-pointer rounded-md hover:z-10 group transition-all duration-500 ease-in-out `}
              style={{
                backgroundImage: `url(${movie.thumbNailUrl})`,
                transform: `translateX(${scrollX}px)`,
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = `${
                  i === 0
                    ? `translateX(${scrollX + 30}px)`
                    : `translateX(${scrollX}px)`
                } scale(1.5)`;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = `translateX(${scrollX}px) scale(1)`;
              }}
            >
              <div className="absolute bg-neutral-800 mt-0 w-full -bottom-10 opacity-0 transition-all rounded-b-md duration-300 ease-in-out transform -translate-y-full group-hover:opacity-100 group-hover:translate-y-5 ">
                <div className="flex flex-col lg:text-md text-xs p-2 gap-1">
                  <div className="flex justify-between items-center">
                    {/* prvni rada */}
                    <div className="flex gap-2 items-center">
                      {/* play, add to my list, like */}
                      <span className="rounded-full p-2 text-center bg-white text-black hover:bg-white/70">
                        <BsFillPlayFill size={12} />
                      </span>
                      <span className="rounded-full p-2 text-center outline outline-zinc-700 hover:outline-white">
                        <AiOutlinePlus size={10} />
                      </span>
                    <LikeButton userId={user.id} movieId={movie.id} iconSize={10}/>
                    </div>
                    {/* info k dalsim dilum */}
                    <span className="rounded-full p-1 text-center outline outline-zinc-700 hover:outline-white">
                      <AiOutlineDown size={10} />
                    </span>
                  </div>
                  {/* druha rada */}
                  <div className="flex gap-1 lg:text-[11px] text-[8px] items-center">
                    {/* sshoda, vek, seriesCount, min age */}
                    <span
                      className={`${
                        Number(movie.match) >= 70
                          ? "text-green-500"
                          : "text-orange-500"
                      }`}
                    >
                      {movie.match}% shoda
                    </span>
                    <span className="border-[0.5px] border-neutral-400 text-neutral-400 px-[2px] leading-none">
                      {movie.minAge}+
                    </span>
                    {movie.seriesCount > 1 && (
                      <span className="text-neutral-400">
                        {movie.seriesCount} části
                      </span>
                    )}
                    <span className="border-[1px] border-neutral-400  font-thin rounded-sm px-[1px] leading-none">
                      {movie.quality}
                    </span>
                  </div>
                  {/* 3 rada */}
                  <div className="flex lg:text-[11px] text-[8px] ">
                    {/* properties */}
                    {movie.properties?.map((prop, i) => (
                      <span key={i} className="flex items-center">
                        {prop}
                        {i !== movie.properties.length - 1 && (
                          <span className="text-neutral-400 text-sm">
                            &nbsp;&#183;&nbsp;
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isMoveButtonVisible && (
            <>
              <div
                onClick={() => handleScroll("left")}
                className={`${
                  scrollX >= 0 ? "hidden" : "visible"
                } absolute w-14 lg:h-40 h-24 left-0 flex items-center justify-center text-3xl transition bg-black bg-opacity-40 hover:bg-opacity-60 hover:text-4xl cursor-pointer z-40`}
              >
                <AiOutlineLeft />
              </div>
              <div
                onClick={() => handleScroll("right")}
                className="absolute w-14 lg:h-40 h-24 right-0 flex items-center justify-center text-3xl transition bg-black bg-opacity-40 hover:bg-opacity-60 hover:text-4xl cursor-pointer z-40"
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
