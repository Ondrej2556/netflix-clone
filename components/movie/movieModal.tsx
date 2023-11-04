import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { Movie, Account } from "@/d.types";
import LikeButton from "./likeButton";

interface MovieModalProps {
  closeMovieModal: React.Dispatch<React.SetStateAction<boolean>>;
  onMovieOpen: boolean;
  selectedMovie: Movie | null;
  user: Account;
}

const MovieModal: React.FC<MovieModalProps> = ({
  closeMovieModal,
  onMovieOpen,
  selectedMovie,
  user,
}) => {
  const [modalVisible, setModalVisible] = useState(onMovieOpen);

  useEffect(() => {
    setModalVisible(onMovieOpen);
  }, [onMovieOpen]);

  const handleClose = () => {
    setModalVisible(false);
    setTimeout(() => {
      closeMovieModal(false);
    }, 300);
  };
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      {onMovieOpen && (
        <div
          className={`absolute w-full h-full top-0 bg-black bg-opacity-60 z-50 flex justify-center transition `}
        >
          <div
            className={`md:fixed md:top-O left-1/2 md:-translate-x-1/2 bg-neutral-900 rounded-md md:my-20 xl:w-2/4 md:w-4/6 w-full transition-all ease-in-out duration-500  ${
              modalVisible ? "opacity-100" : "opacity-0"
            } md:h-fit h-full`}
          >
            <div
              style={{
                backgroundImage: `url(${selectedMovie?.thumbNailUrl})`,
              }}
              className={`relative w-full sm:h-[36rem] aspect-video bg-center bg-cover bg-no-repeat rounded-t-md`}
            >
              <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-neutral-900 flex flex-col justify-end px-10 gap-8 z-50 sm:pb-24">
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-3  bg-neutral-900/80 rounded-full p-2 text-xl cursor-pointer"
                >
                  ❌
                </button>
                <h1 className="sm:text-7xl text-4xl font-semibold ">
                  {selectedMovie?.movieName}
                </h1>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-2xl bg-white text-black font-bold py-1 px-6 rounded-md">
                    <FaPlay />
                    Přehrát
                  </button>
                  <span className="rounded-full text-center outline outline-zinc-700 hover:outline-white p-2 cursor-pointer">
                    <AiOutlinePlus size={30} />
                  </span>
                  <LikeButton movieId={selectedMovie?.id} userId={user.id} iconSize={30} />
                </div>
              </div>
            </div>
            <div className="px-10 flex sm:flex-row flex-col gap-4 lg:text-xl md:text-md text-md pt-6 pb-24">
              <div className="sm:w-2/3 w-full">
                <div className="flex gap-2 items-center">
                  <h3 className="text-green-500 font-semibold">
                    {selectedMovie?.match}% shoda
                  </h3>
                  <h3 className="text-neutral-400 font-semibold">{selectedMovie?.releaseYear}</h3>
                  <h3 className="text-neutral-400 font-semibold">{selectedMovie?.categoryId === 1 ? `${selectedMovie?.seriesCount} řad` : selectedMovie?.duration}</h3>
                  <h3 className="border-[1px] border-neutral-400  font-sm rounded-sm px-[1px] leading-none">
                    {selectedMovie?.quality}
                  </h3>
                </div>
                <span className="border-[1px] border-neutral-400 text-neutral-400 px-[4px] leading-none font-semibold mt-1">
                  {selectedMovie?.minAge}+
                </span>
                <p className="font-semibold text-left mt-5 text-[16px]">
                  {selectedMovie?.description}
                </p>
              </div>
              <div className="sm:w-1/3 w-full flex flex-col gap-2 text-[16px]">
                <p className="font-semibold">
                  <span className="text-zinc-600">Obsazení: </span>
                  {selectedMovie?.actors.map((item: string, i: number) => (
                    <i key={i}>
                      {item}
                      {i !== selectedMovie?.actors.length - 1 && <>, </>}
                    </i>
                  ))}
                </p>
                <p className="font-semibold">
                  <span className="text-zinc-600">Žánry: </span>
                  {selectedMovie?.genres.map((item: string, i: number) => (
                    <i key={i}>
                      {item}
                      {i !== selectedMovie?.genres.length - 1 && <>, </>}
                    </i>
                  ))}
                </p>
                <p className="font-semibold">
                  <span className="text-zinc-600">Tenhle film je: </span>
                  {selectedMovie?.properties.map((item: string, i: number) => (
                    <i key={i}>
                      {item}
                      {i !== selectedMovie?.properties.length - 1 && <>, </>}
                    </i>
                  ))}
                </p>
              </div>
            </div>
            {selectedMovie?.categoryId === 1 && (
              <div className="px-10 flex justify-between pb-36">
                <h2 className="text-2xl font-semibold">Díly</h2>
                <select className="bg-neutral-700 text-xl font-semibold px-4 py-1 rounded-md outline outline-1 outline-zinc-300">
                  {[...Array(selectedMovie.seriesCount)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}. část
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieModal;
