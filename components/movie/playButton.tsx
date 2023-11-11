import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import {useRouter} from "next/navigation"

interface PlaButtonProps {
  type: string;
  movieId: string;
  movieName: string;
}

const PlayButton: React.FC<PlaButtonProps> = ({ type, movieId, movieName }) => {
    const router = useRouter()

    const handlePlayClick = (e: any) => {
        e.stopPropagation();
        router.push(`/watch/${movieId}/${movieName}`)
    }
  return (
    <>
      {type === "long" ? (
        <button 
        onClick={handlePlayClick}
        className="flex items-center gap-2 text-2xl bg-white text-black font-bold py-2 px-6 rounded-md">
          <FaPlay />
          Přehrát
        </button>
      ) : (
        <span 
        onClick={(e: any) => handlePlayClick(e)}
        className="rounded-full p-2 text-center bg-white text-black hover:bg-white/70">
          <BsFillPlayFill size={12} />
        </span>
      )}
    </>
  );
};

export default PlayButton;
