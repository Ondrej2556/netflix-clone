import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";

interface MovieModalProps {
  closeMovieModal: React.Dispatch<React.SetStateAction<boolean>>;
  onMovieOpen: boolean;
}

const MovieModal: React.FC<MovieModalProps> = ({
  closeMovieModal,
  onMovieOpen,
}) => {
  const [modalVisible, setModalVisible] = useState(onMovieOpen);

  useEffect(() => {
    setModalVisible(onMovieOpen);
  }, [onMovieOpen]);

  const handleClose = () => {
    setModalVisible(false);
    setTimeout(() => {
        closeMovieModal(false)
    }, 300)
  }
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose()
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
            className={`bg-neutral-900 rounded-md md:mt-10 xl:w-2/4 md:w-3/4 w-full transition-all ease-in-out duration-500 translate-y-full ${
              modalVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            } md:h-fit h-full`}
          >
            <div className="relative bg-[url('/images/loggedHero.webp')] w-full h-[36rem] bg-center bg-cover bg-no-repeat rounded-t-md">
              <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-neutral-900 flex flex-col sm:justify-end justify-center pb-24 px-10 gap-8 z-50">
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-3  bg-neutral-900/80 rounded-full p-2 text-xl cursor-pointer"
                >
                  ❌
                </button>
                <h1 className="sm:text-7xl text-4xl font-semibold">
                  Mizerové 2
                </h1>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-2xl bg-white text-black font-bold py-1 px-6 rounded-md">
                    <FaPlay />
                    Přehrát
                  </button>
                  <span className="rounded-full text-center outline outline-zinc-700 hover:outline-white p-2 cursor-pointer">
                    <AiOutlineCheck size={30} />
                  </span>
                  <span className="rounded-full text-center outline outline-zinc-700 hover:outline-white p-2 cursor-pointer">
                    <FiThumbsUp size={30} />
                  </span>
                </div>
              </div>
            </div>
            <div className="px-10 flex sm:flex-row flex-col gap-4 lg:text-xl md:text-md text-md pb-24">
              <div className="sm:w-2/3 w-full">
                <div className="flex gap-2 items-center">
                  <h3 className="text-green-500 font-semibold">98% shoda</h3>
                  <h3 className="text-neutral-400 font-semibold">2021</h3>
                  <h3 className="text-neutral-400 font-semibold">1 h 58 m</h3>
                  <h3 className="border-[1px] border-neutral-400  font-sm rounded-sm px-[1px] leading-none">
                    HD
                  </h3>
                </div>
                <span className="border-[1px] border-neutral-400 text-neutral-400 px-[4px] leading-none font-semibold mt-1">
                  13+
                </span>
                <p className="font-semibold text-left mt-5">
                  Pár desítek let po turnaji, který jim změnil život, na sebe
                  znova narazí soupeři Johny a Daniel. Další pokračování série
                  filmů "Karate Kid".
                </p>
              </div>
              <div className="sm:w-1/3 w-full flex flex-col gap-2">
                <p className="font-semibold">
                  <span className="text-zinc-600">Obsazení: </span>Dwayne
                  Johnson, Ryan Reynold, Gal Gadot
                </p>
                <p className="font-semibold">
                  <span className="text-zinc-600">Žánry: </span>Dwayne Johnson,
                  Ryan Reynold, Gal Gadot
                </p>
                <p className="font-semibold">
                  <span className="text-zinc-600">Tenhle film je: </span>
                  Neúctivý, Vzrušující
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieModal;
