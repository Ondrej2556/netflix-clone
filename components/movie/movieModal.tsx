import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Movie } from "@/d.types";
import LikeButton from "./likeButton";
import { useUserStore } from "@/store/userStore";
import AddToListButton from "./addToList.Button";
import PlayButton from "./playButton";

interface MovieModalProps {
  closeMovieModal: React.Dispatch<React.SetStateAction<boolean>>;
  onMovieOpen: boolean;
  selectedMovie: Movie | null;
}

const MovieModal: React.FC<MovieModalProps> = ({
  closeMovieModal,
  onMovieOpen,
  selectedMovie,
}) => {
  const [modalVisible, setModalVisible] = useState(onMovieOpen);
  const { selectedAccount } = useUserStore();

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
      {onMovieOpen && selectedMovie && selectedAccount && (
        <div
          className={`absolute w-full h-full top-0 bg-black bg-opacity-60 z-50 flex justify-center transition `}
        >
          <div
            className={`fixed top-O left-1/2 -translate-x-1/2 bg-neutral-900 rounded-md xl:my-10 xl:w-2/4 lg:w-1/2 md:w-4/6 w-full transition-all ease-in-out duration-500  ${
              modalVisible ? "opacity-100" : "opacity-0"
            } md:h-fit h-full`}
          >
            <div
              style={{
                backgroundImage: `url(${selectedMovie.thumbNailUrl})`,
              }}
              className={`relative w-full md:h-1/3 aspect-video bg-center bg-cover bg-no-repeat rounded-t-md`}
            >
              <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-neutral-900 flex flex-col justify-end px-10 gap-8 z-50">
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-3  bg-neutral-900/80 rounded-full px-2 xl:py-2 py-1 text-xl cursor-pointer"
                >
                  ❌
                </button>
                <h1 className="md:text-7xl text-4xl font-semibold ">
                  {selectedMovie.movieName}
                </h1>
                <div className="flex gap-4 items-center">
                  <PlayButton type="long" movieId={selectedMovie.id} movieName={selectedMovie.movieName}/>
                  <AddToListButton
                    type={
                      selectedAccount.likedMoviesId.includes(
                        selectedMovie.id
                      )
                        ? "remove"
                        : "add"
                    }
                    movieId={selectedMovie.id}
                    userId={selectedAccount.id}
                    size={30}
                  />
                  <LikeButton
                    movieId={selectedMovie.id}
                    userId={selectedAccount.id}
                    iconSize={30}
                  />
                </div>
              </div>
            </div>
            <div className="px-10 flex sm:flex-row flex-col gap-4 md:text-md text-md pt-6 pb-16">
              <div className="sm:w-2/3 w-full">
                <div className="flex gap-2 items-center">
                  <h3 className="text-green-500 font-semibold">
                    {selectedMovie.match}% shoda
                  </h3>
                  <h3 className="text-neutral-400 font-semibold">
                    {selectedMovie.releaseYear}
                  </h3>
                  <h3 className="text-neutral-400 font-semibold">
                    {selectedMovie.categoryId === 1
                      ? `${selectedMovie.seriesCount} řad`
                      : selectedMovie.duration}
                  </h3>
                  <h3 className="border-[1px] border-neutral-400  font-sm rounded-sm px-[1px] leading-none">
                    {selectedMovie.quality}
                  </h3>
                </div>
                <span className="border-[1px] border-neutral-400 text-neutral-400 px-[4px] leading-none font-semibold mt-1">
                  {selectedMovie.minAge}+
                </span>
                <p className="font-semibold text-left mt-5 xl:text-[16px] md:text-[12px]">
                  {selectedMovie.description}
                </p>
              </div>
              <div className="sm:w-1/3 w-full flex flex-col gap-2 xl:text-[16px] lg:text-[10px]">
                <p className="font-semibold">
                  <span className="text-zinc-600">Obsazení: </span>
                  {selectedMovie.actors.map((item: string, i: number) => (
                    <i key={i}>
                      {item}
                      {i !== selectedMovie.actors.length - 1 && <>, </>}
                    </i>
                  ))}
                </p>
                <p className="font-semibold">
                  <span className="text-zinc-600">Žánry: </span>
                  {selectedMovie.genres.map((item: string, i: number) => (
                    <i key={i}>
                      {item}
                      {i !== selectedMovie.genres.length - 1 && <>, </>}
                    </i>
                  ))}
                </p>
                <p className="font-semibold">
                  <span className="text-zinc-600">Tenhle film je: </span>
                  {selectedMovie.properties.map((item: string, i: number) => (
                    <i key={i}>
                      {item}
                      {i !== selectedMovie.properties.length - 1 && <>, </>}
                    </i>
                  ))}
                </p>
              </div>
            </div>
            {selectedMovie.categoryId === 1 && (
              <div className="px-10 flex justify-between mb-10">
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
