import React, { useState } from "react";
import { Movie } from "@/d.types";
import { AiOutlineCheck, AiOutlineDown } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { BsFillPlayFill } from "react-icons/bs";

interface movieSliderProps {
  data: Movie[] | undefined;
}

const MovieSlider: React.FC<movieSliderProps> = ({ data }) => {

  return (
    <div className="flex gap-4 lg:pl-16 pl-4 py-20 overflow-x-auto">
      {data?.map((movie) => (
        <div
        key={movie.id}
          style={{
            backgroundImage: `url(${movie.thumbNailUrl})`,
          }}
          className="relative w-44 h-24 flex-shrink-0 bg-center bg-cover bg-no-repeat cursor-pointer rounded-md
            hover:scale-150 hover:-translate-y-10 hover:translate-x-10 hover:z-10 group transition-all duration-300 ease-in-out"
        >
          <div className="absolute bg-neutral-800 mt-0 w-full -bottom-10 opacity-0 transition-all rounded-b-md duration-300 ease-in-out transform -translate-y-full group-hover:opacity-100 group-hover:translate-y-5">
            <div className="flex flex-col text-xs p-2 gap-1">
              <div className="flex justify-between items-center">
                {/* prvni rada */}
                <div className="flex gap-2 font- items-center">
                  {/* play, add to my list, like */}
                  <span className="rounded-full p-1 text-center bg-white text-black hover:bg-white/70">
                    <BsFillPlayFill size={12} />
                  </span>
                  <span className="rounded-full p-1 text-center outline outline-zinc-700 hover:outline-white">
                    <AiOutlineCheck size={10} />
                  </span>
                  <span className="rounded-full p-1 text-center outline outline-zinc-700 hover:outline-white">
                    <FiThumbsUp size={10} />
                  </span>
                </div>
                {/* info k dalsim dilum */}
                <span className="rounded-full p-1 text-center outline outline-zinc-700 hover:outline-white">
                  <AiOutlineDown size={10} />
                </span>
              </div>
              {/* druha rada */}
              <div className="flex gap-1 text-[8px] items-center">
                {/* sshoda, vek, seriesCount, min age */}
                <span className={`${Number(movie.match) >= 70 ? "text-green-500" : "text-orange-500"}`}>{movie.match}% shoda</span>
                <span className="border-[0.5px] border-neutral-400 text-neutral-400 px-[2px] leading-none ">
                  {movie.minAge}+
                </span>
                <span className="text-neutral-400">
                  {movie.seriesCount} částí
                </span>
                <span className="border-[1px] border-neutral-400  font-thin rounded-sm px-[1px] leading-none">
                  {movie.quality}
                </span>
              </div>
              {/* 3 rada */}
              <div className="flex text-[8px] ">
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
    </div>
  );
};

export default MovieSlider;
