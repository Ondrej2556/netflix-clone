import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { BsFillHandThumbsDownFill, BsFillHandThumbsUpFill  } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

interface LikeButtonProps {
  movieId: string | null;
  userId: string | null;
  iconSize: number;
}

const DynamicIcon = ({
  size,
  type,
}: {
  size: number;
  type: keyof typeof icons;
}) => {
  const icons = {
    thumbsUp: <FiThumbsUp size={size} />,
    thumbsDown: <FiThumbsDown size={size} />,
    heart: <AiFillHeart size={size} />,
  };

  return icons[type] || null;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  movieId,
  userId,
  iconSize,
}) => {
  const [showManageFavorites, setShowManageFavorites] = useState<boolean>(false);
  const [isHoveringFavorites, setIsHoveringFavorites] = useState<boolean>(showManageFavorites);
  const [ isFavoriteHoverHelpLikeTextVisible, setIsFavoriteHoverHelpLikeTextVisible ] = useState<boolean>(false);
  const [isFavoriteHoverHelpDislikeTextVisible,setIsFavoriteHoverHelpDislikeTextVisible] = useState<boolean>(false);
  const [isFavoriteHoverHelpExtralikeTextVisible,setIsFavoriteHoverHelpExtralikeTextVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)

  const { setAccount, selectedAccount } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    setTimeout(()=> setIsHoveringFavorites(showManageFavorites), 100)

  }, [showManageFavorites]);

  const handleLike = async (
    e: React.MouseEvent,
    type: "like" | "dislike" | "superlike" | "unset"
  ) => {
    e.stopPropagation();
    try {
      setLoading(true)
      const res = await axios.put("/api/account/movie/favorites", {
        accountId: userId,
        movieId,
        value: type,
      });
      localStorage.removeItem("account");
      setAccount(res.data);
      localStorage.setItem("account", JSON.stringify(res.data));
      router.push("/browse");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <span
    onMouseEnter={() => setShowManageFavorites(true)}
    onMouseLeave={() => setShowManageFavorites(false)}
      className="relative rounded-full p-2 text-center outline outline-zinc-700 hover:outline-white"
    >
      {/* THIS ICON WILL CHANGE BASED ON THE RATING STATE IN DB DEFAULT FITHUMBSUP*/}
      {/* IF !selectedAccount.movieRating.movieId.includes(movieId) -> DISPLAY ICON BASED ON THE RATING 
      IF not -> DISPLAY DEFAULT ICON
    */}
      {selectedAccount?.movieRating.some(
        (rating) => rating.movieId === movieId
      ) ? (
        <>
          {selectedAccount.movieRating.map((rating, i) => (
            <React.Fragment key={i}>
              {rating.movieId === movieId &&  rating.movieRating === "dislike" ? (
                <BsFillHandThumbsDownFill  size={iconSize} />
              ) : rating.movieId === movieId && rating.movieRating === "like" ? (
                <BsFillHandThumbsUpFill  size={iconSize} />
              ) : rating.movieId === movieId && rating.movieRating === "superlike" ? (
                <AiFillHeart size={iconSize} />
              ) : null}
            </React.Fragment>
          ))}
        </>
      ) : (
        <FiThumbsUp size={iconSize} />
      )}
      {showManageFavorites && (
        <div
          className={`absolute rounded-full top-0 -left-full flex gap-3 px-3 py-1 bg-neutral-800 shadow-sm shadow-black/70 transition-all duration-500 ease-in-out ${
            isHoveringFavorites
              ? "opacity-100 scale-125"
              : "opacity-0 scale-50"
          }`}
        >
          <button
            disabled={loading}
            className={`relative rounded-full p-1 hover:bg-neutral-500 ${loading ? "hover:cursor-wait" : "cursor-pointer"}`}
            onClick={(e) => handleLike(e, "dislike")}
            onMouseEnter={() => setIsFavoriteHoverHelpDislikeTextVisible(true)}
            onMouseLeave={() => setIsFavoriteHoverHelpDislikeTextVisible(false)}
          >
            <DynamicIcon size={iconSize} type="thumbsDown" />
            {isFavoriteHoverHelpDislikeTextVisible && (
              <>
                <div
                  className={`absolute bg-white  ${
                    iconSize === 30
                      ? "-left-7 text-[15px] -top-8"
                      : "-left-full text-[9px] -top-6"
                  } font-bold text-black rounded-sm px-2 z-10`}
                >
                  Nezajímavé
                </div>
                <div
                  className={`absolute w-3 h-3 bg-white -top-4  ${
                    iconSize === 30 ? "left-3" : "left-1"
                  } rotate-45`}
                ></div>
              </>
            )}
          </button>
          <button
            disabled={loading}
            className={`relative rounded-full p-1 hover:bg-neutral-500 ${loading ? "hover:cursor-wait" : "cursor-pointer"}`}
            onClick={(e) => handleLike(e, "like")}
            onMouseEnter={() => setIsFavoriteHoverHelpLikeTextVisible(true)}
            onMouseLeave={() => setIsFavoriteHoverHelpLikeTextVisible(false)}
          >
             
            <DynamicIcon size={iconSize} type="thumbsUp" />
            {isFavoriteHoverHelpLikeTextVisible && (
             <>
             <div
               className={`absolute bg-white  ${
                 iconSize === 30
                   ? "-left-7 text-[15px] -top-8"
                   : "-left-full text-[9px] -top-6"
               } font-bold text-black rounded-sm px-2 z-10`}
             >
               To&nbsp;se&nbsp;mi&nbsp;líbí
             </div>
             <div
               className={`absolute w-3 h-3 bg-white -top-4  ${
                 iconSize === 30 ? "left-3" : "left-1"
               } rotate-45`}
             ></div>
           </>
            )}
          </button>
          <button
            disabled={loading}
            className={`relative rounded-full p-1 hover:bg-neutral-500 ${loading ? "hover:cursor-wait" : "cursor-pointer"}`}
            onClick={(e) => handleLike(e, "superlike")}
            onMouseEnter={() => setIsFavoriteHoverHelpExtralikeTextVisible(true)}
            onMouseLeave={() => setIsFavoriteHoverHelpExtralikeTextVisible(false)}
          >
            <DynamicIcon size={iconSize} type="heart" />
            {isFavoriteHoverHelpExtralikeTextVisible && (
              <>
                <div
                  className={`absolute bg-white ${
                    iconSize === 30
                      ? "-left-1 text-[15px] -top-8"
                      : "-left-2 text-[9px] -top-6"
                  } font-bold text-black rounded-sm px-2 z-10`}
                >
                  Boží
                </div>
                <div
                  className={`absolute w-3 h-3 bg-white -top-4 ${
                    iconSize === 30 ? "left-[13px]" : "left-1"
                  } rotate-45`}
                ></div>
              </>
            )}
          </button>
        </div>
      )}
    </span>
  );
};

export default LikeButton;
