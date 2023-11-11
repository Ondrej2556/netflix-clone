"use client";

import { Movie } from "@/d.types";
import React from "react";
import { AiOutlineDown, AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import LikeButton from "./likeButton";
import { useUserStore } from "@/store/userStore";
import AddToListButton from "./addToList.Button";
import PlayButton from "./playButton";

interface MovieCardProps {
  movie: Movie;
  i: number;
  openMovieModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
  scrollX: number | 0;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  i,
  openMovieModal,
  selectMovie,
  scrollX,
}) => {
  const { selectedAccount } = useUserStore();

  return (
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
          i === 0 ? `translateX(${scrollX + 30}px)` : `translateX(${scrollX}px)`
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
              <PlayButton type="short" movieId={movie.id} movieName={movie.movieName}/>
              <AddToListButton
                type={
                  selectedAccount?.likedMoviesId?.includes(movie.id)
                    ? "remove"
                    : "add"
                }
                movieId={movie.id}
                userId={selectedAccount?.id}
                size={10}
              />

              <LikeButton
                userId={selectedAccount?.id || ""}
                movieId={movie.id}
                iconSize={10}
              />
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
                Number(movie.match) >= 70 ? "text-green-500" : "text-orange-500"
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
  );
};

export default MovieCard;
